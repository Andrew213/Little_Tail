/**
 * Создание истории на основе адресной строки
 * (без учета иных переходов по страницам)
 */
const createPureHistory = (): void => {
    const history = window.history;

    if (history.length > 2) {
        return;
    }

    /**
     * Получить данные адресной строки
     */
    const getPathData = () => {
        if (location) {
            let pathname = location.pathname;

            if (pathname) {
                if (pathname.substr(0, 1) === '/') {
                    pathname = pathname.substr(1);
                }
                if (pathname.substr(pathname.length - 1, 1) === '/') {
                    pathname = pathname.substr(0, pathname.length - 1);
                }

                if (pathname) {
                    return pathname.split('/');
                }
            }
        }
        return null;
    };

    // const path = getPathData();
    const site = location.origin;
    let urlPath = '';

    /**
     * Сформировать историю на основе адресной строки
     */
    // if (path) {
    //     path.map((item, index) => {
    //         if (index === 0) {
    //             urlPath = site;
    //         }
    //         urlPath += '/' + item;
    //         history.pushState(null, '', urlPath);
    //     });
    // }
};

export default createPureHistory;
