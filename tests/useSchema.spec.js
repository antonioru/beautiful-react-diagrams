import useSchema from '../dist/hooks/useSchema';
import schemaReducer from '../dist/hooks/useSchema/schemaReducer';
import { ON_CHANGE, ON_CONNECT, ON_NODE_ADD, ON_NODE_REMOVE } from '../dist/hooks/useSchema/actionTypes';

describe('useSchema reducer', () => {
  it('should return the same state if the action is invalid', () => {
    const initialState = { foo: 'true' };
    const state = schemaReducer(initialState, { type: null });

    expect(state).to.be.an('object');
    expect(state).to.equal(initialState);
  });

  it('should reduce the state according to the ON_CHANGE action', () => {
    const node = { id: 'foo', coordinates: [1, 0] };
    const schema = { nodes: [] };

    let nextSchema = schemaReducer(schema, { type: ON_CHANGE, payload: { nodes: [node] } });

    expect(nextSchema).to.have.property('nodes');
    expect(nextSchema).to.have.property('links');
    expect(nextSchema.nodes).to.deep.equal([node]);
    expect(nextSchema.links).to.be.an('Array');
    expect(nextSchema.links.length).to.equal(0);

    nextSchema = schemaReducer({}, { type: ON_CHANGE, payload: {} });

    expect(nextSchema).to.have.property('nodes');
    expect(nextSchema).to.have.property('links');
    expect(nextSchema.nodes.length).to.equal(0);
    expect(nextSchema.links.length).to.equal(0);
  });

  it('should reduce the state according to the ON_NODE_ADD action', () => {
    const node = { id: 'foo', coordinates: [1, 0] };
    const schema = { nodes: [] };

    const nextSchema = schemaReducer(schema, { type: ON_NODE_ADD, payload: { node } });

    expect(nextSchema).to.have.property('nodes');
    expect(nextSchema).to.have.property('links');
    expect(nextSchema.nodes[0]).to.deep.equal(node);
    expect(nextSchema.links).to.be.an('Array');
    expect(nextSchema.links.length).to.equal(0);
  });

  it('should reduce the state according to the ON_NODE_REMOVE action', () => {
    const node = { id: 'foo', coordinates: [1, 0] };
    const schema = { nodes: [node] };

    const nextSchema = schemaReducer(schema, { type: ON_NODE_REMOVE, payload: { nodeId: node.id } });

    expect(nextSchema).to.have.property('nodes');
    expect(nextSchema).to.have.property('links');
    expect(nextSchema.nodes).to.deep.equal([]);
  });

  it('should reduce the state according to the ON_CONNECT action', () => {
    const link = { from: 'foo', to: 'bar' };
    const schema = { links: [] };

    const nextSchema = schemaReducer(schema, { type: ON_CONNECT, payload: { link } });

    expect(nextSchema).to.have.property('nodes');
    expect(nextSchema).to.have.property('links');
    expect(nextSchema.nodes).to.deep.equal([]);
    expect(nextSchema.links).to.deep.equal([link]);
  });
});

// TODO: test this hook
describe('useSchema hook', () => {
  it('should be a function', () => {
    expect(useSchema).to.be.a('function');
  });
});
