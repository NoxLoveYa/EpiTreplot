// @ts-ignore
import { BACKEND_URI } from '@env'

export async function workspaceSelect(userId: number) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/workspace/select`, {
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
        const response = await fetch(`${BACKEND_URI}/api/workspace/create`, {
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

export async function workspaceDelete(id: number) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/workspace/delete`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                id
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}

export async function workspaceUpdate(id: number, title: string, description: string) {
    try {
        const response = await fetch(`/api/workspace/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                id,
                title,
                description
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}