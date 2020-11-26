import React from 'react'
import styles from '../styles/ResultContainer.module.css'

class ResultContainer extends React.Component {
  render() {
    return (
      <div class="myDiv">
        <p className={styles.container}>Closing Spread: {this.props.closingSpread}, Point Differential {this.props.pointDifferential}, Covered? {this.props.didCover}</p>
      </div>
    )
  }
}

export default ResultContainer;
