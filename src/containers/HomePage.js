import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { getStocks, addStock, deleteStock } from '../actions/stockActions';
import { clearTickerSearch } from '../actions/searchActions';
import styles from './HomePage.style';
import SearchBar from './SearchBar';
import {
  StockItem,
  FlashMessage
} from '../components';

class HomePage extends React.Component {
  static navigationOptions = {
    header: <SearchBar />
  }

  componentDidMount() {
    this.props.fetchStocks(true);
  }

  selectSearchedTicker = (item) => {
    this.props.addStock(item.symbol);
    this.props.clearTickerSearch();
    Keyboard.dismiss();
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

  renderSuggestionItem = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={this.selectSearchedTicker.bind(this, item)}
      >
        <View>
          <View style={styles.suggestionContainer}>
            <Text style={styles.stock}>{item.symbol}</Text>
            <Text style={styles.stock}>{item.name}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { isStocksFetching } = this.props;

    return (
      <View style={styles.container}>
        <FlashMessage />
        { isStocksFetching &&
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size='large' />
          </View>
        }

        { !isStocksFetching && this.props.suggestedTickers.length === 0 &&
          <FlatList
            style={styles.stocksContainer}
            data={this.props.stocks}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onRefresh={this.props.fetchStocks}
            refreshing={this.props.isStocksFetching}
          />
        }

        { !isStocksFetching && this.props.suggestedTickers.length !== 0 &&
          <FlatList
            style={styles.suggestionContainer}
            data={this.props.suggestedTickers}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderSuggestionItem}
            keyboardShouldPersistTaps='always'
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
  isStocksFetching: PropTypes.bool,
  suggestedTickers: PropTypes.array.isRequired,
  clearTickerSearch: PropTypes.func.isRequired
};

HomePage.defaultProps = {
  isStocksFetching: false
};

const mapStatetoProps = (state) => {
  const stocks = [];
  R.forEach((id) => {
    stocks.push(state.stocks.stocks.byId[id]);
  }, state.stocks.stocks.allIds);

  return {
    stocks,
    isStocksFetching: state.stocks.isFetching,
    suggestedTickers: state.search.tickers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: () => dispatch(getStocks()),
    addStock: stock => dispatch(addStock(stock)),
    deleteStock: stock => dispatch(deleteStock(stock)),
    clearTickerSearch: () => dispatch(clearTickerSearch())
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);
