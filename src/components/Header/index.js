import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
        </div>
        <div className="home-jobs-link-container">
          <Link to="/" className="home-jobs-link">
            <p>Home</p>
          </Link>
          {/* <Link> */}
          <p>Jobs</p>
          {/* </Link> */}
        </div>
        <div>
          <button
            type="button"
            className="logout-button"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
