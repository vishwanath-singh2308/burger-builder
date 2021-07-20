import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">BurgerBuilder</NavigationItem>
        {props.isAuthenticated?<NavigationItem link="/orders">Orders</NavigationItem>:null}
        {!props.isAuthenticated?<NavigationItem link="/auth">SignIn</NavigationItem>:<NavigationItem link="/logout">Signout</NavigationItem>}
    </ul>
);
    

export default navigationItems
