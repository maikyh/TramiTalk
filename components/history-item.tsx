"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface HistoryItemProps {
  item: {
    id: number
    title: string
    time: string
    icon: LucideIcon
    color: string
    amount: string
  }
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const { title, time, icon: Icon, color, amount } = item

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="p-3 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-[#0A3B32]">{title}</h3>
            <p className="text-xs text-gray-500">Hace {time}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-[#0A3B32]">{amount}</p>
          <Badge variant="outline" className="text-xs text-gray-500">
            Completado
          </Badge>
        </div>
      </Card>
    </motion.div>
  )
}
