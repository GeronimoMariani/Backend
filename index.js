class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0;

    addProducts(title, description, price, thumnail, code, stock) {
        ProductManager.id++;
        const product = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }
        if (!product.title || !product.description || !product.price || !product.thumnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.")
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.error('Ya existe un producto con el mismo código.');
            return;
        }
        this.products.push(product);
    }

    getProducts() {
        console.log(this.products);
        return this.products;
    }

    getProductById(id) {
        const productSearch = this.products.find(product => product.id === id);
        if (productSearch) {
            console.log("Producto encontrado", productSearch);
        } else {
            console.error("Not found");
        }
    }
}

const newProduct = new ProductManager();

newProduct.addProducts("Pepsi", "Bebida gasificada sabor cola", 570, "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg", "A1", 10);
newProduct.addProducts("Sprite", "Bebida gasificada sabor limon", 600, "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg", "A2", 15);
newProduct.addProducts("Coca Cola", "Bebida gasificada cola", 640, "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg", "A3", 17);
newProduct.getProducts();
newProduct.getProductById(1);

