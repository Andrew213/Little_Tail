/* eslint-disable @typescript-eslint/no-misused-promises */
import PetModal from '@/components/Pets/components/PetModal/PetModal';
import React, { Dispatch, SetStateAction } from 'react';

import styles from './styles.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import useAction from '@/hooks/useAction';

interface TodayCardProps {
    name: string;
    age: number;
    breed: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    time: Dayjs;
    type: string;
    id: string;
    setTodayListReload: Dispatch<SetStateAction<boolean>>;
}

const TodayCard: React.FC<TodayCardProps> = props => {
    const { name, setTodayListReload, age, breed, height, heightUnit, weight, weightUnit, time, type, id } = props;

    const { DeleteToday } = useAction();

    const [showCard, setShowCard] = React.useState(false);

    const deleteToday = async () => {
        const response = await DeleteToday(id);
        if (response instanceof Error) {
            void message.error('Что-то пошло не так');
        } else {
            setTodayListReload(prev => !prev);
            void message.success('Запись удалена');
        }
    };

    const handleShowCard = React.useCallback(() => {
        setShowCard(false);
        setShowCard(!showCard);
    }, []);

    const handleCancel = () => {
        setShowCard(false);
    };

    return (
        <li className={styles.today}>
            <Popconfirm
                title={`Вы действительно хотите удалить запись?`}
                okText="Да, удалить"
                cancelText="Нет"
                placement="right"
                okType="danger"
                onConfirm={deleteToday}
            >
                <Button
                    className={styles.today__btn_delete}
                    style={{ marginRight: 'auto' }}
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                />
            </Popconfirm>

            <button className={styles.today__btn} onClick={handleShowCard}>
                <div className={styles.today__body}>
                    <div className={styles.today__cell}>
                        <span className={styles.today__headerTitle}>Кличка</span>
                        <span className={styles.today__headerText}>{name}</span>
                    </div>
                    <div className={styles.today__cell}>
                        <span className={styles.today__headerTitle}>Тип назначения</span>
                        <span className={styles.today__headerText}>{type}</span>
                    </div>
                    <div className={styles.today__cell}>
                        <span className={styles.today__headerTitle}>Порода</span>
                        <span className={styles.today__headerText}>{breed}</span>
                    </div>
                    <div className={styles.today__cell}>
                        <span className={styles.today__headerTitle}>Дата</span>
                        <span className={styles.today__headerText}>{`${time.format('DD-MM-YYYY')}`}</span>
                    </div>
                    <div className={styles.today__cell}>
                        <span className={styles.today__headerTitle}>Время</span>
                        <span className={styles.today__headerText}>{`${time.get('h')}:${time.format('mm')}`}</span>
                    </div>
                </div>
            </button>
            <PetModal
                age={age}
                height={height}
                heightUnit={heightUnit}
                weightUnit={weightUnit}
                weight={weight}
                name={name}
                breed={breed}
                isVisible={showCard}
                onOk={handleCancel}
            />
        </li>
    );
};

export default TodayCard;
