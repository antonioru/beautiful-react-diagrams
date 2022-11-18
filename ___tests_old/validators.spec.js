import { DiagramSchemaError } from '../dist/shared/Errors';
import {
  validatePort,
  validateLink,
  validateNode,
  validateNodes,
  validateLinks,
  validateSchema,
} from '../dist/shared/functions/validators';

describe('validatePort', () => {
  it('should return true for valid ports', () => {
    const port = {
      id: 'foo',
      canLink: () => null,
      alignment: 'right',
    };

    expect(validatePort(port)).to.be.true;
  });

  it('should throw for invalid ports', () => {
    expect(() => validatePort({})).to.throw(DiagramSchemaError);
    expect(() => validatePort({ id: 'foo', canLink: 'foo' })).to.throw(DiagramSchemaError);
    expect(() => validatePort({ id: 'foo', canLink: 10 })).to.throw(DiagramSchemaError);
    expect(() => validatePort({ id: 'foo', alignment: 'foo' })).to.throw(DiagramSchemaError);
  });
});

describe('validateLink', () => {
  it('should return true for valid links', () => {
    const link = {
      input: 'foo',
      output: 'bar',
      readonly: false,
    };

    expect(validateLink(link)).to.be.true;
  });

  it('should throw for invalid links', () => {
    expect(() => validateLink({})).to.throw(DiagramSchemaError);
    expect(() => validateLink({ input: 'foo' })).to.throw(DiagramSchemaError);
    expect(() => validateLink({ output: 'foo' })).to.throw(DiagramSchemaError);
    expect(() => validateLink({ input: 'foo', output: 'foo', readonly: 10 })).to.throw(DiagramSchemaError);
    expect(() => validateLink({ input: {}, output: [], readonly: 10 })).to.throw(DiagramSchemaError);
  });
});

describe('validateNode', () => {
  it('should return true for valid nodes', () => {
    const node = {
      id: 'foo',
      coordinates: [0, 0],
      content: 'Foo',
    };

    expect(validateNode(node)).to.be.true;
  });

  it('should throw for invalid nodes', () => {
    const valid = {
      id: 'foo',
      coordinates: [0, 0],
      content: 'Foo',
    };

    expect(() => validateNode({})).to.throw(DiagramSchemaError);
    expect(() => validateNode({ id: 'foo' })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ id: 'foo', coordinates: [] })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ id: 'foo', coordinates: [1, 2, 3] })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ id: 'foo', coordinates: [1, 2], content: new Set() })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, inputs: 'foo', outputs: [] })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, inputs: [], outputs: 'foo' })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, outputs: new Map() })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, inputs: new Set() })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, content: {} })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, inputs: [{ id: null }] })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, outputs: [{ id: null }] })).to.throw(DiagramSchemaError);
    expect(() => validateNode({ ...valid, outputs: [{ canLink: 10, id: 'foo' }] })).to.throw(DiagramSchemaError);
  });
});

describe('validateNodes', () => {
  it('should return true for valid nodes', () => {
    const nodes = [
      { id: 'foo', coordinates: [0, 0], content: 'Foo' },
      { id: 'foo2', coordinates: [0, 0], content: 'Foo' },
      { id: 'foo3', coordinates: [0, 0], content: 'Foo' },
    ];

    expect(validateNodes(nodes)).to.be.true;
  });

  it('should throw for invalid nodes', () => {
    const invalidNodes = [
      { id: 'foo', coordinates: [0, 0], content: 'Foo' },
      { id: 'foo2', coordinates: [0, 0], content: 'Foo' },
      { coordinates: [0, 0], content: 'Foo' },
    ];

    expect(() => validateNodes({})).to.throw(DiagramSchemaError);
    expect(() => validateNodes('foo')).to.throw(DiagramSchemaError);
    expect(() => validateNodes(invalidNodes)).to.throw(DiagramSchemaError);
  });
});

describe('validateLinks', () => {
  it('should return true for valid links', () => {
    const links = [
      { input: 'foo', output: 'bar', readonly: false },
      { input: 'bar', output: 'foo', readonly: true },
    ];

    expect(validateLinks(links)).to.be.true;
  });

  it('should throw for invalid links', () => {
    const invalidLinks = [
      { input: 'foo', output: 'bar', readonly: false },
      { input: [], output: {}, readonly: 'false' },
    ];

    expect(() => validateLinks({})).to.throw(DiagramSchemaError);
    expect(() => validateLinks('foo')).to.throw(DiagramSchemaError);
    expect(() => validateLinks(invalidLinks)).to.throw(DiagramSchemaError);
  });
});

describe('validateSchema', () => {
  it('should return true for valid schemas', () => {
    const schema = {
      nodes: [
        { id: 'foo', coordinates: [0, 0], content: 'Foo' },
        { id: 'foo2', coordinates: [0, 0], content: 'Foo' },
        { id: 'foo3', coordinates: [0, 0], content: 'Foo' },
      ],
      links: [
        { input: 'foo', output: 'bar', readonly: false },
        { input: 'bar', output: 'foo', readonly: true },
      ],
    };

    expect(validateSchema(schema)).to.be.true;
  });

  it('should throw for invalid schemas', () => {
    const schema = {
      nodes: [
        { id: 'foo', coordinates: [0, 0], content: 'Foo' },
        { id: 'foo2', coordinates: [0, 0], content: 'Foo' },
        { id: 'foo3', content: 'Foo' },
      ],
      links: [
        { input: 'foo', output: 'bar', readonly: false },
        { input: 'bar', output: 'foo', readonly: true },
      ],
    };

    expect(() => validateSchema({})).to.throw(DiagramSchemaError);
    expect(() => validateSchema({ links: [{ input: 'foo', output: 'bar' }] })).to.throw(DiagramSchemaError);
    expect(() => validateSchema('foo')).to.throw(DiagramSchemaError);
    expect(() => validateSchema(schema)).to.throw(DiagramSchemaError);
  });
});
