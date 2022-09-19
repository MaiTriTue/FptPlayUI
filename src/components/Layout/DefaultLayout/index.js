import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import { Header, Footer } from '~/components/Layout';
import { useEffect, useRef } from 'react';
import { useStore, actions } from '~/Store';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [state, dispatch] = useStore();
    const { warningLogin } = state;
    const quantityInputRef = useRef(null);

    // ngăn chặn sự kiện scroll
    useEffect(() => {
        const ignoreScroll = (e) => {
            e.preventDefault();
        };

        if (warningLogin === true) {
            console.log(true);
            quantityInputRef.current && quantityInputRef.current.addEventListener('wheel', ignoreScroll);
        }

        return () => {
            quantityInputRef.current && quantityInputRef.current.removeEventListener('wheel', ignoreScroll);
        };
    }, [warningLogin]);

    return (
        <div className={cx('wrapper')} ref={quantityInputRef}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
