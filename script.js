class Alumno {
	constructor(nombre, n1, n2, n3, promedio) {
		this.nombre = nombre;
		this.nota1 = n1;
		this.nota2 = n2;
		this.nota3 = n3;
		this.promedio = promedio;
	}
}

function promedio(n1, n2, n3) {
	return ((n1 + n2 + n3) / 3).toFixed(1);
}

let arrayAlumnos = [];
let consulta = JSON.parse(localStorage.getItem("Alumnos"));
if (consulta) {
	for (const a of consulta) {
		arrayAlumnos.push(a);
	}
}

window.addEventListener("load", () => {
	fetch("/articulos.json")
	.then((res)=>{
		return res.json();
	})
	.then((obj)=>{
		console.log(obj)
		cargarProductosVentra(obj)
	})
	.catch((err)=>{
		console.error('Error al obtener los objetos');
	})
	let divLogin = document.getElementById("login");
	let divSist = document.getElementById("sistema");
	document.querySelector("#btnObtenerAyuda").style.display = "block";
	let sesion = sessionStorage.getItem("sesion");
	if (sesion == "1") {
		divLogin.classList.remove("mostrar");
		divLogin.classList.add("esconder");
		divSist.classList.remove("esconder");
		divSist.classList.add("mostrar");
		Toastify({
			text: "Inicio de sesion correcto",
			className: "info",
			style: {
			  background: "linear-gradient(to right, #00b09b, #96c93d)",
			}
		  }).showToast();
	}
});

function cargarDatos() {
	if (consulta) {
		for (let i = 0; i < consulta.length; i++) {
			document.querySelector(".lista").innerHTML += `<li>${consulta[i].nombre} - ${consulta[i].promedio}<li>`;
		}
	}
	document.getElementById("btnObtener").style.display = "none";
}

document.getElementById("btnIngresar").addEventListener("click", () => {
	let divLogin = document.getElementById("login");
	let divSist = document.getElementById("sistema");
	let usu = document.querySelector("#inpUsu").value;
	let contra = +document.querySelector("#inpCont").value;

	if (usu == "admin" && contra == 1234) {
		divLogin.classList.remove("mostrar");
		divLogin.classList.add("esconder");

		divSist.classList.remove("esconder");
		divSist.classList.add("mostrar");

		sessionStorage.setItem("sesion", "1");
	} else {
		swal("Usuario y contraseña incorrecta", "Verifique de nuevo", "error");
	}
});

document.getElementById("btnRegistrar").addEventListener("click", () => {
	let nom = document.querySelector("#inpNombre").value;
	let n1 = +document.querySelector("#inpNota1").value;
	let n2 = +document.querySelector("#inpNota2").value;
	let n3 = +document.querySelector("#inpNota3").value;

	if (n1 <= 10 && n2 <= 10 && n3 <= 10) {
		let prom = promedio(n1, n2, n3);

		let alumno = new Alumno(nom, n1, n2, n3, prom);

		arrayAlumnos.push(alumno);
		//console.log(arrayAlumnos);
		let json = JSON.stringify(arrayAlumnos);

		//console.log(json);
		
		//localStorage.removeItem("Alumnos");
		localStorage.setItem("Alumnos", json);

		let obj = JSON.parse(localStorage.getItem("Alumnos"));
		//console.log(obj);
		var myList = document.querySelector(".lista");
		myList.innerHTML = "";
		for (let i = 0; i < obj.length; i++) {
			myList.innerHTML += `<li>${obj[i].nombre} - ${obj[i].promedio}<li>`;
		}
	} else {
		swal("Ingrese notas validas", "Verifique de nuevo", "error");

	}
});

document.querySelector('#btnObtenerAyuda').addEventListener('click',()=>{
	fetch("/UsoSoftware.txt")
		.then((res)=>{
			return res.text();
		})
		.then((obj)=>{
			//console.log(typeof obj) strign
			document.querySelector(".listaAyuda").innerHTML += `${obj.toString()}`;
			document.querySelector("#btnObtenerAyuda").style.display = "none";
		})
		.catch((err)=>{
			console.error('Error al obtener manual de uso');
		})
})


function cargarProductosVentra(obj){
	let myList = document.querySelector(".listaColegio")
	myList.innerHTML = "";
	for (let i = 0; i < obj.length; i++) {
		myList.innerHTML += `<li>${obj[i].Articulo} - $${obj[i].Precio}<li>`;
	}
}