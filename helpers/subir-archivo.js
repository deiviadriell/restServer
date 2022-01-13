const { v4: uuidv4 } = require('uuid');
const path = require('path');
const subirArchivo = ( files, extensionesPermitidas = ['png', 'jpg', 'jpeg','gif'], carpeta='') => {

    return new Promise((resolve, reject) => {
        const {archivo }  = files; 
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length-1];
        //validar la extensión       
        
        if( !extensionesPermitidas.includes ( extension)){
            return reject(`La extensión ${ extension} no es permitida, extensiones válidas ${extensionesPermitidas}`);
        }
        const nombreTemp = uuidv4()+ '.'+extension;
        const uploadPath = path.join(__dirname,'../uploads/', carpeta, nombreTemp);  
        archivo.mv(uploadPath, (err) => {
            if (err) {
              reject(err);
            }
            resolve(nombreTemp);
        });

    });
    

}

module.exports = {
    subirArchivo
}