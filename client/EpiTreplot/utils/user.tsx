export async function userLogin(username: string, password: string) {
    try {
        const response = await fetch(`http://localhost:5000/user/login`, {
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
