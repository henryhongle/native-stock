import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import { dismissError } from '../actions/errorActions';
import { scale } from '../helpers/Reponsive';

const { width } = Dimensions.get('window');

class FlashMessage extends React.Component {
  componentWillReceiveProps() {
    this.props.dismissError();
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.flashContainer}>
          { this.props.errors.message &&
          <Text style={styles.message}>{this.props.errors.message}</Text> }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
    padding: 0
  },

  flashContainer: {
    height: scale(40),
    backgroundColor: 'red'
  },

  message: {
    textAlign: 'center',
    color: 'white',
    fontSize: scale(16),
    padding: scale(10),
    width
  }
});

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
