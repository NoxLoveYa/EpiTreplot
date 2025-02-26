import { Card } from "@/components/ThemedCard";


export async function cardInsert(title: string, description: string | null, listId: number) {
    try {
        const response = await fetch(`http://localhost:5000/api/card/create`, {
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
        const response = await fetch(`http://localhost:5000/api/card/update`, {
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

export async function cardDelete(id: number) {
    try {
        const response = await fetch(`http://localhost:5000/api/card/delete`, {
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
