var Todo = require('./models/todo');
const mailgun = require("mailgun-js");
//remove special fav from secondlast
const DOMAIN = "sandboxe7a813ef4bbb4a90be756b3dd2e016c68.mailgun.org";
const mg = mailgun({ apiKey: "ff0847bc92c4ff7f7a57f088f04503f1-a2b91229-939d0b768", domain: DOMAIN });


function getTodos(res) {
    Todo.find(function (err, todo) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todo); // return all todo in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todo
    app.get('/api/todo', function (req, res) {
        // use mongoose to get all todo in the database
        getTodos(res);
    });


    //update todo
    app.post('/api/Updatetodo', function (req, res) {
      
        Todo.update({
            "_id": req.body._id
        }
            , {
                text: req.body.text
            }, function (err, todo) {
                if (err)
                    res.send(err);
                getTodos(res);
            });
    });

    // create todo and send back all todo after creation
    app.post('/api/todo', function (req, res) {

      console.log("going to start mail gun");

        var data = {
            from: "Mailgun Sandbox <postmaster@sandboxe7a813ef4bbb4a90be756b3dd2e016c68.mailgun.org>",
            to: "neoshub@gmail.com",
            subject: "query",
            text: req.body.text
        };
        mg.messages().send(data, function (error, body) {
            console.log("Mail Gun triggered");
            console.log(body);
        });

        Todo.create({
            text: req.body.text
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todo after you create another
            getTodos(res);
        });
    });

    // delete a todo
    app.delete('/api/todo/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // delete a todo List
    app.post('/api/deletetodolist', function (req, res) {
        Todo.remove({}, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        console.log(__dirname + '/public/index.html');
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
