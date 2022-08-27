<div align="center">

<image src="https://user-images.githubusercontent.com/73285295/187028854-fc4d75d8-d010-414a-b173-5280774eb167.png" height="142"/>
  <h1 style="border-bottom: unset;" align="center">use-file-select</h1>
  <h2 align="center">
    Light and customizable interface for handling file selection in React
  </h2>
</div>


## About

The useFileSelect custom hook purpose is removing overhead of developing file selection mechanisms.

* Light and easy to use.
* Simple rule system for enforcing you'r app's requirements.
* Selected files return with extra, enriched data.
* Declerative interface and types.

## Getting Started

Install the package in you're project's main directory
<br/>
```
# With NPM
npm install use-file-select

# With Yarn
yarn add use-file-select
```

## Example

```jsx
import { useFileSelect } from 'use-file-select';

function Example() {
  const { files, isLoading, select, clear } = useFileSelect({
    accept: 'image',
    preview: true,
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
  
     {!isLoading && <img src={files[0].preview}/>}
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

* The files are enriched with a decoded array buffer and a preview.

> An Audio Buffer will be added too in case of audio/video files)

* Rules are enforced. A failiure to pass a certain rule's validation will cause the rule's key to be pushed to an error array on the file's object.

> Hence, the desicion on how to handle errors is reserved to the developer

* Next, the "onDone" callback provided to the hook will run, executing the developer's side-effects.

* Finnaly, the "isLoading" variable will be set to false and the preview of the first file will be rendered as requested.

## Docs

For you're convinience I made this package fully typed and declerative as much as I can :)
<br/>
Detailed documentation is coming soon...

<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- CONTACT -->
## Contact

Omer Ziger - [LinkedIn](https://www.linkedin.com/in/omerziger/) - [Gmail](omerziger97@gmail.com)

Project Link: [omerziger/use-file-select](https://github.com/omerziger/use-file-select)
