const express = require('express');
const app = express()
const userController = require('./controllers/userController');


app.use(express.json())


app.post('/api/create/user', userController.create_user) // Создать
app.get('/api/get/users', userController.get_users) // Поиск всех
app.get('/api/get/user/:id', userController.get_user_by_id) // Поиск по id
app.post('/api/get/user/by_email', userController.get_user_by_email) // Поиск по почте
app.post('/api/update/user/:id', userController.update_user) // Обновление по id
app.get('/api/delete/user/:id', userController.delete_user) // Удаление по id


app.listen(5005, () => {
    console.log('Server is running on port 5005'); // прикольно)) а может он за меня код напишет?
})

