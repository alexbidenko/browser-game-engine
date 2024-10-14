import {EditorGrid} from "~/utils/editor/grid";
import {Canvas} from "~/utils/canvas";
import {Camera} from "~/utils/editor/camera";
import {Drawer} from "~/utils/editor/drawer";
import {Controller} from "~/utils/editor/controller";
import {Creator} from "~/utils/editor/creator";

export class Editor {
  private readonly canvas: Canvas;
  private readonly camera: Camera;
  private readonly drawer: Drawer;

  readonly creator: Creator;

  constructor(element: HTMLCanvasElement) {
    this.camera = new Camera(0, 0, 500);
    this.canvas = new Canvas(element, this.camera);
    this.drawer = new Drawer(this.canvas);
    this.creator = new Creator(this.canvas, this.drawer);

    new Controller(this.camera, this.drawer).init();

    this.drawer.register(new EditorGrid());

    this.drawer.update();
  }
}
