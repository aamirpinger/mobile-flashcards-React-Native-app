import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native'

class Quiz extends Component {


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 35 }}>
                    This is Quiz screen
               </Text>
            </View>
        );
    }
}

export default Quiz