import classNames from 'classnames/bind';

import styles from './comment.module.scss';
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
import { useEffect, useRef, useState } from 'react';
import { CommentChildren } from '~/components/componentDetail';

const cx = classNames.bind(styles);

function Comment(props) {
    const { commentItem, index } = props;
    const [showComment, setShowComment] = useState(false);
    const CommentRef = useRef(null);
    useEffect(() => {
        if (showComment === true) {
            CommentRef.current.style.display = 'block';
        } else if (showComment === false) {
            CommentRef.current.style.display = 'none';
        }
    }, [showComment]);
    const HandleShowComment = () => {
        setShowComment(!showComment);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <li className={cx('comment_detail')}>
                        <div className={cx('container_comment-useImg')}>
                            <img src={commentItem.imgUse} alt="use-icon" />
                        </div>
                        <div className={cx('comment_info')}>
                            <div className={cx('comment_info-name')}>
                                <h3>{commentItem.use}</h3>
                                <span>{commentItem.time}</span>
                            </div>
                            <div className={cx('comment_content')}>
                                <span>{commentItem.content}</span>
                            </div>
                            {/* tương tác */}
                            <div className={cx('comment_interactives')}>
                                <div className={cx('comment_interactive')}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={cx('comment-interactive-icon')} />
                                    <span>{commentItem.like}</span>
                                </div>
                                <div className={cx('comment_interactive')} onClick={HandleShowComment}>
                                    <FontAwesomeIcon icon={faMessage} className={cx('comment-interactive-icon')} />
                                    <span>{commentItem.comment.length}</span>
                                </div>
                                <div className={cx('comment_interactive')}>
                                    <FontAwesomeIcon icon={faFlag} className={cx('comment-interactive-icon')} />
                                    <span>{commentItem.report}</span>
                                </div>
                            </div>

                            {/* comment cap 2 */}
                            {/* <ul className={cx('container_comments-2')}> */}
                            <ul className={cx('container_comments-2')} ref={CommentRef}>
                                {commentItem.comment.map((commentItemChildren, index) => {
                                    return (
                                        <CommentChildren
                                            key={index}
                                            commentItemChildren={commentItemChildren}
                                            index={index}
                                        />
                                    );
                                })}

                                <div id="comment_input-1" className={cx('container_comment-input')}>
                                    <input
                                        id="cmt"
                                        type={'text'}
                                        className={cx('comment-input')}
                                        placeholder="Viết bình luận..."
                                    />
                                    <FontAwesomeIcon icon={faPaperPlane} className={cx('comment-input-icon')} />
                                </div>
                            </ul>
                            <div className={cx('commentShow')}>
                                {commentItem.comment.length !== 0 ? (
                                    showComment === false ? (
                                        <div className={cx('infoShowContent')} onClick={() => HandleShowComment(index)}>
                                            <span>Xem thêm câu trả lời khác</span>
                                            <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
                                        </div>
                                    ) : (
                                        <div className={cx('infoShowContent')} onClick={() => HandleShowComment(index)}>
                                            <span>Thu gọn</span>
                                            <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
                                        </div>
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default Comment;
