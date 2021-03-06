const id = document.URL.split("=")[1];
const itemDisplay = document.getElementById('item-display');
let basketContent;

function displayItem(item) {
    itemDisplay.innerHTML = 'Loading...';
    if (id === item._id) {
        let dollars = priceToDollars(item.price);
        //generates html
        itemDisplay.innerHTML = `<div class="row my-5">
                <div class="col-4 my-5 pb-5">
                    <img src="${item.imageUrl}" alt="${item.name}" class="card-img-top my-4 px-5">
                </div>
                <div class="col-6">
                    <h1 class="mt-5">${item.name}</h1>
                    <div class="price font-weight-bold mb-2">${dollars}</div>
                    <label for="lenses" class="mb-4">Lenses:</label>
                    <select name="lenses" id="lenses">
                    </select>
                    <p>${item.description}</p>
                </div>
                <div class="col2 mt-5 pt-5">
                    <button id="add-to-cart" class="btn btn-primary">Add to Cart</button>

                </div>`;
        // Generates lenses options
        const lensesOptions = document.querySelector('#lenses');
        item.lenses.forEach(lens => {
            const optionElement = document.createElement('option');
            optionElement.value = lens;
            optionElement.innerHTML = lens;
            lensesOptions.appendChild(optionElement);
        });
        // Adds listener to Add to Cart Button
        let addToCartBtn = document.querySelector('#add-to-cart');

        function addToCart() {
            if (!localStorage.getItem('basket')) {
                basketContent = [];
            } else {
                basketContent = JSON.parse(localStorage.getItem('basket'))
            }
            basketContent.push(item._id);
            localStorage.setItem('basket', JSON.stringify(basketContent));

            window.location.href = `/cart.html`;
        };
        addToCartBtn.addEventListener('click', addToCart);
    } else {
        unableToLoad();
    }
}

function unableToLoad() {
    itemDisplay.innerHTML = `<i class="fas fa-times-circle pr-3" style="font-size:25px"></i>  Unable to load Content! Please try again later or contact website administrator.`;
    itemDisplay.classList.add('bg-danger',
        'text-light', 'text-center', 'mt-5', 'p-3')
}

async function fetchAndDisplayItem(query) {
    itemDisplay.innerHTML = loadingAnimation;
    // console.log(query);
    await getContent(query).then(item => {
        displayItem(item);
    }).catch((error) => {
        console.log(error);
        unableToLoad();
    })
}

fetchAndDisplayItem(camerasApi + id);