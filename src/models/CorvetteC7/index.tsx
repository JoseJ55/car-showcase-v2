import { useMemo, useEffect, useRef } from 'react';

import { useFrame, useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Mesh, Vector3 } from 'three';

import { useSnapshot } from 'valtio';
import state from '../../store';

/*
based on "Chevrolet Corvette (C7)"
(https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
*/
export const CorvetteC7 = () => {
    const snap = useSnapshot(state);

    const shouldAnimate = useRef<boolean>(false);

    const dracoLoader = useMemo(() => {
        const loader = new DRACOLoader();
        loader.setDecoderPath('/draco-gltf/');
        return loader;
    }, []);

    const gltf = useLoader(
        GLTFLoader,
        '/models/corvette_c7/scene.gltf',
        (loader) => {
            loader.setDRACOLoader(dracoLoader);
        },
    );

    useEffect(() => {
        if (snap.newCar || snap.moveCar) {
            shouldAnimate.current = true;
        }
    }, [snap.newCar, snap.moveCar]);

    useFrame((s, delta) => {
        if (!shouldAnimate.current) return;

        // Animation to change to another vehicle.
        if (snap.moveCar) {
            const t = s.clock.getElapsedTime();
            const speed = 5;

            const group = gltf.scene.children[0].children[0].children[0];
            group.children[0].rotation.x = t * speed;
            group.children[2].rotation.x = t * speed;
            group.children[4].rotation.x = t * speed;
            group.children[6].rotation.x = t * speed;

            const direction = new Vector3(0, 0, 1); // (0.2, -0.035, 0)

            gltf.scene.position.addScaledVector(direction, speed * delta);
        }

        // Animation to move the vehicle on screen.
        if (snap.newCar) {
            const t = s.clock.getElapsedTime();
            const speed = 10;

            const group = gltf.scene.children[0].children[0].children[0];
            group.children[0].rotation.x = t * speed;
            group.children[2].rotation.x = t * speed;
            group.children[4].rotation.x = t * speed;
            group.children[6].rotation.x = t * speed;

            const direction = new Vector3(0, 0, 1);

            gltf.scene.position.addScaledVector(direction, speed * delta);
        }

        if (gltf.scene.position.z >= 0 && (snap.newCar || snap.moveCar)) {
            state.newCar = false;
            state.moveCar = false;
            shouldAnimate.current = false;
        }
    });

    useMemo(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        // gltf.materials.Car_Paint.color.r = (snap.color.r / 255) * lightScaler;
        // gltf.materials.Car_Paint.color.g = (snap.color.g / 255) * lightScaler;
        // gltf.materials.Car_Paint.color.b = (snap.color.b / 255) * lightScaler;

        gltf.scene.position.set(0, -0.035, -10);
        gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
        });
    }, [gltf]);

    return (
        <primitive object={gltf.scene} />
    );
};
