/** @jsx jsx */
import { jsx } from "theme-ui"
import { Global } from "@emotion/core"
import React, { Fragment } from "react"

import { Canvas } from "react-three-fiber"
import {
  Mesh,
  BoxBufferGeometry,
  MeshNormalMaterial,
} from "react-three-fiber/components"
import { Controls } from "../components/Controls"

function Scene() {
  return (
    <Mesh>
      <BoxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <MeshNormalMaterial attach="material" />
    </Mesh>
  )
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
)
