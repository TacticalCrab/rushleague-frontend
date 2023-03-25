import './SubmitButton.css'
import React from 'react';

type SubmitButtonProps = {
    text: string;
    onClick?: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({text, onClick}) => {
    return <>
        <button onClick={onClick} className={'submit-button'} type={'button'}>
            {text}
        </button>
    </>
}