import { AsyncStorage } from 'react-native'
import { now } from 'moment';
const initialData = {
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
}

export async function loadInitialData() {
    await AsyncStorage.clear()

    Object.values(initialData).map((deck) => {
        addCompleteDeck(deck)
    })
    return getDecks()
}

export function getDecks() {
    var completeDecks

    return AsyncStorage.getAllKeys()
        .then((keys) => {
            return AsyncStorage.multiGet(keys)
                .then((allDecks) => {
                    allDecks.map((result, i, decks) => {
                        let key = decks[i][0];
                        let value = (decks[i][1]) ? JSON.parse(decks[i][1]) : {}
                        completeDecks = {
                            ...completeDecks,
                            [key]: value
                        }
                    })
                    return completeDecks
                })
        })
}

export function removeDeck(key) {
    return AsyncStorage.removeItem(key, (err) => {
        (err) && console.log(err)
    }).then(() => getDecks())
}

export function saveDeckTitle(title) {
    let newDeck = {
        title,
        questions: []
    }
    return AsyncStorage.setItem(title, JSON.stringify(newDeck))
        .then(() => {
            console.log("title saved")
            return newDeck
        })
}



export function getDeck(key) {
    return AsyncStorage.getItem(key, (err, result) => {
        return JSON.parse(result)
    });
}



export function addCardToDeck(title, card) {
    AsyncStorage.getItem(title, (err, result) => {
        const newData = JSON.parse(result)

        newData.questions.push(card)

        AsyncStorage.mergeItem(title, JSON.stringify(newData), () => {
            console.log("new card added")
        })


    });
}

function addCompleteDeck(deck) {
    AsyncStorage.setItem(deck.title, JSON.stringify(deck), () => {
        console.log("complete deck saved")
    })
}