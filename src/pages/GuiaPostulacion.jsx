import NavbarPublico from '../components/NavbarPublico';
import '../styles/GuiaPostulacion.css';

export default function GuiaPostulacion() {
    return (
        <div className="guiapostulacion-container">
            <NavbarPublico />

            <main className="guiapostulacion-main">
                
                {/* ENCABEZADO */}
                <div className="guiapostulacion-header animar-entrada">
                    <span className="guiapostulacion-badge">
                        Proceso Oficial - VOAE
                    </span>
                    <h1 className="guiapostulacion-title">
                        Guía para Aplicar a Becas y Ayudas Financieras
                    </h1>
                    <p className="guiapostulacion-subtitle">
                        Estamos aquí para acompañarte. Conoce el paso a paso en línea, los requisitos generales y los criterios específicos de cada programa para que completes tu postulación de forma exitosa.
                    </p>
                </div>

                {/* PASOS PARA APLICAR */}
                <div className="animar-entrada section-box">
                    <h2 className="section-box-title">
                        📋 Pasos para Realizar tu Solicitud en Línea
                    </h2>
                    
                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <p className="step-text"><strong>Ingresa a la plataforma:</strong> Inicia sesión en el Sistema de Registro de la UNAH con tu número de cuenta y contraseña personal.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">2</div>
                            <p className="step-text"><strong>Menú de Solicitudes:</strong> Dirígete al apartado de “Solicitudes” ubicado dentro del menú principal de tu perfil.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">3</div>
                            <p className="step-text"><strong>Selecciona tu alternativa:</strong> Haz clic en “Solicitud de becas” al final del listado y escoge la opción que mejor se adapte a tus metas, ya sea excelencia académica o un apoyo de bienestar.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">4</div>
                            <p className="step-text"><strong>Completa el formulario:</strong> Rellena los campos con tus datos actualizados y adjunta los documentos requeridos, como tu Forma 003 e historial de calificaciones.</p>
                        </div>
                    </div>
                </div>

                {/* REQUISITOS GENERALES */}
                <div className="section-box section-box-border-left">
                    <h2 className="section-box-title">
                        ✅ Requisitos Generales de Elegibilidad
                    </h2>
                    <ul className="general-list">
                        <li className="general-list-item">Estar debidamente matriculado en el período académico vigente dentro de la UNAH.</li>
                        <li className="general-list-item">Contar con un correo institucional activo para recibir notificaciones importantes.</li>
                        <li className="general-list-item">Mantener un índice académico acorde a la categoría que deseas solicitar (por lo general, mayor o igual al 80% para excelencia, o el promedio de permanencia requerido para ayudas socioeconómicas).</li>
                        <li>Presentar las constancias oficiales que respalden tanto tu rendimiento académico como tu situación socioeconómica, en caso de que aplique.</li>
                    </ul>
                </div>

                {/* SECCIÓN DE REQUISITOS ESPECÍFICOS POR MODALIDAD */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 className="specific-section-title">
                        Requisitos Específicos por Categoría
                    </h2>

                    <div className="specific-grid">
                        
                        {/* 1. EXCELENCIA ACADÉMICA */}
                        <div className="requisito-card card-border-blue">
                            <span className="card-tag-blue">Modalidad Académica</span>
                            <h3 className="card-title">Becas Excelencia Académica</h3>
                            <p className="card-desc">Para optar a esta beca, además de cumplir con los lineamientos generales, deberás considerar lo siguiente:</p>
                            <ul className="card-list">
                                <li className="card-list-item">Si eres de <strong>primer ingreso</strong>, necesitarás un índice de excelencia igual o superior al <strong>85%</strong> en tu educación media (nivel diversificado).</li>
                                <li className="card-list-item">Si eres estudiante de <strong>reingreso regular</strong>, se requiere un índice global del <strong>80%</strong> con un mínimo de diez (10) asignaturas aprobadas en el año académico anterior (o las exigidas por tu plan de estudios), sujeto a las valoraciones del comité.</li>
                                <li className="card-list-item">Para estudiantes regulares con discapacidad, el requisito será haber aprobado un mínimo de siete (7) asignaturas en el año anterior.</li>
                                <li>Deberás matricular una carga mínima por período de <strong>4 asignaturas</strong> (en el caso de estudiantes con discapacidad, 3 asignaturas o lo que estipule tu plan de estudios).</li>
                            </ul>
                        </div>

                        {/* 2. REPRESENTACIÓN ARTÍSTICA Y DEPORTIVA */}
                        <div className="requisito-card card-border-dark">
                            <span className="card-tag-dark">Talento y Rendimiento</span>
                            <h3 className="card-title">Becas por Representación Artística y Deportiva</h3>
                            <p className="card-desc">Además de los requisitos generales, los aspirantes a esta beca deberán cumplir con:</p>
                            <ul className="card-list">
                                <li className="card-list-item">Ser un miembro activo en agrupaciones artísticas o disciplinas deportivas registradas en la VOAE, respaldado por una acreditación mínima de un año emitida por tu director o entrenador, y refrendada por el PROCAD.</li>
                                <li className="card-list-item">Tener un mínimo de diez (10) asignaturas aprobadas en el año anterior o las requeridas por la coordinación académica de tu carrera, salvo excepciones aprobadas por el comité.</li>
                                <li className="card-list-item">Mantener un rendimiento académico mínimo de <strong>70%</strong> en cada período cursado.</li>
                                <li>Cursar una carga académica mínima de <strong>4 asignaturas</strong> por periodo (3 asignaturas para estudiantes con discapacidad o según su plan de estudios).</li>
                            </ul>
                        </div>

                        {/* 3. EQUIDAD ALMA MATER Y SOCIAL */}
                        <div className="requisito-card card-border-light-blue">
                            <span className="card-tag-primary-blue">Apoyo Socioeconómico</span>
                            <h3 className="card-title">Beca de Equidad Alma Mater y Equidad Social</h3>
                            <p className="card-desc">Aparte de los lineamientos generales, para esta categoría se toma en cuenta lo siguiente:</p>
                            <ul className="card-list">
                                <li className="card-list-item">Poseer un índice académico igual o superior al promedio de permanencia, habiendo aprobado al menos diez (10) asignaturas el año previo, sujeto a las consideraciones especiales del comité.</li>
                                <li className="card-list-item">Asumir el compromiso institucional de ir mejorando progresivamente tu rendimiento académico ciclo a ciclo.</li>
                                <li className="card-list-item">Presentar cualquier constancia o documento complementario que el PASEE considere necesario.</li>
                                <li>Llevar una carga académica mínima de <strong>cuatro (4) asignaturas</strong> por período (tres (3) para estudiantes con discapacidad o conforme lo exija su carrera).</li>
                            </ul>
                        </div>

                        {/* 4. PATROCINIO EXTERNO */}
                        <div className="requisito-card card-border-gray">
                            <span className="card-tag-gray">Convenios</span>
                            <h3 className="card-title">Beca de Patrocinio Externo</h3>
                            <p className="card-desc" style={{ marginBottom: 0, lineHeight: '1.7' }}>
                                Los criterios y pautas de elegibilidad estarán estrictamente condicionados a lo establecido en los convenios de cooperación firmados por la UNAH con instituciones públicas o privadas, organismos nacionales e internacionales, o personas naturales y jurídicas.
                            </p>
                        </div>

                        {/* 5. MOVILIDAD ESTUDIANTIL */}
                        <div className="requisito-card card-border-blue">
                            <span className="card-tag-blue">Ayuda Financiera</span>
                            <h3 className="card-title">Ayuda Financiera por Movilidad Estudiantil</h3>
                            <p className="card-desc">Si buscas un impulso para tus experiencias de intercambio o giras, debes cumplir con:</p>
                            <ul className="card-list">
                                <li className="card-list-item">Estar registrado como estudiante regular y mantener matrícula activa en el período en curso.</li>
                                <li className="card-list-item">Tener un índice académico del período igual o superior al promedio de permanencia institucional.</li>
                                <li>Contar con el aval o visto bueno de la unidad académica que promueve tu participación.</li>
                            </ul>
                        </div>

                        {/* 6. PROGRAMA MI BIENESTAR */}
                        <div className="requisito-card card-border-dark">
                            <span className="card-tag-dark">Ayuda Financiera</span>
                            <h3 className="card-title">Ayudas Financieras del Programa “Mi Bienestar”</h3>
                            <p className="card-desc">Para acceder a este subsidio de apoyo directo, se requiere:</p>
                            <ul className="card-list">
                                <li className="card-list-item">Ser estudiante regular y encontrarte matriculado oficialmente en el período académico vigente.</li>
                                <li className="card-list-item">Poseer un índice de período igual o superior al promedio de permanencia establecido.</li>
                                <li>Evidenciar debidamente la situación emergente, necesidad o propósito por el cual solicitas el bono, estipendio o subsidio.</li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* LLAMADO A LA ACCIÓN / SOPORTE */}
                <div className="cta-box-guia">
                    <h3 className="cta-title-guia">¿Tienes dudas con tu proceso?</h3>
                    <p className="cta-text-guia">
                        Recuerda que también puedes consultar directamente los comunicados oficiales y reglamentos vigentes en el portal de la Vicerrectoría de Orientación y Asuntos Estudiantiles (VOAE).
                    </p>
                    <a 
                        href="https://voae.unah.edu.hn" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cta-button-guia"
                    >
                        Visitar Sitio Oficial VOAE
                    </a>
                </div>

            </main>
        </div>
    );
}