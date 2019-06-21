import React, {Component} from 'react';
// import './itemList.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const CustomListGroupItem = styled(ListGroupItem)`
    cursor: pointer;
`

export default class ItemList extends Component {

    render() {
        return (
            <ListGroup className="list-group">
                <CustomListGroupItem>
                    John Snow
                </CustomListGroupItem>
                <CustomListGroupItem>
                    Brandon Stark
                </CustomListGroupItem>
                <CustomListGroupItem>
                    Geremy
                </CustomListGroupItem>
            </ListGroup>
        );
    }
}