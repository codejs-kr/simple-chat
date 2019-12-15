// https://docs.cypress.io/api/commands/type.html#Arguments

describe('Simple chat app test', () => {
  /**
   * HOME
   */
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

  /**
   * ROOM
   */
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

  it('채팅 전송후 입력란이 리셋되어야 한다.', () => {
    cy.get('textarea').should('have.value', '');
  });

  it('전송된 채팅이 목록에 노출 되어야 한다.', () => {
    cy.get('#messages .body p').should('contain', '반갑습니다');
  });

  it('참여자 목록을 열 수 있어야 한다.', () => {
    cy.get('#btn-people').click();
    cy.get('#user-list').should('be.visible');
  });

  it('참여자 목록을 닫을 수 있어야 한다.', () => {
    cy.wait(500);
    cy.get('.ball:eq(0)').click({ force: true });
    cy.get('#user-list').should('not.have.class', 'opened');
  });

  it('방에서 나갈 수 있어야 한다.', () => {
    cy.get('#btn-exit').click();
    cy.get('#header .h-center').should('have.text', 'Simple Chat');
  });
});
