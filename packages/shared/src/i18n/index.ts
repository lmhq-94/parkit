import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traducciones en español
const es = {
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    confirm: 'Confirmar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    refresh: 'Actualizar',
    close: 'Cerrar',
    open: 'Abrir',
    yes: 'Sí',
    no: 'No',
    ok: 'OK',
    theme: 'Tema',
    language: 'Idioma',
    themes: {
      default: 'Predeterminado',
      light: 'Claro',
      dark: 'Oscuro'
    }
  },
  landing: {
    hero: {
      title: 'El Futuro del',
      subtitle: 'Parking Inteligente',
      description: 'Revoluciona tu negocio con tecnología de vanguardia. La plataforma más inteligente del mercado.',
      startNow: 'Comenzar Ahora',
      viewDemo: 'Ver Demo',
      uptime: 'Uptime Garantizado',
      companies: 'Empresas Confían',
      support: 'Soporte Premium'
    },
    navigation: {
      solutions: 'Soluciones',
      pricing: 'Precios',
      contact: 'Contacto',
      proAccess: 'Acceso Pro'
    },
    features: {
      title: '¿Por qué elegir ParkIt?',
      subtitle: 'Transforma tu negocio de parking con la solución más completa del mercado. Aumenta tus ingresos, reduce costos y mejora la experiencia de tus clientes.',
      benefits: {
        title: 'BENEFICIOS PARA TU NEGOCIO',
        keyBenefits: 'Beneficios Clave',
        revenue: {
          title: 'Aumenta tus Ingresos',
          description: 'Maximiza la ocupación y optimiza precios',
          longDescription: 'Sistema de precios dinámicos que se adapta a la demanda. Reservas anticipadas que garantizan ingresos.',
          benefits: ['+30% Ingresos', 'Precios Dinámicos', 'Reservas Anticipadas'],
          metric: '+30% promedio'
        },
        automation: {
          title: 'Automatiza tu Operación',
          description: 'Reduce costos operativos y personal',
          longDescription: 'Elimina la necesidad de personal manual. Sistema automático de entrada/salida con QR codes.',
          benefits: ['-50% Costos Operativos', 'Operación 24/7', 'Control Remoto'],
          metric: '-50% costos'
        },
        experience: {
          title: 'Mejora la Experiencia',
          description: 'Clientes satisfechos que regresan',
          longDescription: 'Reserva fácil desde el móvil, acceso rápido con QR. Notificaciones automáticas y soporte 24/7.',
          benefits: ['Reserva Móvil', 'Acceso QR Rápido', 'Soporte 24/7'],
          metric: '95% satisfacción'
        },
        analytics: {
          title: 'Toma Decisiones Inteligentes',
          description: 'Datos en tiempo real para crecer',
          longDescription: 'Dashboard con métricas de ocupación, patrones de uso y análisis de rentabilidad.',
          benefits: ['Datos Tiempo Real', 'Reportes Automáticos', 'Análisis Predictivo'],
          metric: 'Decisiones basadas en datos'
        },
        security: {
          title: 'Seguridad Total',
          description: 'Protege tu negocio y clientes',
          longDescription: 'Control de acceso por roles, registro completo de entradas/salidas y auditoría total.',
          benefits: ['Control de Acceso', 'Registro Completo', 'Auditoría Total'],
          metric: '100% seguro'
        },
        support: {
          title: 'Soporte Premium',
          description: 'Estamos aquí para tu éxito',
          longDescription: 'Implementación rápida en 24 horas, capacitación completa y soporte técnico 24/7.',
          benefits: ['Implementación 24h', 'Capacitación Incluida', 'Soporte 24/7'],
          metric: 'Implementación 24h'
        }
      }
    },
    stats: {
      uptime: {
        value: '99.9%',
        title: 'Uptime Garantizado',
        description: 'Disponibilidad continua con redundancia global'
      },
      companies: {
        value: '500+',
        title: 'Empresas Confían',
        description: 'Desde startups hasta Fortune 500'
      },
      support: {
        value: '24/7',
        title: 'Soporte Premium',
        description: 'Asistencia técnica disponible siempre'
      },
      countries: {
        value: '50+',
        title: 'Países',
        description: 'Presencia global con servidores locales'
      }
    },
    cta: {
      title: '¿Listo para el Futuro?',
      subtitle: 'Únete a las empresas más innovadoras que ya están transformando su negocio',
      button: 'Comenzar Gratis'
    },
    footer: {
      copyright: '© 2024 ParkIt. Todos los derechos reservados.',
      tagline: 'Smart Parking Solutions',
      quickLinks: 'Enlaces Rápidos',
      newsletter: {
        title: 'Mantente Informado',
        description: 'Recibe las últimas noticias y actualizaciones',
        placeholder: 'Tu email',
        subscribe: 'Suscribir'
      },
      legal: {
        privacy: 'Política de Privacidad',
        terms: 'Términos de Servicio',
        cookies: 'Cookies'
      },
      address: 'Dirección'
    },
    login: {
      title: 'Acceso Pro',
      email: 'Email',
      password: 'Contraseña',
      login: 'Ingresar',
      demoInfo: 'Usa cualquier email y contraseña para acceder al demo'
    },
    pricing: {
      title: 'Planes y Precios',
      subtitle: 'Elige el plan que mejor se adapte a las necesidades de tu empresa',
      mostPopular: 'MÁS POPULAR',
      starter: {
        title: 'Starter',
        description: 'Perfecto para pequeñas empresas',
        features: [
          'Hasta 50 espacios de parking',
          'Soporte por email',
          'Reportes básicos',
          'Integración QR',
          'App móvil incluida'
        ]
      },
      professional: {
        title: 'Professional',
        description: 'Ideal para empresas medianas',
        features: [
          'Hasta 200 espacios de parking',
          'Soporte prioritario 24/7',
          'Analytics avanzado',
          'API personalizada',
          'Integración IoT',
          'Dashboard personalizado'
        ]
      },
      enterprise: {
        title: 'Enterprise',
        description: 'Para grandes corporaciones',
        features: [
          'Espacios ilimitados',
          'Soporte dedicado',
          'IA predictiva',
          'Integración blockchain',
          'White-label',
          'Implementación on-premise'
        ]
      },
      startNow: 'Comenzar Ahora',
      selectPlan: 'Seleccionar Plan'
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes preguntas? Nuestro equipo está aquí para ayudarte',
      info: {
        title: 'Información de Contacto',
        description: 'Nuestro equipo de expertos está disponible 24/7 para brindarte el mejor soporte técnico y comercial.',
        phone: '+1 (555) 123-4567',
        whatsapp: '+1 (555) 123-4567',
        email: 'info@parkit.com',
        address: '123 Innovation Street, Tech City, TC 12345',
        hours: 'Lun - Vie: 9:00 AM - 6:00 PM',
        support: 'Soporte 24/7 disponible'
      },
      channels: {
        title: 'Canales de Contacto',
        whatsapp: 'WhatsApp',
        phone: 'Teléfono',
        email: 'Email',
        chat: 'Chat en vivo',
        schedule: 'Agendar Demo'
      },
      form: {
        title: 'Envíanos un Mensaje',
        name: 'Nombre',
        email: 'Email',
        company: 'Empresa',
        message: 'Mensaje',
        sendMessage: 'Enviar Mensaje',
        placeholder: 'Cuéntanos sobre tu proyecto...'
      }
    }
  },
  auth: {
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    register: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    resetPassword: 'Restablecer Contraseña',
    phone: 'Teléfono',
    verificationCode: 'Código de Verificación',
    sendCode: 'Enviar Código',
    resendCode: 'Reenviar Código',
    loginWithGoogle: 'Continuar con Google',
    loginWithFacebook: 'Continuar con Facebook',
    loginWithApple: 'Continuar con Apple',
    loginWithPhone: 'Continuar con Teléfono'
  },
  parking: {
    title: 'Parqueos',
    available: 'Disponible',
    occupied: 'Ocupado',
    reserved: 'Reservado',
    maintenance: 'Mantenimiento',
    free: 'Gratis',
    paid: 'De Pago',
    hourly: 'Por Hora',
    daily: 'Por Día',
    monthly: 'Por Mes',
    location: 'Ubicación',
    capacity: 'Capacidad',
    price: 'Precio',
    duration: 'Duración',
    startTime: 'Hora de Inicio',
    endTime: 'Hora de Fin',
    totalPrice: 'Precio Total',
    status: 'Estado',
    type: 'Tipo',
    floor: 'Piso',
    section: 'Sección',
    spot: 'Espacio',
    zone: 'Zona'
  },
  reservation: {
    title: 'Reservas',
    newReservation: 'Nueva Reserva',
    editReservation: 'Editar Reserva',
    cancelReservation: 'Cancelar Reserva',
    confirmReservation: 'Confirmar Reserva',
    reservationDetails: 'Detalles de la Reserva',
    reservationHistory: 'Historial de Reservas',
    upcomingReservations: 'Próximas Reservas',
    pastReservations: 'Reservas Pasadas',
    reservationDate: 'Fecha de Reserva',
    reservationTime: 'Hora de Reserva',
    vehicle: 'Vehículo',
    licensePlate: 'Placa',
    make: 'Marca',
    model: 'Modelo',
    color: 'Color',
    year: 'Año'
  },
  dashboard: {
    title: 'Panel Principal',
    overview: 'Resumen',
    statistics: 'Estadísticas',
    recentActivity: 'Actividad Reciente',
    quickActions: 'Acciones Rápidas',
    notifications: 'Notificaciones',
    settings: 'Configuración',
    profile: 'Perfil',
    help: 'Ayuda',
    support: 'Soporte',
    about: 'Acerca de',
    version: 'Versión',
    totalParkings: 'Total de Parqueos',
    availableSpots: 'Espacios Disponibles',
    totalReservations: 'Total de Reservas',
    activeReservations: 'Reservas Activas',
    revenue: 'Ingresos',
    occupancy: 'Ocupación',
    utilization: 'Utilización',
    adminPanel: 'Panel de Administración',
    adminDescription: 'Gestiona tu sistema de parking desde aquí',
    availableSpaces: 'Espacios Disponibles',
    activeVehicles: 'Vehiculos Activos',
    todayRevenue: 'Ingresos Hoy',
    qrScans: 'Escaneos QR'
  },
  notifications: {
    title: 'Notificaciones',
    all: 'Todas',
    unread: 'No Leídas',
    read: 'Leídas',
    markAsRead: 'Marcar como Leída',
    markAllAsRead: 'Marcar Todas como Leídas',
    delete: 'Eliminar',
    deleteAll: 'Eliminar Todas',
    noNotifications: 'No hay notificaciones',
    parking: 'Parqueo',
    payment: 'Pago',
    reservation: 'Reserva',
    system: 'Sistema',
    user: 'Usuario'
  },
  payment: {
    title: 'Pagos',
    paymentMethod: 'Método de Pago',
    creditCard: 'Tarjeta de Crédito',
    debitCard: 'Tarjeta de Débito',
    cash: 'Efectivo',
    transfer: 'Transferencia',
    paypal: 'PayPal',
    stripe: 'Stripe',
    amount: 'Monto',
    currency: 'Moneda',
    tax: 'Impuesto',
    total: 'Total',
    paid: 'Pagado',
    pending: 'Pendiente',
    failed: 'Fallido',
    refunded: 'Reembolsado',
    transactionId: 'ID de Transacción',
    paymentDate: 'Fecha de Pago',
    receipt: 'Recibo',
    invoice: 'Factura'
  }
};

