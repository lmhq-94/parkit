"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Home, NavigateNext } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function CookiesPage() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, background: "#f8f9fa", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 4 }}
        >
          <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
            <Home sx={{ mr: 1, fontSize: 20 }} />
            Inicio
          </Link>
          <Typography color="text.primary">Política de Cookies</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 3,
              color: "#000000",
              fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
              lineHeight: 1.1,
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Política de Cookies
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#666666",
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.6,
              fontWeight: 400,
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </Typography>
        </Box>

        {/* Content */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            background: "#ffffff",
            borderRadius: 0,
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            1. ¿Qué son las Cookies?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. 
            Estas cookies nos ayudan a mejorar su experiencia de navegación y a proporcionar funcionalidades personalizadas.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            2. Tipos de Cookies que Utilizamos
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Cookies Esenciales
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Estas cookies son necesarias para el funcionamiento básico del sitio web. Incluyen cookies que:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Mantienen su sesión activa mientras navega por el sitio
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Recuerdan sus preferencias de idioma y configuración
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Garantizan la seguridad de su cuenta y datos
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Permiten el funcionamiento de funcionalidades básicas como el login
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Cookies de Rendimiento
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Estas cookies nos ayudan a entender cómo interactúa con nuestro sitio web:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Analizan qué páginas visita más frecuentemente
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Identifican errores y problemas de rendimiento
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Mejoran la velocidad y funcionalidad del sitio
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Proporcionan estadísticas de uso anónimas
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Cookies de Funcionalidad
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Estas cookies permiten que el sitio web recuerde las elecciones que hace:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Su configuración de tema (claro/oscuro)
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Sus preferencias de idioma
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Información de su cuenta y perfil
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Configuraciones personalizadas del dashboard
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            3. Cookies de Terceros
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            También utilizamos servicios de terceros que pueden establecer cookies en su dispositivo:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Google Analytics:</strong> Para analizar el tráfico del sitio web
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Stripe:</strong> Para procesar pagos de forma segura
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Cloudflare:</strong> Para mejorar la seguridad y rendimiento
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Intercom:</strong> Para proporcionar soporte al cliente
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            4. Duración de las Cookies
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Las cookies tienen diferentes duraciones:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Cookies de sesión:</strong> Se eliminan cuando cierra el navegador
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Cookies persistentes:</strong> Permanecen hasta que las elimine manualmente o expiren
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Cookies de autenticación:</strong> Suelen durar entre 30 días y 1 año
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Cookies de análisis:</strong> Típicamente duran entre 1 y 2 años
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            5. Gestión de Cookies
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Puede controlar y gestionar las cookies de varias maneras:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Configuración del navegador:</strong> La mayoría de navegadores permiten bloquear o eliminar cookies
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Panel de preferencias:</strong> Puede gestionar sus preferencias de cookies desde su perfil
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Herramientas de terceros:</strong> Existen extensiones que ayudan a gestionar cookies
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              <strong>Contacto directo:</strong> Puede contactarnos para solicitar la eliminación de datos
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            6. Impacto de Deshabilitar Cookies
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Si deshabilita las cookies, algunas funcionalidades del sitio web pueden no funcionar correctamente:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Es posible que no pueda iniciar sesión en su cuenta
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Las preferencias personalizadas no se guardarán
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Algunas funcionalidades del dashboard pueden estar limitadas
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              El rendimiento del sitio web puede verse afectado
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            7. Actualizaciones de esta Política
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en nuestras prácticas 
            o por otras razones operativas, legales o regulatorias. Le notificaremos cualquier cambio significativo 
            mediante un aviso en nuestro sitio web.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            8. Contacto
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos en:
          </Typography>
          <Box sx={{ mb: 4, p: 3, background: "#f8f9fa", borderRadius: 0 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> privacy@parkit.com
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Teléfono:</strong> (+506) 6216-4040
            </Typography>
            <Typography variant="body1">
              <strong>Dirección:</strong> 20501 Atenas, Alajuela, Costa Rica
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 