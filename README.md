# Base64Codec

A simple base-64 encoded and decoder. This is an effective offline alternative to the online tools like https://www.base64decode.org/ as your data never leave your local machine.

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To run the app as a desktop application using Electron, you can run `electron main.js`. Make sure you have built your app before you try to run the electron. Also, make sure the `base` href is _blank_ on `index.html`. This can be achieved by running `npm run build`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Packaging Application

I'm using Electron Forge to create an executable (or, a distributable) file. You can find more information [here](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging).

1. To import the project into Forge, run `npx electron-forge import`
2. The above step also updates the `package.json` with convenient scripts.
    <table>
      <tr><td>package.json</td></tr>
      <tr><td>

   ```json
   ...
   "scripts": {
   "start": "electron-forge start",
   "package": "electron-forge package",
   "make": "electron-forge make"
   },
   ...

   ```

      </td></tr>
   </table>

3. Issuing `npm run make` on a Windows machine create an `.exe` file that you can use to run and share your application.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
