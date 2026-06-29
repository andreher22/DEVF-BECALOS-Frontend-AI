import { useState } from 'react'
import './App.css'

function App() {
  const [product, setProduct] = useState('')
  const [items, setItems] = useState(['Leche', 'Pan', 'Huevos'])

  const handleAdd = (event) => {
    event.preventDefault()

    if (product.trim() === '') return

    setItems([...items, product.trim()])
    setProduct('')
  }

  const handleRemove = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove))
  }

  return (
    <main className="app-shell">
      <section className="shopping-card">
        <div className="shopping-card__header">
          <p className="eyebrow">Lista de compras</p>
          <h1>Mi súper mercado</h1>
          <p>Agrega productos y elimínalos cuando ya los tengas listos.</p>
        </div>

        <form className="shopping-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Agregar producto"
            value={product}
            onChange={(event) => setProduct(event.target.value)}
          />
          <button type="submit">Añadir</button>
        </form>

        <ul className="shopping-list">
          {items.map((item) => (
            <li key={item}>
              <span>{item}</span>
              <button type="button" onClick={() => handleRemove(item)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
