import React, { Component, Fragment } from 'react';
import StackNavigator from '../routes/DeckRoute'
import Statusbar from './Statusbar'
import * as AsyncAPI from '../utils/AsyncAPI'
import { NavigationActions, navigation } from 'react-navigation';

class Dashboard extends Component {
    state = {
        decks: {}
    }

    handleNewDeckSubmition = (title) => {
        return AsyncAPI.saveDeckTitle(title)
            .then((newDeck) => {
                this.setState((prevState) => ({
                    decks: {
                        ...prevState.decks,
                        [title]: newDeck
                    }
                }))
                return newDeck
            })
    }
    handleNewQuestionSubmition = (title, card) => {
        return AsyncAPI.addCardToDeck(title, card)
            .then((newDeck) => {
                this.setState((prevState) => ({
                    decks: {
                        ...prevState.decks,
                        [title]: newDeck
                    }
                }))
                return newDeck
            })
    }


    handleDeckDelete = (deckName) => {
        AsyncAPI.removeDeck(deckName)
            .then((decks) => {
                this.setState({ decks })

                this.navigator && this.navigator.dispatch(
                    NavigationActions.navigate({ routeName: 'Decks' })
                );
            })
    }

    initialData = () => {
        AsyncAPI.loadInitialData()
            .then((decks) => {
                this.setState({ decks })
            })
    }


    componentDidMount() {
        this.initialData()
        AsyncAPI.initiateLocalNotification()
    }

    render() {
        return (
            <Fragment>
                <Statusbar backgroundColor='#001057'
                    barStyle='light-content' />
                <StackNavigator
                    screenProps={{
                        decks: this.state.decks,
                        handleNewDeckSubmition: this.handleNewDeckSubmition,
                        handleDeckDelete: this.handleDeckDelete,
                        handleNewQuestionSubmition: this.handleNewQuestionSubmition
                    }}
                    ref={nav => { this.navigator = nav }}
                />
            </Fragment>
        );
    }
}

export default Dashboard;