import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Mathematical helper functions to be exported/tested
export interface HexAxialCoord {
  q: number;
  r: number;
  s: number;
}

export function createAxialCoord(q: number, r: number): HexAxialCoord {
  return { q, r, s: -q - r };
}

export function axialToPixel(
  coord: HexAxialCoord,
  radius: number,
  center: { x: number; y: number }
): { x: number; y: number } {
  // Pointy-topped hexagon projection
  const x = center.x + radius * Math.sqrt(3) * (coord.q + coord.r / 2);
  const y = center.y + radius * (3 / 2) * coord.r;
  return {
    x: Number(x.toFixed(3)),
    y: Number(y.toFixed(3)),
  };
}

export function getHexVertices(
  cx: number,
  cy: number,
  radius: number
): Array<{ x: number; y: number }> {
  const vertices: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < 6; i++) {
    // Pointy-topped: start angle = 30° + i * 60°
    const angleRad = ((30 + i * 60) * Math.PI) / 180;
    vertices.push({
      x: Number((cx + radius * Math.cos(angleRad)).toFixed(3)),
      y: Number((cy + radius * Math.sin(angleRad)).toFixed(3)),
    });
  }
  return vertices;
}

export function getRhombicFacets(
  cx: number,
  cy: number,
  vertices: Array<{ x: number; y: number }>
): [string, string, string] {
  // 3 isometric rhombic facets sharing the center (cx, cy)
  // Facet 0: Center -> V0 -> V1 -> V2
  const f0 = `${cx},${cy} ${vertices[0].x},${vertices[0].y} ${vertices[1].x},${vertices[1].y} ${vertices[2].x},${vertices[2].y}`;
  // Facet 1: Center -> V2 -> V3 -> V4
  const f1 = `${cx},${cy} ${vertices[2].x},${vertices[2].y} ${vertices[3].x},${vertices[3].y} ${vertices[4].x},${vertices[4].y}`;
  // Facet 2: Center -> V4 -> V5 -> V0
  const f2 = `${cx},${cy} ${vertices[4].x},${vertices[4].y} ${vertices[5].x},${vertices[5].y} ${vertices[0].x},${vertices[0].y}`;
  return [f0, f1, f2];
}

export function getTetrapodArms(
  cx: number,
  cy: number,
  armLength: number
): Array<{ x1: number; y1: number; x2: number; y2: number; angleDeg: number }> {
  // 3 arms at 120° offsets (90°, 210°, 330°)
  const angles = [90, 210, 330];
  return angles.map((angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x1: cx,
      y1: cy,
      x2: Number((cx + armLength * Math.cos(rad)).toFixed(3)),
      y2: Number((cy + armLength * Math.sin(rad)).toFixed(3)),
      angleDeg,
    };
  });
}

describe("Quantum Hex Lattice Math & Axial Geometry", () => {
  it("enforces q + r + s = 0 axial cubic constraint", () => {
    const coords = [
      createAxialCoord(0, 0),
      createAxialCoord(1, -1),
      createAxialCoord(0, 1),
      createAxialCoord(-1, 0),
      createAxialCoord(2, -1),
    ];
    for (const c of coords) {
      assert.equal(c.q + c.r + c.s, 0, `Axial constraint violated for (${c.q}, ${c.r}, ${c.s})`);
    }
  });

  it("calculates accurate 60° pointy-topped hexagon vertices", () => {
    const cx = 200;
    const cy = 150;
    const radius = 40;
    const vertices = getHexVertices(cx, cy, radius);

    assert.equal(vertices.length, 6);
    // Distance from center to each vertex should be equal to radius
    for (const v of vertices) {
      const dist = Math.sqrt((v.x - cx) ** 2 + (v.y - cy) ** 2);
      assert.ok(Math.abs(dist - radius) < 0.01, `Vertex distance ${dist} must equal radius ${radius}`);
    }
  });

  it("computes 3 distinct non-overlapping rhombic isometric facets", () => {
    const cx = 100;
    const cy = 100;
    const radius = 30;
    const vertices = getHexVertices(cx, cy, radius);
    const facets = getRhombicFacets(cx, cy, vertices);

    assert.equal(facets.length, 3);
    assert.notEqual(facets[0], facets[1]);
    assert.notEqual(facets[1], facets[2]);
    assert.notEqual(facets[0], facets[2]);
    for (const f of facets) {
      assert.ok(f.includes(`${cx},${cy}`), "Each rhombic facet must connect to center");
    }
  });

  it("generates 3-arm tetra-pod emitter rays at 120° separation", () => {
    const cx = 300;
    const cy = 200;
    const armLength = 50;
    const arms = getTetrapodArms(cx, cy, armLength);

    assert.equal(arms.length, 3);
    assert.equal(arms[0].angleDeg, 90);
    assert.equal(arms[1].angleDeg, 210);
    assert.equal(arms[2].angleDeg, 330);

    for (const arm of arms) {
      assert.equal(arm.x1, cx);
      assert.equal(arm.y1, cy);
      const length = Math.sqrt((arm.x2 - cx) ** 2 + (arm.y2 - cy) ** 2);
      assert.ok(Math.abs(length - armLength) < 0.01);
    }
  });
});
