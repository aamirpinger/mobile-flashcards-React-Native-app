import React from 'react';
import {
    ScrollView,
    Text, View,
    TouchableOpacity,
} from 'react-native'
import { now } from 'moment';
// import DeckRoute from '../routes/DeckRoute'
import { withNavigation } from 'react-navigation';
import FlipCard from '../utils/FlipCard'
function DeckList(props) {
    const { decks } = props.screenProps
    const navigation = props.navigation
    const bgColors = ["#f7f7f7", "#dfe3ee", "#8b9dc3", "#3b5998", "#b3cde0", "#6497b1", "#005b96", "#03396c"]
    let bgColorIndex = -1

    return (
        <ScrollView>
            {
                (!decks)
                    ? <Text style={{ fontSize: 24, textDecorationLine: 'underline', borderBottomColor: 'orange', borderBottomWidth: 2, borderTopColor: 'orange', borderTopWidth: 2, fontWeight: 'bold', color: '#001057', margin: 50, textAlign: 'center' }}>
                        No deck to display
                    </Text>
                    : Object.values(decks).map((deck) => {
                        return (
                            <TouchableOpacity
                                key={now() + Math.ceil(Math.random() * 1000)}
                                style={{
                                    backgroundColor: (bgColorIndex >= (bgColors.length - 1)) ? bgColors[bgColorIndex = 0] : bgColors[++bgColorIndex],
                                    borderWidth: 2,
                                    borderColor: "#001057",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 150,
                                    borderRadius: 15,
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
                            </TouchableOpacity>
                        )
                    }
                    )
            }
            {/* <FlipCard /> */}
        </ScrollView>
    )
}
export default withNavigation(DeckList)