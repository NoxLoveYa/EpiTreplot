// @ts-ignore
import { BACKEND_URI } from '@env'

export async function userLogin(username: string, password: string) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}

export async function userRegister(username: string, email: string, password: string) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}

export async function userValidate(token: string) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/user/validate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                token
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}