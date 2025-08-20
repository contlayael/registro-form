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
            <p className="mb-1">📧 company@innovatecorp.global</p>
          </Col>

          {/* Columna enlaces */}
          <Col md={4} className="mb-3">
            <h5 className="text-gold">Información Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/CTADT.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">Términos y Condiciones</Link></li>
              <li><Link to="/PrivacyPolicy.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">Aviso de Privacidad</Link></li>
              <li><Link to="/DisclaimerRiskWarning.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">Descargo de responsabilidad y advertencia de riesgo</Link></li>
            </ul>
          </Col>

          {/* Columna aviso de riesgo */}
          <Col md={4} className="mb-3">
            <h5 className="text-gold">Descargo de responsabilidad y advertencia de riesgo</h5>
            <p className="risk-text">
              El comercio de CFD en línea conlleva un alto grado de riesgo y puede no ser adecuado para todos los inversores: el usuario antes de comenzar dichas transacciones debe evaluar cuidadosamente su situación financiera, asegurándose de que sea adecuada para dichas transacciones. Busque asesoramiento independiente y asegúrese de comprender completamente los riesgos asociados con el comercio financiero apalancado antes de decidirse a operar, ya que puede perder parte o todo el capital invertido. Cualquier información incluida en este sitio web no constituye una oferta de servicios para clientes que residen en jurisdicciones donde dicha oferta no está autorizada. Este sitio web es propiedad de InnovateCorp Ltd y tiene domicilio social en Trust Company Complex, Ajeltake Road, Isla Ajeltake, Majuro, Islas Marshall MH96960. La empresa está autorizada por las leyes de Islas Marshall, con número de registro 126626 como titular de una opinión legal bajo las leyes de servicios financieros aplicables.
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
