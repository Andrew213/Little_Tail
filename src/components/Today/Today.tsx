import { useTypedSelector } from '@/hooks/useTypedSelector';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Today: React.FC = () => {
    // const navigate = useNavigate();
    // const {
    //     Login: { session },
    // } = useTypedSelector(state => state);
    // React.useEffect(() => {
    //     if (!session) navigate('/');
    // }, []);

    return <p>Тут записи на сегодня</p>;
};

export default Today;
