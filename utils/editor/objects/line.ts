import {Drawable} from "~/utils/editor/base/drawable";
import type {Canvas} from "~/utils/canvas";

export class Line extends Drawable {
  x2: number;
  y2: number;

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    super(x1, y1);
    this.x2 = x2;
    this.y2 = y2;
  }

  draw = (canvas: Canvas) => {
    canvas.drawLine(this.x, this.y, this.x2, this.y2, 3);
  }
}
