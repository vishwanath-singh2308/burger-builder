import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from "../../hoc/Auxiliary"
import Burger from '../../components/Layout/Burger/Burger'
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls'
import Modal from '../../components/Layout/UI/Modal/Modal'
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/Layout/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-b384e-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data});
        //     })
        //     .catch(
        //         error=>{this.setState({error:true})}
        //     )
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((Sum, el) => {
                return Sum + el;
            }, 0);
        return sum > 0 ;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceReduction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceReduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        

        // const queryParams = [];

        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push('/checkout');

    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary=null;
        let burger =this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>
                
            );

            orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));