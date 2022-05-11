import React, { useRef} from 'react'
import {useFrame,} from "@react-three/fiber";

export default function LightBulb(props) {
    const mesh = useRef();

    useFrame(({ clock }) => {
        if (props.runCircularAnimation && props.runCircularAnimation.enabled) {
            let thisValue = clock.getElapsedTime() * (Math.PI * .5)
            //console.log(thisValue)

            props.runCircularAnimation.interval += props.runCircularAnimation.speed;
            if (props.runCircularAnimation.x) {
                mesh.current.position.x = props.runCircularAnimation.x * Math.cos(props.runCircularAnimation.interval) + props.runCircularAnimation.radius// Math.PI * (mesh.current.position.x * (.001))
            }
            if (props.runCircularAnimation.z) {
                mesh.current.position.z = props.runCircularAnimation.z * Math.sin(props.runCircularAnimation.interval) + props.runCircularAnimation.radius // Math.PI * (mesh.current.position.z * (.001))
            }

            if (props.runCircularAnimation.y) {
                mesh.current.position.y = props.runCircularAnimation.y * Math.sin(props.runCircularAnimation.interval) + props.runCircularAnimation.radius // Math.PI * (mesh.current.position.z * (.001))
            }
        }
    })


    return (
        <mesh ref={mesh} {...props} >
            <pointLight castShadow intensity={props.intensity} />
            <sphereBufferGeometry args={props.size} />
            <meshPhongMaterial emissive={props.color ? props.color : "yellow"} />
        </mesh>
    );
}