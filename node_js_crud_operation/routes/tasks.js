const express = require('express');
const router = express.Router();
const dbConn = require('../lib/db');
// display tasks page
router.get('/', function(req, res, next) {
 dbConn.query('SELECT * FROM tasks ORDER BY id_task DESC', function(err, rows) {
 if (err) {
 req.flash('error', err);
 res.render('tasks/index', { data: '' });
 } else {
 // Rendering index view
 res.render('tasks/index', { data: rows });
 }
 });
});
// display add task page
router.get('/add', function(req, res, next) {
 res.render('tasks/add', {
 title: '',
 description: ''
 });
});
// add a new task
router.post('/add', function(req, res, next) {
 let title = req.body.title;
 let description = req.body.description;
 let errors = false;
 if (title.length === 0 || description.length === 0) {
 errors = true;
 req.flash('error', 'Please enter title and description');
 res.render('tasks/add', {
 title: title,
 description: description
 });
 }
 if (!errors) {
    let form_data = {
    title: title,
    description: description
    };
    dbConn.query('INSERT INTO tasks SET ?', form_data, function(err, result) {
    if (err) {
    req.flash('error', err);
    res.render('tasks/add', {
    title: form_data.title,
    description: form_data.description
    });
    } else {
    req.flash('success', 'Task successfully added');
    res.redirect('/tasks');
    }
    });
    }
   });
   // display edit task page
   router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;
    dbConn.query('SELECT * FROM tasks WHERE id_task = ?', [id], function(err, rows, fields) {
    if (err) throw err;
    if (rows.length <= 0) {
    req.flash('error', 'Task not found with id_task = ' + id);
    res.redirect('/tasks');
    } else {
    res.render('tasks/edit', {
    title: 'Edit Task',
    id_task: rows[0].id_task,
    title: rows[0].title,
    description: rows[0].description
    });
    }
    });
   });
   // update task data
   router.post('/update/:id', function(req, res, next) {
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    let errors = false;
    if (title.length === 0 || description.length === 0) {
        errors = true;
        req.flash('error', 'Please enter title and description');
        res.render('tasks/edit', {
        id_task: req.params.id,
        title: title,
        description: description
        });
        }
        if (!errors) {
        let form_data = {
        title: title,
        description: description
        };
        dbConn.query('UPDATE tasks SET ? WHERE id_task = ?', [form_data, id], function(err, result) {
        if (err) {
        req.flash('error', err);
        res.render('tasks/edit', {
        id_task: req.params.id,
        title: form_data.title,
        description: form_data.description
        });
        } else {
        req.flash('success', 'Task successfully updated');
        res.redirect('/tasks');
        }
        });
        }
       });
       // delete task
       router.get('/delete/:id', function(req, res, next) {
        let id = req.params.id;
        dbConn.query('DELETE FROM tasks WHERE id_task = ?', [id], function(err, result) {
        if (err) {
        req.flash('error', err);
        res.redirect('/tasks');
        } else {
        req.flash('success', 'Task successfully deleted! ID = ' + id);
        res.redirect('/tasks');
        }
        });
       });
       module.exports = router;