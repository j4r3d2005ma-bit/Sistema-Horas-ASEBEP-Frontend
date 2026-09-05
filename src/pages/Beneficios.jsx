import NavbarPublico from '../components/NavbarPublico';
import imgBeneficios from '../assets/img_beneficios_heroes.jpg';
import { useNavigate } from 'react-router';
import '../styles/Beneficios.css'; // Asegúrate de importar tu CSS aquí

export default function Beneficios() {
    const navigate = useNavigate();

    return (
        <div className="beneficios-container">
            <NavbarPublico />

            <main className="animate-fade-up beneficios-main">
                
                {/* SECCIÓN HERO CON IMAGEN MÁS GRANDE Y COMPLETA */}
                <div className="beneficios-hero">
                    
                    {/* CONTENEDOR IZQUIERDO (TEXTO) */}
                    <div className="beneficios-hero-text">
                        <span className="beneficios-badge">
                            Ventajas para becarios
                        </span>
                        <h1 className="beneficios-title">
                            Beneficios y Ayudas Financieras - ASEBEP
                        </h1>
                        <p className="beneficios-description">
                            Descubre el respaldo institucional diseñado para impulsar tu rendimiento académico. Conoce las exenciones, apoyos y facilidades orientadas a garantizar tu permanencia y éxito universitario en la UNAH.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                                onClick={() => navigate('/guia-postulacion')}
                                className="beneficios-btn-guia"
                            >
                                Ver Guía de Postulación
                            </button>
                        </div>
                    </div>

                    {/* CONTENEDOR DERECHO (IMAGEN MÁS GRANDE Y FLOTANTE) */}
                    <div className="floating-image beneficios-hero-img-wrapper">
                        <div className="beneficios-img-box">
                            <img 
                                src={imgBeneficios} 
                                alt="Estudiantes beneficiarios ASEBEP" 
                                className="beneficios-img" 
                            />
                        </div>
                    </div>

                </div>

                {/* SECCIÓN INFORMATIVA INFERIOR CON AYUDAS FINANCIERAS Y EFECTO FLOTANTE */}
                <div className="beneficios-section-inferior">
                    
                    {/* ENCABEZADO DE AYUDAS FINANCIERAS */}
                    <div className="beneficios-header-finanzas">
                        <h2>
                            Ayudas Financieras
                        </h2>
                        <p>
                            Se consideran los bonos, subsidios o estipendios brindados a estudiantes, que les permita cubrir necesidades puntuales y situaciones emergentes, siendo las siguientes:
                        </p>
                    </div>

                    {/* TARJETAS DINÁMICAS Y FLOTANTES */}
                    <div className="beneficios-grid">
                        
                        {/* Tarjeta 1 */}
                        <div className="benefit-card floating-card-1 beneficios-card-base card-border-blue">
                            <div>
                                <span className="badge-blue">
                                    MOVILIDAD
                                </span>
                                <h3 className="beneficios-card-title">
                                    Ayuda Financiera por Movilidad Estudiantil
                                </h3>
                                <p className="beneficios-card-text">
                                    Asignación única para cubrir un porcentaje o la totalidad de los gastos para participar en giras académicas a nivel nacional o internacional, subsidio de pasajes aéreos, inscripción en seminarios, talleres, congresos, ligas deportivas, festivales artísticos, culturales, voluntariado, elecciones estudiantiles y emprendimiento presencial o virtual.
                                </p>
                            </div>
                            <div className="beneficios-card-footer">
                                ✓ Sujeto a presupuesto VOAE y PASEE
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="benefit-card floating-card-2 beneficios-card-base card-border-dark">
                            <div>
                                <span className="badge-dark">
                                    MI BIENESTAR
                                </span>
                                <h3 className="beneficios-card-title">
                                    Ayudas Financieras Programa "Mi Bienestar"
                                </h3>
                                <p className="beneficios-card-text" style={{ marginBottom: '1rem' }}>
                                    Apoyos específicos orientados al bienestar estudiantil gestionados a través del comité correspondiente:
                                </p>
                                <ul className="beneficios-list">
                                    <li><strong>Alimentación:</strong> Cubrir comedor universitario u otra estrategia del comité.</li>
                                    <li><strong>Transporte:</strong> Gastos de transporte otorgados por estrategia definida.</li>
                                    <li><strong>Didáctico:</strong> Compra de materiales educativos en librería universitaria.</li>
                                </ul>
                            </div>
                            <div className="beneficios-card-footer">
                                ✓ Programa 2025-2027 UNAH
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="benefit-card floating-card-3 beneficios-card-base card-border-light-blue">
                            <div>
                                <span className="badge-light-blue">
                                    SOPORTE
                                </span>
                                <h3 className="beneficios-card-title">
                                    Acompañamiento Integral
                                </h3>
                                <p className="beneficios-card-text">
                                    Seguimiento personalizado de tu expediente estudiantil, historial de calificaciones y estatus activo de tu beca para garantizar tu permanencia y graduación exitosa en la institución.
                                </p>
                            </div>
                            <div className="beneficios-card-footer">
                                ✓ Evaluación y asesoría continua
                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}