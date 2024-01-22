import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Pets from './components/Pets/Pets';
import Today from './components/Today/Today';
import useAction from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import Loader from './lib/Loader/Loader';
import './styles/App.scss';

const App: React.FC = () => {
    const { CheckSession } = useAction();
    const navigate = useNavigate();

    const {
        Session: { session, sessionLoading, errMsg },
    } = useTypedSelector(state => state);

    React.useEffect(() => {
        CheckSession();
    }, []);

    React.useEffect(() => {
        if (errMsg) {
            navigate('/');
        }
    }, [errMsg]);

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
                    {sessionLoading && <Loader className="loader" />}
                    {session && !sessionLoading && (
                        <Routes>
                            <Route path="/animals" element={<Pets />} />
                            <Route path="/today" element={<Today />} />
                        </Routes>
                    )}
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                </div>
            </main>
        </>
    );
};

export default App;
