import '../scss/styles.scss';
import yuri from '../../../images/yuri.jpg';
import img from '../../../images/DSC02301.jpg';
import { renderFooter } from './footer';
import { Router } from '../../../types/router-types';
import { renderPage } from '../../router/services/router';

export const renderMainPage = () => {
    const root = document.getElementById('root');
    while (root.lastChild) root.lastChild.remove();
    const main = document.createElement('section');
    main.className = 'main';
    main.innerHTML = `
    <div class="main-content">
    <div class="container">
      <div class="col-12 text-end">
        <blockquote class="blockquote">“Границы моего языка означают границы моего мира”</blockquote>
        <div class="blockquote-footer">
        <cite title="Source Title "> Людвиг Витгенштейн</cite>
        </div>
      </div>
      <h1 class="h1">lέxi</h1>
      <div class="">
          <cite title="Source Title">— изучай язык...</cite>
          <cite title="Source Title">открывай мир...</cite>
      </div>
      <br>
      <br>
      <p class="about text-end">В приложени <strong>lexi</strong> вы можете изучачить 3600 часто употребляемых английских слов. 
      <br>В этом вам поможет <strong class="textbook-link">Учебник</strong> с ассоциативными карточками. 
      А так же 2 замечательные игры <strong class="audio-challenge">Аудиовызов</strong> и <strong class="sprint-game">Спринт</strong></p>
    </div>
    <div class="container avatars">
    <p class="text-center"><span class="h3">lέxi</span> создали для Вас:</p>
    <br>
    <div class="row justify-content-between">  
      <ul class="main__list nav justify-content-evenly">     
        <li class="main__list-item nav-item">
          <a class="git-link nav-link" href="https://github.com/dab10">
          <figure class="figure denis">
          <div class="avatar"></div>
          <figcaption class="figure-caption text-center">
            <div><strong>Денис Баженов</strong></div>
            <hr>
            <li>учебник</li>
            <li>статистика</li>
          </figcaption>
          </figure>
          </a>
        </li>
        <li class="main__list-item nav-item">
          <a class="git-link nav-link" href="https://github.com/labatsevich">
          <figure class="figure yuri">
            <img src=${yuri} class="figure-img avatar img-fluid" alt="author's photo">
            <figcaption class="figure-caption text-center">
              <div><strong>Юрий Лабацевич</strong></div>
              <hr>
              <li>игра аудиовызов</li>
            </figcaption>            
          </figure>
          </a>
        </li>
        <li class="main__list-item nav-item">
          <a class="git-link nav-link" href="https://github.com/elem15">          
          <figure class="figure mikhail">
          <div class="avatar"></div>
          <figcaption class="figure-caption text-center">
          <div><strong>Михаил Дворкин</strong></div>
            <hr>
            <li>авторизация</li>
            <li>домашняя страница</li>  
            <li>игра спринт</li>  
          </figcaption>
          </figure>
          </a>
        </li>    
      </ul>
    </div>
  </div>
    </div>
    `;
    root.append(main);
    const background = document.createElement('div');
    background.innerHTML = `
        <img class="background" src=${img}> 
    `;
    main.append(background);
    renderFooter();
    const wordsLink = document.querySelector(`.textbook-link`) as HTMLButtonElement;    
    wordsLink.addEventListener('click', () => {
        localStorage.setItem('router', Router.DICTIONARY);
        renderPage(Router.DICTIONARY);
    });
    const game1Link = document.querySelector(`.audio-challenge`) as HTMLButtonElement;
    game1Link.addEventListener('click', () => {
        localStorage.setItem('router', Router.GAME_1);
        renderPage(Router.GAME_1);
    });
    const sprintLink = document.querySelector(`.sprint-game`) as HTMLButtonElement;
    sprintLink.addEventListener('click', () => {
        localStorage.setItem('router', Router.SPRINT);
        renderPage(Router.SPRINT);
    });
    [wordsLink, game1Link, sprintLink].map((element: HTMLElement) => {
        element.style.cursor = 'pointer';
    });
};
