// Basics of Node js

// 1. Global object
/* In Node we can access a global object
For example inside the browser let say we have the window
This window is our global object
The following line print all the global objects that we currently have
*/

// console.log(global);
/* Output =>
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 50.52469992637634,
      nodeStart: 0.8685998916625977,
      v8Start: 3.6735999584198,
      bootstrapComplete: 37.7542998790741,
      environment: 18.94569993019104,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1662305708773.104
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
*/
/* we can access all the properties of this global object for example. we can accesst the setTimeout method */

// setTimeout(() => {
//     console.log('Inside setTimeout');
// }, 3000)

// console.log(__dirname);
// console.log(__filename)

/* Note => we cannont access any property or method that does not belong to our global object */

//====
// 2. importing files in another file
// const tempName = require('<Path of the file>')
// while importing if your module exports an object with different properties you can destructure the properties
// you need like so;
// const { propName } = require('<Path>);

//====
// 3. Exporting files so that they can be imported.
// add at the last of the file the following line
// module.exports = <object or array or whatever you want to export>
// to export multiple things create an object of all the properties you want to export and assign it to module.exports

//==
// 4. importing and working on some inbuilt modules.
/* a. OS module
const os = require('os');
console.log(os.platform(), os.homedir()); */
// b. File System
// const fs = require('fs');
// i. read files
/*
fs.readFile('C:/Users/Asus/Desktop/meilisearch_notes.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
})
 */
/* fs.readFile is an async function */
// ii. write files
/*fs.writeFile(`${__dirname}/test.txt`, 'Hello World', () => {
    console.log('The file is created and the content is written')
})*/
/* Note => if the file exits it will change the prev content. If the file doesn't exists
it will create that file in the specified location and then write the constent. It is an asyc function */
// iii. directories
/* => making directories */
/*
fs.mkdir('./assets', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Directory created successfully');
    }
})
*/
/* So its better to check if the folder already exists or not */
/*
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Folder created successfully');
        }
    })
} else {
    console.log('Folder already present');
}
*/
/* => removing or deleting a directory */
/* if (fs.existsSync('./assets')) {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Directory removed successfully');
        }
    })
} else {
    console.log('No such directory exist');
} */
/* Note => if the specified folder already exists then it will throw an error */
// iv. delete files
/*
if (fs.existsSync('./test.txt')) {
    fs.unlink('./test.txt', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File deleted successfully');
        }
    })
} else {
    setTimeout(() => {
        console.log('No such file present!');
    }, 3000)
    fs.writeFile('./test.txt', 'This file is meant to be deleted', (err)=> {
        if (err) {
            console.log(err);
        } else {
            console.log('The file was created');
        }
    })    
} */
/* Note => This is an async function */

// 4. Streams and Buffers
// a. Streams:
/*
Lets say we have a huge data in a file.
Now we can wait for the ewhole file to be read and then perform some task
Or we can pass small part of the data at a time into a buffer
So we keep adding small parts of data to the buffer and use these data one by one from the buffere
Best example is the buffering in Youtube. Small bits of video is shown will the remaining is loaded from the server
*/
/*
const fs = require('fs')
// create stream
const readStream = fs.createReadStream('./largeFile.txt');
const writeStream = fs.createWriteStream('./newFile.txt');

readStream.on('data', (chunk) => {
    console.log('----------------------New Chunk------------------------------');
    console.log(chunk.toString());
    writeStream.write('\n----------------------New Chunk-------------------------------------')
    writeStream.write(chunk)
}) */

// 5. Piping
/*
Piping is a more efficient way of taking small chunks of data at a time and working with it
*/
const fs = require('fs')

const readStream = fs.createReadStream('./largeFile.txt');
const writeStream = fs.createWriteStream('./newFileWithPiping.txt');

// so the the block of code from line 168 to 173 ca be narrowed down to a single line like so:
readStream.pipe(writeStream)