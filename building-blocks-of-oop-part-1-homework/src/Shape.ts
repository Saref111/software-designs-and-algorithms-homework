import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[], color?: string, filled?: boolean) {
    if (points.length < 3) {
      throw 'Not enough points to build a shape';
    }

    this.points = points;
    this.color = color ? color : 'green';
    this.filled = typeof filled === 'boolean' ? filled : true;
  }

  toString() {
    return `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points: ${
      this.points.map((p) => p.toString()).join(', ')
    }.`;
  }

  getPerimeter() {
    return this.points.reduce((acc, point, i) => {
      if (i < this.points.length - 1) { 
        return acc + point.distance(this.points[i + 1]);
      }
      return acc + point.distance(this.points[0]);
    }, 0)
  }

  abstract getType(): string;
}
