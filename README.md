# pug-plugin-panorama-layout-includes

> Pug plugin used provide cleaner and pug-compatible syntax for &lt;include&gt; tag in Panorama layout files.

## Install

```bash
npm i pug-plugin-panorama-layout-includes
# or
yarn add pug-plugin-panorama-layout-includes
```

## Usage

```javascript
const pug = require('pug');
const pugPluginPanoramaLayoutIncludes = require('pug-plugin-panorama-layout-includes');

const source = `
root
  includes
    style(src='./style.css')
    script(src='./script.js')
`;

pug.render(source, { plugins: [pugPluginPanoramaLayoutIncludes] })
// <root>
//   <styles>
//     <include src="./style.css"></include>
//   </styles>
//   <scripts>
//     <include src="./script.js"></include>
//   </scripts>
//   <Panel class="content"></Panel>
// </root>
```
