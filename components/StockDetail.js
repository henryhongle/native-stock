import React from 'React';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';

const mapping = [
    {
        label: 'Company',
        val: 'Name'
    },
    {
        label: 'Symbol',
        val: 'Symbol'
    },
    {
        label: 'Price',
        val: 'LastTradePriceOnly'
    },
    {
        label: 'Percent change',
        val: 'ChangeinPercent'
    },
    {
        label: 'Day change',
        val: 'Change'
    },
    {
        label: 'Day range',
        val: 'DaysRange',
    },
    {
        label: 'Year range',
        val: 'YearRange'
    },
    {
        label: 'Dividend yield',
        val: 'DividendYield',
    },
    {
        label: 'Dividend paydate',
        val: 'DividendPayDate'
    },
    {
        label: 'Dividend share',
        val: 'DividendShare'
    },
    {
        label: 'PE ratio',
        val: 'PERatio'
    },
    {
        label: 'EBITDA',
        val: 'EBITDA'
    },
    {
        label: 'Earnings per share',
        val: 'EarningsShare'
    },
    {
        label: '50 days moving avg',
        val: 'FiftydayMovingAverage'
    },
    {
        label: '50 days % change',
        val: 'PercentChangeFromFiftydayMovingAverage'
    },
    {
        label: '200 days moving avg',
        val: 'TwoHundreddayMovingAverage'
    },
    {
        label: '200 days % change',
        val: 'PercentChangeFromTwoHundreddayMovingAverage'
    }
];


const _renderItem = (data) => {
    const { item } = data;
    let customStyles = {};
    let val;

    switch(item.label) {
        case 'Dividend yield':
            val = item.val + '%';
            break;
        case 'Percent change':
        case 'Day change':
        case '50 days moving avg':
        case '50 days % change':
        case '200 days moving avg':
        case '200 days % change':
        case 'EBITDA':
        case 'Earnings per share':
            const isPositive = data.item.val.substring(0,1) === '-' ? false : true;
            customStyles['color'] = isPositive ? 'green' : 'red';
            val = item.val;
            break;
        default:
            val = item.val;
    }
    return (
        <View>
            <View style={styles.itemContainer}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={[styles.info, { ...customStyles}]}>{val}</Text>
            </View>
            <View style={styles.separator} />
        </View>
    );
}

const _keyExtractor = (item, index) => index;

class StockDetail extends React.PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.stock.Symbol
    });

    render() {
        const { stock } = this.props.navigation.state.params;
        const details = mapping.filter((item) => {
          if (stock[item['val']] !== null) {
              return item;
          }  
        })
        .map(item => {
            let newItem = {};
            newItem['label'] = item['label'];
            newItem['val'] = stock[item['val']];
            return newItem;
        });

        return (
            <View style={styles.container}>
                <FlatList
                    data={details}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10
    },
    itemContainer: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    label: {
        flexGrow: 1
    },
    info: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        textAlign: 'right',
    }
});

export default StockDetail;
