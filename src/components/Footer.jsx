// src/components/Footer.jsx
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-dark mt-5 py-4">
      <Container>
        <Row>
          {/* Columna contacto */}
          <Col md={4} className="mb-3">
            <h5 className="text-gold">Contacto</h5>
            <p className="mb-1">📧 contacto@divitumtrade.com</p>
          </Col>

          {/* Columna enlaces */}
          <Col md={4} className="mb-3">
            <h5 className="text-gold">Información Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/terminos" className="footer-link">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="footer-link">Aviso de Privacidad</Link></li>
            </ul>
          </Col>

          {/* Columna aviso de riesgo */}
          <Col md={4} className="mb-3">
            <h5 className="text-gold">Advertencia de Riesgo</h5>
            <p className="risk-text">
              Operar en línea implica riesgos significativos y puede no ser adecuado para todos los inversionistas. 
              No constituye asesoramiento en inversiones. Considere buscar asesoría profesional independiente. 
              Existe un riesgo real de pérdida, y entre el 65 % y el 80 % de los inversionistas minoristas pierden dinero al operar. 
              Lea nuestra Declaración de Divulgación de Riesgos y Términos completos.
            </p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center small mb-0">
          © {new Date().getFullYear()} INNOVATECORP. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
