import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  FileDown, 
  UserCheck, 
  Award, 
  ArrowRight, 
  Send, 
  X, 
  ChevronDown,
  Globe,
  Briefcase,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALICE_KNOWLEDGE } from './knowledge.ts';
import Markdown from 'react-markdown';
import { jsPDF } from 'jspdf';

// --- Utility for WhatsApp Link ---
const openWhatsApp = (msg: string) => {
  const phone = "50259686584"; // Guatemala prefix
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
};

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="VisaExpert Logo" className="w-10 h-10 object-contain rounded-full border border-gray-100 shadow-sm" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('.placeholder-logo')?.classList.remove('hidden'); }} />
        <div className="placeholder-logo hidden w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg italic font-serif">VE</div>
        <span className="font-bold text-xl tracking-tight text-slate-800">VisaExpert <span className="text-blue-600">Guatemala</span></span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
        <a href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</a>
        <a href="#proceso" className="hover:text-blue-600 transition-colors">Proceso</a>
        <a href="#testimonios" className="hover:text-blue-600 transition-colors">Testimonios</a>
        <a href="#contacto" className="hover:text-blue-600 transition-colors">Contacto</a>
      </div>
      <button 
        onClick={() => openWhatsApp("Hola, me gustaría iniciar mi trámite de visa.")}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-all shadow-md active:scale-95"
      >
        <MessageCircle size={18} />
        WhatsApp
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100"
        >
          <Award size={16} /> 98% de Eficiencia en Resultados
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1]"
        >
          Tu Sueño Americano o Canadiense Empieza Aquí.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 max-w-xl leading-relaxed"
        >
          Asesoría experta desde la primera entrevista hasta la entrega de tu visa. Ubicados estratégicamente frente a la Embajada de EE. UU. en zona 16.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <button 
            onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
          >
            Iniciar Trámite <ArrowRight size={20} />
          </button>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <span className="text-xl font-bold text-slate-800">Q1,500</span>
            <span className="text-sm">Cobro único por servicio</span>
          </div>
        </motion.div>
      </div>
      <div className="flex-1 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3] bg-slate-100"
        >
          <img 
            src="/banner.png" 
            alt="Asesoría de Visas" 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000" }}
          />
        </motion.div>
        {/* Banner flotante */}
        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Globe size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Destinos</p>
              <p className="font-bold text-slate-800">EE. UU. & Canadá</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const Services = () => (
  <section id="servicios" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Servicios que brindamos</h2>
        <p className="text-slate-600 italic">"Te acompañamos en cada paso para que tu único plan sea viajar."</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={UserCheck}
          title="Asesoría personalizada"
          description="Evaluamos tu perfil y te indicamos la mejor estrategia para obtener tu visa según tu propósito de viaje."
        />
        <FeatureCard 
          icon={Briefcase}
          title="Visas de Trabajo"
          description="Expertos en perfiles laborales. Te ayudamos a organizar toda la documentación que los cónsules buscan."
        />
        <FeatureCard 
          icon={CheckCircle2}
          title="Preparación de Entrevista"
          description="Realizamos simulacros de entrevista para que vayas con total confianza y sepas qué responder con honestidad."
        />
      </div>
    </div>
  </section>
);

