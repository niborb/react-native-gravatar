import React, { useMemo } from 'react';
import { Image, StyleSheet, View, ViewProps, ImageResizeMode } from 'react-native';
import md5 from 'blueimp-md5';

const GRAVATAR_URI = 'www.gravatar.com/avatar/';

export type GravatarMask = 'circle' | 'square' | 'rounded';

export type GravatarDefaultImage =
  | '404'
  | 'mm'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'blank';

export interface GravatarProps extends ViewProps {
  emailAddress?: string;
  size?: number;
  mask?: GravatarMask;
  defaultImage?: GravatarDefaultImage;
  resizeMode?: ImageResizeMode;
  secure?: boolean;
}

const Gravatar: React.FC<GravatarProps> = ({
  emailAddress = '',
  size = 600,
  mask = 'circle',
  defaultImage = 'retro',
  resizeMode = 'contain',
  secure = true,
  ...viewProps
}) => {
  const imageStyle = useMemo(() => {
    const width = size / 2;
    const height = size / 2;

    switch (mask) {
      case 'circle':
        return { width, height, borderRadius: width / 2 };
      case 'rounded':
        return { width, height, borderRadius: width / 20 };
      case 'square':
      default:
        return { width, height };
    }
  }, [size, mask]);

  const uri = useMemo(() => {
    const protocol = secure ? 'https://' : 'http://';
    return `${protocol}${GRAVATAR_URI}${md5(emailAddress)}?s=${size}&d=${defaultImage}`;
  }, [secure, emailAddress, size, defaultImage]);

  return (
    <View {...viewProps} style={[styles.overlay, viewProps.style]}>
      <Image resizeMode={resizeMode} source={{ uri }} style={[styles.image, imageStyle]} />
    </View>
  );
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
