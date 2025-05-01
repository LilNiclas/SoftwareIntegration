//npm init -y
//type module
//npm i express graphql graphql-http
import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static("public"))

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
});

app.all('/graphql', createHandler({ schema }));
app.listen(PORT, () => console.log("Server is running on port", PORT));