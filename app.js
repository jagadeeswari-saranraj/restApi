var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use( bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

 //var course_list;
 //[
//     { id: 11, courseName: 'Angular6' },
//     { id: 12, courseName: 'Python' },
//     { id: 13, courseName: 'PHP' },
//     { id: 14, courseName: 'NodeJs' },
//     { id: 15, courseName: 'Mechine Learn' },
//     { id: 16, courseName: 'Architecture' },
//     { id: 17, courseName: 'Ionic' },
//     { id: 18, courseName: 'Java' },
//     { id: 19, courseName: 'ASP Dot Net' },
//     { id: 20, courseName: 'c#' }
//   ];

function getcourse() {
    fs.readFile(__dirname + '/course_list.json', 'utf8', function (err, data) {
        if (err) throw err;
        var course_list = JSON.parse(data);
        console.log(course_list);
      });
    return course_list;
}

app.get('/course_list', function(req,res){
    res.json(getcourse());
    //res.json(course_list);
});

app.post('/create_course',(req, res) => {
     var formdata = {
         id : req.body.id,
         courseName : req.body.courseName
     }

     res.json(addcourse(formdata));

})

function addcourse(formdata){
    var obj;
    fs.readFile(__dirname + '/course_list.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj= JSON.parse(data);
        obj.push(formdata);
        var json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(__dirname + '/course_list.json', json, 'utf8',(err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("Data is added");
        }); // write it back 
    }});
    return obj;
}

app.put('/edit/:id', function(req, res) {
    var id = req.params.id;
    var courseName = req.body.courseName;

    res.json(editCourse(id,courseName));

    // read in the JSON file
    
});

function editCourse(id,name){
    var obj;
    fs.readFile(__dirname + '/course_list.json', 'utf8', function readFileCallback(err, data){
        if(err){
            console.error("error",err);
        } else {
         obj = JSON.parse(data);
         obj.find((obj) => obj.id == id).courseName = name;
         var json = JSON.stringify(obj);
        fs.writeFile(__dirname + '/course_list.json', json, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }else{
            console.log("Data is updated");
            }
        });
        }
    });
      
      return obj;
}

app.delete('/delete/:id', function(req, res) {
    var id = req.params.id;
    console.log("id",id);
    res.json(deleteCourse(id));

    // read in the JSON file
    
});

function deleteCourse(id){
    var obj;
    fs.readFile(__dirname + '/course_list.json', 'utf8', function readFileCallback(err, data){
        if(err){
            console.error("error",err);
        } else {
         obj = JSON.parse(data);
        // console.log("obj", obj)
            for(var i=0; i<obj.length; i++){
                if(obj[i].id == id){
                    delete obj[i];
                    
                }
            }
           
         var json = JSON.stringify(obj);
         console.log('get', json);
        fs.writeFile(__dirname + '/course_list.json', json, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }else{
            console.log("Data is Deleted");
            }
        });
        }
    });
      
      return obj;
}

app.listen(8086);
console.log("Server 8086 is working");