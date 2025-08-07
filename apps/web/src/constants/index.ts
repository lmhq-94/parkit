// Application-wide constants

// Contact information
export const CONTACT_INFO = {
  phone: '(+506) 6216-4040',
  email: 'info@parkit.com',
  address: '20501 Atenas, Alajuela, Costa Rica',
  whatsapp: '50662164040',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/parkit',
  twitter: 'https://twitter.com/parkit',
  instagram: 'https://instagram.com/parkit',
  linkedin: 'https://linkedin.com/company/parkit',
} as const;

// Navigation links
export const NAVIGATION_LINKS = [
  { label: 'Soluciones', id: 'soluciones' },
  { label: 'Cómo Funciona', id: 'como-funciona' },
  { label: 'Testimonios', id: 'testimonios' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contacto', id: 'contacto' },
] as const;

// Footer links
export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Soluciones', href: '#soluciones' },
    { label: 'Cómo Funciona', href: '#como-funciona' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '/privacy' },
    { label: 'Términos de Servicio', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
  support: [
    { label: 'Centro de Ayuda', href: '/help' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Soporte Técnico', href: '/support' },
  ],
} as const;

// Hero section stats
export const HERO_STATS = [
  { value: '500+', label: 'Espacios Activos', icon: '🚗' },
  { value: '24/7', label: 'Monitoreo', icon: '⏰' },
  { value: '99.9%', label: 'Uptime', icon: '⚡' },
] as const;

// Features list
export const FEATURES = [
  {
    title: 'Gestión Inteligente',
    description: 'Control total de espacios de parqueo con tecnología avanzada',
    icon: '🎯',
  },
  {
    title: 'Pagos Digitales',
    description: 'Sistema de pagos integrado y seguro',
    icon: '💳',
  },
  {
    title: 'Tecnología QR',
    description: 'Acceso rápido y seguro con códigos QR',
    icon: '📱',
  },
  {
    title: 'Reportes en Tiempo Real',
    description: 'Análisis detallado de uso y ocupación',
    icon: '📊',
  },
] as const;

// How it works steps
export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Registro',
    description: 'Registra tu parqueo en la plataforma',
    icon: '📝',
  },
  {
    step: '02',
    title: 'Configuración',
    description: 'Configura espacios y tarifas',
    icon: '⚙️',
  },
  {
    step: '03',
    title: 'Operación',
    description: 'Comienza a gestionar automáticamente',
    icon: '🚀',
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'María González',
    role: 'Gerente de Operaciones',
    company: 'Centro Comercial Plaza Mayor',
    content: 'ParkIt revolucionó nuestra gestión de parqueos. Ahora tenemos control total y nuestros clientes están más satisfechos.',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director General',
    company: 'Estacionamiento Central',
    content: 'La implementación fue sencilla y los resultados superaron nuestras expectativas. Altamente recomendado.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Propietaria',
    company: 'Parking Express',
    content: 'Desde que usamos ParkIt, nuestros ingresos aumentaron un 30% y la gestión es mucho más eficiente.',
    rating: 5,
  },
] as const;

// FAQ items
export const FAQ_ITEMS = [
  {
    question: '¿Cómo funciona el sistema de pagos?',
    answer: 'Nuestro sistema integra múltiples métodos de pago incluyendo tarjetas, transferencias y pagos móviles. Todos los pagos son procesados de forma segura y en tiempo real.',
  },
  {
    question: '¿Qué tipo de soporte técnico ofrecen?',
    answer: 'Proporcionamos soporte técnico 24/7 a través de múltiples canales: teléfono, email, chat en vivo y asistencia remota cuando sea necesario.',
  },
  {
    question: '¿Es compatible con mi sistema actual?',
    answer: 'ParkIt es compatible con la mayoría de sistemas existentes. Nuestro equipo de implementación evalúa tu infraestructura actual y asegura una integración sin problemas.',
  },
  {
    question: '¿Qué tan seguro es el sistema?',
    answer: 'Implementamos las más altas medidas de seguridad incluyendo encriptación de datos, autenticación de dos factores y cumplimiento con estándares internacionales de seguridad.',
  },
  {
    question: '¿Puedo personalizar el sistema según mis necesidades?',
    answer: 'Sí, nuestro sistema es altamente personalizable. Puedes configurar tarifas, horarios, espacios reservados y más según tus requerimientos específicos.',
  },
  {
    question: '¿Cuánto tiempo toma la implementación?',
    answer: 'La implementación típica toma entre 2-4 semanas dependiendo de la complejidad de tu operación. Nuestro equipo te guía durante todo el proceso.',
  },
] as const;

// Theme configuration
export const THEME_CONFIG = {
  light: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#111827',
    textSecondary: '#6b7280',
  },
  dark: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#0f0f23',
    surface: '#1a1a2e',
    text: '#ffffff',
    textSecondary: '#94a3b8',
  },
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  drawer: 1200,
  modal: 1300,
  tooltip: 1500,
  snackbar: 1400,
} as const;

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  },
  parking: {
    list: '/api/parking',
    create: '/api/parking',
    update: '/api/parking/:id',
    delete: '/api/parking/:id',
  },
  reservations: {
    list: '/api/reservations',
    create: '/api/reservations',
    update: '/api/reservations/:id',
    cancel: '/api/reservations/:id/cancel',
  },
  payments: {
    process: '/api/payments/process',
    history: '/api/payments/history',
    refund: '/api/payments/:id/refund',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'parkit-theme',
  language: 'parkit-language',
  user: 'parkit-user',
  token: 'parkit-token',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  network: 'Error de conexión. Por favor, verifica tu internet.',
  unauthorized: 'No tienes permisos para realizar esta acción.',
  notFound: 'El recurso solicitado no fue encontrado.',
  serverError: 'Error del servidor. Por favor, intenta más tarde.',
  validation: 'Por favor, verifica los datos ingresados.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  saved: 'Cambios guardados exitosamente.',
  created: 'Elemento creado exitosamente.',
  updated: 'Elemento actualizado exitosamente.',
  deleted: 'Elemento eliminado exitosamente.',
} as const; 