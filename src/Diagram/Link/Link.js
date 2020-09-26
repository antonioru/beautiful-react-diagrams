import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LinkType, NodeType, PortType } from '../../shared/types/Types';
import usePortRefs from '../../shared/hooks/usePortRefs';
import useCanvas from '../../shared/hooks/useCanvas';
import getCoords from './getEntityCoordinates';
import makeSvgPath from '../../shared/functions/makeSvgPath';
import getPathMidpoint from '../../shared/functions/getPathMidpoint';
import useNodeRefs from '../../shared/hooks/useNodeRefs';
import LinkLabel from './LinkLabel';

// local hook, returns portRefs & nodeRefs
const useContextRefs = () => {
  const canvas = useCanvas();
  const portRefs = usePortRefs();
  const nodeRefs = useNodeRefs();

  return { canvas, nodeRefs, portRefs };
};

/**
 * A Diagram link component displays the link between two diagram nodes or two node ports.
 */
const Link = (props) => {
  const { input, output, link, onDelete } = props;
  const pathRef = useRef();
  const [labelPosition, setLabelPosition] = useState();
  const { canvas, portRefs, nodeRefs } = useContextRefs();
  const inputPoint = useMemo(() => getCoords(input, portRefs, nodeRefs, canvas), [input, portRefs, nodeRefs, canvas]);
  /* eslint-disable max-len */
  const classList = useMemo(() => classNames('bi-diagram-link', { 'readonly-link': link.readonly }, link.className), [link.readonly, link.className]);
  const outputPoint = useMemo(() => getCoords(output, portRefs, nodeRefs, canvas), [output, portRefs, nodeRefs, canvas]);
  /* eslint-enable max-len */
  const pathOptions = {
    type: (input.type === 'port' || output.type === 'port') ? 'bezier' : 'curve',
    inputAlignment: input.entity.alignment || null,
    outputAlignment: output.entity.alignment || null,
  };
  const path = useMemo(() => makeSvgPath(inputPoint, outputPoint, pathOptions), [inputPoint, outputPoint]);

  // calculates label position
  useEffect(() => {
    if (link.label && inputPoint && outputPoint && pathRef.current) {
      const pos = getPathMidpoint(pathRef.current);
      setLabelPosition(pos);
    }
  }, [pathRef.current, link.label, inputPoint, outputPoint]);

  // on link delete
  const onDoubleClick = useCallback(() => {
    if (onDelete && !link.readonly) {
      onDelete(link);
    }
  }, [link.readonly, onDelete]);

  return (
    <g className={classList}>
      {!link.readonly && (<path d={path} className="bi-link-ghost" onDoubleClick={onDoubleClick} />)}
      <path d={path} ref={pathRef} className="bi-link-path" onDoubleClick={onDoubleClick} />
      {link.label && labelPosition && (<LinkLabel position={labelPosition} label={link.label} />)}
    </g>
  );
};

const InvolvedEntity = PropTypes.exact({
  type: PropTypes.oneOf(['node', 'port']),
  entity: PropTypes.oneOfType([PortType, NodeType]),
});

Link.propTypes = {
  link: LinkType.isRequired,
  input: InvolvedEntity.isRequired,
  output: InvolvedEntity.isRequired,
  onDelete: PropTypes.func,
};

Link.defaultProps = {
  onDelete: undefined,
};

export default React.memo(Link);
