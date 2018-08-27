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

            })
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

// root Scope
(function () {
    const express = require('express');
    const app = express();
    app.set('port', process.env.PORT || 3000);

    app.get('/:paran?', (req, res) => {
        // service Call
        // classStructure()
        console.log('bla1');

        // Browser Return
        res.status(200).json({
            attr: req.params.paran || 'Oi'
        });
    });

    app.listen(app.get('port'), () => console.log(`App listening on *:${app.get('port')}`));
}());