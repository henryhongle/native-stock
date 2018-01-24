import React from 'React';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class FlashMessage extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.flashContainer}>
                    { this.props.errors.errors &&
                    <Text style={styles.message}>{this.props.errors.errors}</Text> }
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
        height: 36,
        backgroundColor: 'red',
    },

    message: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        padding: 10,
        width: width
    }
});

const mapStatetoProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStatetoProps)(FlashMessage);