"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mic,
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Car,
  Search,
  ChevronRight,
  FileCheck,
  Home,
  ChevronLeft,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import ActionButton from "@/components/action-button"
import HistoryItem from "@/components/history-item"
import WelcomeScreen from "@/components/welcome-screen"
import CalendarView from "@/components/calendar-view"
import PaymentCardPanel from "@/components/payment-card-panel"
import TorreonLogo from "@/components/torreon-logo"
import ListeningOverlay from "@/components/listening-overlay"
import VoiceChatButton from "@/components/VoiceChatButton"

export default function HomePage() {
  const { toast } = useToast()
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("inicio")
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showListeningOverlay, setShowListeningOverlay] = useState(false)
  const micButtonRef = useRef<HTMLButtonElement>(null)
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate loading time for welcome animation
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleMicClick = () => {
    if (!showListeningOverlay) {
      setIsListening(true)
      toast({
        title: "Escuchando...",
        description: "Dime en qué puedo ayudarte con tus trámites",
        variant: "default",
      })

      // Simulate voice recognition ending after 3 seconds
      setTimeout(() => {
        setIsListening(false)
        toast({
          title: "Entendido",
          description: "Buscando información sobre renovación de licencia",
          variant: "success",
        })
      }, 3000)
    }
  }

  const handleMicMouseDown = () => {
    // Iniciar temporizador para detectar presión larga
    longPressTimeoutRef.current = setTimeout(() => {
      setShowListeningOverlay(true)
      setIsListening(true)
    }, 500) // 500ms para considerar presión larga
  }

  const handleMicMouseUp = () => {
    // Cancelar temporizador si se suelta antes de tiempo
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current)
      longPressTimeoutRef.current = null
    }
  }

  const handleCloseListeningOverlay = () => {
    setShowListeningOverlay(false)
    setIsListening(false)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const quickActions = [
    { id: 1, title: "Servicios Básicos", icon: Home, color: "#4885C5" },
    { id: 2, title: "Identificaciones", icon: FileText, color: "#D02030" },
    { id: 3, title: "Movilidad Vehículos", icon: Car, color: "#24B649" },
    { id: 4, title: "Impuestos y SS", icon: CreditCard, color: "#CB4FCB" },
    { id: 5, title: "Citas Médicas", icon: Calendar, color: "#FF4333" },
    { id: 6, title: "Trámites Escolares", icon: FileCheck, color: "#0A3B32" },
  ]

  const historyItems = [
    { id: 1, title: "Pago CFE", time: "12 min", icon: CreditCard, color: "#24B649", amount: "$782.50" },
    { id: 2, title: "Trámite Licencia de conducir", time: "2 días", icon: Car, color: "#CB4FCB", amount: "$1,250.00" },
    { id: 3, title: "Pago Telmex", time: "3 días", icon: Home, color: "#4885C5", amount: "$499.00" },
  ]

  // Eventos para el calendario
  const calendarEvents = [
    { id: 1, title: "Renovación Pasaporte", date: new Date(2025, 4, 28), icon: FileText, color: "#4885C5" },
    { id: 2, title: "Pago Predial", date: new Date(2025, 5, 2), icon: Home, color: "#24B649" },
    { id: 3, title: "Verificación Vehicular", date: new Date(2025, 5, 15), icon: Car, color: "#FF4333" },
    { id: 4, title: "Pago Agua", date: new Date(2025, 4, 20), icon: Home, color: "#4885C5" },
    { id: 5, title: "Renovación Licencia", date: new Date(2025, 5, 10), icon: Car, color: "#CB4FCB" },
  ]

  if (showWelcome) {
    return <WelcomeScreen />
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-white pb-20">
      <div className="w-full max-w-md mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="rounded-xl overflow-hidden shadow-lg border-none">
            {/* Header con Logo de Torreón */}
            <div className="bg-gradient-to-r from-[#0A3B32] to-[#24B649] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <TorreonLogo className="h-10 w-10" />
                <div>
                  <h1 className="text-xl font-bold flex items-center">
                    TramiTalk
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="ml-1 inline-block"
                    >
                      <Badge className="bg-[#FF4333] text-white text-xs">AI</Badge>
                    </motion.span>
                  </h1>
                  <p className="text-xs opacity-80">Torreón, Coahuila</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Bell size={20} />
              </motion.div>
            </div>

            {/* Search Bar */}
            <div className="p-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar trámite o servicio..."
                  className="pl-10 pr-10 py-6 rounded-full border-[#4885C5] border-2 focus-visible:ring-[#24B649]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.button
                  className={cn(
                    "absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center",
                    isListening ? "bg-[#D02030]" : "bg-[#0A3B32]",
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleMicClick}
                >
                  <Mic size={16} className="text-white" />
                </motion.button>
              </div>
            </div>

            <Tabs defaultValue="inicio" className="w-full" onValueChange={setActiveTab}>
              <div className="px-4">
                <TabsList className="grid grid-cols-4 w-full bg-gray-100 rounded-lg p-1">
                  <TabsTrigger
                    value="inicio"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Inicio
                  </TabsTrigger>
                  <TabsTrigger
                    value="tramites"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Trámites
                  </TabsTrigger>
                  <TabsTrigger
                    value="pagos"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Pagos
                  </TabsTrigger>
                  <TabsTrigger
                    value="perfil"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Perfil
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="inicio" className="mt-0">
                {/* Calendario de Próximos Pagos */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[#0A3B32] font-semibold">Calendario de Pagos</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0A3B32]" onClick={prevMonth}>
                        <ChevronLeft size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0A3B32]" onClick={nextMonth}>
                        <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                  <CalendarView month={currentMonth} events={calendarEvents} />
                </div>

                {/* Acciones rápidas */}
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-[#0A3B32] font-semibold mb-3">Acciones rápidas</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <AnimatePresence>
                      {quickActions.map((action, index) => (
                        <motion.div
                          key={action.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <ActionButton action={action} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Historial */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[#0A3B32] font-semibold">Historial</h2>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {historyItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <HistoryItem item={item} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tramites">
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileText className="w-16 h-16 mx-auto text-[#4885C5] mb-4" />
                    <h3 className="text-xl font-bold text-[#0A3B32] mb-2">Catálogo de Trámites</h3>
                    <p className="text-gray-500 mb-4">Explora todos los trámites disponibles</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="bg-[#D02030] hover:bg-[#FF4333]">Federales</Button>
                      <Button className="bg-[#24B649] hover:bg-[#24B649]/80">Estatales</Button>
                      <Button className="bg-[#4885C5] hover:bg-[#4885C5]/80">Municipales</Button>
                      <Button className="bg-[#CB4FCB] hover:bg-[#CB4FCB]/80">Privados</Button>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="pagos">
                <div className="p-4">
                  <h2 className="text-[#0A3B32] font-semibold mb-3">Métodos de Pago</h2>
                  <PaymentCardPanel />
                </div>
              </TabsContent>

              <TabsContent value="perfil">
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Avatar className="w-20 h-20 mx-auto mb-4 bg-[#0A3B32]">
                      <span className="text-xl font-bold">JD</span>
                    </Avatar>
                    <h3 className="text-xl font-bold text-[#0A3B32] mb-1">Juan Díaz</h3>
                    <p className="text-gray-500 mb-4">juan.diaz@ejemplo.com</p>
                    <div className="space-y-3">
                      <Button className="w-full bg-[#0A3B32] hover:bg-[#0A3B32]/80">Mi Perfil</Button>
                      <Button className="w-full bg-[#4885C5] hover:bg-[#4885C5]/80">Mis Documentos</Button>
                      <Button className="w-full bg-[#24B649] hover:bg-[#24B649]/80">Preferencias</Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#D02030] text-[#D02030] hover:bg-[#D02030]/10"
                      >
                        Cerrar Sesión
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
        
        <VoiceChatButton></VoiceChatButton>
      </div>

    </main>
  )
}
