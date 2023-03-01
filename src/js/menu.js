const menu = () => {
    const navToggle = document.querySelector('.navbar__toggle');
    const nav = document.querySelector('.navbar__right');

    navToggle.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', true);
        nav.classList.toggle('navbar__right--show');
    });
    nav.addEventListener('mouseleave', () => {
        navToggle.setAttribute('aria-expanded', false);
        nav.classList.remove('navbar__right--show');
    });

    const mql = window.matchMedia('(max-width: 640px)');
    mql.addEventListener('change', (e) => {
        if (!e.matches && nav.classList[1] == 'navbar__right--show') {
            navToggle.setAttribute('aria-expanded', false);
            nav.classList.remove('navbar__right--show');
        }
    });
};

export { menu };
