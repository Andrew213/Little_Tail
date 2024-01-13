export const deleteToday = (id: string) => {
    return async () => {
        // dispatch({
        //     type: TodayActionTypes.REQUEST_CREATE_TODAY,
        //     isLoading: false,
        // });

        const accessToken = localStorage.getItem('access_token');

        try {
            const foo = await fetch('http://localhost:5000/api/today', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const response = await foo.json();
            if (response.status === 'ok') {
                return true;
            }
            return false;
        } catch (err) {
            return err;
            // dispatch({ type: TodayActionTypes.FETCH_CREATE_TODAY_ERROR, isLoading: false, errMsg: err });
        }
    };
};
