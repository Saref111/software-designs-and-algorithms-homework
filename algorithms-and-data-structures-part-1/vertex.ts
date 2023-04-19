import { Edge } from './edge';

export interface Vertex<T> {
    key: T;
    edges: Edge<T>[];
}

export class Vertex<T> implements Vertex<T> {
    constructor(key: T) {
        this.key = key;
        this.edges = [];
    }
}
