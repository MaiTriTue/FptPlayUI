import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './InputRePassword.module.scss';
import { useStore, actions } from '~/Store';

const cx = classNames.bind(styles);

function InputRePassword() {
    const [state, dispatch] = useStore();
    const { password, rePassword, checkRePassValid } = state;
    const warningPassNoneRef = useRef(null);
    const warningRePassRef = useRef(null);
    const warningPassLessThan6dRef = useRef(null);
    const warningIconRef = useRef(null);
    const checkIconRef = useRef(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (rePassword.length > 0 && password === rePassword) {
            dispatch(actions.setCheckRePassvalid(true));
        } else {
            dispatch(actions.setCheckRePassvalid(false));
        }
        if (rePassword.length >= 6) {
            warningIconRef.current.style.display = 'none';
            warningPassLessThan6dRef.current.style.display = 'none';
        }
        if (rePassword.length > 0) {
            warningPassNoneRef.current.style.display = 'none';
        }
        if (rePassword.length < 6) {
            checkIconRef.current.style.display = 'none';
        }
        if (rePassword !== password) {
            warningRePassRef.current.style.display = 'block';
        }
        if (rePassword === password && rePassword.length !== 0) {
            warningRePassRef.current.style.display = 'none';
            checkIconRef.current.style.display = 'block';
        }
    }, [rePassword]);

    useEffect(() => {
        if (rePassword.length > 0 && password === rePassword) {
            dispatch(actions.setCheckRePassvalid(true));
        }
    }, [checkRePassValid]);

    const HandleUserNameBlur = () => {
        if (rePassword.length === 0) {
            warningPassNoneRef.current.style.display = 'block';
            warningIconRef.current.style.display = 'block';
            checkIconRef.current.style.display = 'none';
        } else if (rePassword.length < 6 && rePassword.length > 0) {
            warningPassLessThan6dRef.current.style.display = 'block';
            warningIconRef.current.style.display = 'block';
            checkIconRef.current.style.display = 'none';
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <div className={cx('gallery-wrap-input')}>
                        <div className={cx('wrap-input')}>
                            <input
                                ref={inputRef}
                                type={'password'}
                                className={cx('userName')}
                                id={'password-confirmation'}
                                value={rePassword}
                                onChange={(event) => {
                                    dispatch(actions.setRePasswordInput(event.target.value));
                                }}
                                onBlur={(e) => HandleUserNameBlur(e)}
                                placeholder={'Nhập lại mật khẩu'}
                            />
                            <div className={cx('wrap-warning-icon')} ref={warningIconRef}>
                                <FontAwesomeIcon icon={faCircleExclamation} className={cx('warning-icon')} />
                            </div>
                            <div className={cx('wrap-check-icon')} ref={checkIconRef}>
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            </div>
                        </div>

                        <div className={cx('warning-input')}>
                            <span ref={warningPassNoneRef} className={cx('warning-password-input')}>
                                Vui lòng nhập mật khẩu
                            </span>
                            <span ref={warningPassLessThan6dRef} className={cx('warning-password-input')}>
                                mật khẩu phải có ít nhất 6 ký tự
                            </span>
                            <span ref={warningRePassRef} className={cx('warning-password-input')}>
                                mật khẩu nhập lại không khớp
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputRePassword;
