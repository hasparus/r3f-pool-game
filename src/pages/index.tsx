/** @jsx jsx */
import { jsx } from "theme-ui";
import { Global } from "@emotion/core";
import React, { Fragment } from "react";
import * as Three from "three";

import { Canvas, useThree } from "react-three-fiber";
import {
  Mesh,
  BoxBufferGeometry,
  MeshNormalMaterial,
  AmbientLight,
  PointLight,
} from "react-three-fiber/components";
import { Controls } from "../components/Controls";
import { PoolTable } from "../components/PoolTable";

const white = new Three.Color(0xffffff);

function Scene() {
  const { camera } = useThree();

  // does this work at all?
  (camera as any).fov = 45;
  (camera as any).aspect = window.innerWidth / window.innerHeight;
  camera.near = 0.1;
  camera.far = 1000;
  camera.up.set(0, 0, 1);
  camera.position.set(-5, 7, 5);

  return (
    <Fragment>
      <AmbientLight color={white} intensity={0.2} position={[0, 0, 0]} />
      {[
        [-5, -12, 20],
        [5, -12, 20],
        [-5, 12, 20],
        [5, 12, 20],
      ].map((pos, i) => (
        <PointLight
          key={i}
          color={white}
          intensity={0.4}
          distance={100}
          position={pos}
          castShadow
        />
      ))}
      <React.Suspense fallback={<mesh />}>
        <PoolTable />
      </React.Suspense>
    </Fragment>
  );
}

export default () => (
  <Fragment>
    <Global
      styles={{
        body: {
          margin: 0,
          height: "100vh",
          width: "100vw",
          backgroundColor: "#000",
        },
        "#___gatsby, #gatsby-focus-wrapper": { height: "100%" },
      }}
    />
    <Canvas>
      <Scene />
      <Controls />
    </Canvas>
  </Fragment>
);
