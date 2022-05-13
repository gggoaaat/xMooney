import React from "react";
//import { useLoader } from "react-three-fiber";
import { usePlane } from "@react-three/cannon";

const GamePlane = (props) => {
  const [ref] = usePlane(() => ({ ...props }));
  //const texture = useLoader(THREE.TextureLoader, grass)
  //texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set(240, 240)
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[1000, 1000, 64, 64]} />
      <meshStandardMaterial color="green" wireframe />
    </mesh>
  );
};

export default GamePlane;
