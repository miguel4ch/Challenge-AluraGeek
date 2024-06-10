const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

const createProduct = (name, price, image) => {
    return fetch("http://localhost:3000/products",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 

        },
        body: JSON.stringify({
            name,
            price,
            image,
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch((err) => console.log(err));
}

export const servicesProducts = {
    productList,
    createProduct,
    deleteProduct,
}