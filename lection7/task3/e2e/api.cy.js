const generateUserName = (length) =>
  [...Array(length)]
    .map(() => Math.random().toString(36).substring(2))
    .join('')
    .slice(0, length);


describe("Integration tests petstore.swagger.io", () => {
  let user = null;
  let userName = generateUserName(10);
  let userId = Math.round(Math.random() * 999999);

  beforeEach(() => {
    user = {
      id: userId,
      username: userName,
      email: "15979Ivan@mail.ru",
      password: "123456",
      phone: "+79012345678",
      userStatus: 0,
    };
  });

  it("Create user", () => {
    cy.request({
      method: "POST",
      url: "/user",
      body: user,
    }).then((response) => {
      expect(response.status).eq(200);
    });
  });


  it("Auth user", () => {
    cy.request({
      method: "GET",
      url: `/user/login?username=${user.username}&password=${user.password}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Availability user", () => {
    cy.request({
      method: "GET",
      url: `/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Change user", () => {
    const newEmail = "15979IvanIvanov@mail.ru";

    cy.request({
      method: "PUT",
      url: `/user/${user.username}`,
      body: {
        id: userId,
        username: userName,
        email: newEmail,
        password: "123456",
        phone: "+79012345678",
        userStatus: 0,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Logout user", () => {
    cy.request({
      method: "GET",
      url: `/user/login?username=${user.username}&password=${user.password}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request({
      method: "GET",
      url: `/user/logout`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Delete user", () => {
    cy.wait(5000);
    cy.request({
      method: "DELETE",
      url: `/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

});

