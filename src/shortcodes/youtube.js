module.exports = {
    youtube: (code) => `<div class="video-wrapper">
            <iframe 
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/${code}"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen>
            </iframe>
        </div>`,
};
