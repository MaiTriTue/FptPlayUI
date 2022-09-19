import classNames from 'classnames/bind';

import styles from './WatchMovie.module.scss';
import { phimBo } from '~/dataFilm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHeart, faPaperPlane, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import images from '~/assets/images';
import { Comment, SlidePoster, IframeMovie } from '~/components/componentDetail';
import { useStore, actions } from '~/Store';
import Apis, { endpoints } from '~/Apis/Apis';

const cx = classNames.bind(styles);

function WatchMovie(props) {
    let count = 1;

    const [sumActive, setSumActive] = useState(0);
    const [followActive, setFollowActive] = useState(false);
    const [episodeActive, setEpisodeActive] = useState(0);
    const [showContent, setShowContent] = useState(false);

    const [movieDetail, setMovieDetail] = useState('');
    const [movieSrc, setMovieSrc] = useState('');
    const [episode18, setEpisode18] = useState('');
    const [episode, setEpisode] = useState('');
    const contentRef = useRef(null);
    const selectRef = useRef(0);
    const [state, dispatch] = useStore();
    const { movieId, slug } = useParams();

    let episodeArray = [];
    let episode18Array = [];

    // comment cap 2
    let commentAll = [
        {
            id: 12345,
            use: 'Dương Tử',
            imgUse: images.iconDefaultUse,
            content: 'Kết đẹp zậy mà mn chê hoài zị',
            like: 2,
            report: '',
            time: 'Khoảng 9 ngày trước',
            comment: [
                {
                    id: 12345,
                    use: 'Dương Tử',
                    imgUse: images.iconDefaultUse,
                    content: 'Kết đẹp zậy mà mn chê hoài zị',
                    like: 2,
                    report: '',
                    time: 'Khoảng 9 ngày trước',

                    comment: [],
                },
            ],
        },
        {
            id: 12346,
            use: 'Long Tử',
            imgUse: images.iconDefaultUse,
            content: 'Kết đẹp zậy mà mn chê hoài zị',
            like: 5,
            report: '',
            time: 'Khoảng 3 ngày trước',
            comment: [],
        },
    ];

    useEffect(() => {
        if (movieId) {
            console.log('movieId: ', movieId);
            Apis.get(endpoints['detail_movie01'] + movieId + endpoints['detail_movie02'])
                .then((res) => {
                    console.log('detail movie: ', res.data);

                    setMovieDetail(res.data);
                    setMovieSrc(res.data.episodes[0].link_embed);
                })
                .catch(function (error) {
                    dispatch(actions.setWarningLogin(true));
                    console.log(error);
                });
        }
    }, [movieId]);

    useEffect(() => {
        if (movieDetail && !episode && !episode18) {
            for (let i = 0; i < movieDetail.episodes.length; i++) {
                episodeArray.push({
                    episodeNo: i + 1,
                    movieSrc: movieDetail.episodes[i].link_embed,
                });

                if (i === 0 && movieDetail.episodes.length <= 18) {
                    episode18Array.push(`Tập 1 - Tập ${movieDetail.episodes.length}`);
                } else if (i === 0 && movieDetail.episodes.length > 18) {
                    episode18Array.push(`Tập 1 - Tập 18`);
                }
                if ((i + 1) % 18 === 0) {
                    count++;

                    if (movieDetail.episodes.length <= count * 18) {
                        episode18Array.push(`Tập ${i + 2} - Tập ${movieDetail.episodes.length}`);
                    } else if (movieDetail.episodes.length > count * 18) {
                        episode18Array.push(`Tập ${i + 2} - Tập ${count * 18}`);
                    }
                }
            }
            console.log('episodeArray: ', episodeArray);
            console.log('episode18Array: ', episode18Array);
            setEpisode(episodeArray);
            setEpisode18(episode18Array);
        }
    }, [movieDetail]);

    useEffect(() => {
        if (showContent === true) {
            contentRef.current.style.height = 'unset';
        } else if (showContent === false) {
            contentRef.current.style.height = '54.6px';
        }
    }, [showContent]);

    // comment 02

    const deleteTagHtml = (str) => {
        let newContent = '';
        str = str.split('<p>');
        str.forEach((item, index) => {
            if (item.indexOf('</p>')) {
                item = item.split('</p>');
                item.forEach((newItem) => {
                    newContent += newItem;
                });
            }
            newContent += item;
        });

        return newContent;
    };

    const HandleSumepisode = (index) => {
        setSumActive(index);
    };
    const HandleEpisodeActive = (index, movieSrc) => {
        setEpisodeActive(index);
        setMovieSrc(movieSrc);
    };
    const HandleFollowActive = () => {
        setFollowActive(!followActive);
    };
    const HandleShowContent = () => {
        setShowContent(!showContent);
    };

    const handleChange = (e) => {
        console.log(selectRef.current);
        console.log(e.target.value);
        selectRef.current = e.target.value;
        console.log(selectRef.current);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-wrap')}>
                    <div className={cx('gallery_wrap-video')}>
                        <IframeMovie movieSrc={movieSrc} movieName={movieDetail && movieDetail.movie.name} />
                    </div>
                    <div className={cx('gallery_wrap-episode')}>
                        <h3 className={cx('gallery_wrap-episode-title')}>Tập phim</h3>
                        <div className={cx('gallery_wrap-episode-detail')}>
                            <div className={cx('episodes-wrap01')}>
                                <ul className={cx('episodesWrap')}>
                                    {episode18 &&
                                        episode18.map((item, index) => {
                                            if (sumActive === index) {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            sumEpisode: 'sumEpisode',
                                                            active: 'active',
                                                        })}
                                                        onClick={() => HandleSumepisode(index)}
                                                    >
                                                        {item}
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            sumEpisode: 'sumEpisode',
                                                        })}
                                                        onClick={() => HandleSumepisode(index)}
                                                    >
                                                        {item}
                                                    </li>
                                                );
                                            }
                                        })}
                                </ul>
                            </div>
                            <div className={cx('episodes-wrap02')}>
                                <ul className={cx('episodesWrap')}>
                                    {episode &&
                                        episode.map((item, index) => {
                                            if (sumActive === 0 && index + 1 <= 18) {
                                                return episodeActive === index ? (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                            active: 'active',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index, item.movieSrc)}
                                                    >
                                                        Tập {item.episodeNo}
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index, item.movieSrc)}
                                                    >
                                                        Tập {item.episodeNo}
                                                    </li>
                                                );
                                            } else if (
                                                sumActive !== 0 &&
                                                index + 1 > 18 * sumActive &&
                                                index + 1 < 18 * (sumActive + 1)
                                            ) {
                                                return episodeActive === index ? (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                            active: 'active',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index, item.movieSrc)}
                                                    >
                                                        Tập {item.episodeNo}
                                                    </li>
                                                ) : (
                                                    <li
                                                        key={index}
                                                        className={cx({
                                                            episode: 'episode',
                                                        })}
                                                        onClick={() => HandleEpisodeActive(index, item.movieSrc)}
                                                    >
                                                        Tập {item.episodeNo}
                                                    </li>
                                                );
                                            }
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={cx('gallery_wrap-movie-info')}>
                        <div className={cx('movie_info-thumb')}>
                            <img
                                src={movieDetail && movieDetail.movie.thumb_url}
                                alt={movieDetail && movieDetail.movie.slug}
                            />
                        </div>
                        {/*  */}
                        <div className={cx('movie_info-content')}>
                            <div className={cx('info-name')}>
                                <div className={cx('info-name-vietnames')}>{movieDetail && movieDetail.movie.name}</div>
                                <div className={cx('info-name-english')}>
                                    {movieDetail && movieDetail.movie.origin_name}
                                </div>
                            </div>

                            <div className={cx('info-btn-contact')}>
                                {followActive === true ? (
                                    <button
                                        className={cx({
                                            infoBtnFollow: 'infoBtnFollow',
                                            btnFollowActive: 'btnFollowActive',
                                        })}
                                        onClick={HandleFollowActive}
                                    >
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-follow')} />
                                        <span>Theo dõi</span>
                                    </button>
                                ) : (
                                    <button className={cx('infoBtnFollow')} onClick={HandleFollowActive}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon-follow')} />
                                        <span>Theo dõi</span>
                                    </button>
                                )}

                                <button
                                    className={cx({
                                        infoBtnShare: 'infoBtnShare',
                                        btn: 'btn',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faShareNodes} className={cx('icon-follow')} />
                                    <span>Chia sẻ</span>
                                </button>
                            </div>
                            <div className={cx('info-title')}>Nội dung</div>
                            <div className={cx('info-content')}>
                                <p className={cx('content-detail')} ref={contentRef}>
                                    {deleteTagHtml(movieDetail && movieDetail.movie.content)}
                                </p>
                                {showContent === false ? (
                                    <div className={cx('infoShowContent')} onClick={HandleShowContent}>
                                        <span>Xem thêm</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
                                    </div>
                                ) : (
                                    <div className={cx('infoShowContent')} onClick={HandleShowContent}>
                                        <span>Thu gọn</span>
                                        <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/*  */}
                        <div className={cx('movie_info-cast')}>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Số tập</div>
                                <div className={cx('info_cast-value')}>
                                    {movieDetail && movieDetail.movie.episode_current}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Thời lượng</div>
                                <div className={cx('info_cast-value')}>{movieDetail && movieDetail.movie.time}</div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Đạo diễn</div>
                                <div className={cx('info_cast-value')}>
                                    {movieDetail && movieDetail.movie.director
                                        ? movieDetail.movie.director
                                        : 'Đang cập nhật...'}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Diễn viên</div>
                                <div className={cx('info_cast-value')}>
                                    {movieDetail &&
                                        movieDetail.movie.actor.map((item, index) => {
                                            if (index === 0 && item.name === '') {
                                                return 'Đang cập nhật...';
                                            } else if (index === movieDetail.movie.actor.length - 1) {
                                                return item.name;
                                            }

                                            return item.name + ', ';
                                        })}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Quốc gia</div>
                                <div className={cx('info_cast-value')}>
                                    {movieDetail && movieDetail.movie.country
                                        ? movieDetail.movie.country
                                        : 'Đang cập nhật...'}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Thể loại</div>
                                <div className={cx('info_cast-value')}>
                                    {movieDetail &&
                                        movieDetail.movie.movieGenres.map((item, index) => {
                                            if (index === movieDetail.movie.movieGenres.length - 1) {
                                                return item.name;
                                            }
                                            return item.name + ', ';
                                        })}
                                </div>
                            </div>
                            <div className={cx('info_cast')}>
                                <div className={cx('info_cast-key')}>Phát hành</div>
                                <div className={cx('info_cast-value')}>{movieDetail && movieDetail.movie.year}</div>
                            </div>
                        </div>
                    </div>

                    {/* comment */}
                    <div className={cx('gallery_wrap-comments')}>
                        <div className={cx('container_title')}>Bình luận</div>
                        <div className={cx('container_comment')}>
                            <div className={cx('container_comment-option')}>
                                <span className={cx('container_comment-amount')}>30 bình luận</span>
                                <div className={cx('container_comment-Sort')}>
                                    <span>Sắp xếp theo:</span>
                                    <select onChange={(e) => handleChange(e)}>
                                        <option value="0">Mới nhất</option>
                                        <option value="1">Nhiều like nhất</option>
                                        <option value="2">Cũ nhất</option>
                                    </select>
                                </div>
                            </div>
                            <div className={cx('container_comment-inputs')}>
                                <div className={cx('container_comment-useImg')}>
                                    <img src={images.iconDefaultUse} alt="use-icon" />
                                </div>
                                <div id="comment_input-1" className={cx('container_comment-input')}>
                                    <input
                                        id="cmt"
                                        type={'text'}
                                        className={cx('comment-input')}
                                        placeholder="Viết bình luận..."
                                    />
                                    <FontAwesomeIcon icon={faPaperPlane} className={cx('comment-input-icon')} />
                                </div>
                            </div>
                            <ul className={cx('container_comments-detail')}>
                                {/* binh luan */}
                                {commentAll &&
                                    commentAll.map((commentItem, index) => {
                                        return <Comment key={index} commentItem={commentItem} index={index} />;
                                    })}
                            </ul>
                            {/* <div className={cx('container_comments')}></div> */}
                        </div>
                    </div>

                    {/* trailer */}
                    <div className={cx('gallery_wrap-traile')}>
                        <SlidePoster dataName="Trailer - Clip hậu trường" data={phimBo} />
                    </div>

                    {/* phim lien quan */}

                    <div className={cx('gallery_wrap-relater-movies')}>
                        <SlidePoster dataName="Nội dung liên quan" data={phimBo} />
                    </div>

                    {/* dan dien vien */}
                    <div className={cx('gallery_wrap-cast')}></div>
                </div>
            </div>
        </div>
    );
}

export default WatchMovie;
