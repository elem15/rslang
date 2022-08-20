import './global.css';
import './global.scss';
import { drawTextbook } from './modules/view/draw';

const chapterTextbookFromLocaleStorage = 1;
const pageTextbookFromLocaleStorage = 1;

drawTextbook(pageTextbookFromLocaleStorage, chapterTextbookFromLocaleStorage);
