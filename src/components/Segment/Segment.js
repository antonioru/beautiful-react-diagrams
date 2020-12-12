import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CoordinatesType } from '../../shared/Types';
import { AlignmentTypes, EntityTypes } from '../Link/utils';
import makePath from './makePath';

import './segment.scss';

/**
 * The Segment component is responsible of drawing a line between two different entities.
 * An entity can be a Node component or one of its ports (Port component).
 * It receives the coordinates of the involved entities and few other information (the type and the alignment).
 * The line changes according to this information, for example: connecting two nodes results into a quite straight lines between
 * their centers, whilst connecting two ports takes into account the port alignment.
 */
const Segment = ({ from, to, inputEntityType, outputEntityType, inputAlignment, outputAlignment }) => {
  const path = useMemo(() => (
    makePath(from, to, inputEntityType, outputEntityType, inputAlignment, outputAlignment)
  ), [from, to, inputEntityType, outputEntityType, inputAlignment, outputAlignment]);

  return (
    <g className="brd-segment">
      <path d={path} />
    </g>
  );
};

const EntityPropType = PropTypes.oneOf(Object.values(EntityTypes));
const AlignmentPropType = PropTypes.oneOf(Object.values(AlignmentTypes));

Segment.propTypes = {
  from: CoordinatesType,
  to: CoordinatesType,
  inputEntityType: EntityPropType,
  inputAlignment: AlignmentPropType,
  outputEntityType: EntityPropType,
  outputAlignment: AlignmentPropType,
};

Segment.defaultProps = {
  from: [0, 0],
  to: [0, 0],
  inputAlignment: AlignmentTypes.unknown,
  outputAlignment: AlignmentTypes.unknown,
  inputEntityType: EntityTypes.unknown,
  outputEntityType: EntityTypes.unknown,
};

export default React.memo(Segment);
