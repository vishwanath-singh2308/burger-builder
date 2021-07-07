import React, { Component } from 'react'
import Aux from "../../hoc/Auxiliary"
import classes from './Layout.module.css'
import Toolbar from '../../components/Layout/Navigation/Toolbar/Toolbar'
import SideDrawer from '../Layout/Navigation/SideDrawer/SideDrawer'
class Layout extends Component {

    state={
        showSideDrawer:true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }



    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}

export default Layout;