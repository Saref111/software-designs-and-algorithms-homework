const countCoordsDistance = (x1: number, x2: number, y1: number, y2: number) => Math.sqrt(Math.round(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))

export class Point {
    x: number;
    y: number;

    constructor(); 
    constructor(x?: number); 
    constructor(x?: number, y?: number) {
        x ? this.x = x : this.x = 0;
        y ? this.y = y : this.y = 0;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    distance();
    distance(x: Point);
    distance(x?: number | Point, y?: number) {
        if (!x) return countCoordsDistance(this.x, 0, this.y, 0);

        if (x instanceof Point) {
            const point = x
            return countCoordsDistance(this.x, point.x, point.y, this.y);
        }

        if (y) {
            return countCoordsDistance(this.x, x, this.y, y);
        }
    }
}
