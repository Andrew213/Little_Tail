import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import useAction from '@/hooks/useAction';
import Loader from '@/lib/Loader/Loader';
import TodayCard from './TodayCard/TodayCard';

import styles from './styles.module.scss';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddTherapyModal from './AddTherapyModal/AddTherapyModal';

const convertTime = (time: string) => {
    const foo = time.split(':');

    return `${foo[0]}:${foo[1]}`;
};

const Today: React.FC = () => {
    const { GetToday } = useAction();

    const {
        Session: { session },
        Today: { isLoading, todayListing },
    } = useTypedSelector(state => state);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!session) {
            navigate('/');
            return;
        }
        // GetToday();
    }, []);

    if (isLoading) {
        return <Loader className={styles.loader} />;
    }

    return (
        <div className={styles.today}>
            <Button type="primary" className={styles.today__createBtn} icon={<PlusOutlined />}>
                Сделать запись
            </Button>
            <AddTherapyModal open />
            <ul className={styles.today__list}>
                {todayListing.map(el => {
                    const time = convertTime(el.time);
                    const animal = el.animal;
                    return (
                        <TodayCard
                            age={animal.age}
                            height={animal.height}
                            heightUnit={animal.heightUnit}
                            weight={animal.weight}
                            weightUnit={animal.weightUnit}
                            breed={animal.spec.name}
                            key={animal._id}
                            time={time}
                            type={el.type}
                            name={animal.name}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Today;
