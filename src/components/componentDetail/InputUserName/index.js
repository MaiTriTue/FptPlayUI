import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './InputUserName.module.scss';
import { useStore, actions } from '~/Store';
import Validator from '../CheckInput';

const cx = classNames.bind(styles);

function InputUserName() {
    const [state, dispatch] = useStore();
    const { userName, checkUserValid } = state;
    const warningUserRef = useRef(null);
    const warningIconRef = useRef(null);
    const warningPassSpecialCharacterRef = useRef(null);
    const checkIconRef = useRef(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (userName.length > 0 && !Validator.CheckSpecialCharacter(userName)) {
            dispatch(actions.setCheckUserValid(true));
        } else {
            dispatch(actions.setCheckUserValid(false));
        }
        if (userName.length > 0) {
            warningUserRef.current.style.display = 'none';
            warningIconRef.current.style.display = 'none';
            checkIconRef.current.style.display = 'block';
        }

        if (Validator.CheckSpecialCharacter(userName)) {
            checkIconRef.current.style.display = 'none';
            warningPassSpecialCharacterRef.current.style.display = 'block';
            warningIconRef.current.style.display = 'block';
        } else if (!Validator.CheckSpecialCharacter(userName)) {
            checkIconRef.current.style.display = 'block';
            warningPassSpecialCharacterRef.current.style.display = 'none';
            warningIconRef.current.style.display = 'none';
        }
        if (userName.length === 0) {
            checkIconRef.current.style.display = 'none';
        }
    }, [userName]);

    useEffect(() => {
        if (userName.length > 0 && !Validator.CheckSpecialCharacter(userName)) {
            dispatch(actions.setCheckUserValid(true));
        }
    }, [checkUserValid]);

    const HandleUserNameBlur = () => {
        if (userName.length === 0) {
            warningUserRef.current.style.display = 'block';
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
                                type={'text'}
                                className={cx('userName')}
                                id={'userName'}
                                value={userName}
                                onChange={(event) => {
                                    dispatch(actions.setUserNameInput(event.target.value));
                                }}
                                onBlur={(e) => HandleUserNameBlur(e)}
                                placeholder={'Điện thoại'}
                            />
                            <div className={cx('wrap-warning-icon')} ref={warningIconRef}>
                                <FontAwesomeIcon icon={faCircleExclamation} className={cx('warning-icon')} />
                            </div>
                            <div className={cx('wrap-check-icon')} ref={checkIconRef}>
                                <FontAwesomeIcon icon={faCheck} className={cx('check-icon')} />
                            </div>
                        </div>

                        <div className={cx('warning-input')}>
                            <span ref={warningUserRef} className={cx('warning-username-input')}>
                                Vui lòng nhập số điện thoại
                            </span>
                            <span ref={warningPassSpecialCharacterRef} className={cx('warning-password-input')}>
                                số điện thoại không thể chứa các kí tự đặc biệt
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputUserName;
