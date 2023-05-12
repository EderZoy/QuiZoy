
let base_preguntas = readText("base-preguntas.json"); //guarda la pregunta que lee desde la base de preguntas.
let interprete_bp = JSON.parse(base_preguntas);
let posibles_rta = [];
let pregunta;
let btn_correspondiente = [select_id("btn1"),select_id("btn2"),select_id("btn3"),select_id("btn4")];
let puntaje=0;
let cantidad=0;

swal.fire({
    title: "Bienvenido a QuiZoy",
    text: "Desafia tu cultura general",
    icon: "info",
    confirmButtonColor: '#b79fe6',
    confirmButtonText: 'GO'
});

escogerAleatoria();

/*Funcion para escoger preguntas aleatorias*/
function escogerAleatoria() {
    /*Llama al metodo de escoger la pregunta pero le pasa como parametro un numero aleatorio */
    if(cantidad==10) {

        //Depende el puntaje muestro un mensaje u otro
        if(puntaje >= 6) {
            swal.fire({
                title: "Juego finalizado",
                text: "Tu puntuación fue de: " + puntaje,
                icon: "success",
                footer: 'REY DEL QuiZoy',
                confirmButtonColor: '#b79fe6',
                confirmButtonText: 'Jugar de Nuevo'
            });
        }

        if(puntaje < 6) {
            swal.fire({
                title: "Juego finalizado",
                text: "Tu puntuación fue de: " + puntaje,
                icon: "error",
                footer: 'Sos malisimo',
                button: "Jugar de nuevo",
                confirmButtonColor: '#b79fe6',
                confirmButtonText: 'Jugar de Nuevo',
            });
        }

        //reiniciamos juego
        puntaje=0;
        cantidad=0;
        escogerAleatoria()
  
    } else {
        cantidad++;
        escogerPregunta(Math.floor(Math.random()*(21-0)+0));
        inicio = false; 
    }
    
}

//Funcion para escoger la pregunta de nuestra base de preguntas
function escogerPregunta(n){
    pregunta = interprete_bp[n];
    select_id("cantidad").innerHTML = cantidad +"/10";
    select_id("categoria").innerHTML = pregunta.categoria;
    select_id("pregunta").innerHTML = pregunta.pregunta;
    style("img").objectFit = pregunta.imagen;

    desordenarRespuestas(pregunta);

    /*Si una pregunta tiene imagen o no:*/
    if(pregunta.imagen) {
        select_id("img").setAttribute("src",pregunta.imagen);
        //style("img").height = "150px";
        //style("img").width = "100%";

    } else {
        style("img").height = "0px";
        style("img").width = "0%";
    }

}

/*Función para desorganizar respuestas*/
function desordenarRespuestas(pregunta) {
    /**Creamos un array con las posibles respuestas y con el sort lo desornamos */
    posibles_rta = [pregunta.respuesta,pregunta.incorrecta1,pregunta.incorrecta2,pregunta.incorrecta3];
    posibles_rta.sort(()=>Math.random()-0.5);
    select_id("btn1").innerHTML = posibles_rta[0];
    select_id("btn2").innerHTML = posibles_rta[1];
    select_id("btn3").innerHTML = posibles_rta[2];
    select_id("btn4").innerHTML = posibles_rta[3];
}

/**Función para ver si es correcto o no */
function oprimir_btn(i) {
    console.log(posibles_rta[i])
    console.log(pregunta.respuesta)
    if(posibles_rta[i] == pregunta.respuesta ){
        btn_correspondiente[i].style.background = "greenyellow";
        puntaje++;
    } else {
        btn_correspondiente[i].style.background = "tomato";
    }
    //Llamamos a la funcion de reiniciar luego de 3 segundos
    setTimeout(() => {
        reiniciar();
    },1000);
}

//Funcion para reiniciar los botones a blanco
function reiniciar(){
    //recorremos cada boton
    for (const btn of btn_correspondiente){
        btn.style.background = "white";
    }
    escogerAleatoria();
}

//Funcion para seleccionar un objeto segun su ID
function select_id(id) {
    return document.getElementById(id);
}

//Funcion para obtener el estilo (CSS) dsel objeto segun el id
function style(id) {
    return select_id(id).style;
}

//Funcion para leer texto desde una ruta local
function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",ruta_local,false);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
            texto = xmlhttp.responseText;
        }
        return texto;

}



