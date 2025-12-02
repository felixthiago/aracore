"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, HandCoins, Sparkles, Users, TrendingUp, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// template celular
function PhoneMockup({
  children,
  className = "",
  rotation = 0,
  scale = 1,
}: {
  children: React.ReactNode
  className?: string
  rotation?: number
  scale?: number
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
      }}
    >
      <div className="relative w-[290px] h-[600px] bg-white rounded-[3.5rem] p-[3px] shadow-2xl shadow-[#ffea00]">
        <div className="relative w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[3.3rem] p-2">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 border border-white/20 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-700" />
            <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-700" />
          </div>
          <div className="w-full h-full bg-black rounded-[2.8rem] overflow-hidden relative border border-white/10">
            <div className="w-full h-full">{children}</div>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// imagens dos celulares
function LoginScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <img src="/login.png" alt="tela de login" className="w-full h-full object-cover object-top" />
    </div>
  )
}

function RankingScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <img src="/ranking.png" alt="tela de ranking" className="w-full h-full object-cover object-top" />
    </div>
  )
}

function CalendarScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <img src="/calendar.png" alt="tela de ranking" className="w-full h-full object-cover object-top" />
    </div>
  )
}

function DisciplinesScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <img src="/disciplines.png" alt="tela de ranking" className="w-full h-full object-cover object-top" />
    </div>
  )
}

function FeatureBadge({
  label,
  index,
  progress,
}: {
  label: string
  index: number
  progress: any
}) {
  const y = useTransform(progress, [0.15 + index * 0.05, 0.3 + index * 0.05], [60, 0])
  const opacity = useTransform(progress, [0.15 + index * 0.05, 0.25 + index * 0.05], [0, 1])
  const scale = useTransform(progress, [0.15 + index * 0.05, 0.3 + index * 0.05], [0.8, 1])

  return (
    <motion.span
      style={{ y, opacity, scale }}
      className="bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-full px-5 py-2.5 text-gray-200 text-sm backdrop-blur-md shadow-lg shadow-black/20 hover:border-purple-500/50 transition-colors duration-300"
    >
      {label}
    </motion.span>
  )
}

