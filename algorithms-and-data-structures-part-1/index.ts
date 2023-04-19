interface Vertex<T> {
    key: T;
    edges: Edge<T>[];
}

class Vertex<T> implements Vertex<T> {
    constructor(key: T) {
        this.key = key;
        this.edges = [];
    }
}

interface Edge<T> {
    from: Vertex<T>;
    to: Vertex<T>;
    weight: number;
}

class Edge<T> implements Edge<T> {
    constructor(from: Vertex<T>, to: Vertex<T>, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}

class WeightedGraph<T> {
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


interface Path<T> {
    path: T[];
    distance: number;
}
  
interface Dijkstra<T> {
    findShortestPath(vertex1: T, vertex2: T): Path<T>;
    findAllShortestPaths(vertex: T): Map<T, Path<T>>;
}

class Dijkstra<T> implements Dijkstra<T> {
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

const vertex1 = new Vertex('1');
const vertex2 = new Vertex('2');
const vertex3 = new Vertex('3');
const vertex4 = new Vertex('4');
const vertex5 = new Vertex('5');

const vertices = [
    vertex1,
    vertex2,
    vertex3,
    vertex4,
  ];

  const edges = [
    new Edge(vertex1, vertex4, 3),
    new Edge(vertex1, vertex2, 5),
    new Edge(vertex1, vertex3, 4),
    new Edge(vertex2, vertex4, 6),
    new Edge(vertex2, vertex3, 5),
  ];
const graph = new WeightedGraph()

vertices.forEach(verticle => graph.addVertex(verticle));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstra = new Dijkstra(graph);

console.log(dijkstra.findShortestPath(vertex4, vertex3)); // { path: ['4', '1', '3'], distance: 7 }
dijkstra.findShortestPath(vertex1, vertex5); // { path: [], distance: Infinity }
dijkstra.findShortestPath(vertex1, vertex1); // { path: ['1'], distance: 0 }

dijkstra.findAllShortestPaths(vertex4);
