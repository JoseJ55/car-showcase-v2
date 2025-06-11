import { useEffect, useRef, useState, useCallback } from 'react';

import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';

import { useSnapshot } from 'valtio';
import state from '../../store';

/*
based on "Chevrolet Corvette (C7)"
(https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
*/


const carPaths = [
    '/models/corvette_c7.glb',
    '/models/mclaren_p1.glb',
];

useGLTF.preload(carPaths[0]);
useGLTF.preload(carPaths[1]);

export const Car = () => {
    const snap = useSnapshot(state);

    const shouldAnimate = useRef<boolean>(false);
    const speed = useRef(5);
    const scale = useRef([0.005, 0.005, 0.005]);
    const tires = useRef([0, 2, 4, 6]);
    const mapIntensity = useRef(1);

    const [carIndex, setCarIndex] = useState(0);

    const gltf = useGLTF(carPaths[carIndex]);

    const group = useRef(gltf.scene.children[0].children[0].children[0]);

    const  changeCar = useCallback(async() => {
        if (snap.currentVehicle === snap.vehicles[0]) {
            setCarIndex(0);
            scale.current = [0.005, 0.005, 0.005];
            tires.current = [0, 2, 4, 6];
            mapIntensity.current = 1;
            group.current = gltf.scene.children[0].children[0].children[0];
        } else if (snap.currentVehicle === snap.vehicles[1]) {
            setCarIndex(1);
            scale.current = [0.9, 0.9, 0.9];
            tires.current = [0, 7, 12, 31];
            mapIntensity.current = 20;
            group.current = gltf.scene.children[0].children[0].children[0].children[0];
        }
        speed.current = 5;
    }, [snap.currentVehicle, snap.vehicles, gltf]);

    useEffect(() => {
        if (snap.newCar || snap.moveCar) {
            shouldAnimate.current = true;
        }
    }, [snap.newCar, snap.moveCar]);

    useFrame((s, delta) => {
        if (!shouldAnimate.current) return;
        if (!group.current) return;

        const t = s.clock.getElapsedTime();

        tires.current.forEach((i) => {
            if (group.current.children[i]) {
                group.current.children[i].rotation.x = t * speed.current;
            }
        });

        const direction = new Vector3(0, 0, 1);
        gltf.scene.position.addScaledVector(direction, speed.current * delta);

        if (snap.newCar && snap.carInView && gltf.scene.position.z >= 10) { // tracks when car leaves
            state.carInView = false;
            state.newCar = false;
            state.moveCar = false;
            shouldAnimate.current = false;
            speed.current = 0;
            changeCar()
                .then(() => {
                    gltf.scene.position.z = -10;
                    setTimeout(async() => {
                        state.moveCar = true;
                        shouldAnimate.current = true;
                    }, 5000);
                });
            return;
        } else if (snap.moveCar && !snap.carInView && gltf.scene.position.z >= 0) { // track car coming in
            state.carInView = true;
            state.newCar = false;
            state.moveCar = false;
            shouldAnimate.current = false;
            speed.current = 10;
            return;
        }
    });

    useEffect(() => {
        gltf.scene.scale.set(scale.current[0], scale.current[1], scale.current[2]);
        gltf.scene.position.set(0, -0.035, -10);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = mapIntensity.current;
            }
        });
    }, [gltf, carIndex]);

    if (!gltf || !gltf.scene) return null;

    return (
        <primitive object={gltf.scene} />
    );
};
