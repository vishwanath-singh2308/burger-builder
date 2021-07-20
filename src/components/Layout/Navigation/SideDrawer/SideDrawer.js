import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../../hoc/Auxiliary'
const sideDrawer = (props) => {
    let attatchedClasses=[classes.SideDrawer, classes.Close];
    if(props.open){
        attatchedClasses=[classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attatchedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>

    );
}


export default sideDrawer;
