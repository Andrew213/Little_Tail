/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { Dispatch, SetStateAction } from 'react';
import PetModal from '@/pages/Pets/components/PetModal/PetModal';
import styles from './styles.module.scss';
import { tagType } from '../SpecSelect/SpecSelect';
import { specT } from '@/types/PetType';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import useAction from '@/hooks/useAction';

interface PetCardI {
    name: string;
    age: number;
    breed: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    spec: specT;
    id: string;
    setPetsListReload: Dispatch<SetStateAction<boolean>>;
}

const PetCard: React.FC<PetCardI> = ({
    name,
    age,
    breed,
    height,
    weight,
    heightUnit,
    weightUnit,
    spec,
    setPetsListReload,
    id,
}) => {
    const [showCard, setShowCard] = React.useState(false);
    const { DeletePet } = useAction();
    const handleShowCard = React.useCallback(() => {
        setShowCard(false);
        setShowCard(!showCard);
    }, []);

    const deletePet = async () => {
        const response = await DeletePet(id);
        if (response instanceof Error) {
            void message.error('Произошла ошибка');
        } else {
            setPetsListReload(prev => !prev);
            void message.success('Запись удалена');
        }
    };

    const handleCancel = () => {
        setShowCard(false);
    };
    return (
        <li className={styles.pet}>
            <Popconfirm
                title={`Вы действительно хотите удалить питомца?`}
                okText="Да, удалить"
                cancelText="Нет"
                placement="right"
                okType="danger"
                onConfirm={deletePet}
            >
                <Button
                    className={styles.pet__btn_delete}
                    style={{ marginRight: 'auto' }}
                    danger
                    type="link"
                    icon={<DeleteOutlined />}
                />
            </Popconfirm>
            <button className={styles.pet__btn} onClick={handleShowCard}>
                <div className={styles.pet__body}>
                    <div className={styles.pet__cell}>
                        <span className={styles.pet__cellTitle}>Кличка</span>
                        <span className={styles.pet__cellText}>{name}</span>
                    </div>
                    <div className={styles.pet__cell}>
                        <span className={styles.pet__cellTitle}>Порода</span>
                        <span className={styles.pet__cellText}>{spec.name}</span>
                    </div>
                    <div className={styles.pet__cell}>
                        <span className={styles.pet__cellTitle}>Вид</span>
                        <span className={styles.pet__cellText}>{tagType(spec.type)}</span>
                    </div>
                </div>
                {/* <h3 className={styles.pet__name}>{name}</h3>
                <p className={styles.pet__specName}>{breed}</p>
                <p>{tagType(spec.type)}</p> */}
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
