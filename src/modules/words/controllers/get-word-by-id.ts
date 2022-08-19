import * as a from 'axios';
import { messageModal } from '../../auth/view/message-madal';
import { host } from '../../auth/controllers/hosts';

const axios = a.default;

export const getWordById = async (wordId: string): Promise<string> => {
    try {
        const response = await axios.get(`${host}/words/${wordId}`);
        return response.data.word;
    } catch {
        messageModal('Word not exist');
    }
};
