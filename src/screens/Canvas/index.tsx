import { Canvas } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { AnimatePresence, motion } from 'motion/react';

import { Lights } from '../../components/Lights';
import { Ground } from '../../components/Ground';
import { Car } from '../../components/Car';
import { Button, BgContainer } from '../../components/UI';

import state from '../../store';
import { useSnapshot } from 'valtio';

import { slideAnimation } from '../../motions';

export const CanvasScreen = () => {
    const snap = useSnapshot(state);

    return (
        <div className='w-full h-full relative'>
            <Canvas shadows>
                <OrbitControls
                    target={[0, 0.35, 0]}
                    maxPolarAngle={1.45}
                    autoRotate={snap.intro}
                    autoRotateSpeed={2}
                    enableRotate={!snap.intro}
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

            <div className='absolute top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden'>
                <AnimatePresence>
                    {snap.intro && (
                        <motion.section className='w-full h-full flex justify-center items-center'>
                            <BgContainer className='!w-1/2' {...slideAnimation('left', 2500)}>
                                <p className='text-3xl font-semibold mb-4'>Interactive 3D Cars</p>
                                <p className='w-2/3 mb-2 text-start'>
                                    Experience the power of real-time 3D in your browser using Three.js — a powerful
                                    JavaScript library built on WebGL
                                </p>
                                <p className='w-2/3 mb-2 text-start'>
                                    Explore smooth transitions, detailed lighting, and model animations — all running
                                    natively in the browser, with no plugins required.
                                </p>
                                <Button
                                    className='mt-4 self-end'
                                    text={`Let's Roll`}
                                    onClick={() => {
                                        if (!snap.carInView) {
                                            state.moveCar = true;
                                        }
                                        state.intro = false;
                                    }}
                                />
                            </BgContainer>
                            <motion.div
                                className='absolute bottom-2 left-2 w-full self-start text-xs text-white/70 mt-8'
                                {...slideAnimation('left', 200)}
                            >
                                <p>
                                    Built with React, Three.js, and @react-three/fiber.
                                </p>
                                <p>
                                    Models sourced from Sketchfab. Animations and camera handled in real-time using
                                    GPU-accelerated rendering.
                                </p>
                            </motion.div>
                        </motion.section>
                    )}
                    {!snap.intro && (
                            <>
                                <BgContainer
                                    className={
                                        `
                                            !absolute !right-4 !top-1/2 !-translate-y-1/2 !px-2 !py-4
                                        `
                                    }
                                    {...slideAnimation('right', 500)}
                                >
                                    <Button
                                        className='self-center'
                                        text='vibe'
                                        onClick={() => state.currentEnvironment = 'vibe'}
                                    />
                                </BgContainer>

                                <BgContainer
                                    className={
                                        `
                                            !absolute !bottom-4 !left-1/2 !-translate-x-1/2 !p-2 !flex-row 
                                            !min-w-[350px] !gap-4 !w-fit
                                        `
                                    }
                                    {...slideAnimation('up', 500)}
                                >
                                    <Button
                                        text='Corvette C7'
                                        onClick={() => {
                                            if (snap.currentVehicle !== snap.vehicles[0]) {
                                                state.currentVehicle = snap.vehicles[0];
                                                state.newCar = true;
                                            }
                                        }}
                                    />
                                    <Button
                                        text='Mclaren P1'
                                        onClick={() => {
                                            if (snap.currentVehicle !== snap.vehicles[1]) {
                                                state.currentVehicle = snap.vehicles[1];
                                                state.newCar = true;
                                            }
                                        }}
                                    />
                                </BgContainer>

                                <motion.div
                                    className={
                                        `
                                            absolute bottom-4 right-4 w-fit pointer-events-auto rounded-xl border-2 
                                            border-accent overflow-hidden
                                        `
                                    }
                                    {...slideAnimation('left', 500)}
                                >
                                    <button
                                        className={
                                            `
                                                bg-faded/80 w-[150px] px-2 py-2 text-black hover:cursor-pointer 
                                                hover:bg-faded
                                            `
                                        }
                                        type='button'
                                        aria-label='Customize'
                                        onClick={() => {
                                            state.newCar = true;
                                        }}
                                    >
                                        Test
                                    </button>
                                </motion.div>

                                <motion.div
                                    className={
                                        `
                                            absolute bottom-4 left-4 w-fit pointer-events-auto rounded-xl border-2 
                                            border-accent overflow-hidden
                                        `
                                    }
                                    {...slideAnimation('left', 500)}
                                >
                                    <button
                                        className={
                                            `
                                                bg-faded/80 w-[150px] px-2 py-2 text-black hover:cursor-pointer 
                                                hover:bg-faded
                                            `
                                        }
                                        type='button'
                                        aria-label='Customize'
                                        onClick={() => {
                                            state.intro = true;
                                            state.colorPickerOpen = false;
                                        }}
                                    >
                                        Back
                                    </button>
                                </motion.div>
                            </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
