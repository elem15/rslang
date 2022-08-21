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
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    const words = document.createElement('section');
    words.className = 'dictionary';
    root.append(words);
    const response = await getUserWords();
    if (response) {
        const ids = response.data.map(({ wordId }: Element) => wordId);
        const list = document.createElement('ul');
        words.append(list);
        const wordsPromises = ids.map(async (id: string) => {
            new Promise((resolve) => resolve(renderListItem(id, list)));
        });
        Promise.allSettled(wordsPromises);
    }
};
