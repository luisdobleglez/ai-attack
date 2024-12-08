//Pantalla

const panta = document.getElementById('panta')
const salida = document.getElementById('salida')
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
    
    salida.innerHTML = `Ancho de pantalla: ${anchoPantalla} <br>Alto de pantalla: ${altoPantalla}<br>`;
    
    // Retornamos el ancho y alto
    return { anchoPantalla, altoPantalla };
}

// Llamamos a la función al inicio
const dimensiones = ajustarPantalla();
window.addEventListener('resize', ajustarPantalla);

// Ahora puedes acceder a las dimensiones cuando llames la función
console.log(dimensiones.anchoPantalla, dimensiones.altoPantalla);




class Alien {
    constructor(color, x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.color = color || this.generarColorRandom();
        this.alienDiv = this.crearAlien();
        this.moverManos();
        this.moverAlien();
    }

    generarColorRandom() {
        const coloresRandom = ['#ff0', '#0ff', '#f0f', '#f00', '#0f0', '#00f'];
        return coloresRandom[Math.floor(Math.random() * coloresRandom.length)];
    }

    crearAlien() {
        let alien = document.createElement('div');
        alien.classList.add('alien');
        alien.innerHTML = `
            <svg class="cabeza vivo" width="21" height="23" viewBox="0 0 21 23" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" fill="${this.color}" clip-rule="evenodd" d="M15 0H6V4H3V7H0V13H3V16H6V20H9V23H12V20H15V16H18V13H21V7H18V4H15V0ZM18 7V13H15V7H18ZM3 13V7H6V13H3Z" class="cambiacolor" />
                <rect x="6" y="17" width="9" height="3" fill="#fff" />
                <rect y="20" width="6" height="3" class="cambiacolor" fill="${this.color}" />
                <rect x="15" y="20" width="6" height="3" class="cambiacolor" fill="${this.color}" />
            </svg>
            <svg width="27" height="3" viewBox="0 0 27 3" xmlns="http://www.w3.org/2000/svg" class="manos vivo">
                <rect width="3" height="3" class="cambiacolor" fill="${this.color}" />
                <rect x="24" width="3" height="3" class="cambiacolor" fill="${this.color}" />
            </svg>
        `;
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

    moverAlien() {
        let direccion = 1;
        let velocidad = 1;

        const moverPaso = () => {
            if (!this.alienDiv) return;

            this.x += 3 * direccion; // velocidad horizontal
            this.y++;
            this.alienDiv.style.left = `${this.x}px`;
            this.alienDiv.style.top = `${this.y * velocidad}px`;


            if (this.x > (dimensiones.anchoPantalla - this.alienDiv.offsetWidth)) {
                direccion = -1;
            } else if (this.x < 0) {
                direccion = 1;
                /*    } else if (this.y > window.innerHeight) { */
            } else if (this.y > dimensiones.altoPantalla) {
                /* this.borrarAlien(); */
                /* this.alienDiv.style.top = `${this.y}px` */
                console.log(this.y)
                console.log(dimensiones.altoPantalla)
                this.y = 0;
                //Aquí para cambiar el alien
                velocidad++

            }

            setTimeout(moverPaso, 20);
        };

        moverPaso();
    }

    moverManos() {
        const manos = this.alienDiv.querySelectorAll('.manos');
        manos.forEach((mano) => {
            let posicion = 0;
            setInterval(() => {
                mano.style.bottom = posicion === 0 ? '6px' : '0px';
                posicion = posicion === 0 ? 6 : 0;
            }, 200);
        });
    }
}

class AlienGenerator {
    constructor(veces) {
        this.veces = veces;
        // alert(`Número de aliens a generar: ${this.veces}`); // 
        // this.iniciarGeneracion();
    }

