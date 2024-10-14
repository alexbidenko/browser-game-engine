import type {Camera} from "~/utils/editor/camera";

export class Canvas {
  private readonly element: HTMLCanvasElement;
  private readonly camera: Camera;

  constructor(element: HTMLCanvasElement, camera: Camera) {
    this.element = element;
    this.element.width = this.element.clientWidth;
    this.element.height = this.element.clientHeight;

    this.camera = camera;
  }

  calculateWidth = (width: number) => {
    return width * (this.camera.z / 100);
  }

  calculateHeight = (height: number) => {
    return height * (this.camera.z / 100);
  }

  calculateX = (x: number) => {
    return this.calculateWidth(x - this.element.width / 2) + this.camera.x;
  }

  calculateY = (y: number) => {
    return this.calculateHeight(y - this.element.height / 2) + this.camera.y;
  }

  normalizedWidth = (width: number) => {
    return width / (this.camera.z / 100);
  }

  normalizedHeight = (height: number) => {
    return height / (this.camera.z / 100);
  }

  normalizedX = (x: number) => {
    return this.normalizedWidth(x - this.camera.x) + this.element.width / 2;
  }

  normalizedY = (y: number) => {
    return this.normalizedHeight(y - this.camera.y) + this.element.height / 2;
  }

  drawLine = (x1: number, y1: number, x2: number, y2: number, width: number = 1) => {
    this.context.strokeStyle = "black";
    this.context.lineWidth = width;

    this.context.beginPath();
    this.context.moveTo(this.normalizedX(x1), this.normalizedY(y1));
    this.context.lineTo(this.normalizedX(x2), this.normalizedY(y2));
    this.context.stroke();
  };

  drawDot = (x: number, y: number) => {
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(this.normalizedX(x), this.normalizedY(y), 5, 0, 2 * Math.PI);
    this.context.fill();
  }

  drawRectangle = (x: number, y: number, width: number, height: number) => {
    this.context.fillStyle = "blue";
    this.context.fillRect(
      this.normalizedX(x), this.normalizedY(y),
      this.normalizedWidth(width), this.normalizedHeight(height),
    );
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }

  get context() {
    const ctx = this.element.getContext("2d");
    if (!ctx) throw new Error("Could not get context");
    return ctx;
  }
}
