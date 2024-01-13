import { Modal } from 'antd';
import React from 'react';
import cn from 'classnames';
import { declOfNum } from '@/utils/declOfNum';
import 'antd/lib/modal/style';
import styles from './styles.module.scss';

const YEARS = ['год', 'года', 'лет'];

interface PetModalI {
    name: string;
    age: number;
    breed: string;
    height: number;
    heightUnit: string;
    weight: number;
    weightUnit: string;
    isVisible: boolean;
    onOk: () => void;
}

const PetModal: React.FC<PetModalI> = ({
    name,
    age,
    breed,
    height,
    heightUnit,
    weight,
    weightUnit,
    isVisible,
    onOk,
}) => {
    return (
        <Modal title={name} open={isVisible} onOk={onOk} className={styles.petModal}>
            <ul className={styles.pet__list}>
                <li className={cn(styles.pet__item, styles.pet__item_breed)}>
                    <span className={cn(styles.pet__itemTite, styles.pet__itemTite_purpure)}>Порода: </span>
                    <span className={cn(styles.pet__itemText, styles.pet__itemText_purpure)}>{breed}</span>
                </li>
                {age && (
                    <li className={cn(styles.pet__item, styles.pet__item_age)}>
                        <span className={cn(styles.pet__itemTite, styles.pet__itemTite_blue)}>Возраст: </span>

                        <span className={cn(styles.pet__itemText, styles.pet__itemText_blue)}>
                            {`${age} ${declOfNum(age, YEARS)}`}
                        </span>
                    </li>
                )}
                {height && (
                    <li className={cn(styles.pet__item, styles.pet__item_height)}>
                        <span className={cn(styles.pet__itemTite, styles.pet__itemTite_purpure)}>Рост: </span>
                        <span className={cn(styles.pet__itemText, styles.pet__itemText_purpure)}>
                            {`${height} ${heightUnit}.`}
                        </span>
                    </li>
                )}
                {weight && (
                    <li className={cn(styles.pet__item, styles.pet__item_weight)}>
                        <span className={cn(styles.pet__itemTite, styles.pet__itemTite_blue)}>Вес: </span>
                        <span className={cn(styles.pet__itemText, styles.pet__itemText_blue)}>
                            {`${weight} ${weightUnit}`}
                        </span>
                    </li>
                )}
            </ul>
        </Modal>
    );
};

export default PetModal;
