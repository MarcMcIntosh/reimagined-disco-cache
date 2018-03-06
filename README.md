# reimagined-disco-cache
Interview coding challenge

## Usage

Open two terminalls, Start mongodb using the script provided in the top level directory
```bash
./mongo.sh
```
Start the server with
```bash
npm test
# For or
npm start
```

### Note
All post and put requests should have the content-type header set to application/json.
```bash
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"name":"marc"}' \
http://localhost:8080/creat
```

## Endpoints

+ *all* **/** welcom message and description of routes.
+ *GET*: **cache/:id**, get cache item by id.
+ *POST*: **create** create item with data provided in the json body of the request and will return the id of the new item.
+ *PUT*: **update** updates an item returns the updated item.
+ *DELETE* **remove/:id** delete the cache item nby id.
+ *DELETE* **remove-all** delete all items.,

## Enviroment varibales
Varibales that vcan be added to .env *see .env.example*.
+ **TTL** time to live, in milliseconds. *default*: 3 days
+ **PORT_DEV** port to listen on during development testing, *default*: 8080
+ **PORT_PROD** port to listen on during production. *default*: 8080
+ **MONGO_URL** mongodb url and database. *default*: http:127.0.0.1:27017/cache
+ **CAP** cache items limit. *defualt*: 10
