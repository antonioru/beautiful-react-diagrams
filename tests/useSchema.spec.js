import useSchema from '../dist/hooks/useSchema';
import schemaReducer from '../dist/hooks/useSchema/schemaReducer';
import createSchema from '../dist/shared/functions/createSchema';
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

  it('should delete all links related to the removed node', () => {
    const schema = createSchema({
      nodes: [
        {
          id: 'node-1',
          content: 'Node 1',
          coordinates: [1, 0],
          outputs: [{ id: 'port-1' }],
        },
        {
          id: 'node-2',
          content: 'Node 2',
          coordinates: [2, 0],
          inputs: [{ id: 'port-2' }],
        },
        {
          id: 'node-3',
          content: 'Node 3',
          coordinates: [3, 0],
          inputs: [{ id: 'port-3' }],
        },
      ],
      links: [{ input: 'port-2', output: 'port-1' }, { input: 'port-3', output: 'port-1' }],
    });

    const nextSchema = schemaReducer(schema, { type: ON_NODE_REMOVE, payload: { nodeId: schema.nodes[1].id } });

    expect(nextSchema.links).to.deep.equal([{ input: 'port-3', output: 'port-1' }]);
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
