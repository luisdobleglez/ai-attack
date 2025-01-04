//Pantalla
const panta = document.getElementById('panta')
const salida = document.getElementById('salida')
const restantes = document.getElementById('aliens-restantes')
const disparos = document.getElementById('disparos')
const cargando = document.getElementById('cargando')
const puntos = document.getElementById('puntos')
const vidasMonitor= document.getElementById('vidas');
function ajustarPantalla() {
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;

    if (anchoVentana > altoVentana) {
        panta.style.width = altoVentana + "px";
        panta.style.height = altoVentana + "px";
    } else if (anchoVentana < altoVentana) {
        panta.style.width = anchoVentana + "px";
        panta.style.height = anchoVentana + "px";
    } else {
        panta.style.width = anchoVentana + "px";
        panta.style.height = altoVentana + "px";
    }
    let anchoPantalla = panta.offsetWidth;
    let altoPantalla = panta.offsetHeight;



    return { anchoPantalla, altoPantalla };
}


const dimensiones = ajustarPantalla();
window.addEventListener('resize', ajustarPantalla);


    function impacto(o1, o2) {
        
        const rect1 = o1.getBoundingClientRect()
        const rect2 = o2.getBoundingClientRect()
        const amortiguacion = 5;
        return !(
            rect1.top > rect2.bottom - amortiguacion ||
            rect1.bottom < rect2.top + amortiguacion ||
            rect1.left > rect2.right - amortiguacion ||
            rect1.right < rect2.left + amortiguacion
        );
    }
