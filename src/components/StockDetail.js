import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import styles from './StockDetail.style';
import { prettifyNumber } from '../helpers/numberUtil';

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
    val: 'trailingAnnualDividendYield'
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

const renderItem = (data) => {
  const { item } = data;
  const customStyles = {};
  let { val } = item;

  switch (item.label) {
    case 'Dividend yield':
      val = item.val !== undefined ? `${prettifyNumber(item.val.toString())} %` : '';
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
      customStyles.color = val.substring(0, 1) === '-' ? 'red' : 'green';
      break;
    case 'Dividend paydate':
      if (item.val) {
        val = new Date(item.val * 1000).toLocaleDateString();
      }
      break;
    default:
  }

  return (
    <View>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={[styles.info, { ...customStyles }]}>{val}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const keyExtractor = (item, index) => index;

class StockDetail extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stock.symbol
  });

  render() {
    const { stock } = this.props.navigation.state.params;
    const details = mapping.filter(item => (
      stock[item.val] !== null && stock[item.val] !== undefined))
      .map((item) => {
        const newItem = {};
        newItem.label = item.label;
        newItem.val = stock[item.val];
        return newItem;
      });

    return (
      <View style={styles.container}>
        <FlatList
          data={details}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

StockDetail.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default StockDetail;
