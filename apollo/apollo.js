import {ApolloServer} from 'apollo-server-express';
import {schema} from '../graphql';

export default class Apollo {
  constructor() {
    this.server = null;
  }

   listen() {
    this.server.listen().then(() => {
      console.log(`🚀  Server ready at`, url);
    });
  }

  init(url, context) {
    console.log(`🔗 Apollo ON http://localhost:${url}/graphql`)
    this.url = url;
    this.context = context;

    this.server = new ApolloServer(({
      schema,
      playground: {
        endpoint: `http://localhost:${url}/graphql`
      },

      context: this.context
    }));
  }
}
