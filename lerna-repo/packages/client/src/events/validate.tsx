// const validate = (form: HTMLFormElement, isSignUp: boolean) => {
//     if (isSignup) {
//       if (!form.email && !form.password && !form.confirmPassword && !form.name) {
//         setError('Please complete all fields');
//         return false;
//       }

//       if (form.password != form.confirmPassword) {
//         setError('The provided passwords do not match');
//         return false;
//       }

//       if (croppie === null) {
//         setError('Add profile image');
//         return false;
//       }
//     } else if (!form.email && !form.password) {
//       setError('Please complete all fields');
//       return false;
//     }

//     if (!(form.email.includes('@') && form.email.includes('.'))) {
//       setError('Please check your email');
//       return false;
//     }

//     if (!(form.password.length >= 8) && !/\d/.test(form.password)) {
//       setError('Password must be at least 8 characters long and contain numbers');
//       return false;
//     }

//     return true;
//   };

export {};
