import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
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
        <Menu.Item 
          position='right'
          as={NavLink}
          to='create'
          id='nav-create'
          name='Create Trail'
        />
      </Menu>
    </>
  )
}

export default Navbar
