"use client";

import { createContext, useContext, useState, useCallback } from "react";

type Lang = "en" | "es";

const translations = {
  en: {
    // Nav
    navHome: "Home",
    navStore: "Store",
    navAdmin: "Admin",
    navLogin: "Log in",
    navLogout: "Log out",
    navContact: "Contact",
    
    // Hero
    heroGreeting: "Hola",
    heroHook1: "I query, clean and model data — then explain what it means",
    heroHook2: "I caught 80% of fraud that raw accuracy missed entirely",
    heroHook3: "I use statistics and Pandas to find the signal in the noise",
    heroHook4: "I also build with Claude Code, Cursor and agentic AI tools",
    heroCtaPrimary: "Get in touch",
    heroCtaSecondary: "See my work",
    heroRole: "Data Scientist & Analytics",
    heroScroll: "Scroll to meet me",
    sceneGreeting: "Hey!",

    // About / hologram
    aboutLabel: "About",
    aboutName: "Daniel",
    aboutRole: "Data Scientist & Analytics",
    aboutLocation: "Colombia",
    aboutBio:
      "Turns raw data into decisions using SQL, statistics and Pandas — with agentic AI tools and web development to back it up.",
    aboutSkillsLabel: "Skills",
    aboutHint: "Keep scrolling to bring the profile online",

    // Info
    infoLabel: "Info:",
    infoText:
      "I'm Daniel Figueredo, a data scientist focused on analytics — SQL, Pandas, Matplotlib and statistics, applied to real business problems like fraud detection and decision-making, not just modeling for its own sake. I also build with agentic AI tools like Claude Code, Codex and Cursor, and I ship the full-stack platforms that put that work in front of real users.",
    
    // Labs / Services
    labsLabel: "Services:",

    // Projects
    projectsLabel: "Projects",
    projectsTitle: "Data science, in practice",
    projectsSubtitle:
      "Analysis built to hold up under scrutiny — not just look good in a slide.",
    projectsCta: "View the analysis",
    projectsStatAuc: "Model AUC",
    projectsStatSensitivity: "Fraud caught",
    projectsStatTx: "Transactions analyzed",
    projectsStatFraud: "Actual fraud rate",

    // Clients
    clientsLabel: "Clients",
    clientsTitle: "Businesses that trust me",
    clientsSubtitle: "Live platforms, built end to end and shipped to production.",
    clientsCta: "Visit site",
    
    // Store CTA
    storeLabel: "Store:",
    storeText:
      "I offer tailored digital services for businesses ready to scale. Browse packages or reach out directly for a custom quote.",
    storeButton: "View Services",
    
    // Contact
    contactLabel: "Contact:",
    contactText: "Have a project in mind? Let's talk.",
    contactName: "Name",
    contactEmail: "Email",
    contactService: "Service of interest",
    contactSelect: "Select a service...",
    contactWeb: "Web Development",
    contactAIAgents: "AI Agents",
    contactAIWorkflows: "AI Workflows",
    contactData: "Data Science",
    contactOther: "Other",
    contactMessage: "Tell me about your project...",
    contactSubmit: "Send Message",
    contactSuccess: "Message sent! I'll be in touch soon.",
    contactError: "Something went wrong. Please try again.",
    
    // Store page
    storeTitle: "Store",
    storeDesc:
      "Tailored digital services for businesses ready to scale. Each package is customizable — contact me for a custom quote.",
    storeEmpty: "No services available right now — check back soon.",
    // Auth
    loginTitle: "Log in",
    loginSubtitle: "Access your account and orders",
    loginEmail: "Email",
    loginPassword: "Password",
    loginButton: "Log in",
    loginNoAccount: "Don't have an account?",
    loginRegister: "Register",
    
    registerTitle: "Register",
    registerSubtitle: "Create an account to place orders",
    registerName: "Name",
    registerEmail: "Email",
    registerPassword: "Password",
    registerButton: "Create Account",
    registerHasAccount: "Already have an account?",
    registerLogin: "Log in",
    
    // Footer
    footerStore: "Store",
    footerEmail: "Email",
    footerLinkedIn: "LinkedIn",
    footerGithub: "Github",
    
    // WhatsApp
    whatsappText:
      "Hi Daniel, I found your site and I'm interested in your services.",
    
    // Admin
    adminTitle: "Admin Dashboard",
    adminProducts: "Products",
    adminOrders: "Orders",
    adminLeads: "Leads",
    adminNewProduct: "New Product",
    adminEditProduct: "Edit Product",
    adminSave: "Save",
    adminCancel: "Cancel",
    adminActive: "Active",
    adminInactive: "Inactive",
    adminDeleteConfirm: "Delete this product?",
    adminOrderId: "Order",
    adminCustomer: "Customer",
    adminItems: "Items",
    adminStatus: "Status",
    adminDate: "Date",
    adminPending: "PENDING",
    adminCompleted: "COMPLETED",
    adminCancelled: "CANCELLED",
  },
  es: {
    // Nav
    navHome: "Inicio",
    navStore: "Tienda",
    navAdmin: "Admin",
    navLogin: "Iniciar sesión",
    navLogout: "Cerrar sesión",
    navContact: "Contacto",
    
    // Hero
    heroGreeting: "Hola",
    heroHook1: "Extraigo, limpio y modelo datos — y explico qué significan",
    heroHook2: "Detecté el 80% del fraude que la precisión bruta pasó por alto",
    heroHook3: "Uso estadística y Pandas para encontrar la señal en el ruido",
    heroHook4: "También construyo con Claude Code, Cursor y herramientas de IA agentiva",
    heroCtaPrimary: "Hablemos",
    heroCtaSecondary: "Ve mi trabajo",
    heroRole: "Científico de Datos y Analítica",
    heroScroll: "Baja para conocerme",
    sceneGreeting: "¡Hola!",

    // About / hologram
    aboutLabel: "Sobre mí",
    aboutName: "Daniel",
    aboutRole: "Científico de Datos y Analítica",
    aboutLocation: "Colombia",
    aboutBio:
      "Convierto datos crudos en decisiones usando SQL, estadística y Pandas — con herramientas de IA agentiva y desarrollo web como respaldo.",
    aboutSkillsLabel: "Habilidades",
    aboutHint: "Sigue bajando para activar el perfil",

    // Info
    infoLabel: "Info:",
    infoText:
      "Soy Daniel Figueredo, científico de datos enfocado en analítica — SQL, Pandas, Matplotlib y estadística, aplicados a problemas reales de negocio como detección de fraude y toma de decisiones, no solo modelado por modelar. También construyo con herramientas de IA agentiva como Claude Code, Codex y Cursor, y lanzo las plataformas full-stack que ponen ese trabajo frente a usuarios reales.",
    
    // Labs / Services
    labsLabel: "Servicios:",

    // Projects
    projectsLabel: "Proyectos",
    projectsTitle: "Ciencia de datos, en la práctica",
    projectsSubtitle:
      "Análisis construidos para resistir el escrutinio, no solo para verse bien en una diapositiva.",
    projectsCta: "Ver el análisis",
    projectsStatAuc: "AUC del modelo",
    projectsStatSensitivity: "Fraude detectado",
    projectsStatTx: "Transacciones analizadas",
    projectsStatFraud: "Tasa real de fraude",

    // Clients
    clientsLabel: "Clientes",
    clientsTitle: "Negocios que confían en mí",
    clientsSubtitle: "Plataformas en vivo, construidas de principio a fin y en producción.",
    clientsCta: "Visitar sitio",
    
    // Store CTA
    storeLabel: "Tienda:",
    storeText:
      "Ofrezco servicios digitales personalizados para negocios listos para escalar. Explora los paquetes o contáctame directamente para una cotización a medida.",
    storeButton: "Ver Servicios",
    
    // Contact
    contactLabel: "Contacto:",
    contactText: "¿Tienes un proyecto en mente? Hablemos.",
    contactName: "Nombre",
    contactEmail: "Correo electrónico",
    contactService: "Servicio de interés",
    contactSelect: "Selecciona un servicio...",
    contactWeb: "Desarrollo Web",
    contactAIAgents: "Agentes de IA",
    contactAIWorkflows: "Flujos de IA",
    contactData: "Ciencia de Datos",
    contactOther: "Otro",
    contactMessage: "Cuéntame sobre tu proyecto...",
    contactSubmit: "Enviar Mensaje",
    contactSuccess: "¡Mensaje enviado! Me pondré en contacto pronto.",
    contactError: "Algo salió mal. Por favor intenta de nuevo.",
    
    // Store page
    storeTitle: "Tienda",
    storeDesc:
      "Servicios digitales personalizados para negocios listos para escalar. Cada paquete es personalizable — contáctame para una cotización a medida.",
    storeEmpty: "No hay servicios disponibles por ahora — vuelve pronto.",
    // Auth
    loginTitle: "Iniciar sesión",
    loginSubtitle: "Accede a tu cuenta y pedidos",
    loginEmail: "Correo electrónico",
    loginPassword: "Contraseña",
    loginButton: "Iniciar sesión",
    loginNoAccount: "¿No tienes cuenta?",
    loginRegister: "Regístrate",
    
    registerTitle: "Registro",
    registerSubtitle: "Crea una cuenta para realizar pedidos",
    registerName: "Nombre",
    registerEmail: "Correo electrónico",
    registerPassword: "Contraseña",
    registerButton: "Crear Cuenta",
    registerHasAccount: "¿Ya tienes cuenta?",
    registerLogin: "Iniciar sesión",
    
    // Footer
    footerStore: "Tienda",
    footerEmail: "Correo",
    footerLinkedIn: "LinkedIn",
    footerGithub: "Github",
    
    // WhatsApp
    whatsappText:
      "Hola Daniel, encontré tu sitio y estoy interesado en tus servicios.",
    
    // Admin
    adminTitle: "Panel de Administración",
    adminProducts: "Productos",
    adminOrders: "Pedidos",
    adminLeads: "Leads",
    adminNewProduct: "Nuevo Producto",
    adminEditProduct: "Editar Producto",
    adminSave: "Guardar",
    adminCancel: "Cancelar",
    adminActive: "Activo",
    adminInactive: "Inactivo",
    adminDeleteConfirm: "¿Eliminar este producto?",
    adminOrderId: "Pedido",
    adminCustomer: "Cliente",
    adminItems: "Artículos",
    adminStatus: "Estado",
    adminDate: "Fecha",
    adminPending: "PENDIENTE",
    adminCompleted: "COMPLETADO",
    adminCancelled: "CANCELADO",
  },
} as const;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)["en"] | (typeof translations)["es"];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = translations[lang];

  const handleSetLang = useCallback((l: Lang) => setLang(l), []);

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
