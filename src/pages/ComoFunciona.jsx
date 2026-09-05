import NavbarPublico from '../components/NavbarPublico';
import { useNavigate } from 'react-router';
import '../styles/ComoFunciona.css';

export default function ComoFunciona() {
    const navigate = useNavigate();

    return (
        <div className="comofunciona-container">
            <NavbarPublico />

            <main className="comofunciona-main">
                
                {/* ENCABEZADO */}
                <div className="comofunciona-header animar-entrada">
                    <span className="comofunciona-badge">
                        Portal ASEBEP - UNAH
                    </span>
                    <h1 className="comofunciona-title">
                        ¿Cómo Funciona la Plataforma?
                    </h1>
                    <p className="comofunciona-subtitle">
                        ASEBEP está estructurado para atender dos propósitos claros: orientar de forma pública a cualquier estudiante interesado y ofrecer un espacio de gestión exclusivo para los becarios activos.
                    </p>
                </div>

                {/* SECCIÓN 1: EL PORTAL PÚBLICO (INFORMACIÓN Y GUÍAS) */}
                <div className="animar-entrada section-wrapper">
                    <div className="section-title-container">
                        <div className="icon-box-blue">🌐</div>
                        <h2 className="section-main-title">
                            1. Módulo Público: Abierto a Toda la Comunidad Estudiantil
                        </h2>
                    </div>
                    <p className="section-desc">
                        Cualquier alumno de la UNAH (incluso si aún no cuenta con una beca) puede ingresar libremente a estas secciones para informarse:
                    </p>

                    <div className="grid-2-cols">
                        
                        <div className="feature-card card-border-blue card-padding-lg">
                            <h3 className="card-title-lg">Consulta de Beneficios</h3>
                            <p className="card-text-lg">
                                Explora con total libertad las categorías de becas y ayudas financieras disponibles para saber cuál se adapta mejor a tu perfil académico.
                            </p>
                        </div>

                        <div className="feature-card card-border-blue card-padding-lg">
                            <h3 className="card-title-lg">Guías y Requisitos Oficiales</h3>
                            <p className="card-text-lg">
                                Conoce los criterios de elegibilidad de la VOAE y el paso a paso institucional para postularte correctamente en los periodos habilitados.
                            </p>
                        </div>

                    </div>
                </div>

                {/* SECCIÓN 2: EL PANEL PRIVADO */}
                <div className="section-wrapper">
                    <div className="section-title-container">
                        <div className="icon-box-dark">🔒</div>
                        <h2 className="section-main-title">
                            2. Módulo Privado: Lo que Verás al Iniciar Sesión como Becario
                        </h2>
                    </div>
                    <p className="section-desc">
                        Al ingresar con tus credenciales institucionales, el sistema despliega un entorno de control dividido en dos secciones fundamentales para tu seguimiento:
                    </p>

                    {/* SUB-BLOQUE A: PANEL PRINCIPAL */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 className="subsection-title">
                            📊 A. Panel Principal (Gestión de Horas y Aportaciones)
                        </h3>
                        <div className="grid-2-cols-tight">
                            
                            <div className="feature-card card-border-blue card-padding-md">
                                <h4 className="card-title-sm">Progreso de Horas Beca</h4>
                                <p className="card-text-sm">
                                    Visualiza barras de progreso con tus horas acumuladas y pendientes. La <strong>junta directiva</strong> valida este avance tras verificar los formularios llenados en actividades institucionales.
                                </p>
                            </div>

                            <div className="feature-card card-border-blue card-padding-md">
                                <h4 className="card-title-sm">Aportaciones y Multas</h4>
                                <p className="card-text-sm">
                                    Apartado visual para comprobar si tus aportaciones mensuales están al día y recibir avisos directos sobre multas o penalizaciones aplicadas por el comité.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* SUB-BLOQUE B: SECCIÓN MI PERFIL */}
                    <div>
                        <h3 className="subsection-title">
                            👤 B. Sección "Mi Perfil" (Expediente e Identidad Institucional)
                        </h3>
                        <div className="grid-2-cols-tight">
                            
                            <div className="feature-card card-border-dark card-padding-md">
                                <h4 className="card-title-sm">Validación de Identidad y Carrera</h4>
                                <p className="card-text-sm">
                                    Esta sección consolida tu registro oficial ante la universidad. Muestra tu nombre completo, número de cuenta y carrera para asegurar que toda tu gestión esté vinculada al expediente correcto. Asimismo, integra tu correo institucional y datos de contacto, los cuales son indispensables para que la directiva y los administradores puedan comunicarse contigo de forma directa ante cualquier aviso importante o cambio en tus asignaciones.
                                </p>
                            </div>

                            <div className="feature-card card-border-dark card-padding-md">
                                <h4 className="card-title-sm">Estatus Oficial y Criterios VOAE</h4>
                                <p className="card-text-sm">
                                    La etiqueta de <strong>"Becario Activo"</strong> y el cuadro azul inferior funcionan como tu constancia digital de vigencia. Este estatus no es solo estético: depende directamente del seguimiento académico continuo que realiza la <strong>VOAE</strong> y del cumplimiento de tus obligaciones. Ver este indicador te confirma que mantienes tus derechos y beneficios activos sin riesgo de suspensiones por parte de la vicerrectoría.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* LLAMADO A LA ACCIÓN */}
                <div className="cta-box">
                    <h3 className="cta-title">¿Todo claro sobre el funcionamiento y vistas del sistema?</h3>
                    <p className="cta-text">
                        Ya puedes explorar los beneficios disponibles o pasar a la última sección de preguntas frecuentes.
                    </p>
                    <button 
                        onClick={() => navigate('/beneficios')}
                        className="cta-button"
                    >
                        Ver Beneficios Disponibles
                    </button>
                </div>

            </main>
        </div>
    );
}