var intervalID;
var parqueNatural = {
    areas: [],
    parqueDeBomberos: {
      bomberos: []
    },
    crearAreas: function(){
      for(var i=0;i<10;i++){
        this.areas.push(new Area(i));
      }
    },
    addVisitante: function(visitante){
      var areaAleatoria = generarNumeroAleatorio(0, this.areas.length-1);
      if(this.getNumeroVisitantes()<100){
        this.areas[areaAleatoria].visitantes.push(visitante);
      } else {
        console.log("No hay más espacio para visitas");
      }
      
    },
    addBomberos: function(){
      for(var i=0;i<10;i++){
        this.parqueDeBomberos.bomberos.push(new Bombero());
      }
    },
    getNumeroVisitantes: function(){
      var cuentaVisitantes = 0;
      for(var i=0;i<this.areas.length;i++){
        cuentaVisitantes = cuentaVisitantes + this.areas[i].visitantes.length;
      }
      return cuentaVisitantes;
    },
    iniciarFuego: function(){
      var areaAleatoria = generarNumeroAleatorio(0, this.areas.length-1);
      var arbolAleatorio = generarNumeroAleatorio(0, this.areas[areaAleatoria].arboles.length-1);
      var arbolParaQuemar = this.areas[areaAleatoria].arboles[arbolAleatorio];

      if(generarNumeroAleatorio(5, 1) == 5){
        this.quemarArbol(arbolParaQuemar);
      }
    },
    quemarArbol: function(arbol){
      if(arbol.tantoQuemado < 100){
        arbol.tantoQuemado = arbol.tantoQuemado + 10;
        arbol.quemado = true;
      } else if(arbol.tantoQuemado == 100){
        var area_arbol = arbol.id.split('_');
        var idx = this.areas[area_arbol[0]].arboles.indexOf(arbol);
        this.areas[area_arbol[0]].arboles.splice(idx, 1);
        console.log("El arbol " + arbol.id + " se quemó!");
      }
    },
    extenderFuego: function(){
      for(var i=0; i<this.areas.length; i++){
        for(var ar=0; ar<this.areas[i].arboles.length; ar++){
          if(this.areas[i].arboles[ar].quemado == true && this.areas[i].arboles[ar].tantoQuemado == 10){
            if((ar + 1) < this.areas[i].arboles.length){
              this.quemarArbol(this.areas[i].arboles[ar + 1]);
            }
          }
        }
      }
    },
    getArbolesVivos: function(){
      var cuentaArbolesVivos = 0;
      for(var i=0;i<this.areas.length;i++){
        cuentaArbolesVivos = cuentaArbolesVivos + this.areas[i].arboles.length;
      }
      return cuentaArbolesVivos;
    }
};

var nombres = ["Juan", "Maria", "Pedro", "Cristina", "Gerardo", "Fer"];
function generarNombreAleatorio(){
    var numeroAleatorio = Math.floor(Math.random() * nombres.length);
    return nombres[numeroAleatorio];
}

function generarNumeroAleatorio(max, min){
    return Math.round(Math.random() * (max - min) + min);
}

var Area = function(idArea){
  this.idArea = idArea;
  this.arboles = [];
  this.visitantes = [];
  for(var i=0; i<100; i++){
    var idArbol = this.idArea + "_" + i;
    this.arboles.push(new Arbol(idArbol));
  }
}

var Arbol = function(id){
  this.id = id;
  this.quemado = false;
  this.tantoQuemado =0;
}

var Persona = function(){
  this.nombre = "";
  this.edad = "";
}
Persona.prototype.crearPersona = function(nombre, edad){
  this.nombre = generarNombreAleatorio();
  this.edad = generarNumeroAleatorio(100, 1);
}

var Visitante = function(){
  this.vivo = false;
  this.crearPersona();
}
Visitante.prototype = new Persona();

var Bombero = function(){
  this.fuerza = 0;
  this.crearPersona();
}
Bombero.prototype = new Persona();


parqueNatural.crearAreas();
parqueNatural.addBomberos();


function ejecutarCiclo(){
  console.log('Ciclo ejecutado');
  parqueNatural.addVisitante(new Visitante());
  parqueNatural.iniciarFuego();
  parqueNatural.extenderFuego();
}

function cicloVisitantes(){

}

intervalID = setInterval(ejecutarCiclo, 1000);
