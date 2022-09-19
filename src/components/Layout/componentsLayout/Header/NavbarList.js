import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import images from '~/assets/images';
import { useState } from 'react';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useStore, actions } from '~/Store';

const cx = classNames.bind(styles);

function NabbarList(props) {
    const [state, dispatch] = useStore();
    const { menu } = state;
    const { numberMenu, active, HandleActive, HandleChangeIndex } = props;
    let activeMenu;

    return (
        <ul className={cx('navbar-inner-list')}>
            {menu &&
                menu.map((item, index) => {
                    if (index <= numberMenu) {
                        activeMenu = index === active ? 'active' : '';
                        return (
                            <li key={index} className={cx(activeMenu)} onClick={() => HandleActive(index)}>
                                <Link to={'/' + item.url} className={cx('navbar-item')}>
                                    {item.menuLogo ? (
                                        <img className={cx('navbar-item-img')} src={item.menuLogo} alt="" />
                                    ) : (
                                        ''
                                    )}
                                    {item.content}
                                </Link>
                            </li>
                        );
                    } else if (index === menu.length - 1) {
                        return (
                            <li key={index} className={cx('navbar-item-them')}>
                                <a className={cx('navbar-item')}>
                                    Xem thêm
                                    <FontAwesomeIcon className={cx('navbar-item-icon')} icon={faAngleDown} />
                                </a>
                                <ul className={cx('subnavbar-inner-list')}>
                                    {menu.map((item, index) => {
                                        if (index > numberMenu) {
                                            return (
                                                <li key={index} onClick={() => HandleChangeIndex(index)}>
                                                    <Link to={'/' + item.url} className={cx('subnavbar-item')}>
                                                        <img src={item.menuLogo} alt="" />
                                                        {item.content}
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </li>
                        );
                    }
                })}
        </ul>
    );
}

export default NabbarList;
