let listCartProducts = [];

const getAllProducts = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    const products = data.splice(0, 20);
    return products;
  } catch (error) {
    return null;
  }
};

const printPricesProducts = () => {
  let totalPrice = 0;
  let totalHTML = document.querySelector("#total-price");
  listCartProducts.forEach((product) => {
    return (totalPrice += product.price * product.quantity);
  });
  totalHTML.innerHTML = `TOTAL: $${totalPrice}`;
};
const deleteCartProduct = (id) => {
  listCartProducts = listCartProducts.filter((product) => product.id !== id);
  let cartListHTML = document.querySelector("#cart-list-products");
  let totalHTML = document.querySelector("#total-price");
  cartListHTML.innerHTML = "";

  listCartProducts.length !== 0 &&
    listCartProducts.forEach((prduct) => printCart(prduct));

  if (listCartProducts.length === 0) {
    cartListHTML.innerHTML = ` <div class="text-empty-cart">
                                    <p>Carrito vacío.</p>
                                  </div>`;

    totalHTML.innerHTML = `TOTAL: $ 0`;
  }
};
const addProduct = (id) => {
  let cartListHTML = document.querySelector("#cart-list-products");
  cartListHTML.innerHTML = "";
  listCartProducts = listCartProducts.map((product) =>
    product.id === id ? { ...product, quantity: product.quantity + 1 } : product
  );
  listCartProducts.forEach((product) => printCart(product));
};

const removeProduct = (id, quantity) => {
  if (quantity <= 1) {
    return deleteCartProduct(id);
  }
  let cartListHTML = document.querySelector("#cart-list-products");
  cartListHTML.innerHTML = "";
  listCartProducts = listCartProducts.map((product) =>
    product.id === id ? { ...product, quantity: product.quantity - 1 } : product
  );
  listCartProducts.forEach((product) => printCart(product));
};

const printCart = (product) => {
  let cartListHTML = document.querySelector("#cart-list-products");
  cartListHTML.innerHTML += `<div class="cart-product">
                        <div class="product-information">
                            <figure class="container-img">
                                <img src="${product.image}" alt=""
                                    class="product-information-img">
                            </figure>
                            <p>${product.name}</p>
                            <figure class="container-img">
                                <img src="./assets/3669361_delete_ic_icon.svg" alt="delete-icon" class="delete-icon" onclick="deleteCartProduct('${
                                  product.id
                                }')">
                            </figure>
                        </div>
                        <div class="product-quantity">
                            <figure class="container-img">
                                <img src="./assets/3671808_minus_outline_icon.svg" alt="delete-icon" class="delete-icon" onclick="removeProduct('${
                                  product.id
                                }', '${product.quantity}')">
                            </figure>
                            <figure class="container-img">
                                <img src="./assets/3017947_add_extra_more_outline_plus_icon.svg" alt="delete-icon"
                                    class="delete-icon" onclick="addProduct('${
                                      product.id
                                    }')">
                            </figure>
                            <p>${product.quantity} x $${product.price} = $${
    product.quantity * product.price
  }</p> 
                        </div>
                    </div>`;
  printPricesProducts();
};
const addToCart = (productId, productName, productImage, productPrice) => {
  productToCart = {
    id: productId,
    name: productName,
    image: productImage,
    price: productPrice,
    quantity: 1,
  };

  if (listCartProducts.length <= 0) {
    listCartProducts = [...listCartProducts, productToCart];
    let cartListHTML = document.querySelector("#cart-list-products");
    cartListHTML.innerHTML = "";
    return listCartProducts.map((product) => printCart(product));
  }

  let existProduct = listCartProducts.some(
    (product) => product.id === productId
  );

  if (!existProduct) {
    listCartProducts = [...listCartProducts, productToCart];
    let cartListHTML = document.querySelector("#cart-list-products");
    cartListHTML.innerHTML = "";
    return listCartProducts.map((product) => printCart(product));
  }

  let cartListHTML = document.querySelector("#cart-list-products");
  cartListHTML.innerHTML = "";

  listCartProducts = listCartProducts.map((product) => {
    return product.id === productId
      ? { ...product, quantity: product.quantity + 1 }
      : product;
  });
  listCartProducts.forEach((product) => printCart(product));
};

const printProduct = (product) => {
  let listProductsHTML = document.querySelector("#main");
  listProductsHTML.innerHTML += `<div class="product">
                                    <figure class="container-img">
                                      <img src="${product.category.image}" alt="${product.title}" class="img-product">
                                    </figure>
                                    <h5 class="product-title">${product.title}</h5>
                                    <p class="product-price">$ ${product.price}</p>
                                    <button class="button-add" onclick="addToCart('${product.id}', '${product.title}', '${product.category.image}', '${product.price}')">Agregar</button>
                                  </div>
                                `;
};

const toggleListCart = () => {
  let cartList = document.querySelector("#cart-list");
  cartList.classList.toggle("hidden-listCart");
};

const main = async () => {
  const products = await getAllProducts();
  products !== null
    ? products.map((product) => printProduct(product))
    : alert("hubo un error");
  printPricesProducts();
};

main();