import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './PortfolioItem.style';

const PortfolioItem = ({ data }) => {
  const {
    symbol,
    numShares,
    costPerShare,
    fees
  } = data;
  const amount = (costPerShare * numShares) + fees;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.primary}>{symbol}</Text>
        <Text style={styles.secondary}>{numShares}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.primary}>{amount}</Text>
        <Text style={styles.secondary}>{amount}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.primary}>{amount}</Text>
        <Text style={styles.secondary}>{amount}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.primary}>{amount}</Text>
        <Text style={styles.secondary}>{amount}</Text>
      </View>
    </View>
  );
};

PortfolioItem.propTypes = {
  data: PropTypes.object.isRequired
};

export default PortfolioItem;
