import axios from 'axios';

export let endpoints = {
    login: '/account/login/',
    get_token: '/o/token/',
    current_user: '/account/users/current_user/',
    new_odd_movie: '/danh-muc/phim-le/?page=',
    new_series_movie: '/danh-muc/phim-bo/?page=',
    fantasy_movie: '/danh-muc/vien-tuong/?page=',
    action_movie: '/danh-muc/hanh-dong/?page=',
    sport_movie: '/danh-muc/the-thao/?page=',
    music_movie: '/danh-muc/am-nhac/?page=',
    mystery_movie: '/danh-muc/bi-an/?page=',
    war_movie: '/danh-muc/chien-tranh/?page=',
    costume_movie: '/danh-muc/co-trang/?page=',
    family_movie: '/danh-muc/gia-dinh/?page=',
    comedy_movie: '/danh-muc/hai-huoc/?page=',
    criminal_movie: '/danh-muc/hinh-su/?page=',
    school_movie: '/danh-muc/hoc-duong/?page=',
    horror_movie: '/danh-muc/kinh-di/?page=',
    drama_movie: '/danh-muc/tam-ly/?page=',
    adventure_movie: '/danh-muc/phieu-luu/?page=',
    movie_18: '/danh-muc/18/?page=',
    myths_movie: '/danh-muc/than-thoai/?page=',
    martial_arts_movie: '/danh-muc/vo-thuat/?page=',
    anime_movie: '/danh-muc/hoat-hinh/?page=',
    top_link: '/danh-muc/',
    pageCount: '/?page=',

    list_movie: '/danh-muc/phim/?page=',
    list_movie_genre: '/danh-muc/home-page/?page=',
    detail_movie01: '/danh-muc/phim/',
    detail_movie02: '/episodes/',
};

export default axios.create({
    baseURL: 'http://127.0.0.1:8000',
});
