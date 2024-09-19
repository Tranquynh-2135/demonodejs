import http from "node:http";
import os from "node:os"
import fs from "node:fs"
import EventEmitter from "node:events";

const list = {
      OSTYPE : os.type(),
      Platform: os.platform(),
      RAM: os.totalmem(),
      USERAM: os.freemem(),
      CPU: os.cpus(),
}
let output = 'OSTYPE: ' + list.OSTYPE + '\n' +
             'Platform: ' + list.Platform + '\n' +
             'RAM: ' + list.RAM + '\n' +
             'USERAM: ' + list.USERAM + '\n' +
             'CPU: ' + JSON.stringify(list.CPU, null, 2) + '\n';
// câu 1
http
  .createServer((request, response) => {
    
      response.write((output))
      response.end();
  })
  .listen(8080); // Activates this server, listening on port 8080.


fs.writeFileSync("D:/Homework.txt", output, (err) => {
      if (err) {
          console.error("Lỗi khi ghi file:", err);
      } else {
          eventEmitter.emit('fileSaved');
      }
  } )

const eventEmitter = new EventEmitter();
eventEmitter.on('fileSaved', () => {
      console.log('Completed task!');
});




