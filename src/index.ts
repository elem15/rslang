import './scss/styles.scss';
import { getWords } from './modules/auth/services/get-words';
import { signUser } from './modules/auth/services/sign-user';

signUser();
getWords();
