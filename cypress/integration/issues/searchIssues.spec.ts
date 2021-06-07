import { DataCypress } from '../../../src/constants/DataCypress';
import { IssueState } from '../../../src/generated/graphql';

describe('Searching for Issues', () => {
    beforeEach('open facebook/react repository', () => {
        cy.visit('/repository/facebook/react');
    });

    it('should search for an issue using title', () => {
        cy.get(`input[name="title"]`).should('exist').type('eslint');

        cy.get(`[data-cy=${DataCypress.SearchIssuesButton}]`).should('exist').click();

        cy.contains('Issues found').should('exist');
        cy.get(`[data-cy=${DataCypress.SearchIssuesList}]`)
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);
    });

    it('should search for an issue using body', () => {
        cy.get(`input[name="body"]`).should('exist').type('chain');

        cy.get(`[data-cy=${DataCypress.SearchIssuesButton}]`).should('exist').click();

        cy.contains('Issues found').should('exist');
        cy.get(`[data-cy=${DataCypress.SearchIssuesList}]`)
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);
    });

    it('should search for an issue using title and state', () => {
        cy.get(`input[name="title"]`).should('exist').type('eslint');

        cy.get(`[data-cy=${DataCypress.SearchIssuesStateDropdown}]`).should('exist').click();
        cy.get(`[data-value=${IssueState.Closed}]`).should('exist').click();
        cy.get(`[data-cy=${DataCypress.SearchIssuesButton}]`).should('exist').click();

        cy.contains('Issues found').should('exist');
        cy.get(`[data-cy=${DataCypress.SearchIssuesList}]`)
            .should('exist')
            .children()
            .should('have.length.greaterThan', 0);
    });

    it('should result in no issues', () => {
        cy.get(`input[name="title"]`).should('exist').type('eslint');
        cy.get(`input[name="body"]`).should('exist').type('something useless as usual');

        cy.get(`[data-cy=${DataCypress.SearchIssuesStateDropdown}]`).should('exist').click();
        cy.get(`[data-value=${IssueState.Open}]`).should('exist').click();
        cy.get(`[data-cy=${DataCypress.SearchIssuesButton}]`).should('exist').click();

        cy.contains('Issues found').should('not.exist');
        cy.contains('No issues found').should('exist');
    });
});
