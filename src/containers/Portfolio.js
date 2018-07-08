import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, FlatList, TouchableHighlight, Text } from 'react-native';
import styles from './Portfolio.style';
import { getPositions } from '../selectors/portfolioSelectors';
import { PortfolioItem } from '../components';

class Portfolio extends React.Component {
  keyExtractor = (item, index) => index;

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerColumn}>
          <Text style={styles.headerFormat}>Ticker</Text>
        </View>
        <View style={styles.headerColumn}>
          <Text style={styles.headerFormat}>Value | Cost</Text>
        </View>
        <View style={styles.headerColumn}>
          <Text style={styles.headerFormat}>Daily</Text>
        </View>
        <View style={styles.headerColumn}>
          <Text style={styles.headerFormat}>Total</Text>
        </View>
      </View>
    );
  }

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
        {this.renderHeader()}
        <View style={styles.separator} />
        <FlatList
          data={this.props.positions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderTransaction}
        />
      </View>
    );
  }
}

Portfolio.propTypes = {
  positions: PropTypes.array.isRequired
};

const mapStatetoProps = (state) => {
  return {
    positions: getPositions(state)
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Portfolio);
