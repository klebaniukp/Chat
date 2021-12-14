import { authorize } from '../api';
import { useUserDataContext } from '../contexts/userDataContext';

export const userDataCollection = () => {
    const result = authorize();
    const { userData, setUserData } = useUserDataContext();

    result.then(res => {
        result
            .then(res => {
                const userInformation = JSON.stringify(res.data);
                setUserData(userInformation);
                console.log(
                    `userData ${userInformation}, type: ${typeof userInformation}`,
                );
            })
            .catch(err => {
                console.log(err);
            });
    });
};
