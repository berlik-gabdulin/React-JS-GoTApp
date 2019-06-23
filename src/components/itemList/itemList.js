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
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((chetatam) => {
                this.setState({
                    charList: chetatam
                })
            })
    }

    componentWillUnmount() {
        console.log('unmounting');
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <>
                    <CustomListGroupItem
                        key={i}
                        onClick={ () => this.props.onCharSelected(41 + i)}>
                        {item.name}
                    </CustomListGroupItem>
                </>
            )
        })
    }

    render() {

        const { charList } = this.state;

        if (!charList) {
            return <Spinner />
        }

        const items = this.renderItems(charList);

        return (
            <ListGroup className="list-group">
                {items}
            </ListGroup>
        );
    }
}