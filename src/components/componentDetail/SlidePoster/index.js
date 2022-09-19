import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import styles from './SlidePoster.module.scss';
import { useStore, actions } from '~/Store';

const cx = classNames.bind(styles);

function SlidePoster(props) {
    const { slideName, dataMovie } = props;
    const [movieList, setMovieList] = useState('');
    const [changeWidth, setChangeWidth] = useState(0);

    const cardItemRef = useRef(null);
    const cardWrapRef = useRef(null);
    const prevRef = useRef(null);
    const [state, dispatch] = useStore();

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (endPointName) {
    //         Apis.get(endpoints[endPointName] + count).then((res) => {
    //             // console.log(slideName, ': ', res.data);
    //             setMovieList(res.data.results);
    //         });
    //     }
    // }, [count]);

    useEffect(() => {
        setMovieList(dataMovie);
    }, [dataMovie]);

    useEffect(() => {
        changeImage(changeWidth);
        if (changeWidth === 0) {
            prevRef.current.style.display = 'none';
        }
        if (changeWidth !== 0) {
            prevRef.current.style.display = 'flex';
        }
    }, [changeWidth]);

    const changeImage = (number) => {
        cardWrapRef.current.style.marginLeft = '-' + number + 'px';
    };

    const handlePrevSlide = () => {
        if (changeWidth !== 0) {
            setChangeWidth(changeWidth - (cardItemRef.current.clientWidth * 3 - 1.5));
        }
    };
    const handleNextSlide = () => {
        setChangeWidth(changeWidth + (cardItemRef.current.clientWidth * 3 - 1.5));

        if (changeWidth === (cardItemRef.current.clientWidth * 3 - 1.5) * 2) {
            setChangeWidth(0);
            prevRef.current.style.display = 'none';
        }
    };

    const handleChooseMovie = (id, slug) => {
        dispatch(actions.setChooseMovieId(id));
        navigate('/xem-phim/' + id + '/' + slug + '/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('gallery-display-area')}>
                <div className={cx('gallery-name')}>
                    <h3>{slideName}</h3>
                </div>
                <div className={cx({ prev: 'prev', moveImg: 'moveImg' })} onClick={handlePrevSlide} ref={prevRef}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className={cx({ next: 'next', moveImg: 'moveImg' })} onClick={handleNextSlide}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>

                <div className={cx('gallery-wrap')} ref={cardWrapRef}>
                    {movieList &&
                        movieList.map((phimItem, index) => {
                            return (
                                <div
                                    className={cx('card_item')}
                                    key={index}
                                    ref={cardItemRef}
                                    onClick={() => {
                                        handleChooseMovie(phimItem.id, phimItem.slug);
                                    }}
                                >
                                    <img
                                        src={phimItem.poster_url}
                                        alt={phimItem.origin_name}
                                        className={cx('card_item-image')}
                                    />
                                    <div className={cx('card_item-name')}>
                                        <h5>{phimItem.origin_name}</h5>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default SlidePoster;
