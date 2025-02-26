---
sidebar_position: 1
---

# Introduction


How to install **Wfloat React Native for iOS** into your app.

## 1. Install the Package

### **If using Yarn**
First, create (or update) a `.npmrc` file in the root of your project with the following content:

```
@wfloat:registry=https://registry.wfloat.com/repository/react-native-wfloat
always-auth=true
_auth=<YOUR_AUTH_CREDENTIALS_HERE>
```

Then install the package:

```sh
yarn add @wfloat/react-native-wfloat
```

### **If using npm**
First, create (or update) a `.npmrc` file in the root of your project:

```
@wfloat:registry=https://registry.wfloat.com/repository/react-native-wfloat
//registry.wfloat.com/repository/react-native-wfloat:_auth=<YOUR_AUTH_CREDENTIALS_HERE>
always-auth=true
```

Then install the package:

```sh
npm install @wfloat/react-native-wfloat
```

---

## 2. Setup iOS Dependencies

After installing the package, navigate to the `ios/` directory and install CocoaPods dependencies:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

---

## 3. Import and Use the Library

Modify your **App.tsx** or any component where you want to use the package:

```tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { speech, playWav, loadModel, unloadModel } from '@wfloat/react-native-wfloat';

loadModel("default_male");

const playSound = async () => {
  try {
    const text = "Hello from dubfloat.";
    const newSound = await speech("default_male", text);
    playWav(newSound);
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

---

## 4. Build and Run

Run the project in iOS simulator:

```sh
npx react-native run-ios
```

or open `ios/App.xcworkspace` in Xcode and run the app.

---

### That's it! Your app is now using `@wfloat/react-native-wfloat` for computer generated voice.

If you run into any issues, please [email mitch@wfloat.com](mailto:mitch@wfloat.com).



