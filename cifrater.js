// Archivo que se encarga de cifrar

var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var cryptico = require('cryptico');
var defaultPath = "C:/apaso/";
var path = "C:/apaso/cifrados/";

function cifrater(){

  let dirname = defaultPath;

  if(document.getElementById("path").value != "")
    dirname = document.getElementById("path").value;

  let fileNameTxt = document.getElementsByClassName("file0")[0].innerHTML;
  let filePathAndName = dirname + "/" + fileNameTxt;
    console.log(filePathAndName);

  fs.readFile(filePathAndName, function read(err, data)
  {
    if (err)
    {
        console.log("error");
    }
    let file = data;
    // document.getElementById("error").innerHTML = file;

    // Creamos la key de RSA
    var PassPhrase = "The Moon is a Harsh Mistress.";
    var Bits = 1024;

    var RSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
    console.log(RSAkey);

    // Creamos la key publica
    var PublicKeyString = cryptico.publicKeyString(RSAkey);
    console.log(PublicKeyString);

    var message = file.toString();
    //Ciframos
    var EncryptionResult = cryptico.encrypt(message, PublicKeyString);
    console.log(EncryptionResult);
    var message2 = EncryptionResult.cipher.toString();

    let fileName = path + fileNameTxt;
    console.log(fileName);
    fs.writeFile(fileName, message2, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      console.log("Todo ok");
    });
    //Desciframos
    var DecryptionResult = cryptico.decrypt(message2, RSAkey);
    console.log(DecryptionResult);
    var message3= DecryptionResult.plaintext.toString();
    let fileName2 = path + "Holades.txt";
    console.log(fileName2);
    fs.writeFile(fileName2, message3, (err) => {
      if(err){
        printMSG("Error al escribir el archivo.");
      }
      console.log("Todo ok");
    });

  });
}
