import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import styles from './StockDetail.style';
import { prettifyNumber } from '../helpers/numberUtil';
import { renderBackButton } from './Header';

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
    label: 'Day\'s Range',
    val: 'regularMarketDayRange'
  },
  {
    label: '52 Week Range',
    val: 'fiftyTwoWeekRange'
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
    label: 'Earnings Date',
    val: 'earningsTimestamp'
  },
  {
    label: 'Dividend share',
    val: 'trailingAnnualDividendRate'
  },
  {
    label: 'EPS (TTM)',
    val: 'epsTrailingTwelveMonths'
  },
  {
    label: 'PE Ratio (TTM)',
    val: 'trailingPE'
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

class StockDetail extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: renderBackButton(navigation),
    title: navigation.state.params.stock.symbol
  });

  transformData = (item) => {
    let { val } = item;
    const customStyles = {};

    switch (item.label) {
      case 'Dividend yield':
        val = item.val !== undefined ? `${prettifyNumber(item.val)} %` : '';
        break;
      case 'Percent change':
      case 'Day change':
      case '50 days moving avg':
      case '50 days % change':
      case '200 days moving avg':
      case '200 days % change':
      case 'EBITDA':
      case 'PE Ratio (TTM)':
      case 'Earnings per share':
        val = prettifyNumber(item.val);
        customStyles.color = val.substring(0, 1) === '-' ? 'red' : 'green';
        break;
      case 'Dividend paydate':
      case 'Earnings Date':
        if (item.val) {
          val = new Date(item.val * 1000).toLocaleDateString();
        }
        break;
      default:
    }

    return {
      val,
      label: item.label,
      customStyles
    };
  }

  keyExtractor = (item, index) => index;

  renderItem = (data) => {
    const transformed = this.transformData(data.item);
    return (
      <View>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{transformed.label}</Text>
          <Text style={[styles.info, { ...transformed.customStyles }]}>{transformed.val}</Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    const { stock } = this.props.navigation.state.params;

    const data = R.compose(
      R.map(({ label, val }) => {
        return { label, val: stock[val] };
      }),
      R.filter(({ val }) => !!stock[val])
    )(mapping);

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

StockDetail.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default StockDetail;
