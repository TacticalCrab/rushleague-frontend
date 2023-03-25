import React from 'react';
import {DigitButton} from '../DigitButton/DigitButton';
import './TeamScoreButtons.css';

type TeamScoreButtonsProps = {
    maxScore: number;
    currentScore: number;

    onScoreChange: (score: number) => void
}

export const TeamScoreButtons: React.FC<TeamScoreButtonsProps> = ({maxScore, currentScore, onScoreChange}) => {
    if (currentScore > maxScore) {
        currentScore = maxScore;
    }

    const digitButtons = [];

    for (let i = 0; i <= maxScore; i++) {
        digitButtons.push(<DigitButton
            onClick={(score) => onScoreChange ? onScoreChange(Number(score)): ''}
            active={currentScore === i}
            key={i}
            value={i} />)
    }

    return <div className={'digit-buttons'}>
        {digitButtons}
    </div>
}