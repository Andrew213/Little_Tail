import React from 'react';
import useAction from '@/hooks/useAction';
import { Pagination, Typography } from 'antd';
import qs from 'qs';
import { createBrowserHistory } from 'history';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './styles.module.scss';
import Loader from '@/lib/Loader/Loader';

const Pets: React.FC = () => {
    const history = createBrowserHistory();

    const {
        Pets: { isLoading, petsListing },
    } = useTypedSelector(state => state);

    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const { GetAnimals } = useAction();

    React.useEffect(() => {
        const access_token = localStorage.getItem('access_token');

        GetAnimals(access_token, currentPage - 1);
    }, [currentPage]);

    React.useEffect(() => {
        const filterParams = history.location.search.substr(1);
        const filtersFromParams = qs.parse(filterParams);
        if (filtersFromParams.page) {
            setCurrentPage(Number(filtersFromParams.page));
        }
    }, []);

    React.useEffect(() => {
        history.push(`?page=${currentPage}`);
    }, [currentPage]);

    const handeonChange = (page: number) => {
        setCurrentPage(page);
    };
    console.log(petsListing);
    if (isLoading) {
        return <Loader className={styles.loader} />;
    }

    return (
        <section className={styles.pets}>
            <div className={styles.pets__container}>
                {petsListing.length && (
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
            <Pagination
                current={currentPage}
                className={styles.pets__pagination}
                total={23}
                onChange={handeonChange}
                defaultPageSize={5}
            />
        </section>
    );
};

export default Pets;
