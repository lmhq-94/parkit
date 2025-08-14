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

export default function TermsOfServicePage() {
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
          <Typography color="text.primary">Términos de Servicio</Typography>
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
            }}
          >
            Términos de Servicio
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#666666",
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.6,
              fontWeight: 400,
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
            }}
          >
            1. Aceptación de los Términos
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Al acceder y utilizar ParkIt, usted acepta estar sujeto a estos Términos de Servicio. 
            Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            2. Descripción del Servicio
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            ParkIt es una plataforma de gestión de parking que permite:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Registrar y gestionar espacios de parking
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Crear y gestionar reservas de espacios
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Controlar acceso mediante códigos QR
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Monitorear ocupación y generar reportes
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Gestionar usuarios con diferentes roles y permisos
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            3. Cuentas de Usuario
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Para utilizar nuestros servicios, debe crear una cuenta. Usted es responsable de:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Mantener la confidencialidad de sus credenciales de acceso
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Proporcionar información precisa y actualizada
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Notificar inmediatamente cualquier uso no autorizado de su cuenta
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Aceptar responsabilidad por todas las actividades que ocurran bajo su cuenta
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            4. Uso Aceptable
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Usted se compromete a utilizar nuestros servicios únicamente para fines legales y de acuerdo con estos términos. 
            Está prohibido:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Usar el servicio para actividades ilegales o fraudulentas
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Intentar acceder a sistemas o datos no autorizados
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Interferir con el funcionamiento del servicio
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Compartir credenciales de acceso con terceros
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Usar el servicio para enviar spam o contenido malicioso
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            5. Propiedad Intelectual
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            El servicio y todo su contenido, incluyendo pero no limitado a software, diseño, texto, gráficos, 
            y logotipos, son propiedad de ParkIt y están protegidos por leyes de propiedad intelectual. 
            No se permite copiar, modificar, distribuir o crear trabajos derivados sin autorización expresa.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            6. Limitación de Responsabilidad
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            ParkIt proporciona el servicio "tal como está" sin garantías de ningún tipo. En ningún caso 
            seremos responsables por daños indirectos, incidentales, especiales o consecuentes que puedan 
            resultar del uso del servicio.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            7. Disponibilidad del Servicio
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Nos esforzamos por mantener el servicio disponible 24/7, pero no garantizamos disponibilidad 
            ininterrumpida. Podemos realizar mantenimiento programado con notificación previa cuando sea posible.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            8. Terminación
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Podemos suspender o terminar su acceso al servicio en cualquier momento por violación de estos términos 
            o por cualquier otra razón a nuestra discreción. Usted puede cancelar su cuenta en cualquier momento 
            desde la configuración de su perfil.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            9. Modificaciones
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
            en vigor inmediatamente después de su publicación. Su uso continuado del servicio constituye 
            aceptación de los términos modificados.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            10. Ley Aplicable
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Estos términos se rigen por las leyes del estado donde opera ParkIt. Cualquier disputa será 
            resuelta en los tribunales competentes de dicha jurisdicción.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: "#000000",
            }}
          >
            11. Contacto
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              color: "#333333",
            }}
          >
            Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
          </Typography>
          <Box sx={{ mb: 4, p: 3, background: "#f8f9fa", borderRadius: 0 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Email:</strong> legal@parkit.com
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