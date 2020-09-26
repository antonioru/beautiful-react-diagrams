import findIndex from 'lodash.findindex';
import { ON_CHANGE, ON_CONNECT, ON_NODE_ADD, ON_NODE_REMOVE } from './actionTypes';

/**
 * schema reducer
 */
const schemaReducer = (state, action) => {
  switch (action.type) {
    case ON_CHANGE:
      return ({
        nodes: action.payload.nodes || state.nodes || [],
        links: action.payload.links || state.links || [],
      });
    case ON_NODE_ADD:
      if (state.nodes) {
        state.nodes.push(action.payload.node);
      }
      return ({
        nodes: state.nodes || [],
        links: state.links || [],
      });
    case ON_NODE_REMOVE:
      if (state.nodes) {
        const index = findIndex(state.nodes, ['id', action.payload.nodeId]);
        state.nodes.splice(index, 1);
      }

      return ({
        nodes: state.nodes || [],
        links: state.links || [],
      });
    case ON_CONNECT:
      if (state.links) {
        state.links.push(action.payload.link);
      }
      return ({
        nodes: state.nodes || [],
        links: state.links || [],
      });
    default:
      return state;
  }
};

export default schemaReducer;
