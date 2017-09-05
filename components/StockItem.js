import React from 'React';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

function pretifyNumber(num) {
    let dec_index = num.indexOf('.');
    let isPercent = num[num.length - 1] === '%' ? true : false;

    if (dec_index !== -1) {
        let value  = num.substring(0, dec_index + 3);
        return isPercent ? value + '%' : value;
    } else {
        return num;
    }
}

const StockItem = (props) => {
    const data = props.data;
    const value = pretifyNumber(data.LastTradePriceOnly);
    const percentChange = pretifyNumber(data.PercentChange);
    const change = pretifyNumber(data.Change)
    const signStyle = data.PercentChange.substring(0,1) === '-' ? 'red' : 'green';
    
    return (
        <View style={styles.container} >
            <Text style={styles.symbol}>{data.symbol.toUpperCase()} </Text>

            <View style={styles.priceContainer}>
                <Text style={styles.price}>{value}</Text>
                <Text style={[styles.percent, { color: signStyle } ]}>
                    {percentChange}
                </Text>
                <Text style={[styles.change, { color: signStyle }]}>
                    {change}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        height: 36,
        flexDirection: 'row',
    },

    symbol: {
        flexGrow: 1,
        fontSize: 14,
        alignSelf: 'center'
    },

    priceContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    price: {
        color: 'grey',
        flexGrow: 1,
        textAlign: 'right'
    },

    percent: {
        marginLeft: 20,
        flexGrow: 1,
        minWidth: 50,
        textAlign: 'right'
    },

    change: {
        marginLeft: 15,
        flexGrow: 1,
        minWidth: 40,
        textAlign: 'right'
    }
});

export default StockItem;