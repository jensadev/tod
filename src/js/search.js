const siteSearch = () => {
    const search = (e) => {
        const results = window.searchIndex.search(e.target.value, {
            bool: 'OR',
            expand: true,
        });

        const resultElement = document.querySelector('#search-results');

        let i = 0;

        resultElement.innerHTML = '';
        if (results && results.length > 0) {
            resultElement.classList.remove('d-none');
            results.map((result) => {
                if (i > 10) return;
                const { id, title, excerpt } = result.doc;
                const li = document.createElement('li');
                li.classList.add('dropdown__menu-item');
                resultElement.appendChild(li);

                const a = document.createElement('a');
                a.setAttribute('href', id);
                a.textContent = title;
                li.appendChild(a);

                const p = document.createElement('p');
                p.textContent = excerpt;
                li.appendChild(p);

                i += 1;
            });
        } else if (results && results.length < 1) {
            resultElement.classList.add('d-none');
        } else {
            resultElement.classList.remove('d-none');
            resultElement.innerHTML =
                '<li class="dropdown__menu-item--disabled">Hittade inga sökresultat, försök igen</li>';
        }
    };

    fetch('/search-index.json').then((response) =>
        response.json().then((rawIndex) => {
            // eslint-disable-next-line no-undef
            window.searchIndex = elasticlunr.Index.load(rawIndex);
            document
                .querySelector('#search-input')
                .addEventListener('input', search);
        })
    );
};

export { siteSearch };
