import React, { useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { useStore, actions } from '~/Store';
import NabbarList from './NavbarList';
import MobileHeader from './MobileHeader';
import { useRef } from 'react';

const cx = classNames.bind(styles);

const menus = [
    { url: '', content: 'Trang chủ' },
    { url: 'truyen-hinh', content: 'Truyền hình' },
    { url: 'hbo-go', content: 'HBO GO', menuLogo: images.logoMenuHbo },
    { url: 'danh-sach', content: 'Phim bộ' },
    { url: 'danh-sach', content: 'TV show' },
    { url: 'danh-sach', content: 'Anime' },
    { url: 'danh-sach', content: 'Phim lẻ' },
    { url: 'danh-sach', content: 'Phim chiếu rạp' },
    { url: 'danh-sach', content: 'Thể thao' },
    { url: 'danh-sach', content: 'Âm nhạc' },
    { url: 'danh-sach', content: 'Gói đặc sắc' },
    { url: 'danh-sach', content: 'Thiếu nhi' },
    { url: 'danh-sach', content: 'Hài' },
    { url: 'danh-sach', content: 'Học online' },
];

function Header() {
    const [active, setActive] = useState(0);
    // const [screenWidth, setScreenWidth] = useState(0);
    const [numberMenu, setNumberMenu] = useState(9);
    const [indexMenu, setIndexMenu] = useState(0);
    const navigate = useNavigate();
    const mobileMenuRef = useRef(null);
    const [state, dispatch] = useStore();
    const { userLogin } = state;
    let activeMenu;
    let laptopWidth = 1280;
    let tabletWidth = 1024;
    let mobileWidth = 768;

    useEffect(() => {
        dispatch(actions.setMenu(menus));
    }, [menus]);

    useEffect(() => {
        if (active === 0) {
            navigate('/');
        }
    }, [active]);

    useEffect(() => {
        const resizeWindow = (event) => {
            if (window.innerWidth < mobileWidth) {
                //
            } else if (window.innerWidth < tabletWidth && window.innerWidth > mobileWidth) {
                setNumberMenu(7);
            } else if (
                window.innerWidth < laptopWidth &&
                window.innerWidth > tabletWidth &&
                window.innerWidth > mobileWidth
            ) {
                setNumberMenu(8);
            } else {
                setNumberMenu(9);
            }
        };
        window.addEventListener('resize', resizeWindow);

        return () => {
            window.removeEventListener('resize', resizeWindow);
        };
    }, []);

    useEffect(() => {
        if (window.innerWidth < mobileWidth) {
            //
        } else if (window.innerWidth < tabletWidth && window.innerWidth > mobileWidth) {
            setNumberMenu(7);
        } else if (
            window.innerWidth < laptopWidth &&
            window.innerWidth > tabletWidth &&
            window.innerWidth > mobileWidth
        ) {
            setNumberMenu(8);
        } else {
            setNumberMenu(9);
        }
    }, [window.innerWidth]);

    useEffect(() => {
        if (indexMenu > numberMenu) {
            let value;
            for (let i = 0; i < menus.length; i++) {
                for (let j = 0; j < menus.length; j++) {
                    if (i === numberMenu && j === indexMenu) {
                        value = menus[i];
                        menus[i] = menus[j];
                        menus[j] = value;
                    }
                }
            }
            dispatch(actions.setMenu(menus));
            setActive(numberMenu);
        } else {
            setActive(indexMenu);
        }
    }, [indexMenu]);

    const HandleActive = (index) => {
        setIndexMenu(index);
    };
    const HandleChangeIndex = (index) => {
        setIndexMenu(index);
    };

    const handleClickMobileMenu = () => {
        mobileMenuRef.current.style.display = 'block';
    };
    const handleClickMobileModelNavbar = () => {
        mobileMenuRef.current.style.display = 'none';
    };
    const handleClickMobileNavbarItem = () => {
        mobileMenuRef.current.style.display = 'none';
        // navigate(urlItem);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-logo_menu-mobile')}>
                    <FontAwesomeIcon
                        icon={faBars}
                        className={cx('logo_menu-mobile')}
                        onClick={() => {
                            handleClickMobileMenu();
                        }}
                    />
                </div>
                <div className={cx('header-logofpt')}>
                    <Link to={'/'}>
                        <img src={images.logoFpt} alt="FPT" className={cx('logo')} />
                    </Link>
                </div>
                <div className={cx('header-inner')}>
                    <div className={cx('header-logo')}>
                        <div className={cx('header-logo-dowload')}>
                            <img className={cx('logo-dowload')} src={images.logoDowload} alt="Fpt-Play" />
                            <div className={cx('qr-codes')}>
                                <div className={cx('qr-code')}>
                                    <img className={cx('qr-android')} src={images.qrAndroid} />
                                    <img className={cx('icon-google-play')} src={images.iconGooglePlay} />
                                </div>
                                <div className={cx('qr-code')}>
                                    <img className={cx('qr-appstore')} src={images.qrAppStore} />
                                    <img className={cx('icon-appstore')} src={images.iconAppStore} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('header-logo-register')}>
                            <Link to="/dang-ky-dich-vu" className={cx('header-logo-register-link')}>
                                <img className={cx('logo-register')} src={images.logoRegister} alt="Fpt-Play" />
                                <img
                                    className={cx('logo-register-hover')}
                                    src={images.logoRegisterHover}
                                    alt="Fpt-Play"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={cx('header-function')}>
                        <ul className={cx('header-function-list')}>
                            <li className={cx('search')} onClick={() => HandleActive(-1)}>
                                <Link to={'/tim-kiem'}>
                                    <FontAwesomeIcon className={cx('search-item')} icon={faMagnifyingGlass} />
                                </Link>
                            </li>
                            <li>
                                <button className={cx({ btnPackage: 'btn-package', btn: 'btn' })}>MUA GÓI</button>
                            </li>
                            <li>
                                {userLogin ? (
                                    <Link to={'/'} className={cx('wrap-img-user')}>
                                        <img src={images.iconDefaultUse} alt="img-user" className={cx('img-user')} />
                                    </Link>
                                ) : (
                                    <Link to="/dang-nhap" className={cx('login')}>
                                        Đăng nhập
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('navbar-mobile')} ref={mobileMenuRef} onClick={handleClickMobileModelNavbar}>
                <div
                    className={cx('navbar-mobile_inner')}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <MobileHeader
                        userLogin={userLogin}
                        active={active}
                        HandleActive={HandleActive}
                        handleClickMobileNavbarItem={handleClickMobileNavbarItem}
                    />
                </div>
            </div>

            <div className={cx('navbar')}>
                <div className={cx('navbar-inner')}>
                    <NabbarList
                        numberMenu={numberMenu}
                        active={active}
                        HandleActive={HandleActive}
                        HandleChangeIndex={HandleChangeIndex}
                    />

                    {/* <ul className={cx('navbar-inner-list')}>
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
                                                <FontAwesomeIcon
                                                    className={cx('navbar-item-icon')}
                                                    icon={faAngleDown}
                                                />
                                            </a>
                                            <ul className={cx('subnavbar-inner-list')}>
                                                {menu.map((item, index) => {
                                                    if (index > numberMenu) {
                                                        return (
                                                            <li key={index} onClick={() => HandleChangeIndex(index)}>
                                                                <Link
                                                                    to={'/' + item.url}
                                                                    className={cx('subnavbar-item')}
                                                                >
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
                    </ul> */}
                </div>
            </div>
        </div>
    );
}

export default Header;
