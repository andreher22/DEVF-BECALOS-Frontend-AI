import { useCallback, useReducer, useRef, useState } from 'react'
import './App.css'

const initialProducts = [
  { id: 1, name: 'Auriculares', stock: 5, category: 'Audio' },
  { id: 2, name: 'Cargador', stock: 3, category: 'Accesorios' },
]

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          id: Date.now(),
          name: action.payload.name,
          stock: action.payload.stock,
          category: action.payload.category,
        },
      ]
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload.id)
    case 'ADJUST_STOCK':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, stock: Math.max(0, item.stock + action.payload.delta) }
          : item,
      )
    default:
      return state
  }
}

function App() {
  const [products, dispatch] = useReducer(inventoryReducer, initialProducts)
  const [formData, setFormData] = useState({ name: '', stock: '1', category: 'General' })
  const nameInputRef = useRef(null)

  const totalUnits = products.reduce((total, product) => total + product.stock, 0)

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }, [])

  const handleAddProduct = useCallback(
    (event) => {
      event.preventDefault()
      const trimmedName = formData.name.trim()

      if (!trimmedName) {
        nameInputRef.current?.focus()
        return
      }

      dispatch({
        type: 'ADD_ITEM',
        payload: {
          name: trimmedName,
          stock: Number(formData.stock) || 1,
          category: formData.category,
        },
      })

      setFormData({ name: '', stock: '1', category: 'General' })
      nameInputRef.current?.focus()
    },
    [formData.category, formData.name, formData.stock],
  )

  const handleRemoveProduct = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }, [])

  const handleAdjustStock = useCallback((id, delta) => {
    dispatch({ type: 'ADJUST_STOCK', payload: { id, delta } })
  }, [])

  return (
    <main className="app-shell">
      <section className="panel hero-panel">
        <p className="eyebrow">Taller de hooks avanzados</p>
        <h1>Gestor de inventario con useReducer, useRef y useCallback</h1>
        <p className="description">
          Aquí puedes agregar productos, controlar su stock y ver cómo el estado complejo
          queda organizado con un reducer.
        </p>
      </section>

      <section className="panel form-panel">
        <form className="inventory-form" onSubmit={handleAddProduct}>
          <label>
            Producto
            <input
              ref={nameInputRef}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej. Mochila"
            />
          </label>

          <label>
            Stock
            <input
              name="stock"
              type="number"
              min="1"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Categoría
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="General">General</option>
              <option value="Audio">Audio</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Tecnología">Tecnología</option>
            </select>
          </label>

          <button type="submit">Agregar producto</button>
        </form>
      </section>

      <section className="panel stats-panel">
        <div className="stat-card">
          <span>Total de productos</span>
          <strong>{products.length}</strong>
        </div>
        <div className="stat-card">
          <span>Unidades en stock</span>
          <strong>{totalUnits}</strong>
        </div>
      </section>

      <section className="panel list-panel">
        <ul className="inventory-list">
          {products.map((product) => (
            <li key={product.id} className="inventory-item">
              <div className="item-info">
                <h2>{product.name}</h2>
                <p>{product.category}</p>
              </div>

              <div className="stock-control">
                <span>Stock: {product.stock}</span>
                <div className="actions">
                  <button type="button" onClick={() => handleAdjustStock(product.id, -1)}>
                    -
                  </button>
                  <button type="button" onClick={() => handleAdjustStock(product.id, 1)}>
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveProduct(product.id)}
              >
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
