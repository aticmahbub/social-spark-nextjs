/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

export const loginUser = async (
    _currentState: any,
    formData: FormData,
): Promise<any> => {
    try {
        const loginData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const res = await fetch(`http://localhost:4000/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {'Content-Type': 'application/json'},
        }).then((res) => res.json());
        return res;
    } catch (error) {
        console.log(error);
        return {error: 'Login failed'};
    }
};
