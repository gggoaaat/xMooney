import { Canvas } from "@react-three/fiber";
import Box from "../components/Box";
import OrbitControls from "../components/OrbitControls";
import LightBulb from "../components/Light";
import Floor from "../components/Floor";
import Draggable from "../components/Draggable";
import { Suspense } from "react";

export default function Three() {
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
                <LightBulb position={[0, 12, 0]} />
                <Draggable>
                    <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[0, 5, 10]}  />
                    </Suspense>
                </Draggable>
                <Draggable>
                    <Suspense fallback={null}>
                        <Box rotateX={3} rotateY={0.2} position={[4, 10, 20]}  />
                    </Suspense>
                </Draggable>
                <OrbitControls />
                <Floor />
            </Canvas>
        </div>
    );
}