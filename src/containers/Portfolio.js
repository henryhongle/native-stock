import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, FlatList, TouchableHighlight, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import styles from './Portfolio.style';
import { getPositions } from '../selectors/portfolioSelectors';
import { PortfolioItem, PortfolioSummary } from '../components';
import { getStocks } from '../actions/stockActions';
import { deletePosition } from '../actions/portfolioActions';

const renderAddButton = navigation => (
  <View style={{ paddingRight: 10 }}>
    <Icon
      name='add'
      onPress={() => {
        navigation.navigate('SearchPage', {
          onSearchItemSelected: (item) => {
            navigation.push('AddPosition', { item });
          }
        });
      }}
    />
  </View>
);

class Portfolio extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Portfolio',
    headerRight: renderAddButton(navigation)
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

  renderPosition = ({ item }) => {
    const swipeSettings = {
      autoClose: true,
      right: [
        { onPress: this.props.deletePosition.bind(this, item.id), text: 'Delete', type: 'delete' }
      ],
      backgroundColor: 'transparent'
    };

    return (
      <Swipeout
        {...swipeSettings}
        backgroundColor='transparent'
      >
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
      </Swipeout>
    );
  }

  render() {
    const { positions, fetchStocks, isStocksFetching } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        { positions.length === 0 &&
          <View style={styles.emptyDescription} >
            <Text style={styles.emptyText}>Add a position to your portfolio</Text>
          </View>
        }
        <FlatList
          data={positions}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderPosition}
          onRefresh={fetchStocks}
          refreshing={isStocksFetching}
        />
        <PortfolioSummary positions={positions} />
      </View>
    );
  }
}

Portfolio.propTypes = {
  positions: PropTypes.array.isRequired,
  fetchStocks: PropTypes.func.isRequired,
  isStocksFetching: PropTypes.bool.isRequired,
  deletePosition: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => {
  return {
    positions: getPositions(state),
    isStocksFetching: state.stocks.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: () => dispatch(getStocks()),
    deletePosition: id => dispatch(deletePosition(id))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Portfolio);
