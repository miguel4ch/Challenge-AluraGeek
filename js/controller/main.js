import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
        <div class="product-img-container">
            <img src="${image}" alt="${name}" class="product-img">
        </div>
        <div class="product-info">
            <p class="product-name">${name}</p>
            <div class="price-and-delete">
                <p class="product-price">$${price}</p>
                <button class="borrar-boton" aria-label="Borrar producto" data-id="${id}">
                    <i class='bx bxs-trash'></i>
                </button>
            </div>
        </div>`;

    const deleteButton = card.querySelector(".borrar-boton");
    deleteButton.addEventListener("click", () => {
        const productId = deleteButton.getAttribute("data-id");
        servicesProducts.deleteProduct(productId)
            .then(() => {
                card.remove(); 
            })
            .catch((err) => console.log("Error deleting product:", err));
    });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();

        listProduct.forEach((element) => {
            createCard(
                element.name,
                element.price,
                element.image,
                element.id
            );
        });
    } catch (error) {
        console.error("Error fetching product list:", error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const res = await servicesProducts.createProduct(name, price, image);
        console.log("Product created:", res);
        // Opcionalmente, añade el nuevo producto al DOM
        createCard(name, price, image, res.id);
    } catch (err) {
        console.error("Error creating product:", err);
    }
});

render();
