import {Canvas} from "~/utils/canvas";
import {Drawer} from "~/utils/editor/drawer";
import {Rectangle} from "~/utils/editor/objects/rectangle";
import {Line} from "~/utils/editor/objects/line";

enum ObjectType {
  line,
  rectangle,
}

export class Creator {
  private readonly canvas: Canvas;
  private readonly drawer: Drawer;

  private isEditing = false;
  private isAppending = false;
  private objectType = ObjectType.line;

  private startX = 0;
  private startY = 0;
  private x = 0;
  private y = 0;

  constructor(canvas: Canvas, drawer: Drawer) {
    this.canvas = canvas;
    this.drawer = drawer;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 && this.isEditing) {
        this.isAppending = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
      }
    })

    document.addEventListener('mousemove', (e) => {
      if (this.isAppending) {
        this.x = e.clientX;
        this.y = e.clientY;

        this.drawer.update();

        switch (this.objectType) {
          case ObjectType.line: {
            this.canvas.context.strokeStyle = "blue";
            this.canvas.context.lineWidth = 3;
            this.canvas.context.beginPath();
            this.canvas.context.moveTo(this.startX, this.startY);
            this.canvas.context.lineTo(this.x, this.y);
            this.canvas.context.stroke();
            break;
          }
          case ObjectType.rectangle: {
            this.canvas.context.fillStyle = "blue";
            this.canvas.context.fillRect(this.startX, this.startY, this.x - this.startX, this.y - this.startY);
            break;
          }
        }
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.isAppending) {
        switch (this.objectType) {
          case ObjectType.line: {
            this.drawer.register(new Line(
              this.canvas.calculateX(this.startX),
              this.canvas.calculateY(this.startY),
              this.canvas.calculateX(this.x),
              this.canvas.calculateY(this.y),
            ))
            break;
          }
          case ObjectType.rectangle: {
            this.drawer.register(new Rectangle(
              this.canvas.calculateX(this.startX),
              this.canvas.calculateY(this.startY),
              this.canvas.calculateWidth(this.x - this.startX),
              this.canvas.calculateHeight(this.y - this.startY),
            ))
            break;
          }
        }

        this.isAppending = false;

        this.drawer.update();
      }

      this.isEditing = false;
    })
  }

  addLine = () => {
    this.isEditing = true;
    this.objectType = ObjectType.line;
  }

  addRectangle = () => {
    this.isEditing = true;
    this.objectType = ObjectType.rectangle;
  }

  cancel = () => {
    this.isEditing = false;
  }
}
