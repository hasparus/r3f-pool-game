import React, { useRef, useEffect } from "react";
import { extend, useThree, useFrame, ReactThreeFiber } from "react-three-fiber";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

// TODO: Consider returning fake component from `extend`
extend({ MapControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mapControls: ReactThreeFiber.Node<MapControls, typeof MapControls>;
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
  const controlsRef = useRef<MapControls>();
  const { camera, gl } = useThree();

  // set cursor to "grabbing" while user rotates
  useEffect(() => {
    let previousCursor = "default";
    const onMouseDown = (event: MouseEvent) => {
      if (event.button === 2) {
        previousCursor = document.body.style.cursor;
        document.body.style.cursor = "grabbing";
      }
    };
    const onMouseUp = (event: MouseEvent) => {
      if (event.button === 2) {
        document.body.style.cursor = previousCursor;
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useFrame(() => controlsRef.current && controlsRef.current.update());

  return (
    <mapControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableRotate
      enablePan={false}
      maxDistance={100}
      minDistance={7}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
    />
  );
}
