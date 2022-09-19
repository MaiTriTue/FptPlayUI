import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Warning.module.scss';
import { useStore, actions } from '~/Store';

const cx = classNames.bind(styles);

function WarningUserLogin({ children }) {
    const [state, dispatch] = useStore();

    const handleWarningLogin = () => {
        dispatch(actions.setWarningLogin(false));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <div className={cx('warning-login_header')}>
                        Thông báo
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className={cx('warning-login_header-icon')}
                            onClick={handleWarningLogin}
                        />
                    </div>
                    <div className={cx('warning-login_body')}>Điện thoại hoặc mật khẩu không đúng !</div>
                    <div className={cx('warning-login_footer')}>
                        <button className={cx('btn-warning_login')} onClick={handleWarningLogin}>
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarningUserLogin;
