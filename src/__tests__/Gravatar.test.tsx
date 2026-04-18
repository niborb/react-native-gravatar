import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';
import md5 from 'blueimp-md5';

import Gravatar from '..';

describe('Gravatar', () => {
  const getImage = (ui: React.ReactElement) => {
    const { UNSAFE_getByType } = render(ui);
    return UNSAFE_getByType(Image);
  };

  const imageStyle = (ui: React.ReactElement) => {
    const image = getImage(ui);
    return StyleSheet.flatten(image.props.style);
  };

  it('builds an https URL by default with md5-hashed email and default query params', () => {
    const email = 'test@example.com';
    const image = getImage(<Gravatar emailAddress={email} />);
    expect(image.props.source.uri).toBe(
      `https://www.gravatar.com/avatar/${md5(email)}?s=600&d=retro`,
    );
  });

  it('falls back to http when secure is false', () => {
    const image = getImage(<Gravatar emailAddress="a@b.com" secure={false} />);
    expect(image.props.source.uri.startsWith('http://')).toBe(true);
  });

  it('forwards size and defaultImage to the query string', () => {
    const image = getImage(<Gravatar emailAddress="a@b.com" size={200} defaultImage="identicon" />);
    expect(image.props.source.uri).toContain('?s=200&d=identicon');
  });

  it('applies circle mask geometry (width/2 border radius)', () => {
    const style = imageStyle(<Gravatar size={600} mask="circle" />);
    expect(style.width).toBe(300);
    expect(style.height).toBe(300);
    expect(style.borderRadius).toBe(150);
  });

  it('applies rounded mask geometry (width/20 border radius)', () => {
    const style = imageStyle(<Gravatar size={600} mask="rounded" />);
    expect(style.width).toBe(300);
    expect(style.height).toBe(300);
    expect(style.borderRadius).toBe(15);
  });

  it('applies square mask geometry with no border radius', () => {
    const style = imageStyle(<Gravatar size={600} mask="square" />);
    expect(style.width).toBe(300);
    expect(style.height).toBe(300);
    expect(style.borderRadius).toBeUndefined();
  });

  it('applies default props when rendered without any', () => {
    const image = getImage(<Gravatar />);
    const style = StyleSheet.flatten(image.props.style);
    expect(image.props.source.uri).toBe(
      `https://www.gravatar.com/avatar/${md5('')}?s=600&d=retro`,
    );
    expect(image.props.resizeMode).toBe('contain');
    expect(style.width).toBe(300);
    expect(style.borderRadius).toBe(150);
  });

  it('uses blueimp-md5 to hash the email address', () => {
    const email = 'claude@anthropic.com';
    const image = getImage(<Gravatar emailAddress={email} />);
    expect(image.props.source.uri).toContain(md5(email));
  });
});
