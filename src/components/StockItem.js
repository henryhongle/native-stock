import React from 'React';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

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
                    <Text style={[styles.percent, { color: signStyle, textAlign: 'right' }]}>
                        {percentChange}%
                    </Text>
                </View>
                <View style={styles.defaultContainer}>
                    <Text style={[styles.change, { color: signStyle, textAlign: 'right' }]}>
                        {change}
                    </Text>
                </View>
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
        flexGrow: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    defaultContainer: {
        minWidth: 45,
        marginLeft: 30
    },

    price: {
        color: 'grey',
        textAlign: 'right'
    }
});

export default StockItem;