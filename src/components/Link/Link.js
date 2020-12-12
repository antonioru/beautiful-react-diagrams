import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import Segment from '../Segment';
import { SchemaType } from '../../shared/Types';
import { canvasRelativeElement, scaleState } from '../../states/canvas';
import { getEntityType, getEntityCoordinates, getEntityElement, getPortAlignment, EntityTypes } from './utils';

/**
 * The Link component handles the business logic of connecting two entities together.
 * An entity can be a Node component or one of its ports (Port component).
 * Once all the involved entities are in place (are rendered) it gets their coordinates and alignment and
 * pass them down to the Segment component which is responsible of drawing the line between them.
 */
const Link = ({ schema, input, output }) => {
  const scale = useRecoilValue(scaleState); // gets the scale state
  const canvasEl = useRecoilValue(canvasRelativeElement); // gets the canvas DOM element (used to calculate the coordinates)
  const inputEntityEl = getEntityElement(input); // gets the input entity DOM element (an entity is both a port or a node)
  const outputEntityEl = getEntityElement(output); // gets the output entity DOM element

  /**
   * if one of the involved elements is not present it means it has not been rendered yet,
   * therefore the component should not render.
   */
  if (!canvasEl || !inputEntityEl || !outputEntityEl) return null;

  const inputEntityType = getEntityType(inputEntityEl); // gets the  input entity type
  const outputEntityType = getEntityType(outputEntityEl); // gets the  output entity type
  const inputAlignment = inputEntityType === EntityTypes.port ? getPortAlignment(input, schema.nodes) : null; // get the input alignment
  const outputAlignment = outputEntityType === EntityTypes.port ? getPortAlignment(output, schema.nodes) : null; // get the output alignment
  const from = getEntityCoordinates(inputEntityEl, canvasEl, scale); // gets the entity coordinates
  const to = getEntityCoordinates(outputEntityEl, canvasEl, scale);

  return (
    <Segment
      from={from}
      to={to}
      inputEntityType={inputEntityType}
      inputAlignment={inputAlignment}
      outputEntityType={outputEntityType}
      outputAlignment={outputAlignment}
    />
  );
};

Link.propTypes = {
  schema: SchemaType.isRequired,
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
};

export default React.memo(Link);
