import React, { Component } from 'react';
import AddDeck from '../components/AddDeck'
import { Feather } from '@expo/vector-icons'
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import DeckList from '../components/DeckList'

//***************************************************/
// Options to try below are createBottomTabNavigator
// and createMaterialTopTabNavigator
//***************************************************/


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
        //*****************************************************************
        // further properties are listed on the following link
        //https://reactnavigation.org/docs/en/material-top-tab-navigator.html
        //*****************************************************************
        initialRouteName: "Decks",
        // change following with top / bottom
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            labelStyle: {
                fontSize: 14,
                color: 'white',
            },
            // tabStyle: {
            //     width: 100,

            // },
            style: {
                backgroundColor: '#001057',
                // borderRadius: 10,
            },
            indicatorStyle: {
                backgroundColor: 'orange',
            }
        },
    },


);

export default createAppContainer(TabNavigator);
