const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Server is active');
});

app.listen(3306, () => {
    console.log('Running on port 3306');
})