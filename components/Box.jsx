import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

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