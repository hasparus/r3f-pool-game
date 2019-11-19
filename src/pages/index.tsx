/** @jsx jsx */
import { jsx } from "theme-ui";
import { Global } from "@emotion/core";
import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { Color, Vector3 } from "three";
import * as THREE from "three";

import { Canvas, useThree, useFrame } from "react-three-fiber";
import {
  Mesh,
  BoxBufferGeometry,
  MeshNormalMaterial,
  AmbientLight,
  PointLight,
  Object3D,
} from "react-three-fiber/components";
import { Controls } from "../components/Controls";
import { PoolTable } from "../components/PoolTable";
import { PoolBall } from "../components/PoolBall";
import { ballTextures, whiteBallTexture } from "../assets/ballTextures";
import { Cue } from "../components/Cue";

const white = new Color(0xffffff);

const initialBallPositions = [
  [-1.01, 15, 0],
  [1.01, 17, 0],
  [-0.51, 16, 0],
  [-1.01, 17, 0],
  [-2.02, 17, 0],
  [1.53, 16, 0],
  [0.51, 14, 0],
  [0, 15, 0],
  [0, 13, 0],
  [0.51, 16, 0],
  [2.02, 17, 0],
  [-0.51, 14, 0],
  [0, 17, 0],
  [-1.53, 16, 0],
  [1.01, 15, 0],
];

function Main() {
  const { camera, scene, raycaster } = useThree();

  useEffect(() => {
    camera.position.set(0, -16 - 12, 16);
  }, []);

  const gameRoot = useRef<THREE.Object3D>();
  const [whiteBallPos, setWhiteBallPos] = useState([0, -16, 0]);
  const [cuePosition, setCuePosition] = useState();

  useFrame(({ mouse, raycaster, camera: cam }) => {
    if (gameRoot.current) {
      raycaster.setFromCamera(mouse, cam);
      console.log(raycaster.intersectObject(gameRoot.current));
    }
  });

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
      {/* debug */}
      <mesh position={cuePosition}>
        <sphereGeometry attach="geometry" />
        <meshNormalMaterial attach="material" />
      </mesh>

      <Object3D>
        <React.Suspense fallback={<mesh />}>
          <PoolTable />
        </React.Suspense>
        <PoolBall position={whiteBallPos} textureUrl={whiteBallTexture} />
        <Cue position={[0, -16, 0]} />
        <Object3D>
          {initialBallPositions.map((pos, i) => {
            return (
              <PoolBall key={i} position={pos} textureUrl={ballTextures[i]} />
            );
          })}
        </Object3D>
      </Object3D>
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
    <Canvas
      camera={{
        up: [0, 0, 1],
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
      }}
    >
      <Main />
      <Controls />
    </Canvas>
  </Fragment>
);
