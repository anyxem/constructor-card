import React from 'react'

import './LoadNew.styl'
import './Radio.styl'

export default class LoadNew extends React.Component {

  render(){
    return (
      <div className="begin-sidebar">
       <a className="btn btnUpload">Загрузить дизайн</a>
       <p className="uplTip">
       Загрузите готовый макет в CorelDraw, PDF или JPEG формате
       </p>
       <p>
       <a href="#" className="req">Требования к макетам</a>
       </p>

<p>
       <input type="radio" id="layoutStatusOrder" name="layoutStatus" value="order"/>
      <label htmlFor="layoutStatusOrder">
      Я проверил всю информацию и подтверждаю, что мой макет готов к печати
      </label>
</p>
<p>
       <input type="radio" id="layoutStatusEdit" name="layoutStatus" value="edit"/>
      <label htmlFor="layoutStatusEdit">
      Я хочу начать редактирование макета в конструкторе
      </label>
</p>
       <a onClick={this.props.enableEdit.bind(this)} className="continueBtn">Продолжить</a>

      </div>
    )
  }

}
