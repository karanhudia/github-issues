import React from 'react';
import { AuthenticatedApi } from './features/Api/AuthenticatedApi';
import { BrowserRouter, Switch } from 'react-router-dom';
import { MainLayoutRoute } from './features/LayoutRoutes/MainLayoutRoute';
import { Home } from './features/Home/Home';
import { Routes } from './constants/Routes';
import { Repository } from './features/Repository/Repository';
import { IssueContainer } from './features/Issue/IssueContainer';

function App() {
    return (
        <AuthenticatedApi>
            <BrowserRouter>
                <Switch>
                    <MainLayoutRoute exact path={Routes.Home} component={Home} />
                </Switch>
                <Switch>
                    <MainLayoutRoute exact path={Routes.Repository} component={Repository} />
                </Switch>
                <Switch>
                    <MainLayoutRoute exact path={Routes.Issues} component={IssueContainer} />
                </Switch>
            </BrowserRouter>
        </AuthenticatedApi>
    );
}

export default App;
