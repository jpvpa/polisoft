var tipo = document.getElementById("Tipo");
var color = document.getElementById("Color");
var diseño = document.getElementById("Diseño");

function actualizarImagen() {
    console.log(tipo.value + ' / ' + color.value + '/' + diseño.value);
    if (document.images) document.images['TipoDe'].src = 'images/' + tipo.value + '/' + color.value + '/' + diseño.value + '.png';
}

actualizarImagen();