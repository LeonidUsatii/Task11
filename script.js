// - По аналогии с тем, как мы обработали событие клика по кнопке add, необходимо
//обработать клик по кнопке "stats" и отображение информации в productsStats. Нас интересует:

// 1. Средняя цена товара;
// 2. Количество всех товаров;
// 3. Цена всех товаров;
// 4. Количество наименований продуктов;

// (Advanced ***)
// - Дописать стилистику приложения по своему вкусу;

// Успехов!

const shoppingCart = {
  items: [],
  totalCost: 0,
  addItem(item) {
    const existingItem = this.items.find(
      (e) =>
        e.productName === item.productName &&
        e.productPrice === item.productPrice
    );
    if (existingItem) {
      existingItem.productQuantity += +item.productQuantity;
    } else {
      this.items.push(item);
    }
    this.updateTotalCost();
  },
  updateTotalCost() {
    this.totalCost = this.items.reduce(
      (acc, item) => acc + item.productQuantity * item.productPrice,
      0
    );
  },
};

console.log(document);

const add = document.getElementById('buttonProductAdd');
const stats = document.getElementById('buttonProductsStats');

const productNameValue = document.getElementById('productName');
const price = document.getElementById('productPrice');
const quantity = document.getElementById('productQuantity');

const productsList = document.getElementById('productsList');
const productsStats = document.getElementById('productsStats');

add.onclick = addHandler;

function addHandler() {
  const item = {
    productName: productNameValue.value,
    productPrice: +price.value,
    productQuantity: +quantity.value,
  };
  shoppingCart.addItem(item);

  productsList.innerHTML = '';

  shoppingCart.items.forEach((e) => {
    const li = document.createElement('li');

    li.textContent = `Product name: ${e.productName}, Product price: ${e.productPrice}, 
        Product quantity: ${e.productQuantity},`;

    productsList.append(li);
  });
  productNameValue.value = '';
  price.value = '';
  quantity.value = '';
}

///////////////////////////////Домашнее задание-------------------//////////////////////////////////////////////////////

stats.onclick = addHandlerStat;

function addHandlerStat() {
  const numberOfGoodsLi = document.createElement('li');
  const sumPriceOfGoodsLi = document.createElement('li');
  const averagePriceOfGoodsLi = document.createElement('li');
  const quantityOfGoodsLi = document.createElement('li');

  productsStats.innerHTML = '';

  numberOfGoodsLi.textContent = `Количество всех товаров: ${numberOfGoods()}`;
  sumPriceOfGoodsLi.textContent = `Стоимость всех товаров: ${sumPriceOfGoods()}`;
  averagePriceOfGoodsLi.textContent = `Средняя стоимость всех товаров: ${
    sumPriceOfGoods() / numberOfGoods()
  }`;
  quantityOfGoodsLi.textContent = `Количество наименований всех товаров: ${shoppingCart.items.length}`;

  // Добавляем элемент внутрь productsList
  productsStats.append(numberOfGoodsLi);
  productsStats.append(sumPriceOfGoodsLi);
  productsStats.append(averagePriceOfGoodsLi);
  productsStats.append(quantityOfGoodsLi);
}

function numberOfGoods() {
  return shoppingCart.items.reduce(
    (acc, item) => acc + item.productQuantity,
    0
  );
}

function sumPriceOfGoods() {
  return shoppingCart.items.reduce((acc, item) => acc + item.productPrice, 0);
}
