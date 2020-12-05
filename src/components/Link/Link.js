import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import Segment from '../Segment';
import { SchemaType } from '../../shared/Types';
import { canvasRelativeElement, scaleState } from '../../states/canvas';
import { getEntityAttribute, getEntityCoordinates, getEntityElement } from './utils';

// todo: document this
const Link = ({ schema, input, output }) => {
  const scale = useRecoilValue(scaleState);
  const canvasEl = useRecoilValue(canvasRelativeElement);
  const inputEntityEl = getEntityElement(input);
  const outputEntityEl = getEntityElement(output);
  const inputEntityType = getEntityAttribute(inputEntityEl);
  const outputEntityType = getEntityAttribute(outputEntityEl);
  const from = getEntityCoordinates(inputEntityEl, canvasEl, scale);
  const to = getEntityCoordinates(outputEntityEl, canvasEl, scale);

  return (from && to) ? (<Segment from={from} to={to} inputEntityType={inputEntityType} outputEntityType={outputEntityType} />) : null;
};

Link.propTypes = {
  schema: SchemaType.isRequired,
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
};

export default React.memo(Link);
