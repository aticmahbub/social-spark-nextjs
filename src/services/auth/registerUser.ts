/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export const registerUser = async (
    _currentState: any,
    formData: FormData,
): Promise<any> => {
    try {
        const registerData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(registerData));

        const res = await fetch(
            `http://localhost:4000/api/v1/user/create-user`,
            {
                method: 'POST',
                body: newFormData,
            },
        ).then((res) => res.json());
        console.log(res);

        return res;
    } catch (error) {
        console.log(error);
        return {success: false, message: 'Registration failed'};
    }

    return {success: true};
};
