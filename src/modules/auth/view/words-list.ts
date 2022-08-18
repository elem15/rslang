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
