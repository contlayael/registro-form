// src/pages/AvisoPrivacidadPage.jsx
import React from "react";
import { Container, Card } from "react-bootstrap";

export default function AvisoPrivacidadPage() {
  return (
    // Contenedor principal con fondo oscuro que ocupa toda la pantalla
    <div className="bg-dark min-vh-100 py-5">
      <Container style={{ maxWidth: '800px' }}>
        {/* Usamos un Card de Bootstrap para el contenido */}
        <Card bg="dark" text="white" className="shadow-lg border-secondary">
          <Card.Body className="p-5">
            <Card.Title as="h1" className="text-center mb-4">
              Aviso de Privacidad
            </Card.Title>

            <div className="text-light" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p>
                <strong>Última actualización:</strong> 18 de agosto de 2025
              </p>
              <p>
                En <strong>Inversiones Divitum Trade</strong>, la
                privacidad de tus datos es muy importante para nosotros. Este Aviso
                explica cómo recopilamos, usamos y protegemos tu información.
              </p>
              
              <h2 className="h4 mt-4">1. Datos que recopilamos</h2>
              <p>
                Podemos solicitar información como: nombre, correo electrónico, número de
                teléfono y cualquier dato que proporciones voluntariamente al registrarte.
              </p>
              
              <h2 className="h4 mt-4">2. Uso de la información</h2>
              <p>
                La información recopilada se utilizará únicamente para fines de contacto,
                administración y mejora de la aplicación.
              </p>
              
              <h2 className="h4 mt-4">3. Compartición de datos</h2>
              <p>
                No compartiremos tus datos con terceros sin tu consentimiento, salvo por
                obligación legal.
              </p>
              
              <h2 className="h4 mt-4">4. Seguridad</h2>
              <p>
                Implementamos medidas de seguridad para proteger tu información,
                aunque ningún sistema es 100% seguro.
              </p>
              
              <h2 className="h4 mt-4">5. Derechos del usuario</h2>
              <p>
                Puedes solicitar en cualquier momento acceso, corrección o eliminación
                de tus datos escribiéndonos a <strong>[tu correo]</strong>.
              </p>
              
              <h2 className="h4 mt-4">6. Cambios al aviso</h2>
              <p>
                Nos reservamos el derecho de actualizar este Aviso en cualquier
                momento. Te notificaremos en caso de cambios importantes.
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}