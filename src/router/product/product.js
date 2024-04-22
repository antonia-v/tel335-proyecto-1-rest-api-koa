
import productActions from '../../actions/product/product'

exports.getAllProducts = (ctx) => {
    ctx.body = productActions.getProducts()
    return ctx
}

exports.addNewProduct = (ctx) => {

    const {nombre, precio, cantidad, categorias} = ctx.request.body
    const bodyParams = [nombre, precio, cantidad, categorias]

    if (bodyParams.includes(undefined)){
        ctx.body = {message: "Missing params"}
        ctx.status = 400
    }
    else {
        ctx.body = productActions.addProduct(ctx.request.body);
    }

    return ctx;
}

exports.getProductsByCategory = (ctx) => {
    const filteredProducts = productActions.filterProductsByCategory(
        ctx.params.category
    );
    if (filteredProducts.length === 0) {
        ctx.body = { message: `No products found for "${ctx.params.category}"` };
        ctx.status = 404;
    } else {
        ctx.body = filteredProducts;
    }
    return ctx
}

exports.getProductsByCategorySortedByPrice = (ctx) => {
    if (ctx.params.ord !== 'asc' && ctx.params.ord !== 'desc') {
        ctx.body = {message: "Order is neither asc nor desc"}
        ctx.status = 400
        return ctx
    }

    const filteredProducts = productActions.filterProductsByCategorySortByPrice(
        ctx.params.category, ctx.params.ord
    );
    if (filteredProducts.length === 0) {
        ctx.body = { message: `No products found for "${ctx.params.category}"` };
        ctx.status = 404;
    } else {
        ctx.body = filteredProducts;
    }
    return ctx;

}

exports.updateProduct = (ctx) => {
    const modifiedProduct = productActions.updateProductDetails(Number(ctx.params.id), ctx.request.body)
    if (modifiedProduct.length === 0) {
        ctx.body = {message: 'Product not found'}
        ctx.status = 404
    }
    else {
        ctx.body = modifiedProduct;
    }
    return ctx
}

exports.deleteProduct = (ctx) => {
    const removedProduct = productActions.removeProduct(
        Number(ctx.params.id)
    );
    if (removedProduct.length === 0) {
        ctx.body = { message: "Product not found" };
        ctx.status = 404;
    } else {
        ctx.body = removedProduct;
    }
    return ctx;

}