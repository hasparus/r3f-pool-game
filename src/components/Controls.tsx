import React, { useRef } from "react";
import { extend, useThree, useFrame, ReactThreeFiber } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";

// TODO: Consider returning fake component from `extend`
extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}

const keys = {
  LEFT: 37, //left arrow
  UP: 38, // up arrow
  RIGHT: 39, // right arrow
  BOTTOM: 40, // down arrow
};

export function Controls() {
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  useFrame(() => controlsRef.current && controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableRotate
      enablePan
      maxDistance={100}
      minDistance={7}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
    />
  );
}
