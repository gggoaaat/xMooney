import React, { forwardRef, useRef } from 'react'
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import Box from "../components/Box";
//import OrbitControls from "../components/OrbitControls";
import LightBulb from "../components/Light";
import Floor from "../components/Floor";
import { Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'

import Draggable from "../components/Draggable";
import { Suspense } from "react";
import Warehouse from "../components/Warehouse";
import AsicMiner from "../components/AsicMiner";
import GpuMiner from "../components/GpuMiner";
import Shelf from "../components/Shelf";
import Spaceman from "../components/Spaceman";
import Ship from "../components/Ship";


export default function Three() {

    function TimeofDay() {
        const start = 7 * 60 + 5;
        const end = 22 * 60 + 17;
        const date = new Date();
        const now = date.getHours() * 60 + date.getMinutes();
        console.log(start)
        console.log(end)
        console.log(now)
        if (start <= now && now <= end) {
            return (<Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />)
        }
        else {

            return (<><Cloud scale={3} position={[-20, 10, -20]}></Cloud><Stars></Stars></>)
        }
    }

    function LoadImage(props) {

        return <Image {...props} />
    }

    function LoadAsicsOnShelf(props) {
        let xStart = props.asic[0];

        let xAdd2 = 4.5;
        let yAdd2 = props.asic[1];

        const xAdd3 = 4.5;
        const yAdd3 = 11.25;

        let AsicsArray = []
        let AsicsArrayPoints = []
        for (let index = 0; index < props.rows; index++) {
            yAdd2 = yAdd2 + yAdd3;

            xAdd2 = xStart;
            for (let indexX = 0; indexX < props.asics; indexX++) {

                xAdd2 += xAdd3;
                AsicsArrayPoints.push({ x: xAdd2, y: yAdd2 })
                let AsicsObject = (<AsicMiner rotation={[0, Math.PI / 1, 0]} position={[xAdd2, yAdd2, props.asic[2]]} scale={1.25} ></AsicMiner>)

                AsicsArray.push(AsicsObject)
            }

        }

        AsicsArray.push(<Shelf scale={0.25} position={[props.shelf[0], props.shelf[1], props.shelf[2]]} rotation={[0, Math.PI / 2, 0]}></Shelf>)

        console.log(AsicsArrayPoints);

        return AsicsArray;
    }

    const TheseAsix = LoadAsicsOnShelf({ rows: 4, asics: 8, shelf: [-100, 4.5, -90], asic: [-120, 5, -90] });
    const TheseAsix2 = LoadAsicsOnShelf({ rows: 4, asics: 8, shelf: [0, 4.5, -90], asic: [-20, 5, -90] });
    const TheseAsix3 = LoadAsicsOnShelf({ rows: 4, asics: 8, shelf: [100, 4.5, -90], asic: [80, 5, -90] });

    const GroupOfAsics = function (props) {
        return (<>  <AsicMiner position={[-25, 12.5, 25]}></AsicMiner>

            <AsicMiner position={[-15, 2.5, 25]} rotation={[0, Math.PI / 1.5, 0]}></AsicMiner>
            <AsicMiner position={[-5, 3.5, 15]} rotation={[0, Math.PI / 1.5, Math.PI / 2]}></AsicMiner></>)
    }()
    return (
        <div className="scene">
            <Canvas
                shadows={true}
                className="canvas"
                camera={{
                    position: [-6, 30, 75],
                }}
            >

                <ambientLight color={"white"} intensity={0.3} />

                <LightBulb position={[0, 65, 53.5]} />
                <LightBulb position={[92, 72, 53.5]} />
                {/* <Cylinder position={[-4, 8, 12]} rotateOnAxis={(270, 70, 50)}>
                    <meshBasicMaterial color="#9b8549" />
                 
                </Cylinder> */}

                <Suspense fallback={null}>
                    <Box rotateX={0.8} rotateY={0.2} position={[0, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[0, 5, 0]} size={[5, 5, 5]} rotation={[0, Math.PI / 2.8, 0]} color="white" image="/xMooney_Logo_Token_1000px_x_1000px.png" />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[25, 10, 25]} size={[5, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[-25, 10, 25]} size={[5, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[-25, 10, -25]} size={[5, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[25, 10, -25]} size={[5, 5, 5]} />
                </Suspense>


                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[4, 5, 20]} size={[1, 3, 1]} />
                </Suspense>
                <Warehouse scale={[20, 20, 20]} position={[0, 52, 100]}></Warehouse>
                {/* <Image url="/xMooney_Logo_Token_1000px_x_1000px.png"
                    transparent
                    position={[-243, 50, -20]}
                    opacity={1}
                    scale={[100, 100, 100]}
                    rotation={[0, Math.PI/2 , 0]}
                /> */}

                <TimeofDay></TimeofDay>
                {/* <LoadImage
                    transparent
                    position={[10, 18.5, 4]}
                    url="/xMooney_Logo_Token_1000px_x_1000px.png"
                    opacity={0.5}>
                    rotateY={30}
                </LoadImage> */}

                {/* <Float position={[1, 10, -0.5]} rotation={[-170, 0, 0]} rotationIntensity={4} floatIntensity={6} speed={1.5}> */}
                {/* <Draggable> */}
                <Spaceman scale={8} position={[10, 3, -0.5]} >

                </Spaceman>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotation={[-38, 0, 0]} position={[10, 26, 3.9]} size={[1, 1, 1]} color="white" image="/xMooney_Logo_Token_300px_x_300pxBW.png" />
                </Suspense>

                {/* </Draggable> */}
                {/* </Float> */}
                <Spaceman scale={16} position={[-200, -6.5, -75]} rotation={[0, Math.PI / 2.5, 0]} >

                </Spaceman>
                <Float scale={1} position={[0, 2, 0]} rotation={[0, 0.0, 0]}>
                <Ship scale={30} position={[-165, 25, 15]} rotation={[0, Math.PI / 1.5, 0]} />
                </Float>
                <OrbitControls />

                <GpuMiner scale={1.5} position={[15, 5.5, -18]} rotation={[0, Math.PI / 1.2, 0]}></GpuMiner>
                {GroupOfAsics}
                <AsicMiner position={[15, 5, -90]} scale={1.25}></AsicMiner>

                {TheseAsix}
                {TheseAsix2}
                {TheseAsix3}

                <Floor color="white" />
            </Canvas>
        </div>
    );
}