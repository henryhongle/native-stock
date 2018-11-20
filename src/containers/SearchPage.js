import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Keyboard
} from 'react-native';
import { clearTickerSearch } from '../actions/searchActions';
import styles from './SearchPage.style';
import SearchBar from './SearchBar';
import { FlashMessage } from '../components';

class SearchPage extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTitle: <SearchBar onBackIconSelected={() => { navigation.goBack(); }} />
  })

  selectSearchedTicker = (item) => {
    this.props.clearTickerSearch();
    Keyboard.dismiss();
    const { params } = this.props.navigation.state;
    if (params.onSearchItemSelected) {
      params.onSearchItemSelected(item);
    }
  }

  keyExtractor = (item, index) => index;

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
    return (
      <View style={styles.container}>
        <FlashMessage />
        { this.props.suggestedTickers.length === 0 &&
          <View style={styles.emptyDescription}>
            <Text style={styles.emptyText}>Enter ticker to search</Text>
          </View>
        }
        { this.props.suggestedTickers.length !== 0 &&
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

SearchPage.propTypes = {
  suggestedTickers: PropTypes.array.isRequired,
  clearTickerSearch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStatetoProps = (state) => {
  return {
    suggestedTickers: state.search.tickers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearTickerSearch: () => dispatch(clearTickerSearch())
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SearchPage);
