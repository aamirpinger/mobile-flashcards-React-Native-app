import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'
import { withNavigation } from 'react-navigation';
import CustomKeyboardAvoidingView from '../utils/KeyboardShift'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
    }


    handleQuestionChange = (newInput) => {
        this.setState({
            question: newInput
        })
    }

    handleAnswerChange = (newInput) => {
        this.setState({
            answer: newInput
        })
    }

    handleSubmit = () => {
        const { handleNewQuestionSubmition } = this.props.screenProps
        const { question, answer } = this.state
        const { title } = this.props.navigation.state.params

        if (question && answer) {
            handleNewQuestionSubmition(title, this.state)
                .then((newDeck) => {
                    this.setState({
                        question: '',
                        answer: '',
                    })
                    this.props.navigation.navigate('Deck', { deck: newDeck })
                })
        }
        else {
            alert("Question or it's answer cannot be submitted empty!")
        }

    }

    render() {
        const { title } = this.props.navigation.state.params

        return (
            <CustomKeyboardAvoidingView behavior='padding' style={{ flex: 1, textAlign: 'center', justifyContent: 'center', }}>
                {() => (
                    <View>
                        <Text style={{ fontSize: 24, textDecorationLine: 'underline', borderBottomColor: 'orange', borderBottomWidth: 2, borderTopColor: 'orange', borderTopWidth: 2, fontWeight: 'bold', color: '#001057', margin: 50, textAlign: 'center' }}>
                            {`Deck: ${title}`}
                        </Text>
                        <Text style={{ fontSize: 24, marginBottom: 25, textAlign: 'center' }}>
                            Question:
                        </Text>
                        <TextInput
                            value={this.state.question}
                            onChangeText={this.handleQuestionChange}
                            style={{ borderColor: 'black', borderWidth: 1, margin: 5, paddingLeft: 5 }}
                        />
                        <Text style={{ fontSize: 24, marginBottom: 25, textAlign: 'center' }}>
                            Answer
                       </Text>
                        <TextInput
                            value={this.state.answer}
                            onChangeText={this.handleAnswerChange}
                            style={{ borderColor: 'black', borderWidth: 1, margin: 5, paddingLeft: 5 }}
                        />

                        <View style={{
                            alignItems: 'center',
                        }}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={this.handleSubmit}
                            >
                                <Text style={{ fontSize: 20, color: 'white' }}>
                                    SUBMIT
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                )}
            </CustomKeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        marginTop: 20,
        height: 40,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: '#001057',
        borderBottomColor: 'orange',
        borderBottomWidth: 2,
        justifyContent: 'center',
    }
})


export default withNavigation(AddCard)