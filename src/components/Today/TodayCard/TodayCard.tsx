import PetModal from '@/components/Pets/PetModal/PetModal';
import React from 'react';

import styles from './styles.module.scss';

interface TodayCardProps {
    name: string;
    age: number;
    breed: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    time: string;
    type: string;
}

const TodayCard: React.FC<TodayCardProps> = props => {
    const { name, age, breed, height, heightUnit, weight, weightUnit, time, type } = props;

    const [showCard, setShowCard] = React.useState(false);

    const handleShowCard = React.useCallback(() => {
        setShowCard(false);
        setShowCard(!showCard);
    }, []);

    const handleCancel = () => {
        setShowCard(false);
    };

    return (
        <li className={styles.today}>
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
                        <span className={styles.today__headerTitle}>Время</span>
                        <span className={styles.today__headerText}>{time}</span>
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
