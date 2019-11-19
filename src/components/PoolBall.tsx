import React, { useMemo, forwardRef, ComponentProps } from "react";
import Three, { TextureLoader, Vector2 } from "three";
import * as t from "react-three-fiber/components";

interface PoolBallProps extends ComponentProps<typeof t.Mesh> {
  textureUrl: string;
}
export const PoolBall = forwardRef<Three.Mesh, PoolBallProps>(
  ({ textureUrl, ...rest }, ref) => {
    const texture = useMemo(() => new TextureLoader().load(textureUrl), [
      textureUrl,
    ]);

    return (
      <t.Mesh ref={ref} {...rest}>
        <t.SphereGeometry attach="geometry" args={[0.5, 128, 128]} />
        <t.MeshStandardMaterial
          attach="material"
          color={0xffffff}
          roughness={0.25}
          metalness={0}
          map={texture}
        />
      </t.Mesh>
    );
  }
);

PoolBall.displayName = "PoolBall";
