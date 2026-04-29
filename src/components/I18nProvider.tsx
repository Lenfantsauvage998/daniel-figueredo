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
    navCart: "Cart",
    
    // Hero
    heroGreeting: "Hola",
    heroHook1: "I build AI agents that cut operational costs by 70%",
    heroHook2: "I automate workflows that reclaim 20+ hours every week",
    heroHook3: "I design websites that convert visitors into high-ticket buyers",
    heroHook4: "I turn scattered data into dashboards that drive decisions",
    heroCtaPrimary: "Claim Your Free AI Audit",
    heroCtaSecondary: "View Services",
    
    // Info
    infoLabel: "Info:",
    infoText:
      "I'm Daniel Figueredo, an engineer, AI specialist and creative developer. I build from strategy to stack — web applications, intelligent agents, workflow automation and data-driven solutions. I advise early-stage companies and professionals on leveraging AI and modern web technologies to grow their business.",
    
    // Labs / Services
    labsLabel: "Services:",
    
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
    storeAddToCart: "Add to Cart",
    storeEmpty: "Your cart is empty",
    storeBack: "Back to Store",
    storeBrowse: "Browse Services",
    
    // Cart
    cartTitle: "Cart",
    cartSubtotal: "Subtotal",
    cartCheckout: "Proceed to Checkout",
    cartClear: "Clear cart",
    cartContinue: "Continue Shopping",
    
    // Checkout
    checkoutTitle: "Checkout",
    checkoutTotal: "Total",
    checkoutNote:
      "Payment is handled manually. After placing your order, I will contact you via email or WhatsApp to confirm details and arrange payment.",
    checkoutPlaceOrder: "Place Order",
    checkoutSuccessTitle: "Order Placed",
    checkoutSuccessText:
      "Thank you! I will review your order and contact you via email or WhatsApp to finalize the details and payment.",
    checkoutBackStore: "Back to Store",
    
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
    navCart: "Carrito",
    
    // Hero
    heroGreeting: "Hola",
    heroHook1: "Construyo agentes de IA que reducen costos operativos un 70%",
    heroHook2: "Automatizo flujos de trabajo que recuperan 20+ horas semanales",
    heroHook3: "Diseño sitios web que convierten visitantes en compradores premium",
    heroHook4: "Transformo datos dispersos en dashboards que impulsan decisiones",
    heroCtaPrimary: "Solicita tu Auditoría IA Gratis",
    heroCtaSecondary: "Ver Servicios",
    
    // Info
    infoLabel: "Info:",
    infoText:
      "Soy Daniel Figueredo, ingeniero, especialista en IA y desarrollador creativo. Construyo desde la estrategia hasta el código — aplicaciones web, agentes inteligentes, automatización de flujos y soluciones basadas en datos. Asesoro a empresas y profesionales para que aprovechen la IA y las tecnologías web modernas para hacer crecer su negocio.",
    
    // Labs / Services
    labsLabel: "Servicios:",
    
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
    storeAddToCart: "Agregar al Carrito",
    storeEmpty: "Tu carrito está vacío",
    storeBack: "Volver a la Tienda",
    storeBrowse: "Explorar Servicios",
    
    // Cart
    cartTitle: "Carrito",
    cartSubtotal: "Subtotal",
    cartCheckout: "Proceder al Pago",
    cartClear: "Vaciar carrito",
    cartContinue: "Seguir Comprando",
    
    // Checkout
    checkoutTitle: "Pago",
    checkoutTotal: "Total",
    checkoutNote:
      "El pago se gestiona manualmente. Después de realizar tu pedido, me contactaré por correo o WhatsApp para confirmar los detalles y coordinar el pago.",
    checkoutPlaceOrder: "Realizar Pedido",
    checkoutSuccessTitle: "Pedido Realizado",
    checkoutSuccessText:
      "¡Gracias! Revisaré tu pedido y me contactaré por correo o WhatsApp para finalizar los detalles y el pago.",
    checkoutBackStore: "Volver a la Tienda",
    
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
