import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';
import {
  View,
  Picker,
  Text
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import styles from './AddPosition.style';

class AddPosition extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.item.symbol
  })

  constructor(props) {
    super(props);
    this.state = {
      price: '',
      numShares: '',
      fees: '',
      isValidFormState: false,
      date: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { price, numShares, fees, date } = this.state;
    if (prevState.price !== price
      || prevState.numShares !== numShares
      || prevState.fees !== fees
      || prevState.date !== date
    ) {
      if (this.isValidFormState()) {
        if (!this.state.isValidFormState) {
          this.setState({
            isValidFormState: true
          });
        }
      } else {
        this.setState({
          isValidFormState: false
        });
      }
    }
  }

  onChangeNumShares = (numShares) => {
    this.setState({
      numShares: numShares.replace(/[^0-9]/g, '')
    });
  }

  onChangePrice = (price) => {
    this.setState({
      price: price.replace(/[^0-9]/g, '')
    });
  }

  onChangeFees = (fees) => {
    this.setState({
      fees: fees.replace(/[^0-9]/g, '')
    });
  }

  onAddPosition = () => {
    this.setState({
      price: '',
      numShares: '',
      fees: '',
      isValidFormState: false
    });

    console.log('navigation', this.props.navigation);
    // this.props.navigation.push('Portfolio');
    this.props.navigation.popToTop();
  }

  onDateChange = (date) => {
    this.setState({
      date
    });
  }

  validateAndUpdateValidFormState = () => {
    const { price, numShares, fees } = this.state;
    if (price !== '' && numShares !== '' && fees !== '') {
      this.setState({
        isValidFormState: true
      });
    }
  }

  isValidFormState = () => {
    const { price, numShares, fees } = this.state;
    return price !== '' && numShares !== '' && fees !== '';
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
        <View style={styles.inputContainer}>
          <Input
            placeholder='Buy price'
            value={this.state.price}
            keyboardType='numeric'
            onChangeText={this.onChangePrice}
          />
          <Input
            value={this.state.numShares}
            placeholder='Number of shares'
            keyboardType='numeric'
            onChangeText={this.onChangeNumShares}
          />
          <Input
            value={this.state.fees}
            placeholder='Transaction fees'
            keyboardType='numeric'
            onChangeText={this.onChangeFees}
          />
          <DatePicker
            style={styles.datePicker}
            date={this.state.date}
            mode='date'
            placeholder='Select date'
            format='YYYY-MM-DD'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            onDateChange={this.onDateChange}
          />
        </View>
        <Button
          title='Add Position'
          disabled={!this.state.isValidFormState}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={this.onAddPosition}
        />
      </View>
    );
  }
}

AddPosition.propTypes = {
  tickers: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
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