class Alien {
    constructor(color, x, y, tipo = 'miguelito'/* , rangoH, rangoV */) {
        this.x = x || 0;
        this.y = y || 0;
/*         this.rangoH = rangoH || 1;
        this.rangoV = rangoV || 3; */

        this.color = color || this.generarColorRandom();
        /* this.moverManos(); */
        this.tipo = tipo;
        this.alienDiv = this.crearAlien();
        this.colisionDetectada = false;
        
      /*   this.moverAlien(); */
    }
    generarColorRandom() {
       /*  const coloresRandom = ['#0ff', '#0f0', '#00f']; */

        const coloresRandom = [
            "#A8DADC", // Azul verdoso pastel
            "#BDE0FE", // Azul claro pastel
            "#CDB4DB", // Lila pastel
            "#D4E157", // Amarillo verdoso pastel
            "#D0F4DE", // Verde menta pastel
            "#A7C7E7"  // Azul cielo pastel
          ];
        return coloresRandom[Math.floor(Math.random() * coloresRandom.length)];
    }
    cambiarTipo(tipo) {
  

        if (tipo === 'miguelito') {
      
            var elTipo = `<code class="core-alien"></code><svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 612 489.6" enable-background="new 0 0 612 489.6" xml:space="preserve" ><g class="cabeza vivo">
            	<path  fill="${this.color}" d="M556.4,55.6V178h-55.6v-66.8H445V55.6h-55.6v55.6H222.6V55.6H167v55.6h-55.6V178H55.7V55.6H0v244.8h55.6
		v77.8h55.6v55.6h55.6v-55.6H445v55.6h55.6v-55.6h55.6v-89H612V55.6H556.4z M222.6,244.8H167v-55.6h55.6V244.8z M445,244.8h-55.6
		v-55.6H445V244.8z"/>
	<rect x="111.2" y="0"  fill="${this.color}" width="55.6" height="55.6"/>
	<rect x="445" y="0"  fill="${this.color}" width="55.6" height="55.6"/>
	<rect x="55.6" y="434"  fill="${this.color}" width="55.6" height="55.6"/>
	<rect x="500.8" y="434"  fill="${this.color}" width="55.6" height="55.6"/>
            
            </g>
            <g  class="manos vivo">	
     	<rect x="250.1" y="322.5" width="55.6" height="55.6"  fill="${this.color}" />
	<rect x="306.3" y="378.2" width="55.6" height="55.6"  fill="${this.color}" />
	<rect x="361.9" y="434" width="55.6" height="55.6"  fill="${this.color}" />
	<rect x="194.5" y="266.9" width="55.6" height="55.6"  fill="${this.color}" />
	<rect x="361.9" y="266.9" width="55.6" height="55.6"  fill="${this.color}" />
	<rect x="194.5" y="434" width="55.6" height="55.6"  fill="${this.color}" />
            </g></svg>`;
                    }

        else if (tipo === 'calamar') {
      
var elTipo = `<code class="core-alien"></code><svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 -113.6 612 905.6" enable-background="new 0 -113.6 612 905.6" xml:space="preserve"><g class="cabeza vivo"><path fill="${this.color}" path d="M18,432v144h72v72h72v72h72v72h144v-72h72v-72h72v-72h72V432H450 M378,504h72v72h-72V504z M162,504h72v72h-72V504z"/></g><g  class="manos vivo">	<polygon fill="${this.color}" points="571.2,140.9 418.5,-11.8 316.7,90 265.8,39.1 367.6,-62.7 316.7,-113.6 163.9,39.1 265.8,140.9 214.8,191.9 113,90 	62.1,140.9 214.8,293.7 316.7,191.9 367.6,242.8 265.8,344.6 316.7,395.5 469.4,242.8 367.6,140.9 418.5,90 520.3,191.9 " /></g></svg>`;
        }
        else if (tipo === 'bisho') {
    
            this.alienDiv.classList.add('bisho')
            elTipo = `<code class="core-alien"></code><svg id="bisho" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 612 792" enable-background="new 0 0 612 792" xml:space="preserve"><g class="cabeza vivo"><path  fill="${this.color}" d="M375.4,224.9H229.2v49.7h-48.7v48.7h-48.8v97.5h48.7v48.8h48.7v51.2h48.8v48.8h48.7v-48.7h48.7v-51.2h48.7V421h48.9v-97.6	h-48.7v-48.7h-48.7L375.4,224.9L375.4,224.9L375.4,224.9z M424.2,323.4l-0.1,97.6l-99.1-0.4l0-96.7L424.2,323.4z M180.4,420.9	v-97.5H277v97.5H180.4z"/><rect fill="${this.color}" x="179.1" y="518.6" width="50" height="50"/>	<rect fill="${this.color}"  x="375.1" y="520.9" width="50" height="50"/></g><g class="manos">
            <rect fill="${this.color}"  x="277.9" y="633.1" width="48.7" height="48.7"/>
	<rect fill="${this.color}"  x="2.8" y="363.4" width="48.7" height="48.7"/>
	<rect fill="${this.color}" x="566.1" y="363.4" width="48.7" height="48.7"/>
	<rect fill="${this.color}" x="277.9" y="72.1" width="48.7" height="48.7"/>
	<rect fill="${this.color}" x="476.2" y="556" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 1264.9222 636.7477)" width="48.7" height="48.7"/>
	<rect fill="${this.color}" x="90.9" y="559.8" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 609.9088 915.6835)" width="48.7" height="48.7"/>
	<rect fill="${this.color}" x="489.3" y="161.5" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 1008.2748 -45.9161)" width="48.7" height="48.7"/>
	<rect fill="${this.color}" x="79.6" y="159.3" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 307.3195 240.0597)" width="48.7" height="48.7"/></g></svg>`;
        }
        else if (tipo === 'malote') {
           
            elTipo = `<code class="core-alien"></code><svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 31 29" enable-background="new 0 0 31 29" xml:space="preserve"><g class="cabeza vivo"><path fill="${this.color}" d="M27,8V4h-2V0h-4v4H10V0H6v4H4v4H0v16h2v-4h5v4h2v-4h5v4h3v-4h5v4h2v-4h5v4h2V8H27z M14,11H7V8h7V11z M25,11h-7V8h7V11z"/><g class="manos"><rect  fill="${this.color}"  x="2" y="24" width="5" height="5"/>	<rect  fill="${this.color}"  x="9" y="24" width="5" height="5"/><rect  fill="${this.color}"  x="17" y="24" width="5" height="5"/>	<rect  fill="${this.color}"  x="24" y="24" width="5" height="5"/>
           </g></svg>`;
        }else {
            this.tipo = tipo;
        }
        if (this.alienDiv) {
            this.alienDiv.innerHTML = elTipo;
            this.alienDiv.classList.add(tipo)
            // Actualiza el contenido del DOM
        }   
              const mano = this.alienDiv.querySelector('.manos'); // Selecciona el elemento
        if (mano) {
            const bbox = mano.getBBox(); // Obtiene el tamaño del elemento
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;
            
            mano.style.transformOrigin = `${centerX}px ${centerY}px`; // Establece el origen
            let angulo = 0;
            setInterval(() => {
                angulo -= 10; // Incrementa el ángulo
                mano.style.transform = `rotate(${angulo}deg)`; 
        
            }, 100);
        }

    }
    crearAlien() {
        let alien = document.createElement('div');
        alien.classList.add('alien');
        alien.innerHTML = this.tipo;
        panta.appendChild(alien);
        alien.addEventListener('click', () => this.borrarAlien());
        return alien;
    }

