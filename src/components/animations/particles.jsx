"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Color, AdditiveBlending, CanvasTexture } from "three"

const FLOWING_PARTICLE_COUNT = 400
const BG_PARTICLE_COUNT = 200

function useCircleTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null

    const size = 64
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, size, size)
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()

    return new CanvasTexture(canvas)
  }, [])
}

function FlowingParticles({ texture }) {
  const ref = useRef(null)

  const data = useMemo(() => {
    const positions = new Float32Array(FLOWING_PARTICLE_COUNT * 3)
    const colors = new Float32Array(FLOWING_PARTICLE_COUNT * 3)
    const sizes = new Float32Array(FLOWING_PARTICLE_COUNT)
    const velocities = new Float32Array(FLOWING_PARTICLE_COUNT * 3)

    for (let i = 0; i < FLOWING_PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 8
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      const color = new Color()
      const hue = [0.75, 0.85, 0.55, 0.65][Math.floor(Math.random() * 4)]
      color.setHSL(hue, 0.6 + Math.random() * 0.2, 0.5 + Math.random() * 0.2)

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 0.4 + 0.05

      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.005
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008
    }

    return { positions, colors, sizes, velocities }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array
    const size = ref.current.geometry.attributes.size.array

    for (let i = 0; i < FLOWING_PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] += data.velocities[i3]
      pos[i3 + 1] += data.velocities[i3 + 1] + Math.sin(time * 0.3 + i * 0.01) * 0.002
      pos[i3 + 2] += data.velocities[i3 + 2]

      size[i] = data.sizes[i] * (1 + Math.sin(time * 1.5 + i * 0.15) * 0.2)

      if (pos[i3] > 10) pos[i3] = -10
      if (pos[i3] < -10) pos[i3] = 10
      if (pos[i3 + 1] > 4) pos[i3 + 1] = -4
      if (pos[i3 + 1] < -4) pos[i3 + 1] = 4
      if (pos[i3 + 2] > 5) pos[i3 + 2] = -5
      if (pos[i3 + 2] < -5) pos[i3 + 2] = 5
    }

    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.geometry.attributes.size.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={data.positions} count={FLOWING_PARTICLE_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={data.colors} count={FLOWING_PARTICLE_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={data.sizes} count={FLOWING_PARTICLE_COUNT} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={AdditiveBlending}
        map={texture}
        alphaTest={0.5}
      />
    </points>
  )
}

function BackgroundParticles({ texture }) {
  const ref = useRef(null)

  const data = useMemo(() => {
    const positions = new Float32Array(BG_PARTICLE_COUNT * 3)
    const colors = new Float32Array(BG_PARTICLE_COUNT * 3)
    const sizes = new Float32Array(BG_PARTICLE_COUNT)

    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 12
      positions[i3 + 2] = (Math.random() - 0.5) * 15

      const color = new Color()
      color.setHSL(0.7 + Math.random() * 0.2, 0.3, 0.2)

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 0.15 + 0.02
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array

    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] += Math.sin(time * 0.02 + i) * 0.0005
      pos[i3 + 1] += Math.cos(time * 0.015 + i) * 0.0003

      if (pos[i3] > 15) pos[i3] = -15
      if (pos[i3] < -15) pos[i3] = 15
      if (pos[i3 + 1] > 6) pos[i3 + 1] = -6
      if (pos[i3 + 1] < -6) pos[i3 + 1] = 6
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={data.positions} count={BG_PARTICLE_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={data.colors} count={BG_PARTICLE_COUNT} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={data.sizes} count={BG_PARTICLE_COUNT} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={AdditiveBlending}
        map={texture}
        alphaTest={0.5}
      />
    </points>
  )
}

export default function Particles() {
  const texture = useCircleTexture()
  if (!texture) return null

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 90 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1} />
        <FlowingParticles texture={texture} />
        <BackgroundParticles texture={texture} />
      </Canvas>
    </div>
  )
}