# reactNative_Trip
This project was bootstrapped with Create React Native App.
Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://reactnavigation.org/docs/hello-react-navigation/)

# Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://docs.npmjs.com/about-semantic-versioning) for up-to-date information about package version compatibility.

# Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

**`npm start`**

Runs your app in development mode.

Open it in the [Expo app](https://expo.dev/) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

    `npm start --reset-cache
    # or
    yarn start --reset-cache`

**`npm test`**

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

**`npm run ios`**

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

**`npm run android`**

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://reactnavigation.org/docs/) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

Using Android Studio's **`adb`**

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

Using Genymotion's **`adb`**

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/.`
2. Add the Geny`motion tools directory to your path (instructions for Mac, Linux, and Windows).
3. Make sure that you can run adb from your terminal.

**`npm run eject`**

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

# Troubleshooting

**Networking**

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

    exp://192.168.0.1:19000

Try opening Safari or Chrome on your phone and loading

    http://192.168.0.1:19000

and

    http://192.168.0.1:19001

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App](https://github.com/expo/create-react-native-app) repository with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

**QR Code does not scan**

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/expo/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.