    borrarAlien() {
        if (this.alienDiv) {
            this.alienDiv.remove();
            this.alienDiv = null;
        }
    }
    moverAlien(rangoH, rangoV) {
        let direccion = 1;
        let velocidad = 1;
        let opacidad = parseFloat(window.getComputedStyle(this.alienDiv).opacity || 1);
    
        const moverPaso = () => {
            if (!this.alienDiv) return; // Si el alien fue eliminado, detener
    
            // Actualizar posición
            this.x += rangoH * direccion;
            this.y += rangoV * velocidad;
    
            // Aplicar la nueva posición al estilo
            this.alienDiv.style.left = `${this.x}px`;
            this.alienDiv.style.top = `${this.y}px`;
    
            // Cambiar dirección si llega a los bordes horizontales
            if (this.x > (dimensiones.anchoPantalla - this.alienDiv.offsetWidth)) {
                direccion = -1;
            } else if (this.x < 0) {
                direccion = 1;
            }
    
            // Reiniciar posición si sale de los bordes verticales
            if (this.y > dimensiones.altoPantalla) {
                this.y = 0;
                if(velocidad <= 15) velocidad++; 
                console.log(velocidad)
                this.alienDiv.classList.add('enfadado');
                opacidad = Math.min(opacidad + 0.1, 1);
                this.alienDiv.style.opacity = opacidad.toString();
            }
    
            // Verificar colisión
            this.comprobarColision();
    
            // Llamar a moverPaso de nuevo usando `requestAnimationFrame`
            requestAnimationFrame(moverPaso);
        };
    
        moverPaso(); // Inicia el bucle de movimiento
    }
    
    comprobarColision() {
        // Si ya hubo colisión, no hacemos nada
        if (this.colisionDetectada) return;

        if (impacto(navin.nave, this.alienDiv)) {
            this.colisionDetectada = true; // Marcamos que ya hubo colisión
            navin.vidas--; // Reducimos las vidas
           
    
            if (navin.vidas <= 0) {
                document.getElementById('sonido-fin').play();
               document.getElementById('centro').style.display = 'block'
                navin.nave.remove(); // Eliminamos la naver
                vidasMonitor.innerHTML='';
                // Aquí puedes llamar a una función para finalizar el juego.
            } else {
                this.reiniciarNave();
            }

            // Reiniciar la bandera después de un tiempo (opcional)
            setTimeout(() => {
                this.colisionDetectada = false; // Permitimos nuevas colisiones
            }, 500); // Ajusta el tiempo según tus necesidades
        }
    }

