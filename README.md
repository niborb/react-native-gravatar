## React Native Gravatar component

[![npm version](https://img.shields.io/npm/v/react-native-avatar-gravatar.svg?style=flat-square)](https://www.npmjs.com/package/react-native-avatar-gravatar)
[![npm downloads](https://img.shields.io/npm/dm/react-native-avatar-gravatar.svg?style=flat-square)](https://www.npmjs.com/package/react-native-avatar-gravatar)


React Native Gravatar is a simple component that loads the avatar with an option to mask it with a circle, rounded or square shape.

- [Installation](#installation)


### Installation
`npm install react-native-avatar-gravatar`

### Usage
```javascript
import Gravatar from 'react-native-avatar-gravatar';

class Application extends Component {  
  render () {
    return (
      <Gravatar emailAddress="robin02+npm@gmail.com" size={300} mask="circle" />
    )
  }
})
```
