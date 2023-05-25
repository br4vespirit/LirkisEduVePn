'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">lirkis-edu-ve-pn-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' : 'data-bs-target="#xs-components-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' :
                                            'id="xs-components-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmationDialog.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmationDialog</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateQuizComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateQuizComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateSceneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateSceneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupSessionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupSessionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsModificationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsModificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsPreviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsPreviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HistoryQuizComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoryQuizComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinQuizComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JoinQuizComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Muzeum_habsbourgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Muzeum_habsbourgComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewScenariosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewScenariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewSceneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewSceneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewTasksComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PreviewTasksComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistrationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SceneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SceneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskHistoryExtendedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskHistoryExtendedComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskHistoryStatisticsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskHistoryStatisticsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserSettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersDashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' : 'data-bs-target="#xs-injectables-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' :
                                        'id="xs-injectables-links-module-AppModule-ce9a910b2d21ae411999c6ddf915660e209270b25e18fba9a609202f74fcf891f0bf77ba9017d1a989efd6bbe0cd8d6582ac61f7e52aa9ca6b545830a42e5f58"' }>
                                        <li class="link">
                                            <a href="injectables/UtilsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/TaskHistoryComponent.html" data-type="entity-link" >TaskHistoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskHistoryComponent-1.html" data-type="entity-link" >TaskHistoryComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupTasks.html" data-type="entity-link" >GroupTasks</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileUpdate.html" data-type="entity-link" >ProfileUpdate</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegistrationRequest.html" data-type="entity-link" >RegistrationRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScenarioPreview.html" data-type="entity-link" >ScenarioPreview</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScenePreview.html" data-type="entity-link" >ScenePreview</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskCreation.html" data-type="entity-link" >TaskCreation</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskFiles.html" data-type="entity-link" >TaskFiles</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskNames.html" data-type="entity-link" >TaskNames</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskPreview.html" data-type="entity-link" >TaskPreview</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskRequest.html" data-type="entity-link" >TaskRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskSessionFinishRequest.html" data-type="entity-link" >TaskSessionFinishRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskSessionInfo.html" data-type="entity-link" >TaskSessionInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfile.html" data-type="entity-link" >UserProfile</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BackendService.html" data-type="entity-link" >BackendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransferService.html" data-type="entity-link" >TransferService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FiringAttempt.html" data-type="entity-link" >FiringAttempt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FiringAttempt-1.html" data-type="entity-link" >FiringAttempt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FiringAttempt-2.html" data-type="entity-link" >FiringAttempt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FiringAttempt-3.html" data-type="entity-link" >FiringAttempt</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});