    reiniciarNave() {
        navin.nave.remove(); // Eliminamos la nave actual
        arrancarJuego(navin.vidas); // Reiniciamos el juego con las vidas restantes

        // Actualizamos el marcador de vidas en el DOM
        
        if (vidasMonitor && vidasMonitor.firstElementChild) {
            vidasMonitor.firstElementChild.remove(); // Eliminamos un corazón o marcador de vida
        }
    }
    
}

class AlienGenerator {
    constructor(veces) {
        this.veces = veces;
    }
   iniciarGeneracion(tipo,rangoH,rangoV) {

        if (this.veces <= 0) return;
        const intervaloRandom = (Math.random() * 5 + 1) * 1000;
        setTimeout(() => {
            const alien = new Alien();// Crear una instancia de Alien
            
            alien.cambiarTipo(tipo);
            alien.moverAlien(rangoH,rangoV);
            aliens.push(alien);
            this.veces--;  
          
            this.iniciarGeneracion(tipo, rangoH, rangoV); // Continuar generando
        }, intervaloRandom);





        
    }
    obtenerVeces() {
        return this.veces; // Método para devolver el valor actual de `veces`
    }
}
class Aguila {
    constructor(color, velocidad, x, y, municion, vidas) {
        this.color = color || '#fff';
        this.velocidad = velocidad || 3;
        this.nave = this.crearAguila();
        this.x = x;
        this.y = y || 40;
        this.municion = municion || 5;
        this.vidas = vidas || 3;
        this.realizarDisparo()
        /*    this.disparar(); */
        this.moverAguila()
    }
    getVidas() {
        return this.vidas;
    }
    crearAguila() {
        let nave = document.createElement('div')
        nave.setAttribute('id', 'nave');
        nave.innerHTML = `<svg width="27" height="33" viewBox="0 0 27 33" fill="none" <svg width="27" height="33" viewBox="0 0 27 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 15V18H21V12H18V6H15V0H11.9776L12 6H9V12H6V18H3.02239V15H0V21V24V30H3.02239H6.04478V29H9.06716V33H18V29H21V30H24.1791H27V24V22.5V21V15H24Z" fill="${this.color}"/><path d="M12 16H15V19H18V25H15V22H12V25H9V19H12V16Z" fill="#f40"/><rect y="15" width="3" height="3" fill="#f40"/><rect x="24" y="15" width="3" height="3" fill="#f40"/></svg>`

        setTimeout(() => { 
            panta.appendChild(nave);
        }, 2500); 
        return nave;
    }
    
