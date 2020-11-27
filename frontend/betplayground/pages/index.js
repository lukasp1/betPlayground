import Head from 'next/head'
import React from 'react'
import ResultContainer from './resultContainer'
import styles from '../styles/Home.module.css'
import axios from 'axios'
const BASE_URL = 'http://localhost:5000'

var positiveOccurences = []
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {minBound: 6, maxBound: 7, pointsTeased: 6, elements: [], totalOccurences: "", totalPositiveOccurences: "", positiveOccurenceRatio: "", positiveOccurenceRatioTwoTimes: "", positiveOccurenceRatioThreeTimes: "", homeFavoritesOnly: false};
  }

  handleClick = (e) =>  {
      // Change the url here, i.e. should be http://3.138.134.6/ on node, and http://localhost/ locally
      let targetUrl = BASE_URL;
      targetUrl += this.state.homeFavoritesOnly ? '/historicHomeFavoriteTeaserOccurences' : '/historicTeaserOccurences';
      axios.post(targetUrl, {
          min: this.state.minBound,
          max: this.state.maxBound,
          pointsTeased: this.state.pointsTeased
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }}).then(res => {
        this.state.elements = []
        this.state.totalOccurences = res.data.totalOccurences
        this.setState({totalOccurences: res.data.totalOccurences});
        this.setState({totalPositiveOccurences: res.data.totalPositiveOccurences});
        this.setState({positiveOccurenceRatio: res.data.positiveOccurenceRatio});
        this.setState({positiveOccurenceRatioTwoTimes: res.data.positiveOccurenceRatioTwoTimes});
        this.setState({positiveOccurenceRatioThreeTimes: res.data.positiveOccurenceRatioThreeTimes});
        positiveOccurences = res.data["positiveOccurences"]
        // Make into a for each loop
        for(let i = 0; i < positiveOccurences.length; i++) {
          this.state.elements.push(
            <ResultContainer closingSpread={positiveOccurences[i]["closingSpread"]} pointDifferential={positiveOccurences[i]["pointDifferential"]} didCover={positiveOccurences[i]["didCover"].toString()} />
          );
        }
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

  changeHomeFavoritesOnly = (e) => {
      this.setState({homeFavoritesOnly: event.target.checked});
  }

  render() {
    return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Welcome to betPlayground!</a>
        </h1>
        <form>
          <label htmlFor="minBound">Choose a min bound for Spread:</label>
          <select id="minBound" name="minBound" value={this.state.minBound} onChange={this.changeMinBound}>
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
          </select>
          <label htmlFor="maxBound">Choose a max bound for Spread:</label>
          <select id="maxBound" name="maxBound" value={this.state.maxBound} onChange={this.changeMaxBound}>
            <option value="6">6</option>
            <option value="6.5">6.5</option>
            <option value="7">7</option>
            <option value="7.5">7.5</option>
          </select>
          <label htmlFor="pointsTeased">Choose how many points to tease:</label>
          <select id="pointsTeased" name="pointsTeased" value={this.state.pointsTeased} onChange={this.changePointsTeased}>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
          <label> Choose if you only want home favorites:
            <input name="isGoing" type="checkbox" onChange={this.changeHomeFavoritesOnly} />
          </label>
          <button type="button" onClick={this.handleClick}>Save</button>
        </form>
        <div>
          <p> Total Occurences: {this.state.totalOccurences}</p>
          <p> Total Positive Occurences (# of times teased bet hit): {this.state.totalPositiveOccurences} </p>
          <p> Implied Probability of positive occurence happening: {this.state.positiveOccurenceRatio} </p>
          <p> Implied Probability of 2 positive occurences happening: {this.state.positiveOccurenceRatioTwoTimes} </p>
          <p> Implied Probability of 3 positive occurences happening: {this.state.positiveOccurenceRatioThreeTimes} </p>
        </div>
      </main>
    </div>
  )
  }
}

export default Home;
