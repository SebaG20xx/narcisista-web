// La web de desarrollo (9090) usa la API de desarrollo (8090)
// y la de produccion (9091) usa la API de produccion (8091).
const PUERTO_API = globalThis.location.port === "9091" ? "8091" : "8090";
const URL_API = "http://" + globalThis.location.hostname + ":" + PUERTO_API;

function mostrar(idDiv, texto, esError) {
    const div = document.getElementById(idDiv);
    div.textContent = texto;
    div.className = "alert mt-3 " + (esError ? "alert-danger" : "alert-success");
}

async function consultar(ruta, idDiv, armarTexto) {
    try {
        const respuesta = await fetch(URL_API + ruta);
        if (respuesta.ok) {
            mostrar(idDiv, armarTexto(await respuesta.json()), false);
        } else {
            mostrar(idDiv, "Error: " + (await respuesta.text()), true);
        }
    } catch (error) {
        mostrar(idDiv, "No se pudo conectar con la API (" + error.message + ")", true);
    }
}

function verificar() {
    const numero = document.getElementById("numero-txt").value;
    consultar("/verificar?numero=" + encodeURIComponent(numero), "resultado-div", (r) =>
        r.numero + (r.narcisista ? " SÍ" : " NO") + " es narcisista (suma de sus dígitos elevados a "
        + r.digitos + " = " + r.suma + ")");
}

function listar() {
    const hasta = document.getElementById("hasta-txt").value;
    consultar("/listar?hasta=" + encodeURIComponent(hasta), "lista-div", (lista) =>
        "Narcisistas hasta " + hasta + ": " + lista.join(", "));
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("entorno-txt").textContent = "API: puerto " + PUERTO_API;
    document.getElementById("verificar-btn").addEventListener("click", verificar);
    document.getElementById("listar-btn").addEventListener("click", listar);
});
