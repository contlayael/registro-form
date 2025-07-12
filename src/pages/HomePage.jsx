// src/pages/HomePage.jsx

import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import { db } from '../firebaseConfig'; // Importamos nuestra conexión a la BD
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Funciones de Firestore

// --- Logos SVG (sin cambios) ---
const VisaLogo = () => ( <svg>...</svg> /* Pega el código SVG completo aquí */ );
const MasterCardLogo = () => ( <svg>...</svg> /* Pega el código SVG completo aquí */ );

function HomePage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('CO'); // Estado para guardar el país
  const [validated, setValidated] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para el spinner de carga

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let isPhoneValid = true;

    if (!phone || phone.length < 8) {
      setPhoneError('Por favor, ingrese un número de teléfono completo.');
      isPhoneValid = false;
    } else {
      setPhoneError('');
    }

    setValidated(true);

    if (form.checkValidity() === false || !isPhoneValid) {
      event.stopPropagation();
      return;
    }
    
    setIsLoading(true); // Mostramos el spinner

    try {
      // Intentamos guardar los datos en Firestore
      await addDoc(collection(db, "registrations"), {
        name: fullName,
        email: email,
        phone: phone,
        country: country, // Guardamos el código del país
        registrationDate: serverTimestamp() // Firebase pone la fecha y hora del servidor
      });
      
      alert('Registro Exitoso, pronto se comunicaran contigo para comenzar a invertir');
      
      // Limpiamos el formulario
      setFullName('');
      setEmail('');
      setPhone('');
      setCountry('CO');
      setValidated(false);

    } catch (error) {
      console.error("Error al guardar el registro: ", error);
      alert("Hubo un error al enviar tu registro. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false); // Ocultamos el spinner
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 p-4">
      <Card className="w-100 shadow-lg" style={{ maxWidth: '1100px', border: 'none' }}>
        <Row className="g-0">
          <Col lg={6} className="p-5 form-container-dark">
            <h2 className="fw-bold mb-3" style={{ color: '#D4AF37' }}>Inversiones Bruno</h2>
            <p className="mb-4 text-white-50">Complete el formulario para comenzar.</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFullName">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="text" placeholder="Ej. Juan Pérez" value={fullName} onChange={e => setFullName(e.target.value)} required disabled={isLoading} />
                <Form.Control.Feedback type="invalid">Por favor, ingrese su nombre completo.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="su.correo@ejemplo.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={isLoading} />
                <Form.Control.Feedback type="invalid">Por favor, ingrese un correo electrónico válido.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formPhone">
                <Form.Label>Número de Teléfono</Form.Label>
                <PhoneInput 
                  international 
                  defaultCountry="CO" 
                  value={phone} 
                  onChange={setPhone} 
                  onCountryChange={setCountry} // Guardamos el país cuando cambia
                  inputComponent={Form.Control} 
                  isInvalid={!!phoneError}
                  disabled={isLoading}
                />
                {phoneError && <div className="invalid-feedback d-block">{phoneError}</div>}
              </Form.Group>
              <Button type="submit" className="w-100 p-3 mt-3 btn-gold" size="lg" disabled={isLoading}>
                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Crear mi Cuenta Ahora'}
              </Button>
            </Form>
          </Col>
          <Col lg={6} className="p-5 d-flex flex-column justify-content-center bg-light">
            {/* Columna derecha sin cambios */}
            <h1 className="display-5 fw-bold text-dark mb-3">Transforme su Futuro Financiero.</h1>
            <p className="lead text-secondary mb-4">En <strong style={{color: '#B8860B'}}>Inversiones Bruno</strong>, le abrimos las puertas a oportunidades de inversión exclusivas.</p>
            <hr className="my-4" />
            <div className="mt-auto">
                <p className="text-muted mb-2">Aceptamos pagos seguros con:</p>
                <div className="d-flex align-items-center"><MasterCardLogo /><VisaLogo /></div>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default HomePage;