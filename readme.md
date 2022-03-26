> expo init lc-rn-tweeter-clone --template blank

## React Navigation

### - Fundamentals/Getting started

> npm install @react-navigation/native

> expo install react-native-screens react-native-safe-area-context

### - API Reference/Navigators/Stack

> npm install @react-navigation/stack

> expo install react-native-gesture-handler

### - API Reference/Navigators/Drawer

> npm install @react-navigation/drawer

> expo install react-native-gesture-handler react-native-reanimated

Add in _babel.config.js_

```
module.exports = function (api) {
  api.cache(true);
  return {
    ......
    plugins: ['react-native-reanimated/plugin'],
  };
};
```
restart the server + clean the cache

> expo start --clear



expo start --no-dev --minify