"use client";

import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  Color,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";

export type ShapeVariant =
  | "sphere"
  | "torus"
  | "icosahedron"
  | "cone"
  | "octahedron";

interface MiniHeroShapeProps {
  variant: ShapeVariant;
}

interface ShapeTheme {
  core: string;
  rim: string;
  speed: number;
}

const SHAPE_THEMES: Record<ShapeVariant, ShapeTheme> = {
  sphere: {
    core: "#B6B09F",
    rim: "#F2F2F2",
    speed: 0.34,
  },
  torus: {
    core: "#EAE4D5",
    rim: "#F2F2F2",
    speed: 0.5,
  },
  icosahedron: {
    core: "#B6B09F",
    rim: "#F2F2F2",
    speed: 0.48,
  },
  cone: {
    core: "#EAE4D5",
    rim: "#F2F2F2",
    speed: 0.4,
  },
  octahedron: {
    core: "#B6B09F",
    rim: "#F2F2F2",
    speed: 0.45,
  },
};

function ShapeGeometry({ variant }: MiniHeroShapeProps) {
  switch (variant) {
    case "sphere":
      return <sphereGeometry args={[1.05, 56, 56]} />;
    case "torus":
      return <torusGeometry args={[0.86, 0.28, 36, 96]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[1.12, 1]} />;
    case "cone":
      return <coneGeometry args={[0.98, 1.72, 64, 1]} />;
    case "octahedron":
    default:
      return <octahedronGeometry args={[1.15, 0]} />;
  }
}

function RotatingShape({ variant }: MiniHeroShapeProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const vibrationRef = useRef<Mesh>(null);
  const flowMaterialRef = useRef<ShaderMaterial>(null);
  const theme = SHAPE_THEMES[variant];
  const flowUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color("#ff2b2b") },
    }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || !vibrationRef.current || !flowMaterialRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(elapsed * 0.75) * 0.03;

    coreRef.current.rotation.x = elapsed * theme.speed * 0.55;
    coreRef.current.rotation.y = elapsed * theme.speed;
    vibrationRef.current.rotation.x = coreRef.current.rotation.x;
    vibrationRef.current.rotation.y = coreRef.current.rotation.y;
    flowMaterialRef.current.uniforms.uTime.value = elapsed;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.45}>
      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <ShapeGeometry variant={variant} />
          <meshPhysicalMaterial
            color={theme.core}
            roughness={0.12}
            metalness={0.78}
            clearcoat={1}
            clearcoatRoughness={0.04}
            transmission={0.14}
            ior={1.38}
            emissive={theme.rim}
            emissiveIntensity={0.04}
          />
        </mesh>

        <mesh ref={vibrationRef}>
          <ShapeGeometry variant={variant} />
          <shaderMaterial
            ref={flowMaterialRef}
            blending={AdditiveBlending}
            depthWrite={false}
            transparent
            uniforms={flowUniforms}
            vertexShader={`
              varying vec3 vWorldPos;
              void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPos = worldPosition.xyz;
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
              }
            `}
            fragmentShader={`
              uniform float uTime;
              uniform vec3 uColor;
              varying vec3 vWorldPos;

              void main() {
                vec3 axis = normalize(vec3(0.0, 1.0, 0.22));
                float stream = dot(vWorldPos, axis) * 0.62 - uTime * 0.95;
                float wave = fract(stream);
                float band = smoothstep(0.0, 0.18, wave) * (1.0 - smoothstep(0.18, 0.36, wave));
                float softness = 0.5 + 0.5 * sin(stream * 6.28318);
                float alpha = band * softness * 0.35;
                gl_FragColor = vec4(uColor, alpha);
              }
            `}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function MiniHeroShape({ variant }: MiniHeroShapeProps) {
  const theme = SHAPE_THEMES[variant];

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-charcoal/20 sm:h-64">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 42 }}>
        <ambientLight intensity={0.28} />
        <directionalLight position={[1.8, 2.1, 2]} intensity={1.45} color={theme.rim} />
        <pointLight position={[-2.2, -0.8, 1.4]} intensity={0.85} color="#B6B09F" />
        <pointLight position={[1.4, -1.2, 1]} intensity={0.6} color="#EAE4D5" />
        <pointLight position={[0, 0.5, 1.4]} intensity={0.9} color="#ff2b2b" />
        <RotatingShape variant={variant} />
      </Canvas>
    </div>
  );
}
