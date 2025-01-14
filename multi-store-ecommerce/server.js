const app = require('./app');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database'); 

sequelize.sync({ alter: true }) // or { force: true } during development
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch(err => {
        console.error('Database sync failed:', err.message);
    });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
