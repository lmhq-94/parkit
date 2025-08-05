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
      title: 'Tecnología de Vanguardia',
      subtitle: 'Integramos las últimas tecnologías para crear la experiencia de parking más inteligente del mercado',
      ai: {
        title: 'IA Predictiva',
        description: 'Algoritmos de machine learning que predicen patrones de ocupación y optimizan la gestión'
      },
      cloud: {
        title: 'Cloud Nativo',
        description: 'Arquitectura cloud-first para máxima escalabilidad y disponibilidad global'
      },
      iot: {
        title: 'IoT Avanzado',
        description: 'Sensores inteligentes que monitorean en tiempo real cada espacio de parking'
      },
      security: {
        title: 'Seguridad Blockchain',
        description: 'Transacciones seguras con tecnología blockchain y encriptación de nivel militar'
      },
      analytics: {
        title: 'Analytics Avanzado',
        description: 'Análisis predictivo y reportes en tiempo real con dashboards interactivos'
      },
      qr: {
        title: 'QR Dinámico',
        description: 'Códigos QR que se regeneran automáticamente para máxima seguridad'
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
      copyright: '© 2024 ParkIt. Todos los derechos reservados.'
    },
    login: {
      title: 'Acceso Pro',
      email: 'Email',
      password: 'Contraseña',
      login: 'Ingresar',
      demoInfo: 'Usa cualquier email y contraseña para acceder al demo'
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
      title: 'Cutting-Edge Technology',
      subtitle: 'We integrate the latest technologies to create the most intelligent parking experience in the market',
      ai: {
        title: 'Predictive AI',
        description: 'Machine learning algorithms that predict occupancy patterns and optimize management'
      },
      cloud: {
        title: 'Cloud Native',
        description: 'Cloud-first architecture for maximum scalability and global availability'
      },
      iot: {
        title: 'Advanced IoT',
        description: 'Smart sensors that monitor each parking space in real-time'
      },
      security: {
        title: 'Blockchain Security',
        description: 'Secure transactions with blockchain technology and military-grade encryption'
      },
      analytics: {
        title: 'Advanced Analytics',
        description: 'Predictive analysis and real-time reports with interactive dashboards'
      },
      qr: {
        title: 'Dynamic QR',
        description: 'QR codes that regenerate automatically for maximum security'
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
      copyright: '© 2024 ParkIt. All rights reserved.'
    },
    login: {
      title: 'Pro Access',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      demoInfo: 'Use any email and password to access the demo'
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