export default function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const phoneSectionRef = useRef<HTMLDivElement>(null)
  const statsSectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0001,
  })

  const phoneY = useTransform(smoothProgress, [0, 0.25], [120, 0])
  const phoneOpacity = useTransform(smoothProgress, [0, 0.12], [0, 1])
  const phoneScale = useTransform(smoothProgress, [0, 0.25], [0.85, 1])
  const phoneRotate = useTransform(smoothProgress, [0, 0.25], [8, 0])

  const phone2Y = useTransform(smoothProgress, [0.15, 0.4], [140, 0])
  const phone2Opacity = useTransform(smoothProgress, [0.15, 0.28], [0, 1])
  const phone2Scale = useTransform(smoothProgress, [0.15, 0.4], [0.75, 1])
  const phone2Rotate = useTransform(smoothProgress, [0.15, 0.4], [-15, -8])

  const phone3Y = useTransform(smoothProgress, [0.25, 0.5], [140, 0])
  const phone3Opacity = useTransform(smoothProgress, [0.25, 0.38], [0, 1])
  const phone3Rotate = useTransform(smoothProgress, [0.25, 0.5], [15, 8])

  // Stats section animations
  const statsOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1])
  const statsY = useTransform(smoothProgress, [0.5, 0.65], [80, 0])

  // Final section animations
  const finalOpacity = useTransform(smoothProgress, [0.75, 0.88], [0, 1])
  const finalScale = useTransform(smoothProgress, [0.75, 0.88], [0.92, 1])
  const finalY = useTransform(smoothProgress, [0.75, 0.88], [50, 0])

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700/20 via-black to-black" />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#ffea00]" />
              Demonstração Interativa
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Conheça{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-900 bg-clip-text text-transparent">Aracore.</span>
          </motion.h1>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="text-sm">Scroll para explorar</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 rotate-90" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phone Showcase Section */}
      <section ref={phoneSectionRef} className="min-h-[200vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 flex gap-3 md:gap-6 flex-wrap justify-center px-4 z-30">
            {/* Order: Gamificação (left), Banco de questões (center), Estudos Personalizados (right) */}
            <FeatureBadge label="Gamificação" index={0} progress={smoothProgress} />
            <FeatureBadge label="Banco de Questões" index={1} progress={smoothProgress} />
            <FeatureBadge label="Estudos Personalizados" index={2} progress={smoothProgress} />
          </div>

          <div className="relative flex items-center justify-center gap-4 md:gap-8 mt-8">
            {/* Center phone */}
            <motion.div
              style={{
                y: phoneY,
                opacity: phoneOpacity,
                scale: phoneScale,
                rotate: phoneRotate,
              }}
              className="z-20"
            >
              <PhoneMockup>
                <DisciplinesScreen />
              </PhoneMockup>
            </motion.div>

            {/* Left phone */}
            <motion.div
              style={{
                y: phone2Y,
                opacity: phone2Opacity,
                scale: phone2Scale,
                rotate: phone2Rotate,
              }}
              className="hidden md:block absolute -left-72 z-10"
            >
              <PhoneMockup scale={0.85}>
                <RankingScreen />
              </PhoneMockup>
            </motion.div>

            {/* Right phone */}
            <motion.div
              style={{
                y: phone3Y,
                opacity: phone3Opacity,
                rotate: phone3Rotate,
              }}
              className="hidden md:block absolute -right-72 z-10"
            >
              <PhoneMockup scale={0.85}>
                <CalendarScreen />
              </PhoneMockup>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={statsSectionRef} className="min-h-screen relative py-20 overflow-hidden">
        <motion.div className="max-w-7xl mx-auto px-4" style={{ opacity: statsOpacity, y: statsY }}>
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Impacto{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-900 bg-clip-text text-transparent">Real</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Milhares de estudantes já transformaram sua jornada educacional
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] flex items-center justify-center">
              <div className="relative w-full max-w-md h-full">
                {/* Left image */}
                <motion.div
                  className="absolute top-8 left-0 w-28 md:w-32 h-36 md:h-40"
                  initial={{ opacity: 0, x: -30, rotate: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 overflow-hidden shadow-xl">
                    <img
                      src="/eu.jpg"
                      alt="Student"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </motion.div>

                {/* Center image */}
                <motion.div
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-40 md:w-48 h-52 md:h-60 z-10"
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 overflow-hidden shadow-2xl">
                    <img
                      src="/eu.jpg"
                      alt="Student"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </motion.div>

                {/* Right image */}
                <motion.div
                  className="absolute top-8 right-0 w-28 md:w-32 h-36 md:h-40"
                  initial={{ opacity: 0, x: 30, rotate: 10 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-white/10 overflow-hidden shadow-xl">
                    <img
                      src="/eu.jpg"
                      alt="Student"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-16 left-4 md:left-8 z-20"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-2xl p-4 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <p className="text-orange-300 text-sm">+</p>
                    <p className="text-yellow-300/90 text-3xl font-bold">
                      69<span className="text-xl">%</span>
                    </p>
                    <p className="text-white/80 text-xs max-w-[120px]">
                      dos usuários se sentem melhor em seus estudos.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 right-4 md:right-8 z-20"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-br from-emerald-700 to-green-800 rounded-2xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <p className="text-green-300 text-sm">+</p>
                    <p className="text-lime-400 text-3xl font-bold">
                      +17<span className="text-xl">%</span>
                    </p>
                    <p className="text-white/80 text-xs max-w-[120px]">de produtividade por usuário.</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="space-y-5">
              {[
                { icon: <Users className="w-6 h-6" />, value: "24K+", label: "Estudantes ativos na plataforma" },
                { icon: <TrendingUp className="w-6 h-6" />, value: "420+", label: "Instituições parceiras" },
                { icon: <Heart className="w-6 h-6" />, value: "69%", label: "Taxa de satisfação dos usuários" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-white text-2xl font-bold">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          style={{ opacity: finalOpacity, scale: finalScale, y: finalY }}
        >
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <PhoneMockup>
              <LoginScreen />
            </PhoneMockup>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Pronto para{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              revolucionar
            </span>{" "}
            seu ensino?
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Junte-se a milhares de estudantes que já estão transformando sua forma de aprender
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link href="/#pricing">
              <Button className="cursor-pointer bg-gradient-to-r from-blue-700 to-indigo-500/50 hover:from-blue-600 hover:to-indigo-500/60 text-white px-10 py-7 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 min-w-[180px]">
                Ver Preços
                <HandCoins className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="cursor-pointer border-2 border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl backdrop-blur-sm bg-transparent transition-all duration-300 hover:scale-105 hover:border-white/40 min-w-[180px]"
              >
                Voltar ao Início
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Link
              href="/#about"
              className="text-gray-500 hover:text-gray-300 transition-colors duration-300 inline-flex items-center gap-2 text-sm group"
            >
              SAIBA MAIS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-black to-black" />
      </section>
    </div>
  )
}