    realizarDisparo() {
        let carga = false;
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && !carga) {
                if (this.municion > 0) {
                this.disparar();
                document.getElementById('sonido-laser').play();
        
                this.municion--
                document.getElementById('disparos').innerHTML = document.getElementById('disparos').innerHTML.slice(0, -1);
                if(this.municion === 0){
                    carga=  true;
                }
            }
            }
        });
        document.addEventListener('keyup', (e) => {
            if (this.municion <= 0 && this.municion > -1) {
                
                if (e.key === ' ' && carga) {
                   /*  let i = 0; // Contador manual */
                    const intervalo = setInterval(() => {
                        if (this.municion < 5) {
                            document.getElementById('sonido-cargando').play();
                            this.municion += 1;
                            disparos.innerHTML += '█';
                     /*        i++; */
                        } else {
                            clearInterval(intervalo); // Detenemos el intervalo cuando se alcanza 5
                            carga = false;
                            document.getElementById('sonido-cargando').pause();
                        }
                    }, 700); // Cada iteración 
                }
            }
        });
    }
    moverAguila() {
        this.x = 0;
        let dirH = 1;

        document.addEventListener('keydown', (event) => {

            if (event.key === 'ArrowLeft') {
                dirH = -1;


            } else if (event.key === 'ArrowRight') {
                dirH = 1;
            }

        });


        document.addEventListener('keydown', (evento) => {
            const tecla = evento.key.toLowerCase(); // Convertimos la tecla a minúsculas

            if (tecla === 'z') {
                if(this.velocidad > 0){
                this.velocidad -= 0.5; 
                }
                // Disminuye la velocidad
            } else if (tecla === 'a') {
                this.velocidad += 0.5; // Aumenta la velocidad
            }
        });
        let moverH = () => {
            if (this.nave === null) {
                return
            }
            this.x = this.x + 2 * dirH * this.velocidad; // velocidad horizontal
            this.nave.style.left = this.x + "px";
            //let anchoVentana = panta.offsetWidth;
            if (this.x > (dimensiones.anchoPantalla - this.nave.offsetWidth)) {

                dirH = -1
            }
            else if (this.x < 0) {
                dirH = 1
            }
            setTimeout(moverH, 20);
        }
        moverH(); 
        let topActual = this.y;
        let moverV = () => {
            let direccion = 1; // Inicia  Estado de movimiento
           
            let enMovimiento = true; // Estado de movimiento
            document.getElementById('sonido-reactor').play();
            const fuego = document.createElement('div')
            fuego.innerHTML = '<img src="img/fuego.svg">'
            fuego.setAttribute('id','fuego')
            this.nave.appendChild(fuego)  

            const moverPaso = () => {
               
                if (!enMovimiento){
                     return;   
                } 
                
         

                if (this.y >= 200) { 
                    console.log('this.y es ' + this.y)
                    if(document.getElementById('fuego')){
                          document.getElementById('fuego').remove()  
                    }
                 
                    direccion = -1;
       
                
                } else if (this.y <= topActual && direccion === -1) {
              
                    enMovimiento = false; // Detener el movimiento
                    return; // Salir de la función
                }

                this.y += 5 * direccion; // Actualizar posición
                this.nave.style.bottom = this.y + "px";

                // Continuar el movimiento
                requestAnimationFrame(moverPaso);
            };
            moverPaso(); 
        };
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'ArrowUp') {
                moverV();
            }
        });

    }

    disparar() {
        if (this.municion <= 0) {
            return;
        } else {

            let disparo = document.createElement('div')
            disparo.classList.add('disparo');

            disparo.style.top = this.nave.offsetTop + "px";
            disparo.innerHTML = '<svg width="1" height="10" viewBox="0 0 1 10" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="40" fill="#0f0"/></svg>';
            /*          */
            disparo.style.left = (this.nave.offsetLeft + this.nave.offsetWidth / 2) + 'px';
            panta.appendChild(disparo);
            let moverPaso = () => {
                let posY = disparo.offsetTop;
                posY -= 5;
                disparo.style.top = posY + "px";
                setTimeout(moverPaso, 5);
                if (disparo.offsetTop < 0) {
                    disparo.remove()
                }

                const aliens = document.querySelectorAll('.alien .core-alien')
                for (let alien of aliens) {
                    let opacidad = parseFloat(window.getComputedStyle(alien.parentElement).opacity);

                    if (impacto(disparo, alien)) {
                        document.getElementById('sonido-bomba').play();
                        switch (opacidad) {
                            case 0.5:
                                puntos.innerHTML = parseInt(puntos.innerHTML) + 500;
                                break;
                            case 0.6:
                                puntos.innerHTML = parseInt(puntos.innerHTML) + 400;
                                break;
                            case 0.7:
                                puntos.innerHTML = parseInt(puntos.innerHTML) + 300;
                                break;
                            case 0.8:
                                puntos.innerHTML = parseInt(puntos.innerHTML) + 200;
                                break;
                            case 0.9:
                                puntos.innerHTML = parseInt(puntos.innerHTML) + 100;
                                break;
                            case 1.0:
                                puntos.innerHTML = parseInt(puntos.innerHTML) + 50;
                                break;
                            default:
        
                        }

                        destruidas--
                        restantes.innerHTML = `${destruidas}`
                        let posiX = alien.parentElement.offsetLeft;
                        let posiY = alien.parentElement.offsetTop;
                        disparo.remove();
                        alien.parentElement.remove();
                        let alienDestruido = document.createElement('div');
                        alienDestruido.classList.add('alien-destruido')
                        alienDestruido.style.left = posiX + "px";
                        alienDestruido.style.top = posiY + "px";
                        alienDestruido.innerHTML = `<svg width="30" height="30" viewBox="0 0 33 34"  xmlns="http://www.w3.org/2000/svg" class="roto"><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" />              <rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /><rect x="26" y="26" width="1" height="1" /></svg>`;
                        panta.appendChild(alienDestruido)

                        panta.style.backgroundColor = '#fff';




                        setTimeout(() => {
                            alienDestruido.style.opacity = 0;
                            alienDestruido.style.transform = 'scale(4)';
                            let trozos = alienDestruido.querySelectorAll('rect')
                            for (let trozo of trozos) {

                                const randomX = Math.random() * 50 - 25;
                                const randomY = Math.random() * 50 - 25;

                                const fuegoRandom = ['#fff', '#0ff', '#0f0', '#ff0', '#ff0', '#fff'];
                                trozo.style.fill = fuegoRandom[Math.floor(Math.random() * fuegoRandom.length)];
                                // Aplicar la transformación
                                trozo.style.transform = `translate(${randomX}px, ${randomY}px)`;
                            }
                            panta.style.backgroundColor = '#000';
                            setTimeout(() => {
                                alienDestruido.remove()
                                return;
                            }, 10000);
                        }, 50); //
                        if (destruidas <= 0) {
                            cambiarFase()
                            document.getElementById('sonido-nivel').play();
                        }

                        return;

                    }
                }

            }
            moverPaso()
        }
    }
}