    iniciarGeneracion() {
        if (this.veces <= 0) return;
        const intervaloRandom = (Math.random() * 5 + 1) * 1000;
        setTimeout(() => {
            const alien = new Alien(); // Crear una instancia de Alien
            aliens.push(alien); // Almacenar la instancia en el array global
            this.veces--;
            this.iniciarGeneracion(); // Continuar generando
        }, intervaloRandom);

    }
    obtenerVeces() {
        return this.veces; // Método para devolver el valor actual de `veces`
    }
}



function impacto(o1, o2) {
    const rect1 = o1.getBoundingClientRect()
    const rect2 = o2.getBoundingClientRect()

    return !(
        rect1.top > rect2.bottom || rect1.bottom < rect2.top || rect1.left > rect2.right || rect1.right < rect2.left

    );

}


class Aguila {
    constructor(color, velocidad, x) {
        this.color = color || '#fff';
        this.velocidad = velocidad || 3;
        this.nave = this.crearAguila();
        this.x = x;
        this.realizarDisparo()
        this.disparar();
        this.moverAguila()

    }
    crearAguila() {
        let nave = document.createElement('div')
        nave.setAttribute('id', 'nave');
        nave.innerHTML = '<svg width="45" height="48" viewBox="0 0 45 48"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M27 9H24V0H21V9H18V21H15V27H12V30H9V33H6V36H3V30H0V48H3V45H6V42H9V39H12H15V38H18V42H21V48H24V42H27V38H30V39H33H36V42H39V45H42V48H45V30H42V36H39V33H36V30H33V27H30V21H27V9ZM27 33V27H24V24H21V27H18V33H21V30H24V33H27Z" fill="' + this.color + '" />  <path fill-rule="evenodd" clip-rule="evenodd" d="M21 24H24V27H27V33H24V30H21V33H18V27H21V24Z" fill="#FF4637" /><rect x="9" y="15" width="3" height="6" fill="#FF4637" /><rect x="33" y="15" width="3" height="6" fill="#FF4637" /><rect x="42" y="24" width="3" height="6" fill="#FF4637" /><rect y="24" width="3" height="6" fill="#FF4637" /></svg>'
        panta.appendChild(nave);
        return nave;
    }
    realizarDisparo() {
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                this.disparar();
            }
        });
    }



    moverAguila() {
        this.x = 0;
        let direccion = 1;




        document.addEventListener('keydown', (event) => {

            if (event.key === 'ArrowLeft') {
                direccion = -1;

            } else if (event.key === 'ArrowRight') {
                direccion = 1;
            }

        });


        document.addEventListener('keydown', (evento) => {


            if (evento.key === 'ArrowDown') {
                this.velocidad = this.velocidad - 0.5;


            } else if (evento.key === 'ArrowUp') {
                this.velocidad = this.velocidad + 0.5;
            }


        });
        let moverPaso = () => {
            if (this.nave === null) {
                return
            }
            this.x = this.x + 2 * direccion * this.velocidad; // velocidad horizontal
            this.nave.style.left = this.x + "px";
            //let anchoVentana = panta.offsetWidth;
            if (this.x > (dimensiones.anchoPantalla - this.nave.offsetWidth)) {
               
                direccion = -1
            }
            else if (this.x < 0) {
                direccion = 1
            }
            // Verificar la colisión con los aliens
            for (let alien of aliens) {
                if (impacto(this.nave, alien.alienDiv)) {
                  
                    return;
                }
            }


            setTimeout(moverPaso, 20);
        }
        moverPaso();



    }


    disparar() {
        let disparo = document.createElement('div')
        disparo.classList.add('disparo');
        disparo.innerHTML = '<svg width="2" height="40" viewBox="0 0 2 40" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="40" fill="#00FF00"/></svg>';
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

            const aliens = document.querySelectorAll('.alien')
            for (let alien of aliens) {



                if (impacto(disparo, alien)) {

                    destruidas--
                    salida.innerHTML += `<br>Aliens restantes ${destruidas}`
                    let posiX = alien.offsetLeft;
                    let posiY = alien.offsetTop;
                    disparo.remove();
                    alien.remove();
                    let alienDestruido = document.createElement('div');
                    alienDestruido.classList.add('alien-destruido')
                    alienDestruido.style.left = posiX + "px";
                    alienDestruido.style.top = posiY + "px";
                    alienDestruido.innerHTML = `<svg width="30" height="30" viewBox="0 0 33 34"  xmlns="http://www.w3.org/2000/svg" class="roto">
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />
                    <rect x="26" y="26" width="1" height="1" />

                    </svg>`;
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


                    return;

                }
            }

        }
        moverPaso()
    }
}






let aliens = [];
const generador = new AlienGenerator(20);
function gestionarFases() {
    let intro = document.getElementById('intro');
    intro.remove()
    const xwing = new Aguila('#fff', 3)
    generador.iniciarGeneracion()
}
let destruidas = generador.obtenerVeces();
salida.innerHTML += `Naves aliens restantes ${destruidas}`
document.getElementById('comenzar').addEventListener('click', gestionarFases)



