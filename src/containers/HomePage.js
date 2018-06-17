import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Keyboard
} from 'react-native';

import Swipeout from 'react-native-swipeout';
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

  _onSearchSelected = (item) => {
    this.setState({
      searchSelected: item,
      suggestions: []
    });
  }

  _onPress = (stock) => {
    this.props.navigation.navigate('Detail', { stock });
  }

  _keyExtractor = (item, index) => index;

  _updateSuggestion = (suggestions) => {
    this.setState({
      suggestions
    });
  }

  _addStock = (ticker) => {
    this.props.addStock(ticker);
    Keyboard.dismiss();
  }

  _renderItem = ({item, index}) => {
    const swipeSettings = {
      autoClose: true,
      right: [
        { onPress: this.props.deleteStock.bind(this, item.symbol), text: 'Delete', type: 'delete' }
      ],
      backgroundColor: 'transparent'
    };

    return (
      <Swipeout {...swipeSettings}
        backgroundColor= 'transparent'>
        <TouchableHighlight
          onPress={this._onPress.bind(null, item)}
          underlayColor='#dddddd' >
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

  _renderSuggestionItem = ({item, index}) => {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={this._onSearchSelected.bind(null, item)} >
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
            onSearchCompleted={this._updateSuggestion}
            onItemSelected={this.state.searchSelected}
            onItemAdded={this._addStock}
          />
        </View>

        { this.state.suggestions.length == 0 
          &&
          <FlatList style={styles.stocksContainer}
            data={Object.values(this.props.stocks)}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            onRefresh={this.props.fetchStocks}
            refreshing={this.props.isFetching}
          />
        }

        { this.state.suggestions.length != 0
          &&
          <FlatList style={styles.suggestionContainer}
            data={this.state.suggestions}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderSuggestionItem}
            keyboardShouldPersistTaps='always'
          />
        }
      </View>
    );
  };
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