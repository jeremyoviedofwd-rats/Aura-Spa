import React, { useState, useMemo } from 'react';
import './App.css';

// --- ICONOS SVG TOTALMENTE AUTÓNOMOS Y COMPATIBLES ---
const Icons = {
  Sparkles: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
  ),
  Calendar: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
  ),
  Clock: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
  CheckCircle: ({ size = 20, color = 'currentColor', style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  ),
  Phone: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  ),
  Mail: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  MapPin: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  Search: ({ size = 20, color = 'currentColor', className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  Star: ({ size = 20, fill = 'none', color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  Award: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
  ),
  ShieldCheck: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  Leaf: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A60.08 60.08 0 0 0 2 2a60.08 60.08 0 0 0 18 18 4 4 0 0 1-5.25-5.25C13.5 13.5 12 11 12 11s-2.5-1.5-3.75-2.75A4 4 0 0 1 11 20Z" /><path d="M2 2l10 10" /></svg>
  ),
  Heart: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
  ),
  ChevronDown: ({ size = 20, color = 'currentColor', style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><path d="m6 9 6 6 6-6" /></svg>
  ),
  X: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  ),
  Building2: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h12" /><path d="M6 14h12" /><path d="M6 10h12" /><path d="M6 6h12" /><path d="M10 22v-4" /><path d="M14 22v-4" /><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z" /></svg>
  ),
  ArrowRight: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  ),
  Menu: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
  ),
  Instagram: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
  ),
  Facebook: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  Globe: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
  ),
  Info: ({ size = 20, color = 'currentColor', style = {} }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
  )
};

// --- IMÁGENES LIBRES DE DERECHOS (UNSPLASH DE ALTA RESOLUCIÓN) ---
const IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
  aboutSpa: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80',
  corporateWellness: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  facialTreatment: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  massageAroma: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  hotStone: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
  hydrotherapy: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  organicCosmetic: 'https://images.unsplash.com/photo-1608248597263-00de46196f62?auto=format&fit=crop&w=800&q=80',
  bodyBalm: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
  spaDuo: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
  loungeTea: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  saunaSteam: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  blog1: 'https://images.unsplash.com/photo-1512290900673-700203f56641?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  user1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  user2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  user3: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80'
};

