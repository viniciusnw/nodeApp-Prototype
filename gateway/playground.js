// ========================= PROMISE

/** Promise */
function promiseStructure() {
    const robot = Object.create({
        attr: 'robot',

        speak: (word) => {
            return new Promise((resolve, reject) => {
                var type = typeof word;
                setTimeout(() => {
                    if (type == 'string') resolve(word);
                    else reject('Não sei contar'); // reject(Error(word));
                }, 2000);

            });
        }
    });

    robot.speak('bla').then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

// ========================= CLASS/OBJ{FUNCTION}/PROTOTYPE

/** Class Structure */
function classStructure() {

    class Robot {

        constructor(name) {
            this.name = 'Rob';
            console.log(Robot.prototype);
        }

        speak() {
            console.log(this.name);
        }

        speakReturn() {
            return {
                name: 'Zeus',
                // referencia local 'Zeus'
                sayName: function () {
                    console.log(this.name);
                },
                // referencia herdada 'Rob' || 'San'
                _sayName: () => {
                    console.log(this.name);
                }
            };
        }
    }

    class Robot2 extends Robot {
        constructor() {
            super();
            this.name = 'San';
        }
    }

    const r = new Robot2();
    r.speak();
    r.speakReturn().sayName();
    r.speakReturn()._sayName();
}

/** Function Structure */
function functionStructure() {
    function Robot() {
        this.name = 'ROBOT';

        // apenas referencia local
        this._method = () => {
            console.log(this.name);
        };

        // referencia extendida
        this.__method = function () {
            console.log(this.name);
        };
    }

    function Robot2() {
        this.name = 'ROBOT2';
    }
    Robot2.prototype = new Robot();

    var r = new Robot2();
    r._method();
    r.__method();
}

/** Final Object */
function objectStructure() {

    let Robot = {
        name: 'Rob',
        speak: function () {
            console.log(this.name);
        }
    };

    let Robot2 = {
        name: 'San',
        speak: Robot.speak,
        speakReturn: () => Robot.speak()
    };

    const r = Robot2;
    r.speak();
    r.speakReturn();
}

// ========================= RXJS

/** 
 * Observable structure 
 * 
 * # Open Documentation #
 * https://xgrommx.github.io/rx-book/index.html
 * 
 * # Oficial Documentation #
 * http://reactivex.io/
 * 
 * 
 * Subject: 
 * https://xgrommx.github.io/rx-book/content/getting_started_with_rxjs/subjects.html
 * http://reactivex.io/documentation/subject.html
 */
function getUser(id = 1) {
    var Rx = require('rxjs');
    let Subject = new Rx.Subject();

    setTimeout(() => {
        Subject.next({
            id: id,
            name: 'San'
        });
    }, 3000);

    return Subject.asObservable();
}

// root Scope
(function () {
    const express = require('express');
    
    // uses
    const app = express();
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());

    // sets
    app.set('port', process.env.PORT || 3000);
    
    // prevent GET /favicon.ico 204 status{no content}
    app.get('/favicon.ico', (req, res) => res.sendStatus(204));
    app.get('/:id?', (req, res) => {
        var headers = req.headers;
        // console.log(headers);

        getUser(req.params.id).subscribe((r) => {
            console.log(r); // Payload (ex:Odata) de retorno {data || error || warning || message}
            res.status(200).json(r); // devolve a resposta para o navegador
        });
    });

    app.listen(app.get('port'), () => console.log(`App listening on *:${app.get('port')}`));
}());