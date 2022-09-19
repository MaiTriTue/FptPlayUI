import classNames from 'classnames/bind';

import styles from './commentChildren.module.scss';
import { phimBo, phimLe } from '~/dataFilm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faThumbsUp,
    faMessage,
    faPaperPlane,
    faShareNodes,
    faFlag,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function CommentChildren(props) {
    const { commentItemChildren, index } = props;
    useEffect(() => {}, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <li className={cx('comment_detail')} key={index}>
                        <div className={cx('container_comment-useImg')}>
                            <img src={commentItemChildren.imgUse} alt="use-icon" className={cx('comment-useImg-2')} />
                        </div>
                        <div className={cx('comment_info')}>
                            <div className={cx('comment_info-name')}>
                                <h3>{commentItemChildren.use}</h3>
                                <span>{commentItemChildren.time}</span>
                            </div>
                            <div className={cx('comment_content')}>
                                <span>{commentItemChildren.content}</span>
                            </div>
                            {/* tương tác */}
                            <div className={cx('comment_interactives')}>
                                <div className={cx('comment_interactive')}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={cx('comment-interactive-icon')} />
                                    <span>{commentItemChildren.like}</span>
                                </div>
                                <div className={cx('comment_interactive')}>
                                    <FontAwesomeIcon icon={faMessage} className={cx('comment-interactive-icon')} />
                                    <span>{commentItemChildren.comment.length}</span>
                                </div>
                                <div className={cx('comment_interactive')}>
                                    <FontAwesomeIcon icon={faFlag} className={cx('comment-interactive-icon')} />
                                    <span>{commentItemChildren.report}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default CommentChildren;
