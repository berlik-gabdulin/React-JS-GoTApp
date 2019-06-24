import React, { Component } from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
// import './itemList.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

const CustomListGroupItem = styled(ListGroupItem)`
    cursor: pointer;
`

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList,
                    loading: false
                })
            })
    }

    componentWillUnmount() {
        console.log('unmounting');
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            const customKey = this.gotService._getItemKey(item.url);
            return (
                <>
                    <CustomListGroupItem
                        key={customKey}
                        id={customKey}
                        onClick={ () => this.props.onCharSelected(customKey.split('-')[1])}>
                        {item.name}
                    </CustomListGroupItem>
                </>
            )
        })
    }

    render() {

        const { charList, error } = this.state;

        // const errorMessage = error ? <ErrorMessage /> : null;
        // const errorMessage = error ? <ErrorMessage /> : <ItemList onCharSelected={this.onCharSelected} />;

        if (!charList) {
            return <Spinner />
        }

        if (error) {
            return <ErrorMessage />
        }

        const items = this.renderItems(charList);

        if (charList) {
            return (
                <>
                <ListGroup className="list-group">
                    {items}
                </ListGroup>
                </>
            );
        }
    }
}