// --- DATOS DEL CATÁLOGO CORPORATIVO ---
const CATALOGO_ITEMS = [
  {
    id: 'f1',
    categoria: 'faciales',
    categoriaNombre: 'Faciales Avanzados',
    nombre: 'Facial Antioxidante de Papaya & Células Madre',
    badge: 'Más Vendido',
    badgeClass: 'badge-primary',
    duracion: '60 min',
    precio: 38000,
    rating: 4.9,
    reviewsCount: 128,
    imagen: IMAGES.facialTreatment,
    resumen: 'Exfoliación suave con enzimas naturales de papaya, colágeno marino y terapia LED anti-edad.',
    descripcionLarga: 'Tratamiento facial rejuvenecedor de alta penetración dermatológica. Remueve células muertas mediante exfoliación enzimática de papaya orgánica, infunde ácido hialurónico concentrado y estimula la producción de colágeno mediante luz fotónica LED.',
    beneficios: ['Restauración de firmeza y elasticidad', 'Reducción visible de poros', 'Luminosidad instantánea sin irritación'],
    ingredientes: ['Extracto de Carica Papaya', 'Colágeno Marino Hidrolizado', 'Ácido Hialurónico de Triple Peso Molecular']
  },
  {
    id: 'm1',
    categoria: 'masajes',
    categoriaNombre: 'Masajes Terapéuticos',
    nombre: 'Ritual Masaje Descontracturante Volcánico',
    badge: 'Popular',
    badgeClass: 'badge-gold',
    duracion: '75 min',
    precio: 45000,
    rating: 5.0,
    reviewsCount: 154,
    imagen: IMAGES.hotStone,
    resumen: 'Masaje profundo de espalda y cuello combinado con termoterapia de piedras volcánicas de basalto.',
    descripcionLarga: 'Diseñado especialmente para ejecutivos y personas con alto estrés muscular. Combina presiones firmes de tejido profundo con el calor terapéutico de piedras basálticas volcánicas que disuelven nudos muscular y alivian rigidez postural.',
    beneficios: ['Eliminación inmediata de nudos de estrés', 'Mejora profunda de la circulación sanguínea', 'Alivio de dolor lumbar y cervical'],
    ingredientes: ['Aceite Esencial Orgánico de Lavanda', 'Piedras de Basalto Natural', 'Esencia de Árnica']
  },
  {
    id: 'm2',
    categoria: 'masajes',
    categoriaNombre: 'Masajes Terapéuticos',
    nombre: 'Masaje Holístico de Aromaterapia Sensorial',
    badge: 'Recomendado',
    badgeClass: 'badge-secondary',
    duracion: '60 min',
    precio: 36000,
    rating: 4.8,
    reviewsCount: 92,
    imagen: IMAGES.massageAroma,
    resumen: 'Técnica sueca y shiatsu combinada con aceites puros de flores botánicas y eucalipto.',
    descripcionLarga: 'Un santuario de tranquilidad mental y física. A través de fricciones rítmicas y compresión de puntos energéticos, los aceites botánicos calientes inducen una relajación profunda del sistema nervioso central.',
    beneficios: ['Disminución del nivel de cortisol (estrés)', 'Inducción a un sueño reparador', 'Hidratación nutritiva para la piel'],
    ingredientes: ['Aceite de Sándalo & Bergamota', 'Base de Almendras Dulces', 'Flores de Manzanilla']
  },
  {
    id: 'h1',
    categoria: 'hidroterapia',
    categoriaNombre: 'Hidroterapia & Spa Suite',
    nombre: 'Experiencia Hidromasaje Térmico & Baño Herbal',
    badge: 'VIP Suite',
    badgeClass: 'badge-gold',
    duracion: '90 min',
    precio: 50000,
    rating: 4.9,
    reviewsCount: 67,
    imagen: IMAGES.hydrotherapy,
    resumen: 'Circuito de Jacuzzi térmico privado con sales minerales desintoxicantes y chorros de presión.',
    descripcionLarga: 'Sumerja su cuerpo en agua a temperatura óptima infundida con sales puras del Mar Muerto y hierbas curativas. Los chorros hidro-dinámicos masajean articulaciones y alivian retención de líquidos en piernas y rodillas.',
    beneficios: ['Desintoxicación de poros corporales', 'Relajación articular profunda', 'Sensación de ligereza e ingravidez'],
    ingredientes: ['Sales de Magnesio & Potasio', 'Flores de Caléndula Seca', 'Aceite de Romero']
  },
  {
    id: 'c1',
    categoria: 'cosmetica',
    categoriaNombre: 'Cosmética Orgánica',
    nombre: 'Elixir Facial Papaya Glow & Ácido Hialurónico (50ml)',
    badge: 'Producto Orgánico',
    badgeClass: 'badge-primary',
    duracion: 'Uso Domiciliario',
    precio: 28000,
    rating: 4.9,
    reviewsCount: 210,
    imagen: IMAGES.organicCosmetic,
    resumen: 'Serum concentrado botánico para uso diario. Nutrición intensa y barrera antioxidante.',
    descripcionLarga: 'Nuestra fórmula estrella para el hogar. Formulado en nuestro laboratorio botánico, este suero de textura ligera penetra instantáneamente sin dejar residuo graso, reteniendo la humedad de la piel durante todo el día.',
    beneficios: ['Protección contra radiación de pantallas', 'Efecto de piel porcelana y tersa', 'Apto para pieles sensibles'],
    ingredientes: ['Papaya Bio-Activa 100% Orgánica', 'Vitamina C Estabillizada', 'Ácido Hialurónico']
  },
  {
    id: 'c2',
    categoria: 'cosmetica',
    categoriaNombre: 'Cosmética Orgánica',
    nombre: 'Bálsamo Corporal Nutritivo Karité & Manteca de Cacao (250g)',
    badge: 'Eco-Certificado',
    badgeClass: 'badge-secondary',
    duracion: 'Uso Domiciliario',
    precio: 22000,
    rating: 4.7,
    reviewsCount: 118,
    imagen: IMAGES.bodyBalm,
    resumen: 'Manteca ultra hidratante para regeneración celular de codos, piernas y brazos.',
    descripcionLarga: 'Crema corporal rica que restaura el manto lipídico natural. Ideal para aplicar después de la ducha o de tratamientos de sol, brindando flexibilidad y un suave perfume botánico.',
    beneficios: ['Prevención de descamación', 'Suavidad sedosa al tacto', 'Libre de parabenos y sulfatos'],
    ingredientes: ['Manteca de Karité Orgánica', 'Aceite de Argán Prensado en Frío', 'Esencia de Cacao']
  },
  {
    id: 'p1',
    categoria: 'paquetes',
    categoriaNombre: 'Paquetes Dúo & Corporativos',
    nombre: 'Paquete Dúo Romance & Relax Spa VIP',
    badge: 'Experiencia Dúo',
    badgeClass: 'badge-gold',
    duracion: '120 min',
    precio: 89000,
    rating: 5.0,
    reviewsCount: 84,
    imagen: IMAGES.spaDuo,
    resumen: 'Sesión simultánea para dos personas en suite privada con masaje, Jacuzzi y bocadillos gourmet.',
    descripcionLarga: 'La experiencia romántica definitiva. Incluye masaje corporal de 60 minutos en cabina compartida con luz tenue de velas, 30 minutos de inmersión en Jacuzzi privado con copas de espumante y tabla de frutas frescas.',
    beneficios: ['Privacidad total en Suite Parejas', 'Bebidas e hidratación de cortesía', 'Experiencia personalizada'],
    ingredientes: ['Ambiente Climatizado Aromático', 'Aceites de Rosas & Vainilla', 'Atención por 2 Terapeutas']
  },
  {
    id: 'p2',
    categoria: 'paquetes',
    categoriaNombre: 'Paquetes Dúo & Corporativos',
    nombre: 'Programa "Corporate Wellness Day" (Grupal)',
    badge: 'Plan Empresas',
    badgeClass: 'badge-secondary',
    duracion: 'Medio Día (4h)',
    precio: 195000,
    rating: 5.0,
    reviewsCount: 42,
    imagen: IMAGES.corporateWellness,
    resumen: 'Jornada de salud ocupacional con masajes express, mindfulness y asesoría ergonométrica.',
    descripcionLarga: 'Especialmente estructurado para departamentos de Recursos Humanos y empresas conscientes de la salud laboral de sus colaboradores. Puede realizarse en nuestra sede corporativa o in-company en sus instalaciones.',
    beneficios: ['Reducción drástica del estrés laboral', 'Fortalecimiento de la cultura de equipo', 'Reporte de recomendaciones térmicas'],
    ingredientes: ['Sillas Ergonómicas Portátiles', 'Sesión de Respiración Guiada', 'Station de Té Herbal']
  }
];

