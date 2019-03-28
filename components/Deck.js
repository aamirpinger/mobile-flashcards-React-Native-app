import React, { Component } from 'react';
import { appTheme } from '../utils/Helper';
import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet
} from 'react-native'


class Deck extends Component {

    render() {
        const navigation = this.props.navigation
        const deck = navigation.getParam('deck')
        const { handleDeckDelete } = this.props.screenProps
        return (
            <View style={styles.root}>
                <Text style={styles.title}>
                    {deck.title}
                </Text>

                <Text style={styles.subHead}>
                    {deck.questions.length} cards
                </Text>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigation.navigate('AddCard', { title: deck.title })}
                >
                    <Text style={styles.buttonText}>
                        Add Card
                    </Text>
                </TouchableHighlight>


                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigation.navigate('StartQuiz', { deck, })}
                >
                    <Text style={styles.buttonText}>
                        Start Quiz
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => handleDeckDelete(deck.title)}
                >
                    <Text style={styles.buttonText}>
                        Delete
                    </Text>
                </TouchableHighlight>


            </View>
        );
    }
}

const { themeBgColor, lineColor } = appTheme
const styles = StyleSheet.create({
    button: {
        width: 150,
        margin: 20,
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: themeBgColor,
        borderBottomColor: lineColor,
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        textDecorationLine: 'underline',
        borderBottomColor: lineColor,
        borderBottomWidth: 2,
        borderTopColor: lineColor,
        borderTopWidth: 2,
        fontWeight: 'bold',
        color: themeBgColor,
        textAlign: 'center'
    },
    subHead: {
        fontSize: 25,
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    }

})
export default Deck
