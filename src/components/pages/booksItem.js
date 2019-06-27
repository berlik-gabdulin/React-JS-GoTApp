import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import gotService from '../../services/gotService';

export default class BooksItem extends Component {
    gotService = new gotService();

    state = {
        item: 3
    }

    render() {
        return (
            <ItemDetails 
            getData={this.gotService.getBook}
            itemId={this.state.item}
            itemMessage={"choose a book"} >
                <Field field='released' label='Released at'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='numberOfPages' label='Number of pages'/>
            </ItemDetails>
        )
    }
}