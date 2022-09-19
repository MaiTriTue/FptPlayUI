import {
    Home,
    Hbogo,
    Channel,
    Category,
    Sport,
    Login,
    Register,
    ForgotPassword,
    ServicePack,
    Search,
    serviceRegistration,
    WatchMovie,
} from '~/pages';

//  Public router
const PublicRoutes = [
    { path: '/danh-muc/:movieGenre/:movieCountry', component: Category, Layout: null },
    { path: '/danh-muc/:movieGenre', component: Category, Layout: null },
    { path: '/xem-phim/:movieId/:slug', component: WatchMovie, Layout: null },
    { path: '/truyen-hinh', component: Channel, Layout: null },
    { path: '/hbo-go', component: Hbogo, Layout: null },
    { path: '/danh-sach', component: Category, Layout: null },
    { path: '/the-thao', component: Sport, Layout: null },
    { path: '/tim-kiem', component: Search, Layout: null },
    { path: '/dang-nhap', component: Login, Layout: null },
    { path: '/dang-ky', component: Register, Layout: null },
    { path: '/quen-mat-khau', component: ForgotPassword, Layout: null },
    { path: '/goi-dich-vu', component: ServicePack, Layout: null },
    { path: '/dang-ky-dich-vu', component: serviceRegistration, Layout: null },
    { path: '/', component: Home, Layout: null },
];

//  Private router
const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
