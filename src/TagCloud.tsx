/* tslint:disable:jsx-no-multiline-js */
import d3Cloud from "d3-cloud";
import * as PropTypes from "prop-types";
import * as React from "react";
import Measure from "react-measure";

interface ITagCloudProps {
  children: any;
  style: {
    fontFamily?: string | ((word: any, index: number) => string);
    fontStyle?: string | ((word: any, index: number) => string);
    fontWeight?:
      | number
      | string
      | ((word: any, index: number) => number | string);
    fontSize?: number | ((word: any, index: number) => number);
    color?: string | ((word: any, index: number) => string);
    padding?: number | ((word: any, index: number) => number);
  };
  rotate?: number | ((word: any, index: number) => number);
  spiral?:
    | "archimedean"
    | "rectangular"
    | ((size: number) => (t: number) => [number, number]);
  random?: () => number;
}

interface ITagCloudState {
  width: number;
  height: number;
  children: any;
  wrappedChildren: any;
}

class TagCloud extends React.Component<ITagCloudProps, ITagCloudState> {
  public static propTypes = {
    children: PropTypes.any,
    random: PropTypes.func,
    rotate: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    spiral: PropTypes.oneOfType([
      PropTypes.oneOf(["archimedean", "rectangular"]),
      PropTypes.func,
    ]),
    style: PropTypes.shape({
      color: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      fontFamily: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      fontSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
      fontStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      fontWeight: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string,
      ]),
      padding: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    }),
  };

  public static defaultProps = {
    random: Math.random,
    rotate: 0,
    spiral: "archimedean",
    style: {
      fontFamily: "serif",
      fontSize: 20,
      fontStyle: "normal",
      fontWeight: "normal",
      padding: 1,
    },
  };
  public state = {
    children: undefined,
    height: 0,
    width: 0,
    wrappedChildren: [],
  };

  private mounted = false;
  private resizeTimer?: number = undefined;

  private fontFamily = this.getStyleValue.bind(this, "fontFamily");
  private fontSize = this.getStyleValue.bind(this, "fontSize");
  private fontWeight = this.getStyleValue.bind(this, "fontWeight");
  private fontStyle = this.getStyleValue.bind(this, "fontStyle");
  private padding = this.getStyleValue.bind(this, "padding");

  public componentDidMount() {
    this.mounted = true;
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public calculateLayout(
    props: ITagCloudProps,
    state: ITagCloudState,
  ): Promise<any> {
    const { children, spiral, random, style } = props;
    const { width, height } = state;
    const spiralAny: any = spiral;

    return new Promise((resolve) => {
      const words: any = React.Children.map(children, (child) => ({ child }));
      let res = d3Cloud()
        .size([width, height])
        .words(words)
        .text(this.text)
        .font(this.fontFamily)
        .fontStyle(this.fontStyle)
        .fontWeight(this.fontWeight)
        .fontSize(this.fontSize)
        .rotate(this.rotate)
        .padding(this.padding);
      if (spiralAny) {
        res = res.spiral(spiralAny);
      }
      if (random) {
        res = res.random(random);
      }
      res
        .on("end", (items: any) => {
          const newChildren = items.map((item: any, index: number) => {
            let x = item.x;
            x += item.x0;
            x += width / 2;
            let y = item.y;
            y += item.y0;
            y += height / 2;
            const transform = `translate(${x}px,${y}px) rotate(${
              item.rotate
            }deg)`;
            const newStyle = {
              position: "absolute",
              ...item.child.props.style,
              MozTransform: transform,
              MsTransform: transform,
              OTransform: transform,
              WebkitTransform: transform,
              fontFamily: item.font,
              fontSize: item.size,
              fontStyle: item.style,
              fontWeight: item.weight,
              textAlign: "center",
              transform,
              transformOrigin: "center bottom",
              whiteSpace: "nowrap",
              width: item.width,
            };
            if (
              !newStyle.color &&
              style.color &&
              typeof style.color === "function"
            ) {
              newStyle.color = style.color(item.child, index);
            }
            return React.cloneElement(
              item.child,
              {
                ...item.child.props,
                key: item.text,
                style: newStyle,
              },
              item.child.props.children,
            );
          });
          resolve(newChildren);
        })
        .start();
    });
  }

  public getStyleValue(
    propName:
      | "fontFamily"
      | "fontSize"
      | "fontWeight"
      | "fontStyle"
      | "padding",
    word: any,
  ) {
    const childValue = word.child.props.style
      ? word.child.props.style[propName]
      : undefined;
    let value =
      childValue ||
      this.props.style[propName] ||
      TagCloud.defaultProps.style[propName];
    if (typeof value === "function") {
      value = value(word.child.props);
    }
    if (propName === "fontSize") {
      value += 2;
    }
    return value;
  }

  public rotate = (word: any) => {
    const value =
      word.child.props.rotate ||
      this.props.rotate ||
      TagCloud.defaultProps.rotate;
    if (typeof value === "function") {
      return value(word.child.props);
    } else {
      return value;
    }
  }

  public text = (word: any) => {
    let text = word.child.props.text;

    if (!text) {
      const children = word.child.props.children;
      text = Array.isArray(children) ? children[0] : children;
    }

    return text;
  }

  public render() {
    const {
      style,
      children, // eslint-disable-line
      rotate, // eslint-disable-line
      spiral, // eslint-disable-line
      random, // eslint-disable-line
      ...props
    } = this.props;
    const {
      fontFamily, // eslint-disable-line
      fontSize, // eslint-disable-line
      fontWeight, // eslint-disable-line
      fontStyle, // eslint-disable-line
      color, // eslint-disable-line
      padding, // eslint-disable-line
      ...otherStyle
    } = style;
    const { wrappedChildren } = this.state;

    return (
      <Measure bounds={true} onResize={this.onResize}>
        {({ measureRef }) => (
          <div ref={measureRef} {...props} style={otherStyle}>
            {wrappedChildren}
          </div>
        )}
      </Measure>
    );
  }

  public onResize = (contentRect: any) => {
    const { width, height } = contentRect.bounds;
    if (this.state.width !== width || this.state.height !== height) {
      // Handle the initial size observer immediately
      if (!this.state.width && !this.state.height) {
        this.setState({
          height,
          width,
        });
        return;
      }

      // Handle resizes with a debounce timeout of 100ms
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.resizeTimer = undefined;
        if (this.mounted) {
          this.setState({
            children: undefined,
            height,
            width,
          });
        }
      }, 100);
    }
  }

  public componentDidUpdate() {
    const { width, height } = this.state;
    const { children } = this.props;

    if (width && height && children !== this.state.children) {
      this.calculateLayout(this.props, this.state).then((wrappedChildren) => {
        if (!this.mounted) {
          return;
        }
        this.setState({
          children,
          wrappedChildren,
        });
      });
    }
  }
}

export default TagCloud;
