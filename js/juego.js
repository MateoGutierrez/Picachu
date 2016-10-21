var juego = {
	filas:[[],[],[]],
	espacioVacio:{
		fila: 2,
		columna: 2
	},
	iniciar: function(elemento){
		console.log(this.filas);
		console.log(elemento);
		this.instalarPiezas(elemento);
		this.capturarTeclas();
		this.mezclarFichas(200);
	},
	crearPieza: function(numero, fila, columna){
		var div = $("<div/>");
		div.addClass("pieza");
		div.css("top",fila * 200 + "px");
		div.css("left",columna*200+"px");
		div.css("backgroundImage","url('img/"+numero+".jpg')");

		var retorno = {
			div:div,
			numero:numero,
			fila:fila,
			columna:columna
		}

		return retorno;
	},

	instalarPiezas:function(elemento){
		var numero = 1;
		for (var fila = 0; fila < 3; fila++) {
			for (var columna = 0; columna < 3; columna++) {
				if(fila === this.espacioVacio.fila && columna === this.espacioVacio.columna){
					//ESTAMOS EN EL ESPACIO VACIO
					this.filas[fila][columna] = null;
				}else{
					//DEBEMOS COLOCAR PIEZA
					var pieza = this.crearPieza(numero, fila, columna);
					this.filas[fila][columna] = pieza;
					numero++;
					elemento.append(pieza.div);
				}
			}
		}
	},
	moverHaciaArriba:function(){
		if(this.espacioVacio.fila + 1 < this.filas.length){
			var filaOrigen = this.espacioVacio.fila + 1;
			var columnaOrigen = this.espacioVacio.columna;

			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		}

		

		console.log("Arriba");
	},
	moverHaciaAbajo:function(){
		if((this.espacioVacio.fila - 1) > -1){
			var filaOrigen = this.espacioVacio.fila - 1;
			var columnaOrigen = this.espacioVacio.columna;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		}
		
		console.log("abajo");
	},
	moverHaciaLaDerecha:function(){
		if(this.espacioVacio.columna - 1 > -1){
			 var columnaOrigen = this.espacioVacio.columna - 1;
			 var filaOrigen = this.espacioVacio.fila;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		}
		
	},
	moverHaciaLaIzquierda:function(){
		if(this.espacioVacio.columna + 1 < this.filas.length){
			var columnaOrigen = this.espacioVacio.columna + 1;
			var filaOrigen = this.espacioVacio.fila;
			this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		}
		
	},
	capturarTeclas:function(){
	var that = this
	$(document).keydown(function(evento){

		switch(evento.which)
		{
		case 37: 
			that.moverHaciaLaIzquierda(); 
			break;
		case 38: 
			that.moverHaciaArriba(); 
			break;
		case 39: 
			that.moverHaciaLaDerecha(); 
			break;
		case 40: 
			that.moverHaciaAbajo(); 
			break;
		default: 
			return;
		}
		evento.preventDefault();

	});


	},
	moverFichaFilaColumna: function(ficha){
		//console.log(ficha);
		ficha.div.css({
			'top': this.espacioVacio.fila * 200+"px",
			'left': this.espacioVacio.columna*200+"px"
		});

		this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;

	},
	guardarEspacioVacio: function(fila, columna){		
		this.espacioVacio.fila = fila;
		this.espacioVacio.columna = columna;
		this.filas[fila][columna] = null;
	},
	intercambiarPosicionConEspacioVacio: function(fila,columna){
		console.log(fila,columna);
		var ficha = this.filas[fila][columna];
		this.moverFichaFilaColumna(ficha);
		this.guardarEspacioVacio(fila,columna);
		this.chequearSiGano();
	},

	chequearSiGano: function(){
		for (var fila = 0; fila < 3; fila++) {
			for (var columna = 0; columna < 3; columna++) {
				var pieza = this.filas[fila][columna];
				if(pieza){
					if (fila !== pieza.fila || columna !== pieza.columna) {
						return;
					}
				}
				
			}

		}

		alert("Ganaste");
	},

	mezclarFichas: function(veces){
		var movimiento = ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaIzquierda", "moverHaciaLaDerecha"];
		for (var i = 0; i < veces; i++) {
			var numAleatorio = Math.floor(Math.random() * 4);
			this[movimiento[numAleatorio]]();
		}

	}

}

$(document).ready(function(){
	var parametro = $("#juego");
	juego.iniciar(parametro);
});
