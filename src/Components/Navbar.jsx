import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import Search from './Search'
import logo from '../Images/logo.svg'
import { connect } from 'react-redux'
import Logout from './Logout'
import { withRouter } from "react-router-dom"
import banner from '../Images/banner1.png'

const Navbar = ({ currentUser }) => {

  let handleItemClick

  const [activeItem, setActiveItem] = useState({})

  handleItemClick = (e, name ) => {
    setActiveItem(name)
  }

  return (
    <>
      <Menu color='olive' stackable id='navbar'>
        <Menu.Item
          as={NavLink}
          exact to='/'
          id='nav-home'
          name='home'
          onClick={handleItemClick}
          active={activeItem === 'home'}
        >
          <img src={logo} alt='Logo'/>
        </Menu.Item>
        <Image 
          as={NavLink}
          src={banner} 
          alt='Banner'
          to='/about'
          className='banner'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            as={NavLink}
            to='/map'
            id='nav-map'
            name='adventure map'
            active={activeItem === 'adventure map'}
            onClick={handleItemClick}
          />
          {currentUser.isSignedIn && (
          <Menu.Item 
            as={NavLink}
            to='/create'
            id='nav-create'
            name='create your adventure'
            active={activeItem === 'create your adventure'}
            onClick={handleItemClick}
          />
          )}
          {currentUser.isSignedIn && (
            <Menu.Item 
              as={NavLink}
              to={`/user/${currentUser.attributes.name}`}
              id='nav-profile'
              name='profile'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
            />
          )}
          {window.location.pathname !== '/search' && (
            <Search />
          )}
          {currentUser.isSignedIn ? (
            <Logout 
              onClick={handleItemClick}
              active={activeItem === 'logout'}
              name='logout'
            />
          ) : (
            <Menu.Item
              as={NavLink}
              to='/login'
              id='nav-login'
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
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
)(withRouter(Navbar))
