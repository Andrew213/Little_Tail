import { DatePicker, Form, Modal, ModalProps, TimePicker } from 'antd';
import TherapySelect from '../TherapySelect/TherapySelect';
import PetsSelect from '../PetsSelect/PetsSelect';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru';
import { useForm } from 'antd/es/form/Form';
import useAction from '@/hooks/useAction';
import { TODAY_POST_DATA } from 'server/routes/today.routes';

const AddTherapyModal: React.FC<ModalProps> = ({ ...props }) => {
    const { CreateToday } = useAction();

    const [form] = useForm();

    const saveForm = async () => {
        try {
            const values = await form.validateFields();

            CreateToday({
                petId: values.petId,
                therapyId: values.therapyId,
                dateTime: new Date(
                    `${dayjs(values.date as string).format('YYYY-MM-DD')}T${dayjs(values.time as string).format(
                        'HH:mm'
                    )}`
                ),
            } as TODAY_POST_DATA);
        } catch (err) {
            console.log(`err `, err);
        }
    };

    return (
        <Modal onOk={saveForm} okText="Сохранить" title="Запись на приём" centered {...props}>
            <Form
                form={form}
                requiredMark={false}
                initialValues={{
                    date: dayjs(),
                }}
                labelAlign="left"
                style={{ fontStyle: 'italic' }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item
                    rules={[{ required: true, message: 'Выберите тип лечения' }]}
                    name="therapyId"
                    label="Тип лечения"
                >
                    <TherapySelect />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Выберите животное' }]} name="petId" label="Животное">
                    <PetsSelect />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Выберите дату' }]} name="date" label="Дата приёма">
                    <DatePicker
                        format="DD.MM.YYYY"
                        locale={locale}
                        style={{ width: '100%' }}
                        placeholder="Выберите дату"
                        disabledDate={current => current < dayjs()}
                    />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Выберите время' }]} name="time" label="Время приёма">
                    <TimePicker format="HH:mm" locale={locale} style={{ width: '100%' }} placeholder="Выберите время" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTherapyModal;
