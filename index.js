const express = require('express');
const app = express();

const pointRoutes = require('./routes/points')


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Server is active');
});

app.use('/api/points', pointRoutes);

app.listen(3306, () => {
    console.log('Running on port 3306');
})