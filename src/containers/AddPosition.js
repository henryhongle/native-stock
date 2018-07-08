import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import {
  View,
  Picker
} from 'react-native';
import styles from './AddPosition.style';

class AddPosition extends React.Component {
  static navigationOptions = () => ({
    title: ''
  });

  constructor(props) {
    super(props);
    this.state = {
      ticker: null
    };
  }

  renderAvailableTickers = () => {
    const { tickers } = this.props;
    const options = R.map((ticker) => {
      return <Picker.Item label={ticker} value={ticker} key={ticker} />;
    }, tickers);

    return (
      <Picker
        selectedValue={this.state.ticker}
        onValueChange={itemValue => this.setState({ ticker: itemValue })}
      >
        {options}
      </Picker>
    );
  }

  render() {
    return (
      <View style={styles.container} >
        {this.renderAvailableTickers()}
      </View>
    );
  }
}

AddPosition.propTypes = {
  tickers: PropTypes.array.isRequired
};

const mapStatetoProps = (state) => {
  return {
    tickers: state.stocks.stocks.allIds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddPosition);
