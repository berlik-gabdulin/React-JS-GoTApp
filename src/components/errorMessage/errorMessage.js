import React from 'react';
import img from './error.jpg';
import styled from 'styled-components';

const ErrorBlock = styled.div`
    background: #fff;
    img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
    }
    span {
        text-transform: uppercase;
        text-align: center;
    }
`

const ErrorMessage = () => {
    return (
        <ErrorBlock>
            {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error message'/> */}
            <img src={img} alt='error-message'/>
            <span>Something goes wrong</span>
        </ErrorBlock>
    )
}

export default ErrorMessage; 