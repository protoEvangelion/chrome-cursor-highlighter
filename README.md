<p align="center">
  <a href="https://snyk.io/test/github/protoevangelion/liferay-chrome-utils?targetFile=package.json">
    <img src="https://snyk.io/test/github/protoevangelion/liferay-chrome-utils/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/protoevangelion/liferay-chrome-utils?targetFile=package.json" style="max-width:100%;">
  </a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

# Liferay Dark Admin Theme (For Liferay v6.2)

> This theme is currently in Alpha

* [Liferay Dark Admin Theme (For Liferay v6.2)](#liferay-dark-admin-theme-for-liferay-v62) - [Prerequisites](#prerequisites) - [Building Theme Manually](#building-theme-manually) - [Install Dependencies](#install-dependencies) - [1. To run the build once run:](#1-to-run-the-build-once-run) - [2. To run the build in watch mode run:](#2-to-run-the-build-in-watch-mode-run) - [Setup in Browser Plugin](#setup-in-browser-plugin) - [Recommended Plugins to install for your code editor:](#recommended-plugins-to-install-for-your-code-editor) - [Prettier (formatter primarily for JS files)](#prettier-formatter-primarily-for-js-files) - [ESlint (linter)](#eslint-linter) - [EditorConfig (formatter)](#editorconfig-formatter)

* Note: this theme uses [Tampermonkey](https://tampermonkey.net/) because it requires a small amount of JS to detect if the user is in admin mode
  * It then will load the theme only when the user is on an admin page
  * Until the theme is uploaded to Tampermonkey's repository, you will need to load this manually (instructions in the link above)
  * If you want to change the urls this will load on, modify the `@match` rules in `src/tamperMonkeyTemplate.js`

## Prerequisites

* [Nodejs](https://nodejs.org/)
* Npm (comes with the download of Nodejs)
* A terminal

## Building Theme Manually

#### Install Dependencies

* From your terminal run:

```shell
npm i
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

## Setup in Browser Plugin

* You will need to download the Tampermonkey extension for whichever browser you are using
* After you run the build, it will be output to the `dist/tamperMonkeyTemplate.js`
* The final step is to copy that output and paste it into a new Tampermonkey script

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
