import React, { useEffect } from 'react';
import images from '~/assets/images';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useStore, actions } from '~/Store';

const cx = classNames.bind(styles);

function MobileHeader(props) {
    const [state, dispatch] = useStore();
    const { menu } = state;
    const { userLogin, active, HandleActive, HandleChangeIndex, handleClickMobileNavbarItem } = props;
    let activeMenu;

    return (
        <div className={cx('mobile-menu_wrap')}>
            <ul className={cx('navbar-inner-list')}>
                {menu &&
                    menu.map((item, index) => {
                        // activeMenu = index === active ? 'active' : '';
                        return (
                            <li key={index}>
                                <Link
                                    to={'/' + item.url}
                                    className={cx('navbar-item')}
                                    onClick={() => handleClickMobileNavbarItem()}
                                >
                                    {item.content}
                                </Link>
                            </li>
                        );
                    })}

                <li className={cx('search')}>
                    <Link to={'/tim-kiem'} className={cx('navbar-item')} onClick={() => handleClickMobileNavbarItem()}>
                        <FontAwesomeIcon className={cx('search-item')} icon={faMagnifyingGlass} />
                    </Link>
                </li>
                <li>
                    <Link to={'/'} className={cx('navbar-item')} onClick={() => handleClickMobileNavbarItem()}>
                        MUA GÓI
                    </Link>
                </li>
                <li>
                    {userLogin ? (
                        <Link to={'/'} className={cx('navbar-item')} onClick={() => handleClickMobileNavbarItem()}>
                            <img src={images.iconDefaultUse} alt="img-user" className={cx('img-user')} />
                        </Link>
                    ) : (
                        <Link
                            to="/dang-nhap"
                            className={cx('navbar-item')}
                            onClick={() => handleClickMobileNavbarItem()}
                        >
                            Đăng nhập
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default MobileHeader;
