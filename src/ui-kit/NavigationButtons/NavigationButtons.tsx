import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationButtons.scss';

export type NavigationButtonProps = {
    name: string,
    link: string,
    isSelected?: boolean
}

export default React.memo(({ buttons }: { buttons: NavigationButtonProps[] }) => {
    const { pathname } = useLocation();
    const currentPage = buttons.findIndex(b => b.link === pathname) + 1;
    return (
        <div id="navigation-buttons" className="no-select">
            {buttons.map((e, i) => <HeaderButton key={i} {...e} isSelected={pathname === e.link}/>)}
            <div className={'navigation-buttons__animation navigation-buttons__start-' + currentPage}/>
        </div>
    );
});

function HeaderButton({name, link, isSelected}: NavigationButtonProps) {
    return (
        <Link to={link} id={isSelected ? "selected" : undefined}>
            <span>{name}</span>
        </Link>
    );
}