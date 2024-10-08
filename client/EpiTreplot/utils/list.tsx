import { List } from "@/components/ThemedCardList";

// A function to map the response into a List[] structure
export function mapToLists(response: any[]): List[] {
    const listMap: { [key: number]: List } = {};

    response.forEach(item => {
        const { list_id, list_title, card_title, card_description } = item;

        // Check if the list already exists in the map
        if (!listMap[list_id]) {
            listMap[list_id] = {
                title: list_title,
                description: "", // Assuming no description in this response
                cards: [],
                workspaceId: 1 // Assuming you have the workspace ID somewhere
            };
        }

        // Add the card to the list if a card exists
        if (card_title) {
            listMap[list_id].cards.push({
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

export async function listInsert(title: string, description: string, workspaceId: number) {
    try {
        const response = await fetch(`http://localhost:5000/list/insert`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                workspaceId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
}