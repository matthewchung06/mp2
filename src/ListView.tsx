import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Pokemon } from './api'
import styles from './ListView.module.css'

type SortKey = 'id' | 'name' | 'weight'

function ListView({ pokemon }: { pokemon: Pokemon[] }) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [asc, setAsc] = useState(true)

  const results = pokemon
    .filter((p) => p.name.includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      // sort by whichever property is picked in the dropdown
      let order = 0
      if (sortKey === 'id') order = a.id - b.id
      else if (sortKey === 'weight') order = a.weight - b.weight
      else order = a.name.localeCompare(b.name)
      return asc ? order : -order
    })

  return (
    <div>
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label>
          Sort by
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="id">Number</option><option value="name">Name</option><option value="weight">Weight</option>
          </select>
        </label>
        <label>
          Order
          <select value={String(asc)} onChange={(e) => setAsc(e.target.value === 'true')}>
            <option value="true">Ascending</option><option value="false">Descending</option>
          </select>
        </label>
      </div>

      <p className={styles.count}>{results.length} results</p>

      <ul className={styles.list}>
        {results.map((p) => (
          <li key={p.id}>
            <Link to={`/pokemon/${p.id}`} className={styles.row}>
              <span className={styles.number}>#{p.id}</span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.types}>{p.types.join(', ')}</span>
              <span>{p.weight / 10} kg</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListView
