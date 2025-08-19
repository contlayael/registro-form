// src/pages/AdminPage.jsx

import { useState } from 'react';
import { Container, Card, Form, Button, Table, Nav, Navbar, Pagination, Spinner } from 'react-bootstrap';

// --- IMPORTACIONES ADICIONALES PARA ELIMINAR ---
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore'; // Se añaden doc y deleteDoc
import { CSVLink } from 'react-csv';

// --- Sub-componente: Panel de Administración ---
// Se añade 'onDelete' a los props que recibe el componente
const AdminDashboard = ({ registrations, onLogout, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const countryNames = { CO: 'Colombia', MX: 'México', AR: 'Argentina', US: 'Estados Unidos' };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = registrations.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(registrations.length / recordsPerPage);

    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    // --- LÓGICA PARA LA EXPORTACIÓN A CSV ---
    // 1. Definimos las cabeceras de nuestro archivo Excel/CSV
    const headers = [
        { label: "Nombre Completo", key: "name" },
        { label: "Correo Electrónico", key: "email" },
        { label: "Teléfono", key: "phone" },
        { label: "País", key: "country" },
        { label: "Fecha de Registro", key: "registrationDate" }
    ];

    // 2. Preparamos los datos usando TODOS los registros (no solo los de la página actual)
    const dataForExport = registrations.map(reg => ({
        name: reg.name,
        email: reg.email,
        phone: reg.phone,
        country: countryNames[reg.country] || reg.country,
        registrationDate: reg.registrationDate
    }));

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#" className="fw-bold" style={{ color: '#D4AF37' }}>INNOVATECORP - Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="admin-navbar-nav" />
                    <Navbar.Collapse id="admin-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Button variant="outline-danger" size="sm" onClick={onLogout}>Cerrar Sesión</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-white mb-0">Registros de Clientes Potenciales</h2>
                    {/* --- BOTÓN DE EXPORTACIÓN --- */}
                    <CSVLink 
                        data={dataForExport} 
                        headers={headers}
                        filename={"registros-inversiones.csv"}
                        className="btn btn-success"
                        target="_blank"
                    >
                        📊 Exportar a Excel
                    </CSVLink>
                </div>
                <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre Completo</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Fecha de Registro</th>
                            <th>País</th>
                            {/* --- SE AÑADE LA COLUMNA 'ACCIONES' Y SE QUITAN LAS OTRAS --- */}
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((reg, index) => (
                            <tr key={reg.id}>
                                <td>{indexOfFirstRecord + index + 1}</td>
                                <td>{reg.name}</td>
                                <td>{reg.email}</td>
                                <td>{reg.phone}</td>
                                <td>{reg.registrationDate}</td>
                                <td>{countryNames[reg.country] || reg.country}</td>
                                {/* --- SE AÑADE LA CELDA CON EL BOTÓN DE ELIMINAR --- */}
                                <td className="text-center">
                                    <Button variant="danger" size="sm" onClick={() => onDelete(reg.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {totalPages > 1 && (
                    <Pagination className="justify-content-center">
                        <Pagination.Prev onClick={() => setCurrentPage(p => p > 1 ? p - 1 : p)} disabled={currentPage === 1} />
                        {paginationItems}
                        <Pagination.Next onClick={() => setCurrentPage(p => p < totalPages ? p + 1 : p)} disabled={currentPage === totalPages} />
                    </Pagination>
                )}
            </Container>
        </>
    );
};

// --- Sub-componente: Formulario de Login (Conectado a Firebase) ---
const AdminLogin = ({ onLogin, isLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Llamamos a la función handleLogin que está en el componente padre
        onLogin(email, password, setError);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card bg="dark" text="white" style={{ width: '25rem' }} className="shadow-lg">
                <Card.Body className="p-5">
                    <Card.Title className="text-center mb-4"><h2 style={{ color: '#D4AF37' }}>Acceso de Administrador</h2></Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"><Form.Label>Usuario (Email)</Form.Label><Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-container-dark" disabled={isLoading}/></Form.Group>
                        <Form.Group className="mb-4"><Form.Label>Contraseña</Form.Label><Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-container-dark" disabled={isLoading}/></Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                        <Button type="submit" className="w-100 p-2 mt-3 btn-gold" size="lg" disabled={isLoading}>{isLoading ? <Spinner animation="border" size="sm" /> : 'Ingresar'}</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

// --- Componente Principal de la Página de Admin (Maneja toda la lógica) ---
function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Esta función maneja tanto el login como la carga de datos
    const handleLogin = async (email, password, setErrorCallback) => {
        setLoading(true);
        setErrorCallback('');
        try {
            // 1. Intenta iniciar sesión
            await signInWithEmailAndPassword(auth, email, password);
            
            // 2. Si el login es exitoso, busca los datos de Firestore
            const q = query(collection(db, "registrations"), orderBy("registrationDate", "desc"));
            const querySnapshot = await getDocs(q);
            
            const regsList = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Se convierte la fecha a un string legible aquí para evitar errores de renderizado
                    registrationDate: data.registrationDate 
                        ? data.registrationDate.toDate().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })
                        : 'N/A'
                };
            });
            
            setRegistrations(regsList);
            setIsAuthenticated(true); // Solo se autentica si todo fue exitoso

        } catch (err) {
            setErrorCallback("Usuario o contraseña incorrectos.");
        }
        setLoading(false);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setRegistrations([]); // Limpia los datos al salir
    };

    // --- NUEVA FUNCIÓN PARA ELIMINAR REGISTROS ---
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este registro? Esta acción es irreversible.")) {
            try {
                const docRef = doc(db, "registrations", id);
                await deleteDoc(docRef);
                // Actualiza el estado para reflejar el cambio en la UI sin recargar
                setRegistrations(registrations.filter(reg => reg.id !== id));
            } catch (error) {
                console.error("Error al eliminar el registro: ", error);
                alert("Hubo un error al eliminar el registro.");
            }
        }
    };
    
    return (
        <>
            {isAuthenticated ? (
                // --- SE PASA LA FUNCIÓN onDelete AL DASHBOARD ---
                <AdminDashboard registrations={registrations} onLogout={handleLogout} onDelete={handleDelete} />
            ) : (
                <AdminLogin onLogin={handleLogin} isLoading={loading} />
            )}
        </>
    );
}

export default AdminPage;