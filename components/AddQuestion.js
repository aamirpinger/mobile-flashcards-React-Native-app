import React, { Component, Fragment } from 'react';
import {
    Text,
    KeyboardAvoidingView,
    TextInput
} from 'react-native'

class AddDeck extends Component {
    state = {
        question: '',
        answer: '',
    }


    handleQuestionInputChange = (newInput) => {
        this.setState({
            question: newInput
        })
    }

    handleAnswerInputChange = (newInput) => {
        this.setState({
            answer: newInput
        })
    }

    render() {
        const { deck } = this.props
        console.log(deck)
        return (
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1, justifyContent: 'center', }}>
                <Text style={{ fontSize: 24, display: 'flex' }}>
                    Question:
                </Text>


                <Text style={{ fontSize: 24, display: 'flex' }}>
                    Question:
                    </Text>
                <TextInput
                    value={this.state.question}
                    onChangeText={this.handleQuestionInputChange}
                    style={{ borderColor: 'black', borderWidth: 1, margin: 5, paddingLeft: 5 }}
                />
                <Text style={{ fontSize: 35 }}>
                    Answer
                </Text>
                <TextInput
                    value={this.state.answer}
                    onChangeText={this.handleAnswerInputChange}
                    style={{ borderColor: 'black', borderWidth: 1, width: 150, paddingLeft: 5 }}
                />

            </KeyboardAvoidingView >
        );
    }
}

export default AddDeck