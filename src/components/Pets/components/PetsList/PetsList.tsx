import React, { useState } from 'react';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Loader from '@/lib/Loader/Loader';
import styles from './styles.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import PetCard from '../PetCard/PetCard';
import { Button } from 'antd';
import AddPetModal from '../AddPetModal/AddPetModal';

interface PetsListProps {
    pageNum?: number;
}

const PetsList: React.FC<PetsListProps> = ({ pageNum }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    const {
        Pets: { isLoading, petsListing },
    } = useTypedSelector(state => state);

    const { GetAnimals } = useAction();

    React.useEffect(() => {
        GetAnimals({ pageNumber: pageNum });
    }, [reload, pageNum]);

    if (isLoading) {
        return <Loader className="loader" />;
    }

    return (
        <>
            <section className={styles.pets}>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    icon={<PlusOutlined />}
                    type="primary"
                    className={styles.pets__createBtn}
                >
                    Добавить питомца
                </Button>
                <AddPetModal
                    onCancel={() => setIsModalOpen(false)}
                    setPetsListReload={setReload}
                    destroyOnClose
                    open={isModalOpen}
                    setVisible={setIsModalOpen}
                />
                <ul className={styles.pets__list}>
                    {petsListing.map(el => {
                        return (
                            <PetCard
                                key={el._id}
                                setPetsListReload={setReload}
                                id={el._id}
                                name={el.name}
                                breed={el.spec.name}
                                age={el.age}
                                weight={el.weight}
                                height={el.height}
                                heightUnit={el.heightUnit}
                                weightUnit={el.weightUnit}
                                spec={el.spec}
                            />
                        );
                    })}
                </ul>
            </section>
        </>
    );
};

export default PetsList;
