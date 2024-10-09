import { Card } from "@/components/ThemedCard";

export async function cardInsert(title: string, description: string | null, listId: number) {
    try {
        const response = await fetch(`http://localhost:5000/card/create`, {
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