"use client";

import { useEffect, useState } from "react";
import styles from "./workspace.module.css";

export default function Page() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    // Fetch products on load
    const fetchProducts = async () => {
      const response = await fetch("/api/users/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const buttonAction = async (action, slug, initialQuantity) => {
    const updated = [...products];
    const index = updated.findIndex((p) => p.slug === slug);

    updated[index].quantity =
      action === "plus" ? initialQuantity + 1 : initialQuantity - 1;

    setProducts(updated);

    setLoadingAction(true);
    await fetch("/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    setLoadingAction(false);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await fetch("/api/users/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productForm),
    });
    setAlert("Product added successfully!");
    setProductForm({});
    fetchProducts();
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      setLoading(true);
      const res = await fetch(
        `/api/users/search?query=${value}&category=${category}`,
      );
      const data = await res.json();
      setDropdown(data.products);
      setLoading(false);
    } else {
      setDropdown([]);
    }
  };

  return (
    <div className={styles.background}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.icon}>📦</span>
          <span>Stock Management</span>
        </div>

        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Workspace</a>
          <a href="#">Logout</a>
        </nav>
      </header>

      {/* WORKSPACE */}
      <div className={styles.workspaceContainer}>
        <h2>Search Product</h2>

        {alert && <p className={styles.alert}>{alert}</p>}

        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Search product..."
            onChange={onSearch}
            className={styles.input}
          />

          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="grocery">Grocery</option>
          </select>
        </div>

        {loading && <p className={styles.loading}>Loading...</p>}

        {dropdown.map((item) => (
          <div key={item.slug} className={styles.dropdownItem}>
            <div className={styles.colName}>{item.slug}</div>

            <div className={styles.colName}>{item.quantity}</div>

            <div className={styles.colMeta}>₹{item.price}</div>

            <div className={styles.actions}>
              <button
                disabled={loadingAction}
                onClick={() => buttonAction("minus", item.slug, item.quantity)}
              >
                −
              </button>
              <button
                disabled={loadingAction}
                onClick={() => buttonAction("plus", item.slug, item.quantity)}
              >
                +
              </button>
            </div>
          </div>
        ))}

        {/* ADD PRODUCT */}
        <h2>Add Product</h2>

        <form onSubmit={addProduct} className={styles.form}>
          <input
            name="slug"
            placeholder="Product slug"
            value={productForm.slug || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={productForm.quantity || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={productForm.price || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <button className={styles.signupBtn}>Add Product</button>
        </form>

        {/* DISPLAY CURRENT STOCK */}
        <h2 className={styles.tableTitle}>Display Current Stock</h2>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug}>
                  <td>{product.slug}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
