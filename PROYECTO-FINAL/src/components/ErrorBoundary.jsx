import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Error no controlado en la interfaz:', error, info)
  }

  handleReset = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <section className="page">
          <h1>Algo salió mal</h1>
          <p className="status">
            Ocurrió un error inesperado en la aplicación. Puedes intentar
            de nuevo.
          </p>
          <p className="error">{this.state.error.message}</p>
          <button type="button" onClick={this.handleReset}>
            Reintentar
          </button>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
