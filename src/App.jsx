import React, { useState } from 'react';

// --- ICONOS SVG ---
const Icons = {
  Sparkles: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  )
};

// --- DATOS DE LOS SERVICIOS ---
const SERVICIOS = [
  {
    id: 'faciales',
    categoria: 'Cuidado Facial',
    items: [
      { id: 'f1', nombre: 'Limpieza Profunda e Hidratación', duracion: '60 min', precio: 35000, desc: 'Exfoliación con punta de diamante, extracción de impurezas y mascarilla hidratante de papaya y colágeno.' },
      { id: 'f2', nombre: 'Facial Glow Anti-Edad', duracion: '75 min', precio: 48000, desc: 'Tratamiento rejuvenecedor con ácido hialurónico, sueros concentrados y terapia de luz LED.' }
    ]
  },
  {
    id: 'masajes',
    categoria: 'Masajes Corporales',
    items: [
      { id: 'm1', nombre: 'Masaje Relajante de Aromaterapia', duracion: '60 min', precio: 38000, desc: 'Técnica suave con aceites esenciales orgánicos para liberar la tensión y reducir el estrés.' },
      { id: 'm2', nombre: 'Masaje Descontracturante Profundo', duracion: '60 min', precio: 42000, desc: 'Enfocado en aliviar nudos musculares en espalda, cuello y hombros mediante presión firme.' }
    ]
  },
  {
    id: 'corporales',
    categoria: 'Tratamientos Corporales',
    items: [
      { id: 'c1', nombre: 'Exfoliación Corporal Papaya Scrub', duracion: '45 min', precio: 30000, desc: 'Renovación de la piel con semillas de papaya y aceites nutritivos de almendra.' },
      { id: 'c2', nombre: 'Envoltorio Detox con Barro Mineral', duracion: '60 min', precio: 45000, desc: 'Mascarilla corporal purificante que desintoxica, tonifica y suaviza la piel al instante.' }
    ]
  }
];

