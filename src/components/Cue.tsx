import React, { forwardRef, ComponentProps } from "react";
import * as Three from "three";
import {
  Mesh,
  CylinderGeometry,
  MeshPhongMaterial,
} from "react-three-fiber/components";
import { ReactThreeFiber } from "react-three-fiber";

const vec = (v: ReactThreeFiber.Vector3) => {
  return v instanceof Three.Vector3 ? v : new Three.Vector3(...v);
};

export interface CueProps
  extends Omit<ComponentProps<typeof Mesh>, "position"> {
  position: ReactThreeFiber.Vector3;
}
export const Cue = forwardRef<Three.Mesh, CueProps>(
  ({ position, ...rest }: CueProps, ref) => {
    const pos = vec(position).add(new Three.Vector3(0, -10, 1));

    return (
      <Mesh
        ref={ref}
        rotation={[-Math.PI / 32, 0, 0]}
        castShadow
        position={pos}
        {...rest}
      >
        <CylinderGeometry attach="geometry" args={[0.1, 0.15, 16, 32, 32]} />
        <MeshPhongMaterial attach="material" color={0x664536} />
      </Mesh>
    );
  }
);
