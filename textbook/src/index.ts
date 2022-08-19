import './global.css';
import './global.scss';
import { drawTextbookNav } from './modules/view/draw';

const chapterTextbookFromLocaleStorage = 1;
const pageTextbookFromLocaleStorage = 1;

drawTextbookNav(pageTextbookFromLocaleStorage, chapterTextbookFromLocaleStorage);
