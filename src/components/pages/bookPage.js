import React, { Component } from 'react';
import ItemList from '../itemList';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

class BookPage extends Component {

    gotService = new gotService();

    state = {
        item: null
    }

    render() {
                
        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, publisher }) => `${name} (${publisher})`}/>
        )
    }
}

export default withRouter(BookPage);