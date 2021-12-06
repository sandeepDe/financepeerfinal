import {Component} from 'react'

import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

import Card from '../Card'

class Cards extends Component {
  state = {
    jsonData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://financepeerassignment.herokuapp.com/data'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    this.setState({jsonData: data, isLoading: false})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderLoader = () => (
    // FIX7: For the purpose of testing here testid attribute should be added with the value "loader"
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  goBackToHome = () => {
    const {history} = this.props

    history.replace('/')
  }

  render() {
    const {jsonData, isLoading} = this.state

    console.log(jsonData)

    return (
      <div className="bg-container">
        <div className="view-container">
          <button
            type="button"
            onClick={this.goBackToHome}
            className="mob-home"
          >
            Home
          </button>
          <button
            type="button"
            onClick={this.goBackToHome}
            className="backHome"
          >
            Go Back
          </button>

          <h1 className="nameEle">View Data</h1>

          <button
            type="button"
            className="backHome"
            onClick={this.onClickLogout}
          >
            Logout
          </button>

          <button
            type="button"
            className="mob-btn"
            onClick={this.onClickLogout}
          >
            logout
          </button>
        </div>

        {isLoading ? (
          this.renderLoader()
        ) : (
          <ul className="ul-element">
            {jsonData.map(each => (
              <Card each={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default withRouter(Cards)
