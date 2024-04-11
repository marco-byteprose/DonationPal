# Fullstack Application using MERN
An application that tracks donations to campaigns made by users

## Resources
### Aggregation
The following route `/campaigns/:id` uses an aggregation pipeline. This allows us to join data from two collections.
1. https://www.mongodb.com/docs/manual/core/aggregation-pipeline/
2. https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup
3. https://www.digitalocean.com/community/tutorials/how-to-use-aggregations-in-mongodb

### Note
When deploying the backend to Google App Engine, you may experience issues connecting to MongoDB Cluster if the database Network Access isn't configured properly. In this case, 0.0.0.0/0 needs to be whitelisted in order for deployed backend to connect to MongoDB database (otherwise the server IP address is used). Since GAE is a 'Server-less' option, there is no static IP address which is why 0.0.0.0/0 is used in this case. 