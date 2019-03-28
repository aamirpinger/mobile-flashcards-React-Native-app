import React from 'react';
import { isNoDeck, appTheme } from '../utils/Helper';
import { withNavigation } from 'react-navigation';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

function DeckList(props) {
    const { decks } = props.screenProps
    const navigation = props.navigation
    let bgColorIndex = -1

    return (
        <ScrollView>
            {
                (isNoDeck(decks))
                    ? <Text style={styles.header}>
                        No deck to display
                    </Text>
                    : Object.values(decks).map((deck) => {
                        return (!deck.title) ? null
                            : (
                                <TouchableOpacity
                                    key={deck.title}
                                    style={[
                                        styles.deckBoxes,
                                        { backgroundColor: (bgColorIndex >= (deckBgColorList.length - 1)) ? deckBgColorList[bgColorIndex = 0] : deckBgColorList[++bgColorIndex] }
                                    ]}
                                    onPress={() => navigation.navigate('Deck', { deck: deck })}
                                >
                                    <View style={styles.titleView}>
                                        <Text style={styles.title}>
                                            {deck.title}
                                        </Text>
                                        <Text style={styles.title}>
                                            {` ${deck.questions.length} cards`}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                    }
                    )
            }
        </ScrollView>
    )
}
const { themeBgColor, deckBgColorList, deckBorderColor, deckFontColor, lineColor } = appTheme
const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        textDecorationLine: 'underline',
        borderBottomColor: lineColor,
        borderBottomWidth: 2,
        borderTopColor: lineColor,
        borderTopWidth: 2,
        fontWeight: 'bold',
        color: themeBgColor,
        margin: 50,
        textAlign: 'center'
    },
    deckBoxes: {
        borderWidth: 2,
        borderColor: deckBorderColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        borderRadius: 15,
    },
    title: {
        color: deckFontColor,
        fontSize: 20,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
    }

})


export default withNavigation(DeckList)