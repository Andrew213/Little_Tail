/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { specT } from '@/types/PetType';
import { SelectProps, Tag } from 'antd';
import { Select } from 'antd/lib';
import { ReactNode, useEffect, useState } from 'react';

export const tagType = (type: string) => {
    switch (type) {
        case 'Cat':
            return <Tag color="red">{type}</Tag>;
        case 'Dog':
            return <Tag color="green">{type}</Tag>;
        case 'Snake':
            return <Tag color="blue">{type}</Tag>;
        case 'Rodent':
            return <Tag color="gold">{type}</Tag>;
        case 'Reptile':
            return <Tag color="geekblue">{type}</Tag>;
        case 'Bird':
            return <Tag color="magenta">{type}</Tag>;
    }
};

const SpecSelect: React.FC<SelectProps> = ({ ...props }) => {
    const [options, setOptions] = useState<ReactNode[]>([]);

    useEffect(() => {
        const getSpecs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/spec').then(res => res.json());
                setOptions(
                    response.map((spec: specT) => {
                        return (
                            <Select.Option
                                value={spec.id}
                                label={
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span>{spec.name}</span>
                                        <span>{tagType(spec.type)}</span>
                                    </div>
                                }
                                key={spec.id}
                            >
                                <div>
                                    <div>
                                        <span>Порода: </span>
                                        <span>{spec.name}</span>
                                    </div>
                                    <div>
                                        <span>Вид: </span>
                                        <span>{tagType(spec.type)}</span>
                                    </div>
                                </div>
                            </Select.Option>
                        );
                    })
                );
            } catch (error) {
                console.log(`error `, error);
            }
        };
        void getSpecs();
    }, []);

    return (
        <Select optionLabelProp="label" placeholder="Выберите тип питомца" {...props}>
            {options}
        </Select>
    );
};

export default SpecSelect;
