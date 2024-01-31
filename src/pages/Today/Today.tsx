import React, { useState } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useAction from '@/hooks/useAction';
import Loader from '@/lib/Loader/Loader';
import TodayCard from './components/TodayCard/TodayCard';

import styles from './styles.module.scss';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddTherapyModal from './components/AddTherapyModal/AddTherapyModal';
import dayjs from 'dayjs';
import Toolbar from '@/components/Toolbar/Toolabar';
import { useSearchParams } from 'react-router-dom';

const Today: React.FC = () => {
    const { GetToday } = useAction();
    const [reload, setReload] = useState(false);
    const [searchParams] = useSearchParams();
    const {
        Today: { isLoading, todayListing, errMsg },
    } = useTypedSelector(state => state);
    console.log(`todayListing `, todayListing);
    React.useEffect(() => {
        GetToday(Object.fromEntries(searchParams.entries()));
    }, [searchParams, reload]);

    React.useEffect(() => {
        if (errMsg) {
            void message.error(errMsg.toString());
        }
    }, [errMsg]);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    if (isLoading) {
        return <Loader className="loader" />;
    }

    return (
        <div className={styles.today}>
            <div className={styles.today__controls}>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary"
                    className={styles.today__createBtn}
                    icon={<PlusOutlined />}
                >
                    Сделать запись
                </Button>
                <Toolbar />
            </div>

            <AddTherapyModal
                setTodayListReload={setReload}
                open={isModalOpen}
                setVisible={setIsModalOpen}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
            />
            <ul className={styles.today__list}>
                {todayListing.map(el => {
                    const animal = el.pet;
                    return (
                        <TodayCard
                            setTodayListReload={setReload}
                            age={animal.age}
                            height={animal.height}
                            heightUnit={animal.heightUnit}
                            weight={animal.weight}
                            weightUnit={animal.weightUnit}
                            breed={animal.spec.name}
                            key={el._id}
                            id={el._id}
                            time={dayjs(el.dateTime * 1000)}
                            type={el.therapy.type}
                            name={animal.name}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Today;
