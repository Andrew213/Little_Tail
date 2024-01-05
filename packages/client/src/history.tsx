import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const reloadPage = () => {
    history.go(0);
};

export default history;
