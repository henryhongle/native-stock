import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './StockItem.style';
import prettifyNumber from '../helpers/numberUtil';

const StockItem = (props) => {
  const { data } = props;
  const value = prettifyNumber(data.regularMarketPrice.toString());
  const percentChange = prettifyNumber(data.regularMarketChangePercent.toString());
  const change = prettifyNumber(data.regularMarketChange.toString());
  const signStyle = percentChange.substring(0, 1) === '-' ? 'red' : 'green';

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

StockItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default StockItem;
