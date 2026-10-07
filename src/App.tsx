import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { fetchPokemon, type Pokemon } from './api'
import ListView from './ListView'
import GalleryView from './GalleryView'
import DetailView from './DetailView'
import styles from './App.module.css'

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPokemon()
      .then(setPokemon)
      .catch(() => setError('There was an error loading the Pokemon. Try refreshing the page.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Kanto Pokedex</h1>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.tab} ${styles.active}` : styles.tab)} end>
            Search
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => (isActive ? `${styles.tab} ${styles.active}` : styles.tab)}>
            Gallery
          </NavLink>
        </nav>
      </header>

      {loading && <p className={styles.message}>Loading Pokemon...</p>}
      {error && <p className={styles.message}>{error}</p>}

      {!loading && !error && (
        <Routes>
          <Route path="/" element={<ListView pokemon={pokemon} />} />
          <Route path="/gallery" element={<GalleryView pokemon={pokemon} />} />
          <Route path="/pokemon/:id" element={<DetailView pokemon={pokemon} />} />
        </Routes>
      )}
    </div>
  )
}

export default App