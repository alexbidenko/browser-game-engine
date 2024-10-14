import type {Canvas} from "~/utils/canvas";
import {Drawable} from "~/utils/editor/base/drawable";

export class EditorGrid extends Drawable {
  private readonly width = 10000;
  private readonly height = 10000;

  constructor() {
    super(-5000, -5000);
  }

  private calcVerticalGrid = (canvas: Canvas) => {
    return this.width / 100;
  }

  private calcHorizontalGrid = (canvas: Canvas) => {
    return this.height / 100;
  }

  private fillBackground = (canvas: Canvas) => {
    canvas.context.fillStyle = "lightgray";
    canvas.context.fillRect(0, 0, this.width, this.height);
  }

  private fillGrid = (canvas: Canvas) => {
    canvas.context.strokeStyle = "black";

    for (let i = 0; i <= this.calcVerticalGrid(canvas); i++) {
      canvas.drawLine(
        this.x + i * 100, this.y,
        this.x + i * 100, this.y + this.height
      );
    }

    for (let i = 0; i <= this.calcHorizontalGrid(canvas); i++) {
      canvas.drawLine(
        this.x, this.y + i * 100,
        this.x + this.width, this.y + i * 100,
      );
    }

    canvas.drawDot(0, 0);
  }

  draw = (canvas: Canvas) => {
    this.fillBackground(canvas);
    this.fillGrid(canvas);
  }
}
