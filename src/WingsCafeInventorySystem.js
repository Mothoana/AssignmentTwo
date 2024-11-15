import React, { useState } from 'react';

// App Component renamed to WingsCafeInventorySystem
const WingsCafeInventorySystem = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      <h1>Wings Cafe Inventory System</h1>
      {isLoggedIn ? (
        <ProductManagement />
      ) : (
        <UserLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

// UserLogin Component
const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin();
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div id="user-management">
      <h2>User Login</h2>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button onClick={handleLogin}>Login</button>
      
    </div>
  );
};

// ProductManagement Component
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.id]: e.target.value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.description && newProduct.category && newProduct.price && newProduct.quantity) {
      setProducts([...products, newProduct]);
      setNewProduct({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
      });
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div id="product-management">
      <h2>Product Management</h2>
      <form id="product-form" onSubmit={addProduct}>
        <input
          type="text"
          id="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          id="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          id="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
          step="0.01"
        />
        <input
          type="number"
          id="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>
      <ProductList products={products} />
    </div>
  );
};

// ProductList Component
const ProductList = ({ products }) => {
  return (
    <ul id="product-list">
      {products.length > 0 ? (
        products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.description} (Category: {product.category}, Price: M{product.price}, Quantity: {product.quantity})
          </li>
        ))
      ) : (
        <li>No products added yet.</li>
      )}
    </ul>
  );
};

// Export the WingsCafeInventorySystem component
export default WingsCafeInventorySystem;
