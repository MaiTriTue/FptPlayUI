import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import { useStore, actions } from '~/Store';
import { InputUserName, InputPassword, InputRePassword } from '~/components/componentDetail';

const cx = classNames.bind(styles);

function Register() {
    const [state, dispatch] = useStore();
    const { userName, password, checkUserValid, checkPassValid, checkRePassValid } = state;

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (checkUserValid && checkPassValid && checkRePassValid) {
            console.log(userName);
            console.log(password);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap-title')}>
                    <h3>Đăng ký tài khoản</h3>
                </div>

                <div className={cx('gallery-wrap')}>
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <InputUserName />
                        <InputPassword />
                        <InputRePassword />

                        <div className={cx('forgot-password')}>
                            <span>Khi bấm vào nút đăng ký, bạn đã đồng ý với</span>
                            <h5>
                                <Link to={'/'}>Chính sách và quy định</Link>
                            </h5>
                        </div>
                        <div className={cx('gallery-wrap-input')}>
                            <div className={cx('wrap-input')}>
                                <input type={'submit'} className={cx('submit')} id={'submit'} value={'Đăng ký'} />
                            </div>
                        </div>
                    </form>

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
                    <div className={cx('gallery-wrap-google')}>
                        <div className={cx('wrap-input')}>
                            <input
                                type={'button'}
                                className={cx('login-google')}
                                id={'login-google'}
                                value={'Google'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
