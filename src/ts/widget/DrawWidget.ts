
import Color from "esri/Color";
import {
  declared,
  property,
  subclass,
} from "esri/core/accessorSupport/decorators";
import { whenOnce } from "esri/core/watchUtils";
import Point from "esri/geometry/Point";
import Polygon from "esri/geometry/Polygon";
import Polyline from "esri/geometry/Polyline";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import EsriSymbol from "esri/symbols/Symbol";

import Scene from "../Scene";
import CreatePoint from "./operation/CreatePoint";
import CreatePolygon from "./operation/CreatePolygon";
import CreatePolyline from "./operation/CreatePolyline";
import WidgetBase from "./WidgetBase";
import Graphic = require('esri/Graphic');
import Operation from './operation/Operation';
import UpdateOperation from './operation/UpdateOperation';

@subclass("app.draw.DrawWidget")
export default class DrawWidget extends declared(WidgetBase) {

  @property()
  public layer: GraphicsLayer;

  constructor(params?: any) {
    super(params);

    this.layer = new GraphicsLayer({
      elevationInfo: {
        mode: "on-the-ground",
      },
    });
    whenOnce(this, "scene", () => this.scene.map.add(this.layer));
  }

  public updateGraphic(graphic: Graphic): Operation<Graphic> {
    if (graphic.layer !== this.layer) {
      throw new Error("Graphic must belong to this widget's layer");
    }
    return new UpdateOperation(this, graphic);
  }

  protected createPolygon(color: Color): IPromise<Polygon[]> {
    return new CreatePolygon(this, color).finished;
  }

  protected createPolyline(color: Color): IPromise<Polyline[]> {
    return new CreatePolyline(this, color).finished;
  }

  protected createPoint(symbol: EsriSymbol): IPromise<Point[]> {
    return new CreatePoint(this, symbol).finished;
  }

}
