# Image-processing-api

> This project is part of the Udacity Backend Javascript Nanodegree

### Build with

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [Jasmine](https://jasmine.github.io/)
- [Sharp](https://sharp.pixelplumbing.com/)

## Api Reference

**Endpoint for image**

```sh
  Get /images?filename={filename}&width={width}&height={height}
 ```
**Qurey parameters**
```sh
Get /images?filename=nature&width=250&height=250
```

1. **filename**: Must be string and it has name of photo
2. **width**: Must be number and it has width of photo
3. **height**: Must be number and it has height of photo

## Getting Started

> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these instructuins.

### Scripts

**_Prettier_**

```sh
  npm run prettier
```

**_Lint_**

```sh
  npm run lint
```

**_Tests_**

```sh
  npm run jasmine
```

**_Start server_**

```sh
  npm run start
```

**_Start server & tests_**

```sh
  npm run test
```

### Run Locally

1. **_Clone the repository_**

```sh
$ git clone [https://github.com/AbdelrahmanTolba/Image-processing-api.git]
```

2. **_Navigate to repository directory_**

```sh
$ cd Image_Processing
```

3. **_Install dependencies_**

```sh
$ npm install
```

4. **_Running on development mode_**

```sh
$ npm run start
```

5. **_Running Tests_**

```sh
$ npm run test
```
