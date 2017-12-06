import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import d3Cloud from 'd3-cloud';

class TagCloud extends Component {
	static propTypes = {
		children: PropTypes.any,
		style: PropTypes.shape({
			fontFamily: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.string
			]),
			fontStyle: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.string
			]),
			fontWeight: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.number,
				PropTypes.string
			]),
			fontSize: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.number
			]),
			padding: PropTypes.oneOfType([
				PropTypes.func,
				PropTypes.number
			])
		}),
		rotate: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.number
		]),
		spiral: PropTypes.oneOfType([
			PropTypes.oneOf([
				'archimedean',
				'rectangular'
			]),
			PropTypes.func
		]),
		random: PropTypes.func
	};

	static defaultProps = {
		style: {
			fontFamily: 'serif',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: 20,
			padding: 1
		},
		rotate: 0,
		spiral: 'archimedean',
		random: Math.random
	};

	constructor(props) {
		super(props);
		this._width = 0;
		this._height = 0;
		this.state = {
			wrappedChildren: []
		};
		this.text = this.text.bind(this);
		this.fontFamily = this.getStyleValue.bind(this, 'font');
		this.fontSize = this.getStyleValue.bind(this, 'fontSize');
		this.fontWeight = this.getStyleValue.bind(this, 'fontWeight');
		this.fontStyle = this.getStyleValue.bind(this, 'fontStyle');
		this.padding = this.getStyleValue.bind(this, 'padding');
		this.rotate = this.rotate.bind(this);
		this.onResize = this.onResize.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.updateLayout(nextProps, true);
	}

	updateLayout(props) {
		const width = this._width;
		const height = this._height;
		if (!width || !height) {
			return;
		}

		this.calculateLayout(props).then((children) => {
			this.setState({
				wrappedChildren: children
			});
		});
	}

	calculateLayout(props) {
		const {children, spiral, random} = props;
		const width = this._width;
		const height = this._height;

		return new Promise((resolve) => {
			d3Cloud()
				.size([width, height])
				.words(React.Children.map(children, (child) => ({child})))
				.text(this.text)
				.font(this.fontFamily)
				.fontStyle(this.fontStyle)
				.fontWeight(this.fontWeight)
				.fontSize(this.fontSize)
				.rotate(this.rotate)
				.spiral(spiral)
				.padding(this.padding)
				.random(random)
				.on('end', (items) => {
					const newChildren = items.map((item, index) => {
						const x = item.x + (width / 2) + (item.width / -2);
						const y = item.y + (height / 2) + (item.height / -2);
						const style = {
							position: 'absolute',
							...item.child.props.style,
							fontFamily: item.font,
							fontSize: item.size - 2,
							fontWeight: item.weight,
							fontStyle: item.style,
							transform: `translate(${x}px,${y}px) rotate(${item.rotate}deg)`,
							transformOrigin: 'left center'
						};
						if (!style.color && this.props.style.color && (typeof this.props.style.color === 'function')) {
							style.color = this.props.style.color(item.child, index);
						}
						return React.cloneElement(
							item.child,
							{
								...item.child.props,
								key: item.text,
								style: style,
							},
							item.child.props.children
						);
					});
					resolve(newChildren);
				})
				.start();
		});
	}

	getStyleValue(propName, word) {
		const childValue = word.child.props.style ? word.child.props.style[propName] : undefined;
		let value = childValue || this.props.style[propName] || TagCloud.defaultProps.style[propName];
		if (typeof value === 'function') {
			value = value(word.child.props);
		}
		if (propName === 'fontSize') value += 2;
		return value;
	}

	rotate(word) {
		const value = word.child.props.rotate || this.props.rotate || TagCloud.defaultProps.rotate;
		if (typeof value === 'function') {
			return value(word.child.props);
		}
		else {
			return value;
		}
	}

	text(word) {
		let text = word.child.props.text;

		if (!text) {
			const children = word.child.props.children;

			if (Array.isArray(children)) {
				text = children[0];
			} else {
				text = children;
			}
		}

		return text;
	}

	render() {
		const {children, style, rotate, spiral, random, ...props} = this.props;
		const {fontFamily, fontSize, fontWeight, fontStyle, padding, ...otherStyle} = style;
		const {wrappedChildren} = this.state;

		return (
			<Measure bounds={true} onResize={this.onResize}>
				{({ measureRef }) => <div ref={measureRef} {...props} style={otherStyle}>
	        		{wrappedChildren}
	      		</div>}
			</Measure>
		);
	}

	onResize({bounds}) {
		const {width, height} = bounds;
		if ((this._width !== width) || (this._height !== height)) {
			this._width = width;
			this._height = height;
			if (this._resizeTimer) clearTimeout(this._resizeTimer);
			this._resizeTimer = setTimeout(() => {
				this._resizeTimer = undefined;
				this.updateLayout(this.props);
			}, 100);
		}
	}
}

export default TagCloud;
