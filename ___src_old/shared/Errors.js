/**
 * Custom Error
 */
export class DiagramSchemaError extends Error {
  constructor() {
    super();

    this.name = 'Diagram Schema Error';
  }
}

/**
 * Error generators
 */
/* eslint-disable max-len */
export default Object.freeze({
  MUST_HAVE_NODES: () => new DiagramSchemaError('A valid schema should have the required property \'nodes\''),
  INVALID_ID: () => new DiagramSchemaError('A valid node should have the required and unique property \'id\''),
  INVALID_COORDS: (id) => new DiagramSchemaError(`${id} node 'coordinates' property is not valid.`),
  INVALID_CONTENT: (id) => new DiagramSchemaError(`${id} node 'content' property is not valid.`),
  INVALID_PORT_ID: () => new DiagramSchemaError('A valid port should have a unique id'),
  INVALID_PORT_CAN_LINK: (id) => new DiagramSchemaError(`${id} port 'canLink' property is not valid.`),
  INVALID_PORT_ALIGNMENT: (id) => new DiagramSchemaError(`${id} port 'alignment' property is not valid.`),
  INVALID_INPUTS_ARRAY: (id) => new DiagramSchemaError(`${id} node 'input' property is not valid.`),
  INVALID_NODES_ARRAY: () => new DiagramSchemaError('The \'nodes\' property is not a valid array'),
  INVALID_LINKS_ARRAY: () => new DiagramSchemaError('The \'links\' property is not a valid array'),
  LINK_INVALID_INPUT_OUTPUT: () => new DiagramSchemaError('Link properties \'input\' and \'output\' are required string'),
  LINK_INVALID_READONLY: () => new DiagramSchemaError('Link property \'readonly\' should be a boolean value'),
});
/* eslint-enable max-len */
