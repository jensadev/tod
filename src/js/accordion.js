/* https://inclusive-components.design/collapsible-sections/ */
const accordion = () => {
    if ('content' in document.createElement('template')) {
        const tmpl = document.createElement('template');

        tmpl.innerHTML = `
        <h3>
          <button aria-expanded="false">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
              <rect class="vert" height="8" width="2" y="1" x="4"/>
              <rect height="2" width="8" y="4" x="1"/>
            </svg>
          </button>
        </h3>
        <div class="content" hidden>
          <slot></slot>
        </div>
        <style>
          h3 {
            margin: 0;
          }
          h3 button {
            all: inherit;
            justify-content: space-between;
            display: flex;
            box-sizing: border-box;
            width: 100%;
            cursor: pointer;
            text-transform: uppercase;
            line-height: 1;
          }
  
          h3 button:focus svg {
            outline: 2px solid;
          }
  
          button svg {
            height: 1em;
          }
  
          [aria-expanded="true"] .vert {
            display: none;
          }
  
          [aria-expanded] rect {
            fill: currentColor;
          }

        </style>
      `;

        if (document.head.attachShadow) {
            class AccordionSection extends HTMLElement {
                constructor() {
                    super();

                    // Make the host element a region
                    this.setAttribute('role', 'region');

                    // Create a `shadowRoot` and populate from template
                    this.attachShadow({ mode: 'open' });
                    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));

                    // Assign the toggle button
                    this.btn = this.shadowRoot.querySelector('h3 button');

                    // Get the first element in Light DOM
                    const oldHeading = this.querySelector(':first-child');
                    // and cast its heading level (which should, but may not, exist)
                    let level = parseInt(oldHeading.tagName.substr(1));
                    // Then take its `id` (may be null)
                    let id = oldHeading.id;

                    // Get the Shadow DOM <h2>
                    this.heading = this.shadowRoot.querySelector('h3');

                    // If `id` exists, apply it
                    if (id) {
                        this.heading.id = id;
                    }

                    // If there is no level, there is no heading.
                    // Add a warning.
                    if (!level) {
                        console.warn(
                            'The first element inside each <accordion-section> should be a heading of an appropriate level.'
                        );
                    }

                    // If the level is a real integer but not 2
                    // set `aria-level` accordingly
                    if (level && level !== 3) {
                        this.heading.setAttribute('aria-level', level);
                    }

                    // Add the Light DOM heading label to the innerHTML of the toggle button
                    // and remove the now unwanted Light DOM heading
                    this.btn.innerHTML =
                        oldHeading.textContent + this.btn.innerHTML;
                    oldHeading.parentNode.removeChild(oldHeading);

                    // The main state switching function
                    this.switchState = () => {
                        let expanded =
                            this.getAttribute('open') === 'true' || false;

                        // Toggle `aria-expanded`
                        this.btn.setAttribute('aria-expanded', expanded);
                        // Toggle the `.content` element's visibility
                        this.shadowRoot.querySelector('.content').hidden =
                            !expanded;
                    };

                    this.btn.onclick = () => {
                        // Change the component's `open` attribute value on click
                        let open =
                            this.getAttribute('open') === 'true' || false;
                        this.setAttribute('open', open ? 'false' : 'true');

                        // Update the hash if the collapsible section's
                        // heading has an `id` and we are opening, not closing
                        if (this.heading.id && !open) {
                            history.pushState(
                                null,
                                null,
                                '#' + this.heading.id
                            );
                        }
                    };
                }

                connectedCallback() {
                    if (window.location.hash.substr(1) === this.heading.id) {
                        this.setAttribute('open', 'true');
                        this.btn.focus();
                    }
                }

                // Identify just the `open` attribute as an observed attribute
                static get observedAttributes() {
                    return ['open'];
                }

                // When `open` changes value, execute switchState()
                attributeChangedCallback(name) {
                    if (name === 'open') {
                        this.switchState();
                    }
                }
            }

            // Add our new custom element to the window for use
            window.customElements.define('accordion-section', AccordionSection);

            // Define the expand/collapse all template
            const buttons = document.createElement('div');
            buttons.innerHTML = `
              <ul class="accordion__controls" aria-label="section controls">
                <li><button id="expand" class="button">visa alla</button></li>
                <li><button id="collapse" class="button">dölj alla</button></li>
              </ul>
              `;

            // Get the first `toggle-section` on the page
            // and all toggle sections as a node list
            const first = document.querySelector('#accordion');
            const all = document.querySelectorAll('accordion-section');

            // Insert the button controls before the first <toggle-section>
            first.parentNode.insertBefore(buttons, first);

            // Place the click on the parent <ul>...
            buttons.addEventListener('click', (e) => {
                // ...then determine which button was the target
                let expand = e.target.id === 'expand' ? true : false;

                // Iterate over the toggle sections to switch
                // each one's state uniformly
                Array.prototype.forEach.call(all, (t) => {
                    t.setAttribute('open', expand);
                });
            });
        }
    }
};

export { accordion };
