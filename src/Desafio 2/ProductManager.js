import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    static id = 0;

    async addProducts(product) {
        ProductManager.id++;
        if (!product.title || !product.description || !product.price || !product.thumnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.")
            return;
        }
        const { title, description, price, thumnail, code, stock } = product;
        const products = await this.getProducts();
        const newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }
        console.log(newProduct)
        products.push(newProduct);
        const productsFile = await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
    }

    async updateProduct(product, id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...product };
            await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8")
            console.log(`Producto con ID ${id} actualizado exitosamente.`);
        } else {
            console.log(`No se encontró un producto con el ID ${id}.`);
        }
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, "utf-8");
            const parsedData = JSON.parse(products);
            return parsedData;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const productId = products.find(product => product.id === id);
        if (productId) {
            console.log(productId);
            return productId;
        } else {
            return({error:`El producto con el ID ${id} no fue encontrado o no existe`});
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productId = products.findIndex(product => product.id === id);
        if (productId !== -1) {
            products.splice(productId, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8")
            console.log(`El producto con el ID ${id} fue eliminado.`)
        } else {
            console.error(`No se encontró un producto con el ID ${id}.`);
        }
    }
}

export default ProductManager

const test = async () => {
    const productManager = new ProductManager("./products.json");
    let data = await productManager.getProducts();
    const product1 = {
        title: "Pepsi",
        description: "Bebida gasificada",
        price: 600,
        thumnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg",
        code: "A1",
        stock: 27
    }
    const product2 = {
        title: "Coca",
        description: "Bebida gasificada",
        price: 600,
        thumnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg",
        code: "A2",
        stock: 27
    }
    const product3 = {
        title: "Sprite",
        description: "Bebida gasificada",
        price: 700,
        thumnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg",
        code: "A3",
        stock: 37
    }
    const product4 = {
        title: "Cunington",
        description: "Bebida gasificada",
        price: 400,
        thumnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg",
        code: "A4",
        stock: 10
    }
    const product5 = {
        title: "7up",
        description: "Bebida gasificada",
        price: 550,
        thumnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg",
        code: "A5",
        stock: 45
    }
    const product6 = {
        title: "Fanta",
        description: "Bebida gasificada",
        price: 760,
        thumnail: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000020/2183_1.jpg",
        code: "A6",
        stock: 89
    }
/*     await productManager.addProducts(product1);
    await productManager.addProducts(product2);
    await productManager.addProducts(product3);
    await productManager.addProducts(product4);
    await productManager.addProducts(product5);
    await productManager.addProducts(product6); */
/*     console.log(data); */
/*     productManager.getProductById(3); */
/*     productManager.updateProduct(product3, 2); */
/*     productManager.deleteProduct(1); */
}

test();