import React from 'React';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { dismissError } from '../actions/errorActions';
import { scale } from '../helpers/Reponsive';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class FlashMessage extends React.Component {
    componentWillReceiveProps(nextProp) {
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
        backgroundColor: 'red',
    },

    message: {
        textAlign: 'center',
        color: 'white',
        fontSize: scale(16),
        padding: scale(10),
        width: width
    }
});

const mapStatetoProps = (state) => {
    return {
        errors: state.errors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dismissError: () => {
            dispatch(dismissError());
        }
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(FlashMessage);