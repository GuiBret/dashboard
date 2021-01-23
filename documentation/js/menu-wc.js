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
                    <a href="index.html" data-type="index-link">dashboard documentation</a>
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
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-b95b964e861d438c784cdf4c9db14c6e"' : 'data-target="#xs-components-links-module-AppModule-b95b964e861d438c784cdf4c9db14c6e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-b95b964e861d438c784cdf4c9db14c6e"' :
                                            'id="xs-components-links-module-AppModule-b95b964e861d438c784cdf4c9db14c6e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GithubComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GithubComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GmailModule.html" data-type="entity-link">GmailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GmailModule-07826714a2ac8ea324ae4022afd8ae0d"' : 'data-target="#xs-components-links-module-GmailModule-07826714a2ac8ea324ae4022afd8ae0d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GmailModule-07826714a2ac8ea324ae4022afd8ae0d"' :
                                            'id="xs-components-links-module-GmailModule-07826714a2ac8ea324ae4022afd8ae0d"' }>
                                            <li class="link">
                                                <a href="components/EmailContainerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GmailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GmailEmailListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GmailEmailListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GmailStoreTokenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GmailStoreTokenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReadEmailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReadEmailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GmailRoutingModule.html" data-type="entity-link">GmailRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SpotifyModule.html" data-type="entity-link">SpotifyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SpotifyModule-67f649d010c4cef400bd81e29c9c9601"' : 'data-target="#xs-components-links-module-SpotifyModule-67f649d010c4cef400bd81e29c9c9601"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SpotifyModule-67f649d010c4cef400bd81e29c9c9601"' :
                                            'id="xs-components-links-module-SpotifyModule-67f649d010c4cef400bd81e29c9c9601"' }>
                                            <li class="link">
                                                <a href="components/SpotifyHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpotifyHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpotifyPlayerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpotifyPlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpotifySearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpotifySearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpotifyStoreTokenComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpotifyStoreTokenComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SpotifyRoutingModule.html" data-type="entity-link">SpotifyRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TodoListModule.html" data-type="entity-link">TodoListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' : 'data-target="#xs-components-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' :
                                            'id="xs-components-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' }>
                                            <li class="link">
                                                <a href="components/TodoEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodoEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TodoListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TodoListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' : 'data-target="#xs-injectables-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' :
                                        'id="xs-injectables-links-module-TodoListModule-92841d3237ec6fa0bd3fe5aaf8aaccba"' }>
                                        <li class="link">
                                            <a href="injectables/TodoListService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TodoListService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TodoListRoutingModule.html" data-type="entity-link">TodoListRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/GmailCustomEmail.html" data-type="entity-link">GmailCustomEmail</a>
                            </li>
                            <li class="link">
                                <a href="classes/GmailEmail.html" data-type="entity-link">GmailEmail</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GmailService.html" data-type="entity-link">GmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpotifyPlayerService.html" data-type="entity-link">SpotifyPlayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpotifyService.html" data-type="entity-link">SpotifyService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/SpotifyInterceptor.html" data-type="entity-link">SpotifyInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/GetEmailResolver.html" data-type="entity-link">GetEmailResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/SpotifyTokenGuard.html" data-type="entity-link">SpotifyTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TodoDataResolverService.html" data-type="entity-link">TodoDataResolverService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Song.html" data-type="entity-link">Song</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Todo.html" data-type="entity-link">Todo</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});