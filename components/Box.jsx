import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Box(props) {
  const texture = props.image ? useLoader(TextureLoader, props.image) : null;
  return (
    <mesh {...props} recieveShadow={true} castShadow={true}>
      <boxBufferGeometry args={props.size}  />
      <meshPhysicalMaterial map={texture} color={props.color ? props.color : "black"} />
    </mesh>
  );
}

export default Box;