// --- TESTIMONIOS Y CLIENTES CORPORATIVOS ---
const TESTIMONIOS = [
  {
    nombre: 'Dra. Elena Vargas',
    puesto: 'Directora de Talent Human en TechCorp',
    avatar: IMAGES.user1,
    rating: 5,
    comentario: 'Contratamos la Jornada Corporate Wellness para nuestro equipo ejecutivo de 25 personas. La organización fue impecable y el impacto en el clima laboral fue inmediato. Recomendado al 100% para empresas.'
  },
  {
    nombre: 'Gabriel Mendoza',
    puesto: 'Cliente VIP Suscriptor',
    avatar: IMAGES.user2,
    rating: 5,
    comentario: 'El Ritual Masaje Volcánico es una maravilla. Como atleta y desarrollador paso muchas horas frente al escritorio y Aura Spa ha sido clave para aliviar mi contractura de espalda. Instalaciones de 5 estrellas.'
  },
  {
    nombre: 'Camila Solano',
    puesto: 'Empresaria & Diseñadora',
    avatar: IMAGES.user3,
    rating: 5,
    comentario: 'Sus productos de cosmética de papaya son mis favoritos diarios. El Facial Antioxidante me dejó la piel con una luminosidad impresionante para un evento corporativo de mi empresa.'
  }
];

// --- PLANES DE MEMBRESÍA ---
const MEMBRESIA_PLANS = [
  {
    id: 'm-silver',
    nombre: 'Aura Essentiel',
    precio: '₡45,000',
    periodo: '/ mes',
    badge: 'Individual',
    featured: false,
    caracteristicas: [
      '1 Masaje o Facial de 60 min al mes',
      '15% de descuento en el Catálogo completo',
      'Acceso a circuito de té herbal de bienvenida',
      'Prioridad de reserva en fines de semana'
    ]
  },
  {
    id: 'm-gold',
    nombre: 'Aura Prestige VIP',
    precio: '₡85,000',
    periodo: '/ mes',
    badge: 'Recomendado',
    featured: true,
    caracteristicas: [
      '2 Tratamientos completos a elección al mes',
      'Acceso ILIMITADO al Jacuzzi y Sauna de Vapor',
      '25% de descuento en cosmética y productos',
      'Pase de acompañante gratis con 50% desc.',
      'Bebida espumante de cortesía en cada visita'
    ]
  },
  {
    id: 'm-corporate',
    nombre: 'Aura Corporate Club',
    precio: '₡160,000',
    periodo: '/ mes',
    badge: 'Empresas',
    featured: false,
    caracteristicas: [
      'Pase transferible para hasta 5 colaboradores',
      '4 Masajes express in-company mensuales',
      '30% de descuento en Paquetes de Eventos',
      'Facturación electrónica corporativa directa',
      'Ejecutivo de cuenta dedicado'
    ]
  }
];

// --- BLOG DE BIENESTAR ---
const BLOG_POSTS = [
  {
    id: 'b1',
    titulo: '5 Beneficios del Masaje Descontracturante para Trabajadores Remotos',
    meta: 'Salud Laboral • 4 min lectura',
    imagen: IMAGES.blog1,
    resumen: 'Descubra cómo contrarrestar los efectos negativos de la postura sedentaria y la fatiga muscular acumulada durante la jornada laboral.'
  },
  {
    id: 'b2',
    titulo: 'Guía Definitiva de Cuidados Faciales según tu Tipo de Piel',
    meta: 'Estética Avanzada • 6 min lectura',
    imagen: IMAGES.blog2,
    resumen: 'Aprenda a seleccionar los ingredientes botánicos adecuados como la papaya y el ácido hialurónico para maximizar la salud cutánea.'
  },
  {
    id: 'b3',
    titulo: 'Aromaterapia Orgánica: El Secreto para Reducir la Fatiga Mental',
    meta: 'Bienestar Holístico • 5 min lectura',
    imagen: IMAGES.blog3,
    resumen: 'Exploramos las propiedades terapéuticas de los aceites esenciales de eucalipto, sándalo y lavanda en el rendimiento profesional.'
  }
];

