import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import cn from 'classnames';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import Loader from '@/lib/Loader/Loader';
import styles from './styles.module.scss';

const Login: React.FC = () => {
    const { GetAuth } = useAction();

    const {
        Login: { isLoading },
        Session: { session },
    } = useTypedSelector(state => state);

    const navigate = useNavigate();

    const onSuccess = React.useCallback((values: { login: string; password: string }) => {
        const { login, password } = values;
        GetAuth(login, password);
    }, []);

    React.useEffect(() => {
        if (session) {
            navigate('/animals');
        }
    }, [session]);

    const onFail = React.useCallback(values => {
        console.log(`Error `, values);
    }, []);

    if (isLoading) {
        return <Loader className={styles.loader} />;
    }

    return (
        <div className={styles.login}>
            <Form
                name="login"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onSuccess}
                onFinishFailed={onFail}
                className={styles.login__form}
            >
                <Form.Item>
                    <Typography.Paragraph className={styles.login__title}>Авторизуйтесь</Typography.Paragraph>
                </Form.Item>
                <Form.Item
                    className={styles.login__item}
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Введите ваш логин' }]}
                >
                    <Input className={styles.login__input} />
                </Form.Item>
                <Form.Item
                    className={styles.login__item}
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите ваш пароль' }]}
                >
                    <Input.Password
                        autoComplete="new-password"
                        className={cn(styles.login__input, styles.login__input_password)}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className={styles.login__btn}>
                        Вход
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
