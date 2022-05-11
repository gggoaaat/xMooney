import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { usePlane } from "@react-three/cannon"
import objectStich from './ObjectStich';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const Ground = (props) => {
  const ObjectStich = objectStich()
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  const texture = useLoader(THREE.TextureLoader, "/minecraft/grass.jpg")
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  return (
    // <mesh ref={ref} receiveShadow>
    //   <planeGeometry args={[1000, 1000]} />
    //   <meshStandardMaterial map={texture} map-repeat={[100, 100]} color="green" />
    // </mesh>
    <ObjectStich.Plane name={"Plane_Ground"}
      displayName={"Plane_Ground"}
      receiveShadow={true}
      side={THREE.DoubleSide}
      // color= {"#ffffff"} //{colorObj}
      width={100}
      height={100}
      mapRepeat={[1,1]}
      position={[0, 0, 0]}
      // scale={1}
      map={useLoader(TextureLoader, '/textures/grass3.jpg')}
      bumpMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
      roughnessMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
      bumpScale={1}
      metalness={-.5}
      roughness={101}
      rotation={[Math.PI / 2, 0, 0]}></ObjectStich.Plane>
  )
}
