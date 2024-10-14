document.getElementById('btnBuscar').addEventListener('click', function() {
    const searchTerm = document.getElementById('inputBuscar').value;

    // Realizar la solicitud a la API de NASA
    fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Desestructuración del objeto data
            const { collection: { items } } = data;
            const contenedor = document.getElementById('contenedor');
            contenedor.innerHTML = ''; // Limpiar resultados anteriores

            // Recorrer cada item de la respuesta
            items.forEach(item => {
                const { title, description, date_created } = item.data[0]; // Desestructuración de item.data[0]
                let imageUrl = '';

                // Verificar si el item tiene la propiedad links y si es de tipo 'image'
                if (item.links && item.links[0].render === 'image') {
                    imageUrl = item.links[0].href; // Desestructuración de links
                }

                // Si no hay imagen, usar una imagen predeterminada
                if (!imageUrl) {
                    imageUrl = 'https://via.placeholder.com/300?text=No+Image'; // Imagen de reserva
                }

                // Crear tarjeta Bootstrap usando las clases recomendadas
                const card = `
        <div class="col-md-4">
            <div class="card mb-4">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text" style="max-height: 100px; overflow-y: auto;">
                        ${description || 'Sin descripción disponible.'}
                    </p>
                    <p class="card-text">
                        <small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small>
                    </p>
                </div>
            </div>
        </div>
    `;
                // Insertar tarjeta en el contenedor
                contenedor.innerHTML += card;
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});
