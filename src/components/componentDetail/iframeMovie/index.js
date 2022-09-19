import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';

import cookies from 'react-cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import styles from './iframeMovie.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function IframeMovie(props) {
    const { movieSrc, movieName } = props;
    const iframeRef = useRef(null);
    const posterImageRef = useRef(null);
    const navigate = useNavigate();
    let timeId;

    useEffect(() => {
        if (cookies.load('origin-movie-access_token')) {
            posterImageRef.current.style.display = 'none';
        }
        // timeId = setTimeout(() => {
        //     posterImageRef.current.style.display = 'none';
        // }, 2000);
    }, [movieSrc]);

    const fadeImage = () => {
        // posterImageRef.current.style.display = 'none';
    };

    const handleLogin = () => {
        posterImageRef.current.style.display = 'none';
        navigate('/dang-nhap');
    };

    const handleRegister = () => {
        posterImageRef.current.style.display = 'none';
        navigate('/dang-ky');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <div className={cx('gallery-name')}>
                        <h3>Phim {movieName}</h3>
                    </div>
                    <div className={cx('group')} id="process-video">
                        <div className={cx('poster-image')} id="poster-image" onClick={fadeImage} ref={posterImageRef}>
                            {/* <FontAwesomeIcon icon={faPlay} className={cx('poster-image-icon')} /> */}
                            <div className={cx('poster-image-content')}>
                                <p>
                                    QUÝ KHÁCH CẦN <h3>ĐĂNG NHẬP</h3>
                                </p>
                                <p>
                                    HOẶC <h3>ĐĂNG KÝ TÀI KHOẢN</h3> ĐỂ TIẾP TỤC XEM
                                </p>
                            </div>
                            <img
                                src={images.backgrountCongNghe}
                                alt="cong nghe"
                                className={cx('model-check-login_img')}
                            />
                            <div className={cx('model-check-login')} id="model-check-login">
                                <div className={cx('model-check-login_header')} id="model-check-login_header">
                                    <h3 className={cx('login_header-title')}>Thông báo</h3>
                                </div>
                                <div className={cx('model-check-login_body')} id="model-check-login_body">
                                    <div className={cx('login_body-content')}>
                                        <p>
                                            Vui lòng đăng nhập hoặc đăng ký tài khoản FPT Play để xem tiếp nội dung này!
                                        </p>
                                    </div>
                                    <div className={cx('login_body-btns')}>
                                        <button className={cx('btn-register')} onClick={handleRegister}>
                                            Đăng ký
                                        </button>
                                        <button className={cx('btn-login')} onClick={handleLogin}>
                                            Đăng nhập
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <iframe
                            id="iframeMovie"
                            ref={iframeRef}
                            src={movieSrc}
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IframeMovie;
