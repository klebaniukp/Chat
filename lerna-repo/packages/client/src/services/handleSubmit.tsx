import { signUp, signIn, authorize } from '../api';
import { useUserDataContext } from '../contexts/userDataContext';

export const handleSubmit = (
    e: React.SyntheticEvent,
    form: HTMLFormElement,
    isSignUp: boolean,
    setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const result = authorize();
    const { userData, setUserData } = useUserDataContext();

    if (isSignUp) {
        if (form != null) {
            try {
                const email = form.email.value.toString();
                const name = form.username.value.toString();
                const lastName = form.lastName.value.toString();
                const password = form.password.value.toString();

                let formData = new Object();
                formData = {
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: password,
                };
                console.log(
                    `email:${form.email.value},password:${form.password.value},name:${form.username.value}`,
                );

                //verifying if the user is already registered or not, then it will be registered and signed in
                signUp(JSON.stringify(formData)).then(
                    res => {
                        console.log(res);
                        setIsSignIn(true);
                    },
                    err => {
                        console.log(err);
                        throw err;
                    },
                );

                //setting user Data to context
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
            } catch (error) {
                console.log(error);
            }
        }
    } else if (!isSignUp) {
        if (form != null) {
            try {
                const email = form.email.value.toString();
                const password = form.password.value.toString();

                console.log(`email: ${email}, password: ${password}`);

                let formData = new Object();
                formData = {
                    email: email,
                    password: password,
                };
                console.log(
                    `formEmail:${form.email.value}, formPassword:${form.password.value}`,
                );

                //verifying if the user is already registered, if so, it will be signed in, if not, it will be thrown an error
                signIn(JSON.stringify(formData))
                    .then(res => {
                        console.log(res);
                        window.location.href = '/';
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });

                //setting user Data to context
                result
                    .then(res => {
                        const userInformation = JSON.stringify(res.data);
                        // setUserData(userInformation)
                        console.log(
                            `userData ${userInformation}, type: ${typeof userInformation}`,
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }
};
