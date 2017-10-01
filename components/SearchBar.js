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
const SEARCH_DEBOUNCE = 300;

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            timeout: null,
            suggestions: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const { onItemSelected } = nextProps;
        if (onItemSelected && onItemSelected != this.props.onItemSelected) {
            this.setState({
                searchInput: onItemSelected.symbol
            });
        }
    }

    _onChangeText = (input) => {
        //TODO sanitize string only
        let timeout = null;
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }

        input = input.toUpperCase();
        if (input !== '') {
            timeout = setTimeout(() => {
                stockService.getSuggestions(input)
                .then( (result) => {
                    this.props.onSearchCompleted(result);
                    this.setState({
                        suggestions: result
                    });
                })
            }, SEARCH_DEBOUNCE);
        }

        this.setState({
            searchInput: input,
            timeout,
            suggestions: []
        });
        this.props.onSearchCompleted([]);
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
    };

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
                />
                <Button
                    color='#48BBEC'
                    title='Add'
                    onPress={this._onAddPressed}
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