import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Loading() {
  return (
    <mesh visible position={[0, 0.87, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="black"
        transparent
        opacity={1}
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}

function Box(props) {

  let image = props.image ? props.image : "/xMooney_Logo_Token_300px_x_300px.png";
  
  let texture = useLoader(TextureLoader, image);
  if (props.image) {
    return (
      <mesh {...props} recieveShadow={true} castShadow={true}>
        <boxBufferGeometry args={props.size} />
        <meshPhysicalMaterial map={texture} color={props.color ? props.color : "black"} />
      </mesh>
    );
  }
  else {
    return (
      <mesh {...props} recieveShadow={true} castShadow={true}>
        <boxBufferGeometry args={props.size} />
        <meshPhysicalMaterial color={props.color ? props.color : "black"} />
      </mesh>
    );
  }
}

export default Box;