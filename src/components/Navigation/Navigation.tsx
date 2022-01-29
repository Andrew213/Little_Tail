import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@img/logo.png';
import { Typography, Menu, Avatar } from 'antd';
import { YuqueOutlined, CarryOutOutlined } from '@ant-design/icons';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import cn from 'classnames';
import { userT } from '@/store/Login/LoginState';

import styles from './styles.module.scss';

const Navigation: React.FC = () => {
    const { Login } = useTypedSelector(state => state);

    const [user, setUser] = React.useState<userT>();
    const [session, setSession] = React.useState<boolean>(false);

    React.useEffect(() => {
        console.log(Login.user);

        setSession(Login.session);
        setUser(Login.user);
        // if (Login.session) {
        //     console.log(`hello`);
        // } else {
        //     console.log(`((()))`);
        // }
    }, [Login.session]);
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__container}>
                <div className={styles.navbar__logoContainer}>
                    <Typography.Title level={2}>
                        <Link to="/">
                            <img src={logo} alt="logo cat" className={styles.navbar__logo} />
                            <span style={{ color: '#7347c1' }}>Little</span>
                            <span style={{ color: '#0674ec' }}>Tail</span>
                        </Link>
                    </Typography.Title>
                    {/* <Button className={styles.navbar__menu}></Button> */}
                </div>
                <Menu className={styles.navbar__menu}>
                    <Menu.Item
                        icon={<YuqueOutlined className={styles.navbar__menuItemIcon} />}
                        className={cn(styles.navbar__menuItem, styles.navbar__menuItem_animals)}
                        key={'animals'}
                    >
                        <Link to="/animals">
                            <p className={styles.navbar__text}>Животные</p>
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        icon={<CarryOutOutlined className={styles.navbar__menuItemIcon} />}
                        className={cn(styles.navbar__menuItem, styles.navbar__menuItem_today)}
                        key={'today'}
                    >
                        <Link to="/today">
                            <p className={styles.navbar__text}>Записи</p>
                        </Link>
                    </Menu.Item>
                </Menu>
                {session && (
                    <div className={styles.user}>
                        <p className={cn(styles.user__name, styles.user__name_firstName)}>{user.firstName}</p>
                        <p className={cn(styles.user__name, styles.user__name_lastName)}>{user.lastName}</p>
                        <Avatar className={styles.user__ava} src="https://joeschmoe.io/api/v1/random" />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
