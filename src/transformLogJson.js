const fs = require('fs');
// const readline = require('readline');
const path = require('path');
// const dateFormat = require('dateformat');

// var fo;lder = process.argv.slice(1);
// var filenum = process.argv.slice(2);

// if (folder.length === 0) {
//     console.log('Path invalid.');
//     return;
// };

// var pathFile = folder[1];
// if (filenum) {
//     var filename = fs.readdirSync(pathFile)[filenum[1]];
// }

var extension = ".txt";
// var filesCount = 0;

function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

var arrayMetodos = [];
function countMetodos(...props) {
    let [classe, metodo] = props;

    var achou = arrayMetodos.find(x => {
        return (x.metodo === metodo && x.classe === classe);
    })
    if (!achou) {
        arrayMetodos.push({ classe: classe, metodo: metodo, count: 1 });
        return;
    }
    achou.count++
}

function ordenar(prop) {
    // console.log(prop)
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
}

function loadFile(file, callback) {
    var data = file;
    console.log("Lendo: Arquivo");
    var arrayResult = [];
    var parentObj = [];
    // var filename = "./data" + filesCount + ".json";
    data.toString().split('\n').forEach(
        function (line) {
            var linex = line;
            var obj = {};
            var cont = 1;
            var value = "";
            while (cont <= 16) {
                if (linex.indexOf(";") >= 0) {
                    value = linex.substr(0, linex.indexOf(";"));
                    linex = linex.substring(linex.indexOf(";") + 1, linex.length);
                } else {
                    value = linex.substr(0, linex.length);
                }

                switch (cont) {
                    case 1: obj.cliente = value; break;
                    case 2: obj.chamada = padLeft(value, 4); break;
                    case 3:
                        obj.chamada += '.' + value;
                        obj.call = value;
                        break;
                    case 4:
                        obj.chamada += '.' + padLeft(value, 2);
                        obj.nivel = padLeft(value, 2);
                        obj.chave = obj.call + obj.nivel;
                        break;
                    // case 5: obj.pool = value; break;
                    case 6: obj.tipo = value; break;
                    case 7: obj.pool = value; break;
                    case 8: obj.pool = value + ' - ' + obj.pool; break;
                    case 9: obj.conexao = value; break;
                    case 10: obj.usuario = value; break;
                    case 12: obj.data = value; break;
                    case 13: obj.hora = value; break;
                    case 14: obj.classe = value; break;
                    case 15:
                        obj.metodo = value;
                        obj.title = obj.chamada + ' ' + obj.classe + '.' + obj.metodo + ' ' + obj.tipo;
                        break;
                    case 16: obj.consulta = value.replace(/\r/, ''); break;
                    case 17: obj.a = value; break;
                    case 18: obj.erro = value; break;
                    case 19: obj.travado = value; break;
                    case 20: obj.b = value; break;
                    case 21: obj.duracao = value; break;
                    default: break;
                }
                cont++;
            }
            countMetodos(obj.classe, obj.metodo);
            obj.childCalls = []
            // console.log(parentObj[parentObj.length - 1]);
            if (parentObj[parentObj.length - 1]) {
                obj.parent = parentObj[parentObj.length - 1];
            } else {
                obj.parent = null
            }
            defineChildCall(arrayResult, obj.parent, obj.call);
            if (obj.tipo === 'ENTRADA') {
                parentObj.push(obj.call);
            }
            if (obj.tipo === 'SAIDA') {
                parentObj.pop();
            }
            // console.log(parentObj);
            arrayResult.push(obj);
            //process.stdout.write("#");
            //fs.appendFileSync(filename, JSON.stringify(obj)+",");
        }
    );
    arrayMetodos.sort(ordenar('count'));
    // console.log(arrayMetodos);
    let retorno = { dadosarquivo: arrayResult, hiddenAnalise: false };
    console.log(retorno);
    callback(retorno);
    //fs.appendFileSync(filename, "]");
    // fs.writeFileSync(filename, JSON.stringify(arrayResult), "utf-8");
};

function defineChildCall(data, parent, child) {
    // if (!parent) { return; }
    // var reg = data.find(x => {
    //     return x.call === parent
    // })
    // console.log(reg);
    // console.log(reg.childCalls);
    // reg.childCalls = [...reg.childCalls, child];
}

export function loadDirectory(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function (x) {
        var filename = dir + x;
        if (fs.lstatSync(filename).isDirectory()) {
            //dirCount += 1;
            filename += '\\';
            //loadDirectory(filename);
        };
        if (fs.lstatSync(filename).isFile()) {
            var fileExt = path.extname(filename);
            if ((extension !== '.*') && (fileExt !== extension)) return;
            // filesCount += 1;
            if ((extension === '.*') || (extension)) {
                loadFile(filename);
            }
        };
    });
};

// var dtStart = new Date();
// if (filename) {
//     loadFile(pathFile + filename);
//     arrayMetodos.sort(ordenar('count'))
//     console.log(arrayMetodos);
//     return;
// }
// loadDirectory(pathFile);
// var dtEnd = new Date();


export default loadFile;
