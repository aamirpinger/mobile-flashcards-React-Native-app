import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    ProgressBarAndroid
} from 'react-native'


class ShowResult extends Component {

    componentDidMount() {
        AsyncAPI.markDateAsQuizAttempted()
    }

    render() {
        const { totalQuestions, correctCount, deck, restartQuiz, navigation } = props
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, color: '#001057', marginBottom: 30, alignItems: 'flex-start', textAlign: 'left', justifyContent: 'flex-start' }}>
                    {`Quiz Result ${(correctCount / totalQuestions) * 100}%`}
                </Text>
                <Text style={{ fontSize: 20, color: '#001057', marginBottom: 30, textAlign: 'center' }}>
                    {
                        `Total ${correctCount} question(s) answered correctlty out of total ${totalQuestions} questions(s)`
                    }
                </Text>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={restartQuiz}
                    >
                        <Text style={{ fontSize: 15, color: 'yellow' }}>
                            RESTART QUIZ
                    </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ fontSize: 15, color: 'yellow' }}>
                            GOTO DECK
                    </Text>
                    </TouchableHighlight>

                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        margin: 20,
        height: 50,
        // borderRadius: 100,
        alignItems: 'center',
        backgroundColor: '#001057',
        borderBottomColor: 'orange',
        borderWidth: 4,
        padding: 8,
        justifyContent: 'center',
    },
})

export default withNavigation(ShowResult)