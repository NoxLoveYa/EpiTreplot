

import { List } from "@/components/ThemedCardList";

// A function to map the response into a List[] structure
export function mapToLists(response: any[]): List[] {
    const listMap: { [key: number]: List } = {};

    response.forEach(item => {

        const { list_id, list_title, list_description, card_id, card_title, card_description } = item;

        // Check if the list already exists in the map
        if (!listMap[list_id]) {
            listMap[list_id] = {
                id: list_id,
                title: list_title,
                description: list_description, // Assuming no description in this response
                cards: [],
                workspaceId: 1 // Assuming you have the workspace ID somewhere
            };
        }

        // Add the card to the list if a card exists
        if (card_title) {
            listMap[list_id].cards.push({
                id: card_id,
                title: card_title,
                description: card_description,
                listId: list_id
            });
        }
    });

    // Convert the object back into an array of List
    return Object.values(listMap);
}

export async function listSelect(workspaceId: number) {
    try {
        const response = await fetch(`http://localhost:5000/api/list/select`, {
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

export async function listInsert(title: string | null, workspaceId: number) {
    try {
        const response = await fetch(`http://localhost:5000/api/list/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                workspaceId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}

export async function listUpdate(id: number, title: string, description: string | undefined)
{
    try {
        const response = await fetch(`http://localhost:5000/api/list/update`, {
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

export async function listDelete(id: number)
{
    try {
        const response = await fetch(`http://localhost:5000/api/list/delete`, {
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

export async function listDuplicate(id: number)
{
    try {
        const response = await fetch(`http://localhost:5000/api/list/duplicate`, {
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