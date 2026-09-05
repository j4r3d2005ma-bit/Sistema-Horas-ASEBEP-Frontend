import NavbarPublico from '../components/NavbarPublico';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import '../styles/PreguntasFrecuentes.css';

export default function PreguntasFrecuentes() {
    const navigate = useNavigate();

    // Estado para controlar qué pregunta frecuente está abierta
    const [abiertaIndex, setAbiertaIndex] = useState(null);

    const togglePregunta = (index) => {
        setAbiertaIndex(abiertaIndex === index ? null : index);
    };

    const preguntasFrecuentes = [
        {
            pregunta: "¿Qué pasa si repruebo una clase o mi índice académico baja?",
            respuesta: "La VOAE realiza un seguimiento académico constante. Mantener el estatus de 'Becario Activo' exige cumplir con los requisitos e índices mínimos establecidos por la universidad. Si tu rendimiento baja o repruebas materias, la institución evaluará tu continuidad y podrías correr el riesgo de perder el beneficio."
        },
        {
            pregunta: "¿Cómo se registran y validan mis horas beca?",
            respuesta: "Tras participar en las actividades institucionales correspondientes, debes llenar los formularios oficiales de asistencia. Posteriormente, la junta directiva se encarga de revisar, verificar y aprobar dichos registros para actualizar tu contador de horas acumuladas y pendientes en el portal."
        },
        {
            pregunta: "¿Cómo puedo saber si mis aportaciones mensuales están al día?",
            respuesta: "En tu panel privado cuentas con un apartado visual dedicado a las aportaciones y multas. Allí la junta directiva actualiza el registro de tus entregas mensuales. Si existe algún retraso o penalización interna por comité, lo verás reflejado directamente en esta sección."
        },
        {
            pregunta: "¿Puedo postularme a una beca si soy de primer ingreso o de reingreso?",
            respuesta: "Sí. A través del módulo público del portal puedes consultar las guías, categorías de ayuda y los requisitos oficiales exigidos por la VOAE para saber cuándo se abren los periodos de postulación para nuevos estudiantes."
        },
        {
            pregunta: "¿Qué debo hacer si mis datos personales o carrera no aparecen correctos en la sección 'Mi Perfil'?",
            respuesta: "Tus datos como el número de cuenta, nombre y correo institucional están vinculados directamente a tu expediente oficial en la UNAH. Si notas alguna discrepancia o error de visualización, debes comunicarte de inmediato con los administradores o la junta directiva para solicitar la corrección en el sistema."
        }
    ];

    return (
        <div className="faq-container">
            <NavbarPublico />

            <main className="faq-main">
                
                {/* ENCABEZADO */}
                <div className="faq-header animar-entrada">
                    <span className="faq-badge">
                        Portal ASEBEP - UNAH
                    </span>
                    <h1 className="faq-title">
                        Preguntas Frecuentes
                    </h1>
                    <p className="faq-subtitle">
                        Encuentra respuestas claras a las dudas más comunes sobre el proceso de becas, gestión de horas, aportaciones y lineamientos de la VOAE.
                    </p>
                </div>

                {/* LISTA DE ACORDEONES FAQ */}
                <div className="animar-entrada faq-list-wrapper">
                    {preguntasFrecuentes.map((item, index) => {
                        const estaAbierta = abiertaIndex === index;
                        return (
                            <div 
                                key={index}
                                className="faq-item"
                                onClick={() => togglePregunta(index)}
                                style={{ 
                                    borderLeft: estaAbierta ? '4px solid #2563eb' : '4px solid transparent'
                                }}
                            >
                                <div className="faq-question-box">
                                    <h3 className="faq-question-title">
                                        {item.pregunta}
                                    </h3>
                                    <span 
                                        className="faq-icon"
                                        style={{ transform: estaAbierta ? 'rotate(45deg)' : 'rotate(0deg)' }}
                                    >
                                        +
                                    </span>
                                </div>
                                {estaAbierta && (
                                    <div className="faq-answer-box">
                                        <p className="faq-answer-text">
                                            {item.respuesta}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* LLAMADO A LA ACCIÓN */}
                <div className="cta-box-faq">
                    <h3 className="cta-title-faq">¿Tienes alguna otra duda o consulta específica?</h3>
                    <p className="cta-text-faq">
                        Puedes regresar a explorar los beneficios o comunicarte directamente con los encargados de la organización.
                    </p>
                    <button 
                        onClick={() => navigate('/beneficios')}
                        className="cta-button-faq"
                    >
                        Ver Beneficios Disponibles
                    </button>
                </div>

            </main>
        </div>
    );
}