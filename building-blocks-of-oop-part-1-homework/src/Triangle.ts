import { Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape {

    constructor(point1: Point, point2: Point, point3: Point) {
        // if (!color && typeof filled !== 'boolean') {
        //     super([point1, point2, point3]);
        // }
        
        super([point1, point2, point3]);
    }

    toString(): string {
        return `Triangle[v1=${this.points[0].toString()},v2=${this.points[1].toString()},v3=${this.points[2].toString()}]`
    }

    getType(): string {
        const v1 = this.points[0].distance(this.points[1]);
        const v2 = this.points[1].distance(this.points[2]);
        const v3 = this.points[2].distance(this.points[0]);
        
        switch(true) {
            case v1 === v2 && v2 === v3 && v3 === v1:
                return 'equilateral triangle';
            case v1 === v2 || v2 === v3  || v3 === v1:
                return 'isosceles triangle';
            default:
                return 'scalene triangle';
                
        }
    }
}
