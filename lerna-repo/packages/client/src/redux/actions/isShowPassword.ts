export const isShowPassword =
    (authStatus: boolean) =>
    (dispatch: (arg0: { type: string; payload: boolean }) => void) => {
        try {
            dispatch({
                type: 'SET_IS_SHOW_PASSWORD',
                payload: authStatus,
            });
        } catch (error) {
            console.log(error);
        }
    };
