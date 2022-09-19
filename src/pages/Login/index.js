import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';

import styles from './Login.module.scss';
import { useStore, actions } from '~/Store';
import { InputUserName, InputPassword, WarningUserLogin } from '~/components/componentDetail';
import Apis, { endpoints } from '~/Apis/Apis';

const cx = classNames.bind(styles);

function Login() {
    const wrapperRef = useRef(null);
    const warningLoginRef = useRef(null);
    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const { userName, password, checkUserValid, checkPassValid, warningLogin } = state;

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (warningLogin === true) {
            warningLoginRef.current.style.display = 'block';
        } else if (warningLogin === false) {
            warningLoginRef.current.style.display = 'none';
        }
    }, [warningLogin]);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (checkUserValid && checkPassValid) {
            await Apis.post(endpoints['login'], {
                username: userName,
                password: password,
            })
                .then((res) => {
                    cookies.save('origin-movie-access_token', res.data.access_token);
                })
                .catch(function (error) {
                    dispatch(actions.setWarningLogin(true));
                    console.log(error);
                });

            await Apis.get(endpoints['current_user'], {
                headers: {
                    Authorization: `Bearer ${cookies.load('origin-movie-access_token')}`,
                },
            })
                .then((res) => {
                    cookies.save('origin-movie-user', res.data);
                    dispatch(actions.setUserLogin(res.data));
                    navigate('/');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <div className={cx('wrapper-warning')} ref={warningLoginRef}>
                <WarningUserLogin />
            </div>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap-title')}>
                    <h2>Đăng nhập</h2>
                </div>

                <div className={cx('gallery-wrap')}>
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <InputUserName />
                        <InputPassword />
                        <div className={cx('gallery-wrap-input')}>
                            <div className={cx('wrap-input')}>
                                <input type={'submit'} className={cx('submit')} id={'submit'} value={'Đăng nhập'} />
                            </div>
                        </div>
                    </form>

                    <div className={cx('forgot-password')}>
                        <span>
                            <Link to={'/'}>Quên mật khẩu</Link>
                        </span>
                    </div>
                    <div className={cx('wrap-or')}>
                        <div className={cx('cross')}></div>
                        <span>hoặc</span>
                    </div>

                    <div className={cx('gallery-wrap-facebook')}>
                        <div className={cx('wrap-input')}>
                            <input
                                type={'button'}
                                className={cx('login-facebook')}
                                id={'login-facebook'}
                                value={'Facebook'}
                            />
                        </div>
                    </div>
                    <div className={cx('gallery-wrap-input')}>
                        <div className={cx('wrap-input')}>
                            <input
                                type={'button'}
                                className={cx('login-google')}
                                id={'login-google'}
                                value={'Google'}
                            />
                        </div>
                    </div>

                    <div className={cx('forgot-password')}>
                        <span className={cx('quest')}>Chưa có tài khoản?</span>
                        <span>
                            <Link to={'/dang-ky'}>Đăng ký ngay</Link>
                        </span>
                    </div>

                    <div className={cx('forgot-password')}>
                        <span>
                            <Link to={'/'}>Chính sách và quy định</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
