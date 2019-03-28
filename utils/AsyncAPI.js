import { AsyncStorage, Platform } from 'react-native'
import {
    Constants,
    Notifications,
    Permissions
} from 'expo'

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
        return result
    });
}



export function addCardToDeck(title, card) {
    return getDeck(title)
        .then((deck) => {

            let deckObj = JSON.parse(deck)
            deckObj.questions.push(card)
            return AsyncStorage.mergeItem(title, JSON.stringify(deckObj))
                .then((err) => {
                    console.log("new card added", err)
                    return deckObj
                })
        })
}

function addCompleteDeck(deck) {
    AsyncStorage.setItem(deck.title, JSON.stringify(deck), () => {
        console.log("complete deck saved")
    })
}

export function markDateAsQuizAttempted() {
    let currentDate = new Date()
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} `

    AsyncStorage.setItem('dateLatestAttempted', currentDate)
}

export function chkForQuizAttemptedToday() {
    let currentDate = new Date()
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} `

    return AsyncStorage.getItem('dateLatestAttempted', (err, result) => {
        return (result === currentDate) ? true : false
    });
}

export function initiateLocalNotification() {

    Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
            if (Constants.isDevice && status === 'granted') {
                console.log('Notification permissions granted.')

                const handleNotification = ({ notificationId }) => {

                    this.chkForQuizAttemptedToday()
                        .then((result) => {
                            (result) && Notifications.dismissNotificationAsync(notificationId)
                            console.log("quiz attempted", result)
                        })
                }

                Notifications.addListener(handleNotification);

                if (Platform.OS === 'android') {
                    Notifications.createChannelAndroidAsync('quiz-local-reminder', {
                        name: 'quiz-local-reminder',
                        sound: true,
                        vibrate: true,
                        priority: 'max',
                    })
                    console.log("channel created for android")
                }

                const localNotification = {
                    title: 'Reminder for quiz',
                    body: "Hey!, Is everything fine today? You haven't attemeted any quiz today " + new Date(),
                    ios: { sound: true, },
                    android: {
                        channelId: 'quiz-local-reminder',
                        color: '#001057',
                    }
                };

                const schedulingOptions = {
                    time: (new Date()).getTime(),
                    repeat: 'minute'  //'minute', 'hour', 'day', 'week', 'month', or 'year'.
                }

                Notifications.scheduleLocalNotificationAsync(
                    localNotification, schedulingOptions
                );
                console.log("All done, notification scheduled successfully")
            }
        })
}
