import React from 'react';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error message'/> */}
            <img src={img} alt='error message'/>
            <span>Something goes wrong</span>
        </>
    )
}

export default ErrorMessage;