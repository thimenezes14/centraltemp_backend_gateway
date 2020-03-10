require('./database');

const server = require('./api/config/server');
const PORT = process.env.PORT;
server.listen(PORT, () => console.log("API Gateway foi iniciada na porta " + PORT));