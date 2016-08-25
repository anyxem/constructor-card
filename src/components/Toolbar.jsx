import React from 'react';

import './Toolbar.styl';

export default class Toolbar extends React.Component {
  render (){
    let isBold = this.props.data.texts[this.props.focusIndex] &&  this.props.data.texts[this.props.focusIndex]['style']? this.props.data.texts[this.props.focusIndex]['style']['bold'] : false
    let isItalic = this.props.data.texts[this.props.focusIndex] && this.props.data.texts[this.props.focusIndex]['style'] ? this.props.data.texts[this.props.focusIndex]['style']['italic'] : false
    let isUnderline = this.props.data.texts[this.props.focusIndex] && this.props.data.texts[this.props.focusIndex]['style'] ? this.props.data.texts[this.props.focusIndex]['style']['underline'] : false
    let fontSize = this.props.data.texts[this.props.focusIndex] && this.props.data.texts[this.props.focusIndex]['fontSize'] ? this.props.data.texts[this.props.focusIndex]['fontSize'] : 14;
    return (
      <div className="toolbar">
        <div className="button insert  insert_text" onClick={this.props.toolbarCallback.bind(this,'insert_text')}><i></i></div>
        <div className="button insert  insert_image" onClick={this.props.toolbarCallback.bind(this,'insert_image')}><i></i></div>
        <div className="button insert  insert_qr" onClick={this.props.toolbarCallback.bind(this,'insert_qr')}><i></i></div>
        <div className="button insert  insert_map" onClick={this.props.toolbarCallback.bind(this,'insert_map')}><i></i></div>
        <span className="divider"></span>
        <select className="font-select" onChange={this.props.toolbarCallback.bind(this,'change_font_family')}>
          <option value="Arial">Arial</option>
          <option value="Tahoma">Tahoma</option>
        </select>
        <select className="fontsize-select" value={fontSize} onChange={this.props.toolbarCallback.bind(this,'change_font_size')}>
          {
            [6, 8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72].map(function(size){
              return (
                <option value={size} key={size}>{size}</option>
              )
            }, this)
          }
        </select>
        <span className="divider"></span>
        <div className={"button bold"+(isBold? ' pressed':'')} value="bold" onClick={this.props.toolbarCallback.bind(this,'toggle_text_style','bold')}><i></i></div>
        <div className={"button italic"+(isItalic? ' pressed':'')} value="italic" onClick={this.props.toolbarCallback.bind(this,'toggle_text_style','italic')}><i></i></div>
        <div className={"button underline"+(isUnderline? ' pressed':'')} value="underline" onClick={this.props.toolbarCallback.bind(this,'toggle_text_style','underline')}><i></i></div>
        <span className="divider"></span>

        <div className="button align_left" value="left" onClick={this.props.toolbarCallback.bind(this,'set_text_align','left')}><i></i></div>
        <div className="button align_center" value="center" onClick={this.props.toolbarCallback.bind(this,'set_text_align','center')}><i></i></div>
        <div className="button align_right" value="right" onClick={this.props.toolbarCallback.bind(this,'set_text_align','right')}><i></i></div>
        <span className="divider"></span>

        <select onChange={this.props.toolbarCallback.bind(this,'align_blocks')}>
          <option value="-1">Выравнивание</option>
          <option value="left">Лево</option>
          <option value="right">Справо</option>
          <option value="top">Верх</option>
          <option value="bottom">Низ</option>
          <option value="center">Центр</option>
          <option value="middle">Середина вертикаль</option>
        </select>

      </div>
    )
  }
}
