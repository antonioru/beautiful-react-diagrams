import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useDrag from '../../../shared/internal_hooks/useDrag';
import useCanvas from '../../../shared/internal_hooks/useCanvas';
import getRelativePoint from '../../../shared/functions/getRelativePoint';
import { getEventPoint, getEventTarget } from '../../../shared/Constants';
/**
 * Port
 * @param props
 * @returns {*}
 * @constructor
 */
const Port = (props) => {
  const { id, canLink, alignment, onDragNewSegment, onSegmentFail, onSegmentConnect, onMount, type, ...rest } = props;
  const canvas = useCanvas();
  const { ref, onDrag, onDragEnd } = useDrag();

  onDrag((event, info) => {
    if (onDragNewSegment) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      const from = getRelativePoint(info.start, { x: canvas.x, y: canvas.y });
      const to = getRelativePoint(getEventPoint(event), { x: canvas.x, y: canvas.y });
      onDragNewSegment(id, from, to, alignment);
    }
  });

  onDragEnd((event) => {
    const targetPort = getEventTarget(event).getAttribute('data-port-id');
    if (targetPort && getEventTarget(event) !== ref.current && canLink(id, targetPort, type) && onSegmentConnect) {
      const args = type === 'input' ? [id, targetPort, type] : [targetPort, id, type];

      onSegmentConnect(...args);
      return;
    }
    /* eslint-disable no-unused-expressions */
    onSegmentFail && onSegmentFail(id, type);
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
  type: PropTypes.oneOf(['input', 'output']).isRequired,
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
