

function validar() {

    var diaIsOk;
    var mesIsOk;
    var anioIsOk;
    var fechaIsOk;
    var cantDias;
    //en las validaciones de fecha tambien se contempla que el campo no quede vacio
    anioIsOk = validaAnio();
    mesIsOk = validaMes();

    //primero valida el año, para saber si es bisiesto
    //despues valida el mes, para saber la cantidad de dias
    if (anioIsOk && mesIsOk) {
        cantDias = obtenerDiasEnMes();
        diaIsOk = validaDia(cantDias);
    } else {
        //si mes y año no son validos, no se pueden validar los dias por lo tanto considero error ingresando la fecha. 
        //esto marca todos los campos fecha en rojo si la fecha completa no es valida.
        diaIsOk = validaDia(0);
        var mesElement = document.getElementById("mes");
        mesElement.style.borderColor = "red";
        var anioElement = document.getElementById("anio");
        anioElement.style.borderColor = "red";
    }

    //si fecha ok.
    if (diaIsOk && mesIsOk && anioIsOk) {
        fechaIsOk = true;
    }

    //valida campos tipo texto
    resValida = validaCamposVacios();

    //validación final.
    if (!fechaIsOk || !resValida) {
        alert("¡Cuidado! \nRevise los campos con error");
    } else {
        alert("¡Ha completado el formulario con éxito!")
    }


}

function validaCamposVacios() {
    var nom;
    var ape;
    var mail;
    var obSoc;
    nom = document.getElementById("nombre").value;
    ape = document.getElementById("apellido").value;
    mail = document.getElementById("email").value;
    obSoc = document.getElementById("obras_sociales").value;

    var nomObj;
    var apeObj;
    var mailObj;
    var obSocObj;
    nomObj = document.getElementById("nombre");
    apeObj = document.getElementById("apellido");
    mailObj = document.getElementById("email");
    obSocObj = document.getElementById("obras_sociales");

    var nomIsOk;
    var apeIsOk;
    var mailIsOk;
    var obSocIsOk;

    // si el resultado de !nom retorna false, es pq no encontró valores en el dato
    if (!nom) {
        nomObj.style.borderColor = "red";
        nomIsOk = false;
    } else {
        nomObj.style.borderColor = "silver";
        nomIsOk = true;
    }

    if (!ape) {
        apeObj.style.borderColor = "red";
        apeIsOk = false;
    } else {
        apeObj.style.borderColor = "silver";
        apeIsOk = true;
    }

    if (!mail) {
        mailObj.style.borderColor = "red";
        mailIsOk = false;
    } else {
        if (!validarEmail(mail)) {
            mailObj.style.borderColor = "red";
            mailIsOk = false;
        } else {
            mailObj.style.borderColor = "silver";
            mailIsOk = true;
        }
    }

    if (!obSoc) {
        obSocObj.style.borderColor = "red";
        obSocIsOk = false;
    } else {
        obSocObj.style.borderColor = "silver";
        obSocIsOk = true;
    }
    if (nomIsOk && apeIsOk && mailIsOk && obSocIsOk) {
        return true;
    } else {
        return false;
    }

}

function validaDia(cantDias) {
    var dia;
    dia = document.getElementById("dia").value;

    var diaElement;
    diaElement = document.getElementById("dia");

    if (dia < 1 || dia > cantDias || !esEntero(dia)) {
        diaElement.style.borderColor = "red";
        return false;
    } else {
        diaElement.style.borderColor = "silver";
        return true;
    }
}

function validaMes() {
    var mes;
    mes = document.getElementById("mes").value;

    var mesElement;
    mesElement = document.getElementById("mes");


    if (mes < 1 || mes > 12 || !esEntero(mes)) {
        mesElement.style.borderColor = "red";
        return false;
    } else {
        mesElement.style.borderColor = "silver";
        return true;
    }
}

function validaAnio() {
    //obtiene del html el objeto (contenido) de id anio
    var anio;
    anio = document.getElementById("anio").value;

    //devuelve el objeto completo
    var anioElement;
    anioElement = document.getElementById("anio");

    var longitud;
    longitud = anio.length

    if (longitud != 4 || !esEntero(anio)) {
        anioElement.style.borderColor = "red";
        return false;
    } else {
        anioElement.style.borderColor = "silver"
        return true;
    }
}




//tuve que usar una funcion que retorne que si el resto de divivir a un numero por si mismo es 0, entonces es entero.
//el metodo Math.floor() y el Number.isInteger() no resolvía para datos de tipo caracter ('/','*','-','?', etc)
function esEntero(num) {
    return num % 1 === 0;
}

function esBisiesto(anio) {
    // (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0
    if (anio % 4 === 0) {
        return true; // Es bisiesto
    } else {
        return false; // No es bisiesto
    }
}

function obtenerDiasEnMes() {

    //sin el parseInt no hacia bien la comparación-
    var mes = parseInt(document.getElementById("mes").value);
    var anio = parseInt(document.getElementById("anio").value);
    /*
    var mes;
    mes = document.getElementById("mes").value;
    var anio;
    anio = document.getElementById("anio").value;
    */
    if (mes === 2) {
        if (esBisiesto(anio)) {
            return 29; // Febrero tiene 29 días en años bisiestos
        } else {
            return 28; // Febrero tiene 28 días en años no bisiestos
        }
    } else if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
        return 30; // Abril, junio, septiembre y noviembre tienen 30 días
    } else {
        return 31; // Resto de los meses tienen 31 días
    }
}
function validarEmail(correo) {
    // Expresión regular para validar el correo electrónico
    // "/": El inicio de la expresión regular.
    // "^"": Coincide con el inicio de la cadena.
    //valida caracteres antes y despues del arroba.
    //se necesita la barra invertida \. para que se trate literalmente como un punto
    //El {2,} es un cuantificador que especifica que la expresión anterior ([a-zA-Z]) debe aparecer al menos dos veces.
    
    // el formato del mail solo permite letras mayusculas, minusculas,
    //numeros, ".", "-" y "_"
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(correo);
}