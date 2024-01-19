/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Form, Input, Button, Typography, notification, message } from 'antd';
import cn from 'classnames';
import useAction from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import Loader from '@/lib/Loader/Loader';
import styles from './styles.module.scss';
import SignUp from './components/SignUpForm';
import { signInT, signUpT } from '@/store/Login/action';

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const { GetAuth, SignUp } = useAction();

    const {
        Login: { isLoading, errMsg },
        Session: { session },
    } = useTypedSelector(state => state);

    const navigate = useNavigate();

    const onSuccess = React.useCallback(
        async (values: signUpT | signInT) => {
            if (isSignUp) {
                const foo = await SignUp(values as signUpT);
                if (foo.status === 200) {
                    await message.open({ type: 'success', content: 'Успешно зарегистрировались' });
                }
            } else {
                GetAuth(values as signInT);
            }
            // const { login, password } = values;
        },
        [isSignUp]
    );

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

                {showErr && <span className={styles.login_error}>{errMsg}</span>}
                <div
                    style={{
                        display: 'grid',
                        alignItems: 'center',
                    }}
                >
                    <Button type="primary" htmlType="submit" className={styles.login__btn}>
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
