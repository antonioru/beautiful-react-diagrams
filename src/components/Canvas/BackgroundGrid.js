import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const parallaxRatio = 1.25;
const calcCoordinates = (x, y) => ([x * parallaxRatio, y * parallaxRatio]);
const calcTransformation = (x, y, scale) => (`scale(${scale}) translate(${x}, ${y})`);

/**
 * Canvas background
 */
const BackgroundGrid = ({ translateX, translateY, scale, svgPatternColor, svgPatternOpacity }) => {
  const [x, y] = useMemo(() => calcCoordinates(translateX, translateY), [translateX, translateY]);
  const transformation = useMemo(() => calcTransformation(x, y, scale), [x, y, scale]);

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bg-grid" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform={transformation}>
          <g opacity={svgPatternOpacity} fill={svgPatternColor}>
            <polygon points="29.6,0 27,0 27,0.4 29.6,0.4 29.6,3 30,3 30,0.4 30,0 " />
            <polygon points="0,0 0,0.4 0,3 0.4,3 0.4,0.4 3,0.4 3,0 0.4,0 " />
            <polygon points="30,30 30,29.6 30,27 29.6,27 29.6,29.6 27,29.6 27,30 29.6,30 " />
            <polygon points="0.4,30 3,30 3,29.6 0.4,29.6 0.4,27 0,27 0,29.6 0,30 " />
          </g>
        </pattern>

      </defs>
      <rect width="100%" height="100%" fill="url(#bg-grid)" />
    </svg>
  );
};

BackgroundGrid.propTypes = {
  svgPatternColor: PropTypes.string,
  svgPatternOpacity: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  scale: PropTypes.number,
};

BackgroundGrid.defaultProps = {
  svgPatternColor: 'black',
  svgPatternOpacity: 0.5,
  translateX: 0,
  translateY: 0,
  scale: 1,
};

export default React.memo(BackgroundGrid);
