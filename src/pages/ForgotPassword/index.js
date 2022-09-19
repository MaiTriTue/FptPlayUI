import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import styles from './ForgotPassword.module.scss';
import { useStore, actions } from '~/Store';
import { InputUserName, InputPassword, InputRePassword } from '~/components/componentDetail';

const cx = classNames.bind(styles);

function ForgotPassword() {
    const [state, dispatch] = useStore();
    const { userName, password, rePassword, checkCondition } = state;

    useEffect(() => {
        if (checkCondition === 2) {
            console.log(userName);
        }
    }, [checkCondition]);

    const HandleSubmit = (e) => {
        console.log('submit');
        e.preventDefault();
        dispatch(actions.setCheckUserValid(1));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap-title')}>
                    <h3>Quên mật khẩu</h3>
                </div>

                <div className={cx('gallery-wrap')}>
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <div className={cx('forgot-password')}>
                            <span>Vui lòng nhập số điện thoại</span>
                        </div>
                        <InputUserName />

                        <div className={cx('gallery-wrap-input')}>
                            <div className={cx('wrap-input')}>
                                <input
                                    type={'submit'}
                                    className={cx('submit')}
                                    id={'submit'}
                                    value={'Khôi phục mật khẩu'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
