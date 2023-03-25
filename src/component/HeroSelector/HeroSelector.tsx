import {HeroSpecs} from '../../api/Admin/AdminService.interface';
import React, {useState} from 'react';
import './HeroSelector.css';


type HeroSelectorProps = {
    heroSpecs: HeroSpecs;
    onChange?: (heroName: string) => void;
    currentHero: string;
}

export const HeroSelector: React.FC<HeroSelectorProps> = ({heroSpecs, currentHero, onChange}) => {
    const [selectorHidden, setSelectorHidden] = useState(true);

    return <div className={'hero-selector-container'}>
        <div onClick={() => { setSelectorHidden(!selectorHidden) }} className={'hero-current-container'}>
            <div className={'hero-avatar-wrapper'}>
                <div className={'hero-avatar-shadow'}></div>
                <img src={heroSpecs[currentHero].icon || heroSpecs['default'].icon!} className={'hero-avatar'} alt={'hero avatar'} />
            </div>
            <div className={'hero-name'}> {heroSpecs[currentHero].name}</div>
        </div>
        <div style={{ visibility: selectorHidden ? 'hidden' : 'visible'}} className={'hero-selector-select-wrapper'}>
            <div className={'hero-selector-select'}>
                {Object.entries(heroSpecs).map(([heroName, specs]) => {
                    return <div key={heroName}
                                className={'hero-row'}
                                onClick={() => {
                                    setSelectorHidden(true);
                                    onChange ? onChange(heroName) : ''
                                }}>
                        <img className={'hero-avatar'} alt={'hero avatar'} src={specs.icon || heroSpecs['default'].icon!}/>
                        <div className={'hero-name'}>{specs.name}</div>
                    </div>;
                })}
            </div>
        </div>
    </div>
}