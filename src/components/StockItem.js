import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './StockItem.style';
import { prettifyNumber } from '../helpers/numberUtil';

const AH = 'After hours';

const StockItem = (props) => {
  const { data } = props;
  const value = prettifyNumber(data.regularMarketPrice);
  const percentChange = prettifyNumber(data.regularMarketChangePercent);
  const change = prettifyNumber(data.regularMarketChange);
  const signStyle = percentChange.substring(0, 1) === '-' ? 'red' : 'green';
  const ahData = getAfterHoursData(data);

  return (
    <View style={styles.container}>
      <View style={styles.primary}>
        <View style={styles.column}>
          <Text style={styles.symbol}>{data.symbol.toUpperCase()}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.price}>{value}</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.percent, { color: signStyle }]}>
            {percentChange}%
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.change, { color: signStyle }]}>
            {change}
          </Text>
        </View>
      </View>
      { ahData &&
        <View style={styles.secondary}>
          <View style={styles.column}>
            <Text style={styles.afterHours}>{AH}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.price}>
              {data.postMarketPrice}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={[styles.percent, { color: ahData.signColor }]}>
              {ahData.postMarketChangePercent}%
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={[styles.change, { color: ahData.signColor }]}>
              {ahData.postMarketChange}
            </Text>
          </View>
        </View>
      }
    </View>
  );
};

function getAfterHoursData(data) {
  if (data.postMarketChange && data.postMarketChangePercent && data.postMarketPrice) {
    const postMarketPrice = prettifyNumber(data.postMarketPrice);
    const postMarketChangePercent = prettifyNumber(data.postMarketChangePercent);
    const postMarketChange = prettifyNumber(data.postMarketChange);
    const signColor = postMarketChangePercent.substring(0, 1) === '-' ? 'red' : 'green';
    return {
      postMarketPrice,
      postMarketChangePercent,
      postMarketChange,
      signColor
    };
  }
  return null;
}

StockItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default StockItem;
