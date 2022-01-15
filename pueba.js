document.getElementById('song-search').addEventListener('submit', async e => {
    e.preventDefault()
    try {
        let artist = e.target.artist.value;
        const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${artist}`);
        const datos = await respuesta.json();
        console.log(datos.results)
        datos.results.forEach(telefono => {
            const creacionCard = document.createElement('div');
            creacionCard.className = 'card_container';
        creacionCard.innerHTML = `
        <div class="card_img">
            <img src="${telefono.thumbnail}" alt="">
            </div>
            <div class="card_titulo">
            <h2>${telefono.title}</h2>
            <p>${telefono.attributes[2].value_name}</p>
            </div>
        <div class="card_sellet">
            <p>Vendidos: ${telefono.sold_quantity}</p>
            </div>
        <div class="card_cash">
        <p>$ ${telefono.price}</p>
        </div>`
        document.querySelector('.container').appendChild(creacionCard);
    });
} catch (error) {
    console.log(error)
}
})



