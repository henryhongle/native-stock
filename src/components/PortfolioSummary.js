import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './PortfolioSummary.style';
import { prettifyNumber, numberWithCommas } from '../helpers/numberUtil';

function getSummary(positions) {
  const result = {
    totalValue: 0,
    totalCost: 0,
    totalGain: 0,
    totalGainPercent: 0,
    dayGain: 0,
    dayGainPercent: 0
  };

  return R.reduce((acc, position) => {
    acc.totalValue += position.totalValue;
    acc.totalCost += position.totalCost;
    acc.totalGain += position.totalGain;
    acc.totalGainPercent += position.totalGainPercent;
    acc.dayGain += position.dayGain;
    acc.dayGainPercent += position.dayGainPercent;
    return acc;
  }, result, positions);
}

const PortfolioSummary = ({ positions }) => {
  const result = getSummary(positions);
  const {
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
    dayGain,
    dayGainPercent
  } = result;

  const totalSignStyle = totalGain < 0 ? 'red' : 'green';
  const daySignStyle = dayGain < 0 ? 'red' : 'green';


  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.primary}>TOTAL</Text>
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
          { prettifyNumber(dayGainPercent) }%
        </Text>
      </View>

      <View style={styles.column}>
        <Text style={[styles.primary, { color: totalSignStyle }]}>
          { prettifyNumber(numberWithCommas(totalGain)) }
        </Text>
        <Text style={[styles.secondary, { color: totalSignStyle }]}>
          { prettifyNumber(totalGainPercent) }%
        </Text>
      </View>
    </View>
  );
};

PortfolioSummary.propTypes = {
  positions: PropTypes.array.isRequired
};

export default PortfolioSummary;
