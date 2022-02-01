import React from 'react';
import useAction from '@/hooks/useAction';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Loader from '@/lib/Loader/Loader';
import styles from './styles.module.scss';

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

        GetAnimals(access_token, pageNum - 1);
    }, [pageNum, session]);

    if (isLoading) {
        return <Loader className={styles.loader} />;
    }

    return (
        <section className={styles.pets}>
            <div className={styles.pets__container}>
                {petsListing && (
                    <ul className={styles.pets__list}>
                        {petsListing.map(el => (
                            <li className={styles.pets__item} key={el.id}>
                                <button className={styles.pets__btn}>
                                    <Typography.Title className={styles.pets__name} level={3}>
                                        {el.name}
                                    </Typography.Title>
                                    <Typography.Paragraph className={styles.pets__specName}>
                                        {el.spec.name}
                                    </Typography.Paragraph>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default PetsList;
