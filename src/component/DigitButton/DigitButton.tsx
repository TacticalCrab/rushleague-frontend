import React from 'react';
import './DigitButton.css';

type DigitButtonProps = {
    value?: number;
    active?: boolean;
    onClick?: (score: number | string) => void
}

export const DigitButton: React.FC<DigitButtonProps> = ({value= "", active=false, onClick}) => {
    if (String(value).length > 1) value = String(value)[0];

    return <div
        onClick={() => onClick ? onClick(value): ''}
        className={'digit-button' + (active ? ' score-box-active': '')}>
        {value}
    </div>
}