const BotAlice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(() => {
    try {
      const saved = localStorage.getItem('alice_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading chat history", e);
    }
    return [
      { role: 'bot', content: '¡Hola! Soy Alice, tu asistente virtual. Estoy aquí para guiarte en tu proceso de visa. ¿En qué puedo ayudarte hoy?' }
    ];
  });
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('alice_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const clearChat = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar el historial de chat?')) {
      const initialMsg = [{ role: 'bot', content: '¡Hola! Soy Alice, tu asistente virtual. Estoy aquí para guiarte en tu proceso de visa. ¿En qué puedo ayudarte hoy?' }];
      setMessages(initialMsg);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');

    setTimeout(() => {
      let response = "Hmm, no estoy segura de eso. Pero puedes preguntarme sobre el proceso, costos, nuestra ubicación o cómo pagar. Si prefieres hablar con un humano, escribe 'asesor'.";
      
      if (userMsg.includes('costo') || userMsg.includes('precio') || userMsg.includes('cobro') || userMsg.includes('cuanto')) {
        response = ALICE_KNOWLEDGE.costs + "\n\n¿Deseas que un asesor te contacte para explicarte el desglose?";
      } else if (userMsg.includes('proceso') || userMsg.includes('pasos') || userMsg.includes('como funciona')) {
        response = ALICE_KNOWLEDGE.process;
      } else if (userMsg.includes('donde') || userMsg.includes('ubicacion') || userMsg.includes('direccion') || userMsg.includes('oficina')) {
        response = ALICE_KNOWLEDGE.location;
      } else if (userMsg.includes('pago') || userMsg.includes('pagar') || userMsg.includes('banco') || userMsg.includes('metodo')) {
        response = ALICE_KNOWLEDGE.payment_methods + "\n\n" + ALICE_KNOWLEDGE.costs;
      } else if (userMsg.includes('horario') || userMsg.includes('abierto') || userMsg.includes('cuando')) {
        response = `Nuestros horarios son: ${ALICE_KNOWLEDGE.hours}`;
      } else if (userMsg.includes('negada') || userMsg.includes('rechazo') || userMsg.includes('fallo')) {
        response = ALICE_KNOWLEDGE.denial_help;
      } else if (userMsg.includes('visa') && (userMsg.includes('eeuu') || userMsg.includes('usa') || userMsg.includes('canada'))) {
        response = `Manejamos trámites para EE. UU. (DS-160) y Canadá (ETA/Visas). Tenemos una tasa de éxito del 98%. ¿Para qué país te interesa viajar?`;
      } else if (userMsg.includes('h2a') || (userMsg.includes('trabajo') && userMsg.includes('agricola'))) {
        response = ALICE_KNOWLEDGE.h2a;
      } else if (userMsg.includes('h2b') || (userMsg.includes('trabajo') && !userMsg.includes('agricola'))) {
        response = ALICE_KNOWLEDGE.h2b;
      } else if (userMsg.includes('b1') || userMsg.includes('b2') || userMsg.includes('turismo') || userMsg.includes('negocio') || userMsg.includes('paseo')) {
        response = ALICE_KNOWLEDGE.b1b2;
      } else if (userMsg.includes('asesor') || userMsg.includes('humano') || userMsg.includes('whatsapp') || userMsg.includes('contacto')) {
        response = `¡Claro! Puedes escribir directamente a nuestro WhatsApp oficial: [${ALICE_KNOWLEDGE.whatsapp}](https://wa.me/502${ALICE_KNOWLEDGE.whatsapp}) o dejar tus datos en el formulario de abajo para agendar una cita.`;
      }

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header Bot */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden bg-slate-200">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Alice Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Alice</h4>
                  <p className="text-[10px] opacity-80">Asistente Experta</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={clearChat}
                  title="Borrar chat"
                  className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                  <ChevronDown size={18} className="rotate-180" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors"><X size={20}/></button>
              </div>
            </div>
            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 shadow-sm rounded-tl-none border border-gray-100'}`}>
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              ))}
            </div>
            {/* Input Chat */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu duda aquí..."
                className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group overflow-hidden"
      >
        <div className="absolute inset-0 transition-opacity">
           <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Alice" className="w-full h-full object-cover" />
        </div>
        <MessageCircle size={30} className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white w-full h-full p-4" />
      </button>
    </div>
  );
};

