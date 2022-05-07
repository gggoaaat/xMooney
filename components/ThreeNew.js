import React, { forwardRef, useRef } from 'react'
import * as THREE from "three";
import {
    Canvas,
    Mesh,
    SphereGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    DoubleSide
} from "@react-three/fiber";
import { Group } from "three";
import Box from "./assets/Box";
//import OrbitControls from "../components/OrbitControls";
import LightBulb from "./assets/Light";
import Floor from "./assets/Floor";
import { Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'

import Draggable from "./Draggable";
import { Suspense, useState } from "react";
import Three from './Three';
// import Warehouse from "./assets/Warehouse";
// import AsicMiner from "./assets/AsicMiner";
// import GpuMiner from "./assets/GpuMiner";
// import Shelf from "./assets/Shelf";
// import Spaceman from "./assets/Spaceman";
// import Ship from "./assets/Ship";


export default function ThreeNew() {

    const test = function (props) {
        console.log(Canvas);
        Canvas.displayName = "Test"
    }();

    // initialize objects
    function Sphere(props) {

        let sphereMaterial = getMaterial({ type: "phong", color: "rgb(10, 50, 80)" })
        let sphere = getSphere([3, 24, 24], null)

        return renderMeshObject(props, [sphereMaterial, sphere])
    }

    function Plane(props) {

        let planeMaterial = getMaterial({
            type: "phung",
            color: "rgb(10, 50, 80)",
            side: THREE.DoubleSide
        });
        let plane = getPlane([300, 300], null)

        return renderMeshObject(props, [planeMaterial, plane])
    }

    function TimeofDay() {
        const start = 8 * 60 + 5;
        const end = 14 * 60 + 17;
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
                <LightBulb position={[-.09, 65, 52.8]} />
                {/* <LightBulb position={[90, 72, 51.5]} /> */}
                {/* <Cloud scale={3} position={[-20, 10, -20]}></Cloud> */}
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

    function renderMeshObject(props, objects) {

        return (
            <mesh {...props}>
                {objects}
            </mesh>
        )
    }

    function getSphere(props, objects) {

        return (<sphereBufferGeometry args={props}>{objects}</sphereBufferGeometry>)
    }

    function getPlane(props, objects) {

        return (<planeBufferGeometry args={props}>{objects}</planeBufferGeometry>)
    }

    function LoadEnvironment() {

        return (
            <>
                <TimeofDay></TimeofDay>
                <Sphere castShadow={true} position={[15, 15, 5]} scale={5}></Sphere>
                <Plane castShadow={true} position={[15, 0, 5]} scale={20} rotation={[Math.PI / 2, 0, 0]}></Plane>
                <LightBulb position={[10, 50, -50]} />
                <Floor color="white" />
            </>
        );
    }

    return (
        <div className="scene">
            <Canvas
                shadows={true}
                className="canvas"
                camera={{
                    position: [100, 60, 75],
                }}
            >
                <Suspense fallback={null}>
                    <OrbitControls maxPolarAngle={(Math.PI / 2) * 0.99} autoRotate={true} />
                    <LoadEnvironment />
                </Suspense>
            </Canvas>
        </div>
    );
}