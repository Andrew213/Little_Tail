import { Layout } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Pets from './components/Pets/Pets';
import Today from './components/Today/Today';
import './styles/App.scss';

const App: React.FC = () => {
    return (
        <>
            <header className="header">
                <h1 className="visually-hidden">LittleTail</h1>
                <div className="fixed-container">
                    <Navigation />
                </div>
            </header>
            <main>
                <div className="fixed-container">
                    <Layout>
                        <div className="routes">
                            <Routes>
                                <Route path="/animals" element={<Pets />} />
                                {/* const { Login } = useTypedSelector(state => state); */}

                                <Route path="/today" element={<Today />} />
                                <Route path="/" element={<Login />} />
                            </Routes>
                        </div>
                    </Layout>
                </div>
            </main>
        </>
    );
};

export default App;
