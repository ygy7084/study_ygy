var express =require('express');

let app = express();

app.get('/', (req ,res)=> {
    res.send('me');
});

app.listen(process.env.PORT || 3000, () => {
        console.log(process.env.NODE_ENV || 'none');
});