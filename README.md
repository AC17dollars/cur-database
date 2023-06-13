# cur-database
cur-database is a simple web interface for adding and viewing details to and from a postgreSQL database.
Hosted @ [cur-database.onrender](https://cur-database.onrender.com/)


### Easy Run Script

Run the following command from a directory.

```bash
curl -L  https://gist.githubusercontent.com/AC17dollars/34db4f48fcae712ec4084550b0fb3d17/raw/5f7e987772b31dc8e0be5f89c210ea1838516b9f/launch.sh -o launch.sh; chmod +x launch.sh; ./launch.sh;
```

### Run Instructions

NOTE: A working postgreSQL database and its connection URL is required.


1. Clone the project
    ```bash
     git clone --recursive "https://github.com/AC17dollars/cur-database.git" 
     ```
2. Change into backend directory
    ```bash
     cd cur-database/backend/
     ```
3. Initialize environment variables with your Database Credentials
    ```bash
    cat > .env<<EOF

    # PostgreSQL Host address
    PG_HOST=randomname.db.elephantsql.com

    # Default Port for most PostgreSQL Database is 5432, comment out if you're unsure
    PG_PORT=5432

    # Your PostgreSQL Username
    PG_USER=myusername

    # Your PostgreSQL Password
    PG_PASSWORD=myPaSSwoRd

    # The database you'd like to access
    PG_DATABASE=db_test

    EOF
    ```
4. Build / Install the packages
    ```bash
    npm install
    ```
5. Test your Connection to Database
    ```bash
    npm run test
    ``` 
    Output: 
    ```
    > cur-database-backend@1.0.0 test
    > node test.js

    Database Connection Successful
    ```
    OR
    ```
    > cur-database-backend@1.0.0 test
    > node test.js

    Couldn't Connect to Database. Check your Connection Credentials.
    ```
6. If failed, Check Credentials and URI in .env

7. Start the server
    ```bash
    npm run start
    ```

### Webpage Preview:
![image](https://github.com/AC17dollars/cur-database/assets/82364981/1e4474fa-db90-4bd3-98e0-05f85ef52ce0)
    