// https://docs.cypress.io/api/commands/type.html#Arguments

describe('Simple chat app - home test', () => {
  it('서비스에 접속 되어야 한다', function() {
    cy.visit('/');
  });

  it('메인 타이틀이 있어야 한다', () => {
    cy.get('#header .h-center').should('have.text', 'Simple Chat');
  });

  it('프로필 이미지 변경 되어야 한다', () => {
    cy.get('#avatar-set button')
      .eq(7)
      .click();
    cy.get('#btn-edit').click();
  });

  it('닉네임 변경 되어야 한다', () => {
    cy.get('#nickname-wrap input').clear();
    cy.get('#nickname-wrap input').type('배트맨');
    cy.get('#nickname-wrap input').should('have.value', '배트맨');
  });

  it('채팅방에 입장 되어야 한다', () => {
    cy.contains('오픈채팅입장').click();
  });
});
