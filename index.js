const server = require('./src/server')
const { conn } = require('./src/db.js');
const { PORT } = process.env;


conn.sync({ force: false }).then(() => {
    console.log("db is conected");
    const port = PORT || 3001
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
}).catch(error => console.error(error))