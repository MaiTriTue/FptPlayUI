import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './InputPassword.module.scss';
import { useStore, actions } from '~/Store';
import Validator from '../CheckInput';

const cx = classNames.bind(styles);

function InputPassword() {
    const [state, dispatch] = useStore();
    const { userName, password, rePassword, checkPassValid } = state;
    const warningPassNoneRef = useRef(null);
    const warningPassLessThan6dRef = useRef(null);
    const warningPassSpecialCharacterRef = useRef(null);
    const warningIconRef = useRef(null);
    const checkIconRef = useRef(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (password.length >= 6 && !Validator.CheckSpecialCharacter(password)) {
            dispatch(actions.setCheckPassValid(true));
        } else {
            dispatch(actions.setCheckPassValid(false));
        }
        if (password.length >= 6) {
            checkIconRef.current.style.display = 'block';
            warningIconRef.current.style.display = 'none';
            warningPassLessThan6dRef.current.style.display = 'none';
        }

        if (Validator.CheckSpecialCharacter(password)) {
            checkIconRef.current.style.display = 'none';
            warningPassSpecialCharacterRef.current.style.display = 'block';
            warningIconRef.current.style.display = 'block';
        } else if (!Validator.CheckSpecialCharacter(password)) {
            checkIconRef.current.style.display = 'block';
            warningPassSpecialCharacterRef.current.style.display = 'none';
            warningIconRef.current.style.display = 'none';
        }

        if (password.length > 0) {
            warningPassNoneRef.current.style.display = 'none';
        }
        if (password.length < 6) {
            checkIconRef.current.style.display = 'none';
        }
    }, [password]);

    useEffect(() => {
        if (password.length >= 6 && !Validator.CheckSpecialCharacter(password) && !checkPassValid) {
            dispatch(actions.setCheckPassValid(true));
        }
    }, [checkPassValid]);

    const HandleUserNameBlur = () => {
        if (password.length === 0) {
            warningPassNoneRef.current.style.display = 'block';
            warningIconRef.current.style.display = 'block';
            checkIconRef.current.style.display = 'none';
        } else if (password.length < 6 && password.length > 0) {
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
                                id={'password'}
                                value={password}
                                onChange={(event) => {
                                    dispatch(actions.setPasswordInput(event.target.value));
                                }}
                                onBlur={(e) => HandleUserNameBlur(e)}
                                placeholder={'Mật khẩu'}
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
                            <span ref={warningPassSpecialCharacterRef} className={cx('warning-password-input')}>
                                mật khẩu không thể chứa các kí tự đặc biệt
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputPassword;
