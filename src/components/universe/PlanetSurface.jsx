import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

const vertexShader = `varying vec3 vNormal; varying vec3 vPosition; void main(){vNormal=normalize(normalMatrix*normal);vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragmentShader = `uniform float uOpacity; varying vec3 vNormal; varying vec3 vPosition; float h(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5);} float n(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1)),f.x),f.y),f.z);} void main(){float surface=n(vPosition*2.4)+.5*n(vPosition*6.);vec3 dark=vec3(.012,.025,.065);vec3 land=vec3(.055,.12,.20);vec3 col=mix(dark,land,smoothstep(.45,1.1,surface));float light=max(dot(normalize(vNormal),normalize(vec3(-.35,.45,.8))),0.);float terminator=smoothstep(.03,.5,light);col*=.16+.84*terminator;gl_FragColor=vec4(col,uOpacity);}`;

export default function PlanetSurface({ radius, materialRef }) {
  const material = useRef();
  const uniforms = useMemo(() => ({ uOpacity: { value: 0 } }), []);

  useFrame(() => {
    if (material.current && materialRef.current) material.current.uniforms.uOpacity.value = materialRef.current.opacity;
  });

  return <mesh><sphereGeometry args={[radius, 64, 64]} /><shaderMaterial ref={(node) => { material.current = node; materialRef.current = node; }} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} opacity={0} /></mesh>;
}
