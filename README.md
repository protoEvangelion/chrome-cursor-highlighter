<p align="center">
  <a href="https://snyk.io/test/github/protoevangelion/liferay-chrome-utils?targetFile=package.json">
    <img src="https://snyk.io/test/github/protoevangelion/liferay-chrome-utils/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/protoevangelion/liferay-chrome-utils?targetFile=package.json" style="max-width:100%;">
  </a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Run app

#### Install Dependencies

```shell
npm install
```

> It is necessary to either run 1 of the 2 build options below

#### 1. To run the build once run:

```shell
npm run build
```

#### 2. To run the build in watch mode run:

```shell
npm run dev
```

## Setup plugin in chrome

1. **Navigate** to chrome://extensions
2. Make sure `developer mode` is selected
3. **Click** "Load unpacked extension"
4. **Select** the `dist` directory in the `src` directory of this repo (That's where webpack outputs bundles)
5. **Optional**: Download the [Dev extensions reload plugin](https://chrome.google.com/webstore/detail/dev-extensions-reload/bbanndmhbmgajamonlgnjnfdbifbnbdj) to automatically reload your extensions so you don't have to manually refresh the extensions page and the page you are working on

## Recommended Plugins to install for your code editor:

### Prettier (formatter primarily for JS files)

> Prettier is an opinionated code formatter. https://prettier.io/playground/

* User Guide: https://github.com/prettier/prettier
* VS Code Editor Plugin: https://github.com/prettier/prettier-vscode
* Vim Plugin: https://github.com/prettier/vim-prettier
* Sublime: https://packagecontrol.io/packages/JsPrettier

### ESlint (linter)

> Eslint is a pluggable linting utility for JavaScript and JSX

* User Guide: https://eslint.org/docs/user-guide/getting-started#configuration
* VS Code Editor Plugin: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Vim Plugin: https://github.com/vim-syntastic/syntastic/tree/master/syntax_checkers/javascript
* Sublime: https://github.com/roadhump/SublimeLinter-eslint

### EditorConfig (formatter)

> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs

* Info: http://editorconfig.org/
* VS Code Editor plugin: https://github.com/editorconfig/editorconfig-vscode
* Vim plugin: https://github.com/editorconfig/editorconfig-vim
* Sublime: https://github.com/sindresorhus/editorconfig-sublime
