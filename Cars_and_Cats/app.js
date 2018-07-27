const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response){
    console.log('client request URL: ', request.url);

    if(request.url === '/'){
        fs.readFile('./views/index.html', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }

    else if(request.url === '/cars'){
        fs.readFile('./views/cars.html', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }

    else if(request.url === '/images/download.jpeg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/download.jpeg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }
    
    else if(request.url === '/images/images.jpeg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/images.jpeg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }

    else if(request.url === '/images/images2.jpeg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/images2.jpeg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }

    else if(request.url === '/cats'){
        fs.readFile('./views/cats.html', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }

    else if(request.url === '/images/tc1.jpeg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/tc1.jpeg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }

    else if(request.url === '/images/thundercats.jpeg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/thundercats.jpeg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
    }

    else if(request.url === '/cars/new'){
        fs.readFile('./views/order.html', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else{
        response.writeHead(404);
        response.end("File Not Found!!!");
    }
})

server.listen(7077);

console.log("Running on localhost at port 7077");