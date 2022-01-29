import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import cn from 'classnames';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import useAction from '@/hooks/useAction';

import styles from './styles.module.scss';

const Login: React.FC = () => {
    const { GetAuth } = useAction();

    const onSuccess = React.useCallback((values: { login: string; password: string }) => {
        const { login, password } = values;
        GetAuth(login, password);
    }, []);
    const onFail = React.useCallback(values => {
        console.log(`Error `, values);
    }, []);

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
