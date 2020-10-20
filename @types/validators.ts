import { DiagramSchema, Port, Node, Link } from './DiagramSchema';

export declare const validatePort: (port: Port) => boolean;
export declare const validateNode: <P>(node: Node<P>) => boolean;
export declare const validateNodes: <P>(nodes: Array<Node<P>>) => boolean;
export declare const validateLink: (link: Link) => boolean;
export declare const validateLinks: (links: Array<Link>) => boolean;
export declare const validateSchema: <P>(schema: DiagramSchema<P>) => boolean;

export default validateSchema;
