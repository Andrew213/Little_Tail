import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import styles from './styles.module.scss';
import PetsList from './components/PetsList/PetsList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSearchParams } from 'react-router-dom';

const limit = 8;
const Pets: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { total } = useTypedSelector(state => state.Pets);

    const [currentPage, setCurrentPage] = React.useState(+searchParams.get('page') || 1);
    const handeonChange = React.useCallback(
        (page: number) => {
            searchParams.set('page', `${page}`);
            setSearchParams(searchParams);
            setCurrentPage(page);
        },
        [searchParams]
    );

    return (
        <div className={styles.petsContainer}>
            <PetsList limit={limit} />
            <Pagination
                current={currentPage}
                className={styles.pagination}
                total={total}
                onChange={handeonChange}
                defaultPageSize={limit}
            />
        </div>
    );
};

export default Pets;
