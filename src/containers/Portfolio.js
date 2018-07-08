import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, FlatList, TouchableHighlight, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './Portfolio.style';
import { getPositions } from '../selectors/portfolioSelectors';
import { PortfolioItem, PortfolioSummary } from '../components';

const renderMenuButton = navigation => (
  <View style={{ paddingRight: 10 }}>
    <Icon name='add' onPress={() => {}} />
  </View>
);

class Portfolio extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    headerRight: renderMenuButton(navigation)
  })

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
    const { positions } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={styles.separator} />
        <FlatList
          data={positions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderTransaction}
        />
        <PortfolioSummary positions={positions} />
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
