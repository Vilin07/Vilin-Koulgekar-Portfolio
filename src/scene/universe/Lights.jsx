export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.08} />

      <pointLight
        position={[0, 0, 0]}
        color="#8fb8ff"
        intensity={4}
      />

      <pointLight
        position={[8, 4, 5]}
        color="#4f7cff"
        intensity={1.5}
      />

      <pointLight
        position={[-8, -3, -5]}
        color="#1e3a8a"
        intensity={0.8}
      />
    </>
  );
}