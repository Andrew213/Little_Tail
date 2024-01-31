/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { Form, Input, InputNumber, Modal, ModalProps, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import SpecSelect from '../SpecSelect/SpecSelect';
import useAction from '@/hooks/useAction';
import { PetT } from '@/types/PetType';

interface AddPetModalProps extends ModalProps {
    setVisible: (a: boolean) => void;
    setPetsListReload: (a: (prev: boolean) => boolean) => void;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ setVisible, setPetsListReload, ...restProps }) => {
    const [form] = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const { PostAnimal } = useAction();

    const saveForm = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const response = await PostAnimal(values as PetT);
            if (response && (response as any).message) {
                void message.open({ type: 'success', content: (response as any).message });
                setPetsListReload(prev => !prev);
            }
            setLoading(false);
            setVisible(false);
        } catch (error) {
            setLoading(false);
            setVisible(false);

            console.log(`err `, error);
        }
    };

    return (
        <Modal
            confirmLoading={loading}
            onOk={saveForm}
            okText="Сохранить"
            title="Добавить питомца"
            centered
            {...restProps}
        >
            <Form
                form={form}
                requiredMark={false}
                labelAlign="left"
                style={{ fontStyle: 'italic' }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item name="specId" rules={[{ required: true, message: 'Выберите тип' }]} label="Тип">
                    <SpecSelect style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="name" rules={[{ required: true, message: 'Введите кличку' }]} label="Кличка">
                    <Input placeholder="Введите кличку" />
                </Form.Item>
                <Form.Item name="age" rules={[{ required: true, message: 'Введите возраст' }]} label="Полных лет">
                    <InputNumber min={0} type="number" placeholder="Введите возраст" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите рост' }]} name="height" label="Рост (см)">
                    <InputNumber min={0} type="number" placeholder="Введите рост" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Введите вес' }]} name="weight" label="Вес (кг)">
                    <InputNumber min={0} type="number" placeholder="Введите рост" style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddPetModal;
