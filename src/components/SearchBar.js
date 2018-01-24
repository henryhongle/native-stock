import React from 'React';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    FlatList,
    Dimensions
} from 'react-native';
import { stockService } from '../services/StockService';
const SEARCH_DEBOUNCE = 500;

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            timeout: null,
            suggestions: [],
            isValidTicker: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { onItemSelected } = nextProps;
        if (onItemSelected && onItemSelected != this.props.onItemSelected) {
            this.setState({
                searchInput: onItemSelected.symbol,
                isValidTicker: true
            });
        }
    }

    _onChangeText = (input) => {
        //TODO sanitize string only
        let timeout = null;
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }

        if (input !== '') {
            timeout = setTimeout(() => {
                this._getSuggestions(input);
            }, SEARCH_DEBOUNCE);
        }

        this.setState({
            searchInput: input,
            timeout,
            suggestions: [],
            isValidTicker: false
        });
        this.props.onSearchCompleted([]);
    }

    _getSuggestions = (ticker) => {
        stockService.getSuggestions(ticker)
        .then( (suggestions) => {
            this.props.onSearchCompleted(suggestions);
            const isValidTicker = this._isValidTicker(suggestions, this.state.searchInput);
            this.setState({
                suggestions,
                isValidTicker: isValidTicker
            });
        })
    }

    _onAddPressed = () => {
        stockService.addTicker(this.state.searchInput)
        .then(result => {
            this.props.onItemAdded(result);
            this.props.onSearchCompleted([]);
            this.setState({
                searchInput: ''
            });
        });
    }

    _isValidTicker(suggestions, ticker) {
        for (i = 0; i < suggestions.length; i++) {
            if (suggestions[i].symbol === ticker) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <View style ={styles.inputContainer}>
                <TextInput style={styles.searchInput}
                    placeholder='APPL'
                    type="text"
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    onChangeText={this._onChangeText}
                    value={this.state.searchInput}
                    autoCapitalize="characters"
                />
                <Button
                    color='#48BBEC'
                    title='Add'
                    onPress={this._onAddPressed}
                    disabled={!this.state.isValidTicker}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    searchInput: {
        padding: 5,
        margin: 5,
        height: 32,
        flexGrow: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    }
});
