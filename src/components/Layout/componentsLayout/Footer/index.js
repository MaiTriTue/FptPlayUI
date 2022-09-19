import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faDisplay,
    faEnvelopeOpenText,
    faGlobe,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import images from '~/assets/images';

import styles from './Footer.module.scss';
import { faAndroid, faApple, faBootstrap, faFacebook } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('footer_logo')}>
                    <div className={cx('footer_logo-img')}>
                        <Link to={'/'}>
                            <img src={images.logoFpt} alt=" logo-fpt" />
                        </Link>
                    </div>
                    <div className={cx('footer_logo-img')}>
                        <Link to={'/'}>
                            <img src={images.logoBCT} alt=" logo-BCT" />
                        </Link>
                    </div>
                    <div className={cx('footer_logo-img')}>
                        <Link to={'/'}>
                            <img src={images.logoDMCA} alt=" logo-dmca" />
                        </Link>
                    </div>
                </div>
                <div className={cx('footer_contacts')}>
                    <div className={cx('category-link')}>
                        <ul>
                            <li>
                                <Link to={'/'}>Gói data</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Quảng cáo</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Dịch vụ</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Điều khoản</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Chính sách</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Liên hệ</Link>
                            </li>
                            <li>
                                <Link to={'/'}>Cửa hàng</Link>
                            </li>

                            <li>
                                <img src={images.logoBrowser} alt="browses" className={cx('btnIcon')} />
                                <img src={images.logoSmarttv} alt="Smarttv" className={cx('btnIcon')} />
                                <img src={images.logoApple} alt="Apple" className={cx('btnIcon')} />
                                <img src={images.logoAndroid} alt="Android" className={cx('btnIcon')} />
                                <img src={images.logoBox} alt="Box" className={cx('btnIcon')} />
                            </li>
                        </ul>
                    </div>
                    <div className={cx('about-infomation')}>
                        <span>Công ty Cổ phần Viễn Thông FPT - Người đại diện: Ông Hoàng Việt Anh</span>

                        <span>Trụ sở: Tầng 8, tòa nhà FPT Tower, số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội</span>

                        <span>Điện thoại: 19006600. Email: hotrofptplay@fpt.com.vn</span>

                        <span>
                            Số giấy chứng nhận đăng ký kinh doanh: 0101778163 do Sở Kế Hoạch Đầu Tư Thành Phố Hà Nội cấp
                            vào ngày 28/07/2005
                        </span>

                        <span>
                            Giấy phép Cung cấp Dịch vụ Phát thanh, Truyền hình trên mạng Internet số 568/GP-BTTTT cấp
                            ngày 7/12/2020.
                        </span>
                    </div>
                </div>
                <div className={cx('footer_about')}>
                    <div className={cx('btnFacebook')}>
                        <FontAwesomeIcon icon={faFacebook} className={cx('btnFacebook-icon')} />
                    </div>
                    <div className={cx({ btnMessage: 'footer_about-message', btn: 'btn' })}>
                        <Link to={'https://hotro.fptplay.vn/hc/vi'}>
                            <FontAwesomeIcon icon={faEnvelopeOpenText} className={cx('iconMessage')} />
                            <span>Hỗ trợ</span>
                        </Link>
                    </div>
                    <div className={cx({ btnPhone: 'footer_about-fhone', btn: 'btn' })}>
                        <FontAwesomeIcon icon={faPhone} />
                        <span>19006600</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
