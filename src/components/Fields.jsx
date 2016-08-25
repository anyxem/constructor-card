import React from 'react';
import './Fields.styl';

export default class Fields extends React.Component {

  handleChange(index, event) {
    const value = event.target.value;
    const data = this.props.data;
    data.texts[index]['label'] = value;
    this.props.fieldsCallback(data);
  }


  handleDelete(index, event) {
    const data = this.props.data;
    data.texts.splice(index, 1);
    this.props.fieldsCallback(data);
  }

  handleChangeQR(index, event) {
    const value = event.target.value;
    const data = this.props.data;
    data.qr[index]['text'] = value;
    this.props.fieldsCallback(data);
  }


  handleDeleteQR(index, event) {
    const data = this.props.data;
    data.qr.splice(index, 1);
    this.props.fieldsCallback(data);
  }

  render() {
    return (
      <div className="fields">
        {
          this.props.data.texts.map(function(item,index){
            return (
              <div className="field" key={index}>
                <textarea value={item.label} onChange={this.handleChange.bind(this,index)}></textarea>

                <button onClick={this.handleDelete.bind(this,index)}>&times;</button>
              </div>
            )
          },this)
        }

        {
          this.props.data.qr.map(function(item,index){
            return (
              <div className="field" key={index}>
                <input type="text"  value={item.text} onChange={this.handleChangeQR.bind(this,index)} />
                <button onClick={this.handleDeleteQR.bind(this,index)}>&times;</button>
              </div>
            )
          },this)
        }

      </div>
    )
  }
}

Fields.propTypes = {
  data: React.PropTypes.array,
  fieldsCallback: React.PropTypes.func,
};
