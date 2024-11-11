import { Card } from "@/components/ThemedCard";
// @ts-ignore
import { BACKEND_URI } from '@env'

export async function cardInsert(title: string, description: string | null, listId: number) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/card/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                listId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}

export async function cardUpdate(id: number, title: string, description: string | undefined, listId: number) {
    try {
        const response = await fetch(`${BACKEND_URI}/api/card/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                id,
                title,
                description,
                listId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}