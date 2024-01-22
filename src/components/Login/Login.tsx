/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import cn from 'classnames';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { signInT, signUpT } from '@/store/Login/action';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const { SignIn, SignUp } = useAction();

    const {
        Login: { loginLoading, errMsg },
        Session: { session },
    } = useTypedSelector(state => state);

    const navigate = useNavigate();

    const onSuccess = React.useCallback(
        async (values: signUpT | signInT) => {
            if (isSignUp) {
                const response = await SignUp(values as signUpT);
                if (response?.user) {
                    await message.open({ type: 'success', content: 'Успешно зарегистрировались' });
                }
            } else {
                await SignIn(values as signInT);
            }
        },
        [isSignUp]
    );

    useEffect(() => {
        if (errMsg) {
            void message.open({ type: 'error', content: errMsg });
        }
    }, [errMsg]);

    React.useEffect(() => {
        if (session) {
            navigate('/animals');
        }
    }, [session]);

    const onFail = React.useCallback((values: unknown) => {
        console.log(`Error `, values);
    }, []);

    return (
        <div className={styles.login}>
            <Form
                name="login"
                autoComplete="off"
                labelAlign="left"
                layout="vertical"
                requiredMark={false}
                onFinish={onSuccess}
                onFinishFailed={onFail}
                className={styles.login__form}
            >
                <p className={styles.login__title}>{isSignUp ? 'Регистрация' : 'Авторизуйтесь'}</p>

                {isSignUp ? (
                    <>
                        <Form.Item
                            style={{
                                width: '100%',
                            }}
                            name="login"
                            rules={[{ required: true, message: 'Введите логин' }]}
                            label={<label className={styles.login__label}>Логин</label>}
                        >
                            <Input className={styles.login__input} />
                        </Form.Item>
                        <Form.Item
                            style={{
                                width: '100%',
                            }}
                            name="first_name"
                            rules={[{ required: true, message: 'Введите имя' }]}
                            label={<label className={styles.login__label}>Имя</label>}
                        >
                            <Input className={styles.login__input} />
                        </Form.Item>
                        <Form.Item
                            style={{
                                width: '100%',
                            }}
                            name="last_name"
                            rules={[{ required: true, message: 'Введите фамилию' }]}
                            label={<label className={styles.login__label}>Фамилия</label>}
                        >
                            <Input className={styles.login__input} />
                        </Form.Item>
                        <Form.Item name="password" label={<label className={styles.login__label}>Пароль</label>}>
                            <Input.Password className={styles.login__input} autoComplete="new-password" />
                        </Form.Item>
                    </>
                ) : (
                    <>
                        <Form.Item
                            label={<label className={styles.login__label}>Логин</label>}
                            name="login"
                            style={{
                                width: '100%',
                            }}
                            rules={[{ required: true, message: 'Введите ваш логин' }]}
                        >
                            <Input className={styles.login__input} />
                        </Form.Item>
                        <Form.Item
                            label={<label className={styles.login__label}>Пароль</label>}
                            name="password"
                            rules={[{ required: true, message: 'Введите ваш пароль' }]}
                        >
                            <Input.Password
                                autoComplete="new-password"
                                min={3}
                                className={cn(styles.login__input, styles.login__input_password)}
                            />
                        </Form.Item>
                    </>
                )}

                <div
                    style={{
                        display: 'grid',
                        alignItems: 'center',
                    }}
                >
                    <Button type="primary" loading={loginLoading} htmlType="submit" className={styles.login__btn}>
                        Вход
                    </Button>

                    <Button type="link" onClick={() => setIsSignUp(prev => !prev)} className={styles.login__btn_signUp}>
                        {isSignUp ? 'Назад' : 'Нет аккаунта?'}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Login;
