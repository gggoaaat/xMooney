import React from "react";
import { useBox } from "use-cannon";

export const Cubes = (props) => {
  const cubes = props.geoms;
  return cubes.map((coords) => <Cube key={Math.random()} position={coords} />);
};

export const Cube = (props) => {
  const [ref] = useBox(() => ({ type: "Static", ...props }));
  console.log(ref);
  return (
    <mesh ref={ref} receiveShadow castShadow>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial attachArray="material" wireframe color={"cyan"} />
      ))}
      <boxBufferGeometry args={[3, 3, 3]} computeBoundingBox />
    </mesh>
  );
};
