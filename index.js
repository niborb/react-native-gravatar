import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

import md5 from 'blueimp-md5';

const GRAVATAR_URI = 'http://www.gravatar.com/avatar/';

class Gravatar extends React.Component {

    _calculateStyle() {
        const size = {width: this.props.size / 2, height: this.props.size / 2};
        let border = {};

        switch (this.props.mask) {
            case 'circle':
                border = {borderRadius: size.width / 2};
                break;
            case 'rounded':
                border = {borderRadius: size.width / 20};
                break;
            case 'square':
                break;
        }

        return {...size, ...border};
    }

    render() {
        const uri = GRAVATAR_URI + md5(this.props.emailAddress) + '?s=' + this.props.size;
        const style = this._calculateStyle();
        return (
            <View style={[styles.overlay]}>
                <Image source={{uri}} style={[styles.image, style]} />
            </View>
        );
    }
}

Gravatar.propTypes = {
    ...View.PropTypes,
    emailAddress: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired,
    mask: React.PropTypes.oneOf(['circle', 'square', 'rounded'])
};

Gravatar.defaultProps = {
    size: 600,
    mask: 'circle'
};

const styles = StyleSheet.create({
    overlay: {
        overflow: 'hidden',
    },

    image: {
        flex: 1,
    },
});

export default Gravatar;
