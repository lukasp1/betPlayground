import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

var positiveOccurences = []
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {minBound: 6, maxBound: 7, pointsTeased: 6, elements: []};
  }

  handleClick = (e) =>  {
      axios.post('http://localhost:5000/historicTeaserOccurences', {
          min: this.state.minBound,
          max: this.state.maxBound,
          pointsTeased: this.state.pointsTeased
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }}).then(res => {
        this.state.elements = []
        positiveOccurences = res.data["positiveOccurences"]
        // Make into a for each loop
        for(let i = 0; i < positiveOccurences.length; i++) {
          this.state.elements.push(
            <li key={i}> "Closing Spread:" {positiveOccurences[i]["closingSpread"]}, "Point Differential" {positiveOccurences[i]["pointDifferential"]}, "Did cover:" {positiveOccurences[i]["didCover"].toString()} </li>
          );
        }
        // Hacky?
        this.setState({state: this.state})
      }).catch(err => {
        console.log('error in request', err);
      });
  }

  changeMinBound = (e) =>{
      this.setState({minBound: event.target.value});
  }

  changeMaxBound = (e) =>{
      this.setState({maxBound: event.target.value});
  }

  changePointsTeased = (e) => {
      this.setState({pointsTeased: event.target.value});
  }

  render() {
    return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Welcome to betPlayground!</a>
        </h1>
        <form>
          <label for="minBound">Choose a min bound for Spread:</label>
          <select id="minBound" name="minBound" value={this.state.minBound} onChange={this.changeMinBound}>
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
          </select>
          <label for="maxBound">Choose a max bound for Spread:</label>
          <select id="maxBound" name="maxBound" value={this.state.maxBound} onChange={this.changeMaxBound}>
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
          </select>
          <label for="pointsTeased">Choose how many points to tease:</label>
          <select id="pointsTeased" name="pointsTeased" value={this.state.pointsTeased} onChange={this.changePointsTeased}>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <button onClick={this.handleClick()}>Save</button>
        </form>
        <div>
          {this.state.elements}
        </div>
      </main>
    </div>
  )
  }
}

export default Home;
