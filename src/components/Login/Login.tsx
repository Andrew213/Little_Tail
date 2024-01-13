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
        Login: { isLoading, errMsg },
        Session: { session },
    } = useTypedSelector(state => state);

    const navigate = useNavigate();

    const onSuccess = React.useCallback((values: { login: string; password: string }) => {
        const { login, password } = values;
        GetAuth(login, password);
    }, []);

    const [showErr, setShowErr] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (session) {
            navigate('/animals');
        }
    }, [session]);

    const onFail = React.useCallback((values: unknown) => {
        console.log(`Error `, values);
    }, []);

    React.useEffect(() => {
        if (errMsg) {
            setShowErr(true);
            setTimeout(() => {
                setShowErr(false);
            }, 2000);
        }
    }, [errMsg]);

    if (isLoading) {
        return <Loader className={styles.loader} />;
    }

    return (
        <div className={styles.login}>
            <Form
                name="login"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                autoComplete="off"
                labelAlign="left"
                requiredMark={false}
                onFinish={onSuccess}
                onFinishFailed={onFail}
                className={styles.login__form}
            >
                <p className={styles.login__title}>Авторизуйтесь</p>

                <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Введите ваш логин' }]}>
                    <Input className={styles.login__input} />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите ваш пароль' }]}>
                    <Input.Password
                        autoComplete="new-password"
                        className={cn(styles.login__input, styles.login__input_password)}
                    />
                </Form.Item>
                {showErr && <span className={styles.login_error}>{errMsg}</span>}
                <Button type="primary" htmlType="submit" className={styles.login__btn}>
                    Вход
                </Button>
            </Form>
        </div>
    );
};

export default Login;
