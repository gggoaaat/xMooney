//components/Floor.jsx

import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveShadow={true}>
      <boxBufferGeometry args={[50,5,50]} />
      <meshPhysicalMaterial color='black' />
    </mesh>
  );
}

export default Floor;