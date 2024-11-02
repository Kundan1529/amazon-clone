import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch product data from Fake Store API
app.get("/products", async (req, res) => {
    try {
      // Get products from Fake Store API using await
      const response = await axios.get('https://fakestoreapi.com/products');
      
      // Log the response data
      console.log(response.data);
      
      // Send the data as the response
      res.json(response.data);
    } catch (error) {
      // Handle any errors during the API request
      console.error('Error fetching products:', error);
      
      // Send an error response to the client
      res.status(500).send('Error fetching products');
    }
  });
  
// Home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

