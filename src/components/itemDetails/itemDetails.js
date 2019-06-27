import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemDetailsWrap = styled.div`
    background-color: #fff;
    padding: 25px 25px 25px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`

const Field = ({ item, field, label }) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    )
}
export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        itemIsChosen: false,
        error: false,
        loading: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { getData, itemId } = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            item: null,
            loading: true,
            itemIsChosen: true
        })

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    error: false
                })
            })
            .catch(() => {
                this.setState({
                    error: true,
                    loading: false
                })
            })
        // this.foo.bar = 0;
    }

    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        const {itemMessage} = this.props;

        const { item, itemIsChosen, loading, error } = this.state;

        const View = ({ item }) => {

            const { name } = item;
        
            return (
                <>
                    <h4>{name}</h4>
                    <ListGroup flush>
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item})
                            })
                        }
                    </ListGroup>
                </>
            )
        }

        
        const chooseItem = (
            <>Please {itemMessage}</>
        )

        const nullItem = !itemIsChosen ? chooseItem : null;

        const spinner = loading ? <Spinner /> : null;

        const errorMessage = error ? <ErrorMessage /> : null;

        const content = !(loading || error || !item) ? <View item={item} /> : null;

        return (
            <ItemDetailsWrap className="rounded">
                {nullItem}
                {errorMessage}
                {spinner}
                {content}
            </ItemDetailsWrap>
        );
    }
}


