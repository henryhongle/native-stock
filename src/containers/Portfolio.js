import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { View, FlatList, TouchableHighlight } from 'react-native';
import { PortfolioItem } from '../components';
import styles from './Portfolio.style';

const transactions = [
  {
    id: uuid(),
    symbol: 'MSFT',
    numShares: 100,
    costPerShare: 100.29,
    fees: 14.00,
    date: new Date()
  }, {
    id: uuid(),
    symbol: 'APPL',
    numShares: 10,
    costPerShare: 180,
    fees: 14.00,
    date: new Date()
  }
];

class Portfolio extends React.Component {
  keyExtractor = (item, index) => index;

  renderTransaction = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => {}}
        underlayColor='#dddddd'
      >
        <View>
          <PortfolioItem
            data={item}
          />
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={transactions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderTransaction}
        />
      </View>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Portfolio);
