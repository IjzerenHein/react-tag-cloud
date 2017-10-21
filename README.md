# react-tag-cloud ☁️
Create beautiful tag/word clouds using React. Uses the wonderful [d3-cloud](https://github.com/jasondavies/d3-cloud) under the hood.

![react-tag-cloud-image](./react-tag-cloud.gif)


[View live demo here](https://cdn.rawgit.com/IjzerenHein/react-tag-cloud/d706091d/examples/tagCloud/build/index.html)


## Installation

	npm install react-tag-cloud
	or
	yarn add react-tag-cloud

## Usage

```js
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';

class MyCloud extends Component {
  render() {
    return (
      <TagCloud 
        className='tag-cloud'
        style={{
          fontFamily: 'sans-serif',
          fontSize: 30,
          fontWeight: 'bold'
          fontStyle: 'italic'
          color: () => randomColor(),
          padding: 5
        }}>
        <div style={{fontSize: 50}}>react</div>
        <div style={{color: 'green'}}>tag</div>
        <div rotate={90}>cloud</div>
        ...
      </TagCloud>
    );
  }
}
```

## Documentation

`<TagCloud>` props:

name | description | type | default
-----|-------------|------|---------
style.fontSize | Font size needed for calculating layout | Function/Number | `20`
style.fontFamily | Font family needed for calculating layout | Function/String | `serif`
style.fontWeight | Font weight needed for calculating layout | Function/Number | `normal`
style.fontStyle | Font style needed for calculating layout | Function/String | `normal`
style.padding | Padding between tags (px) | Function/Number | `1`
style.color | Color to be used by tags | Function/String | `(none)`
rotate | Rotation in degrees | Function/Number | `0`
spiral | Spiral | Function/String | `archimedean`
random | Randomizer function | Function | `Math.random`

Any component can be used as a child component. `TagCloud` scans the child componentsfor the following props for its layout calculation:

name | description | type | default
-----|-------------|------|---------
style.fontSize | Font size needed for calculating layout | Function/Number | `20`
style.fontFamily | Font family needed for calculating layout | Function/String | `serif`
style.fontWeight | Font weight needed for calculating layout | Function/Number | `normal`
style.fontStyle | Font style needed for calculating layout | Function/String | `normal`
style.padding | Padding between tags (px) | Function/Number | `1`
style.color | Color to be used by tag | Function/String | `(none)`
rotate | Rotation in degrees | Function/Number | `0`



## Resources

- [https://github.com/jasondavies/d3-cloud](https://github.com/jasondavies/d3-cloud)
- [https://en.wikipedia.org/wiki/Tag_cloud](https://en.wikipedia.org/wiki/Tag_cloud)

## License

[MIT](./LICENSE.txt)
