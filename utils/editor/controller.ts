import {Camera} from "~/utils/editor/camera";
import type {Drawer} from "~/utils/editor/drawer";

export class Controller {
  private readonly camera: Camera;
  private readonly drawer: Drawer;

  private isMoving = false;

  constructor(camera: Camera, drawer: Drawer) {
    this.camera = camera;
    this.drawer = drawer;
  }

  private initMovement = () => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 1) this.isMoving = true;
    })

    document.addEventListener('mousemove', (e) => {
      if (this.isMoving) {
        this.camera.x -= e.movementX * this.camera.z / 100;
        this.camera.y -= e.movementY * this.camera.z / 100;

        this.drawer.update();
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (e.button === 1) this.isMoving = false;
    })
  }

  private initZooming = () => {
    document.addEventListener('wheel', (e) => {
      this.camera.z = Math.max(this.camera.z + e.deltaY, 100);

      this.drawer.update();
    });
  }

  init = () => {
    this.initMovement();
    this.initZooming();
  }
}
