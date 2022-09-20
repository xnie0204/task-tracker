import React from 'react'
import PropTypes from "prop-types"
import Button from './Button'
import { useLocation } from 'react-router'

const Header = ({title,onAdd,showAdd, theme}) => {
    // const onClick = () => {
    //     console.log('Click')
    // }
    const location = useLocation()

  return (
    <header>
        <h1 style={{color: theme === "light"? "black": "white"}}>{title}</h1>
        {location.pathname === '/' &&(
        <Button color = {showAdd ? 'red' : 'green'}
                text = {showAdd ? 'close' : 'Add'}
                //onAdd here is a function
                onClick = {onAdd}/>)}
        
    </header>
  )
}

//this is default, can be covered
Header.defaultProps = {
    title: "Task Tracker",
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

//CSS in JX
const headingStyle = {
    // color:"red", 
    // backgroundColor:"black"
}
export default Header