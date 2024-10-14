import type {Drawable} from "~/utils/editor/base/drawable";
import {Canvas} from "~/utils/canvas";

export class Drawer {
  private objects: Drawable[] = [];

  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  register = (object: Drawable) => {
    this.objects.push(object);
  }

  update = () => {
    this.objects.forEach((el) => el.update(this.canvas));
  }
}
