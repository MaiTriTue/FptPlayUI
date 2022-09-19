import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Hbogo.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Hbogo() {
    return <div className={cx('wrapper')}></div>;
}

export default Hbogo;
