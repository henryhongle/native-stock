import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { addPosition } from '../actions/portfolioActions';
import styles from './AddPosition.style';

// const validNumber = RegExp(/\^d+(\.\d{0,2})?$/);
const validNumber = RegExp(/^\d+\.?\d{0,2}?$/);

class AddPosition extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.item.symbol
  })

  constructor(props) {
    super(props);
    this.state = {
      costPerShare: '',
      numShares: '',
      fees: '',
      isValidFormState: false,
      isValidNumShares: false,
      isValidCostPerShare: false,
      isValidFees: false,
      date: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      costPerShare,
      numShares,
      fees,
      date
    } = this.state;

    if (prevState.costPerShare !== costPerShare
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
    if (validNumber.test(numShares)) {
      this.setState({
        numShares,
        isValidNumShares: true
      });
    } else {
      this.setState({
        numShares,
        isValidNumShares: false
      });
    }
  }

  onChangecostPerShare = (costPerShare) => {
    this.setState({
      costPerShare: costPerShare.replace(/[^0-9]/g, '')
    });

    if (validNumber.test(costPerShare)) {
      this.setState({
        costPerShare,
        isValidCostPerShare: true
      });
    } else {
      this.setState({
        costPerShare,
        isValidCostPerShare: false
      });
    }
  }

  onChangeFees = (fees) => {
    if (validNumber.test(fees)) {
      this.setState({
        fees,
        isValidFees: true
      });
    } else {
      this.setState({
        fees,
        isValidFees: false
      });
    }
  }

  onDateChange = (date) => {
    this.setState({
      date
    });
  }

  getValidNumberErrorMessage = (isValid) => {
    return !isValid ? 'Enter a valid number' : null;
  }

  addPosition = () => {
    const { navigation } = this.props;
    const position = {
      numShares: parseFloat(this.state.numShares),
      costPerShare: parseFloat(this.state.costPerShare),
      fees: parseFloat(this.state.fees),
      date: new Date(this.state.date),
      symbol: navigation.state.params.item.symbol
    };

    this.props.addPosition(position);
    this.props.navigation.popToTop();
  }

  isValidFormState = () => {
    const {
      costPerShare,
      numShares,
      fees,
      date
    } = this.state;
    return costPerShare !== '' && numShares !== '' && fees !== '' && date !== null;
  }

  render() {
    const { isValidNumShares, isValidCostPerShare, isValidFees } = this.state;
    const numSharesErr = this.getValidNumberErrorMessage(isValidNumShares);
    const costPerShareErr = this.getValidNumberErrorMessage(isValidCostPerShare);
    const feesErr = this.getValidNumberErrorMessage(isValidFees);

    return (
      <View style={styles.container} >
        <View style={styles.inputContainer}>
          <Input
            placeholder='Buy price'
            value={this.state.costPerShare}
            keyboardType='numeric'
            onChangeText={this.onChangecostPerShare}
            errorMessage={costPerShareErr}
          />
          <Input
            value={this.state.numShares}
            placeholder='Number of shares'
            keyboardType='numeric'
            onChangeText={this.onChangeNumShares}
            errorMessage={numSharesErr}
          />
          <Input
            value={this.state.fees}
            placeholder='Transaction fees'
            keyboardType='numeric'
            onChangeText={this.onChangeFees}
            errorMessage={feesErr}
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
          onPress={this.addPosition}
        />
      </View>
    );
  }
}

AddPosition.propTypes = {
  navigation: PropTypes.object.isRequired,
  addPosition: PropTypes.func.isRequired
};

const mapStatetoProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPosition: position => dispatch(addPosition(position))
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddPosition);
