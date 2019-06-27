import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
// import './itemList.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

const CustomListGroupItem = styled(ListGroupItem)`
    cursor: pointer;
`

export default class ItemList extends Component {

    state = {
        itemList: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
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
        return arr.map((item) => {
            const { key } = item;
            const label = this.props.renderItem(item);

            return (
                <>
                    <CustomListGroupItem
                        key={key}
                        onClick={() => this.props.onItemSelected(key)}>
                        {label}
                    </CustomListGroupItem>
                </>
            )
        })
    }

    render() {

        const { itemList, error } = this.state;

        if (!itemList) {
            return <Spinner />
        }

        if (error) {
            return <ErrorMessage />
        }

        const items = this.renderItems(itemList);

        if (itemList) {
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