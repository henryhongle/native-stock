import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { getStocks, addStock, deleteStock } from '../actions/stockActions';
import styles from './HomePage.style';
import { getStocksSelector } from '../selectors/stocksSelectors';
import {
  StockItem,
  FlashMessage
} from '../components';

const renderAddButton = navigation => (
  <View style={{ paddingRight: 10 }}>
    <Icon
      name='add'
      onPress={() => {
        navigation.navigate('SearchPage', {
          onSearchItemSelected: (item) => {
            navigation.state.params.addStock(item.symbol);
            navigation.popToTop();
          }
        });
      }}
    />
  </View>
);

class HomePage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Watchlist',
    headerRight: renderAddButton(navigation)
  })

  componentDidMount() {
    this.props.navigation.setParams({
      addStock: this.props.addStock
    });
    this.props.fetchStocks(true);
  }

  viewStockDetails = (stock) => {
    this.props.navigation.navigate('Detail', { stock });
  }

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => {
    const swipeSettings = {
      autoClose: true,
      right: [
        { onPress: this.props.deleteStock.bind(this, item.symbol), text: 'Delete', type: 'delete' }
      ],
      backgroundColor: 'transparent'
    };

    return (
      <Swipeout
        {...swipeSettings}
        backgroundColor='transparent'
      >
        <TouchableHighlight
          onPress={this.viewStockDetails.bind(null, item)}
          underlayColor='#dddddd'
        >
          <View>
            <StockItem
              data={item}
            />
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  render() {
    const { isStocksFetching, stocks } = this.props;

    return (
      <View style={styles.container}>
        <FlashMessage />
        { isStocksFetching &&
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size='large' />
          </View>
        }

        { !isStocksFetching && stocks.length === 0 &&
          <View style={styles.emptyDescription} >
            <Text style={styles.emptyText}>Add a ticker to your watchlist</Text>
          </View>
        }

        { !isStocksFetching && stocks.length > 0 &&
          <FlatList
            style={styles.stocksContainer}
            data={stocks}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onRefresh={this.props.fetchStocks}
            refreshing={this.props.isStocksFetching}
          />
        }
      </View>
    );
  }
}

HomePage.propTypes = {
  navigation: PropTypes.object.isRequired,
  fetchStocks: PropTypes.func.isRequired,
  addStock: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
  isStocksFetching: PropTypes.bool
};

HomePage.defaultProps = {
  isStocksFetching: false
};

const mapStatetoProps = (state) => {
  return {
    stocks: getStocksSelector(state),
    isStocksFetching: state.stocks.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: () => dispatch(getStocks()),
    addStock: stock => dispatch(addStock(stock)),
    deleteStock: stock => dispatch(deleteStock(stock))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);
