import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

import { nextTick } from 'process';
import fs from 'fs'
import path from 'path';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/', async (req: Request, res: Response, next: NextFunction,) => {
      let image_url= req.query.image_url;
      let imageArray: Array <string>;
      let filteredImage: string;  
      
      if (!image_url){
        res.status(404).send('An image url should be added')
      }
      if(typeof(image_url) === 'string'){
     
       filteredImage =await filterImageFromURL(image_url)
      
       res.status(201).sendFile(filteredImage, function(err){
        if (err) {
          next(err)
        }
        else {
         
       imageArray= fs.readdirSync(path.dirname(filteredImage))
              
       next() 
  }

})
}          
      res.on('end', () => {
        deleteLocalFiles(imageArray)
      })
      

  })

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();