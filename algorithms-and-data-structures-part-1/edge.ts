import { Vertex } from './vertex';

export interface Edge<T> {
    from: Vertex<T>;
    to: Vertex<T>;
    weight: number;
}

export class Edge<T> implements Edge<T> {
    constructor(from: Vertex<T>, to: Vertex<T>, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}
