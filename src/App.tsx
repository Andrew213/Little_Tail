import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import PetsPagination from './components/Pets/PetsPagination';
import Today from './components/Today/Today';
import useAction from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
// import 'antd/dist/antd.css';
import './styles/App.scss';
const App: React.FC = () => {
    const { CheckSession } = useAction();

    const {
        Session: { session },
    } = useTypedSelector(state => state);

    React.useEffect(() => {
        CheckSession();
    }, []);
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
                    <div className="routes">
                        <Routes>
                            <Route path="/animals" element={session ? <PetsPagination /> : <Login />} />
                            <Route path="/today" element={session ? <Today /> : <Login />} />
                            <Route path="/" element={<Login />} />
                        </Routes>
                    </div>
                </div>
            </main>
        </>
    );
};

export default App;
