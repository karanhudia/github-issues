import { DataCypress } from '../../../src/constants/DataCypress';

describe('Searching for repositories', () => {
    beforeEach('open home page', () => {
        cy.visit('/');
    });

    it('should search for a repository and display 3 results', () => {
        cy.get(`[data-cy=${DataCypress.SearchRepositoryInputField}] input`).should('exist').type('react');

        cy.get('.MuiAutocomplete-option').should('have.length', 3);
    });

    it('should go to facebook/react repository and search for issues', () => {
        cy.visit('/repository/facebook/react');
        cy.get(`[data-cy=${DataCypress.SearchRepositoryHeaderText}]`).should('exist').contains('facebook/react');
    });
});
