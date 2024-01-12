import React from 'react';
import PetModal from '@/components/Pets/PetModal/PetModal';
import styles from './styles.module.scss';

interface PetCardI {
    name: string;
    age: number;
    breed: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
}

const PetCard: React.FC<PetCardI> = ({ name, age, breed, height, weight, heightUnit, weightUnit }) => {
    const [showCard, setShowCard] = React.useState(false);

    const handleShowCard = React.useCallback(() => {
        setShowCard(false);
        setShowCard(!showCard);
    }, []);

    const handleCancel = () => {
        setShowCard(false);
    };
    return (
        <li className={styles.pet}>
            <button className={styles.pet__btn} onClick={handleShowCard}>
                <h3 className={styles.pet__name}>{name}</h3>
                <p className={styles.pet__specName}>{breed}</p>
            </button>
            <PetModal
                name={name}
                breed={breed}
                height={height}
                age={age}
                weight={weight}
                weightUnit={weightUnit}
                heightUnit={heightUnit}
                isVisible={showCard}
                onOk={handleCancel}
            />
        </li>
    );
};

export default PetCard;
