import React, { Component } from 'react'
import Input from '../../components/Layout/UI/Input/Input'
import Button from '../../components/Layout/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/Layout/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {updateObject, checkValidity} from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup:true
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName.validation]),
                touched: true
            })
        })
        this.setState({controls: updatedControls})
    }

    submitHandler =(event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null

        if(this.props.error){
            errorMessage =(
                <p>{this.props.error.message}</p>
            )
        }

        let authRediect = null

        if(this.props.isAuthenticated){
            authRediect=<Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRediect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        SUBMIT
                    </Button>
                </form>
                <Button clicked={this.switchAuthModeHandler}btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN': 'SIGNOUT'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
