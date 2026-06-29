import './App.css'

const skills = ['React', 'JavaScript', 'CSS', 'UX']

function ProfileHeader() {
  return (
    <div className="card__header">
      <div className="avatar">AD</div>
      <div>
        <p className="eyebrow">Frontend Developer</p>
        <h1>Ana Díaz</h1>
        <p className="subtitle">Creo interfaces claras, rápidas y con enfoque en la experiencia del usuario.</p>
      </div>
    </div>
  )
}

function SkillList() {
  return (
    <ul className="skills">
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <ProfileHeader />

        <div className="card__body">
          <h2>Sobre mí</h2>
          <p>
            Me encanta transformar ideas en experiencias web modernas. Disfruto trabajar con componentes,
            JSX y diseño que se vea bien tanto en móvil como en escritorio.
          </p>

          <h2>Habilidades</h2>
          <SkillList />
        </div>

        <div className="card__footer">
          <a href="mailto:ana@example.com">ana@example.com</a>
          <span>Ciudad de México</span>
        </div>
      </section>
    </main>
  )
}

export default App
