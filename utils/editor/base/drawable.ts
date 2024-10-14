import type {Canvas} from "~/utils/canvas";

export abstract class Drawable {
  protected x: number;
  protected y: number;

  protected constructor(
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
  }

  public update = (canvas: Canvas) => {
    this.draw(canvas);
  }

  protected draw = (canvas: Canvas) => {}
}
