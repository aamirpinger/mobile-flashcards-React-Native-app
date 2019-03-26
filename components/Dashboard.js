import React, { Component, Fragment } from 'react';
// import TabNavigator from '../routes'
import StackNavigator from '../routes/DeckRoute'
import { View, AsyncStorage } from 'react-native'
import Statusbar from './Statusbar'
import NavigationService from './NavigationService';
import * as AsyncAPI from '../utils/AsyncAPI'
import { NavigationActions, navigation } from 'react-navigation';

class Dashboard extends Component {
    state = {
        decks: {}
    }

    handleNewDeckSubmition = (title) => {
        // deckTemplate = {
        //     [title]: {
        //         title,
        //         questions: [],
        //     }
        // }

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

        // AsyncStorage.mergeItem('decks', JSON.stringify(deckTemplate), () => {
        //     AsyncStorage.getItem('decks', (err, result) => {
        //         this.setState(() => ({
        //             decks: JSON.parse(result),
        //         }))
        //         //navigation.navigate('Deck', { deck: deck })
        //         console.log(this.state.decks[deckName], "dddddddaaaaaaaaaaaasssssssssssssssssssssshhhhhhh")

        //         NavigationService.navigate('Deck', { deck: this.state.decks[deckName] });
        //     })
        // })



    }

    handleDeckDelete = (deckName) => {

        AsyncAPI.removeDeck(deckName)
            .then((decks) => {
                this.setState({ decks })

                this.navigator && this.navigator.dispatch(
                    NavigationActions.navigate({ routeName: 'Decks' })
                );
            })


        // AsyncStorage.getItem("decks", (err, result) => {
        //     let newObjState = JSON.parse(result)
        //     delete newObjState[deckName]
        //     AsyncStorage.removeItem("decks", (err) => {
        //         AsyncStorage.setItem("decks", JSON.stringify(newObjState), () => {
        //             this.setState({ decks: newObjState })
        //             NavigationService.navigate('Decks')
        //         })
        //     })

        // })
    }

    initialData = () => {
        // //AsyncStorage.setItem("decks", ["aamir", "pinger", "irfan", "ali", "afzal", "khan", "qassim", "ali", "danish", "aamir", "pinger", "irfan", "ali", "afzal", "khan", "qassim", "ali", "danish"])

        AsyncAPI.loadInitialData()
            .then((decks) => {
                this.setState({ decks })
            })
    }


    componentDidMount() {
        this.initialData()
    }

    render() {
        console.log(this.state, "stattttttttttttttttteeeeeeeeee")
        return (
            <Fragment>
                <Statusbar backgroundColor='#001057'
                    barStyle='light-content' />
                <StackNavigator
                    screenProps={{
                        decks: this.state.decks,
                        handleNewDeckSubmition: this.handleNewDeckSubmition,
                        handleDeckDelete: this.handleDeckDelete,
                    }}
                    ref={nav => { this.navigator = nav }}

                // ref={navigatorRef => {
                //     NavigationService.setTopLevelNavigator(navigatorRef);
                // }}
                />
            </Fragment>
        );
    }
}

export default Dashboard;