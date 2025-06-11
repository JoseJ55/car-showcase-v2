import { useCallback, useEffect, useMemo } from 'react';

import { useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { RepeatWrapping, TextureLoader } from 'three';

export const Ground = () => {
    const [roughness, normal] = useLoader(TextureLoader, [
        '/textures/terrain-roughness.jpg',
        '/textures/terrain-normal.jpg',
    ]);

    const configureTexture = useCallback(() => {
        [normal, roughness].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
            t.offset.set(0, 0);
        });
    }, [normal, roughness]);

    useEffect(() => {
        configureTexture();
    }, [configureTexture]);

    const planeGeo = useMemo(() => <planeGeometry args={[30, 30]} />, []);
    const groundMat = useMemo(() => (
        <MeshReflectorMaterial
            envMapIntensity={1}
            metalness={0.6}
            normalMap={normal}
            normalScale={[1, 1]}
            roughnessMap={roughness}
            dithering
            color={[0.15, 0.15, 0.15]}
            roughness={0.7}
            mixStrength={0.5}
            mixContrast={1}
            resolution={1024}
            mirror={0.4}
            depthScale={0.01}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={0.15}
            reflectorOffset={0.2}
        />
    ), [normal, roughness]);

    return (
        <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
            {planeGeo}
            {groundMat}
        </mesh>
    );
};
