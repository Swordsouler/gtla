import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { performAction } from '../../analytics/analytics';
import { ActionType } from '../../models';
import { RootState } from '../../redux/store';
import './NavigationButtons.scss';

export type NavigationButtonProps = {
    name: string,
    link: string,
    isSelected?: boolean
    actionType: ActionType
}

export default React.memo(({ buttons }: { buttons: NavigationButtonProps[] }) => {
    const { pathname } = useLocation();
    const currentPage = buttons.findIndex(b => pathname.includes(b.link)) + 1;
    return (
        <div id="navigation-buttons" className="no-select">
            {buttons.map((e, i) => <HeaderButton key={i} {...e} isSelected={pathname.includes(e.link)}/>)}
            <div className={'navigation-buttons__animation navigation-buttons__start-' + currentPage}/>
        </div>
    );
});

function HeaderButton({name, link, isSelected, actionType}: NavigationButtonProps) {
    const selfId = useSelector((state: RootState) => state.ReviewManager.selfId);
    return (
        <Link to={link} id={isSelected ? "selected" : undefined} onClick={() => performAction(actionType, selfId)}>
            <span>{name}</span>
        </Link>
    );
}