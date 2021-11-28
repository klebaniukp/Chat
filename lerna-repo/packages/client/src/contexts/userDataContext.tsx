import {
    createContext,
    useContext,
    useState,
    SetStateAction,
    Dispatch,
} from 'react';
import { CollectingUserData } from '../services/CollectingUserData';

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
    // const userData = JSON.stringify(CollectingUserData());
    // context.setUserData(userData);

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
    const [userData, setUserData] = useState('');

    return (
        <UserDataContext.Provider
            value={{
                userData,
                setUserData,
            }}>
            {children}
        </UserDataContext.Provider>
    );
};
