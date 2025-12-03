"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, HandCoins, Sparkles } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Iphone } from "@/components/ui/iphone"
import { Terminal, TypingAnimation, AnimatedSpan} from "@/components/ui/terminal"

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

      <div className="relative w-[290px] h-[600px] bg-gray-800 rounded-[3.5rem] p-[3px] ">

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

function RankingScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        src="/ranking.png"
        alt="tela de ranking"
        fill
        className="object-cover object-top"
      />
    </div>
  )
}

function CalendarScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        src="/calendar.png"
        alt="tela de calendário"
        fill
        className="object-cover object-top"
      />
    </div>
  )
}

function DisciplinesScreen() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        src="/disciplines.png"
        alt="tela de disciplinas"
        fill
        className="object-cover object-top"
      />
    </div>
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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const phoneY = useTransform(smoothProgress, [0, 0.3], [100, 0])
  const phoneOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1])
  const phoneScale = useTransform(smoothProgress, [0, 0.3], [0.8, 1])
  const phoneRotate = useTransform(smoothProgress, [0, 0.3], [10, 0])

  const phone2Y = useTransform(smoothProgress, [0.2, 0.5], [150, 0])
  const phone2Opacity = useTransform(smoothProgress, [0.2, 0.35], [0, 1])
  const phone2Scale = useTransform(smoothProgress, [0.2, 0.5], [0.7, 1])

  const phone3Y = useTransform(smoothProgress, [0.35, 0.6], [150, 0])
  const phone3Opacity = useTransform(smoothProgress, [0.35, 0.5], [0, 1])

  const statsOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1])
  const statsY = useTransform(smoothProgress, [0.5, 0.65], [100, 0])

  const finalOpacity = useTransform(smoothProgress, [0.75, 0.9], [0, 1])
  const finalScale = useTransform(smoothProgress, [0.75, 0.9], [0.9, 1])

  return (
    <div ref={containerRef} className="relative bg-black">

      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700/20 via-black to-black" />

        {/* particulas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1.5 h-1 bg-indigo-500/30 rounded-full"
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

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#ffea00]" />
              Demonstração Interativa
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça {" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-900 bg-clip-text text-transparent">
              Macawdemy.
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
          </motion.p>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="text-sm">Scroll para explorar</span>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-5 h-5 rotate-90" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* celulares */}
      <section ref={phoneSectionRef} className="min-h-[200vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative flex items-center justify-center gap-4 md:gap-8">

            {/* meio */}
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

            {/* esquerda  */}
            <motion.div
              style={{
                y: phone2Y,
                opacity: phone2Opacity,
                scale: phone2Scale,
              }}
              className="hidden md:block absolute -left-72 z-10"
            >
              <PhoneMockup rotation={-8} scale={0.85}>
                <RankingScreen />
              </PhoneMockup>
            </motion.div>

            {/* direita */}
            <motion.div
              style={{
                y: phone3Y,
                opacity: phone3Opacity,
              }}
              className="hidden md:block absolute -right-72 z-10"
            >
              <PhoneMockup rotation={8} scale={0.85}>
                <CalendarScreen />
              </PhoneMockup>
            </motion.div>
          </div>
        </div>
      </section>

      {/* impacto real */}
      <section ref={statsSectionRef} className="min-h-screen relative py-20 overflow-hidden">
        <motion.div className="max-w-7xl mx-auto px-4" style={{ opacity: statsOpacity, y: statsY }}>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Impacto{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-900 bg-clip-text text-transparent">Real</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Milhares de estudantes já transformaram sua jornada educacional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px]">

              {/* esquerda */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-40"
                initial={{ opacity: 0, x: -50, rotate: -10 }}
                whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 overflow-hidden shadow-xl relative">
                  <Image
                    src="/eu.jpg"
                    alt="estudante bom e novo"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* centro */}
              <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2 w-48 h-60"
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 6 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 overflow-hidden shadow-2xl relative">
                  <Image
                    src="/eu.jpg"
                    alt="estudante bom e novo"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* direita */}
              <motion.div
                className="absolute top-10 right-0 w-32 h-40"
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-white/10 overflow-hidden shadow-xl relative">
                  <Image
                    src="/eu.jpg"
                    alt="estudante bom e novo"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-0 z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-orange-600 to-yellow-600 rounded-2xl p-4 shadow-2xl transform -rotate-6 transition-transform duration-300">
                  <p className="text-orange-300 text-sm">+</p>
                  <p className="text-yellow-300/70 text-3xl font-bold">
                    69<span className="text-xl">%</span>
                  </p>
                  <p className="text-white/80 text-xs max-w-[120px]">
                    dos usuários se sentem melhor em seus estudos.
                  </p>
                </div>
              </motion.div>

              <motion.div
                  className="absolute bottom-10 right-10 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gradient-to-br from-emerald-700 to-green-800 rounded-2xl p-4 shadow-2xl transform rotate-6 transition-transform duration-300">
                    <p className="text-green-300 text-sm">+</p>
                    <p className="text-lime-400 text-3xl font-bold">
                      +17<span className="text-xl">%</span>
                    </p>
                    <p className="text-white/80 text-xs max-w-[120px]">
                      de produtividade por usuário.
                    </p>
                  </div>
                </motion.div>
            </div>

            {/* dados tirados do cu para dar impressão de segurança */}
            <div className="flex justify-center items-center w-full h-full">
              <Terminal
                className="w-full max-w-4xl h-[600px] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-sm text-white font-mono text-lg font-extrabold shadow-2xl"
                sequence
                startOnView
              >
                <TypingAnimation delay = {0} >$ npm install macawdemy</TypingAnimation>
                <AnimatedSpan delay = {800} className = "text-blue-500"> ℹ Instalando Macawdemy...</AnimatedSpan>
                <AnimatedSpan className = "text-green-500">  ✔ 24K+ estudantes ativos aprimorando seus estudos</AnimatedSpan>
                <AnimatedSpan className = "text-green-500">  ✔ 420+ instituições parceiras confiando na plataforma</AnimatedSpan>
                <AnimatedSpan className = "text-green-500">  ✔ Aprendizado gamificado e personalizado</AnimatedSpan>
                <AnimatedSpan className = "text-green-500">  ✔ Banco de + 2.000 questões e desafios práticos</AnimatedSpan>

                <TypingAnimation >$ macawdemy start</TypingAnimation>
              </Terminal>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          style={{ opacity: finalOpacity, scale: finalScale }}
        >
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-[300px] aspect-[433/882] overflow-hidden rounded-xl shadow-lg">
              <Iphone src="/login.png" className="w-full h-full" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pronto para{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              revolucionar
            </span>{" "}
            seu ensino?
          </h2>

          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Junte-se a milhares de estudantes que já estão transformando sua forma de aprender
          </p>

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