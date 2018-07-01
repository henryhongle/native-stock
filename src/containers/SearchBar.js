import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SearchBar as Search } from 'react-native-elements';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { searchTicker, clearTickerSearch } from '../actions/searchActions';

const SEARCH_DEBOUNCE = 300;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.keyword !== this.props.keyword
      && this.props.keyword === '') {
      this.search.clearText();
    }
  }

  searchTicker = (ticker) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (ticker === '') {
      this.props.clearTickerSearch();
      return;
    }

    this.timeout = setTimeout(() => {
      this.props.searchTicker(ticker);
    }, SEARCH_DEBOUNCE);
  }

  render() {
    return (
      <View style={{ paddingTop: Constants.statusBarHeight, backgroundColor: 'white' }}>
        <Search
          ref={(search) => { this.search = search; }}
          lightTheme
          placeholder='Search...'
          onClear={this.props.clearTickerSearch}
          onChangeText={this.searchTicker}
          clearIcon
        />
      </View>
    );
  }
}

SearchBar.propTypes = {
  keyword: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
