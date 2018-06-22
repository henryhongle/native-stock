import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Keyboard
} from 'react-native';
import {
  StockItem,
  SearchBar,
  FlashMessage
} from '../components';
import { getStocks, addStock, deleteStock } from '../actions/stockActions';
import { scale } from '../helpers/Reponsive';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      searchSelected: null
    };
  }

  componentDidMount() {
    this.props.fetchStocks(true);
  }

  selectSearchedTicker = (item) => {
    this.setState({
      searchSelected: item,
      suggestions: []
    });
  }

  viewStockDetails = (stock) => {
    this.props.navigation.navigate('Detail', { stock });
  }

  keyExtractor = (item, index) => index;

  updateSuggestion = (suggestions) => {
    this.setState({
      suggestions
    });
  }

  addStock = (ticker) => {
    this.props.addStock(ticker);
    Keyboard.dismiss();
  }

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
        onPress={this.selectSearchedTicker.bind(null, item)}
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
    return (
      <View style={styles.container}>
        <FlashMessage />
        <View style={styles.searchContainer}>
          <SearchBar
            onSearchCompleted={this.updateSuggestion}
            onItemSelected={this.state.searchSelected}
            onItemAdded={this.addStock}
          />
        </View>

        { this.state.suggestions.length === 0
          &&
          <FlatList
            style={styles.stocksContainer}
            data={this.props.stocks}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onRefresh={this.props.fetchStocks}
            refreshing={this.props.isFetching}
          />
        }

        { this.state.suggestions.length !== 0
          &&
          <FlatList
            style={styles.suggestionContainer}
            data={this.state.suggestions}
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
  isFetching: PropTypes.bool
};

HomePage.defaultProps = {
  isFetching: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10)
  },

  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

  suggestionContainer: {
    padding: scale(5)
  },

  stock: {
    fontSize: scale(14),
    paddingLeft: scale(10)
  },
  searchContainer: {
    marginBottom: scale(10)
  }
});

const mapStatetoProps = (state) => {
  const stocks = [];
  R.forEach((id) => {
    stocks.push(state.stocks.stocks.byId[id]);
  }, state.stocks.stocks.allIds);

  return {
    stocks,
    isFetching: state.stocks.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStocks: () => {
      dispatch(getStocks());
    },

    addStock: (stock) => {
      dispatch(addStock(stock));
    },

    deleteStock: (stock) => {
      dispatch(deleteStock(stock));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);
