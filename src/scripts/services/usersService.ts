import {SerializedUser} from "../types/SerializedUser";
import UnserializedUser from "../types/UnserializedUser";

export async function fetchUsers(): Promise<UnserializedUser[]> {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const json = await response.json();
    return json.results;
}

export async function createUser(user: SerializedUser){
    const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    return response.json();
}
