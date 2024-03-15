describe("Pruebas de integracion", () => {
  const baseUrl = "http://localhost:8080";

  const testEndpoint = (endpoint) => {
    it(`Endpoint: ${endpoint}`, () => {
      cy.request(`${baseUrl}${endpoint}`).its("status").should("eq", 200);
    });
  };

  testEndpoint("/");

  const endpoints = [
    "/api/v1/products",
    "/api/v1/category",
    "/api/v1/auth/login",
    "/api/v1/order",
    "/api/v1/recommendation",
  ];

  endpoints.forEach((endpoint) => testEndpoint(endpoint));
});

describe("Prueba funcional de inicio de sesión", () => {
  it("Iniciar sesión con credenciales válidas", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v1/auth/login",
      body: {
        email: "pedromaironi@gmail.com",
        password: "1234567890",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

describe("Pruebas de rendimiento de los endpoints de la API", () => {
  const baseUrl = "http://localhost:8080";

  const testEndpointPerformance = (endpoint) => {
    it(`Medir el rendimiento de ${endpoint}`, () => {
      cy.request({
        method: "GET",
        url: `${baseUrl}${endpoint}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.within(200, 299);
        expect(response.duration).to.be.lessThan(3000);
      });
    });
  };

  // Pruebas de rendimiento para cada endpoint
  const endpoints = ["/api/v1/products", "/api/v1/category"];

  endpoints.forEach((endpoint) => testEndpointPerformance(endpoint));
});

describe("Prueba de respuesta del endpoint /products", () => {
  it("Devuelve un JSON con la lista de productos", () => {
    cy.request("http://localhost:8080/api/v1/products").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).that.is.an("array").and.not.empty;
    });
  });
});
