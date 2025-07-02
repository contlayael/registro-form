// src/App.jsx

import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// --- Logos SVG ---
const VisaLogo = () => (
    <svg width="60" height="40" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path d="M28.8 10.1h-4.2c-.1-1.2-1-2.1-2.2-2.1-.9 0-1.6.5-1.9 1.1l-1.8 6.1H23c.1 0 .2.1.2.2l-.1 1.2c0 .1-.1.2-.2.2h-3.4c-.6.0-1.1-.4-1.2-.9L16 9.5c-.1-.4-.5-.7-.9-.7h-2.6c-.5 0-.9.3-1 .7l-4.1 10.7c-.1.2.1.4.3.4H9c.4 0 .7-.3.8-.7l1-2.7h3.8c.2 0 .4-.1.4-.3l.7-2.3h-4.6c-.4 0-.7-.3-.8-.7l1.7-4.4c.1-.2.3-.4.5-.4h2.4c.4 0 .7.3.8.7l1.7 4.5c.1.2.3.4.5.4h2.9c.4 0 .7-.3.8-.7l2.1-7.1c.1-.2.3-.4.5-.4H28c.4 0 .7.3.8.7l.9 3.1c.1.2.3.3.5.3h.8c.4 0 .7-.2.8-.6s-.1-.8-.5-1z" fill="#142688"/></svg>
);
const MasterCardLogo = () => (
    <svg width="60" height="40" viewBox="0 0 256 163" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><path fill="#FF5F00" d="M100.2 81.3c0 44.2-35.8 80-80 80s-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80z" transform="translate(77.8)"/><path fill="#EB001B" d="M128.2 1.3c-44.2 0-80 35.8-80 80s35.8 80 80 80s80-35.8 80-80s-35.8-80-80-80zm0 155c-41.4 0-75-33.6-75-75s33.6-75 75-75s75 33.6 75 75s-33.6 75-75 75z" transform="translate(50)"/><path fill="#F79E1B" d="M100.2 81.3c0 44.2-35.8 80-80 80s-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80z" transform="matrix(1 0 0 -1 77.8 81.3)"/></svg>
);

function App() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [validated, setValidated] = useState(false);
  // ** NUEVO ESTADO PARA EL ERROR DEL TELÉFONO **
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenimos el envío en cualquier caso para controlar la lógica aquí
    const form = event.currentTarget;
    let isPhoneValid = true;

    // ** NUEVA REGLA DE VALIDACIÓN PARA EL TELÉFONO **
    // Un número de teléfono internacional válido rara vez tiene menos de 8 caracteres.
    if (!phone || phone.length < 8) {
      setPhoneError('Por favor, ingrese un número de teléfono completo.');
      isPhoneValid = false;
    } else {
      setPhoneError(''); // Limpiamos el error si es válido
    }

    // Marcamos el formulario para mostrar los estilos de validación de Bootstrap
    setValidated(true);

    // Si el formulario de Bootstrap NO es válido O nuestro teléfono NO es válido, detenemos el proceso.
    if (form.checkValidity() === false || !isPhoneValid) {
      event.stopPropagation();
      return;
    }
    
    // Si todo es válido, continuamos
    alert(`Registro enviado:\nNombre: ${fullName}\nEmail: ${email}\nTeléfono: ${phone}`);
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 p-4">
      <Card className="w-100 shadow-lg" style={{ maxWidth: '1100px' }}>
        <Row className="g-0">
          <Col lg={6} className="bg-primary text-white p-5 rounded-start">
            <h2 className="fw-bold mb-3">Inversiones Bruno</h2>
            <p className="mb-4">Complete el formulario para comenzar.</p>
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFullName">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="text" placeholder="Ej. Juan Pérez" value={fullName} onChange={e => setFullName(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingrese su nombre completo.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="su.correo@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} required />
                <Form.Control.Feedback type="invalid">
                  Por favor, ingrese un correo electrónico válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPhone">
                <Form.Label>Número de Teléfono</Form.Label>
                <PhoneInput
                  international
                  // ** PAÍS POR DEFECTO ACTUALIZADO **
                  defaultCountry="CO" 
                  value={phone}
                  onChange={setPhone}
                  inputComponent={Form.Control}
                  // Hacemos que el campo en sí no sea 'required' para Bootstrap,
                  // porque nuestra lógica personalizada lo manejará.
                  // Pero sí lo necesitamos para el estado 'isInvalid'.
                  isInvalid={!!phoneError}
                />
                {/* ** NUEVO MENSAJE DE ERROR PARA EL TELÉFONO ** */}
                {phoneError && <div className="invalid-feedback d-block">{phoneError}</div>}
              </Form.Group>

              <Button variant="warning" type="submit" className="w-100 fw-bold p-3" size="lg">
                Crear mi Cuenta Ahora
              </Button>
            </Form>
          </Col>

          <Col lg={6} className="p-5 d-flex flex-column justify-content-center">
            {/* Columna derecha sin cambios */}
            <h1 className="display-5 fw-bold text-primary mb-3">Transforme su Futuro Financiero.</h1>
            <p className="lead mb-4">
              En <strong>Inversiones Bruno</strong>, le abrimos las puertas a oportunidades de inversión exclusivas, diseñadas para maximizar su potencial de crecimiento.
            </p>
            <p>
              Regístrese hoy y dé el primer paso hacia la construcción de su patrimonio con estrategias inteligentes y seguras. Su oportunidad de invertir sabiamente comienza aquí.
            </p>
            <hr className="my-4" />
            <div className="mt-auto">
                <p className="text-muted mb-2">Aceptamos pagos seguros con:</p>
                <div className="d-flex align-items-center">
                   <MasterCardLogo />
                   <VisaLogo />
                </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default App;