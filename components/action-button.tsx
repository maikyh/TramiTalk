"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ActionButtonProps {
  action: {
    id: number
    title: string
    icon: LucideIcon
    color: string
  }
}

export default function ActionButton({ action }: ActionButtonProps) {
  const { toast } = useToast()
  const { title, icon: Icon, color } = action

  const handleClick = () => {
    toast({
      title: "Acción seleccionada",
      description: `Has seleccionado: ${title}`,
      variant: "default",
    })
  }

  return (
    <motion.button
      className="flex flex-col items-center gap-2 w-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <motion.div
        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm"
        style={{ backgroundColor: color }}
        whileHover={{
          boxShadow: `0 0 12px ${color}80`,
        }}
      >
        <Icon size={24} className="text-white" />
      </motion.div>
      <span className="text-xs font-medium text-[#0A3B32] text-center leading-tight">{title}</span>
    </motion.button>
  )
}
