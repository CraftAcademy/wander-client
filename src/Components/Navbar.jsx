import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navbar = () => {
  return (
    <>
      <Menu stackable id='navbar'>
        <Menu.Item>
          <NavLink id='nav-home' to='/'>Home</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink id='nav-create' to='/create'>Create Trail</NavLink>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default Navbar
