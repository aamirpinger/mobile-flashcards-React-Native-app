import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

export default class FlipCard extends Component {

    constructor() {

        super();

        this.animatedValue = new Animated.Value(0);

        this.value = 0;

        this.animatedValue.addListener(({ value }) => {

            this.value = value;

        })

    }

    flip_Card_Animation = () => {

        if (this.value >= 90) {

            Animated.spring(this.animatedValue, {
                toValue: 0,
                tension: 10,
                friction: 8,
            }).start();

        } else {

            Animated.spring(this.animatedValue, {
                toValue: 180,
                tension: 10,
                friction: 8,
            }).start();

        }

    }

    render() {

        this.SetInterpolate = this.animatedValue.interpolate({

            inputRange: [0, 180],

            outputRange: ['180deg', '360deg']

        })

        const Rotate_Y_AnimatedStyle = {

            transform: [

                { rotateY: this.SetInterpolate }

            ]

        }

        return (

            <View style={styles.MainContainer}>

                {/* <Animated.Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg' }} */}
                <Animated.View
                    style={[Rotate_Y_AnimatedStyle, styles.imageViewStyle]}>
                    <Text>abc</Text>
                    {/* </Animated.Image> */}
                </Animated.View>
                <TouchableOpacity style={styles.TouchableOpacity_button} onPress={this.flip_Card_Animation} >

                    <Text style={styles.TextStyle}> Click Here Flip </Text>

                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },

    imageViewStyle: {

        width: 240,
        height: 300,
        borderRadius: 6,

    },

    TouchableOpacity_button: {

        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 6,
        marginTop: 20
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 5,
        fontSize: 18
    }

});