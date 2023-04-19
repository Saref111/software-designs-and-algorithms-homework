import { Vertex } from "./vertex";

export class WeightedGraph<T> {
    vertices: Map<T, Vertex<T>>;

    constructor() {
        this.vertices = new Map<T, Vertex<T>>();
    }

    addVertex(key: T): void {
        if (!this.vertices.has(key)) {
            this.vertices.set(key, { key, edges: [] });
        }
    }

    addEdge(vertex1: T, vertex2: T, weight: number): void {
        const v1 = this.vertices.get(vertex1);
        const v2 = this.vertices.get(vertex2);
        if (v1 && v2) {
            v1.edges.push({ from: v1, to: v2, weight });
            v2.edges.push({ from: v2, to: v1, weight }); // for undirected graph
        }
    }
}
