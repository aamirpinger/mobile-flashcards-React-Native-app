import React, { Component } from 'react';
import AddDeck from '../components/AddDeck'
import { Feather } from '@expo/vector-icons'
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import DeckList from '../components/DeckList'
import { appTheme } from '../utils/Helper';

const { themeBgColor, lineColor } = appTheme
const TabNavigator = createMaterialTopTabNavigator(
    {
        Decks: {
            screen: DeckList,
            navigationOptions: {
                tabBarIcon: () => <Feather name='home' color="white" />
            }
        },
        Add: {
            screen: AddDeck,
            navigationOptions: {
                tabBarIcon: () => <Feather name='info' color="white" />,
            }
        },
    },
    {
        initialRouteName: "Decks",
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            labelStyle: {
                fontSize: 14,
                color: 'white',
            },
            style: {
                backgroundColor: themeBgColor,
            },
            indicatorStyle: {
                backgroundColor: lineColor,
            }
        },
    },


);

export default createAppContainer(TabNavigator);
