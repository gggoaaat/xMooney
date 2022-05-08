import React, { forwardRef, useRef, useState, useMemo, Suspense, useEffect } from 'react'
import { folder, useControls } from 'leva'
import * as THREE from "three";
import {
    Canvas,
    useFrame,
    useLoader 
} from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Group } from "three";
import Box from "./assets/Box";
//import OrbitControls from "../components/OrbitControls";
import LightBulb from "./assets/Light";
import Floor from "./assets/Floor";
import { Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'
import five from "./assets/five.png";
import Draggable from "./Draggable";
import { cookieStorageManager } from '@chakra-ui/react';
import { WebGL1Renderer } from 'three';
// import Warehouse from "./assets/Warehouse";
// import AsicMiner from "./assets/AsicMiner";
// import GpuMiner from "./assets/GpuMiner";
// import Shelf from "./assets/Shelf";
// import Spaceman from "./assets/Spaceman";
// import Ship from "./assets/Ship";


export default function ThreeNew() {

    // const [lotsVars, setLotsVars] = useState({});

    let lotsVars = {}

    const test = function (props) {
        // console.log(Canvas);
        Canvas.displayName = "Test"
    }();


    // useControls({
    //     intensity: { value: 5, min: 0, max: 20, step: 1 },
    //     x: { value: 5, min: 0, max: 20, step: 1 },
    //     y: { value: 5, min: 0, max: 20, step: 1 },
    //     z: { value: 5, min: 0, max: 20, step: 1 },
    //     "shadows": folder({
    //         lightLeft : {
    //             x: { value: 5, min:  -5, max: 15, step: 1 },
    //             y: { value: 5, min:  -5, max: 15, step: 1 },
    //             z: { value: 5, min:  -5, max: 15, step: 1 }
    //         },
    //         rightLeft : {
    //             x: { value: 5, min:  -5, max: 15, step: 1 },
    //             y: { value: 5, min:  -5, max: 15, step: 1 },
    //             z: { value: 5, min:  -5, max: 15, step: 1 }
    //         }
    //     })
    // });

    const values = useControls({
        intensity: { value: 5, min: 0, max: 20, step: 1 },
        x: { value: 5, min: -5, max: 15, step: 1 },
                y: { value: 5, min: -5, max: 15, step: 1 },
                z: { value: 5, min: -5, max: 15, step: 1 },
        boolean: true,   
        ball: folder(
            {
                bx: { value: 5, min: -200, max: 200, step: 1 },
                by: { value: 5, min: -200, max: 200, step: 1 },
                bz: { value: 5, min: -200, max: 200, step: 1 }
            }
        ),     
        lightLeft: folder(
            {
                lx: { value: 0, min: -100, max: 100, step: 1 },
                ly: { value: 0, min: -100, max: 100, step: 1 },
                lz: { value: 0, min: -100, max: 100, step: 1 }
            },
            { render: (get) => get('boolean') }
        ),
        lightRight: folder(
            {
                rx: { value: 0, min: -100, max: 100, step: 1 },
                ry: { value: 0, min: -100, max: 100, step: 1 },
                rz: { value: 0, min: -100, max: 100, step: 1 }
            },
            { render: (get) => get('boolean') }
        )
    })

    // initialize objects
    function Sphere(props) {

        let sphereMaterial = getMaterial({ type: "lambert", color: "rgb(10, 50, 80)" })
        let sphere = getSphere([3, 24, 24], null)

        // console.log("SPhere")
        // console.log(sphere)

        return renderMeshObject(props, [sphereMaterial, sphere])
    }

    function Plane(props) {

        let planeMaterial = getMaterial({
            type: "lambert",
            color: props.color, //? props.color : "rgb(10, 50, 80)",
            side: props.side,
            map : props.map,
            bumpMap: props.bumpMap,
            roughnessMap: props.roughnessMap,
            bumpScale: props.bumpScale,
            metalness: props.map,
            roughness: props.roughness
        });
        let plane = getPlane([props.width, props.height], null)

        return renderMeshObject(props, [planeMaterial, plane])
    }

    function TimeofDay() {
        const start = 8 * 60 + 5;
        const end = 18 * 60 + 17;
        const date = new Date();
        const now = date.getHours() * 60 + date.getMinutes();
        console.log(start)
        console.log(end)
        console.log(now)
        if (start <= now && now <= end) {
            return (<>
                <ambientLight color={"white"} intensity={0.9} />
                <LightBulb color={"black"} position={[-.09, 65, 52.8]} />
                <LightBulb color={"black"} position={[90, 72, 51.5]} />
                <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            </>)
        }
        else {

            return (<>

                <LightBulb position={[-.09, 65, 52.8]} /> */}
                <LightBulb position={[90, 72, 51.5]} />
                {/* <Cloud scale={100} position={[-20, 60, -20]}></Cloud> */}
                <Stars></Stars>
            </>)
        }
    }

    function getMaterial(props) {
        var selectedMaterial;
        // var materialOptions = props;

        // materialOptions.color = props.color === undefined ? 'rgb(255, 255, 255)' : props.color;

        var materialOptions = {
            color: props.color === undefined ? 'rgb(255, 255, 255)' : props.color,
            side: props.side === undefined ? THREE.FrontSide : props.side
        };

        switch (props.type) {
            case 'basic':
                selectedMaterial = (<meshBasicMaterial {...materialOptions}></meshBasicMaterial>)
                break;
            case 'lambert':
                selectedMaterial = (<meshLambertMaterial {...materialOptions}></meshLambertMaterial>)
                break;
            case 'phong':
                selectedMaterial = (<meshPhongMaterial {...materialOptions}></meshPhongMaterial>)
                break;
            case 'standard':
                selectedMaterial = (<meshStandardMaterial {...materialOptions}></meshStandardMaterial>)
                break;
            default:
                selectedMaterial = (<meshBasicMaterial {...materialOptions}></meshBasicMaterial>)
                break;
        }

        return selectedMaterial;
    }

    function getPlane(props) {

        return (<planeBufferGeometry args={props}></planeBufferGeometry>)
    }

    function getSphere(props) {
        const sphereBufferGeometry = useRef();

        console.log("sphereBufferGeometry")
        console.log(sphereBufferGeometry)

        sphereBufferGeometry.displayName = props.displayName

        return (<sphereBufferGeometry ref={sphereBufferGeometry} args={props}></sphereBufferGeometry>)
    }

    function renderMeshObject(props, objects) {
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

    // 

    function LoadEnvironment() {

        var loader = new THREE.TextureLoader();

        return (
            <>
                <group position={[values.x, values.y, values.z]} scale="1">
                    <TimeofDay></TimeofDay>
                    <Sphere
                        name={"Sphere_Ball"}
                        displayName={"Sphere_Ball"}
                        castShadow={"true"}
                        position={[values.bx, values.by, values.bz]}
                        scale={5}
                    ></Sphere>
                    <Plane name={"Plane_Ground"}
                        displayName={"Plane_Ground"}
                        receiveShadow={true} 
                        side={THREE.DoubleSide}
                        // color= {"#ffffff"} //{colorObj}
                        width={10} 
                        height={10} 
                        position={[15, 0, 5]} 
                        scale={20} 
                        map ={useLoader(TextureLoader,'/textures/concrete.jpg')}
                        bumpMap ={useLoader(TextureLoader,'/textures/concrete.jpg')}
                        roughnessMap ={useLoader(TextureLoader,'/textures/concrete.jpg')}
                        bumpScale ={0.01}
                        metalness ={0.1}
                        roughness ={0.7}
                        rotation={[Math.PI / 2, 0, 0]}></Plane>
                    {/* <LightBulb position={[10, -1, -50]} /> */}
                    {/* <Floor color="white" size={[100, 5, 100]} scale="1" /> */}
                    <OrbitControls 
                        target0={ new THREE.Vector3(0,0,0) } 
                        maxPolarAngle={(Math.PI / 2) * 0.9} 
                        autoRotate={false} 
                    />
                    <Box position={[-1.2, 10, 5]} />
                </group>
            </>
        );
    }

    function GetSpotLight(props) {
        // props.color = props.color === undefined ? 'rgb(255, 255, 255)' : props.color;
        // var light = new THREE.SpotLight(props.color, props.intensity);
        // light.castShadow = true;
        // light.penumbra = 0.5;

        // //Set up shadow properties for the light
        // light.shadow.mapSize.width = 1024;  // default: 512
        // light.shadow.mapSize.height = 1024; // default: 512
        // light.shadow.bias = 0.001;

        const spotLight = useRef();

        console.log("spotLight")
        console.log(spotLight)
        return (<>
            <spotLight {...props}>
            </spotLight>

        </>);
    }

    function Ren(props)
    {

        //const Renderer = new WebGL1Renderer()

        // Renderer.setSize(window.innerWidth, window.innerHeight);
        // Renderer.shadowMap.enabled = true;
        // document.getElementById('theScene').appendChild(Renderer.domElement);

        return (<></>)
    }

    return (
        <div className="scene" id="theScene">
            <Canvas
                shadows={true}
                className="canvas"
                 
                camera={{
                    position: [100, 60, 75]                    
                }}
            >
                <Suspense fallback={null}>
                    <LoadEnvironment />
                    {/* <GetSpotLight
                        intensity={values.intensity}
                        castShadow={true}
                        penumbra={0.5}
                        shadow-mapSize-height={1024}
                        shadow-mapSize-width={1024}
                        shadow-bias={0.001}
                        position={[10, 50, 0]}
                        color={'rgb(255, 255, 255)'}
                    ></GetSpotLight> */}
                    <GetSpotLight
                        intensity={values.intensity}
                        position={[values.lx, values.ly, values.lz]}
                        color={'rgb(255, 220, 180)'}
                    ></GetSpotLight>
                    <GetSpotLight
                        intensity={values.intensity}
                        position={[values.rx, values.ry, values.rz]}
                        color={'rgb(255, 220, 180)'}
                    ></GetSpotLight>
                    <Ren></Ren>
                </Suspense>
            </Canvas>
        </div>
    );
}

















