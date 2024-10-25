export async function workspaceSelect(userId: number) {
    try {
        const response = await fetch(`http://localhost:5000/workspace/select`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                userId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}

export async function workspaceCreate(title: string, description: string, userId: number) {
    try {
        const response = await fetch(`http://localhost:5000/workspace/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                userId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}