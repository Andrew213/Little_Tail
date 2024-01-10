import React from 'react';
import useAction from '@/hooks/useAction';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Loader from '@/lib/Loader/Loader';
import styles from './styles.module.scss';
import PetCard from '../PetCard/PetCard';

interface PetsListProps {
    pageNum?: number;
}

const PetsList: React.FC<PetsListProps> = ({ pageNum }) => {
    const {
        Pets: { isLoading, petsListing },
        Session: { session },
    } = useTypedSelector(state => state);

    const navigate = useNavigate();

    const { GetAnimals } = useAction();

    React.useEffect(() => {
        if (!session) {
            navigate('/');
            return;
        }
        const access_token = localStorage.getItem('access_token');

        GetAnimals(access_token, pageNum);
        console.log(123);
    }, [pageNum, session]);

    if (isLoading) {
        return <Loader className={styles.loader} />;
    }

    return (
        <section className={styles.pets}>
            <div className={styles.pets__container}>
                {petsListing && (
                    <ul className={styles.pets__list}>
                        {petsListing.map(el => {
                            return (
                                <PetCard
                                    key={el._id}
                                    name={el.name}
                                    breed={el.spec.name}
                                    age={el.age}
                                    weight={el.weight}
                                    height={el.height}
                                    heightUnit={el.heightUnit}
                                    weightUnit={el.weightUnit}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default PetsList;
