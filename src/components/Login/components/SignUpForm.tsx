import { Form, Input } from 'antd';

const SignUp = () => {
    return (
        <>
            <Form.Item label="Логин">
                <Input />
            </Form.Item>
            <Form.Item label="Пароль">
                <Input />
            </Form.Item>
            <Form.Item label="Повторите пароль">
                <Input />
            </Form.Item>
        </>
        // <Form>
        //     <Form.Item>
        //         <Input />
        //     </Form.Item>
        // </Form>
    );
};

export default SignUp;
