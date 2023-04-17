exports.swagger = (app) => {
  const swaggerUi = require('swagger-ui-express');
  const swaggerJsdoc = require('swagger-jsdoc');
  const swagOptions = require('./swagger.json');
  const swaggerSpec = swaggerJsdoc(swagOptions);
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        authAction: {
          ApiKeyAuth: {
            name: 'jwt',
            schema: { type: 'apiKey', in: 'header', name: 'jwt', description: '' },
            value: process.env.SWAGGER_AUTH,
          },
        },
      },
    })
  );
};
