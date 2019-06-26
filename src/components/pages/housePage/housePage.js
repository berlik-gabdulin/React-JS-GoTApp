import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousePage extends Component {

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
                getData={this.gotService.getAllHouses}
                renderItem={({ name, region }) => `${name} (${region})`} />
        )
        const itemDetails = (
            <ItemDetails 
            getData={this.gotService.getHouse}
            itemId={this.state.item}
            itemType={"house"}>
                <Field field='words' label='Words'/>
                <Field field='region' label='Region'/>
                <Field field='coatOfArms' label='Coat Of Arms'/>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}