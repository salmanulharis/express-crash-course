import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
 const port = process.env.PORT || 8000;

 const app = express();

 // setup static folder
//  app.use(express.static(path.join(__dirname, 'public'))); 

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Logger middleware
app.use(logger);

// Routes
app.use('/api/posts', posts);

// catch all error handler
app.use(notFound);

// Error handler
app.use(errorHandler);


 app.listen(port, () => console.log(`Server is running on port ${port}`));