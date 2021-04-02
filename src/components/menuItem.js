import React from 'react'
import { CreateLocalLink } from "../utils"


const MenuItem = ({ menuItem, wordPressUrl }) => {
    return (
        <li>
            <a href={CreateLocalLink(menuItem, wordPressUrl)}>{menuItem.label}</a> 
        </li> 
    )
}

export default MenuItem