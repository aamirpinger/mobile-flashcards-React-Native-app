
export const isNoDeck = (decks) => {
    return !decks || Object.keys(decks).length === 0 || Object.keys(decks).length === 1 && Object.keys(decks)[0] === 'dateLatestAttempted';
}

export const appTheme = {
    themeBgColor: "#001057",
    deckBgColorList: ["#f7f7f7", "#dfe3ee", "#8b9dc3", "#3b5998", "#b3cde0", "#6497b1", "#005b96", "#03396c"],
    deckFontColor: 'black',
    deckBorderColor: "#001057",
    lineColor: 'orange',
}
