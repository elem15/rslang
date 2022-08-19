import './scss/styles.scss';
import { getWords } from './modules/words/services/get-words';
import { signUser } from './modules/auth/services/sign-user';
import { renderPage } from './modules/router/services/router';
import { setNavEvents } from './modules/router/controllers/nav-events';

signUser();
setNavEvents();
renderPage(null, null);
