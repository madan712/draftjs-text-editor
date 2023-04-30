# A simple rich text editor using DraftJs

This simple rich text editor is built using [`Draft.js`](https://draftjs.org/) and offers basic controls such as bold, italic, and underline. It provides users with a familiar and intuitive editing experience, allowing them to easily apply text formatting and styling to their content. While it may not have all the advanced features of more complex rich text editors, this editor is a great starting point for developers looking to create a custom text editor with basic formatting capabilities.

Please see the [`DEMO`](https://stackutils.com/#/text2pdf) here

## Install

### npm

```
npm install --save draftjs-text-editor
```

### yarn

```
yarn add draftjs-text-editor
```

## Example

```javascript
import DraftJsEditor from "draftjs-text-editor";

const App = () => {
  const [html, setHtml] = useState("");

  const onChange = (html) => {
    setHtml(html);
  };

  return (
    <div>
      <DraftJsEditor onChange={onChange} />
    </div>
  );
};

export default App;
```

## API

| Prop                    | Type     | Required | Default | Description                                                   |
| :---------------------- | :------- | :------: | :-----: | :------------------------------------------------------------ |
| [`onChange`](#onChange) | Function |    ✓     |         | This function is used to capture the html code of text editor |

Note: This package is still under development and we welcome contributions from the community. If you would like to contribute, please visit our [`Git repository`](https://github.com/madan712/draftjs-text-editor) and send us a pull request. We appreciate all contributions and thank you for your support!
