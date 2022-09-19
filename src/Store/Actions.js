import {
    SET_MENU,
    CHANGE_WIDTH,
    WARNING_LOGIN,
    USER_LOGIN,
    SET_USERNAME_INPUT,
    SET_PASSWORD_INPUT,
    SET_REPASSWORD_INPUT,
    SET_CHECK_USER_VALID,
    SET_CHECK_PASS_VALID,
    SET_CHECK_REPASS_VALID,
    SET_CHOOSE_MOVIE_ID,
    SET_MOVIE_DETAIL,
} from './Constants';

export const setUserNameInput = (payload) => ({
    type: SET_USERNAME_INPUT,
    payload,
});
export const setPasswordInput = (payload) => ({
    type: SET_PASSWORD_INPUT,
    payload,
});
export const setRePasswordInput = (payload) => ({
    type: SET_REPASSWORD_INPUT,
    payload,
});
export const setCheckUserValid = (payload) => ({
    type: SET_CHECK_USER_VALID,
    payload,
});
export const setCheckPassValid = (payload) => ({
    type: SET_CHECK_PASS_VALID,
    payload,
});
export const setCheckRePassvalid = (payload) => ({
    type: SET_CHECK_REPASS_VALID,
    payload,
});
export const setUserLogin = (payload) => ({
    type: USER_LOGIN,
    payload,
});
export const setWarningLogin = (payload) => ({
    type: WARNING_LOGIN,
    payload,
});
export const setChangrWidth = (payload) => ({
    type: CHANGE_WIDTH,
    payload,
});
export const setChooseMovieId = (payload) => ({
    type: SET_CHOOSE_MOVIE_ID,
    payload,
});
export const setMovieDetail = (payload) => ({
    type: SET_MOVIE_DETAIL,
    payload,
});
export const setMenu = (payload) => ({
    type: SET_MENU,
    payload,
});
