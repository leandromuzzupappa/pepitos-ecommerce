import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export const DissortImageMaterial = shaderMaterial(
  // Uniforms
  {
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTime: 0,
    uTexture: new THREE.Texture(),
    uVelocity: 0,
  },
  /* glsl */ `
      precision mediump float;
  
      uniform float uTime;
      varying vec2 vUv;
  
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
  /* glsl */ `
      precision mediump float;
  
      uniform vec3 uColor;
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform float uVelocity;
  
      varying vec2 vUv;
      varying float vWave;
  
      void main() { 
          vec3 texture = texture2D(uTexture, vUv).rgb;

          texture += sin(vUv.y * 10. + uTime * .5) * 0.1;
          texture.r *= 1. - uVelocity;

          gl_FragColor = vec4(texture, 1.);
      }
    `
);

extend({ DissortImageMaterial });
