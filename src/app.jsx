import React from 'react';
import { render } from 'react-dom';

import Toolbar from './components/Toolbar.jsx';
import Desktop from './components/Desktop.jsx';
import Fields from './components/Fields.jsx';
import Order from './components/Order.jsx';
import LoadNew from './components/LoadNew.jsx';

import './app.styl';
import './components/Checkboxes.styl';

const CONSTRUCTOR = window.CONSTRUCTOR || {};

const emptyData = {
  backgrounds: [],
  texts: [],
  images: [],
  maps: [],
  qr: [],
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      action: CONSTRUCTOR.action || 'new',
      countSelcted: 0,
      initialBg: CONSTRUCTOR.initialBg || null,
      jsonExportId: CONSTRUCTOR.jsonExportId || false,
      prices: CONSTRUCTOR.prices || [],
      type: CONSTRUCTOR.type || 'blank',
      dimensions: CONSTRUCTOR.dimensions || [100, 100],  // by default 10 by 10 cm
      areaPaddings: CONSTRUCTOR.areaPaddings || [10, 10, 10, 10],
      focusIndex: 0,
      currentPage: 0,
      pages: CONSTRUCTOR.pages || [],
      data: CONSTRUCTOR.data || emptyData,
      countSelected: 0,
    };

    this.toolbarCallback = this.toolbarCallback.bind(this);
    this.fieldsCallback = this.fieldsCallback.bind(this);
    this.desktopCallback = this.desktopCallback.bind(this);
    this.orderCallback = this.orderCallback.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.enableOrder = this.enableOrder.bind(this);
    this.loadnewCallback = this.loadnewCallback.bind(this);

    const data = this.state.data;
    if (typeof data.backgrounds === 'undefined') {
      data.backgrounds = [];
    }

    if (this.state.initialBg !== null) {
      data.backgrounds.push({
        url: this.state.initialBg,
      });
      this.setState({ data: data });
    }
  }

  setFocus() {
    this.setState({ });
  }

  orderCallback(newState) {
    this.setState(newState);
  }

  loadnewCallback(newState) {
    this.setState(newState);
  }

  fieldsCallback(newState) {
    this.setState({ data: newState });
  }

  toolbarCallback(action, event) {
    const data = this.state.data;
    switch (action) {
      case 'insert_text':
        const newText = {
          label: 'Новый текст',
          style: {
            bold: false,
            italic: false,
            underline: false,
          },
          position: {
            top: 20,
            left: 20,
          },
          size: {
            width: 100,
            height: 30,
          },
        };
        data.texts.push(newText);
        this.setState({ data: data , focusIndex: data.texts.length-1 });
        break;

      case 'change_font_family':
        data.texts[this.state.focusIndex].font = event.target.value;
        this.setState( {data : data} );
        break;

      case 'change_font_size':
        data.texts[this.state.focusIndex].fontSize = event.target.value;
        this.setState( {data : data} );
        break;

      case 'set_text_align':
        data.texts[this.state.focusIndex].align = event;
        this.setState({ data: data});
        break;

      case 'toggle_text_style':
        data.texts[this.state.focusIndex]['style'][event] = !data.texts[this.state.focusIndex]['style'][event] ;
        this.setState({ data: data});
        break;


      case 'insert_qr' :
        const newQr = {
          text: 'http://mysite.ru/',
        };
        data.qr.push(newQr);
        this.setState({
          data: data,
          focusIndex: data.qr.length-1,
        });
        break;

      case 'insert_map' :
        const newMap = {
          lat: 0.0,
          lng: 0.0,
        };
        data.maps.push(newMap);
        this.setState({
          data: data,
          focusIndex: data.maps.length-1,
        });
        break;

      case 'align_blocks' :

        const data = this.state.data;
        const align = event.target.value;
        let minLeft = 100000;
        let maxRight = 0;
        let minTop = 100000;
        let maxBottom = 0;

        if (this.state.focusIndex.length) {

          /** LEFT */
          if (align === 'left') {
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              if (minLeft > data.texts[this.state.focusIndex[fi]].position.left) {
                minLeft = data.texts[this.state.focusIndex[fi]].position.left;
              }
            }
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              console.log(data.texts[this.state.focusIndex[fi]].position.left);
              console.log('new', data.texts[this.state.focusIndex[fi]].label, minLeft);
              data.texts[this.state.focusIndex[fi]].position.left = minLeft;
            }
          }

          /** TOP */
          if (align === 'top') {
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              if (minTop > data.texts[this.state.focusIndex[fi]].position.top) {
                minTop = data.texts[this.state.focusIndex[fi]].position.top;
              }
            }
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              console.log(data.texts[this.state.focusIndex[fi]].position.top);
              console.log('new', data.texts[this.state.focusIndex[fi]].label, minTop);
              data.texts[this.state.focusIndex[fi]].position.top = minTop;
            }
          }

          /** RIGHT */
          if (align === 'right') {
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              if (maxRight < (data.texts[this.state.focusIndex[fi]].position.left + data.texts[this.state.focusIndex[fi]].size.width)) {
                maxRight = (data.texts[this.state.focusIndex[fi]].position.left + data.texts[this.state.focusIndex[fi]].size.width);
              }
            }
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              data.texts[this.state.focusIndex[fi]].position.left = maxRight - data.texts[this.state.focusIndex[fi]].size.width;
            }
          }

          /** BOTTOM */
          if (align === 'bottom') {
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              if (maxBottom < (data.texts[this.state.focusIndex[fi]].position.top + data.texts[this.state.focusIndex[fi]].size.height)) {
                maxBottom = (data.texts[this.state.focusIndex[fi]].position.top + data.texts[this.state.focusIndex[fi]].size.height);
              }
            }
            for (let fi = 0, fil = this.state.focusIndex.length; fi < fil; fi++) {
              data.texts[this.state.focusIndex[fi]].position.top = maxBottom - data.texts[this.state.focusIndex[fi]].size.height;
            }
          }


        }
        console.log(data);
        this.setState({ data: data });
        break;

      default:

    }
  }


  desktopCallback(action, index, event) {
    const data = this.state.data;
    switch (action) {
      case 'setFocus':
        const focusIndex = this.state.focusIndex;
        let newFocusIndex;
        if (event.shiftKey) {
          if (typeof focusIndex !== 'object') {
            console.log('second');
            newFocusIndex = [focusIndex, index];
          } else {
            console.log('add focus' , focusIndex);
            focusIndex.push(index);
            newFocusIndex = focusIndex;
            console.log('add focus after' , newFocusIndex);
          }
        } else {
          console.log('nonshift');
          newFocusIndex = index;
        }
        this.setState({ focusIndex : newFocusIndex },function(){
          console.log(this.state);
        });
      break;

      case 'saveSize':
        var args = Array.prototype.slice.call(arguments, 1);
        var size = args[2];
        data.texts[index].size = size;
        this.setState({data:data});
        break;

      case 'savePosition':
        const args = Array.prototype.slice.call(arguments, 1);
        const position = args[2].position;
        data.texts[index].position = position;
        this.setState({ data: data});
        break;

      default:

    }
  }


  enableEdit(){
    this.setState( { action : 'edit' } )
  }

  enableOrder(){
    this.setState( { action : 'order' } )
  }

  render(){
    return (
      <div className={"constructor-app action-" + this.state.action}>
        {
          this.state.action == 'edit' || this.state.action == 'dev' ?
           <Toolbar {...this.state} toolbarCallback={this.toolbarCallback}/>
          :
           <div/>
        }

        <div className="desktopbar">
                <Desktop {...this.state} desktopCallback={this.desktopCallback} />
        </div>



        {
          this.state.action == 'order' ?
           <span className="editBtn" href="#" onClick={this.enableEdit}>Редактировать</span>
          :
           <div/>
        }


        {
          this.state.action === 'edit'  ?
          <div className="sidebar">
            <Fields {...this.state} fieldsCallback={this.fieldsCallback} />

<p>
            <input type="checkbox" id="ivecheck" name="ivecheck" />
            <label htmlFor="ivecheck">Я проверил орфографию и контактные данные</label>
</p>
<p>
            <span className="continueBtn" href="#" onClick={this.enableOrder}>Продолжить</span>
</p>
          </div>
          :
           <div/>
        }


        {
          this.state.action === 'dev' ?
          <div className="sidebar">
            <Fields {...this.state} fieldsCallback={this.fieldsCallback} />
          </div>
          :
           <div/>
        }

        {
          this.state.action === 'new' ?
            <div className="sidebar">
              <LoadNew
                {...this.state}
                enableEdit={this.enableEdit}
                loadnewCallback={this.loadnewCallback}
              />
            </div>
          :
            <div />
        }


        {
          this.state.action === 'order' ?
            <Order {...this.state} orderCallback={this.orderCallback} />
          :
            <div />
        }


{
  this.state.jsonExportId !== false ?
  <input type="hidden" name={this.state.jsonExportId} id={this.state.jsonExportId} value={JSON.stringify(this.state.data)} /> :
  <div></div>
}

      </div>
    );
  }
}


render((
  <App />
), document.getElementById('root'));
