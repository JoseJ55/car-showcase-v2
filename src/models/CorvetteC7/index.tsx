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
    const speed = useRef(5);

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
            speed.current = snap.newCar ? 10 : 5;
        }
    }, [snap.newCar, snap.moveCar]);

    useFrame((s, delta) => {
        if (!shouldAnimate.current) return;
        const group = gltf.scene.children[0].children[0].children[0];

        if (!group) return;

        const t = s.clock.getElapsedTime();

        [0, 2, 4, 6].forEach((i) => {
            if (group.children[i]) {
                group.children[i].rotation.x = t * speed.current;
            }
        });

        const direction = new Vector3(0, 0, 1);
        gltf.scene.position.addScaledVector(direction, speed.current * delta);

        if (snap.newCar && snap.carInView && gltf.scene.position.z >= 10) { // tracks when car leaves
            state.carInView = false;
            state.newCar = false;
            state.moveCar = false;
            shouldAnimate.current = false;
            gltf.scene.position.z = -10;
        } else if (snap.moveCar && gltf.scene.position.z >= 0) { // track car coming in
            state.carInView = true;
            state.newCar = false;
            state.moveCar = false;
            shouldAnimate.current = false;
        }
    });

    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
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
