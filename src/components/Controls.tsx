import React, { useRef } from "react"
import { extend, useThree, useFrame, ReactThreeFiber } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// TODO: Consider returning fake component from `extend`
extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
    }
  }
}

export function Controls() {
  const controlsRef = useRef<OrbitControls>()
  const { camera, gl } = useThree()

  useFrame(() => controlsRef.current && controlsRef.current.update())

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableRotate
      enablePan={false}
      maxDistance={100}
      minDistance={5}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
    />
  )
}
