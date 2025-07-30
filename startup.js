/*
 * Copyright 2025 Antony Blanco (Tonyway) 
 * Copyright 2019 Oleksandr Bezushko
 * Copyright 2019 tazeat
 *
/**
 * Se concede permiso, sin cargo, a cualquier persona que obtenga una copia de este software
 * y los archivos de documentacion asociados (el "Software"), para utilizar el Software sin
 * restricciones, incluyendo sin limitacion los derechos de uso, copia, modificacion, fusion,
 * publicacion, distribucion, sublicenciamiento y/o venta de copias del Software, y para permitir
 * a las personas a quienes se les proporcione el Software hacerlo, sujeto a las siguientes condiciones:
 *
 * El aviso de copyright anterior y este aviso de permiso deben incluirse en todas las copias o partes
 * sustanciales del Software.
 *
 * EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTIA DE NINGUN TIPO, EXPRESA NI IMPLICITA,
 * INCLUYENDO PERO NO LIMITADO A LAS GARANTIAS DE COMERCIALIZACION, APTITUD PARA UN PROPOSITO
 * PARTICULAR Y NO INFRACCION. EN NINGUN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERAN
 * RESPONSABLES POR NINGUNA RECLAMACION, DANOS U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCION
 * DE CONTRATO, AGRAVIO O DE OTRO TIPO, DERIVADA DE O EN CONEXION CON EL SOFTWARE O EL USO
 * U OTROS TRATOS EN EL SOFTWARE.
 */
 

function onError(error) {
    console.log(`Error: ${error}`);
}

function updateWindow(window) {
    if (window && window.id && window.state !== "fullscreen" && window.type === "normal") {
        browser.windows.update(window.id, { state: "fullscreen" });
        console.log(`Ventana ${window.id} actualizada a fullscreen`);
    }
}

// Evento inicial — actualiza todas las ventanas abiertas al cargar
console.log(`AutoFullscreen Extension Running`);
browser.windows.getAll().then((windowInfoArray) => {
    for (const currentWindow of windowInfoArray) {
        updateWindow(currentWindow);
    }
}, onError);

// Evento cuando se crea una nueva ventana
browser.windows.onCreated.addListener((window) => {
    console.log("Nueva ventana creada: " + window.id);
    setTimeout(() => {
        browser.windows.get(window.id).then(updateWindow, onError);
    }, 500); // Espera aumentada para asegurar carga completa
});

// Evento cuando cambia el foco a una nueva ventana (refuerzo)
browser.windows.onFocusChanged.addListener((windowId) => {
    if (windowId !== browser.windows.WINDOW_ID_NONE) {
        browser.windows.get(windowId).then(updateWindow, onError);
    }
});
