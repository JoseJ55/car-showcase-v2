import { Canvas } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { Lights } from '../../components/Lights';
import { Ground } from '../../components/Ground';

export const CanvasScreen = () => {
    return (
        <Canvas shadows>
            <OrbitControls
                target={[0, 0.35, 0]}
                maxPolarAngle={1.45}
                // autoRotate={snap.intro}
                autoRotate={false}
                autoRotateSpeed={2}
                // enableRotate={!snap.intro}
                enablePan={false}
                minDistance={3}
                maxDistance={8}
            />
            <PerspectiveCamera
                makeDefault
                near={0.1}
                fov={50}
                position={[3, 2, 5]}
            />
            <color args={[0, 0, 0]} attach='background' />

            <Lights />

            <CubeCamera resolution={128} frames={Infinity}>
                {(texture) => {
                    // if (snap.showCar) {
                    //     return (
                    //     <>
                    //         <Environment map={texture} />
                    //         <Car />
                    //     </>
                    //     );
                    // }
                    // return null;
                    return (
                        <>
                            <Environment map={texture} />
                            <Ground />
                        </>
                    );
                }}
            </CubeCamera>
        </Canvas>
    );
};
