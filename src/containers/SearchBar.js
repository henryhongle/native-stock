import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { searchTicker, clearTickerSearch } from '../actions/searchActions';
import styles from './SearchBar.style';
import { scale } from '../helpers/baseStyles';

const SEARCH_DEBOUNCE = 300;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      searchInput: ''
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.keyword !== this.props.keyword
      && this.props.keyword === '') {
      this.textInput.clear();
    }
  }

  searchTicker = (input) => {
    this.setState({
      searchInput: input
    });

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (input === '') {
      this.props.clearTickerSearch();
      return;
    }

    this.timeout = setTimeout(() => {
      this.props.searchTicker(input);
    }, SEARCH_DEBOUNCE);
  }

  clearSearch = () => {
    this.textInput.clear();
    this.props.clearTickerSearch();
    this.setState({
      searchInput: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchIcon}>
          <Icon name='search' size={scale(22)} color='#000' />
        </View>
        <TextInput
          ref={(input) => { this.textInput = input; }}
          style={styles.textInput}
          autoCapitalize='characters'
          autoCorrect={false}
          spellCheck={false}
          placeholder='Search'
          onChangeText={this.searchTicker}
        />
        { this.state.searchInput.length > 0 &&
          <View style={styles.clearIcon}>
            <Icon
              name='clear'
              size={scale(18)}
              color='#000'
              onPress={this.clearSearch}
            />
          </View>
        }
      </View>
    );
  }
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  searchTicker: PropTypes.func.isRequired,
  clearTickerSearch: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => {
  return {
    keyword: state.search.keyword
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchTicker: ticker => dispatch(searchTicker(ticker)),
    clearTickerSearch: () => dispatch(clearTickerSearch())
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(SearchBar);
