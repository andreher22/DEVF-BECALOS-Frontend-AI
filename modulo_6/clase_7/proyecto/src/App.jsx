import { BrowserRouter, NavLink, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

const appointments = [
  {
    id: 1,
    patient: 'Ana García',
    doctor: 'Dra. López',
    date: '2026-06-30',
    time: '09:30',
    specialty: 'Cardiología',
    status: 'Confirmada',
  },
  {
    id: 2,
    patient: 'Luis Mendoza',
    doctor: 'Dr. Ruiz',
    date: '2026-07-02',
    time: '11:00',
    specialty: 'Pediatría',
    status: 'Pendiente',
  },
  {
    id: 3,
    patient: 'Camila Torres',
    doctor: 'Dra. Vega',
    date: '2026-07-04',
    time: '14:15',
    specialty: 'Dermatología',
    status: 'Confirmada',
  },
]

function HomePage() {
  return (
    <section className="hero-card">
      <p className="eyebrow">React Router</p>
      <h1>Plataforma de gestión de citas médicas</h1>
      <p>
        Organiza tus consultas, consulta el estado de cada cita y accede al detalle con
        rutas dinámicas.
      </p>
      <nav className="nav-links">
        <NavLink to="/citas">Ver citas</NavLink>
        <NavLink to="/doctores">Doctores</NavLink>
      </nav>
    </section>
  )
}

function CitasPage() {
  return (
    <section className="content-card">
      <h2>Citas programadas</h2>
      <div className="card-grid">
        {appointments.map((appointment) => (
          <article key={appointment.id} className="info-card">
            <h3>{appointment.patient}</h3>
            <p>{appointment.specialty}</p>
            <p>{appointment.date} · {appointment.time}</p>
            <p>Doctor: {appointment.doctor}</p>
            <NavLink to={`/citas/${appointment.id}`}>Ver detalle</NavLink>
          </article>
        ))}
      </div>
    </section>
  )
}

function DoctoresPage() {
  return (
    <section className="content-card">
      <h2>Equipo médico</h2>
      <div className="card-grid">
        <article className="info-card">
          <h3>Dra. López</h3>
          <p>Cardiología</p>
        </article>
        <article className="info-card">
          <h3>Dr. Ruiz</h3>
          <p>Pediatría</p>
        </article>
        <article className="info-card">
          <h3>Dra. Vega</h3>
          <p>Dermatología</p>
        </article>
      </div>
    </section>
  )
}

function AppointmentDetailPage() {
  const { id } = useParams()
  const appointment = appointments.find((item) => item.id === Number(id))

  if (!appointment) {
    return (
      <section className="content-card">
        <h2>Cita no encontrada</h2>
        <p>La cita solicitada no existe.</p>
        <NavLink to="/citas">Volver a citas</NavLink>
      </section>
    )
  }

  return (
    <section className="content-card">
      <h2>Detalle de cita</h2>
      <article className="detail-card">
        <p><strong>Paciente:</strong> {appointment.patient}</p>
        <p><strong>Médico:</strong> {appointment.doctor}</p>
        <p><strong>Especialidad:</strong> {appointment.specialty}</p>
        <p><strong>Fecha:</strong> {appointment.date}</p>
        <p><strong>Hora:</strong> {appointment.time}</p>
        <p><strong>Estado:</strong> {appointment.status}</p>
        <NavLink to="/citas">Volver</NavLink>
      </article>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink to="/" className="brand">Clínica Salud</NavLink>
          <nav className="nav-links">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/citas">Citas</NavLink>
            <NavLink to="/doctores">Doctores</NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/citas" element={<CitasPage />} />
          <Route path="/citas/:id" element={<AppointmentDetailPage />} />
          <Route path="/doctores" element={<DoctoresPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
