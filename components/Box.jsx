import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Box(props) {
  const texture = useLoader(TextureLoader, "/xMooney_Logo_Token_1000px_x_1000px.png");
  return (
    <mesh {...props} recieveShadow={true} castShadow={true}>
      <boxBufferGeometry args={[5,5,5]}  />
      <meshPhysicalMaterial map={texture} color={"white"} />
    </mesh>
  );
}

export default Box;