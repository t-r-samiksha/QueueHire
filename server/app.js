
const express = require('express');
const cors = require('cors');


const authRoutes = require('./controllers/auth.controller');
const dashRoutes = require('./controllers/dash.controller');
const candidatesRoutes = require('./controllers/candidatesRoutes.controller');
const progressRoutes = require('./controllers/progress.controller')
const calanderRoutes = require('./controllers/calander.controller')
const jobRoutes = require('./controllers/job.controller')
const userdbRoutes = require('./controllers/userdb.controller')
const progressuserRoutes = require('./controllers/progressuser.controller')
const profileRoutes = require('./controllers/profile.controller')
const queueRoutes = require('./controllers/queue.controller')
const userstateRoutes = require("./controllers/userstate.controller")




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true              
}));

app.use('/auth', authRoutes);
app.use('/dash', dashRoutes);
app.use('/candidates',candidatesRoutes);
app.use('/progress',progressRoutes)
app.use('/calendar',calanderRoutes)
app.use('/job',jobRoutes)
app.use('/userdb',userdbRoutes)
app.use('/progressuser',progressuserRoutes)
app.use('/profile',profileRoutes)
app.use('/queue',queueRoutes)
app.use("/user", userstateRoutes);

module.exports = app;
