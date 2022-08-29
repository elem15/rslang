import { BodyRequest } from "../../../types/textbook-types";
import { UserData } from "../../../types/user-types";
import { host } from "../../auth/controllers/hosts";

export const updateSettings = async (body: BodyRequest) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    await fetch(`${host}/users/${userId}/settings`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};

export const getSettings = async () => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    try {
        const response = await fetch(`${host}/users/${userId}/settings`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        const words = await response.json();
        return words;
    } catch {
        console.log('Word not exist');
    }
};

export const getUserWordById = async (wordId: string) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    try {
        const response = await fetch(`${host}/users/${userId}/words/${wordId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });
        const words = await response.json();
        return words;
    } catch {
        console.log('Word not exist');
    }
}

export const addNewWord = async (wordId: string) => {
    const store: UserData = JSON.parse(localStorage.getItem('data'));
    const { userId, token } = store;
    const wordUserStatus = await getUserWordById(wordId);
    if (wordUserStatus === undefined) {
       (
            await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'POST',
                body: JSON.stringify({ difficulty: 'neutral', optional: {date: new Date().toLocaleDateString('ru-RU'), isWordNew: true}}),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
       ).json();
       //return await response.json();
    } else if (wordUserStatus && !('optional' in wordUserStatus) || !('isWordNew' in wordUserStatus.optional)) {
       (
        await fetch(`${host}/users/${userId}/words/${wordId}`, {
                method: 'PUT',
                body: JSON.stringify({optional: {date: new Date().toLocaleDateString('ru-RU'), isWordNew: true}}),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
       ).json();
        //return await response.json();
    }
};