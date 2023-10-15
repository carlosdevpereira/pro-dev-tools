<div align="center">

![Pro.Dev.Tools Icon](/public/icons/app-icon@128.png)

# Pro.Dev.Tools

A 'swiss-knife' for the modern developer needs. This app provides a useful set of features for the everyday life of an engineer.

</div>

---

<small>

> This app is being developed and tested on/for MacOs. Windows and Linux support is expected to be added in release <code>v1.0.0</code>. Please be patient.

</small>

---

<h6>🚀 Packed features:</h6>

- Color picker <sub>(Pick any color from screen, wherever it is)</sub>
- Generate unique secure passwords <sub>(⚠️ Sharing passwords between multiple services should be avoided. Generate unique passwords and save them to your favorite password manager ✌️)</sub>

<h6>📆 Feature pipeline:</h6>

- Parse and generate JWT's <sub>(Your tokens and secrets shouldn't have to leave your PC)</sub>
- Base64 Encoder/Decoder <sub>(Pick any color from screen, wherever it is)</sub>
- Compute MD5/SHA-1/SHA-256/SHA-512 hashes of your files <sub>(Want to check if a specific file is known to have viruses? Just drag it in and paste the calculated hash on Virus Total for example.)</sub>
- Regex tester
- Language Utilities
  - HTML
    - Beautify
  - CSS / Less / Sass / Scss / Stylus
    - Beautify
  - Javascript
    - Beautify
  - JSON
    - Beautify
    - Minify
    - Convert to YAML
  - YAML
    - Convert to JSON
  - Go
    - Beautify
  - Ruby
    - Beautify

<h6>📆 Todo:</h6>

- Configure Github workflows to generate proper releases and changelogs
- Configure Github workflows to publish app builds as release artifacts

---

#### Type Support For `.vue` Imports in TS

<small>

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

</small>

---

<div align="center" style="margin-top: 3rem;">

  <a href="https://www.flaticon.com/free-icons/hard-hat" title="hard hat icons by Smashicons - Flaticon">

  ![Pro.Dev.Tools Icon](./public/icons/app-icon@64.png)

  </a>

</div>