export default function App() {
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '',
    notas: ''
  });
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!servicioSeleccionado) {
      alert('Por favor selecciona un servicio antes de confirmar.');
      return;
    }
    setReservaConfirmada(true);
  };

  return (
    <div className="app-container">
      {/* ESTILOS EN CSS EMBEBIDOS */}
      <style>{`
        :root {
          --color-papaya: #ff8c42;
          --color-papaya-light: #fff3eb;
          --color-cream: #fbf8f5;
          --color-brown-light: #8c6d58;
          --color-brown-dark: #3d261a;
          --color-brown-accent: #5c3a28;
          --font-main: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: var(--font-main);
          background-color: var(--color-cream);
          color: var(--color-brown-dark);
          line-height: 1.6;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header / Nav */
        .navbar {
          background-color: #ffffff;
          border-bottom: 2px solid var(--color-papaya-light);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(61, 38, 26, 0.05);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-brown-dark);
        }

        .brand-icon {
          color: var(--color-papaya);
          display: flex;
        }

        .nav-link {
          background-color: var(--color-papaya);
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s;
        }

        .nav-link:hover {
          background-color: #e0742f;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, var(--color-papaya-light) 0%, var(--color-cream) 100%);
          padding: 5rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 140, 66, 0.2);
        }

        .hero h1 {
          font-size: 2.8rem;
          color: var(--color-brown-dark);
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          color: var(--color-brown-light);
          max-width: 600px;
          margin: 0 auto 2rem auto;
        }

        /* Layout Principal */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 900px) {
          .main-content {
            grid-template-columns: 1.4fr 1fr;
          }
        }

        /* Tarjetas de Servicios */
        .section-title {
          font-size: 1.8rem;
          color: var(--color-brown-dark);
          margin-bottom: 1.5rem;
          border-bottom: 3px solid var(--color-papaya);
          display: inline-block;
          padding-bottom: 0.3rem;
        }

        .category-block {
          margin-bottom: 2.5rem;
        }

        .category-name {
          font-size: 1.3rem;
          color: var(--color-brown-accent);
          margin-bottom: 1rem;
        }

        .service-card {
          background: white;
          border: 1px solid rgba(140, 109, 88, 0.15);
          border-radius: 12px;
          padding: 1.2rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 140, 66, 0.15);
          border-color: var(--color-papaya);
        }

        .service-card.selected {
          border: 2px solid var(--color-papaya);
          background-color: var(--color-papaya-light);
        }

        .service-info h4 {
          font-size: 1.1rem;
          color: var(--color-brown-dark);
        }

        .service-info p {
          font-size: 0.9rem;
          color: var(--color-brown-light);
          margin-top: 0.3rem;
        }

        .service-duration {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: var(--color-brown-light);
          margin-top: 0.5rem;
        }

        .service-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-papaya);
          white-space: nowrap;
        }

        /* Formulario de Citas */
        .booking-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(61, 38, 26, 0.08);
          border: 1px solid rgba(255, 140, 66, 0.2);
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
          color: var(--color-brown-dark);
        }

        .form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--color-papaya);
        }

        .btn-primary {
          width: 100%;
          background-color: var(--color-brown-dark);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          background-color: var(--color-brown-accent);
        }

        .success-box {
          background-color: var(--color-papaya-light);
          border: 1px solid var(--color-papaya);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .success-box h3 {
          color: var(--color-brown-dark);
          margin-bottom: 0.5rem;
        }

        /* Footer */
        .footer {
          background-color: var(--color-brown-dark);
          color: var(--color-cream);
          text-align: center;
          padding: 2rem;
          margin-top: auto;
        }

        .footer p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>

      {/* Navegación */}
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon"><Icons.Sparkles /></span>
          <span>Aura Spa & Wellness</span>
        </div>
        <a href="#agendar" className="nav-link">Reservar Cita</a>
      </nav>

      {/* Hero Header */}
      <header className="hero">
        <h1>Renueva tu cuerpo y mente</h1>
        <p>Un santuario de tranquilidad donde el bienestar y la estética avanzada se unen para consentirte.</p>
      </header>

      {/* Contenido Principal */}
      <main className="main-content">
        {/* Lista de Servicios */}
        <section>
          <h2 className="section-title">Nuestros Servicios</h2>

          {SERVICIOS.map((cat) => (
            <div key={cat.id} className="category-block">
              <h3 className="category-name">{cat.categoria}</h3>
              {cat.items.map((serv) => (
                <div
                  key={serv.id}
                  className={`service-card ${servicioSeleccionado === serv.nombre ? 'selected' : ''}`}
                  onClick={() => setServicioSeleccionado(serv.nombre)}
                >
                  <div className="service-info">
                    <h4>{serv.nombre}</h4>
                    <p>{serv.desc}</p>
                    <span className="service-duration">
                      <Icons.Clock /> {serv.duracion}
                    </span>
                  </div>
                  <div className="service-price">
                    ₡{serv.precio.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Formulario de Reserva */}
        <section id="agendar">
          <div className="booking-card">
            <h2 className="section-title" style={{ marginTop: 0 }}>Agendar Cita</h2>

            {reservaConfirmada ? (
              <div className="success-box">
                <div style={{ color: 'var(--color-papaya)', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <Icons.CheckCircle />
                </div>
                <h3>¡Cita Reservada!</h3>
                <p>Gracias <strong>{formData.nombre}</strong>. Hemos agendado tu cita para el tratamiento <strong>{servicioSeleccionado}</strong> el día <strong>{formData.fecha}</strong> a las <strong>{formData.hora}</strong>.</p>
                <button
                  className="btn-primary"
                  style={{ marginTop: '1rem', backgroundColor: 'var(--color-papaya)' }}
                  onClick={() => { setReservaConfirmada(false); setServicioSeleccionado(''); }}
                >
                  Agendar otra cita
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Servicio Seleccionado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={servicioSeleccionado || 'Selecciona un servicio de la lista'}
                    readOnly
                    style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                  />
                </div>

                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Ej. María Rodríguez"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono de Contacto</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    placeholder="Ej. 8888-8888"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Fecha deseada</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Hora deseada</label>
                  <input
                    type="time"
                    className="form-control"
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Confirmar Reserva de Cita
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Pie de Página */}
      <footer className="footer">
        <div className="brand" style={{ justifyContent: 'center', color: 'var(--color-cream)', marginBottom: '0.5rem' }}>
          <span className="brand-icon"><Icons.Sparkles /></span>
          <span>Aura Spa & Wellness</span>
        </div>
        <p>Horarios: Lunes a Sábado de 9:00 am a 7:00 pm | Reservas: +506 8888-8888</p>
        <p>© 2026 Aura Spa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}