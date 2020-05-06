import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/authentication'
class Header extends Component {


    render() {
        const guestLink = (
            <ul className="navbar-nav mt-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to='/register' className='nav-link' >Register</Link>
                </li>
                <li className="nav-item">
                    <Link to='/login' className='nav-link' >Login</Link>
                </li>
            </ul>
        )
        const authenticate = (
            <ul className="navbar-nav mt-auto mt-2 mt-lg-0">
                <span className='navbar-text mr-3'>
                    <strong>
                        {this.props.auth.user ? `${this.props.auth.user.username}` : ''}
                    </strong>

                </span>
                <button onClick={this.props.logout} className='nav-link btn btn-info btn-sm text-light '>
                    LogOut
                </button>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="">Lead Manger</a>
                        {this.props.auth.isAuthenticated ? authenticate : guestLink}
                    </div>
                </div>
            </nav>

        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Header)