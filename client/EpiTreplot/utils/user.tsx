

export async function userLogin(username: string, password: string) {
    try {
        const response = await fetch(`http://localhost:5000/api/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                userName: username,
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
        const response = await fetch(`http://localhost:5000/api/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                userName: username,
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
        const response = await fetch(`http://localhost:5000/api/user/validate`, {
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