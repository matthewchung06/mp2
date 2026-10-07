import { Link, useParams } from 'react-router-dom'
import type { Pokemon } from './api'
import styles from './DetailView.module.css'

function DetailView({ pokemon }: { pokemon: Pokemon[] }) {
  const { id } = useParams()
  const index = pokemon.findIndex((p) => p.id === Number(id))

  if (index === -1) {
    return (
      <p className={styles.missing}>
        No Pokemon with that number. <Link to="/">Back to search</Link>
      </p>
    )
  }

  const poke = pokemon[index]
  // wrap around so the first one goes back to the last
  const prev = pokemon[(index - 1 + pokemon.length) % pokemon.length]
  const next = pokemon[(index + 1) % pokemon.length]

  return (
    <div className={styles.detail}>
      <div className={styles.buttons}>
        <Link to={`/pokemon/${prev.id}`}>&larr; {prev.name}</Link>
        <Link to={`/pokemon/${next.id}`}>{next.name} &rarr;</Link>
      </div>

      <div className={styles.card}>
        <img src={poke.image} alt={poke.name} />
        <div>
          <h2>
            {poke.name} <span className={styles.number}>#{poke.id}</span>
          </h2>
          <p>Type: {poke.types.join(', ')}</p>
          <p>Height: {poke.height / 10} m</p>
          <p>Weight: {poke.weight / 10} kg</p>
          <p>Base experience: {poke.baseExperience}</p>

          <ul className={styles.stats}>
            {poke.stats.map((stat) => (
              <li key={stat.name}>
                <span>{stat.name}</span>
                <span>{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DetailView
