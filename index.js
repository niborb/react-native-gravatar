import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import PropTypes from "prop-types";

import md5 from 'blueimp-md5';

const GRAVATAR_URI = 'www.gravatar.com/avatar/';

/**
 *@description Display gravatar for an email address
 */
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
        const protocol = this.props.secure ? 'https://' : 'http://';

        const uri = protocol + GRAVATAR_URI + md5(this.props.emailAddress) + '?s=' + this.props.size + '&d=' + this.props.defaultImage;
        const style = this._calculateStyle();
        return (
            <View style={[styles.overlay]}>
                <Image resizeMode={this.props.resizeMode} source={{uri}} style={[styles.image, style]} />
            </View>
        );
    }
}

Gravatar.propTypes = {
    /**
     * @param {string} emailAddress - email address for the gravatar
     * @param {number} size - size of the gravatar
     * @param {('circle'|'square'|'rounded' )} mask - mask type for the gravatar
     * @param {('404'|'mm'|'identicon'|'monsterid'|'wavatar'|'retro'|'robohash'|'blank')} defaultImage - deafult image type if no image is supplied
     * @param {('cover'|'contain'|'stretch'|'repeat'|'center')} resizeMode - resizeMode for the gravatar image.
     */
    ...View.PropTypes,
    emailAddress: PropTypes.string,
    size: PropTypes.number,
    mask: PropTypes.oneOf(['circle', 'square', 'rounded']),
    defaultImage: PropTypes.oneOf(['404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', 'blank']),
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center'])
};

Gravatar.defaultProps = {
    emailAddress: '',
    size: 600,
    mask: 'circle',
    secure: true,
    defaultImage: 'retro',
    resizeMode: 'contain'
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
