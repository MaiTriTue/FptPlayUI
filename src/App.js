import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PublicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import logo from './logo.svg';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header> */}
                    {PublicRoutes.map((route, index) => {
                        const Page = route.component;
                        const Layout = DefaultLayout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
