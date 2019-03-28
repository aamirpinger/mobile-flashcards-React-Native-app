import React from 'react';
import { StatusBar, View, } from 'react-native'
import { Constants } from 'expo'
import { appTheme } from '../utils/Helper';

function Statusbar(props) {
    const { themeBgColor } = appTheme
    return (
        <View style={{
            backgroundColor: themeBgColor,
            height: Constants.statusBarHeight
        }} >
            <StatusBar
                {...props}
            />
        </View>
    );

}

export default Statusbar