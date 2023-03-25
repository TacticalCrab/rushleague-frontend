import './Navbar.css';
import {Avatar} from '../Avatar/Avatar';
import React from 'react';

type NavbarProps = {
    desc?: string;
    tabs?: {
        text: string;
        url: string;
    }[]
}

export const Navbar: React.FC<NavbarProps> = ({desc, tabs}) => {
    return <>
        <nav className={'navbar'}>
            <div className={'navbar-left'}>
                <Avatar/>
                <div className={'navbar-text'}>
                    <div className={'navbar-comp-name'}>
                        LAVEB ESPORTS
                    </div>
                    {desc &&
                        <div className={'navbar-desc'}>
                            {desc}
                        </div>
                    }
                </div>
            </div>
            <div className={'navbar-tabs'}>
                {tabs && tabs.map(({text, url}) => {
                    return <a className={'navbar-tab'} href={url}>{text}</a>
                })}
            </div>
        </nav>
    </>
}