# React Native Gravatar component

[![npm version](https://img.shields.io/npm/v/react-native-avatar-gravatar.svg?style=flat-square)](https://www.npmjs.com/package/react-native-avatar-gravatar)
[![npm downloads](https://img.shields.io/npm/dm/react-native-avatar-gravatar.svg?style=flat-square)](https://www.npmjs.com/package/react-native-avatar-gravatar)


React Native Gravatar is a simple component that loads the avatar with an option to mask it with a circle, rounded or square shape.

- [Installation](#installation)


## Installation
`npm install react-native-avatar-gravatar`

## Usage
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

## Properties

### Basic

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| emailAddress | '' | `string` | Email address for gravatar, if not provided uses default image for gravatar |
| size | 60 | `number` | Size for the gravatar image |
| mask | 'circle' | `number` | Mask for the gravatar image. One of - 'circle', 'square', 'rounded' |
| defaultImage | 'retro' | `string` | default image if no email address. One of - '404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', 'blank' |
| resizeMode | 'contain' | `string` | resizeMode for the gravatar image |
