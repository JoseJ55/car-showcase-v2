export const Lights = () => {
    return (
        <>
            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={90}
                angle={0.7}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={90}
                angle={0.7}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
        </>
    );
};
