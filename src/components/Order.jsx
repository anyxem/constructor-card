import React from 'react';

import './Order.styl';

export default class Order extends React.Component {

  selectRow(index) {
    this.props.orderCallback( {countSelected:index} );
  }

  submitForm(event) {
    console.log('submit form for add2cart');
  }

  render(){

    let { prices, data } = this.props;
    return(
      <div className="order-box">
        <div className="price-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Цена со скидкой</th>
                <th>Размер скидки</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              prices.map(function(row,index){
                return(
                  <tr
                    key={index}
                    className={"row " + (index == this.props.countSelected?'active':'') }
                    onClick={this.selectRow.bind(this,index)}
                    >
                    <td className="bullet"><span></span></td>
                    <td className="count">{row.count}</td>
                    <td className="price">{row.price}p</td>
                    <td className="salePrice">{row.salePrice}p</td>
                    <td className="saleAmount">{row.saleAmount}%</td>
                    <td className="freeShipping">{row.freeShipping?'Бесплатная доставка':''}</td>
                  </tr>
                )
              },this)
            }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="totalLabel">
                  Итого заказ на сумму:
                </td>
                <td className="totalPrice">
                  {prices[this.props.countSelected].salePrice}р.
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="note">
            * Акция действует при оформлении заказа до 31 июля
          </div>
        </div>

        <div className="cart-total-submit">
          <div className="cart-total">
            <span>Всего:</span> <strong>{prices[this.props.countSelected].salePrice}р</strong>
          </div>
          <form method="POST" className="add2cartForm" action="" onSubmit={this.submitForm}>
            <input type="hidden" name="action" value="BUY" />
            <input type="hidden" name="state" value={JSON.stringify(data)} />
            <input type="hidden" name="qty" value={prices[this.props.countSelected].salePrice} />
            <button type="submit" className="add2cart" href="#">
              Добавить в корзину
            </button>
          </form>
        </div>


      </div>
    )
  }
}
