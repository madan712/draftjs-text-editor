# Rich text editor using DraftJs

This project is a simple example of a rich HTML text area with line numbers and a copy icon. The text area allows users to input and edit code, with line numbers to aid readability, and a copy button for easy sharing.

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
