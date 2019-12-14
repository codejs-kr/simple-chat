// https://docs.cypress.io/api/commands/type.html#Arguments

describe('Simple chat app - room test', () => {
  it('채팅방 타이틀이 있어야 한다', () => {
    cy.get('#header .h-center').should('have.text', '오픈채팅방');
  });

  it('채팅을 입력할 수 있어야 한다', () => {
    cy.get('textarea').type('반갑습니다.');
    cy.get('textarea').should('have.value', '반갑습니다.');
  });

  it('채팅을 전송할 수 있어야 한다', () => {
    cy.get('form button').click();
  });

  it('채팅 전송후 리셋되어야 한다.', () => {
    cy.get('textarea').should('have.value', '');
  });

  it('전송된 채팅이 목록에 노출 되어야 한다.', () => {
    cy.get('#messages .body p').should('contain', '반갑습니다');
  });
});
