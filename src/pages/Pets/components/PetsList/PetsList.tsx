import React, { useMemo, useState } from 'react';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Loader from '@/lib/Loader/Loader';
import { PlusOutlined } from '@ant-design/icons';
import PetCard from '../PetCard/PetCard';
import { Button, Input } from 'antd';
import AddPetModal from '../AddPetModal/AddPetModal';
import Toolbar from '@/components/Toolbar/Toolabar';
import styles from './styles.module.scss';
import { useSearchParams } from 'react-router-dom';

interface PetsListProps {
    pageNum?: number;
}

const PetsList: React.FC<PetsListProps> = ({ pageNum }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        Pets: { isLoading, petsListing },
    } = useTypedSelector(state => state);

    const { GetAnimals } = useAction();

    React.useEffect(() => {
        GetAnimals(Object.fromEntries(searchParams.entries()));
    }, [searchParams, reload]);

    const toolbar = useMemo(() => <Toolbar />, []);

    if (isLoading) {
        return <Loader className="loader" />;
    }

    return (
        <>
            <section className={styles.pets}>
                <div className={styles.pets__controls}>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        icon={<PlusOutlined />}
                        type="primary"
                        className={styles.pets__createBtn}
                    >
                        Добавить питомца
                    </Button>
                    {toolbar}
                </div>

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
