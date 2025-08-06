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

export default function PrivacyPolicyPage() {
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
          <Typography color="text.primary">Política de Privacidad</Typography>
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
            Política de Privacidad
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
            1. Información que Recopilamos
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
            Recopilamos información que usted nos proporciona directamente, como cuando crea una cuenta, 
            realiza una reserva o se pone en contacto con nosotros. Esta información puede incluir:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Información de identificación personal (nombre, dirección de correo electrónico, número de teléfono)
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Información de la empresa (nombre de la empresa, dirección, información de contacto)
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Información de vehículos (placa, marca, modelo, color)
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Datos de uso y transacciones (historial de reservas, pagos, entradas y salidas)
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
            2. Cómo Utilizamos su Información
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
            Utilizamos la información recopilada para:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Proporcionar y mantener nuestros servicios de gestión de parking
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Procesar reservas y pagos
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Gestionar el acceso a los espacios de parking mediante códigos QR
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Enviar notificaciones sobre reservas y eventos del sistema
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Mejorar nuestros servicios y desarrollar nuevas funcionalidades
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Cumplir con obligaciones legales y regulatorias
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
            3. Compartir Información
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
            No vendemos, alquilamos ni compartimos su información personal con terceros, excepto:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Con su consentimiento explícito
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Con proveedores de servicios que nos ayudan a operar la plataforma (procesadores de pago, servicios en la nube)
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Cuando sea requerido por ley o para proteger nuestros derechos legales
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              En caso de fusión, adquisición o venta de activos de la empresa
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
            4. Seguridad de Datos
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
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Encriptación de datos en tránsito y en reposo
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Acceso restringido a datos personales solo a personal autorizado
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Monitoreo regular de sistemas para detectar y prevenir amenazas
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Copias de seguridad seguras y procedimientos de recuperación
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
            5. Sus Derechos
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
            Usted tiene los siguientes derechos respecto a su información personal:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 4 }}>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Acceso: Solicitar información sobre qué datos tenemos sobre usted
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Rectificación: Corregir datos inexactos o incompletos
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Supresión: Solicitar la eliminación de sus datos personales
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Portabilidad: Recibir sus datos en formato estructurado
            </Typography>
            <Typography component="li" sx={{ mb: 2, lineHeight: 1.7 }}>
              Oposición: Oponerse al procesamiento de sus datos
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
            6. Retención de Datos
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
            Conservamos su información personal solo durante el tiempo necesario para los fines descritos en esta política, 
            o según lo requiera la ley. Los datos de transacciones se conservan durante 7 años para cumplir con obligaciones fiscales.
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
            7. Contacto
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
            Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos su información personal, 
            puede contactarnos en:
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