import { DiagramSchema, Port, Node, Link } from './DiagramSchema';

export declare const validatePort: (port: Port) => boolean;
export declare const validateNode: (node: Node) => boolean;
export declare const validateNodes: (nodes: Array<Node>) => boolean;
export declare const validateLink: (link: Link) => boolean;
export declare const validateLinks: (links: Array<Link>) => boolean;
export declare const validateSchema: (schema: DiagramSchema) => boolean;

export default validateSchema;
