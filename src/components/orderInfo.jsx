import React from 'react'

function OrderInfo(props) {

    return (
        <div>
            <p>Order ID: {props.order.id}</p>
            <p>Order Date: { props.order.dates ? new Date(props.order.dates["createdAt"]).toLocaleDateString() : new Date().toLocaleDateString() }</p>
                    
            <p> {props.order.totals ? "Order Total:" + props.order.totals["total"] : "" }</p>
            <ul>
                {props.order.items.map(item => (
                    <li key={item.id}>
                        <p> Product name: {item.name}</p>
                        <p> Quantity: {item.quantity}</p>
                        <p> Price: {item.price}</p>
                        <p> Discount: {item.discount}</p>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default OrderInfo;