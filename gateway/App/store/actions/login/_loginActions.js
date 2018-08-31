module.exports = function login(options) {
    var suffix = ''

    this.add( {login:'SING_IN'}, SING_IN);
    function SING_IN(args, done) {
        console.log(args);
        done('SING_IN');
    }

    this.add( {login:'SING_OUT'}, SING_OUT);
    function SING_OUT(args, done) {
        console.log(args);
        done('SING_OUT');
    }

    // Init Function
    this.add('init:login', init)
    function init(args, done) {
        this.log.info("preparing something...")

        setTimeout(function () {
            suffix = '-zed'
            this.log.info("ready!")
            done();
        }, 111)
    }
}

// var plugin = function (options) {
//     this.add({
//         foo: 'bar'
//     }, function (args, done) {
//         done(null, {
//             color: options.color
//         })
//     })
// }

// this.add({
//     role: "movement",
//     cmd: "rawMoves",
// }, (msg, reply) => {
//     var err = null;
//     var rawMoves = [];

//     var pos = msg.piece.position;

//     switch (msg.piece.piece) {
//         case 'R':
//             rawMoves = rankAndFile(pos);
//             break;
//         case 'B':
//             rawMoves = diagonal(pos);
//             break;
//         case 'Q':
//             rawMoves = rankAndFile(pos)
//                 .concat(diagonal(pos));
//             break;
//         case 'K':
//             rawMoves = rankAndFile(pos, 1)
//                 .concat(diagonal(pos, 1))
//             break;
//         default:
//             err = "unhandled " + msg.piece;
//             break;
//     };

//     reply(err, rawMoves);
// });