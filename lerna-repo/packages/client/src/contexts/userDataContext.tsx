import {
    createContext,
    useContext,
    useState,
    SetStateAction,
    Dispatch,
} from 'react';
import { Navbar } from '../components/organism/Navbar';
// import { CollectingUserData } from '../services/CollectingUserData';
// import { authorize } from '../api/index';

type ContextType = {
    userData: string;
    setUserData: Dispatch<SetStateAction<string>>;
};

const UserDataContext = createContext<ContextType>({
    userData: 'example@gmail.com',
    setUserData: () => {},
});

export const useUserDataContext = () => {
    const context = useContext(UserDataContext);

    if (!context) {
        throw new Error('Error while reading a context');
    }

    return context;
};

export const UserDataProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [userData, setUserData] = useState('example@gmail.com');

    // const result = authorize();

    // result
    //     .then(res => {
    //         setUserData(res.data.email);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         setUserData('example@gmail.com');
    //     });

    return (
        <UserDataContext.Provider
            value={{
                userData,
                setUserData,
            }}>
            <Navbar />
            {children}
        </UserDataContext.Provider>
    );
};
