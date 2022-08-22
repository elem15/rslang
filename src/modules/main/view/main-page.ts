import '../scss/styles.scss';
import yuri from '../../../images/yuri.jpg';
import img from '../../../images/DSC02301.jpg';
import logoImage from '../../../images/rs_school_js.svg';
import gitHubImage from '../../../images/git_hub.svg';

export const removeFooter = () => {
    const footer = document.querySelector('footer');
    while (footer.lastChild) footer.lastChild.remove();
};
export const renderFooter = () => {
    const footer = document.querySelector('footer');
    removeFooter();
    footer.innerHTML = `
    <ul class="footer__list nav">
    <li class="footer__list-item logo nav-item">
      <a class="nav-link" href="https://rs.school/js/"><span 
          alt="rs-school logo" class="logo_image">
        </span></a>
    </li>
    <li class="footer__list-item nav-item">
      <a class="git-link nav-link" href="https://github.com/dab10"><span class="git-hub_svg"></span>Bazhenov Denis</a>
    </li>
    <li class="footer__list-item nav-item">
      <a class="git-link nav-link" href="https://github.com/labatsevich"><span class="git-hub_svg"></span>Yuri Labatsevich</a>
    </li>
    <li class="footer__list-item nav-item">
      <a class="git-link nav-link" href="https://github.com/elem15"><span class="git-hub_svg"></span>Mikhail Dvorkin</a>
    </li>
    <li class="footer__list-item">
      Year 2022
    </li>
  </ul>
  `;
    const RSSchoolLogo = document.querySelector('.logo_image') as HTMLElement;
    RSSchoolLogo.innerHTML = logoImage;
    const linksToGit = document.querySelectorAll('.git-hub_svg') as NodeListOf<HTMLElement>;
    linksToGit.forEach((link) => {
        link.insertAdjacentHTML('afterbegin', gitHubImage);
    });
};

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
      <p class="about text-end">В приложени <strong>lexi</strong> вы можете изучачить 3600 часто употребляемых английских слов. <br>В этом вам поможет <strong>Учебник</strong> с ассициативными карточками. А так же 2 замечательные игры <strong>Аудиовызов</strong> и <strong>Спринт</strong></p>
    </div>
    <div class="container avatars">
    <div class="row justify-content-between">  
      <ul class="main__list nav justify-content-evenly">     
        <li class="main__list-item nav-item">
          <a class="git-link nav-link" href="https://github.com/dab10">
          <figure class="figure denis">
          <div class="avatar"></div>
          <figcaption class="figure-caption text-center">Денис Баженов</figcaption>
          </figure>
          </a>
        </li>
        <li class="main__list-item nav-item">
          <a class="git-link nav-link" href="https://github.com/labatsevich">
          <figure class="figure yuri">
            <img src=${yuri} class="figure-img avatar img-fluid" alt="...">
            <figcaption class="figure-caption text-center">Юрий Лабацевич</figcaption>
          </figure>
          </a>
        </li>
        <li class="main__list-item nav-item">
          <a class="git-link nav-link" href="https://github.com/elem15">          
          <figure class="figure mikhail">
          <div class="avatar"></div>
          <figcaption class="figure-caption text-center">Михаил Дворкин</figcaption>
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
};
