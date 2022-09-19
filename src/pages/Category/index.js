import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';

import styles from './Category.module.scss';
import images from '~/assets/images';
import Apis, { endpoints } from '~/Apis/Apis';

const cx = classNames.bind(styles);

function Category() {
    const { movieGenre, movieCountry } = useParams();
    const [movieDetail, setMovieDetail] = useState('');
    const [movieSrc, setMovieSrc] = useState('');

    useEffect(() => {
        if (movieGenre && movieCountry) {
            // console.log('movieId: ', movieId);
            Apis.get(endpoints['top_link'] + movieGenre + '/' + movieCountry + endpoints['pageCount'])
                .then((res) => {
                    console.log('detail movie: ', res.data);

                    setMovieDetail(res.data);
                    setMovieSrc(res.data.episodes[0].link_embed);
                })
                .catch(function (error) {
                    console.log('movieGenre + movieCountry');
                    console.log('movieGenre: ', movieGenre);
                    console.log(error);
                });
        } else if (movieGenre && !movieCountry) {
            // console.log('movieGenre: ', movieGenre);
            Apis.get(endpoints['top_link'] + movieGenre + endpoints['pageCount'])
                .then((res) => {
                    console.log('detail movie: ', res.data);

                    setMovieDetail(res.data);
                    setMovieSrc(res.data.episodes[0].link_embed);
                })
                .catch(function (error) {
                    console.log('chi co the loai phim');
                    console.log('movieGenre: ', movieGenre);
                    console.log(error);
                });
        }
    }, [movieGenre]);
    return <div className={cx('wrapper')}></div>;
}

export default Category;
