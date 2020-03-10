import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useDrag from '../../shared/hooks/useDrag';
import useCanvas from '../utils/useCanvas';
import getRelativePoint from '../utils/getRelativePoint';

/**
 * Port
 * @param props
 * @returns {*}
 * @constructor
 */
const Port = (props) => {
  const { id, canLink, alignment, onDragNewSegment, onSegmentFail, onSegmentConnect, onMount, ...rest } = props;
  const canvas = useCanvas();
  const { ref, onDrag, onDragEnd } = useDrag();

  onDrag((event, info) => {
    if (onDragNewSegment) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      const from = getRelativePoint(info.start, [canvas.x, canvas.y]);
      const to = getRelativePoint([event.clientX, event.clientY], [canvas.x, canvas.y]);

      onDragNewSegment(id, from, to, alignment);
    }
  });

  onDragEnd((event) => {
    const targetPort = event.target.getAttribute('data-port-id');
    /* eslint-disable no-unused-expressions */
    if (targetPort && event.target !== ref.current && canLink(id, targetPort)) {
      onSegmentConnect && onSegmentConnect(id, targetPort);
    } else {
      onSegmentConnect && onSegmentFail(id);
    }
    /* eslint-enable no-unused-expressions */
  });

  useEffect(() => {
    if (ref.current && onMount) {
      onMount(id, ref.current);
    }
  }, [ref.current]);

  return (<div className="bi bi-diagram-port" data-port-id={id} ref={ref} {...rest} />);
};

Port.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]).isRequired,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func,
  canLink: PropTypes.func,
  onMount: PropTypes.func,
  alignment: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
};

Port.defaultProps = {
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined,
  canLink: () => true,
  onMount: undefined,
  alignment: undefined,
};

export default React.memo(Port);
