import './ErrorBox.css'
import React from 'react';

type ErrorBoxProps = {
    hidden: boolean;
    message: string;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({hidden, message}) => {
    return <div style={{ visibility: hidden ? 'hidden' : 'visible' }} className={'error-box'}>
        {message}
    </div>
}