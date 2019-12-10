const HOST = 'http://localhost:9091';

describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit(HOST);
  });
});
