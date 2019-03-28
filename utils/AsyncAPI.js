import {
    AsyncStorage,
    Platform
} from 'react-native'
import {
    Constants,
    Notifications,
    Permissions
} from 'expo'
import { appTheme } from '../utils/Helper';


export function loadInitialData() {
    return getDecks()
}

export function getDecks() {
    var completeDecks = {}
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
        (err) && console.log(err, "Error removing deck")
    }).then(() => getDecks())
}

export function saveDeckTitle(title) {
    return getDeck(title)
        .then((deck) => {
            let newDeck = (deck) ? JSON.parse(deck) : {
                title,
                questions: []
            }
            return AsyncStorage.setItem(title, JSON.stringify(newDeck))
                .then((err) => {
                    console.log("Deck Title saved")
                    return newDeck
                })
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
                    console.log("New card added", err)
                    return deckObj
                })
        })
}


export function markDateAsQuizAttempted() {
    let currentDate = new Date()
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
    AsyncStorage.setItem('dateLatestAttempted', JSON.stringify(currentDate))
        .then(() => console.log("Date marked as quiz attempted", currentDate))
}


export function chkForQuizAttemptedToday() {
    let currentDate = new Date()
    currentDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`

    return AsyncStorage.getItem('dateLatestAttempted', (err, result) => {
        return (JSON.parse(result) === currentDate) ? true : false
    })
}

export function initiateLocalNotification() {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
            if (Constants.isDevice && status === 'granted') {
                console.log('Notification permissions granted.')

                Notifications.cancelAllScheduledNotificationsAsync()
                    .then((result) => {
                        console.log("All notification cancelled initially", result)

                        const handleNotification = ({ notificationId }) => {
                            this.chkForQuizAttemptedToday()
                                .then((result) => {
                                    (result) && Notifications.dismissNotificationAsync(notificationId)
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
                            console.log("Channel created for android")
                        }

                        const currentDate = new Date()

                        const { themeBgColor } = appTheme

                        const localNotification = {
                            title: 'Reminder for quiz',
                            body: `Hey!, Is everything fine today? You haven't attemeted any quiz today!! Today is ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} `,
                            ios: { sound: true, },
                            android: {
                                channelId: 'quiz-local-reminder',
                                color: themeBgColor,
                            }
                        };

                        // Every evening 6 pm app will notify user if no quiz attempted that day
                        let notificationTime = new Date()
                        let currTime = notificationTime.getTime()
                        notificationTime.setHours(18, 0, 0)
                        scheduleTime = notificationTime.getTime()
                        if (currTime > scheduleTime) {
                            //if current time is > 6pm then it will schedule next notification for next day 6pm
                            scheduleTime = scheduleTime + 86400000
                        }

                        const schedulingOptions = {
                            time: scheduleTime,
                            repeat: 'day'
                        }

                        Notifications.scheduleLocalNotificationAsync(
                            localNotification, schedulingOptions
                        );
                        console.log("Notification scheduled successfully!")

                    })
            }

        })
}
