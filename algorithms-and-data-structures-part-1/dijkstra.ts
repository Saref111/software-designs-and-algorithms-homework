import { Path } from "./path";
import { WeightedGraph } from "./weight-graph";


export interface Dijkstra<T> {
    findShortestPath(vertex1: T, vertex2: T): Path<T>;
    findAllShortestPaths(vertex: T): Map<T, Path<T>>;
}

export class Dijkstra<T> implements Dijkstra<T> {
    private graph: WeightedGraph<T>;
  
    constructor(graph: WeightedGraph<T>) {
      this.graph = graph;
    }

    private findMinDistanceVertex(
        distances: Map<T, number>,
        visited: Set<T>
    ): T | undefined {
        let minDistance = Infinity;
        let minVertex: T | undefined;
        for (const [vertex, distance] of distances) {
            if (!visited.has(vertex) && distance <= minDistance) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }

    findShortestPath(vertex1: T, vertex2: T): Path<T> {
        const distances = new Map<T, number>();
        const previous = new Map<T, T | undefined>();
        const visited = new Set<T>();

        // Set initial distances
        for (const [key, vertex] of this.graph.vertices) {
            distances.set(key, key === vertex1 ? 0 : Infinity);
            previous.set(key, undefined);
        }

        // Iterate through all vertices
        while (visited.size < this.graph.vertices.size) {
            const currentVertex = this.findMinDistanceVertex(distances, visited);
            if (!currentVertex) {
                break;
            }
            visited.add(currentVertex);

            // Update distances of adjacent vertices
            const currentDistance = distances.get(currentVertex)!;
            const currentEdges = this.graph.vertices.get(currentVertex)!.edges;
            for (const edge of currentEdges) {
                const adjacentVertex = edge.to.key;
                const weight = edge.weight;
                const distance = currentDistance + weight;
                if (distance < distances.get(adjacentVertex)!) {
                    distances.set(adjacentVertex, distance);
                    previous.set(adjacentVertex, currentVertex);
                }
            }
        }

        // Build path
        const path: T[] = [];
        let currentVertex = vertex2;
        while (currentVertex !== vertex1) {
            path.unshift(currentVertex);
            currentVertex = previous.get(currentVertex)!;
        }
        path.unshift(vertex1);

        return { path, distance: distances.get(vertex2)! };
    }

    findAllShortestPaths(vertex: T): Map<T, Path<T>> {
        const distances = new Map<T, number>();
        const previous = new Map<T, T | undefined>();
        const visited = new Set<T>();
        const result = new Map<T, Path<T>>();

        // Set initial distances
        for (const [key, v] of this.graph.vertices) {
            distances.set(key, key === vertex ? 0 : Infinity);
            previous.set(key, undefined);
        }

        // Iterate through all vertices
        while (visited.size < this.graph.vertices.size) {
            const currentVertex = this.findMinDistanceVertex(distances, visited);
            if (!currentVertex) {
                break;
            }
            visited.add(currentVertex);

            // Update distances of adjacent vertices
            const currentDistance = distances.get(currentVertex)!;
            const currentEdges = this.graph.vertices.get(currentVertex)!.edges;
            for (const edge of currentEdges) {
                const adjacentVertex = edge.to.key;
                const weight = edge.weight;
                const distance = currentDistance + weight;
                
                if (distance < distances.get(adjacentVertex)!) {
                    distances.set(adjacentVertex, distance);
                    previous.set(adjacentVertex, currentVertex);
                }
            }
        }

        // Build result map
        for (const [key, v] of this.graph.vertices) {
            if (key !== vertex) {
            const path: T[] = [];
            let currentVertex = key;
            while (currentVertex !== vertex) {
            path.unshift(currentVertex);
            currentVertex = previous.get(currentVertex)!;
        }
            path.unshift(vertex);
            result.set(key, { path, distance: distances.get(key)! });
        }
        }

        return result;
        }
}  
