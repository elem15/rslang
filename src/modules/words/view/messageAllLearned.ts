import { messageModal } from '../../auth/view/message-modal';

export const addAllLearnedMessage = (countHardAndLearnedWords = 0, group: number) => {
    const containerData = document.querySelector('.items-container') as HTMLDivElement;
    const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
    const groupTextbookColorBackground = [
        'rgba(232, 18, 36, 0.6)',
        'rgba(247, 99, 12, 0.6)',
        'rgba(255, 241, 0, 0.6)',
        'rgba(22, 198, 12, 0.6)',
        'rgba(0, 120, 215, 0.6)',
        'rgba(136, 108, 228, 0.6)',
        'rgba(142, 86, 46, 0.6)',
    ];

    if (countHardAndLearnedWords === 20) {
        wrapper.style.backgroundColor = 'darkcyan';
        messageModal('Все слова на данной странице относятся к группам "Сложные слова" или "Изученные слова".');
    } else if (containerData.innerHTML === '') {
        wrapper.style.backgroundColor = 'darkcyan';
        wrapper.style.height = '100vh';
        messageModal('Отсутствуют слова из группы "Сложные слова".');
    } else {
        wrapper.style.backgroundColor = `${groupTextbookColorBackground[group]}`;
    }
};
