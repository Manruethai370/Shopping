import { useState } from 'react';
const productsData = [
  { id: 1, name: 'โคมไฟตั้งโต๊ะ', price: 300, image: 'โคมไฟตั้งโต๊ะ.jpg' },
  { id: 2, name: 'พัดลมจิ๋ว', price: 450, image: 'พัดลมจิ๋ว.jpg' },
  { id: 3, name: 'กิ๊ฟ', price: 150, image: 'กิ๊ฟ.jpg' },
  { id: 4, name: 'สร้อยคอ', price: 150, image: 'สร้อยคอ.jpg' },
  { id: 5, name: 'แหวน', price: 200, image: 'แหวน.jpg' },
  { id: 6, name: 'สร้อยข้อมือ', price: 150, image: 'สร้อยข้อมือ.jpg' },
  { id: 7, name: 'เสื้อคลอป', price: 199, image: 'เสื้อคลอป.jpg' },
  { id: 8, name: 'แว่นตาแฟชั่น', price: 179, image: 'แว่นตาแฟชั่น.jpg' },
  { id: 9, name: 'หมวกแฟชั่น', price: 179, image: 'หมวกแฟชั่น.jpg' },
  { id: 10, name: 'ที่คาดผม', price: 179, image: 'ที่คาดผม.jpg' },
];
function App() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
 
  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
 
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
 
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
 
  const handleApplyDiscount = (coupon) => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
    }
  };
 
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWithShipping = total > 0 ? total + 100 - total * discount : 0;
 
  return (
    <div className="App max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Gift Shop</h1>
 
     
      {/* ปรับการจัดเรียงสินค้าเป็นแนวนอน แถวละ 5 ชิ้น */}
      <div className="product-list grid grid-cols-5 gap-8 p-8 justify-center max-w-full">
  {productsData.map(product => (
    <div key={product.id} className="product-card border p-6 bg-gray-800 text-white flex flex-col items-center">
      <img src={product.image} alt={product.name} className="mb-2 w-36 h-36" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-lg">Price: {product.price}฿</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-3/4"
      >
        Add to Cart
      </button>
    </div>
  ))}
</div>
 
 
      <h2 className="text-xl font-bold text-center mt-12">Shopping Cart</h2>
      <div className="cart p-4">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex justify-between border p-2">
              <span>{item.name}</span>
              <span>Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border w-12 ml-2"
                />
              </span>
              <span>{item.price * item.quantity}฿</span>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-2 py-1 ml-2">
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="mt-4">
          <p>Total: {total}฿</p>
          <p>Shipping: 100฿</p>
          <p>Discount: {discount * 100}%</p>
          <p className="font-bold">Total with Shipping: {totalWithShipping}฿</p>
 
          <input
            type="text"
            placeholder="Coupon Code"
            onBlur={(e) => handleApplyDiscount(e.target.value)}
            className="border p-2 mt-2"
          />
          {discountError && <p className="text-red-500">{discountError}</p>}
        </div>
      </div>
    </div>
   
  );
}
 
export default App;
