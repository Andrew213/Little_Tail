import React from 'react';
import useAction from '@/hooks/useAction';
import { Pagination } from 'antd';
import qs from 'qs';
import { createBrowserHistory } from 'history';

import styles from './styles.module.scss';

const Pets: React.FC = () => {
    const history = createBrowserHistory();

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

    return (
        <section className={styles.pets}>
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
