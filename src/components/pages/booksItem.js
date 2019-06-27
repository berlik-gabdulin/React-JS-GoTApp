import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

export default class BooksItem extends Component {
    gotService = new gotService();

    state = {
        error: false
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        const {error} = this.state;
        const data = this.gotService.getBook;

        // const {bookId} = this.props.bookId;

        const itemDetails = (
                <ItemDetails 
                    getData={data}
                    itemId={this.props.bookId}
                    itemMessage={"choose a book"} >
                    <Field field='released' label='Released at'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='numberOfPages' label='Number of pages'/>
                </ItemDetails>
            )
        

        const errorMessage = error ? <ErrorMessage /> : null;
        const content = data ? itemDetails : null;

        return (
            <>
                {errorMessage}
                {content}
            </>
        )
    }
}