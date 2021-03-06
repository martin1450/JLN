// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
let fileSystem = require("./fileSystem");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadFile('index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// console.log("dentro");
// var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
//
// let content = "Some text to save into the file";
// let fileName = "C:/apaso/prueba1.txt";
//
// fs.writeFile(fileName, content, (err) => {
// });
