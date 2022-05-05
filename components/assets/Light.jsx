import React from "react";

function LightBulb(props) {
  return (
    <mesh {...props} >
      <pointLight castShadow />
      <sphereBufferGeometry args={[5, 30, 10]} />
      <meshPhongMaterial emissive={props.color ? props.color : "yellow" }  />
    </mesh>
  );
}

export default LightBulb;