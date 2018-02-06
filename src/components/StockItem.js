import React from 'React';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

import { scale } from '../helpers/Reponsive';

function prettifyNumber(num) {
    let dec_index = num.indexOf('.');
    if (dec_index !== -1) {
        return num.substring(0, dec_index + 3);
    }
    return num; 
}

const StockItem = (props) => {
    const data = props.data;
    const value = prettifyNumber(data.regularMarketPrice.toString());
    const percentChange = prettifyNumber(data.regularMarketChangePercent.toString());
    const change = prettifyNumber(data.regularMarketChange.toString());
    const signStyle = percentChange.substring(0,1) === '-' ? 'red' : 'green';
    
    return (
        <View style={styles.container} >
            <Text style={styles.symbol}>{data.symbol.toUpperCase()}</Text>

            <View style={styles.priceContainer}>
                <View style={styles.defaultContainer}>
                    <Text style={styles.price}>{value}</Text>
                </View>
                <View style={styles.defaultContainer}>
                    <Text style={[styles.percent, { color: signStyle }]}>
                        {percentChange}%
                    </Text>
                </View>
                <View style={styles.defaultContainer}>
                    <Text style={[styles.change, { color: signStyle }]}>
                        {change}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: scale(10),
        flex: 1,
        height: scale(36),
        flexDirection: 'row',
    },

    symbol: {
        flexGrow: 1,
        fontSize: scale(14),
        alignSelf: 'center'
    },

    priceContainer: {
        flexGrow: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    defaultContainer: {
        minWidth: scale(45),
        marginLeft: scale(30)
    },

    price: {
        color: 'grey',
        textAlign: 'right',
        fontSize: scale(14)
    },

    percent: {
        textAlign: 'right',
        fontSize: scale(14)
    },

    change : {
        textAlign: 'right',
        fontSize: scale(14)
    }
});

export default StockItem;