import { Input } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useSearchParams } from 'react-router-dom';

let timeout: string | number | NodeJS.Timeout;

const Toolbar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('query')) {
            setQuery(searchParams.get('query'));
        }
    }, [searchParams]);

    const handleSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const el = e.target as HTMLInputElement;

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            timeout = setTimeout(() => {
                setQuery(el.value);

                if (!el.value) {
                    searchParams.delete('query');
                    setSearchParams(searchParams);

                    return;
                }
                searchParams.delete('page');
                searchParams.set('query', el.value);
                setSearchParams(searchParams);
            }, 100);
        },
        [timeout, searchParams]
    );

    return (
        <div className={styles.toolbar}>
            <Input.Search value={query} onChange={handleSearch} placeholder="Поиск по кличке" />
        </div>
    );
};

export default Toolbar;
