const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

function displayProjectHmtl(response)
{
    response.sendFile(path.join(__dirname, '..', 'views', 'Project.html'));
}

router.use((request, response, next) => {
    console.log('Middleware!');
    console.log(request.body);
    next(); // Allow the request to advance to the next middleware
});


router.post('/ProjectSave', (request, response, next) => {
    /*
    let req_body = [];
    request.on('data', (chunk)=>{
        console.log('post data');
        req_body.push(chunk);
        console.log('Raw');
        console.log(chunk);
    });
    request.on('end', ()=>{
        console.log('post end');
        req_body = Buffer.concat(req_body).toString();
        console.log(req_body);
        fs.writeFileSync("./ProjectData.txt", req_body);
        console.log(request.body.Control_ProjectName);
        console.log(request.body.Control_ProjectDescription);
    });
    */
    console.log(request.body.Control_ProjectName);
    console.log(request.body.Control_ProjectDescription);   
    fs.writeFileSync("./ProjectData.txt", `Name:${request.body.Control_ProjectName}, Description:${request.body.Control_ProjectDescription}`);
    console.log("/ProjectSet");
    //response.write(fs.readFileSync("./views/Project.html")); 
    //response.end();
    displayProjectHmtl(response);
});

router.get('/Project', (request, response, next) => {
    console.log("/ProjectGet");
    //response.write(fs.readFileSync("./views/Project.html")); 
    response.end();
    displayProjectHmtl(response);
});

router.get('/WBS', (request, response, next) => {
    console.log("/WBS");
    response.send('WBS Page'); 
});

router.get('/Story', (request, response, next) => {
    console.log("/Story");
    response.send('Story Page'); 
});

router.get('/', (request, response, next) => {
    console.log("/");
    //response.write(fs.readFileSync("./views/Project.html")); 
    //response.end();
    displayProjectHmtl(response);
});


router.use((request, response, next) => {
    console.log('Another middleware! Handle 404');
    response.statusCode = 404;
    response.send('Page Not Found!'); 
    //response.send('Hello World'); // Send the answer
    //next();
});


module.exports = router;
                        

                   