// --- PREGUNTAS FRECUENTES (FAQ) ---
const FAQS = [
  {
    pregunta: '¿Cómo puedo agendar una cita o cotizar un servicio corporativo?',
    respuesta: 'Puede reservar directamente mediante nuestro formulario en línea seleccionando el tratamiento del catálogo, o bien contactarnos por teléfono al +506 8888-8888 o email corporativo info@auraspa.cr para propuestas empresariales.'
  },
  {
    pregunta: '¿Cuáles son las políticas de cancelación y reprogramación?',
    respuesta: 'Aceptamos reprogramaciones sin costo adicional notificando con al menos 12 horas de anticipación. Para eventos corporativos de grupo, se requiere 48 horas de antelación.'
  },
  {
    pregunta: '¿Ofrecen facturación electrónica corporativa para empresas?',
    respuesta: 'Sí, emitimos facturas electrónicas autorizadas para deducción de gastos de salud y bienestar de colaboradores o eventos de teambuilding.'
  },
  {
    pregunta: '¿Los productos de cosmética son 100% orgánicos y libres de crueldad?',
    respuesta: 'Absolutamente. Toda nuestra línea cosmética es elaborada con principios activos vegetales botánicos, no probada en animales y dermatológicamente probada.'
  },
  {
    pregunta: '¿Puedo comprar Tarjetas de Regalo (Gift Cards) digitales?',
    respuesta: 'Sí, disponemos de Certificados de Regalo personalizados física y digitalmente ideales para cumpleaños, aniversarios o incentivos de empresa.'
  }
];

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [itemModal, setItemModal] = useState(null);
  const [servicioReservado, setServicioReservado] = useState('');
  const [tipoFormulario, setTipoFormulario] = useState('cita'); // 'cita' | 'empresa'
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    fecha: '',
    hora: '',
    mensaje: ''
  });
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState(null);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // Filtrado dinámico del catálogo
  const catalogoFiltrado = useMemo(() => {
    return CATALOGO_ITEMS.filter((item) => {
      const coincideCat = categoriaActiva === 'todos' || item.categoria === categoriaActiva;
      const coincideBusqueda =
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.resumen.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.categoriaNombre.toLowerCase().includes(busqueda.toLowerCase());
      return coincideCat && coincideBusqueda;
    });
  }, [categoriaActiva, busqueda]);

  const handleSeleccionarReserva = (nombreServicio) => {
    setServicioReservado(nombreServicio);
    setItemModal(null);
    const element = document.getElementById('agendar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setReservaConfirmada(true);
  };

  return (
    <div className="app-main-wrapper">
      {/* 1. TOP ANNOUNCEMENT BAR CORPORATIVA */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <span className="top-bar-item">
              <Icons.MapPin size={14} color="#d87a38" /> San José, Costa Rica — Av. Escazú Plaza Central
            </span>
            <span className="top-bar-item">
              <Icons.Clock size={14} color="#d87a38" /> Lun - Sáb: 8:00 AM - 8:00 PM | Dom: 9:00 AM - 5:00 PM
            </span>
          </div>
          <div className="top-bar-links">
            <span className="top-bar-item">
              <Icons.Phone size={14} color="#d87a38" /> +506 8888-8888
            </span>
            <a href="#corporativo" className="top-bar-link">
              Convenios Empresariales
            </a>
          </div>
        </div>
      </div>

      {/* 2. HEADER & NAVIGATION BAR STICKY */}
      <header className="navbar-sticky">
        <div className="container navbar-container">
          <a href="#" className="brand-logo">
            <div className="brand-icon-box">
              <Icons.Sparkles size={24} />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-title">AURA SPA</span>
              <span className="brand-tagline">WELLNESS & ENTERPRISE</span>
            </div>
          </a>

          <nav className="nav-menu">
            <a href="#inicio" className="nav-item-link">Inicio</a>
            <a href="#nosotros" className="nav-item-link">Nosotros</a>
            <a href="#catalogo" className="nav-item-link">Catálogo</a>
            <a href="#corporativo" className="nav-item-link">Empresas</a>
            <a href="#instalaciones" className="nav-item-link">Instalaciones</a>
            <a href="#membresias" className="nav-item-link">Membresías</a>
            <a href="#blog" className="nav-item-link">Blog</a>
            <a href="#faq" className="nav-item-link">FAQ</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="#agendar" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
              <Icons.Calendar size={18} /> Reservar Cita
            </a>

            <button
              className="mobile-toggle"
              onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
              aria-label="Abrir menú"
            >
              {menuMovilAbierto ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {menuMovilAbierto && (
          <div className="mobile-nav-drawer">
            <ul className="mobile-nav-menu">
              <li><a href="#inicio" onClick={() => setMenuMovilAbierto(false)}>Inicio</a></li>
              <li><a href="#nosotros" onClick={() => setMenuMovilAbierto(false)}>Nosotros</a></li>
              <li><a href="#catalogo" onClick={() => setMenuMovilAbierto(false)}>Catálogo de Servicios</a></li>
              <li><a href="#corporativo" onClick={() => setMenuMovilAbierto(false)}>Servicios Empresariales</a></li>
              <li><a href="#instalaciones" onClick={() => setMenuMovilAbierto(false)}>Instalaciones</a></li>
              <li><a href="#membresias" onClick={() => setMenuMovilAbierto(false)}>Membresías VIP</a></li>
              <li><a href="#faq" onClick={() => setMenuMovilAbierto(false)}>Preguntas Frecuentes</a></li>
            </ul>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION CORPORATIVO CON FOTO DE FONDO SIN COPYRIGHT */}
      <section
        id="inicio"
        className="hero-section"
        style={{ backgroundImage: `url(${IMAGES.heroBg})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Icons.Sparkles size={16} /> Empresa Lider en Salud Holística & Estética Avanzada
            </div>
            <h1 className="hero-title">
              Renueve su cuerpo y mente en un <span>Santuario de Lujo</span>
            </h1>
            <p className="hero-description">
              Unimos la biotecnología botánica costarricense, técnicas terapéuticas internacionales y programas corporativos de bienestar de clase mundial.
            </p>
            <div className="hero-actions">
              <a href="#catalogo" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                Explorar Catálogo <Icons.ArrowRight size={18} />
              </a>
              <a href="#corporativo" className="btn btn-outline-white" style={{ padding: '1rem 2rem' }}>
                <Icons.Building2 size={18} /> Servicios para Empresas
              </a>
            </div>

            {/* Métrica / Ticker Corporativo */}
            <div className="hero-stats-grid">
              <div>
                <div className="stat-card-number">12+</div>
                <div className="stat-card-label">Años de Excelencia</div>
              </div>
              <div>
                <div className="stat-card-number">25+</div>
                <div className="stat-card-label">Terapeutas Certificados</div>
              </div>
              <div>
                <div className="stat-card-number">18,000+</div>
                <div className="stat-card-label">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="stat-card-number">4.9 ★</div>
                <div className="stat-card-label">Calificación 5 Estrellas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOBRE NOSOTROS / FILOSOFÍA CORPORATIVA */}
      <section id="nosotros" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img src={IMAGES.aboutSpa} alt="Instalaciones Aura Spa" />
              <div className="about-floating-card">
                <Icons.ShieldCheck size={36} color="#d87a38" />
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#251c17' }}>Certificación Médica & Sanitaria</h4>
                  <p style={{ fontSize: '0.8rem', color: '#63564d' }}>Protocolos internacionales higiénicos garantizados</p>
                </div>
              </div>
            </div>

            <div>
              <span className="section-subtitle">NUESTRA IDENTIDAD CORPORATIVA</span>
              <h2 className="section-title">Ciencia Botánica y Confort de Clase Mundial</h2>
              <p className="section-description" style={{ marginBottom: '1.5rem' }}>
                Aura Spa & Wellness nació con el propósito de ofrecer un refugio empresarial donde la salud holística, el manejo del estrés laboral y la estética médica de vanguardia convergen armónicamente.
              </p>
              <p style={{ color: 'var(--color-body)', marginBottom: '2rem' }}>
                Trabajamos con extractos naturales 100% orgánicos, aceites esenciales de grado terapéutico y aparatología europea de última generación para garantizar resultados visibles desde la primera sesión.
              </p>

              <div className="about-pillars">
                <div className="pillar-item">
                  <div className="pillar-icon"><Icons.Leaf size={24} /></div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Principios Orgánicos</h4>
                  <p style={{ fontSize: '0.85rem' }}>Fórmulas libres de parabenos elaboradas con papaya y frutas tropicales.</p>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon"><Icons.Award size={24} /></div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Personal Altamente Calificado</h4>
                  <p style={{ fontSize: '0.85rem' }}>Cosmiatras y fisioterapeutas con certificaciones internacionales.</p>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon"><Icons.Heart size={24} /></div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Atención Personalizada</h4>
                  <p style={{ fontSize: '0.85rem' }}>Diagnóstico previo cutáneo y muscular adaptado a cada visitante.</p>
                </div>
                <div className="pillar-item">
                  <div className="pillar-icon"><Icons.Building2 size={24} /></div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Programas Empresariales</h4>
                  <p style={{ fontSize: '0.85rem' }}>Convenios de salud laboral y bienestar para ejecutivos y equipos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APARTADO DE CATÁLOGO INTERACTIVO (PRODUCTOS Y TRATAMIENTOS) */}
      <section id="catalogo" className="section-padding catalog-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">CATÁLOGO EMPRESARIAL DE SERVICIOS Y PRODUCTOS</span>
            <h2 className="section-title">Tratamientos, Experiencias & Cosmética</h2>
            <p className="section-description">
              Explore nuestro menú interactivo. Filtre por categoría o utilice el buscador rápido para descubrir nuestras opciones de relajación, estética y bienestar.
            </p>
          </div>

          {/* Controles de Búsqueda y Filtrado */}
          <div className="catalog-controls">
            <div className="catalog-search-box">
              <Icons.Search className="catalog-search-icon" size={20} />
              <input
                type="text"
                className="catalog-search-input"
                placeholder="Buscar servicio (ej: facial, masaje, hidroterapia, producto)..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="catalog-tabs">
              <button
                className={`catalog-tab-btn ${categoriaActiva === 'todos' ? 'active' : ''}`}
                onClick={() => setCategoriaActiva('todos')}
              >
                Todos los Apartados ({CATALOGO_ITEMS.length})
              </button>
              <button
                className={`catalog-tab-btn ${categoriaActiva === 'faciales' ? 'active' : ''}`}
                onClick={() => setCategoriaActiva('faciales')}
              >
                Faciales Avanzados
              </button>
              <button
                className={`catalog-tab-btn ${categoriaActiva === 'masajes' ? 'active' : ''}`}
                onClick={() => setCategoriaActiva('masajes')}
              >
                Masajes Terapéuticos
              </button>
              <button
                className={`catalog-tab-btn ${categoriaActiva === 'hidroterapia' ? 'active' : ''}`}
                onClick={() => setCategoriaActiva('hidroterapia')}
              >
                Hidroterapia & Spa Suite
              </button>
              <button
                className={`catalog-tab-btn ${categoriaActiva === 'cosmetica' ? 'active' : ''}`}
                onClick={() => setCategoriaActiva('cosmetica')}
              >
                Cosmética Orgánica
              </button>
              <button
                className={`catalog-tab-btn ${categoriaActiva === 'paquetes' ? 'active' : ''}`}
                onClick={() => setCategoriaActiva('paquetes')}
              >
                Paquetes Empresariales & Dúo
              </button>
            </div>
          </div>

          {/* Grid de Tarjetas del Catálogo */}
          {catalogoFiltrado.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: '16px' }}>
              <Icons.Info size={48} color="#d87a38" style={{ marginBottom: '1rem' }} />
              <h3>No se encontraron resultados en el catálogo</h3>
              <p style={{ marginTop: '0.5rem' }}>Pruebe buscando otro término o seleccione la categoría "Todos".</p>
              <button
                className="btn btn-outline"
                style={{ marginTop: '1.5rem' }}
                onClick={() => { setBusqueda(''); setCategoriaActiva('todos'); }}
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="catalog-grid">
              {catalogoFiltrado.map((item) => (
                <div key={item.id} className="catalog-card">
                  <div className="catalog-card-image-wrapper">
                    <img src={item.imagen} alt={item.nombre} className="catalog-card-image" />
                    <span className={`badge ${item.badgeClass} catalog-card-badge`}>
                      {item.badge}
                    </span>
                    <div className="catalog-card-rating">
                      <Icons.Star size={14} fill="#ffd700" color="#ffd700" /> {item.rating} ({item.reviewsCount})
                    </div>
                  </div>

                  <div className="catalog-card-body">
                    <h3 className="catalog-card-title">{item.nombre}</h3>
                    <p className="catalog-card-desc">{item.resumen}</p>

                    <div className="catalog-card-meta">
                      <span className="catalog-duration">
                        <Icons.Clock size={16} color="#d87a38" /> {item.duracion}
                      </span>
                      <span className="catalog-price">
                        ₡{item.precio.toLocaleString()}
                      </span>
                    </div>

                    <div className="catalog-card-actions">
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.65rem 0.8rem', fontSize: '0.88rem' }}
                        onClick={() => setItemModal(item)}
                      >
                        Ver Detalles
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.65rem 0.8rem', fontSize: '0.88rem' }}
                        onClick={() => handleSeleccionarReserva(item.nombre)}
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL INTERACTIVO DE DETALLE DEL CATÁLOGO */}
      {itemModal && (
        <div className="modal-overlay" onClick={() => setItemModal(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setItemModal(null)}>
              <Icons.X size={20} />
            </button>

            <div className="modal-banner">
              <img src={itemModal.imagen} alt={itemModal.nombre} />
            </div>

            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className={`badge ${itemModal.badgeClass}`}>{itemModal.categoriaNombre}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  ₡{itemModal.precio.toLocaleString()}
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#251c17' }}>{itemModal.nombre}</h2>
              <p style={{ color: 'var(--color-body)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {itemModal.descripcionLarga}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: '#faf6f0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#2a443b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Icons.CheckCircle size={18} color="#2a443b" /> Beneficios Clave
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#63564d' }}>
                    {itemModal.beneficios.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: '#faf6f0', padding: '1.25rem', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#d87a38', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Icons.Leaf size={18} color="#d87a38" /> Ingredientes & Protocolo
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#63564d' }}>
                    {itemModal.ingredientes.map((ing, i) => (
                      <li key={i}>• {ing}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-outline" onClick={() => setItemModal(null)}>
                  Cerrar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSeleccionarReserva(itemModal.nombre)}
                >
                  <Icons.Calendar size={18} /> Agendar este Tratamiento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECCIÓN WELLNESS CORPORATIVO PARA EMPRESAS */}
      <section id="corporativo" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="corporate-banner-card">
            <div className="corporate-banner-content">
              <span className="badge badge-gold" style={{ width: 'fit-content', marginBottom: '1rem' }}>
                <Icons.Building2 size={14} /> Soluciones para Organizaciones
              </span>
              <h3>Programas Corporativos de Salud Laboral & Bienestar</h3>
              <p style={{ color: '#d1dfd9', lineHeight: 1.6 }}>
                Aumente la productividad y reduzca el estrés de sus colaboradores. Diseñamos convenios a medida, jornadas in-company de ergonomía y paquetes de regalo corporativo para ejecutivos.
              </p>

              <ul className="corporate-features-list">
                <li><Icons.CheckCircle size={18} color="#c99d42" /> Masajes express ergonómicos in-company</li>
                <li><Icons.CheckCircle size={18} color="#c99d42" /> Facturación electrónica autorizada para empresas</li>
                <li><Icons.CheckCircle size={18} color="#c99d42" /> Tarjetas de regalo digitales para metas corporativas</li>
                <li><Icons.CheckCircle size={18} color="#c99d42" /> Descuentos del 30% en paquetes de teambuilding</li>
              </ul>

              <div style={{ marginTop: '1rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ backgroundColor: 'var(--color-gold)', color: '#251c17', fontWeight: 700 }}
                  onClick={() => {
                    setTipoFormulario('empresa');
                    const element = document.getElementById('agendar');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Solicitar Cotización Empresarial <Icons.ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div
              className="corporate-banner-image"
              style={{ backgroundImage: `url(${IMAGES.corporateWellness})` }}
            ></div>
          </div>
        </div>
      </section>

      {/* 7. GALERÍA DE INSTALACIONES & ESPACIOS VIP */}
      <section id="instalaciones" className="section-padding" style={{ backgroundColor: '#faf6f0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">AMBIENTE DE LUJO & TRANQUILIDAD</span>
            <h2 className="section-title">Nuestras Instalaciones Corporativas</h2>
            <p className="section-description">
              Espacios insonorizados diseñados minuciosamente para brindar confort absoluto, privacidad y una inmersión sensorial inolvidable.
            </p>
          </div>

          <div className="facilities-grid">
            <div className="facility-card">
              <img src={IMAGES.heroBg} alt="Suite de Masajes" />
              <div className="facility-overlay">
                <h4 className="facility-title">Suites de Masaje Insonorizadas</h4>
                <span className="facility-subtitle">Cabinas climatizadas con aromaterapia</span>
              </div>
            </div>

            <div className="facility-card">
              <img src={IMAGES.hydrotherapy} alt="Jacuzzi Térmico" />
              <div className="facility-overlay">
                <h4 className="facility-title">Circuito de Hidromasaje</h4>
                <span className="facility-subtitle">Jacuzzi térmico y chorros a presión</span>
              </div>
            </div>

            <div className="facility-card">
              <img src={IMAGES.loungeTea} alt="Lounge de Té" />
              <div className="facility-overlay">
                <h4 className="facility-title">Lounge de Té & Relajación</h4>
                <span className="facility-subtitle">Infusiones herbales orgánicas ilimitadas</span>
              </div>
            </div>

            <div className="facility-card">
              <img src={IMAGES.spaDuo} alt="Suite Parejas" />
              <div className="facility-overlay">
                <h4 className="facility-title">Suite Parejas & VIP</h4>
                <span className="facility-subtitle">Atención en duo con hidroterapia privada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECCIÓN DE MEMBRESÍAS & PLANES */}
      <section id="membresias" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">CLUB PRIVADO AURA VIP</span>
            <h2 className="section-title">Planes de Membresía & Suscripción</h2>
            <p className="section-description">
              Disfrute de beneficios continuos de salud y relajación con nuestros esquemas de suscripción individual y corporativa.
            </p>
          </div>

          <div className="membership-grid">
            {MEMBRESIA_PLANS.map((plan) => (
              <div key={plan.id} className={`membership-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && (
                  <span className="membership-popular-tag">Más Popular</span>
                )}
                <span className="badge badge-primary" style={{ width: 'fit-content' }}>{plan.badge}</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.75rem' }}>{plan.nombre}</h3>

                <div className="membership-price-box">
                  <span className="membership-price">{plan.precio}</span>
                  <span className="membership-period">{plan.periodo}</span>
                </div>

                <ul className="membership-features">
                  {plan.caracteristicas.map((car, idx) => (
                    <li key={idx}>
                      <Icons.CheckCircle size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                      <span>{car}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%' }}
                  onClick={() => {
                    handleSeleccionarReserva(`Membresía ${plan.nombre}`);
                  }}
                >
                  Afiliarse a {plan.nombre}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIOS Y RESEÑAS */}
      <section className="section-padding" style={{ backgroundColor: '#f7f2eb' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">OPINIONES VERIFICADAS</span>
            <h2 className="section-title">Lo que Dicen Nuestros Clientes</h2>
            <p className="section-description">
              La satisfacción de nuestros visitantes ejecutivos y corporativos avala nuestro compromiso con la excelencia.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIOS.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Icons.Star key={i} size={16} fill="#ffd700" color="#ffd700" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.comentario}"</p>

                <div className="testimonial-user">
                  <img src={t.avatar} alt={t.nombre} className="testimonial-avatar" />
                  <div>
                    <h4 className="testimonial-user-name">{t.nombre}</h4>
                    <span className="testimonial-user-role">{t.puesto}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BLOG & CONSEJOS DE BIENESTAR */}
      <section id="blog" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">ARTÍCULOS & CONSEJOS</span>
            <h2 className="section-title">Blog de Salud & Bienestar</h2>
            <p className="section-description">
              Artículos educativos escritos por nuestros especialistas en cosmiatría y terapias holísticas.
            </p>
          </div>

          <div className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="blog-card">
                <img src={post.imagen} alt={post.titulo} className="blog-card-image" />
                <div className="blog-card-body">
                  <span className="blog-meta">{post.meta}</span>
                  <h3 className="blog-title">{post.titulo}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-body)' }}>{post.resumen}</p>
                  <a href="#blog" style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Leer Artículo <Icons.ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="section-padding" style={{ backgroundColor: '#faf6f0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">DUDAS COMUNES</span>
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-description">
              Respuestas rápidas sobre cómo preparar su visita, condiciones de reservas y servicios corporativos.
            </p>
          </div>

          <div className="faq-container">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setFaqAbierta(faqAbierta === idx ? null : idx)}
                >
                  <span>{faq.pregunta}</span>
                  <Icons.ChevronDown
                    size={20}
                    color="var(--color-primary)"
                    style={{
                      transform: faqAbierta === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }}
                  />
                </button>
                {faqAbierta === idx && (
                  <div className="faq-answer">
                    <p>{faq.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. AGENDAR CITA & CONTACTO EMPRESARIAL */}
      <section id="agendar" className="section-padding booking-section">
        <div className="container">
          <div className="booking-wrapper">
            <div className="booking-info-box">
              <span className="section-subtitle">RESERVAS EN LÍNEA & CONSULTAS</span>
              <h2 className="section-title">Agende su Cita o Consulte para su Empresa</h2>
              <p className="section-description" style={{ marginBottom: '2rem' }}>
                Complete el formulario a la derecha. Nuestro equipo de recepción le enviará la confirmación inmediata por WhatsApp o Correo Electrónico.
              </p>

              <div className="contact-detail-card">
                <div className="contact-detail-icon"><Icons.Phone size={22} /></div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#251c17' }}>Atención Telefónica Directa</h4>
                  <p style={{ fontSize: '0.9rem' }}>+506 8888-8888 / +506 2222-1111</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-detail-icon"><Icons.Mail size={22} /></div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#251c17' }}>Correo Corporativo</h4>
                  <p style={{ fontSize: '0.9rem' }}>reservas@auraspa.cr | empresas@auraspa.cr</p>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-detail-icon"><Icons.MapPin size={22} /></div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#251c17' }}>Ubicación Principal</h4>
                  <p style={{ fontSize: '0.9rem' }}>Av. Escazú, Edificio Plaza Central, Piso 3, San José.</p>
                </div>
              </div>
            </div>

            {/* FORMULARIO DE RESERVA */}
            <div className="booking-form-card">
              <div className="form-toggle-tabs">
                <button
                  className={`form-toggle-btn ${tipoFormulario === 'cita' ? 'active' : ''}`}
                  onClick={() => setTipoFormulario('cita')}
                >
                  Reserva de Cita Personal
                </button>
                <button
                  className={`form-toggle-btn ${tipoFormulario === 'empresa' ? 'active' : ''}`}
                  onClick={() => setTipoFormulario('empresa')}
                >
                  Consulta Corporativa
                </button>
              </div>

              {reservaConfirmada ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <Icons.CheckCircle size={36} />
                  </div>
                  <h3 style={{ fontSize: '1.6rem', color: '#251c17', marginBottom: '0.5rem' }}>¡Solicitud Recibida con Éxito!</h3>
                  <p style={{ color: 'var(--color-body)', marginBottom: '1.5rem' }}>
                    Gracias <strong>{formData.nombre}</strong>. Hemos registrado su solicitud para <strong>{servicioReservado || 'Consulta General'}</strong>. Nuestro equipo de concierges se pondrá en contacto al número <strong>{formData.telefono}</strong> para confirmar su espacio.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setReservaConfirmada(false);
                      setServicioReservado('');
                      setFormData({ nombre: '', email: '', telefono: '', empresa: '', fecha: '', hora: '', mensaje: '' });
                    }}
                  >
                    Realizar Otra Solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm}>
                  <div className="form-group-full">
                    <label className="form-label">Tratamiento o Servicio Seleccionado</label>
                    <input
                      type="text"
                      className="form-input"
                      value={servicioReservado || 'Tratamiento a elección al llegar / Consulta'}
                      readOnly
                      style={{ backgroundColor: '#f3ece6', fontWeight: 'bold' }}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group-full">
                      <label className="form-label">Nombre Completo *</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        placeholder="Ej. María Elena Rodríguez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>

                    <div className="form-group-full">
                      <label className="form-label">Teléfono de Contacto *</label>
                      <input
                        type="tel"
                        className="form-input"
                        required
                        placeholder="Ej. +506 8888-8888"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group-full">
                      <label className="form-label">Correo Electrónico *</label>
                      <input
                        type="email"
                        className="form-input"
                        required
                        placeholder="ejemplo@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    {tipoFormulario === 'empresa' ? (
                      <div className="form-group-full">
                        <label className="form-label">Nombre de la Empresa</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Ej. TechCorp S.A."
                          value={formData.empresa}
                          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div className="form-group-full">
                        <label className="form-label">Fecha Preferida</label>
                        <input
                          type="date"
                          className="form-input"
                          required
                          value={formData.fecha}
                          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  {tipoFormulario === 'cita' && (
                    <div className="form-group-full">
                      <label className="form-label">Hora Deseada</label>
                      <input
                        type="time"
                        className="form-input"
                        required
                        value={formData.hora}
                        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="form-group-full">
                    <label className="form-label">Notas Adicionales o Requerimientos</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Escriba aquí si requiere atención especial, alergias o detalles para su grupo..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    {tipoFormulario === 'cita' ? 'Confirmar Reserva de Cita' : 'Enviar Solicitud Corporativa'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. FOOTER EMPRESARIAL MULTICOLUMNA */}
      <footer className="footer-corporate">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
                <div className="brand-icon-box">
                  <Icons.Sparkles size={24} />
                </div>
                <div className="brand-text-wrapper">
                  <span className="brand-title" style={{ color: '#ffffff' }}>AURA SPA</span>
                  <span className="brand-tagline">WELLNESS & ENTERPRISE</span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#a89a8f', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Plataforma líder en servicios holísticos de relajación, estética dermatológica avanzada y programas corporativos de bienestar en Costa Rica.
              </p>
              <div style={{ display: 'flex', gap: '1rem', color: '#ffffff' }}>
                <a href="#" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Icons.Instagram size={18} /></a>
                <a href="#" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Icons.Facebook size={18} /></a>
                <a href="#" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><Icons.Globe size={18} /></a>
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">Apartados Rápido</h4>
              <ul className="footer-links-list">
                <li><a href="#inicio">Inicio Corporativo</a></li>
                <li><a href="#nosotros">Sobre la Empresa</a></li>
                <li><a href="#catalogo">Catálogo Interactivo</a></li>
                <li><a href="#corporativo">Servicios para Empresas</a></li>
                <li><a href="#instalaciones">Nuestras Instalaciones</a></li>
                <li><a href="#membresias">Membresías VIP</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Catálogo</h4>
              <ul className="footer-links-list">
                <li><a href="#catalogo" onClick={() => setCategoriaActiva('faciales')}>Faciales Avanzados</a></li>
                <li><a href="#catalogo" onClick={() => setCategoriaActiva('masajes')}>Masajes Terapéuticos</a></li>
                <li><a href="#catalogo" onClick={() => setCategoriaActiva('hidroterapia')}>Hidroterapia & Jacuzzi</a></li>
                <li><a href="#catalogo" onClick={() => setCategoriaActiva('cosmetica')}>Cosmética Orgánica</a></li>
                <li><a href="#catalogo" onClick={() => setCategoriaActiva('paquetes')}>Paquetes Dúo & Empresa</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Boletín Corporativo</h4>
              <p style={{ fontSize: '0.88rem', color: '#a89a8f', marginBottom: '1rem' }}>
                Suscríbase para recibir promociones exclusivas, invitaciones a eventos VIP y consejos de salud laboral.
              </p>
              <div className="footer-newsletter-box">
                <input
                  type="email"
                  placeholder="Su correo electrónico..."
                  className="footer-newsletter-input"
                />
                <button className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
                  Unirse
                </button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Aura Spa & Wellness. Todos los derechos reservados.</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Privacidad</a>
              <a href="#">Certificación de Calidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}