import React from 'react';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const Pets: React.FC = () => {
    const {
        Login: { session },
    } = useTypedSelector(state => state);
    const { GetAnimals } = useAction();

    React.useEffect(() => {
        if (session) {
            GetAnimals();
        }
    }, [session]);
    return <p>тут списки животных</p>;
};

export default Pets;
