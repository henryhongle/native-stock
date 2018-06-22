import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';
import stockService from '../services/StockService';
import { scale } from '../helpers/Reponsive';

const SEARCH_DEBOUNCE = 500;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      timeout: null,
      isValidTicker: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { onItemSelected } = nextProps;
    if (onItemSelected && onItemSelected !== this.props.onItemSelected) {
      this.setState({
        searchInput: onItemSelected.symbol,
        isValidTicker: true
      });
    }
  }

  onChangeText = (input) => {
    let timeout = null;
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    if (input !== '') {
      timeout = setTimeout(() => {
        this.getSuggestions(input);
      }, SEARCH_DEBOUNCE);
    }

    this.setState({
      searchInput: input,
      timeout,
      isValidTicker: false
    });
    this.props.onSearchCompleted([]);
  }

  getSuggestions = (ticker) => {
    stockService.getSuggestions(ticker)
      .then((suggestions) => {
        this.props.onSearchCompleted(suggestions);
        const isValidTicker = this.isValidTicker(suggestions, this.state.searchInput);
        this.setState({
          isValidTicker
        });
      });
  }

  addTicker = () => {
    this.props.onItemAdded(this.state.searchInput);
    this.props.onSearchCompleted([]);
    this.setState({
      searchInput: '',
      isValidTicker: false
    });
  }

  isValidTicker(suggestions) {
    const { searchInput } = this.state;

    for (let i = 0; i < suggestions.length; i += 1) {
      if (suggestions[i].symbol === searchInput) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search...'
          type='text'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          onChangeText={this.onChangeText}
          value={this.state.searchInput}
          autoCapitalize='characters'
        />
        <View style={styles.addButton}>
          <Button
            color='#48BBEC'
            title='ADD'
            onPress={this.addTicker}
            disabled={!this.state.isValidTicker}
          />
        </View>
      </View>
    );
  }
}

SearchBar.propTypes = {
  onItemSelected: PropTypes.object,
  onItemAdded: PropTypes.func.isRequired,
  onSearchCompleted: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  onItemSelected: null
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchInput: {
    padding: scale(5),
    height: scale(32),
    flex: 4,
    fontSize: scale(16),
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: scale(8),
    color: '#48BBEC'
  },

  addButton: {
    paddingLeft: scale(5),
    height: scale(32),
    flex: 1
  }
});

export default SearchBar;
