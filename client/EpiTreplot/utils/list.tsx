export async function listSelect(workspaceId: number) {
    try {
        const response = await fetch(`http://localhost:5000/list/select`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                workspaceId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}
