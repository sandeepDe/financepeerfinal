import {Component} from 'react'

// import {Container, Row, Col, Form, Button} from 'react-bootstrap'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import loginPic from '../Images/user.svg'
import userImg from '../Images/login.svg'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

class LoginForm extends Component {
  state = {
    username: 'girish',
    password: 'girish@1',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'https://financepeerassignment.herokuapp.com/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(userdetails),
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        this.onSubmitSuccess(data.jwt_token)
      })
      .catch(() => {
        this.onSubmitFailure('Invalid Username / Password')
      })
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field form-control"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field form-control"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img src={userImg} className="login-image" alt="website login" />
        <form className="form-container" onSubmit={this.submitForm}>
          <img alt="icon" className="icon-img" src={loginPic} />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
