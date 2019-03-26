import React, { Component, Fragment } from 'react';
// import TabNavigator from '../routes'
import StackNavigator from '../routes/DeckRoute'
import { View, AsyncStorage } from 'react-native'
import Statusbar from './Statusbar'
import NavigationService from './NavigationService';


class Dashboard extends Component {
    state = {
        decks: {}
    }

    handleNewDeckSubmition = (deckName) => {
        deckTemplate = {
            [deckName]: {
                title: deckName,
                questions: [],
            }
        }

        AsyncStorage.mergeItem('decks', JSON.stringify(deckTemplate), () => {
            AsyncStorage.getItem('decks', (err, result) => {
                this.setState(() => ({
                    decks: JSON.parse(result),
                }))
                //navigation.navigate('Deck', { deck: deck })
                console.log(this.state.decks[deckName], "dddddddaaaaaaaaaaaasssssssssssssssssssssshhhhhhh")

                NavigationService.navigate('Deck', { deck: this.state.decks[deckName] });
            })
        })



    }

    handleDeckDelete = (deckName) => {
        AsyncStorage.getItem("decks", (err, result) => {
            let newObjState = JSON.parse(result)
            delete newObjState[deckName]
            AsyncStorage.removeItem("decks", (err) => {
                AsyncStorage.setItem("decks", JSON.stringify(newObjState), () => {
                    this.setState({ decks: newObjState })
                    NavigationService.navigate('Decks')
                })
            })

        })

    }

    handleDataChange = (data) => {
        //AsyncStorage.setItem("decks", ["aamir", "pinger", "irfan", "ali", "afzal", "khan", "qassim", "ali", "danish", "aamir", "pinger", "irfan", "ali", "afzal", "khan", "qassim", "ali", "danish"])
        // AsyncStorage.clear()
        AsyncStorage.setItem("decks", JSON.stringify({
            React: {
                title: 'React',
                questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                ]
            },
            JavaScript: {
                title: 'JavaScript',
                questions: [
                    {
                        question: 'What is a closure?',
                        answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                ]
            }
        }), () => AsyncStorage.getItem('decks', (err, result) => {
            this.setState({
                decks: JSON.parse(result),
            })
        }))
    }


    componentDidMount() {
        this.handleDataChange()
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
                    }}
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }} />
            </Fragment>
        );
    }
}

export default Dashboard;