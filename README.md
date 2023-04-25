# A simple react rich html textarea

This project is a simple example of a rich HTML text area with line numbers and a copy icon. The text area allows users to input and edit code, with line numbers to aid readability, and a copy button for easy sharing.

Please see the [`DEMO`](https://stackutils.com/#/codeformatter) here

## Install

### npm

```
npm install --save rich-html-textarea
```

### yarn

```
yarn add rich-html-textarea
```

## Example

```javascript
import RichTextarea from "rich-html-textarea";

const App = () => {
  const [text, setText] = useState("");

  const onChange = (input) => {
    setText(input);
  };

  return (
    <div>
      <RichTextarea value={text} onChange={onChange} />
    </div>
  );
};

export default App;
```

## API

| Prop                            | Type          | Required | Default | Description                                                                                               |
| :------------------------------ | :------------ | :------: | :-----: | :-------------------------------------------------------------------------------------------------------- |
| [`value`](#value)               | String        |    ✓     |         | Text value of the textarea                                                                                |
| [`onChange`](#onChange)         | Function      |    ✓     |         | This function is used to capture the change in textarea. It can be used to update the state in your file. |
| [`showLine`](#showLine)         | Boolean       |          |  true   | Show line numbers in the textarea                                                                         |
| [`showCopyIcon`](#showCopyIcon) | Boolean       |          |  true   | show copy icon on the top right corner of textarea                                                        |
| [`css`](#css)                   | CSSProperties |          |         | Control width/height and other css properties                                                             |
| [`name`](#name)                 | String        |          |         | Specifies a name for a text area                                                                          |
| [`placeholder`](#placeholder)   | String        |          |         | Specifies a short hint that describes the expected value of a text area                                   |
| [`disabled`](#disabled)         | Boolean       |          |  false  | Specifies that a text area should be disabled                                                             |
| [`readOnly`](#readOnly)         | Boolean       |          |  false  | Specifies that a text area should be read-only                                                            |
| [`maxLength`](#maxLength)       | Boolean       |          |  false  | Specifies the maximum number of characters allowed in the text area                                       |
| [`autoFocus`](#autoFocus)       | Boolean       |          |  false  | Specifies that a text area should automatically get focus when the page loads                             |

                                                                                |
