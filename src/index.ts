import './scss/styles.scss';
import { signUser } from './modules/auth/services/sign-user';
import { renderPage } from './modules/router/services/router';
import { setNavEvents } from './modules/router/controllers/nav-events';
// import favicon from './intelligence.png';

// const faviconTag = document.querySelector('link');
// faviconTag.href = favicon;
signUser();
setNavEvents();
renderPage(null, null);
