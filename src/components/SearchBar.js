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
import { scale } from '../helpers/Reponsive';

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
        this.props.onItemAdded(this.state.searchInput);
        this.props.onSearchCompleted([]);
        this.setState({
            searchInput: '',
            isValidTicker: false
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
                    placeholder='Search...'
                    type="text"
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    onChangeText={this._onChangeText}
                    value={this.state.searchInput}
                    autoCapitalize="characters"
                />
                <View style={styles.addButton}w>
                    <Button 
                        color='#48BBEC'
                        title='ADD'
                        onPress={this._onAddPressed}
                        disabled={!this.state.isValidTicker}
                    />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: scale(40)
    },

    searchInput: {
        padding: scale(5),
        height: scale(32),
        flexGrow: 4,
        fontSize: scale(16),
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },

    addButton: {
        flexGrow: 1,
        minWidth: scale(50)
    }
});
