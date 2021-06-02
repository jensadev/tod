// Example color-tokens.js
const meta = require('../_data/meta');

module.exports = [
    {
      /*
       * `name` - Required
       * Any string, will be used for color reference
       */
      name: "primary",
      /*
       * `color` - Required
       * Any valid CSS color value
       */
      color: meta.themeColor,
    //   onColor: "#25282a",
      /*
       * `onColor` - Optional
       * enum: undefined | "[css color value]" | false
       *
       * If undefined, will be generated as relative tone of `color`
       * that meets contrast according to `ratioKey`
       *
       * If a color value provided, will still be checked for contrast
       * and a warning comment added if it doesn't pass
       *
       * Set to `false` to omit generation
       */
      /*
       * `ratioKey` - Optional
       * enum: undefined | "small" (default) | "large"
       *
       * Corresponds to mimimum contrast for either normal text ("small" = 4.5)
       * or large text/user interface components ("large" = 3)
       */
    },
  ];