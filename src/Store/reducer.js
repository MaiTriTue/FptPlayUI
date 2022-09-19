import cookies from 'react-cookies';
import {
    SET_USERNAME_INPUT,
    SET_PASSWORD_INPUT,
    SET_REPASSWORD_INPUT,
    SET_CHECK_USER_VALID,
    SET_CHECK_PASS_VALID,
    SET_CHECK_REPASS_VALID,
    USER_LOGIN,
    WARNING_LOGIN,
    CHANGE_WIDTH,
    SET_CHOOSE_MOVIE_ID,
    SET_MOVIE_DETAIL,
    SET_MENU,
} from './Constants';

const initState = {
    userLogin: cookies.load('origin-movie-user'),
    warningLogin: false,
    userName: '',
    password: '',
    rePassword: '',
    checkUserValid: '',
    checkPassValid: '',
    checkRePassValid: '',
    changeWidth: 0,
    chooseMovieId: '',
    movieDetail: '',
    menu: '',
};

function reducer(state, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                userLogin: action.payload,
            };
        case WARNING_LOGIN:
            return {
                ...state,
                warningLogin: action.payload,
            };
        case SET_USERNAME_INPUT:
            return {
                ...state,
                userName: action.payload,
            };
        case SET_PASSWORD_INPUT:
            return {
                ...state,
                password: action.payload,
            };
        case SET_REPASSWORD_INPUT:
            return {
                ...state,
                rePassword: action.payload,
            };
        case SET_CHECK_USER_VALID:
            return {
                ...state,
                checkUserValid: action.payload,
            };
        case SET_CHECK_PASS_VALID:
            return {
                ...state,
                checkPassValid: action.payload,
            };
        case SET_CHECK_REPASS_VALID:
            return {
                ...state,
                checkRePassValid: action.payload,
            };
        case CHANGE_WIDTH:
            return {
                ...state,
                changeWidth: action.payload,
            };
        case SET_CHOOSE_MOVIE_ID:
            return {
                ...state,
                chooseMovieId: action.payload,
            };
        case SET_MOVIE_DETAIL:
            return {
                ...state,
                movieDetail: action.payload,
            };
        case SET_MENU:
            return {
                ...state,
                menu: action.payload,
            };
        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
