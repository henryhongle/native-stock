import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { dismissError } from '../actions/errorActions';
import styles from './FlashMessage.style';

class FlashMessage extends React.Component {
  componentDidUpdate() {
    if (this.props.errors.message) {
      this.props.dismissError();
    }
  }

  render() {
    return (
      <View style={styles.container} >
        { this.props.errors.message &&
          <View style={styles.flashContainer}>
            <Text style={styles.message}>{this.props.errors.message}</Text>
          </View>
        }
      </View>
    );
  }
}

FlashMessage.propTypes = {
  dismissError: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  dismissError: () => {
    dispatch(dismissError());
  }
});

export default connect(mapStatetoProps, mapDispatchToProps)(FlashMessage);
