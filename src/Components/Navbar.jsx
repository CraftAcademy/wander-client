import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import Search from './Search'
import logo from '../Images/logo.svg'

const Navbar = () => {
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
            to='/create'
            id='nav-create'
            name='Create Trail'
          />
          <Search />
          <Menu.Item
            as={NavLink}
            to='/login'
            id='nav-login'
            name='Login'
          />
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default Navbar
