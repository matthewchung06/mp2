import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Pokemon } from './api'
import styles from './GalleryView.module.css'

function GalleryView({ pokemon }: { pokemon: Pokemon[] }) {
  const [selected, setSelected] = useState<string[]>([])

  const types: string[] = []
  pokemon.forEach((p) => p.types.forEach((t) => { if (!types.includes(t)) types.push(t) }))
  types.sort()

  const toggleType = (type: string) => {
    if (selected.includes(type)) setSelected(selected.filter((t) => t !== type))
    else setSelected([...selected, type])
  }

  const filtered = selected.length === 0 ? pokemon : pokemon.filter((p) => p.types.some((t) => selected.includes(t)))

  return (
    <div>
      <div className={styles.filters}>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            className={selected.includes(type) ? `${styles.filter} ${styles.on}` : styles.filter}
            onClick={() => toggleType(type)}
          >
            {type}
          </button>
        ))}
        {selected.length > 0 && (
          <button type="button" className={styles.clear} onClick={() => setSelected([])}>
            Clear
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <Link key={p.id} to={`/pokemon/${p.id}`} className={styles.card}>
            <img src={p.image} alt={p.name} loading="lazy" />
            <span>{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GalleryView
