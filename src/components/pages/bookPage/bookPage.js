import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {

    gotService = new gotService();

    state = {
        item: null
    }

    onItemSelected = (id) => {
        this.setState({
            item: id
        })
    }

    render() {
        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, publisher }) => `${name} (${publisher})`}/>
        )
        const itemDetails = (
            <ItemDetails 
            getData={this.gotService.getBook}
            itemId={this.state.item}
            itemMessage={"choose a book"} >
                <Field field='released' label='Released at'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='numberOfPages' label='Number of pages'/>
            </ItemDetails>
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails} type={'book'}/>
        )
    }
}