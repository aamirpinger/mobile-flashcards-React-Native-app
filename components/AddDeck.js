import React, { Component } from 'react';
import {
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'
import { withNavigation } from 'react-navigation';

class AddDeck extends Component {

    state = {
        deckName: '',
    }


    handleDeckNameInputChange = (newInput) => {
        this.setState({
            deckName: newInput
        })
    }

    handleSubmit = () => {
        const { handleNewDeckSubmition } = this.props.screenProps
        const userInput = this.state.deckName

        if (userInput) {
            handleNewDeckSubmition(userInput)
                .then((newDeck) => {
                    this.setState({ deckName: '' })
                    this.props.navigation.navigate('Deck', { deck: newDeck })
                })
        }
        else {
            alert("Deck name cannot be submitted empty!")
        }

    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1, textAlign: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#001057', marginBottom: 50, textAlign: 'center' }}>
                    ADD DECK
                </Text>
                <Text style={{ fontSize: 24, marginBottom: 25, textAlign: 'center' }}>
                    What would be the title of your new deck?
                </Text>
                <TextInput
                    value={this.state.deckName}
                    onChangeText={this.handleDeckNameInputChange}
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
            </KeyboardAvoidingView >
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


export default withNavigation(AddDeck)