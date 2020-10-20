import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import DiagramLink from '../Link/Link';
import Segment from '../Segment/Segment';
import { LinkType, NodeType, PortAlignment } from '../../shared/Types';
import findInvolvedEntity from './findInvolvedEntity';
import removeLinkFromArray from './removeLinkFromArray';

/**
 * Handles the links' events and business logic, wraps the links within a svg
 */
const LinksCanvas = (props) => {
  const { nodes, segment, onChange, links } = props;

  const removeFromLinksArray = useCallback((link) => {
    if (links.length > 0 && onChange) {
      const nextLinks = removeLinkFromArray(link, links);
      onChange(nextLinks);
    }
  }, [links, onChange]);

  return (
    <svg className="bi bi-link-canvas-layer">
      {links && links.length > 0 && links.map((link) => (
        <DiagramLink
          link={link}
          input={findInvolvedEntity(nodes, link.input)}
          output={findInvolvedEntity(nodes, link.output)}
          onDelete={removeFromLinksArray}
          key={`${link.input}-${link.output}`}
        />
      ))}
      {segment && (
        <Segment {...segment} />
      )}
    </svg>
  );
};

LinksCanvas.propTypes = {
  nodes: PropTypes.arrayOf(NodeType),
  links: PropTypes.arrayOf(LinkType),
  segment: PropTypes.exact({
    id: PropTypes.string,
    from: PropTypes.arrayOf(PropTypes.number),
    to: PropTypes.arrayOf(PropTypes.number),
    alignment: PortAlignment,
  }),
  onChange: PropTypes.func,
};

LinksCanvas.defaultProps = {
  nodes: [],
  links: [],
  segment: undefined,
  onChange: undefined,
};

export default React.memo(LinksCanvas);
