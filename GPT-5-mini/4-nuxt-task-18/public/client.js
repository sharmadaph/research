async function loadOrders(){
  const res = await fetch('/api/orders')
  const orders = await res.json()
  const ul = document.getElementById('orders-list')
  ul.innerHTML = ''
  orders.forEach(o=>{
    const li = document.createElement('li')
    li.innerHTML = `Order ${o.id} - ${o.status} - <a href="/order/${o.id}">View</a>`
    ul.appendChild(li)
  })
}
loadOrders()
