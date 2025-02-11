/*
 * Copyright 2019 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { convexHull, difference } from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";

export const computeBoundingPolygon = (polygon: Polygon): Polygon => {
  const hull = convexHull(polygon) as Polygon;
  const centroid = hull.centroid;
  const rings = hull.rings;
  rings.forEach(ring =>
    ring.forEach(point => {
      point[0] = point[0] + (point[0] - centroid.x) * 100;
      point[1] = point[1] + (point[1] - centroid.y) * 100;
    })
  );
  hull.rings = rings;
  return difference(hull, polygon) as Polygon;
};
