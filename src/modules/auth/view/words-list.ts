import { getUserWords } from '../controllers/get-user-words';
import { getWordById } from '../controllers/get-word-by-id';

interface Element {
    wordId: string;
}
const renderListItem = async (id: string, list: HTMLUListElement) => {
    const li = document.createElement('li');
    li.innerText = await getWordById(id);
    list.append(li);
};
export const renderWordsList = async (): Promise<void> => {
    const oldModal = document.querySelector('.modal') as HTMLFormElement;
    if (oldModal) oldModal.remove();
    const response = await getUserWords();
    if (response) {
        const ids = response.data.map(({ wordId }: Element) => wordId);
        console.log(ids);
        const list = document.createElement('ul');
        document.body.append(list);
        const words = ids.map(async (id: string) => {
            new Promise((resolve) => resolve(renderListItem(id, list)));
        });
        Promise.allSettled(words);
    }
};

// Access to XMLHttpRequest at 'http://localhost:3500/users/62fc00347048040015f03cd6/aggregatedWords' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.