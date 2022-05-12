import React, { useRef} from 'react'
import GetMaterial from "./GetMaterial";

export default function ObjectStich(props) {
    let lotsVars = {}
    // initialize objects
    function Sphere(props) {

        let sphereMaterial = GetMaterial({ type: "lambert", color: "rgb(10, 50, 80)" })
        let sphere = GetSphere([3, 24, 24], null)

        // console.log("SPhere")
        // console.log(sphere)

        return RenderMeshObject(props, [sphereMaterial, sphere])
    }

    function Plane(props) {

        let planeMaterial = GetMaterial({
            type: "standard",
            color: props.color, //? props.color : "rgb(10, 50, 80)",
            side: props.side,
            map: props.map,
            bumpMap: props.bumpMap,
            roughnessMap: props.roughnessMap,
            bumpScale: props.bumpScale,
            metalness: props.metalness,
            roughness: props.roughness,
            "map-repeat" : props["mapRepeat"] 
        });

        // delete props["map-repeat"]
        let plane = GetPlane([props.width, props.height], null)

        return RenderMeshObject(props, [planeMaterial, plane])
    }

    function GetPlane(props) {

        const planeBufferGeometry = useRef();

        console.log("planeBufferGeometry");
        console.log(planeBufferGeometry);

        planeBufferGeometry.displayName = props.displayName;

        return (<planeBufferGeometry args={props}></planeBufferGeometry>)
    }

    function GetSphere(props) {
        const sphereBufferGeometry = useRef();

        console.log("sphereBufferGeometry");
        console.log(sphereBufferGeometry);

        sphereBufferGeometry.displayName = props.displayName;

        return (<sphereBufferGeometry key={props.displayName} ref={sphereBufferGeometry} args={props}></sphereBufferGeometry>)
    }

    function RenderMeshObject(props, objects) {
        const mesh = useRef();

        console.log("mesh")
        console.log(mesh)
        mesh.displayName = props.displayName

        lotsVars[mesh.displayName] = mesh;
        console.log(lotsVars)



        return (
            <mesh ref={mesh} {...props}>
                {objects}
            </mesh>
        )
    }

    return {
        RenderMeshObject,
        GetSphere,
        GetPlane,
        Plane,
        Sphere
    }
}



 {/* <ObjectStich.Plane name={"Plane_Ground"}
                            displayName={"Plane_Ground"}
                            receiveShadow={true}
                            side={THREE.DoubleSide}
                            // color= {"#ffffff"} //{colorObj}
                            width={10}
                            height={10}
                            position={[0, 0, 0]}
                            scale={20}
                            map={useLoader(TextureLoader, '/textures/grass3.jpg')}
                            bumpMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
                            roughnessMap={useLoader(TextureLoader, '/textures/grass3.jpg')}
                            bumpScale={1}
                            metalness={-.5}
                            roughness={101}
                            rotation={[Math.PI / 2, 0, 0]}></ObjectStich.Plane> */}