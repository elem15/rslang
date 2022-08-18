import { Word } from '../types';

export const showResult = (correct: Word[], incorrect: Word[]) => {
    const result = document.createElement('div') as HTMLElement;
    const heading = document.createElement('h2') as HTMLElement;
    const correctHeading = document.createElement('h4') as HTMLElement;
    const incorrectHeading = document.createElement('h4') as HTMLElement;

    heading.classList.add('game__result_heading');
    heading.innerText = 'Результат';
    result.classList.add('modal game__result');
    correctHeading.classList.add('game__results_heading-correct');
    correctHeading.innerText = 'Верные';
    incorrectHeading.classList.add('game__results_heading-incorrect');
    incorrectHeading.innerText = 'Не верные';

    result.append(
        heading,
        correctHeading,
        ...correct.map((c) => {
            const span = document.createElement('span') as HTMLElement;
            span.classList.add('game__result_correct');
            span.innerText = c.wordTranslate;
            return span;
        }),
        incorrectHeading,
        ...incorrect.map((c) => {
            const span = document.createElement('span') as HTMLElement;
            span.classList.add('game__result_incorrect');
            span.innerText = c.wordTranslate;
            return span;
        })
    );

    document.body.append(result);
};
