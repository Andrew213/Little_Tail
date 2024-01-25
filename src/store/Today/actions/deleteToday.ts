export const deleteToday = (id: string) => {
    return async () => {
        const accessToken = localStorage.getItem('access_token');

        try {
            const response = await fetch('https://littletail.onrender.com/api/today', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            return response;
        } catch (err) {
            return err;
        }
    };
};
