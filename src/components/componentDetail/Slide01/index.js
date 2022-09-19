import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Apis, { endpoints } from '~/Apis/Apis';
import { useState } from 'react';

import { useStore, actions } from '~/Store';
import styles from './Slide01.module.scss';

const cx = classNames.bind(styles);

function Slide01({ children }) {
    const [movieList, setMovieList] = useState('');
    const [count, setCount] = useState('1');
    const Slide01GalleryRef = useRef(null);
    const SlideImageRef = useRef(null);
    const wrapperRef = useRef(null);
    const [state, dispatch] = useStore();
    const { changeWidth } = state;
    const navigate = useNavigate();

    useEffect(() => {
        Apis.get(endpoints['list_movie'] + count).then((res) => {
            setMovieList([...movieList, ...res.data.results]);
        });
    }, [count]);

    useEffect(() => {
        const timeInter = setInterval(() => {
            if (changeWidth === 10350) {
                dispatch(actions.setChangrWidth(0));
                changeImage(changeWidth);
            } else {
                dispatch(actions.setChangrWidth(changeWidth + SlideImageRef.current.clientWidth));
                changeImage(changeWidth);
            }
        }, 6000);
        return () => {
            clearInterval(timeInter);
        };
    }, [changeWidth]);

    const changeImage = (number) => {
        Slide01GalleryRef.current.style.marginLeft = '-' + number + 'px';
    };

    const handleNextSlide01 = () => {
        if (changeWidth === 10350) {
            dispatch(actions.setChangrWidth(0));
            changeImage(changeWidth);
        } else {
            dispatch(actions.setChangrWidth(changeWidth + SlideImageRef.current.clientWidth));
            changeImage(changeWidth);
        }
        console.log('Next: ', changeWidth);
    };
    const handlePrevSlide01 = () => {
        if (changeWidth === 0) {
            dispatch(actions.setChangrWidth(10350));
            changeImage(changeWidth);
        } else {
            dispatch(actions.setChangrWidth(changeWidth - SlideImageRef.current.clientWidth));
            changeImage(changeWidth);
        }
        console.log('prev: ', changeWidth);
    };

    const handleChooseMovie = (id, slug) => {
        dispatch(actions.setChooseMovieId(id));
        navigate('/xem-phim/' + id + '/' + slug + '/');
    };

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
            <div className={cx('gallery-display-area')}>
                <div className={cx({ prev: 'prev', moveImg: 'moveImg' })} onClick={handlePrevSlide01}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className={cx({ next: 'next', moveImg: 'moveImg' })} onClick={handleNextSlide01}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>

                <div className={cx('gallery-wrap')} ref={Slide01GalleryRef}>
                    {movieList &&
                        movieList.map((phimItem, index) => {
                            if (index <= 9) {
                                let episode_total;
                                if (phimItem.episode_total.indexOf('Tập') !== -1) {
                                    episode_total = 'Trọn bộ ' + phimItem.episode_total;
                                } else {
                                    episode_total = phimItem.origin_name + ' ' + phimItem.year;
                                }
                                return (
                                    <div
                                        className={cx('image')}
                                        key={index}
                                        ref={SlideImageRef}
                                        onClick={() => {
                                            handleChooseMovie(phimItem.id, phimItem.slug);
                                        }}
                                    >
                                        <div className={cx('name-episode')}>
                                            <h3>{phimItem.name}</h3>
                                            <h5>{episode_total}</h5>
                                            <Link
                                                to={'/xem-video'}
                                                className={cx({
                                                    btnMovieView: 'btnMovieView',
                                                    btn: 'btn',
                                                })}
                                                onClick={() => {
                                                    handleChooseMovie(phimItem.id);
                                                }}
                                            >
                                                Xem ngay
                                                <FontAwesomeIcon icon={faAngleRight} className={cx('icon-right')} />
                                            </Link>
                                        </div>

                                        <div className={cx('chieurap-quality-lang')}>
                                            {phimItem.chieurap === true ? (
                                                <h5
                                                    className={cx({
                                                        chieuRap: 'chieuRap',
                                                        labelInfo: 'labelInfo',
                                                    })}
                                                >
                                                    Chiếu rạp
                                                </h5>
                                            ) : (
                                                ''
                                            )}

                                            <h5
                                                className={cx({
                                                    qualityLang: 'quality-lang',
                                                    labelInfo: 'labelInfo',
                                                })}
                                            >
                                                {phimItem.quality} -{phimItem.lang}
                                            </h5>
                                        </div>

                                        <img src={phimItem.poster_url} alt={phimItem.name} />
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
        </div>
    );
}

export default Slide01;
