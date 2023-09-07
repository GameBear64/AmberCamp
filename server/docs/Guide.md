# In this folder we have all the documentation for the backend

## wholedb.dio

Is basically a **draw.io** schema to help me trace the data flow on the database

## Swagger

These files will get automatically generated from the comments on the routes (the ones that have @openapi)

> To set it up just provide your JWT in the **.env** as **SWAGGER_AUTH**

## REST book

You need the rest book extension for these ones, it basically provides a quick way to do rest operations.

> It can be found here [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book)

> To use you need to provide your jwt as a rest book secret, press **Ctrl+Shift+P** > **Create new** > Name: **jwt** > Value: **the jwt itself**
