import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        charVisible: true
    }

    componentDidMount() {
        console.log('mounting');
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount() {
        console.log('unmounting');
        clearInterval(this.timerId);
    }

    // onCharLoaded = (char) => {
    //     this.setState({
    //         char,
    //         loading: false,
    //         error: false
    //     })
    // }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }


    updateChar = () => {
        const id = Math.floor(Math.random() * 300 + 25); // 25-140
        this.setState({
            char: id,
            loading: false,
            error: false
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        console.log('render');

        const {char, error, loading} = this.state;

        const itemDetails = (
            <ItemDetails 
            getData={this.gotService.getCharacter}
            itemId={char}
            itemMessage={"wait"}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error || !char) ? itemDetails : null;

        return (
            <>
                {spinner}
                {errorMessage}
                {content}
            </>
        );
    }
}