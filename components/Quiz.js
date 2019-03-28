import React, { Component } from 'react';
import ShowResult from './ShowResult'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
} from 'react-native'

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctCount: 0,
        faceUp: true,
    }

    static getDerivedStateFromProps(props) {
        const { deck } = props.navigation.state.params
        return { deck }
    }

    handleCorrect = () => {
        this.setState((prevState) => ({
            correctCount: ++prevState.correctCount,
            currentQuestion: ++prevState.currentQuestion
        }))
    }

    handleIncorrect = () => {
        this.setState((prevState) => ({
            currentQuestion: ++prevState.currentQuestion
        }))
    }

    toggleFace = () => {
        this.setState((prevState) => ({
            faceUp: !prevState.faceUp
        }))
    }

    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctCount: 0,
            faceUp: true,
        })
    }
    render() {
        const { currentQuestion } = this.state
        const totalQuestions = this.state.deck.questions.length
        const { question, answer } = (totalQuestions) && (currentQuestion < totalQuestions)
            ? this.state.deck.questions[currentQuestion]
            : { question: null, answer: null }


        return (!totalQuestions)
            ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 35, color: '#001057', marginBottom: 30, textAlign: 'center' }}>
                        There is no question to quiz in this deck
                </Text>
                </View>
            )
            : (currentQuestion >= totalQuestions) ? (
                <ShowResult
                    totalQuestions={totalQuestions}
                    correctCount={this.state.correctCount}
                    deck={this.state.deck}
                    restartQuiz={this.restartQuiz}
                />
            )
                : (
                    <ScrollView>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 15, color: '#001057', marginBottom: 30, alignItems: 'flex-start', textAlign: 'left', justifyContent: 'flex-start' }}>
                                {
                                    `${currentQuestion + 1} / ${totalQuestions}`
                                }
                            </Text>
                            <Text style={{ fontSize: 30, color: '#001057', marginBottom: 30, textAlign: 'center' }}>
                                {
                                    (this.state.faceUp) ? question : answer
                                }
                            </Text>
                            <TouchableOpacity
                                onPress={this.toggleFace}
                            >
                                <Text style={{ fontSize: 20, textDecorationLine: 'underline', color: 'red', margin: 30 }}>
                                    {
                                        `SHOW ${(this.state.faceUp) ? 'ANSWER' : 'QUESTION'}`
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                                <View style={styles.buttonBorder}>
                                    <TouchableHighlight
                                        style={[styles.button, { backgroundColor: 'red' }]}
                                        onPress={this.handleCorrect}
                                    >
                                        <Text style={{ fontSize: 15, color: 'yellow' }}>
                                            CORRECT
                            </Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.buttonBorder}>
                                    <TouchableHighlight
                                        style={[styles.button, { backgroundColor: 'darkgreen' }]}
                                        onPress={this.handleIncorrect}
                                    >
                                        <Text style={{ fontSize: 15, color: 'yellow' }}>
                                            INCORRECT
                            </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View >
                    </ScrollView>
                );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 90,
        margin: 20,
        height: 90,
        borderRadius: 100,
        alignItems: 'center',
        // backgroundColor: '#001057',
        //borderBottomColor: 'orange',
        // borderWidth: 4,
        // padding: 8,
        justifyContent: 'center',
    },
    buttonBorder: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        width: 110,
        borderWidth: 2,
        margin: 30,
    }
})

export default Quiz