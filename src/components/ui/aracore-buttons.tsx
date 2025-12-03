"use client"

import type React from "react"
import { Apple, Play} from "lucide-react"

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/components/ui/popover";

import { toast } from "sonner"

interface AracoreButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "promotional" | "upgrade"
  onClick?: () => void
  className?: string
}

export function AracoreButton({ children, variant = "primary", onClick, className = "" }: AracoreButtonProps) {
  const baseClasses =
    "cursor-pointer group flex items-center gap-3 font-medium rounded-xl transition-all duration-200 backdrop-blur-sm"

  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-700 hover:bg-indigo-500/50 hover:brightness-120 text-white px-6 py-3.5 shadow-lg hover:shadow-xl hover:scale-105 border border-blue-600/30",
    secondary:
      "bg-gray-900/80 hover:bg-gray-800/90 text-white px-6 py-3.5 border border-gray-700/50 hover:border-gray-600/70",
    promotional:
      "bg-gray-950/90 hover:bg-gray-900/95 text-white px-8 py-4 rounded-2xl border border-gray-800/50 hover:border-gray-700/70 shadow-2xl",
    upgrade:
      "bg-transparent bg-gradient-to-r from-amber-600 via-amber-600/60 to-amber-600 [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center] focus-visible:ring-amber-600/20 dark:from-amber-400 dark:via-amber-400/60 dark:to-amber-400 dark:focus-visible:ring-amber-400/40"
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export function DownloadButton() {
  return (
    <AracoreButton variant="secondary">
        <Apple className ="h-5 w-5 text-[#FF0000]"></Apple>
        <span>Download Android ou IOS</span>
    </AracoreButton>
  )
}

export function DemoButton(){
  return (
      <AracoreButton variant = "secondary">
        <span className="text-white font-semibold">Demonstração</span>
        <Play className = "h-5 w-5 group-hover:translate-x-1 backdrop-blur-sm transition-all duration-300 hover:scale-105 group bg-transparent text-green-300"/>
      </AracoreButton>
  )
}

export function SupportButton() {
  return (
    <PopoverRoot>
      <PopoverTrigger className="hover:scale-110 cursor-pointer flex items-center gap-2 z-50 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3.5 border-gray-600 hover:border-gray-500 rounded-xl backdrop-blur-sm transition-all duration-200 shadow-lg">
      <span className="text-lg text-white hover:text-white/80">Suporte</span>
      </PopoverTrigger>

      <PopoverContent className = 'z-50 mx-auto max-w-md' >
        <PopoverForm
          onSubmit={(note) => {
            toast.promise(
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (note && note.length > 0) {
                    resolve(note)
                  } else {
                    reject("Mensagem vazia")
                  }
                }, 1000)
              }),
              {
                loading: "Enviando...",
                success: (note) => `Enviado com sucesso: ${note}`,
                error: (err) => `Erro: ${err}`,
              },
            )
          }}
        >

          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Deixe sua dúvida</h3>
            <div className="relative min-h-[120px]">
              <PopoverLabel>Digite sua mensagem...</PopoverLabel>
              <PopoverTextarea className="min-h-[120px]" />
            </div>
          </div>

          <PopoverFooter>
            <PopoverCloseButton />
            <PopoverSubmitButton>Enviar</PopoverSubmitButton>
          </PopoverFooter>
        </PopoverForm>
      </PopoverContent>
    </PopoverRoot>
  )
}
