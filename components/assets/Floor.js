//components/Floor.jsx

import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveShadow={true}>
      <boxBufferGeometry args={props.size} />
      <meshPhysicalMaterial color={props.color ? props.color : "black"} />
    </mesh>
  );
}

export default Floor;