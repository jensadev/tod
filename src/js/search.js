const siteSearch =  () => {
    const search = (e) => {
        const results = window.searchIndex.search(e.target.value, {
            bool: 'OR',
            expand: true
        });

        const resultElement = document.querySelector('#search-results');

        let i = 0;

        resultElement.innerHTML = '';
        if (results && results.length > 0) {
            results.map((result) => {
                if (i > 10) return;
                const { id, title, excerpt } = result.doc;
                const li = document.createElement('li');
                li.classList.add('navbar__dropdown-item');
                resultElement.appendChild(li);

                const a = document.createElement('a');
                a.setAttribute('href', id);
                a.classList.add('stretched-link');
                a.textContent = title;
                li.appendChild(a);

                const p = document.createElement('p');
                p.textContent = excerpt;
                li.appendChild(p);

                i += 1;
            });
        } else {
            resultElement.innerHTML = '<li class="navbar__dropdown-item--disabled">Hittade inga sökresultat, försök igen</li>';
        }
    };

    fetch('/search-index.json').then((response) =>
        response.json().then((rawIndex) => {
            window.searchIndex = elasticlunr.Index.load(rawIndex);
            document
                .querySelector('#search-input')
                .addEventListener('input', search);
        })
    );
};

export { siteSearch };
