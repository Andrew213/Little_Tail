import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';

const TherapySelect: React.FC<SelectProps> = ({ ...props }) => {
    const { GetTherapies } = useAction();
    const { isLoading, therapiesList } = useTypedSelector(state => state.Therapy);
    const [options, setOptions] = useState<DefaultOptionType[]>([]);
    useEffect(() => {
        GetTherapies();
    }, []);

    useEffect(() => {
        if (therapiesList.length) {
            const selectOptions: DefaultOptionType[] = therapiesList.map(therapy => ({
                label: therapy.type,
                value: therapy._id,
            }));

            setOptions(selectOptions);
        }
    }, [therapiesList]);

    return <Select placeholder="Выберите тип" options={options} loading={isLoading} {...props} />;
};

export default TherapySelect;
