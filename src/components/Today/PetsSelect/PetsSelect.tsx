import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Select } from 'antd';
import { useEffect } from 'react';

const PetsSelect: React.FC = ({ ...props }) => {
    const { GetAnimals } = useAction();
    const { petsListing, isLoading } = useTypedSelector(state => state.Pets);
    useEffect(() => {
        GetAnimals({ allData: 1 });
    }, []);

    return (
        <Select optionLabelProp="label" loading={isLoading} placeholder="Выберите животное" {...props}>
            {petsListing.map(pet => (
                <Select.Option key={pet._id} value={pet._id} label={`${pet.name} - ${pet.spec.name}`}>
                    <div>
                        <div>
                            <span>Кличка: </span>
                            <span>{pet.name}</span>
                        </div>
                        <div>
                            <span>Порода: </span>
                            <span>{pet.spec.name}</span>
                        </div>
                        <div>
                            <span>Вид: </span>
                            <span>{pet.spec.type}</span>
                        </div>
                    </div>
                </Select.Option>
            ))}
        </Select>
    );
};

export default PetsSelect;
