import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  loginSuccessful = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitLoginForm = async () => {
    const {username, password} = this.state
    console.log(username, password)
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data, response)
    if (response.ok) {
      const jwtToken = data.jwt_token
      this.setState({
        errorMsg: '',
      })
      this.loginSuccessful(jwtToken)
    } else {
      this.setState({
        errorMsg: data.error_msg,
      })
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUserNameField = () => (
    <div className="login-page-input-container">
      <label htmlFor="usernameInputEl" className="username-password-label-el">
        USERNAME
      </label>
      <br />
      <input
        type="text"
        id="usernameInputEl"
        className="username-password-input-el"
        onChange={this.onChangeUsername}
      />
    </div>
  )

  renderPasswordField = () => (
    <div className="login-page-input-container">
      <label htmlFor="passwordInputEl" className="username-password-label-el">
        PASSWORD
      </label>
      <br />
      <input
        type="password"
        id="passwordInputEl"
        className="username-password-input-el"
        onChange={this.onChangePassword}
      />
    </div>
  )

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-main-container">
        <div className="login-form-container">
          {/* <form> */}
          <div className="login-page-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-page-website-logo"
            />
          </div>

          <div className="login-page-input-button-elements">
            <div>{this.renderUserNameField()}</div>
            <div>{this.renderPasswordField()}</div>
            <div>
              <button
                type="submit"
                className="login-button"
                onClick={this.submitLoginForm}
              >
                Login
              </button>
              <p className="error-result">{errorMsg}</p>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    )
  }
}

export default LoginPage
