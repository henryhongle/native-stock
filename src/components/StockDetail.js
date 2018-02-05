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
        val: 'shortName'
    },
    {
        label: 'Symbol',
        val: 'symbol'
    },
    {
        label: 'Price',
        val: 'regularMarketPrice'
    },
    {
        label: 'Percent change',
        val: 'regularMarketChangePercent'
    },
    {
        label: 'Day change',
        val: 'regularMarketChange'
    },
    {
        label: 'Dividend yield',
        val: 'trailingAnnualDividendYield',
    },
    {
        label: 'Dividend paydate',
        val: 'dividendDate'
    },
    {
        label: 'Dividend share',
        val: 'trailingAnnualDividendRate'
    },
    {
        label: 'PE ratio',
        val: 'forwardPE'
    },
    {
        label: '50 days moving avg',
        val: 'fiftyDayAverageChange'
    },
    {
        label: '50 days % change',
        val: 'fiftyTwoWeekHighChangePercent'
    },
    {
        label: '200 days moving avg',
        val: 'twoHundredDayAverageChange'
    },
    {
        label: '200 days % change',
        val: 'twoHundredDayAverageChangePercent'
    }
];

function prettifyNumber(num) {
    let dec_index = num.indexOf('.');
    if (dec_index !== -1) {
        return num.substring(0, dec_index + 3);
    }
    return num; 
}

const _renderItem = (data) => {
    const { item } = data;
    let customStyles = {};
    let val;

    switch(item.label) {
        case 'Dividend yield':
            val = item.val !== undefined ? prettifyNumber(item.val.toString()) + '%' : '';
            break;
        case 'Percent change':
        case 'Day change':
        case '50 days moving avg':
        case '50 days % change':
        case '200 days moving avg':
        case '200 days % change':
        case 'EBITDA':
        case 'PE ratio':
        case 'Earnings per share':
            val = prettifyNumber(data.item.val.toString());
            const isPositive = val.substring(0,1) === '-' ? false : true;
            customStyles['color'] = isPositive ? 'green' : 'red';
            break;
        case 'Dividend paydate':
            if (item.val) {
                val = new Date(item.val * 1000).toLocaleDateString();
            }
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
          if (stock[item['val']] !== null && stock[item['val']] !== undefined) {
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
