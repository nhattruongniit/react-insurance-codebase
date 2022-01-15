# Insurance

The web apps built with React Typescript, redux and Material Ui.

## Stack

### FE

- axios interceptor
- react typescript
- react i18next
- redux tookit

### UI Component

- material UI

### Tools

- prettier
- husky

## Git replacing LF with CRLF

```
$ git config --global core.autocrlf false
$ git rm --cached -r .
$ git reset --hard
```

## Config VSCode

### Install extensions

- eslint
- tslint
- prettier
- editorConfig for VSCode

### Edit settings.json file

Windows: Go to File -> Preferences -> Settings or `Ctrl + ,`

Adding in the settings.json file & create .vscode/settings.json in root project

```
{
  "files.associations": {
    "*.jsx": "javascriptreact"
  },
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Installation

```bash
# install node version
Please install at least v15.2.0 version node

# install npm version
Please install at least v7.0.10 version node
```

```bash
# install app's depndencie
$ npm install
```

## Scripts

```bash
# install typescript
$ npm install -g typescript
```

```bash
# dev server with PORT 3002 at http://localhost:3002/
$ npm start

# build for production with minify
$ npm run build

# run `format` to format all code based on your prettier and linting configuration.
$ npm run format

# env
$ npm start: .env.development.local, .env.local, .env.development, .env

$ npm run build: .env.production.local, .env.local, .env.production, .env
```

# Convention code

## Component's file name should be in Pascal Case.

Component names should be like ProductCard and not like productCard, product-card, etc. This way when we see a filename in Pascal Case, it is immediately clear that the file is a react component.

### Components which can be used in other project or reuse.

Components can be keep in `components/` folder.

https://bradfrost.com/blog/post/atomic-web-design/

## Hooks

When we want to share logic between two javascript functions, we will extract it to a third function. Both components and hooks are functions, so this work for them too.

A custom Hook is a javascript function whose name starts with `"use"` and that may call other hook. For example, `useTranslation` below is a custom hook:

```bash
# useTranslation.tsx
import { useTranslation } from 'react-i18next';
const useTranslate = () => {
  const { t: translate, i18n } = useTranslation();
  return { translate, i18n };
};
export default useTranslate;
```

## Helpers

Share an function logic for our app. It name should be in lowercase. For example, `sleep` below is a function.

```bash
# sleep.ts

export const sleep = time => new Promise(res => setTimeout(res, time));
```
