import productsJSON from '../../data/products.json'

let products = productsJSON
// let products = [] //Sustituir [] por la carga del archivo ubicado en data/products.js (importar el archivo y asignar
let id = 0

exports.getProducts = () => {
  return products
}

exports.addProduct = (productData) => {
  const product = {
        id,// asignar id de manera incremental e irrepetible
        nombre: productData.nombre,
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias

    }
    products.push(product)
    id++
    return product
}

exports.filterProductsByCategory = (category) => {
  return products.filter((product) => {
    return product.categorias.includes(category)
  })
}

exports.filterProductsByCategorySortByPrice = (category, order) => {
  const filteredProducts = products.filter((product) => {
    return product.categorias.includes(category);
  });

  if (order === "desc") {
    return filteredProducts.sort((a, b) => {
      return b.precio - a.precio;
    });
  } else {
    return filteredProducts.sort((a, b) => {
      return a.precio - b.precio;
    });
  }

}

exports.updateProductDetails = (productId, newData) => {
  products.forEach((product) => {
    if (product.id === productId) {
      product.nombre = newData.nombre
      product.precio = newData.precio
      product.cantidad = newData.cantidad
      product.categorias = newData.categorias
      return
    }
  })
  return products.filter((product) => {
    return product.id === productId
  })
}

exports.removeProduct = (id) => {
  const removedProduct = products.filter((product) => {
    return product.id === id
  })

  products = products.filter((product) => {
    return product.id !== id
  })

  return removedProduct
}
