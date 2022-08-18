import './App.css';
import OrderInfo from './components/orderInfo'

import { useEffect, useState } from 'react'


function App() {

  let token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ"
  let endpont = "https://eshop-deve.herokuapp.com/api/v2/orders"


  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState({
    id: Math.floor(Math.random() * 1000000).toString(),
    sku: "",
    name: "",
    price: "",
    quantity: "",
  });

  const { sku, name, price, quantity } = products;


  const fetchOrders = async () => {
    const response = await fetch(endpont, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setData(data.orders)
  }


  useEffect(() => {
    fetchOrders()
  }, [])

  const actualizarState = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };


  const showModal = (order) => {
    setOrder(order)
    setModal(true)
  }

  const handleSubmit = (e) => {
    
    if (
      sku.trim() === "" ||
      name.trim() === "" ||
      price.trim() === "" ||
      quantity.trim() === "" 
    ) {
      setError(true);
      return;
    }

    e.preventDefault()
    const id = Math.floor(Math.random() * 1000000).toString()
    let newProduct = [...data, { id: id, items: [products] }]
    setData(newProduct)
    
    clearForm()
  }

  const clearForm = () => {
    setProducts({
      sku: "",
      name: "",
      price: "",
      quantity: "",
    });
    setError(false);
  }

  return (
    <div className='card-content'>
      <h1 className="title mt-5">Tendencys Test</h1>
      <h2 className="subtitle mb-6">Jesus Ochoa Rabelo</h2>

      {
        modal ? (
          <div className={`modal ${modal ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Order info</p>
                <button className="delete" aria-label="close" onClick={() => setModal(false)}></button>
              </header>
              <section className="modal-card-body">
                <OrderInfo order={order} />
              </section>
              <footer className="modal-card-foot">
                <button className="button is-info" onClick={() => setModal(false)}>Back</button>
              </footer>
            </div>
          </div>
        ) : null
      }
      <div className="columns is-multiline">
        <div className="columns">
          <div className="column mt-3 mt-5">
          {error ? (
            <div className="notification is-danger slideInRight">
            <button 
              onClick={() => setError(false)}
            className="delete"></button>
             You must fill all the fields
            </div>
            
          ) : null}
            <div className="field">
              <label className="label">SKU</label>
              <div className="control">
              <input
                className="input"
                  type="text"
                  name="sku"
                  placeholder="SKU"
                  onChange={actualizarState}
                  value={sku}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={actualizarState}
                  value={products.name}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Quantity</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={actualizarState}
                  value={products.quantity}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={actualizarState}
                  value={products.price}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link"
                  onClick={handleSubmit}
                >Save</button>

              </div>
              <div className="control">
                <button 
                  onClick={clearForm}
                  className="button is-link is-light">Clear</button>
              </div>
            </div>

          </div>
        </div>
        <div className="column">

          {
            data.length > 0 ? (
              <div className='card'>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.sort((a, b) => a.id - b.id).map(order => (
                      <tr key={order.id} onClick={(
                        () => {
                          showModal(order)
                        }
                      )}>
                        <td>{order.number}</td>
                        <td>
                          <table className="table-items">
                            <thead>
                              <tr>
                                <th>Sku</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map(item => (
                                <tr key={item.id}>
                                  <td>{item.sku}</td>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>

              </div>
            ) : (
              <div>
                <h1>No Orders</h1>
              </div>
            )}
        </div>
      </div>

    </div>
  )
}

export default App;






