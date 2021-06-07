import { DataCypress } from '../../../src/constants/DataCypress';

describe('Issue details', () => {
    beforeEach('open facebook/react repository', () => {
        cy.visit('/repository/facebook/react/issues/21595');
    });

    it('should verify if issue has title and body', () => {
        cy.get(`[data-cy=${DataCypress.IssueTitle}] .MuiCardHeader-content`)
            .should('exist')
            .children()
            .should('have.length', 2);
        cy.get(`[data-cy=${DataCypress.IssueBody}]`).should('exist').children().should('have.length.greaterThan', 0);
    });

    it('should verify if issue has comments', () => {
        cy.get(`[data-cy=${DataCypress.IssueComment}]`)
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0)
            .first()
            .should('exist');
    });
});
