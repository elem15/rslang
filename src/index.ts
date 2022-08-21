import './scss/styles.scss';
import { signUser } from './modules/auth/services/sign-user';
import { renderPage } from './modules/router/services/router';
import { setNavEvents } from './modules/router/controllers/nav-events';
import { footerViews } from './modules/auth/view/footer';

footerViews();
signUser();
setNavEvents();
renderPage(null, null);
