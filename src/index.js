const DEFAULT_PROPS = ['testID'];

export default function babelPluginReactTestID() {
  return {
    name: 'babel-plugin-react-test-id',
    visitor: {
      JSXAttribute(path, {opts: {props = DEFAULT_PROPS}}) {
        const name = path.get('name');
        if (name.isJSXIdentifier() && props.includes(name.node.name)) {
          path.remove();
        }
      },
    },
  };
}
