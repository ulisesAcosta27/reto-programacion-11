function main() {
    function removeChildNode(parent){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }

    document.getElementById('mainForm').addEventListener('submit', async e => {
        e.preventDefault()
        try {
            const container = document.querySelector('.container');
            removeChildNode(container)
            let elementoBuscado = e.target.elementoBuscado.value;
            if(elementoBuscado.search()){
                return elementoBuscado.replace(' ', '-')
            }
            const respuesta = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${elementoBuscado}`);
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

}

main()