let aliens = [];
let generador;
let destruidas;
let fase = 0;
function cambiarFase() {
    fase++;

    if (fase === 1) {
        generador = new AlienGenerator(10) 
     destruidas = generador.obtenerVeces();
        generador.iniciarGeneracion('miguelito',2,0.5);

        restantes.innerHTML = 10;
    } else if (fase === 2) {
        generador = new AlienGenerator(15);
        destruidas = generador.obtenerVeces();
        generador.iniciarGeneracion('bisho',3,1);
        restantes.innerHTML = 15;
    }
    else if (fase === 3) {
        generador = new AlienGenerator(35);
        generador.iniciarGeneracion('malote',3,0.7);
        destruidas = generador.obtenerVeces();
        restantes.innerHTML = 35;
    }
    else if (fase === 4) {
        generador = new AlienGenerator(40);
        generador.iniciarGeneracion('calamar',4,1);
        destruidas = generador.obtenerVeces();
        restantes.innerHTML = 40;
    }
}
disparos.innerHTML = `█████`
function arrancarJuego(vidas) {
    const introElement = document.getElementById('intro');
document.getElementById('sonido-banda').play();
    if (introElement) {
        introElement.remove();
    }

    if (vidas > 0) {
        navin = new Aguila('#fff', 3, 0, 40, 5, vidas);
    } else {
       
        navin.firstElementChild.remove()
        navin = null; // Dejamos explícito que `navin` ya no existe
    }
}

document.getElementById('comenzar').addEventListener('click', () => {
    arrancarJuego(3)
cambiarFase()
})

/*ESTRELLAS*/
class Estrella {
    constructor() {
        this.y = 0;

        this.moverEstrella();


    }
    moverEstrella() {
        let moverPaso = () => {
            this.y += 1; 
            document.getElementById('panta').style.backgroundPosition = `0px ${this.y}px`;
            requestAnimationFrame(moverPaso);
        };
        moverPaso();
    }
}
new Estrella();