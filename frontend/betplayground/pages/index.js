import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Welcome to betPlayground!</a>
        </h1>
        <form>
          <label for="minBound">Choose a min bound for Spread:</label>
          <select id="minBound" name="minBound">
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
          </select>
          <label for="maxBound">Choose a max bound for Spread:</label>
          <select id="maxBound" name="maxBound">
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
          </select>
          <label for="pointsTeased">Choose how many points to tease:</label>
          <select id="pointsTeased" name="pointsTeased">
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <input type="submit"/>
        </form>
      </main>
    </div>
  )
}
