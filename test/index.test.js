import * as babel from 'babel-core';
import babelPluginReactTestID from '../src';

describe('babelPluginReactTestID()', () => {
  it('removes a testID prop', () => {
    expect(transform(`
      const foo = <Foo testID="bar" />
    `)).toMatchSnapshot();

    expect(transform(`
      const foo = <Foo testID={someValue} />
    `)).toMatchSnapshot();
  });

  it('preserves other props', () => {
    expect(transform(`
      const foo = <Foo test="bar" />
    `)).toMatchSnapshot();
  });

  describe('props', () => {
    it('removes custom prop names', () => {
      expect(transform(`
        const foo = <Foo data-test-id="bar" />
      `, {props: ['data-test-id']})).toMatchSnapshot();
    });

    it('does not remove testID if custom names are provided', () => {
      expect(transform(`
        const foo = <Foo testID="bar" />
      `, {props: ['data-test-id']})).toMatchSnapshot();
    });
  });
});

function transform(code, options) {
  return babel.transform(code, {
    babelrc: false,
    plugins: [
      [babelPluginReactTestID, options],
    ],
    parserOpts: {
      plugins: ['jsx'],
    },
  }).code.trim();
}
