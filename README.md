 <h1 align='center' style=''>use-file-select</h1>
 <h3 align='center'> Light and customizable hooks for handling file selection in React projects</h2>

## About

The use-file-select package's purpose is removing overhead of developing file selection mechanisms.

* Light and easy to use.
* Simple rule system for enforcing you'r app's requirements.
* Selected files return with extra, enriched data.
* Declarative interface and types.

## Getting Started

Install the package in you're project's main directory
<br/>
```
# With NPM
npm install use-file-select

# With Yarn
yarn add use-file-select
```

### Quick Example

```jsx
import { useFileSelect } from 'use-file-select';

function ExampleComponent() {
  const { files, select } = useFileSelect()

  return(
    <div>
      <button onClick={select}>Select File</button>
      <p>{files[0]?.file.name}</p>
    </div>
  )
}
```

## Docs

### useFileInput

Once mounted, this hook creates an HTML input element on the DOM
with the type of "file" and returns a ref to this element.
Its purpose is not to be visible, but to expose the functionality of the file input.

|Prop Name|Type| Default| Description
|------|------|----|---
|accept|'audio', 'video', 'image', 'text' | | the file types the file input should accept|
|formats|string[]| |an array of formats fitting the accept prop if specified|
|onChange*|(Event) => any| |A required callback for files change post selection|
|multiple|boolean| false |When true the file input allows the user to select more than one file|

#### Return
```ts
type = MutableRefObject<HTMLInputElement>
```
React ref to an HTML input element of type file.

#### Example

```jsx
import { useFileInput } from 'use-file-select';

function ExampleComponent() {
  const fileInputRef = useFileInput({
    onChange: (e) => {
      const fileList = e.target.files
      console.log(fileList[0].name)
    }
  )}

  return(
    <button onClick={() => fileInputRef.current.click()}>
      Select Files
    </button>
  )
}
```

<br/>

### useFileSelect

This hook adds abstraction and some logic to the useFileInput hook.
It provides a simple interface to enforce requirements on file inputs.

|Prop Name|Type| Default| Description
|------|------|----|---
|accept|'audio', 'video', 'image', 'text' | | the file types the file input should accept|
|rules|Rule[]| | A rule is some validation that will run once the file is finished processing, if the file doesn't pass the validation, the rule's key will return in the error array of the file. A rule can be one of the ready made rules or your own custom rule.
|objectURL|boolean|false| If true, files will return with an objectURL representation of themselves also.
|onDone|(UFSFile[]) => Promise< any >| | Is an asynchronous callback that will run last, just before the isLoading parameter is set to false, the callbacks parameter is an array of useFileSelect files.
|multiple|boolean| false |When true the file input allows the user to select more than one file|

#### Return
```ts
interface {
  files: UFSFile[]
  isLoading: boolean
  select: () => void
  clear: () => void
}
```

**files** : An array of useFileSelect files, another option to access the files besides the onDone callback
**isLoading**: Indicates if the processing, rules, and the onDone callback have finished
**select**: Fires a mouse click event on the file input ref
**clear**: Clears the values on the file input, sets the files array to empty array, set the isLoading to false

#### Example using all props
```jsx
import { useFileSelect } from 'use-file-select';

function Example() {
  const { files, isLoading, select, clear } = useFileSelect({
    accept: 'image',
    objectURL: true,
    multiple: true,
    onDone: (files) => console.log(files),
    rules: [
      { key: 'formats', formats: ['png', 'jpeg'] },
      { key: 'my-custom-rule', validator: async () => {
          let isValid = true
          // ... do something
          return isValid
        }
    ]
  })

// ...

return (
  <>
     <button onClick={select}>
       Select Files
     </button>
  
     <br/>
  
     {!isLoading && <img src={files[0].objectURL}/>}
 </>
)
}
```

**In the example above the following steps will happen:**

* Upon clicking the rendered button the "select" method will be triggered and the user's File Explorer / Finder
will be opened.

* The "isLoading" variable will be set to true.

> The "select" method is the same "select" method exposed by an input of type "file" mounted on the DOM

> The user will only see files with the formats that are specified in the formats rule provided to the hook

<br>

**Right after the user's selections are confirmed:**

* The files are enriched with a decoded array buffer and a objectURL.

> An Audio Buffer will be added too in case of audio/video files)

* Rules are enforced. A failure to pass a certain rule's validation will cause the rule's key to be pushed to an error array on the file's object.

> Hence, the decision on how to handle errors is reserved to the developer

* Next, the "onDone" callback provided to the hook will run, executing the developer's side-effects.

* Finally, the "isLoading" variable will be set to false and the objectURL(preview) of the first file will be rendered as requested.

<br/>

<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- CONTACT -->
## Contact

Omer Ziger: [LinkedIn](https://www.linkedin.com/in/omerziger/) [Gmail](omerziger97@gmail.com)

Github: [omerziger/use-file-select](https://github.com/omerziger/use-file-select)

NPM: [use-file-select](https://www.npmjs.com/package/use-file-select)