const Process = () => (
  <section id="proceso" className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">Nuestra Ruta al Éxito</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { step: "01", title: "Asesoría Inicial", desc: "Revisamos tu caso a fondo." },
          { step: "02", title: "Formularios", desc: "Lllenado profesional sin errores." },
          { step: "03", title: "Simulacro", desc: "Te preparamos para el cónsul." },
          { step: "04", title: "Visa en Mano", desc: "Disfruta de tu viaje seguro." }
        ].map((item, i) => (
          <div key={i} className="relative p-6 bg-white rounded-3xl border border-gray-100 text-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{item.step}</span>
            <h4 className="font-bold text-slate-800 mt-4 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonios" className="py-20 bg-blue-600 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold">Clientes que ya están en su destino</h2>
          <p className="text-blue-100 text-lg">Hemos ayudado a cientos de guatemaltecos a cruzar fronteras legalmente y con seguridad.</p>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => <Award key={i} className="text-yellow-400 fill-yellow-400" size={20} />)}
            <span className="ml-2 font-medium">98% Satisfacción</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
            <p className="italic mb-4">"Pensé que por no tener experiencia laboral formal me negarían la visa, pero en VisaExpert me asesoraron sobre qué documentos llevar. ¡Hoy estoy trabajando en Canadá!"</p>
            <p className="font-bold">- Juan Carlos P., Guatemala</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
            <p className="italic mb-4">"Lo que más me gustó fue el simulacro de entrevista. Fui muy tranquilo a la embajada y me aprobaron la visa de turista de inmediato."</p>
            <p className="font-bold">- María Elena G., Antigua</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FormSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    localidad: '',
    tipoTrabajo: '',
    educacion: 'Sin experiencia',
    telefono: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.nombre.length < 5) newErrors.nombre = "Por favor, ingresa tu nombre completo.";
    if (!/^\d{8}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = "El teléfono debe tener 8 dígitos (Ej: 59686584).";
    }
    if (!formData.localidad) newErrors.localidad = "Indícanos de dónde nos contactas.";
    if (!formData.tipoTrabajo) newErrors.tipoTrabajo = "Selecciona una categoría de trabajo.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const msg = `SOLICITUD DE ASESORÍA\n\nNombre: ${formData.nombre}\nLocalidad: ${formData.localidad}\nTipo de Trabajo: ${formData.tipoTrabajo}\nEducación: ${formData.educacion}\nTeléfono: ${formData.telefono}\n\nMe gustaría agendar una cita con un asesor.`;
    openWhatsApp(msg);
  };

  return (
    <section id="formulario" className="py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Contáctanos y agenda tu cita</h2>
          <p className="text-slate-600 mb-8">Completa el formulario para enviarnos tu información básica. Te contactaremos para coordinar una cita presencial o virtual.</p>
          <div className="space-y-6">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold">Dirección</p>
                  <p className="text-slate-500 text-sm">Blvd. Austriaco, zona 16. Frente a la Embajada EE. UU.</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-bold">WhatsApp</p>
                  <p className="text-slate-500 text-sm">+502 5968 6584</p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                className={`w-full bg-slate-50 border ${errors.nombre ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 outline-none`}
                placeholder="Ej. Pedro Pérez"
                value={formData.nombre}
                onChange={e => {
                  setFormData({...formData, nombre: e.target.value});
                  if (errors.nombre) setErrors({...errors, nombre: ''});
                }}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Localidad</label>
                <input 
                  type="text" 
                  className={`w-full bg-slate-50 border ${errors.localidad ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 outline-none`}
                  placeholder="Ej. Quetzaltenango"
                  value={formData.localidad}
                  onChange={e => {
                    setFormData({...formData, localidad: e.target.value});
                    if (errors.localidad) setErrors({...errors, localidad: ''});
                  }}
                />
                {errors.localidad && <p className="text-red-500 text-xs mt-1">{errors.localidad}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Teléfono</label>
                <input 
                  type="text" 
                  className={`w-full bg-slate-50 border ${errors.telefono ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 outline-none`}
                  placeholder="5968 6584"
                  value={formData.telefono}
                  onChange={e => {
                    setFormData({...formData, telefono: e.target.value});
                    if (errors.telefono) setErrors({...errors, telefono: ''});
                  }}
                />
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Trabajo a Solicitar</label>
              <select 
                className={`w-full bg-slate-50 border ${errors.tipoTrabajo ? 'border-red-500' : 'border-slate-200'} rounded-xl px-4 py-3 outline-none`}
                value={formData.tipoTrabajo}
                onChange={e => {
                  setFormData({...formData, tipoTrabajo: e.target.value});
                  if (errors.tipoTrabajo) setErrors({...errors, tipoTrabajo: ''});
                }}
              >
                <option value="">Selecciona una categoría...</option>
                <option value="Agricultura">Agricultura / Campo (H2A)</option>
                <option value="Construccion">Construcción / Carpintería</option>
                <option value="Hoteleria">Hotelería / Limpieza (H2B)</option>
                <option value="Restaurantes">Restaurantes / Cocina</option>
                <option value="Mecanica">Mecánica / Soldadura</option>
                <option value="Jardineria">Jardinería / Paisajismo</option>
                <option value="Otros">Otros (Especificar en entrevista)</option>
              </select>
              {errors.tipoTrabajo && <p className="text-red-500 text-xs mt-1">{errors.tipoTrabajo}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nivel Educativo / Experiencia</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.educacion}
                onChange={e => setFormData({...formData, educacion: e.target.value})}
              >
                <option>Sin experiencia</option>
                <option>Primaria / Diversificado</option>
                <option>Técnico</option>
                <option>Universitario</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              Enviar por WhatsApp <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Downloads = () => {
  const generatePDF = (title: string, items: string[], header: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // --- Background Decor ---
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header - Professional blue bar
    doc.setFillColor(30, 41, 59); // slate-900
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // Add Logo or Fallback
    try {
      doc.addImage("/logo.png", "PNG", 20, 10, 25, 25);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("VisaExpert", 50, 22);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Guatemala", 50, 29);
    } catch (e) {
      // Fallback
      doc.setFillColor(59, 130, 246);
      doc.circle(28, 22, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("VE", 28, 24, { align: "center" });
      doc.setFontSize(22);
      doc.text("VisaExpert", 45, 22);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Guatemala", 45, 29);
    }
    
    // Badge "98% Éxito"
    doc.setFillColor(34, 197, 94); // green-500
    doc.roundedRect(pageWidth - 65, 15, 45, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("98% EFECTIVIDAD", pageWidth - 42.5, 23, { align: "center" });

    // --- Content Section ---
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(header.toUpperCase(), 20, 65);

    // Subtle line
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.8);
    doc.line(20, 70, 70, 70);

    // Description text
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("Documento oficial para clientes de VisaExpert Guatemala. Blvd. Austriaco, Zona 16.", 20, 78);

    // List Logic
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    
    let yPos = 90;
    items.forEach((item) => {
      if (item.startsWith("**")) {
        // Section Title
        yPos += 5;
        doc.setFillColor(226, 232, 240); // slate-200
        doc.rect(20, yPos - 6, pageWidth - 40, 9, 'F');
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(item.replace(/\*\*/g, ""), 25, yPos);
        yPos += 12;
      } else {
        // List Item
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        
        // Custom Bullet
        doc.setFillColor(59, 130, 246); // blue-500
        doc.circle(24, yPos - 1.5, 0.8, 'F');

        const splitText = doc.splitTextToSize(item, pageWidth - 50);
        doc.text(splitText, 30, yPos);
        yPos += (splitText.length * 7) + 2;
      }
      
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 30;
      }
    });

    // --- Professional "Seal" at bottom right ---
    const sealX = pageWidth - 60;
    const sealY = pageHeight - 65;
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.5);
    doc.circle(sealX + 20, sealY + 20, 15, 'S');
    doc.setFontSize(7);
    doc.text("CERTIFICADO", sealX + 20, sealY + 15, { align: "center" });
    doc.setFontSize(9);
    doc.text("VISAEXPERT", sealX + 20, sealY + 22, { align: "center" });
    doc.setFontSize(7);
    doc.text("GUATEMALA", sealX + 20, sealY + 28, { align: "center" });

    // --- Footer ---
    doc.setFillColor(30, 41, 59);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Ubicación: Blvd. Austriaco frente a Embajada EE.UU, Z.16", 20, pageHeight - 9);
    doc.text("WhatsApp: +502 5968 6584 | www.visaexpert.com.gt", pageWidth - 20, pageHeight - 9, { align: "right" });

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
  };

  const requisitosItems = [
    "**DOCUMENTOS DE IDENTIDAD**",
    "Pasaporte vigente con un mínimo de 6 meses de validez restante.",
    "DPI (Documento Personal de Identificación) original y copia legible.",
    "**SOPORTE ECONÓMICO**",
    "Constancia laboral reciente en hoja membretada (puesto, sueldo y antigüedad).",
    "Estados de cuenta bancarios de los últimos 3 meses, firmados y sellados por el banco.",
    "Títulos de propiedad o registros de vehículos a su nombre (si posee).",
    "**VÍNCULOS Y ARRAIGO**",
    "Certificados de nacimiento o matrimonio (para solicitudes familiares).",
    "Información detallada de familiares en el extranjero (si aplica).",
    "**PASOS FINALES**",
    "Pago de honorarios por asesoría profesional (Q1,500).",
    "Comprobante de pago de aranceles consulares (según el tipo de visa)."
  ];

  const formulariosItems = [
    "**VISA ESTADOS UNIDOS**",
    "Formulario DS-160: Es el documento electrónico principal. Requiere foto digital específica.",
    "Cita Consular: Programación en el sistema oficial de la embajada.",
    "**VISA CANADÁ**",
    "Formulario de Información Familiar (IMM5645).",
    "Cuestionario de Historial de Viajes y ArriveCAN.",
    "**ASISTENCIA VISAEXPERT**",
    "Nosotros nos encargamos del llenado técnico de cada uno de estos documentos para garantizar que no existan errores gramaticales o de fondo."
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Documentación y Recursos</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => generatePDF("Guia_Formularios_Visa", formulariosItems, "Guía de Formularios Oficiales")}
            className="bg-white/10 hover:bg-white/20 px-8 py-6 rounded-3xl border border-white/20 flex flex-col items-center gap-4 transition-all group"
          >
            <FileDown size={32} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="font-bold">Formularios Oficiales</p>
              <p className="text-xs text-slate-400">PDF - DS-160 / ArriveCAN</p>
            </div>
          </button>
          <button 
            onClick={() => generatePDF("Requisitos_Legales_VisaExpert", requisitosItems, "Listado de Requisitos Legales")}
            className="bg-white/10 hover:bg-white/20 px-8 py-6 rounded-3xl border border-white/20 flex flex-col items-center gap-4 transition-all group"
          >
            <FileDown size={32} className="text-green-400 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="font-bold">Listado de Requisitos</p>
              <p className="text-xs text-slate-400">PDF - Documentación Necesaria</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

const VideoGallery = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Videos Informativos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map(i => (
          <div key={i} className="aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-lg relative group cursor-pointer border border-slate-300">
             <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold p-8 text-center bg-slate-100/50">
                [Aquí puedes agregar tus videos informativos de TikTok o YouTube]
             </div>
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <PlayCircle size={64} className="text-white drop-shadow-lg" />
             </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-8 text-slate-500 text-sm">Sugerencia: "Mitos sobre la visa" y "Recorrido por nuestras oficinas".</p>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <VideoGallery />
        <Testimonials />
        <Downloads />
        <FormSection />
      </main>
      
      <footer className="py-12 border-t border-gray-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="VisaExpert" className="w-8 h-8 object-contain rounded-full border border-gray-100" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.querySelector('.placeholder-footer-logo')?.classList.remove('hidden'); }} />
            <div className="placeholder-footer-logo hidden w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm italic font-serif">VE</div>
            <span className="font-bold text-slate-800">VisaExpert Guatemala</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 VisaExpert | Asesoría Profesional. 98% Eficiencia.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">TikTok</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Facebook</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>

      <BotAlice />
    </div>
  );
}
