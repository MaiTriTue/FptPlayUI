import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Apis, { endpoints } from '~/Apis/Apis';
import { Slide01, SlidePoster, SlideThumb } from '~/components/componentDetail';

const cx = classNames.bind(styles);

function Home() {
    const [movieList, setMovieList] = useState('');
    const [count, setCount] = useState('1');
    useEffect(() => {
        Apis.get(endpoints['list_movie_genre'] + count).then((res) => {
            setMovieList(res.data.results);
        });
    }, [count]);
    return (
        <div className={cx('wrapper')}>
            <Slide01 />
            {movieList &&
                movieList.map((item, index) => {
                    if (item.name === 'Phim Thể thao') {
                        return (
                            <div className={cx('home-categorys')} key={index}>
                                <SlidePoster slideName={item.name} dataMovie={item.dataMovie} />
                            </div>
                        );
                    }
                    return (
                        <div className={cx('home-categorys')} key={index}>
                            <SlideThumb slideName={item.name} dataMovie={item.dataMovie} />
                        </div>
                    );
                })}
        </div>
    );
}

export default Home;
