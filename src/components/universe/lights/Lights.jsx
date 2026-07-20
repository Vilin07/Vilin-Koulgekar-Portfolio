export default function Lights() {
  return (
    <>
     <ambientLight intensity={0.03} />

<pointLight
    position={[0,0,0]}
    color="#8fb8ff"
    intensity={2.2}
/>

<pointLight
    position={[8,4,5]}
    color="#4f7cff"
    intensity={0.5}
/>

<pointLight
    position={[-8,-3,-5]}
    color="#1e3a8a"
    intensity={0.3}
/>
    </>
  );
}