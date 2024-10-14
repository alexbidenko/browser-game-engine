import {Drawable} from "~/utils/editor/base/drawable";
import type {Canvas} from "~/utils/canvas";

export class Rectangle extends Drawable {
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  draw = (canvas: Canvas) => {
    canvas.drawRectangle(this.x, this.y, this.width, this.height);
  }
}
