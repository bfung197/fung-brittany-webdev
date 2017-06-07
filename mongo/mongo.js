var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
}, {collection:'todo'});

todoModel = mongoose.model('TodoModel', todoSchema);

todoModel.findAllTodos = findAllTodos;
todoModel.createTodo = createTodo;

modules.export = todoModel;

// createTodo({title:'upload videos', date: new Date()})
//     .then(function(todo) {
//         console.log(todo);
//         return findAllTodos();
//     })
//     .then(function (todos) {
//         console.log(todos);
//     });

function findAllTodos() {
    return todoModel.find();
}

function createTodo(todo) {
    return todoModel.create(todo);
}

// todoModel.create(todo1)
//     .then(function(doc) {
//         console.log(doc);
//     }, function(err) {
//         console.log(err);
//     });

todoModel.find()
.then(function(docs) {
    console.log(docs);
});