// Traducciones en inglés
const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    theme: 'Theme',
    language: 'Language',
    themes: {
      default: 'Default',
      light: 'Light',
      dark: 'Dark'
    }
  },
  landing: {
    hero: {
      title: 'The Future of',
      subtitle: 'Smart Parking',
      description: 'Revolutionize your business with cutting-edge technology. The most intelligent platform in the market.',
      startNow: 'Start Now',
      viewDemo: 'View Demo',
      uptime: 'Guaranteed Uptime',
      companies: 'Companies Trust',
      support: 'Premium Support'
    },
    navigation: {
      solutions: 'Solutions',
      pricing: 'Pricing',
      contact: 'Contact',
      proAccess: 'Pro Access'
    },
    features: {
      title: 'Why Choose ParkIt?',
      subtitle: 'Transform your parking business with the most complete solution in the market. Increase your revenue, reduce costs and improve your customers experience.',
      benefits: {
        title: 'BENEFITS FOR YOUR BUSINESS',
        keyBenefits: 'Key Benefits',
        revenue: {
          title: 'Increase Your Revenue',
          description: 'Maximize occupancy and optimize pricing',
          longDescription: 'Dynamic pricing system that adapts to demand. Advance reservations that guarantee income.',
          benefits: ['+30% Revenue', 'Dynamic Pricing', 'Advance Reservations'],
          metric: '+30% average'
        },
        automation: {
          title: 'Automate Your Operation',
          description: 'Reduce operational costs and staff',
          longDescription: 'Eliminates the need for manual staff. Automatic entry/exit system with QR codes.',
          benefits: ['-50% Operational Costs', '24/7 Operation', 'Remote Control'],
          metric: '-50% costs'
        },
        experience: {
          title: 'Improve Experience',
          description: 'Satisfied customers who return',
          longDescription: 'Easy mobile reservation, quick QR access. Automatic notifications and 24/7 support.',
          benefits: ['Mobile Reservation', 'Quick QR Access', '24/7 Support'],
          metric: '95% satisfaction'
        },
        analytics: {
          title: 'Make Smart Decisions',
          description: 'Real-time data to grow',
          longDescription: 'Dashboard with occupancy metrics, usage patterns and profitability analysis.',
          benefits: ['Real-time Data', 'Automatic Reports', 'Predictive Analysis'],
          metric: 'Data-driven decisions'
        },
        security: {
          title: 'Total Security',
          description: 'Protect your business and customers',
          longDescription: 'Role-based access control, complete entry/exit records and total audit.',
          benefits: ['Access Control', 'Complete Records', 'Total Audit'],
          metric: '100% secure'
        },
        support: {
          title: 'Premium Support',
          description: 'We are here for your success',
          longDescription: 'Quick implementation in 24 hours, complete training and 24/7 technical support.',
          benefits: ['24h Implementation', 'Training Included', '24/7 Support'],
          metric: '24h implementation'
        }
      }
    },
    stats: {
      uptime: {
        value: '99.9%',
        title: 'Guaranteed Uptime',
        description: 'Continuous availability with global redundancy'
      },
      companies: {
        value: '500+',
        title: 'Companies Trust',
        description: 'From startups to Fortune 500'
      },
      support: {
        value: '24/7',
        title: 'Premium Support',
        description: 'Technical assistance always available'
      },
      countries: {
        value: '50+',
        title: 'Countries',
        description: 'Global presence with local servers'
      }
    },
    cta: {
      title: 'Ready for the Future?',
      subtitle: 'Join the most innovative companies that are already transforming their business',
      button: 'Start Free'
    },
    footer: {
      copyright: '© 2024 ParkIt. All rights reserved.',
      tagline: 'Smart Parking Solutions',
      quickLinks: 'Quick Links',
      newsletter: {
        title: 'Stay Informed',
        description: 'Receive the latest news and updates',
        placeholder: 'Your email',
        subscribe: 'Subscribe'
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookies'
      },
      address: 'Address'
    },
    login: {
      title: 'Pro Access',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      demoInfo: 'Use any email and password to access the demo'
    },
    pricing: {
      title: 'Plans & Pricing',
      subtitle: 'Choose the plan that best fits your company needs',
      mostPopular: 'MOST POPULAR',
      starter: {
        title: 'Starter',
        description: 'Perfect for small businesses',
        features: [
          'Up to 50 parking spaces',
          'Email support',
          'Basic reports',
          'QR integration',
          'Mobile app included'
        ]
      },
      professional: {
        title: 'Professional',
        description: 'Ideal for medium-sized companies',
        features: [
          'Up to 200 parking spaces',
          'Priority 24/7 support',
          'Advanced analytics',
          'Custom API',
          'IoT integration',
          'Custom dashboard'
        ]
      },
      enterprise: {
        title: 'Enterprise',
        description: 'For large corporations',
        features: [
          'Unlimited spaces',
          'Dedicated support',
          'Predictive AI',
          'Blockchain integration',
          'White-label',
          'On-premise implementation'
        ]
      },
      startNow: 'Start Now',
      selectPlan: 'Select Plan'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Have questions? Our team is here to help you',
      info: {
        title: 'Contact Information',
        description: 'Our team of experts is available 24/7 to provide you with the best technical and commercial support.',
        phone: '+1 (555) 123-4567',
        whatsapp: '+1 (555) 123-4567',
        email: 'info@parkit.com',
        address: '123 Innovation Street, Tech City, TC 12345',
        hours: 'Mon - Fri: 9:00 AM - 6:00 PM',
        support: '24/7 Support Available'
      },
      channels: {
        title: 'Contact Channels',
        whatsapp: 'WhatsApp',
        phone: 'Phone',
        email: 'Email',
        chat: 'Live Chat',
        schedule: 'Schedule Demo'
      },
      form: {
        title: 'Send us a Message',
        name: 'Name',
        email: 'Email',
        company: 'Company',
        message: 'Message',
        sendMessage: 'Send Message',
        placeholder: 'Tell us about your project...'
      }
    }
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    phone: 'Phone',
    verificationCode: 'Verification Code',
    sendCode: 'Send Code',
    resendCode: 'Resend Code',
    loginWithGoogle: 'Continue with Google',
    loginWithFacebook: 'Continue with Facebook',
    loginWithApple: 'Continue with Apple',
    loginWithPhone: 'Continue with Phone'
  },
  parking: {
    title: 'Parkings',
    available: 'Available',
    occupied: 'Occupied',
    reserved: 'Reserved',
    maintenance: 'Maintenance',
    free: 'Free',
    paid: 'Paid',
    hourly: 'Hourly',
    daily: 'Daily',
    monthly: 'Monthly',
    location: 'Location',
    capacity: 'Capacity',
    price: 'Price',
    duration: 'Duration',
    startTime: 'Start Time',
    endTime: 'End Time',
    totalPrice: 'Total Price',
    status: 'Status',
    type: 'Type',
    floor: 'Floor',
    section: 'Section',
    spot: 'Spot',
    zone: 'Zone'
  },
  reservation: {
    title: 'Reservations',
    newReservation: 'New Reservation',
    editReservation: 'Edit Reservation',
    cancelReservation: 'Cancel Reservation',
    confirmReservation: 'Confirm Reservation',
    reservationDetails: 'Reservation Details',
    reservationHistory: 'Reservation History',
    upcomingReservations: 'Upcoming Reservations',
    pastReservations: 'Past Reservations',
    reservationDate: 'Reservation Date',
    reservationTime: 'Reservation Time',
    vehicle: 'Vehicle',
    licensePlate: 'License Plate',
    make: 'Make',
    model: 'Model',
    color: 'Color',
    year: 'Year'
  },
  dashboard: {
    title: 'Dashboard',
    overview: 'Overview',
    statistics: 'Statistics',
    recentActivity: 'Recent Activity',
    quickActions: 'Quick Actions',
    notifications: 'Notifications',
    settings: 'Settings',
    profile: 'Profile',
    help: 'Help',
    support: 'Support',
    about: 'About',
    version: 'Version',
    totalParkings: 'Total Parkings',
    availableSpots: 'Available Spots',
    totalReservations: 'Total Reservations',
    activeReservations: 'Active Reservations',
    revenue: 'Revenue',
    occupancy: 'Occupancy',
    utilization: 'Utilization',
    adminPanel: 'Administration Panel',
    adminDescription: 'Manage your parking system from here',
    availableSpaces: 'Available Spaces',
    activeVehicles: 'Active Vehicles',
    todayRevenue: 'Today Revenue',
    qrScans: 'QR Scans'
  },
  notifications: {
    title: 'Notifications',
    all: 'All',
    unread: 'Unread',
    read: 'Read',
    markAsRead: 'Mark as Read',
    markAllAsRead: 'Mark All as Read',
    delete: 'Delete',
    deleteAll: 'Delete All',
    noNotifications: 'No notifications',
    parking: 'Parking',
    payment: 'Payment',
    reservation: 'Reservation',
    system: 'System',
    user: 'User'
  },
  payment: {
    title: 'Payments',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    debitCard: 'Debit Card',
    cash: 'Cash',
    transfer: 'Transfer',
    paypal: 'PayPal',
    stripe: 'Stripe',
    amount: 'Amount',
    currency: 'Currency',
    tax: 'Tax',
    total: 'Total',
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
    refunded: 'Refunded',
    transactionId: 'Transaction ID',
    paymentDate: 'Payment Date',
    receipt: 'Receipt',
    invoice: 'Invoice'
  }
};

// Configuración de i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 