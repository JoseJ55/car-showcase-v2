import { Canvas } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { Lights } from '../../components/Lights';
import { Ground } from '../../components/Ground';
import { Car } from '../../components/Car';
import state from '../../store';

export const CanvasScreen = () => {
    return (
        <div className='w-full h-full relative'>
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
                    fov={60}
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
                                <Car />
                            </>
                        );
                    }}
                </CubeCamera>
            </Canvas>

            <div className='absolute top-0 left-0 w-full h-full z-10 pointer-events-none'>
                <button
                    className='w-[100px] h-[50px] bg-red-500 pointer-events-auto hover:cursor-pointer'
                    onClick={() => {
                        state.intro = false;
                        state.newCar = true;
                    }}
                >
                    test
                </button>
            </div>
        </div>
    );
};
