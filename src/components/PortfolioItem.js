import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './PortfolioItem.style';
import { prettifyNumber, numberWithCommas } from '../helpers/numberUtil';

const PortfolioItem = ({ data }) => {
  const {
    symbol,
    numShares,
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
    dayGain,
    dayGainPercent
  } = data;

  const totalSignStyle = totalGain < 0 ? 'red' : 'green';
  const daySignStyle = dayGain < 0 ? 'red' : 'green';

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.primary}>{symbol}</Text>
        <Text style={styles.secondary}>{numShares}</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.primary}>
          { prettifyNumber(numberWithCommas(totalValue)) }
        </Text>
        <Text style={styles.secondary}>
          { prettifyNumber(numberWithCommas(totalCost)) }
        </Text>
      </View>

      <View style={styles.column}>
        <Text style={[styles.primary, { color: daySignStyle }]}>
          { prettifyNumber(numberWithCommas(dayGain)) }
        </Text>
        <Text style={[styles.secondary, { color: daySignStyle }]}>
          { prettifyNumber(dayGainPercent.toString()) }%
        </Text>
      </View>

      <View style={styles.column}>
        <Text style={[styles.primary, { color: totalSignStyle }]}>
          { prettifyNumber(numberWithCommas(totalGain)) }
        </Text>
        <Text style={[styles.secondary, { color: totalSignStyle }]}>
          { prettifyNumber(totalGainPercent.toString()) }%
        </Text>
      </View>
    </View>
  );
};

PortfolioItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default PortfolioItem;
