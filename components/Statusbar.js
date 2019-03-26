import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, StyleSheet } from 'react-native'
import { Constants } from 'expo'

function Statusbar(props) {

    return (
        <View style={{
            backgroundColor: props.backgroundColor,
            height: Constants.statusBarHeight
        }} >
            <StatusBar
                {...props}
            />
        </View>
    );

}

export default Statusbar