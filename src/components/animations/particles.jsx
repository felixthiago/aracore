// components/animations/particles.jsx

"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Color, AdditiveBlending } from "three"

// --- CONSTANTES ---
const FLOWING_PARTICLE_COUNT = 1200
const FLOWING_X_LIMIT = 10
const FLOWING_Y_LIMIT = 4
const FLOWING_Z_LIMIT = 5

const BG_PARTICLE_COUNT = 800
const BG_X_LIMIT = 15
const BG_Y_LIMIT = 6

// Exportamos o loader separadamente para ser usado com React.Suspense
export function ParticleLoader(){
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <div className="flex space-x-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: `hsl(${260 + i * 30}, 60%, 60%)`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Flowing() {
  const particlesRef = useRef(null)

  const particleData = useMemo(() => {
    const count = FLOWING_PARTICLE_COUNT
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Simplificando e melhorando a variação de cores (tons roxos/rosas/azuis)
      const color = new Color()
      const hue = [0.75, 0.85, 0.55, 0.65][Math.floor(Math.random() * 4)]
      color.setHSL(hue, 0.6 + Math.random() * 0.2, 0.5 + Math.random() * 0.2)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 0.4 + 0.05

      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008
    }

    return { positions, colors, sizes, velocities, count }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return

    const time = state.clock.getElapsedTime()
    const positions = particlesRef.current.geometry.attributes.position.array
    const sizes = particlesRef.current.geometry.attributes.size.array

    for (let i = 0; i < particleData.count; i++) {
      const i3 = i * 3

      // Movimentação
      positions[i3] += particleData.velocities[i3]
      positions[i3 + 1] += particleData.velocities[i3 + 1] + Math.sin(time * 0.3 + i * 0.01) * 0.002
      positions[i3 + 2] += particleData.velocities[i3 + 2]

      // Pulsação de tamanho
      sizes[i] = particleData.sizes[i] * (1 + Math.sin(time * 1.5 + i * 0.15) * 0.2)

      // Reposicionamento (envolver a cena)
      if (positions[i3] > FLOWING_X_LIMIT) positions[i3] = -FLOWING_X_LIMIT
      if (positions[i3] < -FLOWING_X_LIMIT) positions[i3] = FLOWING_X_LIMIT
      if (positions[i3 + 1] > FLOWING_Y_LIMIT) positions[i3 + 1] = -FLOWING_Y_LIMIT
      if (positions[i3 + 1] < -FLOWING_Y_LIMIT) positions[i3 + 1] = FLOWING_Y_LIMIT
      if (positions[i3 + 2] > FLOWING_Z_LIMIT) positions[i3 + 2] = -FLOWING_Z_LIMIT
      if (positions[i3 + 2] < -FLOWING_Z_LIMIT) positions[i3 + 2] = FLOWING_Z_LIMIT
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.size.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.count}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleData.count}
          array={particleData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleData.count}
          array={particleData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={AdditiveBlending}
      />
    </points>
  )
}

function BackgroundParticles() {
  const bgRef = useRef(null)

  const bgData = useMemo(() => {
    const count = BG_PARTICLE_COUNT
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const color = new Color()
      // Cores de fundo mais escuras e sutis (tons azul/roxo escuro)
      color.setHSL(0.7 + Math.random() * 0.2, 0.3, 0.2) 
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 0.15 + 0.02
    }

    return { positions, colors, sizes, count }
  }, [])

  useFrame((state) => {
    if (!bgRef.current) return

    const time = state.clock.getElapsedTime()
    const positions = bgRef.current.geometry.attributes.position.array

    for (let i = 0; i < bgData.count; i++) {
      const i3 = i * 3

      // Movimento lento
      positions[i3] += Math.sin(time * 0.02 + i) * 0.0005
      positions[i3 + 1] += Math.cos(time * 0.015 + i) * 0.0003

      // Reposicionamento
      if (positions[i3] > BG_X_LIMIT) positions[i3] = -BG_X_LIMIT
      if (positions[i3] < -BG_X_LIMIT) positions[i3] = BG_X_LIMIT
      if (positions[i3 + 1] > BG_Y_LIMIT) positions[i3 + 1] = -BG_Y_LIMIT
      if (positions[i3 + 1] < -BG_Y_LIMIT) positions[i3 + 1] = BG_Y_LIMIT
    }

    bgRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={bgRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={bgData.count}
          array={bgData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={bgData.count}
          array={bgData.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={bgData.count}
          array={bgData.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={AdditiveBlending}
      />
    </points>
  )
}

export default function Particles() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        key="particles-canvas"
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }} 
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.9} />
        <Flowing />
        <BackgroundParticles />
      </Canvas>
    </div>
  )
}