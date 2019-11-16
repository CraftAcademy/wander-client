import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import Search from './Search'
import logo from '../Images/logo.svg'
import { connect } from 'react-redux'
import Logout from './Logout'
const Navbar = ({ currentUser }) => {
  return (
    <>
      <Menu stackable id='navbar'>
        <Menu.Item
          as={NavLink}
          to='/'
          id='nav-home'
        >
          <img src={logo} alt='Logo'/>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            as={NavLink}
            to='/map'
            id='nav-map'
            name='adventure map'
          />
          {currentUser.isSignedIn && (
          <Menu.Item 
            as={NavLink}
            to='/create'
            id='nav-create'
            name='create your adventure'
          />
          )}
          {currentUser.isSignedIn && (
            <Menu.Item 
              as={NavLink}
              to={`/user/${currentUser.attributes.name}`}
              id='nav-profile'
              name='profile'
            />
          )}
          <Search />

          {currentUser.isSignedIn ? (
            <Logout />
          ) : (
            <Menu.Item
              as={NavLink}
              to='/login'
              id='nav-login'
              name='login'
            />
          )}
        </Menu.Menu>
      </Menu>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(Navbar)
