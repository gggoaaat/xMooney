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
// import LightBulb from "./assets/Light";
import Floor from "./assets/Floor";
import { Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'
import five from "./assets/five.png";
import Draggable from "./Draggable";
import { cookieStorageManager } from '@chakra-ui/react';
import { WebGL1Renderer } from 'three';
import Warehouse from "../components/assets/Warehouse";
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

    const values = useControls({
        intensity: { value: 5, min: 0, max: 20, step: 1 },
        x: { value: 5, min: -5, max: 15, step: 1 },
        y: { value: 5, min: -5, max: 15, step: 1 },
        z: { value: 5, min: -5, max: 15, step: 1 },
        showSpotlight: false,
        showLightbulb: true,
        showBall: false,
        showCube: false,
        ball: folder(
            {
                bx: { value: 5, min: -90, max: 90, step: 0.1 },
                by: { value: 5, min: 6, max: 70, step: 0.1 },
                bz: { value: 5, min: -90, max: 90, step: 0.1 }
            },
            { render: (get) => get('showBall') }
        ),
        cube: folder(
            {
                cx: { value: 5, min: -90, max: 90, step: 0.1 },
                cy: { value: 5, min: 5, max: 70, step: 0.1 },
                cz: { value: 5, min: -90, max: 90, step: 0.1 }
            },
            { render: (get) => get('showCube') }
        ),
        leftSpotlight: folder(
            {
                lslX: { value: 0, min: -100, max: 100, step: 1 },
                lslY: { value: 0, min: -100, max: 100, step: 1 },
                lslZ: { value: 0, min: -100, max: 100, step: 1 }
            },
            { render: (get) => get('showSpotlight') }
        ),
        rightSpotlight: folder(
            {
                rslX: { value: 0, min: -100, max: 100, step: 1 },
                rslY: { value: 0, min: -100, max: 100, step: 1 },
                rslZ: { value: 0, min: -100, max: 100, step: 1 }
            },
            { render: (get) => get('showSpotlight') }
        ),
        lightBulb1: folder(
            {
                lb1X: { value: -.09, min: -100, max: 200, step: .01 },
                lb1Y: { value: 65, min: -100, max: 200, step: .01 },
                lb1Z: { value: 150, min: -100, max: 200, step: .01 }
            },
            { render: (get) => get('showLightbulb') }
        ),
        lightBulb2: folder(
            {
                lb2X: { value: 90, min: -100, max: 200, step: .01 },
                lb2Y: { value: 72, min: -100, max: 200, step: .01 },
                lb2Z: { value: 51.5, min: -100, max: 200, step: .01 }
            },
            { render: (get) => get('showLightbulb') }
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
            type: "standard",
            color: props.color, //? props.color : "rgb(10, 50, 80)",
            side: props.side,
            map: props.map,
            bumpMap: props.bumpMap,
            roughnessMap: props.roughnessMap,
            bumpScale: props.bumpScale,
            metalness: props.metalness,
            roughness: props.roughness
        });
        let plane = getPlane([props.width, props.height], null)

        return renderMeshObject(props, [planeMaterial, plane])
    }

    function TimeofDay() {
        const start = 8 * 60 + 5;
        const end = 9 * 60 + 17;
        const date = new Date();
        const now = date.getHours() * 60 + date.getMinutes();
        console.log(start)
        console.log(end)
        console.log(now)
        if (start <= now && now <= end) {
            return (<>
                <ambientLight color={"white"} />
                <LightBulb color={"black"} position={[-.09, 65, 52.8]} />
                <LightBulb color={"black"} position={[90, 72, 51.5]} />
                <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            </>)
        }
        else {

            return (<>

                <LightBulb 
                    intensity={0.30}
                    runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: -100, radius: 20 }} 
                    position={[values.lb1X, values.lb1Y, values.lb1Z]} 
                    size={[3, 30, 150]} 
                    color={"#F4FDFF"}    
                />
                <LightBulb 
                    intensity={1}
                    runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: 150, z: 120, radius: 20 }} 
                    position={[values.lb2X, values.lb2Y, values.lb2Z]} 
                    size={[5, 30, 10]} />
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

        if (props.type == "standard") {
            materialOptions.map = props.map;
            materialOptions.bumpMap = props.bumpMap;
            materialOptions.roughnessMap = props.roughnessMap;
            materialOptions.bumpScale = +props.bumpScale;
            materialOptions.metalness = +props.metalness;
            materialOptions.roughness = +props.roughness;
        }
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

        const planeBufferGeometry = useRef();

        console.log("planeBufferGeometry");
        console.log(planeBufferGeometry);

        planeBufferGeometry.displayName = props.displayName;

        return (<planeBufferGeometry args={props}></planeBufferGeometry>)
    }

    function getSphere(props) {
        const sphereBufferGeometry = useRef();

        console.log("sphereBufferGeometry");
        console.log(sphereBufferGeometry);

        sphereBufferGeometry.displayName = props.displayName;

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

    function LightBulb(props) {
        const mesh = useRef();

        if (props.runCircularAnimation && props.runCircularAnimation.enabled) {
            useFrame(({ clock }) => {
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
            })
        }

        return (
            <mesh ref={mesh} {...props} >
                <pointLight castShadow intensity={props.intensity} />
                <sphereBufferGeometry args={props.size} />
                <meshPhongMaterial emissive={props.color ? props.color : "yellow"} />
            </mesh>
        );
    }

    function LoadEnvironment() {

        var loader = new THREE.TextureLoader();

        return (
            <>
                <group position={[values.x, values.y, values.z]} scale="1">
                    <TimeofDay ></TimeofDay>
                    {/* <Box receiveShadow={true} position={[values.cx, values.cy, values.cz]} size={[10, 10, 10]} /> */}
                    <Sphere
                        name={"Sphere_Ball"}
                        displayName={"Sphere_Ball"}
                        castShadow={true}
                        position={[values.bx, values.by, values.bz]}
                        scale={2}
                        receiveShadow={false}
                    ></Sphere>
                    <Plane name={"Plane_Ground"}
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
                        rotation={[Math.PI / 2, 0, 0]}></Plane>
                    {/* <LightBulb position={[10, -1, -50]} /> */}
                    {<Floor color="white" position={[0, -20.1, 0]} size={[10, 2, 10]} scale="20" />}
                    <OrbitControls
                        target0={new THREE.Vector3(0, 0, 0)}
                        maxPolarAngle={(Math.PI / 2) * 0.9}
                        autoRotate={false}
                        minDistance={50}
                        maxDistance={300}
                        enablePan={false}
                        maxP
                    />
                    <Warehouse  receiveShadow={false} scale={[3, 3, 3]} position={[0, (2.95*3)-.1, 80]}></Warehouse>              
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

    function Ren(props) {

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
                    <Box position={[80, 15, -80]} size={[20, 20, 20]} rotation={[0, Math.PI / 2.9, 0]} color="white" image="/xMooney_Logo_Token_1000px_x_1000px.png" />
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
                    {/* <GetSpotLight
                        intensity={values.intensity}
                        position={[values.lx, values.ly, values.lz]}
                        color={'rgb(255, 220, 180)'}
                    ></GetSpotLight>
                    <GetSpotLight
                        intensity={values.intensity}
                        position={[values.rx, values.ry, values.rz]}
                        color={'rgb(255, 220, 180)'}
                    ></GetSpotLight> */}
                    <Ren></Ren>
                </Suspense>
            </Canvas>
        </div>
    );
}

















