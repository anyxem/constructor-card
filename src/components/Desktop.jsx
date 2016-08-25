import React from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';
import QRCode from 'react-qr';
import './Desktop.styl';

export default class Desktop extends React.Component {

  blockBackground(item, index) {
    return (
      <div
        style={{
          position: 'absolute',
          backgroundSize: '100% 100%',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundImage: `url("${item.url}")`,
        }}
      >

      </div>
    );
  }

  blockQr(item, index) {
    let isFocused = false;

    if (typeof this.props.focusIndex !== 'number') {
      if (this.props.focusIndex.indexOf(index) > -1) {
        isFocused = true;
      }
    } else {
      if (this.props.focusIndex === index) {
        isFocused = true;
      }
    }

    return (
      <ResizableAndMovable
        x={20}
        y={20}
        width={100}
        height={100}
        minHeight={100}
        minWidth={100}
        className={`box-qr ${(isFocused ? ' focus' : '')}`}
        key={index}
        onClick={this.props.desktopCallback.bind(this,'setFocus',index)}
      >
        <QRCode text={item.text} />
      </ResizableAndMovable>

    );
  }

  blockTexts(item, index) {
    const style = [];
    style[index] = {
      fontFamily: item.font,
      fontSize: item.fontSize || 14,
      textAlign: item.align,
    };

    if (item.style && item.style.bold === true) {
      style[index].fontWeight = 'bold';
    }

    if (item.style && item.style.italic === true) {
      style[index].fontStyle = 'italic';
    }

    if (item.style && item.style.underline === true) {
      style[index].textDecoration = 'underline';
    }

    let isFocused = false;

    if (typeof this.props.focusIndex !== 'number') {
      if (this.props.focusIndex.indexOf(index) > -1) {
        isFocused = true;
      }
    } else {
      if (this.props.focusIndex === index) {
        isFocused = true;
      }
    }

    return (
      <ResizableAndMovable
        x={item.position ? item.position.left : 20}
        y={item.position ? item.position.top : 20}
        width={item.size ? item.size.width : 100}
        height={item.size ? item.size.height : 30}
        minHeight={30}
        minWidth={100}
        style={style[index]}
        className={`box-text ${(isFocused ? ' focus' : '')}`}
        key={index}
        onClick={this.props.desktopCallback.bind(this,'setFocus',index)}
        onResizeStop={this.props.desktopCallback.bind(this,'saveSize',index)}
        onDragStop={this.props.desktopCallback.bind(this,'savePosition',index)}
      >
        {item.label}
      </ResizableAndMovable>
    );
  }

  render() {

    console.log(this.props.data);
    const desktopDimensions = this.props.dimensions;

    const scale = 600 / this.props.dimensions[0];

    desktopDimensions[0] = this.props.dimensions[0] * scale;
    desktopDimensions[1] = this.props.dimensions[1] * scale;

    return (
      <div
        className={`desktop ${this.props.type} ${this.props.action}`}
        style={{
          width: `${desktopDimensions[0]}px`,
          height: `${desktopDimensions[1]}px`,
          left: '50%',
          marginLeft: `-${desktopDimensions[0] / 2}px`,
        }}
      >
        <i className="side-l"></i>
        <i className="side-r"></i>
        <i className="side-b1"></i>
        <i className="side-b2"></i>

        {this.props.data.backgrounds.map(this.blockBackground, this)}

        <div
          className="workarea"
          style={{
            top: this.props.areaPaddings[0],
            right: this.props.areaPaddings[1],
            bottom: this.props.areaPaddings[2],
            left: this.props.areaPaddings[3],
          }}
        >


        {this.props.data.texts.map(this.blockTexts, this)}

        {this.props.data.qr.map(this.blockQr, this)}

        </div>
      </div>
    );
  }

}

Desktop.propTypes = {
  focusIndex: React.PropTypes.array,
  data: React.PropTypes.array,
  dimensions: React.PropTypes.array,
  type: React.PropTypes.string,
  action: React.PropTypes.string,
  areaPaddings: React.PropTypes.array,
};
