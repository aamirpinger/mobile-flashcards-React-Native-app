import React from 'react';
import {
    ScrollView,
    Text, View,
    TouchableHighlight,
} from 'react-native'
import { now } from 'moment';
// import DeckRoute from '../routes/DeckRoute'
import { withNavigation } from 'react-navigation';

function DeckList(props) {
    const { decks } = props.screenProps
    const navigation = props.navigation
    const bgColors = ["lightblue", "orange", "lightgreen", "pink", "silver", "yellow"]
    let bgColorIndex = -1

    return (
        <ScrollView>
            {
                Object.values(decks).map((deck) => {
                    console.log(deck, "decklistttttttttttttttttt")
                    return (
                        <TouchableHighlight
                            key={now() + Math.ceil(Math.random() * 1000)}
                            style={{
                                backgroundColor: (bgColorIndex >= (bgColors.length - 1)) ? bgColors[bgColorIndex = 0] : bgColors[++bgColorIndex],
                                borderWidth: 2,
                                borderColor: "black",
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 150,
                            }}
                            onPress={() => navigation.navigate('Deck', { deck: deck })}
                        >
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 20,
                                }}>
                                    {deck.title}
                                </Text>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 20,
                                }}>
                                    {` ${deck.questions.length} cards`}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )
                }
                )
            }
        </ScrollView>
    )
}
export default withNavigation(DeckList)