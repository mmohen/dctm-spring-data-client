/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.3.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app/singleview');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('modernizr', 'icons')
          })
          .state('app.singleview', {
              url: '/singleview',
              title: 'Create Entries',
              templateUrl: helper.basepath('singleview.html'),
              controller : 'StudentController'
          })
          .state('app.submenu', {
              url: '/submenu',
              title: 'Submenu',
              templateUrl: helper.basepath('submenu.html'),
              controller : 'StudentController'
          })
          // 
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // ----------------------------------- 
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Angle',
        description: 'Angular Bootstrap Admin Template',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope'];
    function UserBlockController($rootScope, $scope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('angle')
        .controller('StudentController', Controller);

    Controller.$inject = ['$log', '$scope', '$http'];
    function Controller($log, $scope, $http) {
        // for controllerAs syntax
        // var vm = this;
        $scope.student = {};
        $scope.students = {}
        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }

        $scope.createStudent = function (){
            $http.post('http://localhost:8080/api/students', $scope.student).success(function(data, status){
              $scope.result = data;
            }).failure(function(data, status){
              $scope.result = data;
            });
        }
        $scope.viewStudent = function (){
            $http.get('http://localhost:8080/api/students').success(function(data){
              $scope.students = data;
            }).error(function(data, status){
              $scope.students = data;
            });
        }

        $scope.viewStudent();
    }
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb2xvcnMvY29sb3JzLm1vZHVsZS5qcyIsImNvcmUvY29yZS5tb2R1bGUuanMiLCJsYXp5bG9hZC9sYXp5bG9hZC5tb2R1bGUuanMiLCJsb2FkaW5nYmFyL2xvYWRpbmdiYXIubW9kdWxlLmpzIiwibmF2c2VhcmNoL25hdnNlYXJjaC5tb2R1bGUuanMiLCJwcmVsb2FkZXIvcHJlbG9hZGVyLm1vZHVsZS5qcyIsInJvdXRlcy9yb3V0ZXMubW9kdWxlLmpzIiwic2V0dGluZ3Mvc2V0dGluZ3MubW9kdWxlLmpzIiwic2lkZWJhci9zaWRlYmFyLm1vZHVsZS5qcyIsInRyYW5zbGF0ZS90cmFuc2xhdGUubW9kdWxlLmpzIiwidXRpbHMvdXRpbHMubW9kdWxlLmpzIiwiY29sb3JzL2NvbG9ycy5jb250YW50LmpzIiwiY29sb3JzL2NvbG9ycy5zZXJ2aWNlLmpzIiwiY29yZS9jb3JlLmNvbmZpZy5qcyIsImNvcmUvY29yZS5jb25zdGFudHMuanMiLCJjb3JlL2NvcmUucnVuLmpzIiwibGF6eWxvYWQvbGF6eWxvYWQuY29uZmlnLmpzIiwibGF6eWxvYWQvbGF6eWxvYWQuY29uc3RhbnRzLmpzIiwibG9hZGluZ2Jhci9sb2FkaW5nYmFyLmNvbmZpZy5qcyIsImxvYWRpbmdiYXIvbG9hZGluZ2Jhci5ydW4uanMiLCJuYXZzZWFyY2gvbmF2c2VhcmNoLmRpcmVjdGl2ZS5qcyIsIm5hdnNlYXJjaC9uYXZzZWFyY2guc2VydmljZS5qcyIsInByZWxvYWRlci9wcmVsb2FkZXIuZGlyZWN0aXZlLmpzIiwicm91dGVzL3JvdXRlLWhlbHBlcnMucHJvdmlkZXIuanMiLCJyb3V0ZXMvcm91dGVzLmNvbmZpZy5qcyIsInNldHRpbmdzL3NldHRpbmdzLnJ1bi5qcyIsInNpZGViYXIvc2lkZWJhci5jb250cm9sbGVyLmpzIiwic2lkZWJhci9zaWRlYmFyLmRpcmVjdGl2ZS5qcyIsInNpZGViYXIvc2lkZWJhci5zZXJ2aWNlLmpzIiwic2lkZWJhci9zaWRlYmFyLnVzZXJibG9jay5jb250cm9sbGVyLmpzIiwidHJhbnNsYXRlL3RyYW5zbGF0ZS5jb25maWcuanMiLCJ0cmFuc2xhdGUvdHJhbnNsYXRlLnJ1bi5qcyIsInV0aWxzL2FuaW1hdGUtZW5hYmxlZC5kaXJlY3RpdmUuanMiLCJ1dGlscy9icm93c2VyLnNlcnZpY2UuanMiLCJ1dGlscy9jbGVhci1zdG9yYWdlLmRpcmVjdGl2ZS5qcyIsInV0aWxzL2Z1bGxzY3JlZW4uZGlyZWN0aXZlLmpzIiwidXRpbHMvbG9hZC1jc3MuZGlyZWN0aXZlLmpzIiwidXRpbHMvbm93LmRpcmVjdGl2ZS5qcyIsInV0aWxzL3RhYmxlLWNoZWNrYWxsLmRpcmVjdGl2ZS5qcyIsInV0aWxzL3RyaWdnZXItcmVzaXplLmRpcmVjdGl2ZS5qcyIsInV0aWxzL3V0aWxzLnNlcnZpY2UuanMiLCJjdXN0b20ubW9kdWxlLmpzIiwiY3VzdG9tLmNvbnRyb2xsZXIuanMiLCJzdHVkZW50LmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLFNBQUE7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7Ozs7O0FDM0JBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQSxjQUFBOztBQ0pBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQSxZQUFBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBOzs7QUNoQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLGdCQUFBOztBQ0pBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQSxrQkFBQTs7QUNKQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUEsaUJBQUE7O0FDSkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBLGlCQUFBOzs7O0FDSkEsQ0FB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QUFBO1FBQ0EsT0FBQTtRQUNBLFFBQUE7UUFDQSxTQUFBLGFBQUE7Ozs7O0FDZEEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsU0FBQSxnQkFBQTs7VUFFQSxTQUFBO1lBQ0Esc0JBQUEsQ0FBQTtZQUNBLHNCQUFBLENBQUE7bUNBQ0E7OztVQUdBLFNBQUE7Ozs7Ozs7O0FDYkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsT0FBQTs7SUFFQSxpQkFBQSxVQUFBLENBQUE7SUFDQSxTQUFBLGlCQUFBLHNCQUFBO01BQ0Esc0JBQUEsYUFBQTtNQUNBLHNCQUFBLGlCQUFBO01BQ0Esc0JBQUEsbUJBQUE7TUFDQSxzQkFBQSxpQkFBQTs7O0FDWkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsSUFBQTs7SUFFQSxjQUFBLFVBQUEsQ0FBQSxjQUFBLFlBQUE7SUFDQSxTQUFBLGNBQUEsWUFBQSxVQUFBLGNBQUE7Ozs7TUFJQSxJQUFBO01BQ0EsV0FBQSxJQUFBLHFCQUFBLFdBQUE7VUFDQSxHQUFBLEVBQUEsc0JBQUE7WUFDQSxRQUFBLFNBQUEsV0FBQTtjQUNBLGNBQUE7ZUFDQTs7TUFFQSxXQUFBLElBQUEsdUJBQUEsU0FBQSxPQUFBO1VBQ0EsTUFBQSxZQUFBLE9BQUEsc0JBQUEsWUFBQTtZQUNBLFNBQUEsT0FBQTtZQUNBLGNBQUE7Ozs7Ozs7Ozs7OztBQ2pCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxVQUFBLGNBQUE7U0FDQSxVQUFBLGlCQUFBOzs7Ozs7SUFNQSxTQUFBLGNBQUE7UUFDQSxJQUFBLFlBQUE7WUFDQSxZQUFBO1lBQ0EsVUFBQTs7UUFFQSxPQUFBOzs7O0lBSUEsU0FBQSxpQkFBQTtRQUNBLElBQUEsWUFBQTtZQUNBLFlBQUE7WUFDQSxVQUFBOztRQUVBLE9BQUE7Ozs7Ozs7O0lBUUEscUJBQUEsVUFBQSxDQUFBLFVBQUEsWUFBQTtJQUNBLFNBQUEsc0JBQUEsUUFBQSxVQUFBLFdBQUE7TUFDQTtTQUNBLEdBQUEsU0FBQSxVQUFBLEdBQUEsRUFBQSxFQUFBO1NBQ0EsR0FBQSxTQUFBLFVBQUE7OztJQUdBLHdCQUFBLFVBQUEsQ0FBQSxVQUFBLFlBQUE7SUFDQSxTQUFBLHlCQUFBLFFBQUEsVUFBQSxXQUFBOztNQUVBLElBQUEsZ0JBQUE7O01BRUEsRUFBQTtTQUNBLEdBQUEsU0FBQSxVQUFBLEdBQUEsRUFBQSxFQUFBO1NBQ0EsR0FBQSxTQUFBLFNBQUEsR0FBQTtVQUNBLElBQUEsRUFBQSxZQUFBO1lBQ0EsVUFBQTs7OztNQUlBLEVBQUEsVUFBQSxHQUFBLFNBQUEsVUFBQTs7TUFFQTtTQUNBLEdBQUEsU0FBQSxVQUFBLEdBQUEsRUFBQSxFQUFBO1NBQ0EsR0FBQSxTQUFBLFVBQUE7Ozs7Ozs7Ozs7O0FDMURBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEsYUFBQTs7SUFFQSxTQUFBLFlBQUE7UUFDQSxLQUFBLFNBQUE7UUFDQSxLQUFBLFVBQUE7Ozs7UUFJQSxJQUFBLHFCQUFBOztRQUVBLFNBQUEsU0FBQTtVQUNBLElBQUEsYUFBQSxFQUFBOztVQUVBLFdBQUEsWUFBQTs7VUFFQSxJQUFBLFNBQUEsV0FBQSxTQUFBOztVQUVBLFdBQUEsS0FBQSxTQUFBLFNBQUEsVUFBQTs7O1FBR0EsU0FBQSxVQUFBO1VBQ0EsRUFBQTthQUNBLFlBQUE7YUFDQSxLQUFBLHNCQUFBO2FBQ0EsSUFBQTs7Ozs7O0FDbENBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFVBQUEsYUFBQTs7SUFFQSxVQUFBLFVBQUEsQ0FBQSxZQUFBLFlBQUE7SUFDQSxTQUFBLFdBQUEsVUFBQSxVQUFBLElBQUE7O1FBRUEsSUFBQSxZQUFBO1lBQ0EsVUFBQTtZQUNBO2NBQ0E7a0JBQ0E7dUJBQ0E7Y0FDQTs7WUFFQSxNQUFBOztRQUVBLE9BQUE7Ozs7UUFJQSxTQUFBLEtBQUEsT0FBQSxJQUFBOztVQUVBLE1BQUEsY0FBQTs7VUFFQSxJQUFBLFdBQUE7Y0FDQTs7O1VBR0EsUUFBQSxRQUFBLFFBQUEsSUFBQSxZQUFBOztVQUVBLEdBQUEsU0FBQTs7VUFFQSxXQUFBLEtBQUE7O1VBRUEsVUFBQSxTQUFBOzs7O1VBSUEsU0FBQSxlQUFBOztZQUVBLElBQUEsWUFBQSxNQUFBO1lBQ0EsVUFBQSxXQUFBLFFBQUEsS0FBQSxJQUFBLElBQUEsS0FBQSxLQUFBLFlBQUE7O1lBRUEsTUFBQSxjQUFBLFNBQUEsU0FBQTs7WUFFQSxVQUFBLFNBQUEsY0FBQTs7O1VBR0EsU0FBQSxhQUFBOztZQUVBLFNBQUEsT0FBQTs7WUFFQSxNQUFBLGNBQUE7O1lBRUEsU0FBQSxVQUFBOztjQUVBLFNBQUEsU0FBQSxJQUFBOztjQUVBLFFBQUEsUUFBQSxRQUFBLElBQUEsWUFBQTtlQUNBOzs7VUFHQSxTQUFBLFdBQUE7WUFDQSxJQUFBLFdBQUEsR0FBQTtZQUNBLElBQUEsY0FBQTs7O1lBR0EsSUFBQSxNQUFBLE1BQUEsSUFBQSxzQkFBQSxZQUFBO2NBQ0E7OztjQUdBLEtBQUEsZ0JBQUEsR0FBQTs7Z0JBRUEsU0FBQSxVQUFBO2tCQUNBLFNBQUE7bUJBQ0E7O2dCQUVBOzs7OztZQUtBLE9BQUEsU0FBQTs7Ozs7Ozs7Ozs7O0FDakZBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFNBQUEsZ0JBQUE7OztJQUdBLHFCQUFBLFVBQUEsQ0FBQTtJQUNBLFNBQUEscUJBQUEsY0FBQTs7O01BR0EsT0FBQTs7UUFFQSxVQUFBO1FBQ0EsWUFBQTs7UUFFQSxNQUFBLFdBQUE7VUFDQSxPQUFBO1lBQ0EsVUFBQTtZQUNBLFlBQUE7Ozs7Ozs7TUFPQSxTQUFBLFNBQUEsS0FBQTtRQUNBLE9BQUEsZUFBQTs7Ozs7TUFLQSxTQUFBLGFBQUE7UUFDQSxJQUFBLFFBQUE7UUFDQSxPQUFBO1VBQ0EsTUFBQSxDQUFBLGNBQUEsTUFBQSxVQUFBLE9BQUEsSUFBQTs7WUFFQSxJQUFBLFVBQUEsR0FBQSxLQUFBO1lBQ0EsSUFBQSxJQUFBLEVBQUEsR0FBQSxJQUFBLE1BQUEsUUFBQSxJQUFBLEtBQUEsS0FBQTtjQUNBLFVB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O1lBR0EsSUFBQSxNQUFBLHdCQUFBLFdBQUEsSUFBQSxPQUFBLGFBQUEsT0FBQTs7O1lBR0EsSUFBQSxRQUFBLFdBQUEsYUFBQSxZQUFBO2NBQ0EsS0FBQSxFQUFBLE9BQUEscUJBQUE7Z0JBQ0EsYUFBQSxVQUFBLENBQUEsYUFBQTtnQkFDQSxZQUFBOzs7aUJBR0EsS0FBQSxlQUFBO2NBQ0EsWUFBQSxDQUFBOzs7WUFHQSxPQUFBLHFCQUFBLFFBQUE7O1lBRUEsT0FBQTs7Ozs7Ozs7WUFRQSxTQUFBLFNBQUEsTUFBQTs7Y0FFQSxHQUFBLENBQUEsTUFBQTs7Y0FFQSxJQUFBLENBQUEsS0FBQSxRQUFBLEtBQUEsU0FBQSxLQUFBO2dCQUNBLElBQUEsY0FBQTtnQkFDQSxRQUFBLFFBQUEsS0FBQSxTQUFBLFNBQUEsT0FBQTtrQkFDQSxHQUFBLFNBQUEsUUFBQSxjQUFBOztnQkFFQSxPQUFBOzs7Z0JBR0EsT0FBQSxPQUFBLEdBQUEsS0FBQSxTQUFBLE9BQUEsU0FBQSxLQUFBOzs7WUFHQSxTQUFBLFlBQUEsT0FBQTtjQUNBLFNBQUE7Y0FDQSxJQUFBLElBQUEsS0FBQSxjQUFBO2dCQUNBLEdBQUEsUUFBQSxLQUFBLE1BQUEsUUFBQSxLQUFBO2tCQUNBLGFBQUEsS0FBQTs7OztZQUlBLFNBQUEsUUFBQSxRQUFBOztjQUVBLE9BQUEsQ0FBQSxPQUFBLFdBQUEsYUFBQSxFQUFBLE9BQUEsUUFBQSxPQUFBOzs7Ozs7Ozs7Ozs7O0FDckdBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFVBQUEsV0FBQTs7SUFFQSxRQUFBLFVBQUEsQ0FBQSxjQUFBLFlBQUEsV0FBQTtJQUNBLFNBQUEsU0FBQSxZQUFBLFVBQUEsU0FBQSxPQUFBO1FBQ0EsSUFBQSxPQUFBLFFBQUEsUUFBQTtRQUNBLElBQUEsWUFBQTs7OztZQUlBLE1BQUE7WUFDQSxVQUFBO1lBQ0EsVUFBQTtZQUNBLFlBQUE7WUFDQSxTQUFBOzs7UUFHQSxPQUFBOztRQUVBLFNBQUEsS0FBQSxPQUFBLFNBQUEsT0FBQTs7VUFFQSxJQUFBLGVBQUEsV0FBQSxPQUFBLFFBQUE7VUFDQSxJQUFBLFdBQUE7O1VBRUEsSUFBQSxZQUFBLE1BQUEsWUFBQSxVQUFBO1VBQ0EsSUFBQSxTQUFBOztVQUVBLFNBQUEsSUFBQSxXQUFBLGFBQUEsV0FBQTs7WUFFQSxJQUFBLE1BQUEsd0JBQUEsV0FBQSxJQUFBLE9BQUEsYUFBQTs7Y0FFQSxPQUFBLFFBQUE7Y0FDQSxTQUFBLGdCQUFBLEVBQUEsT0FBQTs7O2NBR0E7Ozs7OztVQU1BLE1BQUEsSUFBQSxvQkFBQSxXQUFBO1lBQ0E7Ozs7VUFJQSxLQUFBLEdBQUEsVUFBQSxXQUFBO1lBQ0EsSUFBQSxFQUFBLE1BQUE7V0FDQTs7OztVQUlBLFdBQUEsSUFBQSxxQkFBQSxTQUFBLE9BQUEsU0FBQTtZQUNBLGVBQUEsUUFBQTs7WUFFQTs7WUFFQSxXQUFBLFdBQUE7Ozs7VUFJQSxLQUFBLFFBQUEsVUFBQSxNQUFBLHdCQUFBOztZQUVBLElBQUEsVUFBQSxFQUFBO1lBQ0EsSUFBQSxlQUFBOztZQUVBLFdBQUEsT0FBQSxvQkFBQTs7Ozs7O1VBTUEsU0FBQSxvQkFBQSxRQUFBOztZQUVBLEtBQUEsV0FBQSxPQUFBO2NBQ0EsU0FBQSxVQUFBO2dCQUNBLFFBQUEsR0FBQSxjQUFBLFNBQUEsRUFBQTs7a0JBRUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLFFBQUEsVUFBQSxTQUFBO29CQUNBOzs7OztpQkFLQTs7Y0FFQSxRQUFBLElBQUE7Ozs7VUFJQSxTQUFBLGlCQUFBO1lBQ0EsV0FBQSxJQUFBLGVBQUE7WUFDQSxHQUFBLENBQUEsTUFBQSxTQUFBLE1BQUE7Ozs7OztRQU1BLFNBQUEscUJBQUE7VUFDQSxJQUFBLFlBQUEsRUFBQSxVQUFBLEVBQUEsU0FBQTtVQUNBLFVBQUEsWUFBQSxnQkFBQSxHQUFBLG9CQUFBLFlBQUE7WUFDQTs7Ozs7O1FBTUEsU0FBQSxnQkFBQSxTQUFBO1VBQ0E7YUFDQSxTQUFBO2FBQ0EsWUFBQTthQUNBO2FBQ0EsWUFBQTs7Ozs7UUFLQSxTQUFBLGVBQUEsV0FBQSxVQUFBOztVQUVBOztVQUVBLElBQUEsS0FBQSxVQUFBLFNBQUE7O1VBRUEsSUFBQSxDQUFBLEdBQUEsU0FBQSxPQUFBO1VBQ0EsSUFBQSxVQUFBLFNBQUEsVUFBQTtZQUNBLGdCQUFBO1lBQ0EsT0FBQTs7O1VBR0EsSUFBQSxTQUFBLEVBQUE7VUFDQSxJQUFBLGNBQUEsRUFBQTs7VUFFQSxJQUFBLE1BQUEsVUFBQSxZQUFBLElBQUEsZ0JBQUEsS0FBQSxVQUFBLE9BQUEsSUFBQSxnQkFBQTtVQUNBLElBQUEsU0FBQSxHQUFBLFFBQUEsVUFBQTs7VUFFQSxnQkFBQTs7VUFFQSxJQUFBLFVBQUEsQ0FBQSxVQUFBLFdBQUEsTUFBQSxPQUFBLFNBQUE7VUFDQSxJQUFBLFdBQUEsS0FBQTs7VUFFQTthQUNBLFNBQUE7YUFDQSxJQUFBO2NBQ0EsVUFBQSxXQUFBLElBQUEsT0FBQSxVQUFBLFVBQUE7Y0FDQSxVQUFBO2NBQ0EsVUFBQSxDQUFBLE9BQUEsWUFBQSxRQUFBLFVBQUEsWUFBQSxJQUFBOzs7VUFHQSxPQUFBLEdBQUEsY0FBQSxXQUFBO1lBQ0EsZ0JBQUE7WUFDQSxPQUFBOzs7VUFHQSxPQUFBOzs7UUFHQSxTQUFBLG9CQUFBO1VBQ0EsRUFBQSxzQkFBQTtVQUNBLEVBQUEsZ0NBQUE7VUFDQSxFQUFBLG9CQUFBLFlBQUE7Ozs7Ozs7O0FDeEtBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEsaUJBQUE7O0lBRUEsY0FBQSxVQUFBLENBQUE7SUFDQSxTQUFBLGNBQUEsT0FBQTtRQUNBLEtBQUEsVUFBQTs7OztRQUlBLFNBQUEsUUFBQSxTQUFBLFNBQUE7VUFDQSxJQUFBLFdBQUE7Y0FDQSxXQUFBLFdBQUEsU0FBQSxJQUFBLE9BQUE7O1VBRUEsVUFBQSxXQUFBLFdBQUEsRUFBQSxNQUFBOztVQUVBO2FBQ0EsSUFBQTthQUNBLFFBQUE7YUFDQSxNQUFBOzs7O0FDdEJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFdBQUEsdUJBQUE7O0lBRUEsb0JBQUEsVUFBQSxDQUFBLGNBQUE7SUFDQSxTQUFBLG9CQUFBLFlBQUEsUUFBQTs7UUFFQTs7OztRQUlBLFNBQUEsV0FBQTtVQUNBLFdBQUEsT0FBQTtZQUNBLFVBQUE7WUFDQSxVQUFBO1lBQ0EsVUFBQTs7OztVQUlBLFdBQUEsa0JBQUEsVUFBQTtZQUNBLFdBQUEsV0FBQTs7O1VBR0EsV0FBQSxtQkFBQTs7VUFFQSxJQUFBLFNBQUEsV0FBQSxJQUFBLG1CQUFBLDBCQUFBOztZQUVBLFdBQUEsbUJBQUEsRUFBQSxXQUFBOzs7O1VBSUEsT0FBQSxJQUFBLFlBQUE7Ozs7O0FDbENBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7O0lBRUEsZ0JBQUEsVUFBQSxDQUFBO0lBQ0EsU0FBQSxnQkFBQSxtQkFBQTs7TUFFQSxtQkFBQSxxQkFBQTtVQUNBLFNBQUE7VUFDQSxTQUFBOzs7TUFHQSxtQkFBQSxrQkFBQTtNQUNBLG1CQUFBO01BQ0EsbUJBQUEsaUJBQUE7TUFDQSxtQkFBQSx5QkFBQTs7OztBQ2xCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxJQUFBOztJQUVBLGFBQUEsVUFBQSxDQUFBLGNBQUE7O0lBRUEsU0FBQSxhQUFBLFlBQUEsV0FBQTs7Ozs7TUFLQSxXQUFBLFdBQUE7O1FBRUEsWUFBQTs7UUFFQSxXQUFBO1VBQ0EsWUFBQTtVQUNBLFlBQUE7OztRQUdBLE1BQUEsWUFBQTtVQUNBLElBQUEsbUJBQUEsV0FBQSxzQkFBQSxXQUFBO1VBQ0EsSUFBQSxvQkFBQSxXQUFBO1VBQ0EsV0FBQSxTQUFBLFdBQUEsV0FBQSxTQUFBLFlBQUEsb0JBQUE7O1FBRUEsS0FBQSxVQUFBLFVBQUE7O1VBRUEsV0FBQSxJQUFBOztVQUVBLFdBQUEsU0FBQSxXQUFBLFdBQUEsU0FBQSxVQUFBOztVQUVBLFdBQUEsU0FBQSxhQUFBLEVBQUEsV0FBQSxTQUFBOzs7O01BSUEsV0FBQSxTQUFBOzs7Ozs7Ozs7QUNqQ0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsVUFBQSxrQkFBQTs7SUFFQSxlQUFBLFVBQUEsQ0FBQTtJQUNBLFNBQUEsZ0JBQUEsVUFBQTtRQUNBLElBQUEsWUFBQTtZQUNBLE1BQUE7WUFDQSxVQUFBOztRQUVBLE9BQUE7O1FBRUEsU0FBQSxLQUFBLE9BQUEsU0FBQSxPQUFBO1VBQ0EsTUFBQSxPQUFBLFlBQUE7WUFDQSxPQUFBLE1BQUEsTUFBQSxNQUFBLGdCQUFBO2FBQ0EsVUFBQSxVQUFBO1lBQ0EsU0FBQSxRQUFBLENBQUEsQ0FBQSxVQUFBOzs7Ozs7Ozs7Ozs7QUNuQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsUUFBQSxXQUFBOztJQUVBLFFBQUEsVUFBQSxDQUFBO0lBQ0EsU0FBQSxRQUFBLFNBQUE7TUFDQSxPQUFBLFFBQUE7Ozs7Ozs7Ozs7QUNUQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxVQUFBLFlBQUE7O0lBRUEsU0FBQSxVQUFBLENBQUEsVUFBQTtJQUNBLFNBQUEsVUFBQSxRQUFBLGVBQUE7UUFDQSxJQUFBLFlBQUE7WUFDQSxNQUFBO1lBQ0EsVUFBQTtZQUNBLE9BQUE7Y0FDQSxVQUFBOzs7UUFHQSxPQUFBOztRQUVBLFNBQUEsS0FBQSxPQUFBLFNBQUE7VUFDQSxRQUFBLEdBQUEsU0FBQSxVQUFBLEdBQUE7Y0FDQSxFQUFBOztjQUVBLEdBQUEsTUFBQSxVQUFBO2dCQUNBLE9BQUEsY0FBQSxNQUFBO2dCQUNBLE9BQUEsR0FBQSxPQUFBLFNBQUEsSUFBQSxDQUFBLFFBQUE7O21CQUVBO2dCQUNBLEVBQUEsTUFBQTs7Ozs7Ozs7Ozs7OztBQzNCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxVQUFBLG9CQUFBOztJQUVBLGlCQUFBLFVBQUEsQ0FBQTtJQUNBLFNBQUEsa0JBQUEsU0FBQTtRQUNBLElBQUEsWUFBQTtZQUNBLE1BQUE7WUFDQSxVQUFBOztRQUVBLE9BQUE7O1FBRUEsU0FBQSxLQUFBLE9BQUEsU0FBQTs7VUFFQSxJQUFBLFFBQUEsT0FBQTtZQUNBLFFBQUEsU0FBQTs7ZUFFQTtZQUNBLFFBQUEsR0FBQSxTQUFBLFVBQUEsR0FBQTtnQkFDQSxFQUFBOztnQkFFQSxJQUFBLFdBQUEsU0FBQTs7a0JBRUEsV0FBQTs7O2tCQUdBLEdBQUEsV0FBQTtvQkFDQSxFQUFBLE1BQUEsU0FBQSxNQUFBLFlBQUEsYUFBQSxTQUFBOztvQkFFQSxFQUFBLE1BQUEsU0FBQSxNQUFBLFlBQUEsZUFBQSxTQUFBOzt1QkFFQTtrQkFDQSxFQUFBLE1BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsVUFBQSxXQUFBOztJQUVBLFNBQUEsV0FBQTtRQUNBLElBQUEsWUFBQTtZQUNBLE1BQUE7WUFDQSxVQUFBOztRQUVBLE9BQUE7O1FBRUEsU0FBQSxLQUFBLE9BQUEsU0FBQSxPQUFBO1VBQ0EsUUFBQSxHQUFBLFNBQUEsVUFBQSxHQUFBO2NBQ0EsR0FBQSxRQUFBLEdBQUEsTUFBQSxFQUFBO2NBQ0EsSUFBQSxNQUFBLE1BQUE7a0JBQ0E7O2NBRUEsR0FBQSxLQUFBO2dCQUNBLE9BQUEsV0FBQTtnQkFDQSxLQUFBLENBQUEsT0FBQTtrQkFDQSxFQUFBLE1BQUE7OzttQkFHQTtnQkFDQSxFQUFBLE1BQUE7Ozs7OztRQU1BLFNBQUEsV0FBQSxLQUFBO1VBQ0EsSUFBQSxTQUFBO2NBQ0EsVUFBQSxFQUFBLElBQUEsUUFBQSxLQUFBLE1BQUEsU0FBQTs7VUFFQSxFQUFBLFFBQUEsT0FBQSxFQUFBLFdBQUEsS0FBQTtZQUNBLFFBQUE7WUFDQSxRQUFBO1lBQ0EsUUFBQTs7O1VBR0EsSUFBQSxRQUFBLFNBQUE7WUFDQSxRQUFBOzs7VUFHQSxPQUFBLEVBQUEsSUFBQTs7Ozs7Ozs7Ozs7QUMvQ0EsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsVUFBQSxPQUFBOztJQUVBLElBQUEsVUFBQSxDQUFBLGNBQUE7SUFDQSxTQUFBLEtBQUEsWUFBQSxXQUFBO1FBQ0EsSUFBQSxZQUFBO1lBQ0EsTUFBQTtZQUNBLFVBQUE7O1FBRUEsT0FBQTs7UUFFQSxTQUFBLEtBQUEsT0FBQSxTQUFBLE9BQUE7VUFDQSxJQUFBLFNBQUEsTUFBQTs7VUFFQSxTQUFBLGFBQUE7WUFDQSxJQUFBLEtBQUEsV0FBQSxJQUFBLFFBQUE7WUFDQSxRQUFBLEtBQUE7OztVQUdBO1VBQ0EsSUFBQSxrQkFBQSxVQUFBLFlBQUE7O1VBRUEsTUFBQSxJQUFBLFlBQUEsVUFBQTtZQUNBLFVBQUEsT0FBQTs7Ozs7Ozs7Ozs7O0FDNUJBLENBQUEsV0FBQTtJQUNBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFVBQUEsWUFBQTs7SUFFQSxTQUFBLFlBQUE7UUFDQSxJQUFBLFlBQUE7WUFDQSxNQUFBO1lBQ0EsVUFBQTs7UUFFQSxPQUFBOztRQUVBLFNBQUEsS0FBQSxPQUFBLFNBQUE7VUFDQSxRQUFBLEdBQUEsVUFBQSxXQUFBO1lBQ0EsSUFBQSxRQUFBLEVBQUE7Z0JBQ0EsT0FBQSxNQUFBLFVBQUE7Z0JBQ0EsV0FBQSxNQUFBLEtBQUE7Z0JBQ0EsUUFBQSxNQUFBLFFBQUE7O1lBRUEsTUFBQSxLQUFBLDZCQUFBLE1BQUE7ZUFDQSxLQUFBLFdBQUEsU0FBQSxHQUFBOzs7Ozs7Ozs7Ozs7QUN0QkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsVUFBQSxpQkFBQTs7SUFFQSxjQUFBLFVBQUEsQ0FBQSxXQUFBO0lBQ0EsU0FBQSxlQUFBLFNBQUEsVUFBQTtRQUNBLElBQUEsWUFBQTtZQUNBLE1BQUE7WUFDQSxVQUFBOztRQUVBLE9BQUE7O1FBRUEsU0FBQSxLQUFBLE9BQUEsU0FBQSxZQUFBO1VBQ0EsUUFBQSxHQUFBLFNBQUEsVUFBQTtZQUNBLFNBQUEsVUFBQTs7Y0FFQSxJQUFBLE1BQUEsU0FBQSxZQUFBO2NBQ0EsSUFBQSxZQUFBLFVBQUEsTUFBQSxPQUFBLFNBQUE7Y0FDQSxRQUFBLGNBQUE7OztlQUdBLFdBQUEsaUJBQUE7Ozs7Ozs7Ozs7OztBQ3ZCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQTtTQUNBLE9BQUE7U0FDQSxRQUFBLFNBQUE7O0lBRUEsTUFB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QSxPQUFBLFdBQUE7UUFDQTs7OztRQUlBLFNBQUEsV0FBQTtVQUNBLEtBQUEsSUFBQTs7O1FBR0EsT0FBQSxnQkFBQSxXQUFBO1lBQ0EsTUFBQSxLQUFBLHNDQUFBLE9BQUEsU0FBQSxRQUFBLFNBQUEsTUFBQSxPQUFBO2NBQ0EsT0FBQSxTQUFBO2VBQ0EsUUFBQSxTQUFBLE1BQUEsT0FBQTtjQUNBLE9BQUEsU0FBQTs7O1FBR0EsT0FBQSxjQUFBLFdBQUE7WUFDQSxNQUFBLElBQUEsc0NBQUEsUUFBQSxTQUFBLEtBQUE7Y0FDQSxPQUFBLFdBQUE7ZUFDQSxNQUFBLFNBQUEsTUFBQSxPQUFBO2NBQ0EsT0FBQSxXQUFBOzs7O1FBSUEsT0FBQTs7O0FBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIFxyXG4gKiBBbmdsZSAtIEJvb3RzdHJhcCBBZG1pbiBBcHAgKyBBbmd1bGFySlNcclxuICogXHJcbiAqIFZlcnNpb246IDMuMy4xXHJcbiAqIEF1dGhvcjogQHRoZW1pY29uX2NvXHJcbiAqIFdlYnNpdGU6IGh0dHA6Ly90aGVtaWNvbi5jb1xyXG4gKiBMaWNlbnNlOiBodHRwczovL3dyYXBib290c3RyYXAuY29tL2hlbHAvbGljZW5zZXNcclxuICogXHJcbiAqL1xyXG5cclxuLy8gQVBQIFNUQVJUXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhbmdsZScsIFtcclxuICAgICAgICAgICAgJ2FwcC5jb3JlJyxcclxuICAgICAgICAgICAgJ2FwcC5yb3V0ZXMnLFxyXG4gICAgICAgICAgICAnYXBwLnNpZGViYXInLFxyXG4gICAgICAgICAgICAnYXBwLm5hdnNlYXJjaCcsXHJcbiAgICAgICAgICAgICdhcHAucHJlbG9hZGVyJyxcclxuICAgICAgICAgICAgJ2FwcC5sb2FkaW5nYmFyJyxcclxuICAgICAgICAgICAgJ2FwcC50cmFuc2xhdGUnLFxyXG4gICAgICAgICAgICAnYXBwLnNldHRpbmdzJyxcclxuICAgICAgICAgICAgJ2FwcC51dGlscydcclxuICAgICAgICBdKTtcclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbG9ycycsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJywgW1xyXG4gICAgICAgICAgICAnbmdSb3V0ZScsXHJcbiAgICAgICAgICAgICduZ0FuaW1hdGUnLFxyXG4gICAgICAgICAgICAnbmdTdG9yYWdlJyxcclxuICAgICAgICAgICAgJ25nQ29va2llcycsXHJcbiAgICAgICAgICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICAgICAgICAgJ3VpLmJvb3RzdHJhcCcsXHJcbiAgICAgICAgICAgICd1aS5yb3V0ZXInLFxyXG4gICAgICAgICAgICAnb2MubGF6eUxvYWQnLFxyXG4gICAgICAgICAgICAnY2ZwLmxvYWRpbmdCYXInLFxyXG4gICAgICAgICAgICAnbmdTYW5pdGl6ZScsXHJcbiAgICAgICAgICAgICduZ1Jlc291cmNlJyxcclxuICAgICAgICAgICAgJ3VpLnV0aWxzJ1xyXG4gICAgICAgIF0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmxhenlsb2FkJywgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmxvYWRpbmdiYXInLCBbXSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubmF2c2VhcmNoJywgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnByZWxvYWRlcicsIFtdKTtcclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnJvdXRlcycsIFtcclxuICAgICAgICAgICAgJ2FwcC5sYXp5bG9hZCdcclxuICAgICAgICBdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5zZXR0aW5ncycsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5zaWRlYmFyJywgW10pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnRyYW5zbGF0ZScsIFtdKTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycsIFtcclxuICAgICAgICAgICdhcHAuY29sb3JzJ1xyXG4gICAgICAgICAgXSk7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbG9ycycpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUFBfQ09MT1JTJywge1xyXG4gICAgICAgICAgJ3ByaW1hcnknOiAgICAgICAgICAgICAgICAnIzVkOWNlYycsXHJcbiAgICAgICAgICAnc3VjY2Vzcyc6ICAgICAgICAgICAgICAgICcjMjdjMjRjJyxcclxuICAgICAgICAgICdpbmZvJzogICAgICAgICAgICAgICAgICAgJyMyM2I3ZTUnLFxyXG4gICAgICAgICAgJ3dhcm5pbmcnOiAgICAgICAgICAgICAgICAnI2ZmOTAyYicsXHJcbiAgICAgICAgICAnZGFuZ2VyJzogICAgICAgICAgICAgICAgICcjZjA1MDUwJyxcclxuICAgICAgICAgICdpbnZlcnNlJzogICAgICAgICAgICAgICAgJyMxMzFlMjYnLFxyXG4gICAgICAgICAgJ2dyZWVuJzogICAgICAgICAgICAgICAgICAnIzM3YmM5YicsXHJcbiAgICAgICAgICAncGluayc6ICAgICAgICAgICAgICAgICAgICcjZjUzMmU1JyxcclxuICAgICAgICAgICdwdXJwbGUnOiAgICAgICAgICAgICAgICAgJyM3MjY2YmEnLFxyXG4gICAgICAgICAgJ2RhcmsnOiAgICAgICAgICAgICAgICAgICAnIzNhM2Y1MScsXHJcbiAgICAgICAgICAneWVsbG93JzogICAgICAgICAgICAgICAgICcjZmFkNzMyJyxcclxuICAgICAgICAgICdncmF5LWRhcmtlcic6ICAgICAgICAgICAgJyMyMzI3MzUnLFxyXG4gICAgICAgICAgJ2dyYXktZGFyayc6ICAgICAgICAgICAgICAnIzNhM2Y1MScsXHJcbiAgICAgICAgICAnZ3JheSc6ICAgICAgICAgICAgICAgICAgICcjZGRlNmU5JyxcclxuICAgICAgICAgICdncmF5LWxpZ2h0JzogICAgICAgICAgICAgJyNlNGVhZWMnLFxyXG4gICAgICAgICAgJ2dyYXktbGlnaHRlcic6ICAgICAgICAgICAnI2VkZjFmMidcclxuICAgICAgICB9KVxyXG4gICAgICAgIDtcclxufSkoKTsiLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogY29sb3JzLmpzXG4gKiBTZXJ2aWNlcyB0byByZXRyaWV2ZSBnbG9iYWwgY29sb3JzXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvbG9ycycpXG4gICAgICAgIC5zZXJ2aWNlKCdDb2xvcnMnLCBDb2xvcnMpO1xuXG4gICAgQ29sb3JzLiRpbmplY3QgPSBbJ0FQUF9DT0xPUlMnXTtcbiAgICBmdW5jdGlvbiBDb2xvcnMoQVBQX0NPTE9SUykge1xuICAgICAgICB0aGlzLmJ5TmFtZSA9IGJ5TmFtZTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgZnVuY3Rpb24gYnlOYW1lKG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gKEFQUF9DT0xPUlNbbmFtZV0gfHwgJyNmZmYnKTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLmNvcmUnKVxyXG4gICAgICAgIC5jb25maWcoY29yZUNvbmZpZyk7XHJcblxyXG4gICAgY29yZUNvbmZpZy4kaW5qZWN0ID0gWyckY29udHJvbGxlclByb3ZpZGVyJywgJyRjb21waWxlUHJvdmlkZXInLCAnJGZpbHRlclByb3ZpZGVyJywgJyRwcm92aWRlJywgJyRhbmltYXRlUHJvdmlkZXInXTtcclxuICAgIGZ1bmN0aW9uIGNvcmVDb25maWcoJGNvbnRyb2xsZXJQcm92aWRlciwgJGNvbXBpbGVQcm92aWRlciwgJGZpbHRlclByb3ZpZGVyLCAkcHJvdmlkZSwgJGFuaW1hdGVQcm92aWRlcil7XHJcblxyXG4gICAgICB2YXIgY29yZSA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuY29yZScpO1xyXG4gICAgICAvLyByZWdpc3RlcmluZyBjb21wb25lbnRzIGFmdGVyIGJvb3RzdHJhcFxyXG4gICAgICBjb3JlLmNvbnRyb2xsZXIgPSAkY29udHJvbGxlclByb3ZpZGVyLnJlZ2lzdGVyO1xyXG4gICAgICBjb3JlLmRpcmVjdGl2ZSAgPSAkY29tcGlsZVByb3ZpZGVyLmRpcmVjdGl2ZTtcclxuICAgICAgY29yZS5maWx0ZXIgICAgID0gJGZpbHRlclByb3ZpZGVyLnJlZ2lzdGVyO1xyXG4gICAgICBjb3JlLmZhY3RvcnkgICAgPSAkcHJvdmlkZS5mYWN0b3J5O1xyXG4gICAgICBjb3JlLnNlcnZpY2UgICAgPSAkcHJvdmlkZS5zZXJ2aWNlO1xyXG4gICAgICBjb3JlLmNvbnN0YW50ICAgPSAkcHJvdmlkZS5jb25zdGFudDtcclxuICAgICAgY29yZS52YWx1ZSAgICAgID0gJHByb3ZpZGUudmFsdWU7XHJcblxyXG4gICAgICAvLyBEaXNhYmxlcyBhbmltYXRpb24gb24gaXRlbXMgd2l0aCBjbGFzcyAubmctbm8tYW5pbWF0aW9uXHJcbiAgICAgICRhbmltYXRlUHJvdmlkZXIuY2xhc3NOYW1lRmlsdGVyKC9eKCg/IShuZy1uby1hbmltYXRpb24pKS4pKiQvKTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBNb2R1bGU6IGNvbnN0YW50cy5qc1xyXG4gKiBEZWZpbmUgY29uc3RhbnRzIHRvIGluamVjdCBhY3Jvc3MgdGhlIGFwcGxpY2F0aW9uXHJcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuY29yZScpXHJcbiAgICAgICAgLmNvbnN0YW50KCdBUFBfTUVESUFRVUVSWScsIHtcclxuICAgICAgICAgICdkZXNrdG9wTEcnOiAgICAgICAgICAgICAxMjAwLFxyXG4gICAgICAgICAgJ2Rlc2t0b3AnOiAgICAgICAgICAgICAgICA5OTIsXHJcbiAgICAgICAgICAndGFibGV0JzogICAgICAgICAgICAgICAgIDc2OCxcclxuICAgICAgICAgICdtb2JpbGUnOiAgICAgICAgICAgICAgICAgNDgwXHJcbiAgICAgICAgfSlcclxuICAgICAgO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5jb3JlJylcclxuICAgICAgICAucnVuKGFwcFJ1bik7XHJcblxyXG4gICAgYXBwUnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICAnJHdpbmRvdycsICckdGVtcGxhdGVDYWNoZScsICdDb2xvcnMnXTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYXBwUnVuKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkd2luZG93LCAkdGVtcGxhdGVDYWNoZSwgQ29sb3JzKSB7XHJcbiAgICAgIFxyXG4gICAgICAvLyBTZXQgcmVmZXJlbmNlIHRvIGFjY2VzcyB0aGVtIGZyb20gYW55IHNjb3BlXHJcbiAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcclxuICAgICAgJHJvb3RTY29wZS4kc3RvcmFnZSA9ICR3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuICAgICAgLy8gVW5jb21tZW50IHRoaXMgdG8gZGlzYWJsZSB0ZW1wbGF0ZSBjYWNoZVxyXG4gICAgICAvKiRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mKHRvU3RhdGUpICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICR0ZW1wbGF0ZUNhY2hlLnJlbW92ZSh0b1N0YXRlLnRlbXBsYXRlVXJsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSk7Ki9cclxuXHJcbiAgICAgIC8vIEFsbG93cyB0byB1c2UgYnJhbmRpbmcgY29sb3Igd2l0aCBpbnRlcnBvbGF0aW9uXHJcbiAgICAgIC8vIHt7IGNvbG9yQnlOYW1lKCdwcmltYXJ5JykgfX1cclxuICAgICAgJHJvb3RTY29wZS5jb2xvckJ5TmFtZSA9IENvbG9ycy5ieU5hbWU7XHJcblxyXG4gICAgICAvLyBjYW5jZWwgY2xpY2sgZXZlbnQgZWFzaWx5XHJcbiAgICAgICRyb290U2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oJGV2ZW50KSB7XHJcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gSG9va3MgRXhhbXBsZVxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuXHJcbiAgICAgIC8vIEhvb2sgbm90IGZvdW5kXHJcbiAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVOb3RGb3VuZCcsXHJcbiAgICAgICAgZnVuY3Rpb24oZXZlbnQsIHVuZm91bmRTdGF0ZS8qLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMqLykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bmZvdW5kU3RhdGUudG8pOyAvLyBcImxhenkuc3RhdGVcIlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1bmZvdW5kU3RhdGUudG9QYXJhbXMpOyAvLyB7YToxLCBiOjJ9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVuZm91bmRTdGF0ZS5vcHRpb25zKTsgLy8ge2luaGVyaXQ6ZmFsc2V9ICsgZGVmYXVsdCBvcHRpb25zXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIC8vIEhvb2sgZXJyb3JcclxuICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJyxcclxuICAgICAgICBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcywgZXJyb3Ipe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAvLyBIb29rIHN1Y2Nlc3NcclxuICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLFxyXG4gICAgICAgIGZ1bmN0aW9uKC8qZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zLCBmcm9tU3RhdGUsIGZyb21QYXJhbXMqLykge1xyXG4gICAgICAgICAgLy8gZGlzcGxheSBuZXcgdmlldyBmcm9tIHRvcFxyXG4gICAgICAgICAgJHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgICAgIC8vIFNhdmUgdGhlIHJvdXRlIHRpdGxlXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJUaXRsZSA9ICRzdGF0ZS5jdXJyZW50LnRpdGxlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gTG9hZCBhIHRpdGxlIGR5bmFtaWNhbGx5XHJcbiAgICAgICRyb290U2NvcGUuY3VyclRpdGxlID0gJHN0YXRlLmN1cnJlbnQudGl0bGU7XHJcbiAgICAgICRyb290U2NvcGUucGFnZVRpdGxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gJHJvb3RTY29wZS5hcHAubmFtZSArICcgLSAnICsgKCRyb290U2NvcGUuY3VyclRpdGxlIHx8ICRyb290U2NvcGUuYXBwLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHJldHVybiB0aXRsZTtcclxuICAgICAgfTsgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubGF6eWxvYWQnKVxyXG4gICAgICAgIC5jb25maWcobGF6eWxvYWRDb25maWcpO1xyXG5cclxuICAgIGxhenlsb2FkQ29uZmlnLiRpbmplY3QgPSBbJyRvY0xhenlMb2FkUHJvdmlkZXInLCAnQVBQX1JFUVVJUkVTJ107XHJcbiAgICBmdW5jdGlvbiBsYXp5bG9hZENvbmZpZygkb2NMYXp5TG9hZFByb3ZpZGVyLCBBUFBfUkVRVUlSRVMpe1xyXG5cclxuICAgICAgLy8gTGF6eSBMb2FkIG1vZHVsZXMgY29uZmlndXJhdGlvblxyXG4gICAgICAkb2NMYXp5TG9hZFByb3ZpZGVyLmNvbmZpZyh7XHJcbiAgICAgICAgZGVidWc6IGZhbHNlLFxyXG4gICAgICAgIGV2ZW50czogdHJ1ZSxcclxuICAgICAgICBtb2R1bGVzOiBBUFBfUkVRVUlSRVMubW9kdWxlc1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubGF6eWxvYWQnKVxyXG4gICAgICAgIC5jb25zdGFudCgnQVBQX1JFUVVJUkVTJywge1xyXG4gICAgICAgICAgLy8galF1ZXJ5IGJhc2VkIGFuZCBzdGFuZGFsb25lIHNjcmlwdHNcclxuICAgICAgICAgIHNjcmlwdHM6IHtcclxuICAgICAgICAgICAgJ21vZGVybml6cic6ICAgICAgICAgIFsndmVuZG9yL21vZGVybml6ci9tb2Rlcm5penIuY3VzdG9tLmpzJ10sXHJcbiAgICAgICAgICAgICdpY29ucyc6ICAgICAgICAgICAgICBbJ3ZlbmRvci9mb250YXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2ZW5kb3Ivc2ltcGxlLWxpbmUtaWNvbnMvY3NzL3NpbXBsZS1saW5lLWljb25zLmNzcyddXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gQW5ndWxhciBiYXNlZCBzY3JpcHQgKHVzZSB0aGUgcmlnaHQgbW9kdWxlIG5hbWUpXHJcbiAgICAgICAgICBtb2R1bGVzOiBbXHJcbiAgICAgICAgICAgIC8vIHtuYW1lOiAndG9hc3RlcicsIGZpbGVzOiBbJ3ZlbmRvci9hbmd1bGFyanMtdG9hc3Rlci90b2FzdGVyLmpzJywgJ3ZlbmRvci9hbmd1bGFyanMtdG9hc3Rlci90b2FzdGVyLmNzcyddfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAubG9hZGluZ2JhcicpXHJcbiAgICAgICAgLmNvbmZpZyhsb2FkaW5nYmFyQ29uZmlnKVxyXG4gICAgICAgIDtcclxuICAgIGxvYWRpbmdiYXJDb25maWcuJGluamVjdCA9IFsnY2ZwTG9hZGluZ0JhclByb3ZpZGVyJ107XHJcbiAgICBmdW5jdGlvbiBsb2FkaW5nYmFyQ29uZmlnKGNmcExvYWRpbmdCYXJQcm92aWRlcil7XHJcbiAgICAgIGNmcExvYWRpbmdCYXJQcm92aWRlci5pbmNsdWRlQmFyID0gdHJ1ZTtcclxuICAgICAgY2ZwTG9hZGluZ0JhclByb3ZpZGVyLmluY2x1ZGVTcGlubmVyID0gZmFsc2U7XHJcbiAgICAgIGNmcExvYWRpbmdCYXJQcm92aWRlci5sYXRlbmN5VGhyZXNob2xkID0gNTAwO1xyXG4gICAgICBjZnBMb2FkaW5nQmFyUHJvdmlkZXIucGFyZW50U2VsZWN0b3IgPSAnLndyYXBwZXIgPiBzZWN0aW9uJztcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5sb2FkaW5nYmFyJylcclxuICAgICAgICAucnVuKGxvYWRpbmdiYXJSdW4pXHJcbiAgICAgICAgO1xyXG4gICAgbG9hZGluZ2JhclJ1bi4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgJ2NmcExvYWRpbmdCYXInXTtcclxuICAgIGZ1bmN0aW9uIGxvYWRpbmdiYXJSdW4oJHJvb3RTY29wZSwgJHRpbWVvdXQsIGNmcExvYWRpbmdCYXIpe1xyXG5cclxuICAgICAgLy8gTG9hZGluZyBiYXIgdHJhbnNpdGlvblxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuICAgICAgdmFyIHRoQmFyO1xyXG4gICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmKCQoJy53cmFwcGVyID4gc2VjdGlvbicpLmxlbmd0aCkgLy8gY2hlY2sgaWYgYmFyIGNvbnRhaW5lciBleGlzdHNcclxuICAgICAgICAgICAgdGhCYXIgPSAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBjZnBMb2FkaW5nQmFyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0sIDApOyAvLyBzZXRzIGEgbGF0ZW5jeSBUaHJlc2hvbGRcclxuICAgICAgfSk7XHJcbiAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIGV2ZW50LnRhcmdldFNjb3BlLiR3YXRjaCgnJHZpZXdDb250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdGltZW91dC5jYW5jZWwodGhCYXIpO1xyXG4gICAgICAgICAgICBjZnBMb2FkaW5nQmFyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogbmF2YmFyLXNlYXJjaC5qc1xuICogTmF2YmFyIHNlYXJjaCB0b2dnbGVyICogQXV0byBkaXNtaXNzIG9uIEVTQyBrZXlcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAubmF2c2VhcmNoJylcbiAgICAgICAgLmRpcmVjdGl2ZSgnc2VhcmNoT3BlbicsIHNlYXJjaE9wZW4pXG4gICAgICAgIC5kaXJlY3RpdmUoJ3NlYXJjaERpc21pc3MnLCBzZWFyY2hEaXNtaXNzKTtcblxuICAgIC8vXG4gICAgLy8gZGlyZWN0aXZlcyBkZWZpbml0aW9uXG4gICAgLy8gXG4gICAgXG4gICAgZnVuY3Rpb24gc2VhcmNoT3BlbiAoKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiBzZWFyY2hPcGVuQ29udHJvbGxlcixcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQSdcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlYXJjaERpc21pc3MgKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgY29udHJvbGxlcjogc2VhcmNoRGlzbWlzc0NvbnRyb2xsZXIsXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gQ29udHJsbGVyIGRlZmluaXRpb25cbiAgICAvLyBcbiAgICBcbiAgICBzZWFyY2hPcGVuQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnTmF2U2VhcmNoJ107XG4gICAgZnVuY3Rpb24gc2VhcmNoT3BlbkNvbnRyb2xsZXIgKCRzY29wZSwgJGVsZW1lbnQsIE5hdlNlYXJjaCkge1xuICAgICAgJGVsZW1lbnRcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pXG4gICAgICAgIC5vbignY2xpY2snLCBOYXZTZWFyY2gudG9nZ2xlKTtcbiAgICB9XG5cbiAgICBzZWFyY2hEaXNtaXNzQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnTmF2U2VhcmNoJ107XG4gICAgZnVuY3Rpb24gc2VhcmNoRGlzbWlzc0NvbnRyb2xsZXIgKCRzY29wZSwgJGVsZW1lbnQsIE5hdlNlYXJjaCkge1xuICAgICAgXG4gICAgICB2YXIgaW5wdXRTZWxlY3RvciA9ICcubmF2YmFyLWZvcm0gaW5wdXRbdHlwZT1cInRleHRcIl0nO1xuXG4gICAgICAkKGlucHV0U2VsZWN0b3IpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpOyB9KVxuICAgICAgICAub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSAvLyBFU0NcbiAgICAgICAgICAgIE5hdlNlYXJjaC5kaXNtaXNzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgIC8vIGNsaWNrIGFueXdoZXJlIGNsb3NlcyB0aGUgc2VhcmNoXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBOYXZTZWFyY2guZGlzbWlzcyk7XG4gICAgICAvLyBkaXNtaXNzYWJsZSBvcHRpb25zXG4gICAgICAkZWxlbWVudFxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfSlcbiAgICAgICAgLm9uKCdjbGljaycsIE5hdlNlYXJjaC5kaXNtaXNzKTtcbiAgICB9XG5cbn0pKCk7XG5cbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBuYXYtc2VhcmNoLmpzXG4gKiBTZXJ2aWNlcyB0byBzaGFyZSBuYXZiYXIgc2VhcmNoIGZ1bmN0aW9uc1xuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAubmF2c2VhcmNoJylcbiAgICAgICAgLnNlcnZpY2UoJ05hdlNlYXJjaCcsIE5hdlNlYXJjaCk7XG5cbiAgICBmdW5jdGlvbiBOYXZTZWFyY2goKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlID0gdG9nZ2xlO1xuICAgICAgICB0aGlzLmRpc21pc3MgPSBkaXNtaXNzO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICB2YXIgbmF2YmFyRm9ybVNlbGVjdG9yID0gJ2Zvcm0ubmF2YmFyLWZvcm0nO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICB2YXIgbmF2YmFyRm9ybSA9ICQobmF2YmFyRm9ybVNlbGVjdG9yKTtcblxuICAgICAgICAgIG5hdmJhckZvcm0udG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICBcbiAgICAgICAgICB2YXIgaXNPcGVuID0gbmF2YmFyRm9ybS5oYXNDbGFzcygnb3BlbicpO1xuICAgICAgICAgIFxuICAgICAgICAgIG5hdmJhckZvcm0uZmluZCgnaW5wdXQnKVtpc09wZW4gPyAnZm9jdXMnIDogJ2JsdXInXSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzbWlzcygpIHtcbiAgICAgICAgICAkKG5hdmJhckZvcm1TZWxlY3RvcilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbicpIC8vIENsb3NlIGNvbnRyb2xcbiAgICAgICAgICAgIC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmJsdXIoKSAvLyByZW1vdmUgZm9jdXNcbiAgICAgICAgICAgIC52YWwoJycpIC8vIEVtcHR5IGlucHV0XG4gICAgICAgICAgICA7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5wcmVsb2FkZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3ByZWxvYWRlcicsIHByZWxvYWRlcik7XHJcblxyXG4gICAgcHJlbG9hZGVyLiRpbmplY3QgPSBbJyRhbmltYXRlJywgJyR0aW1lb3V0JywgJyRxJ107XHJcbiAgICBmdW5jdGlvbiBwcmVsb2FkZXIgKCRhbmltYXRlLCAkdGltZW91dCwgJHEpIHtcclxuXHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQUMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXHJcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmVsb2FkZXItcHJvZ3Jlc3NcIj4nICtcclxuICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcmVsb2FkZXItcHJvZ3Jlc3MtYmFyXCIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJ25nLXN0eWxlPVwie3dpZHRoOiBsb2FkQ291bnRlciArIFxcJyVcXCd9XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgJzwvZGl2PidcclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICBsaW5rOiBsaW5rXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuICAgICAgICAvLy8vLy8vXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsKSB7XHJcblxyXG4gICAgICAgICAgc2NvcGUubG9hZENvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAgIHZhciBjb3VudGVyICA9IDAsXHJcbiAgICAgICAgICAgICAgdGltZW91dDtcclxuXHJcbiAgICAgICAgICAvLyBkaXNhYmxlcyBzY3JvbGxiYXJcclxuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnYm9keScpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAvLyBlbnN1cmUgY2xhc3MgaXMgcHJlc2VudCBmb3Igc3R5bGluZ1xyXG4gICAgICAgICAgZWwuYWRkQ2xhc3MoJ3ByZWxvYWRlcicpO1xyXG5cclxuICAgICAgICAgIGFwcFJlYWR5KCkudGhlbihlbmRDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICB0aW1lb3V0ID0gJHRpbWVvdXQoc3RhcnRDb3VudGVyKTtcclxuXHJcbiAgICAgICAgICAvLy8vLy8vXHJcblxyXG4gICAgICAgICAgZnVuY3Rpb24gc3RhcnRDb3VudGVyKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IDEwMCAtIGNvdW50ZXI7XHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSBjb3VudGVyICsgKDAuMDE1ICogTWF0aC5wb3coMSAtIE1hdGguc3FydChyZW1haW5pbmcpLCAyKSk7XHJcblxyXG4gICAgICAgICAgICBzY29wZS5sb2FkQ291bnRlciA9IHBhcnNlSW50KGNvdW50ZXIsIDEwKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVvdXQgPSAkdGltZW91dChzdGFydENvdW50ZXIsIDIwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBlbmRDb3VudGVyKCkge1xyXG5cclxuICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKHRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgc2NvcGUubG9hZENvdW50ZXIgPSAxMDA7XHJcblxyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIC8vIGFuaW1hdGUgcHJlbG9hZGVyIGhpZGluZ1xyXG4gICAgICAgICAgICAgICRhbmltYXRlLmFkZENsYXNzKGVsLCAncHJlbG9hZGVyLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgIC8vIHJldG9yZSBzY3JvbGxiYXJcclxuICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ2JvZHknKS5jc3MoJ292ZXJmbG93JywgJycpO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGFwcFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICB2YXIgdmlld3NMb2FkZWQgPSAwO1xyXG4gICAgICAgICAgICAvLyBpZiB0aGlzIGRvZXNuJ3Qgc3luYyB3aXRoIHRoZSByZWFsIGFwcCByZWFkeVxyXG4gICAgICAgICAgICAvLyBhIGN1c3RvbSBldmVudCBtdXN0IGJlIHVzZWQgaW5zdGVhZFxyXG4gICAgICAgICAgICB2YXIgb2ZmID0gc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgdmlld3NMb2FkZWQgKys7XHJcbiAgICAgICAgICAgICAgLy8gd2Uga25vdyB0aGVyZSBhcmUgYXQgbGVhc3QgdHdvIHZpZXdzIHRvIGJlIGxvYWRlZCBcclxuICAgICAgICAgICAgICAvLyBiZWZvcmUgdGhlIGFwcCBpcyByZWFkeSAoMS1pbmRleC5odG1sIDItYXBwKi5odG1sKVxyXG4gICAgICAgICAgICAgIGlmICggdmlld3NMb2FkZWQgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdpdGggcmVzb2x2ZSB0aGlzIGZpcmVzIG9ubHkgb25jZVxyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgb2ZmKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSAvL2xpbmtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIE1vZHVsZTogaGVscGVycy5qc1xyXG4gKiBQcm92aWRlcyBoZWxwZXIgZnVuY3Rpb25zIGZvciByb3V0ZXMgZGVmaW5pdGlvblxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnJvdXRlcycpXHJcbiAgICAgICAgLnByb3ZpZGVyKCdSb3V0ZUhlbHBlcnMnLCBSb3V0ZUhlbHBlcnNQcm92aWRlcilcclxuICAgICAgICA7XHJcblxyXG4gICAgUm91dGVIZWxwZXJzUHJvdmlkZXIuJGluamVjdCA9IFsnQVBQX1JFUVVJUkVTJ107XHJcbiAgICBmdW5jdGlvbiBSb3V0ZUhlbHBlcnNQcm92aWRlcihBUFBfUkVRVUlSRVMpIHtcclxuXHJcbiAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vIHByb3ZpZGVyIGFjY2VzcyBsZXZlbFxyXG4gICAgICAgIGJhc2VwYXRoOiBiYXNlcGF0aCxcclxuICAgICAgICByZXNvbHZlRm9yOiByZXNvbHZlRm9yLFxyXG4gICAgICAgIC8vIGNvbnRyb2xsZXIgYWNjZXNzIGxldmVsXHJcbiAgICAgICAgJGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBiYXNlcGF0aDogYmFzZXBhdGgsXHJcbiAgICAgICAgICAgIHJlc29sdmVGb3I6IHJlc29sdmVGb3JcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gU2V0IGhlcmUgdGhlIGJhc2Ugb2YgdGhlIHJlbGF0aXZlIHBhdGhcclxuICAgICAgLy8gZm9yIGFsbCBhcHAgdmlld3NcclxuICAgICAgZnVuY3Rpb24gYmFzZXBhdGgodXJpKSB7XHJcbiAgICAgICAgcmV0dXJuICdhcHAvdmlld3MvJyArIHVyaTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2VuZXJhdGVzIGEgcmVzb2x2ZSBvYmplY3QgYnkgcGFzc2luZyBzY3JpcHQgbmFtZXNcclxuICAgICAgLy8gcHJldmlvdXNseSBjb25maWd1cmVkIGluIGNvbnN0YW50LkFQUF9SRVFVSVJFU1xyXG4gICAgICBmdW5jdGlvbiByZXNvbHZlRm9yKCkge1xyXG4gICAgICAgIHZhciBfYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZGVwczogWyckb2NMYXp5TG9hZCcsJyRxJywgZnVuY3Rpb24gKCRvY0xMLCAkcSkge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGVzIGEgcHJvbWlzZSBjaGFpbiBmb3IgZWFjaCBhcmd1bWVudFxyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oMSk7IC8vIGVtcHR5IHByb21pc2VcclxuICAgICAgICAgICAgZm9yKHZhciBpPTAsIGxlbj1fYXJncy5sZW5ndGg7IGkgPCBsZW47IGkgKyspe1xyXG4gICAgICAgICAgICAgIHByb21pc2UgPSBhbmRUaGVuKF9hcmdzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZXMgcHJvbWlzZSB0byBjaGFpbiBkeW5hbWljYWxseVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhbmRUaGVuKF9hcmcpIHtcclxuICAgICAgICAgICAgICAvLyBhbHNvIHN1cHBvcnQgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlXHJcbiAgICAgICAgICAgICAgaWYodHlwZW9mIF9hcmcgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oX2FyZyk7XHJcbiAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGlzIGEgbW9kdWxlLCBwYXNzIHRoZSBuYW1lLiBJZiBub3QsIHBhc3MgdGhlIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdoYXRUb0xvYWQgPSBnZXRSZXF1aXJlZChfYXJnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzaW1wbGUgZXJyb3IgY2hlY2tcclxuICAgICAgICAgICAgICAgICAgICBpZighd2hhdFRvTG9hZCkgcmV0dXJuICQuZXJyb3IoJ1JvdXRlIHJlc29sdmU6IEJhZCByZXNvdXJjZSBuYW1lIFsnICsgX2FyZyArICddJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmluYWxseSwgcmV0dXJuIGEgcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkb2NMTC5sb2FkKCB3aGF0VG9Mb2FkICk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGFuZCByZXR1cm5zIHJlcXVpcmVkIGRhdGFcclxuICAgICAgICAgICAgLy8gYW5hbHl6ZSBtb2R1bGUgaXRlbXMgd2l0aCB0aGUgZm9ybSBbbmFtZTogJycsIGZpbGVzOiBbXV1cclxuICAgICAgICAgICAgLy8gYW5kIGFsc28gc2ltcGxlIGFycmF5IG9mIHNjcmlwdCBmaWxlcyAoZm9yIG5vdCBhbmd1bGFyIGpzKVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRSZXF1aXJlZChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgaWYgKEFQUF9SRVFVSVJFUy5tb2R1bGVzKVxyXG4gICAgICAgICAgICAgICAgICBmb3IodmFyIG0gaW4gQVBQX1JFUVVJUkVTLm1vZHVsZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihBUFBfUkVRVUlSRVMubW9kdWxlc1ttXS5uYW1lICYmIEFQUF9SRVFVSVJFUy5tb2R1bGVzW21dLm5hbWUgPT09IG5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFQUF9SRVFVSVJFUy5tb2R1bGVzW21dO1xyXG4gICAgICAgICAgICAgIHJldHVybiBBUFBfUkVRVUlSRVMuc2NyaXB0cyAmJiBBUFBfUkVRVUlSRVMuc2NyaXB0c1tuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1dfTtcclxuICAgICAgfSAvLyByZXNvbHZlRm9yXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiBjb25maWcuanNcclxuICogQXBwIHJvdXRlcyBhbmQgcmVzb3VyY2VzIGNvbmZpZ3VyYXRpb25cclxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblxyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAucm91dGVzJylcclxuICAgICAgICAuY29uZmlnKHJvdXRlc0NvbmZpZyk7XHJcblxyXG4gICAgcm91dGVzQ29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsICdSb3V0ZUhlbHBlcnNQcm92aWRlciddO1xyXG4gICAgZnVuY3Rpb24gcm91dGVzQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCBoZWxwZXIpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCB0aGUgZm9sbG93aW5nIHRvIHRydWUgdG8gZW5hYmxlIHRoZSBIVE1MNSBNb2RlXHJcbiAgICAgICAgLy8gWW91IG1heSBoYXZlIHRvIHNldCA8YmFzZT4gdGFnIGluIGluZGV4IGFuZCBhIHJvdXRpbmcgY29uZmlndXJhdGlvbiBpbiB5b3VyIHNlcnZlclxyXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XHJcblxyXG4gICAgICAgIC8vIGRlZmF1bHRzIHRvIGRhc2hib2FyZFxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hcHAvc2luZ2xldmlldycpO1xyXG5cclxuICAgICAgICAvLyBcclxuICAgICAgICAvLyBBcHBsaWNhdGlvbiBSb3V0ZXNcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgIFxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAuc3RhdGUoJ2FwcCcsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvYXBwJyxcclxuICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdhcHAuaHRtbCcpLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IGhlbHBlci5yZXNvbHZlRm9yKCdtb2Rlcm5penInLCAnaWNvbnMnKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5zdGF0ZSgnYXBwLnNpbmdsZXZpZXcnLCB7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL3NpbmdsZXZpZXcnLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAnQ3JlYXRlIEVudHJpZXMnLFxyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ3NpbmdsZXZpZXcuaHRtbCcpLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIgOiAnU3R1ZGVudENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLnN0YXRlKCdhcHAuc3VibWVudScsIHtcclxuICAgICAgICAgICAgICB1cmw6ICcvc3VibWVudScsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICdTdWJtZW51JyxcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdzdWJtZW51Lmh0bWwnKSxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyIDogJ1N0dWRlbnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgLy8gQ1VTVE9NIFJFU09MVkVTXHJcbiAgICAgICAgICAvLyAgIEFkZCB5b3VyIG93biByZXNvbHZlcyBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICAvLyAgIGZvbGxvd2luZyB0aGlzIG9iamVjdCBleHRlbmRcclxuICAgICAgICAgIC8vICAgbWV0aG9kXHJcbiAgICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcclxuICAgICAgICAgIC8vIC5zdGF0ZSgnYXBwLnNvbWVyb3V0ZScsIHtcclxuICAgICAgICAgIC8vICAgdXJsOiAnL3NvbWVfdXJsJyxcclxuICAgICAgICAgIC8vICAgdGVtcGxhdGVVcmw6ICdwYXRoX3RvX3RlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgICAgLy8gICBjb250cm9sbGVyOiAnc29tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgLy8gICByZXNvbHZlOiBhbmd1bGFyLmV4dGVuZChcclxuICAgICAgICAgIC8vICAgICBoZWxwZXIucmVzb2x2ZUZvcigpLCB7XHJcbiAgICAgICAgICAvLyAgICAgLy8gWU9VUiBSRVNPTFZFUyBHTyBIRVJFXHJcbiAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgLy8gICApXHJcbiAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgO1xyXG5cclxuICAgIH0gLy8gcm91dGVzQ29uZmlnXHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuc2V0dGluZ3MnKVxyXG4gICAgICAgIC5ydW4oc2V0dGluZ3NSdW4pO1xyXG5cclxuICAgIHNldHRpbmdzUnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJGxvY2FsU3RvcmFnZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldHRpbmdzUnVuKCRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2Upe1xyXG5cclxuICAgICAgLy8gR2xvYmFsIFNldHRpbmdzXHJcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICRyb290U2NvcGUuYXBwID0ge1xyXG4gICAgICAgIG5hbWU6ICdBbmdsZScsXHJcbiAgICAgICAgZGVzY3JpcHRpb246ICdBbmd1bGFyIEJvb3RzdHJhcCBBZG1pbiBUZW1wbGF0ZScsXHJcbiAgICAgICAgeWVhcjogKChuZXcgRGF0ZSgpKS5nZXRGdWxsWWVhcigpKSxcclxuICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgIGlzRml4ZWQ6IHRydWUsXHJcbiAgICAgICAgICBpc0NvbGxhcHNlZDogZmFsc2UsXHJcbiAgICAgICAgICBpc0JveGVkOiBmYWxzZSxcclxuICAgICAgICAgIGlzUlRMOiBmYWxzZSxcclxuICAgICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxyXG4gICAgICAgICAgaXNGbG9hdDogZmFsc2UsXHJcbiAgICAgICAgICBhc2lkZUhvdmVyOiBmYWxzZSxcclxuICAgICAgICAgIHRoZW1lOiBudWxsLFxyXG4gICAgICAgICAgYXNpZGVTY3JvbGxiYXI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB1c2VGdWxsTGF5b3V0OiBmYWxzZSxcclxuICAgICAgICBoaWRkZW5Gb290ZXI6IGZhbHNlLFxyXG4gICAgICAgIG9mZnNpZGViYXJPcGVuOiBmYWxzZSxcclxuICAgICAgICBhc2lkZVRvZ2dsZWQ6IGZhbHNlLFxyXG4gICAgICAgIHZpZXdBbmltYXRpb246ICduZy1mYWRlSW5VcCdcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIFNldHVwIHRoZSBsYXlvdXQgbW9kZVxyXG4gICAgICAkcm9vdFNjb3BlLmFwcC5sYXlvdXQuaG9yaXpvbnRhbCA9ICggJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMubGF5b3V0ID09PSAnYXBwLWgnKSA7XHJcblxyXG4gICAgICAvLyBSZXN0b3JlIGxheW91dCBzZXR0aW5ncyBbKioqIFVOQ09NTUVOVCBUTyBFTkFCTEUgKioqXVxyXG4gICAgICAvLyBpZiggYW5ndWxhci5pc0RlZmluZWQoJGxvY2FsU3RvcmFnZS5sYXlvdXQpIClcclxuICAgICAgLy8gICAkcm9vdFNjb3BlLmFwcC5sYXlvdXQgPSAkbG9jYWxTdG9yYWdlLmxheW91dDtcclxuICAgICAgLy8gZWxzZVxyXG4gICAgICAvLyAgICRsb2NhbFN0b3JhZ2UubGF5b3V0ID0gJHJvb3RTY29wZS5hcHAubGF5b3V0O1xyXG4gICAgICAvL1xyXG4gICAgICAvLyAkcm9vdFNjb3BlLiR3YXRjaCgnYXBwLmxheW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gICAkbG9jYWxTdG9yYWdlLmxheW91dCA9ICRyb290U2NvcGUuYXBwLmxheW91dDtcclxuICAgICAgLy8gfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAvLyBDbG9zZSBzdWJtZW51IHdoZW4gc2lkZWJhciBjaGFuZ2UgZnJvbSBjb2xsYXBzZWQgdG8gbm9ybWFsXHJcbiAgICAgICRyb290U2NvcGUuJHdhdGNoKCdhcHAubGF5b3V0LmlzQ29sbGFwc2VkJywgZnVuY3Rpb24obmV3VmFsdWUpIHtcclxuICAgICAgICBpZiggbmV3VmFsdWUgPT09IGZhbHNlIClcclxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2xvc2VTaWRlYmFyTWVudScpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiBzaWRlYmFyLW1lbnUuanNcclxuICogSGFuZGxlIHNpZGViYXIgY29sbGFwc2libGUgZWxlbWVudHNcclxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC5zaWRlYmFyJylcclxuICAgICAgICAuY29udHJvbGxlcignU2lkZWJhckNvbnRyb2xsZXInLCBTaWRlYmFyQ29udHJvbGxlcik7XHJcblxyXG4gICAgU2lkZWJhckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc2NvcGUnLCAnJHN0YXRlJywgJ1NpZGViYXJMb2FkZXInLCAnVXRpbHMnXTtcclxuICAgIGZ1bmN0aW9uIFNpZGViYXJDb250cm9sbGVyKCRyb290U2NvcGUsICRzY29wZSwgJHN0YXRlLCBTaWRlYmFyTG9hZGVyLCAgVXRpbHMpIHtcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgIHZhciBjb2xsYXBzZUxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgICAvLyBkZW1vOiB3aGVuIHN3aXRjaCBmcm9tIGNvbGxhcHNlIHRvIGhvdmVyLCBjbG9zZSBhbGwgaXRlbXNcclxuICAgICAgICAgICRyb290U2NvcGUuJHdhdGNoKCdhcHAubGF5b3V0LmFzaWRlSG92ZXInLCBmdW5jdGlvbihvbGRWYWwsIG5ld1ZhbCl7XHJcbiAgICAgICAgICAgIGlmICggbmV3VmFsID09PSBmYWxzZSAmJiBvbGRWYWwgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICBjbG9zZUFsbEJ1dCgtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAvLyBMb2FkIG1lbnUgZnJvbSBqc29uIGZpbGVcclxuICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG5cclxuICAgICAgICAgIFNpZGViYXJMb2FkZXIuZ2V0TWVudShzaWRlYmFyUmVhZHkpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmdW5jdGlvbiBzaWRlYmFyUmVhZHkoaXRlbXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1lbnVJdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEhhbmRsZSBzaWRlYmFyIGFuZCBjb2xsYXBzZSBpdGVtc1xyXG4gICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAkc2NvcGUuZ2V0TWVudUl0ZW1Qcm9wQ2xhc3NlcyA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChpdGVtLmhlYWRpbmcgPyAnbmF2LWhlYWRpbmcnIDogJycpICtcclxuICAgICAgICAgICAgICAgICAgIChpc0FjdGl2ZShpdGVtKSA/ICcgYWN0aXZlJyA6ICcnKSA7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICRzY29wZS5hZGRDb2xsYXBzZSA9IGZ1bmN0aW9uKCRpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICBjb2xsYXBzZUxpc3RbJGluZGV4XSA9ICRyb290U2NvcGUuYXBwLmxheW91dC5hc2lkZUhvdmVyID8gdHJ1ZSA6ICFpc0FjdGl2ZShpdGVtKTtcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2UgPSBmdW5jdGlvbigkaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChjb2xsYXBzZUxpc3RbJGluZGV4XSk7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICRzY29wZS50b2dnbGVDb2xsYXBzZSA9IGZ1bmN0aW9uKCRpbmRleCwgaXNQYXJlbnRJdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb2xsYXBzZWQgc2lkZWJhciBkb2Vzbid0IHRvZ2dsZSBkcm9kb3B3blxyXG4gICAgICAgICAgICBpZiggVXRpbHMuaXNTaWRlYmFyQ29sbGFwc2VkKCkgfHwgJHJvb3RTY29wZS5hcHAubGF5b3V0LmFzaWRlSG92ZXIgKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgaXRlbSBpbmRleCBleGlzdHNcclxuICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNEZWZpbmVkKCBjb2xsYXBzZUxpc3RbJGluZGV4XSApICkge1xyXG4gICAgICAgICAgICAgIGlmICggISAkc2NvcGUubGFzdEV2ZW50RnJvbUNoaWxkICkge1xyXG4gICAgICAgICAgICAgICAgY29sbGFwc2VMaXN0WyRpbmRleF0gPSAhY29sbGFwc2VMaXN0WyRpbmRleF07XHJcbiAgICAgICAgICAgICAgICBjbG9zZUFsbEJ1dCgkaW5kZXgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICggaXNQYXJlbnRJdGVtICkge1xyXG4gICAgICAgICAgICAgIGNsb3NlQWxsQnV0KC0xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJHNjb3BlLmxhc3RFdmVudEZyb21DaGlsZCA9IGlzQ2hpbGQoJGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vIENvbnRyb2xsZXIgaGVscGVyc1xyXG4gICAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpdGVtIGFuZCBjaGlsZHJlbiBhY3RpdmUgc3RhdGVcclxuICAgICAgICAgICAgZnVuY3Rpb24gaXNBY3RpdmUoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICBpZighaXRlbSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICBpZiggIWl0ZW0uc3JlZiB8fCBpdGVtLnNyZWYgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goaXRlbS5zdWJtZW51LCBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZihpc0FjdGl2ZSh2YWx1ZSkpIGZvdW5kQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kQWN0aXZlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHN0YXRlLmlzKGl0ZW0uc3JlZikgfHwgJHN0YXRlLmluY2x1ZGVzKGl0ZW0uc3JlZik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlQWxsQnV0KGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgaW5kZXggKz0gJyc7XHJcbiAgICAgICAgICAgICAgZm9yKHZhciBpIGluIGNvbGxhcHNlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPCAwIHx8IGluZGV4LmluZGV4T2YoaSkgPCAwKVxyXG4gICAgICAgICAgICAgICAgICBjb2xsYXBzZUxpc3RbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaXNDaGlsZCgkaW5kZXgpIHtcclxuICAgICAgICAgICAgICAvKmpzaGludCAtVzAxOCovXHJcbiAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YgJGluZGV4ID09PSAnc3RyaW5nJykgJiYgISgkaW5kZXguaW5kZXhPZignLScpIDwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB9IC8vIGFjdGl2YXRlXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiBzaWRlYmFyLmpzXHJcbiAqIFdyYXBzIHRoZSBzaWRlYmFyIGFuZCBoYW5kbGVzIGNvbGxhcHNlZCBzdGF0ZVxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnNpZGViYXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3NpZGViYXInLCBzaWRlYmFyKTtcclxuXHJcbiAgICBzaWRlYmFyLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCAnJHdpbmRvdycsICdVdGlscyddO1xyXG4gICAgZnVuY3Rpb24gc2lkZWJhciAoJHJvb3RTY29wZSwgJHRpbWVvdXQsICR3aW5kb3csIFV0aWxzKSB7XHJcbiAgICAgICAgdmFyICR3aW4gPSBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdyk7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgLy8gYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gY29udHJvbGxlcjogQ29udHJvbGxlcixcclxuICAgICAgICAgICAgLy8gY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBsaW5rOiBsaW5rLFxyXG4gICAgICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8bmF2IGNsYXNzPVwic2lkZWJhclwiIG5nLXRyYW5zY2x1ZGU+PC9uYXY+JyxcclxuICAgICAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcclxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZVxyXG4gICAgICAgICAgICAvLyBzY29wZToge31cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgdmFyIGN1cnJlbnRTdGF0ZSA9ICRyb290U2NvcGUuJHN0YXRlLmN1cnJlbnQubmFtZTtcclxuICAgICAgICAgIHZhciAkc2lkZWJhciA9IGVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IFV0aWxzLmlzVG91Y2goKSA/ICdjbGljaycgOiAnbW91c2VlbnRlcicgO1xyXG4gICAgICAgICAgdmFyIHN1Yk5hdiA9ICQoKTtcclxuXHJcbiAgICAgICAgICAkc2lkZWJhci5vbiggZXZlbnROYW1lLCAnLm5hdiA+IGxpJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZiggVXRpbHMuaXNTaWRlYmFyQ29sbGFwc2VkKCkgfHwgJHJvb3RTY29wZS5hcHAubGF5b3V0LmFzaWRlSG92ZXIgKSB7XHJcblxyXG4gICAgICAgICAgICAgIHN1Yk5hdi50cmlnZ2VyKCdtb3VzZWxlYXZlJyk7XHJcbiAgICAgICAgICAgICAgc3ViTmF2ID0gdG9nZ2xlTWVudUl0ZW0oICQodGhpcyksICRzaWRlYmFyKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gVXNlZCB0byBkZXRlY3QgY2xpY2sgYW5kIHRvdWNoIGV2ZW50cyBvdXRzaWRlIHRoZSBzaWRlYmFyICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIHNpZGViYXJBZGRCYWNrZHJvcCgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHNjb3BlLiRvbignY2xvc2VTaWRlYmFyTWVudScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZW1vdmVGbG9hdGluZ05hdigpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gTm9ybWFsaXplIHN0YXRlIHdoZW4gcmVzaXplIHRvIG1vYmlsZVxyXG4gICAgICAgICAgJHdpbi5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKCAhIFV0aWxzLmlzTW9iaWxlKCkgKVxyXG4gICAgICAgICAgXHRhc2lkZVRvZ2dsZU9mZigpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gQWRqdXN0bWVudCBvbiByb3V0ZSBjaGFuZ2VzXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbihldmVudCwgdG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSB0b1N0YXRlLm5hbWU7XHJcbiAgICAgICAgICAgIC8vIEhpZGUgc2lkZWJhciBhdXRvbWF0aWNhbGx5IG9uIG1vYmlsZVxyXG4gICAgICAgICAgICBhc2lkZVRvZ2dsZU9mZigpO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjbG9zZVNpZGViYXJNZW51Jyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIFx0ICAvLyBBdXRvY2xvc2Ugd2hlbiBjbGljayBvdXRzaWRlIHRoZSBzaWRlYmFyXHJcbiAgICAgICAgICBpZiAoIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJzLnNpZGViYXJBbnljbGlja0Nsb3NlKSApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcclxuICAgICAgICAgICAgdmFyIHNiY2xpY2tFdmVudCA9ICdjbGljay5zaWRlYmFyJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJHdhdGNoKCdhcHAuYXNpZGVUb2dnbGVkJywgd2F0Y2hFeHRlcm5hbENsaWNrcyk7XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vLy8vL1xyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIHdhdGNoRXh0ZXJuYWxDbGlja3MobmV3VmFsKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHNpZGViYXIgYmVjb21lcyB2aXNpYmxlXHJcbiAgICAgICAgICAgIGlmICggbmV3VmFsID09PSB0cnVlICkge1xyXG4gICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7IC8vIHJlbmRlciBhZnRlciBjdXJyZW50IGRpZ2VzdCBjeWNsZVxyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5vbihzYmNsaWNrRXZlbnQsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAvLyBpZiBub3QgY2hpbGQgb2Ygc2lkZWJhclxyXG4gICAgICAgICAgICAgICAgICBpZiggISAkKGUudGFyZ2V0KS5wYXJlbnRzKCcuYXNpZGUnKS5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNpZGVUb2dnbGVPZmYoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gZGV0dGFjaCBldmVudFxyXG4gICAgICAgICAgICAgIHdyYXBwZXIub2ZmKHNiY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBhc2lkZVRvZ2dsZU9mZigpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS5hcHAuYXNpZGVUb2dnbGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKCFzY29wZS4kJHBoYXNlKSBzY29wZS4kYXBwbHkoKTsgLy8gYW50aS1wYXR0ZXJuIGJ1dCBzb21ldGltZXMgbmVjZXNzYXJ5XHJcbiAgICAgIFx0ICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vLy8vLy9cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2lkZWJhckFkZEJhY2tkcm9wKCkge1xyXG4gICAgICAgICAgdmFyICRiYWNrZHJvcCA9ICQoJzxkaXYvPicsIHsgJ2NsYXNzJzogJ2Ryb3Bkb3duLWJhY2tkcm9wJ30gKTtcclxuICAgICAgICAgICRiYWNrZHJvcC5pbnNlcnRBZnRlcignLmFzaWRlLWlubmVyJykub24oJ2NsaWNrIG1vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZUZsb2F0aW5nTmF2KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9wZW4gdGhlIGNvbGxhcHNlIHNpZGViYXIgc3VibWVudSBpdGVtcyB3aGVuIG9uIHRvdWNoIGRldmljZXMgXHJcbiAgICAgICAgLy8gLSBkZXNrdG9wIG9ubHkgb3BlbnMgb24gaG92ZXJcclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVUb3VjaEl0ZW0oJGVsZW1lbnQpe1xyXG4gICAgICAgICAgJGVsZW1lbnRcclxuICAgICAgICAgICAgLnNpYmxpbmdzKCdsaScpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3BlbicpXHJcbiAgICAgICAgICAgIC5lbmQoKVxyXG4gICAgICAgICAgICAudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZXMgaG92ZXIgdG8gb3BlbiBpdGVtcyB1bmRlciBjb2xsYXBzZWQgbWVudVxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZU1lbnVJdGVtKCRsaXN0SXRlbSwgJHNpZGViYXIpIHtcclxuXHJcbiAgICAgICAgICByZW1vdmVGbG9hdGluZ05hdigpO1xyXG5cclxuICAgICAgICAgIHZhciB1bCA9ICRsaXN0SXRlbS5jaGlsZHJlbigndWwnKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYoICF1bC5sZW5ndGggKSByZXR1cm4gJCgpO1xyXG4gICAgICAgICAgaWYoICRsaXN0SXRlbS5oYXNDbGFzcygnb3BlbicpICkge1xyXG4gICAgICAgICAgICB0b2dnbGVUb3VjaEl0ZW0oJGxpc3RJdGVtKTtcclxuICAgICAgICAgICAgcmV0dXJuICQoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB2YXIgJGFzaWRlID0gJCgnLmFzaWRlJyk7XHJcbiAgICAgICAgICB2YXIgJGFzaWRlSW5uZXIgPSAkKCcuYXNpZGUtaW5uZXInKTsgLy8gZm9yIHRvcCBvZmZzZXQgY2FsY3VsYXRpb25cclxuICAgICAgICAgIC8vIGZsb2F0IGFzaWRlIHVzZXMgZXh0cmEgcGFkZGluZyBvbiBhc2lkZVxyXG4gICAgICAgICAgdmFyIG1hciA9IHBhcnNlSW50KCAkYXNpZGVJbm5lci5jc3MoJ3BhZGRpbmctdG9wJyksIDApICsgcGFyc2VJbnQoICRhc2lkZS5jc3MoJ3BhZGRpbmctdG9wJyksIDApO1xyXG4gICAgICAgICAgdmFyIHN1Yk5hdiA9IHVsLmNsb25lKCkuYXBwZW5kVG8oICRhc2lkZSApO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0b2dnbGVUb3VjaEl0ZW0oJGxpc3RJdGVtKTtcclxuXHJcbiAgICAgICAgICB2YXIgaXRlbVRvcCA9ICgkbGlzdEl0ZW0ucG9zaXRpb24oKS50b3AgKyBtYXIpIC0gJHNpZGViYXIuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICB2YXIgdndIZWlnaHQgPSAkd2luLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgIHN1Yk5hdlxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ25hdi1mbG9hdGluZycpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAkcm9vdFNjb3BlLmFwcC5sYXlvdXQuaXNGaXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgIHRvcDogICAgICBpdGVtVG9wLFxyXG4gICAgICAgICAgICAgIGJvdHRvbTogICAoc3ViTmF2Lm91dGVySGVpZ2h0KHRydWUpICsgaXRlbVRvcCA+IHZ3SGVpZ2h0KSA/IDAgOiAnYXV0bydcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgc3ViTmF2Lm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZVRvdWNoSXRlbSgkbGlzdEl0ZW0pO1xyXG4gICAgICAgICAgICBzdWJOYXYucmVtb3ZlKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gc3ViTmF2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRmxvYXRpbmdOYXYoKSB7XHJcbiAgICAgICAgICAkKCcuZHJvcGRvd24tYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICQoJy5zaWRlYmFyLXN1Ym5hdi5uYXYtZmxvYXRpbmcnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICQoJy5zaWRlYmFyIGxpLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAuc2lkZWJhcicpXHJcbiAgICAgICAgLnNlcnZpY2UoJ1NpZGViYXJMb2FkZXInLCBTaWRlYmFyTG9hZGVyKTtcclxuXHJcbiAgICBTaWRlYmFyTG9hZGVyLiRpbmplY3QgPSBbJyRodHRwJ107XHJcbiAgICBmdW5jdGlvbiBTaWRlYmFyTG9hZGVyKCRodHRwKSB7XHJcbiAgICAgICAgdGhpcy5nZXRNZW51ID0gZ2V0TWVudTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRNZW51KG9uUmVhZHksIG9uRXJyb3IpIHtcclxuICAgICAgICAgIHZhciBtZW51SnNvbiA9ICdzZXJ2ZXIvc2lkZWJhci1tZW51Lmpzb24nLFxyXG4gICAgICAgICAgICAgIG1lbnVVUkwgID0gbWVudUpzb24gKyAnP3Y9JyArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7IC8vIGp1bXBzIGNhY2hlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgb25FcnJvciA9IG9uRXJyb3IgfHwgZnVuY3Rpb24oKSB7IGFsZXJ0KCdGYWlsdXJlIGxvYWRpbmcgbWVudScpOyB9O1xyXG5cclxuICAgICAgICAgICRodHRwXHJcbiAgICAgICAgICAgIC5nZXQobWVudVVSTClcclxuICAgICAgICAgICAgLnN1Y2Nlc3Mob25SZWFkeSlcclxuICAgICAgICAgICAgLmVycm9yKG9uRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAuc2lkZWJhcicpXG4gICAgICAgIC5jb250cm9sbGVyKCdVc2VyQmxvY2tDb250cm9sbGVyJywgVXNlckJsb2NrQ29udHJvbGxlcik7XG5cbiAgICBVc2VyQmxvY2tDb250cm9sbGVyLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHNjb3BlJ107XG4gICAgZnVuY3Rpb24gVXNlckJsb2NrQ29udHJvbGxlcigkcm9vdFNjb3BlLCAkc2NvcGUpIHtcblxuICAgICAgICBhY3RpdmF0ZSgpO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLnVzZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAgICAgJ0pvaG4nLFxuICAgICAgICAgICAgam9iOiAgICAgICduZy1kZXZlbG9wZXInLFxuICAgICAgICAgICAgcGljdHVyZTogICdhcHAvaW1nL3VzZXIvMDIuanBnJ1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBIaWRlcy9zaG93IHVzZXIgYXZhdGFyIG9uIHNpZGViYXJcbiAgICAgICAgICAkcm9vdFNjb3BlLnRvZ2dsZVVzZXJCbG9jayA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3RvZ2dsZVVzZXJCbG9jaycpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAkcm9vdFNjb3BlLnVzZXJCbG9ja1Zpc2libGUgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIGRldGFjaCA9ICRyb290U2NvcGUuJG9uKCd0b2dnbGVVc2VyQmxvY2snLCBmdW5jdGlvbigvKmV2ZW50LCBhcmdzKi8pIHtcblxuICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyQmxvY2tWaXNpYmxlID0gISAkcm9vdFNjb3BlLnVzZXJCbG9ja1Zpc2libGU7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZGV0YWNoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC50cmFuc2xhdGUnKVxyXG4gICAgICAgIC5jb25maWcodHJhbnNsYXRlQ29uZmlnKVxyXG4gICAgICAgIDtcclxuICAgIHRyYW5zbGF0ZUNvbmZpZy4kaW5qZWN0ID0gWyckdHJhbnNsYXRlUHJvdmlkZXInXTtcclxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZUNvbmZpZygkdHJhbnNsYXRlUHJvdmlkZXIpe1xyXG5cclxuICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVN0YXRpY0ZpbGVzTG9hZGVyKHtcclxuICAgICAgICAgIHByZWZpeCA6ICdhcHAvaTE4bi8nLFxyXG4gICAgICAgICAgc3VmZml4IDogJy5qc29uJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICR0cmFuc2xhdGVQcm92aWRlci5wcmVmZXJyZWRMYW5ndWFnZSgnZW4nKTtcclxuICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZUxvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlUG9zdENvbXBpbGluZyh0cnVlKTtcclxuICAgICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVNhbml0aXplVmFsdWVTdHJhdGVneSgnc2FuaXRpemVQYXJhbWV0ZXJzJyk7XHJcblxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnRyYW5zbGF0ZScpXHJcbiAgICAgICAgLnJ1bih0cmFuc2xhdGVSdW4pXHJcbiAgICAgICAgO1xyXG4gICAgdHJhbnNsYXRlUnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHRyYW5zbGF0ZSddO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVSdW4oJHJvb3RTY29wZSwgJHRyYW5zbGF0ZSl7XHJcblxyXG4gICAgICAvLyBJbnRlcm5hdGlvbmFsaXphdGlvblxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAkcm9vdFNjb3BlLmxhbmd1YWdlID0ge1xyXG4gICAgICAgIC8vIEhhbmRsZXMgbGFuZ3VhZ2UgZHJvcGRvd25cclxuICAgICAgICBsaXN0SXNPcGVuOiBmYWxzZSxcclxuICAgICAgICAvLyBsaXN0IG9mIGF2YWlsYWJsZSBsYW5ndWFnZXNcclxuICAgICAgICBhdmFpbGFibGU6IHtcclxuICAgICAgICAgICdlbic6ICAgICAgICdFbmdsaXNoJyxcclxuICAgICAgICAgICdlc19BUic6ICAgICdFc3Bhw7FvbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGRpc3BsYXkgYWx3YXlzIHRoZSBjdXJyZW50IHVpIGxhbmd1YWdlXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHByb3Bvc2VkTGFuZ3VhZ2UgPSAkdHJhbnNsYXRlLnByb3Bvc2VkTGFuZ3VhZ2UoKSB8fCAkdHJhbnNsYXRlLnVzZSgpO1xyXG4gICAgICAgICAgdmFyIHByZWZlcnJlZExhbmd1YWdlID0gJHRyYW5zbGF0ZS5wcmVmZXJyZWRMYW5ndWFnZSgpOyAvLyB3ZSBrbm93IHdlIGhhdmUgc2V0IGEgcHJlZmVycmVkIG9uZSBpbiBhcHAuY29uZmlnXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLmxhbmd1YWdlLnNlbGVjdGVkID0gJHJvb3RTY29wZS5sYW5ndWFnZS5hdmFpbGFibGVbIChwcm9wb3NlZExhbmd1YWdlIHx8IHByZWZlcnJlZExhbmd1YWdlKSBdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobG9jYWxlSWQpIHtcclxuICAgICAgICAgIC8vIFNldCB0aGUgbmV3IGlkaW9tXHJcbiAgICAgICAgICAkdHJhbnNsYXRlLnVzZShsb2NhbGVJZCk7XHJcbiAgICAgICAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIGZvciB0aGUgY3VycmVudCBsYW5ndWFnZVxyXG4gICAgICAgICAgJHJvb3RTY29wZS5sYW5ndWFnZS5zZWxlY3RlZCA9ICRyb290U2NvcGUubGFuZ3VhZ2UuYXZhaWxhYmxlW2xvY2FsZUlkXTtcclxuICAgICAgICAgIC8vIGZpbmFsbHkgdG9nZ2xlIGRyb3Bkb3duXHJcbiAgICAgICAgICAkcm9vdFNjb3BlLmxhbmd1YWdlLmxpc3RJc09wZW4gPSAhICRyb290U2NvcGUubGFuZ3VhZ2UubGlzdElzT3BlbjtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAkcm9vdFNjb3BlLmxhbmd1YWdlLmluaXQoKTtcclxuXHJcbiAgICB9XHJcbn0pKCk7IiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IGFuaW1hdGUtZW5hYmxlZC5qc1xuICogRW5hYmxlIG9yIGRpc2FibGVzIG5nQW5pbWF0ZSBmb3IgZWxlbWVudCB3aXRoIGRpcmVjdGl2ZVxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2FuaW1hdGVFbmFibGVkJywgYW5pbWF0ZUVuYWJsZWQpO1xuXG4gICAgYW5pbWF0ZUVuYWJsZWQuJGluamVjdCA9IFsnJGFuaW1hdGUnXTtcbiAgICBmdW5jdGlvbiBhbmltYXRlRW5hYmxlZCAoJGFuaW1hdGUpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNjb3BlLiRldmFsKGF0dHJzLmFuaW1hdGVFbmFibGVkLCBzY29wZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAkYW5pbWF0ZS5lbmFibGVkKCEhbmV3VmFsdWUsIGVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIE1vZHVsZTogYnJvd3Nlci5qc1xyXG4gKiBCcm93c2VyIGRldGVjdGlvblxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwLnV0aWxzJylcclxuICAgICAgICAuc2VydmljZSgnQnJvd3NlcicsIEJyb3dzZXIpO1xyXG5cclxuICAgIEJyb3dzZXIuJGluamVjdCA9IFsnJHdpbmRvdyddO1xyXG4gICAgZnVuY3Rpb24gQnJvd3Nlcigkd2luZG93KSB7XHJcbiAgICAgIHJldHVybiAkd2luZG93LmpRQnJvd3NlcjtcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBjbGVhci1zdG9yYWdlLmpzXG4gKiBSZW1vdmVzIGEga2V5IGZyb20gdGhlIGJyb3dzZXIgc3RvcmFnZSB2aWEgZWxlbWVudCBjbGlja1xuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3Jlc2V0S2V5JywgcmVzZXRLZXkpO1xuXG4gICAgcmVzZXRLZXkuJGluamVjdCA9IFsnJHN0YXRlJywgJyRsb2NhbFN0b3JhZ2UnXTtcbiAgICBmdW5jdGlvbiByZXNldEtleSAoJHN0YXRlLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgIHJlc2V0S2V5OiAnQCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgaWYoc2NvcGUucmVzZXRLZXkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgJGxvY2FsU3RvcmFnZVtzY29wZS5yZXNldEtleV07XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCRzdGF0ZS5jdXJyZW50LCB7fSwge3JlbG9hZDogdHJ1ZX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ05vIHN0b3JhZ2Uga2V5IHNwZWNpZmllZCBmb3IgcmVzZXQuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSkoKTtcbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBmdWxsc2NyZWVuLmpzXG4gKiBUb2dnbGUgdGhlIGZ1bGxzY3JlZW4gbW9kZSBvbi9vZmZcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAudXRpbHMnKVxuICAgICAgICAuZGlyZWN0aXZlKCd0b2dnbGVGdWxsc2NyZWVuJywgdG9nZ2xlRnVsbHNjcmVlbik7XG5cbiAgICB0b2dnbGVGdWxsc2NyZWVuLiRpbmplY3QgPSBbJ0Jyb3dzZXInXTtcbiAgICBmdW5jdGlvbiB0b2dnbGVGdWxsc2NyZWVuIChCcm93c2VyKSB7XG4gICAgICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgICAgICBsaW5rOiBsaW5rLFxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJ1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VwcG9ydGVkIHVuZGVyIElFXG4gICAgICAgICAgaWYoIEJyb3dzZXIubXNpZSApIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNjcmVlbmZ1bGwuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBzY3JlZW5mdWxsLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBTd2l0Y2ggaWNvbiBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICAgIGlmKHNjcmVlbmZ1bGwuaXNGdWxsc2NyZWVuKVxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCdlbScpLnJlbW92ZUNsYXNzKCdmYS1leHBhbmQnKS5hZGRDbGFzcygnZmEtY29tcHJlc3MnKTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignZW0nKS5yZW1vdmVDbGFzcygnZmEtY29tcHJlc3MnKS5hZGRDbGFzcygnZmEtZXhwYW5kJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJC5lcnJvcignRnVsbHNjcmVlbiBub3QgZW5hYmxlZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogbG9hZC1jc3MuanNcbiAqIFJlcXVlc3QgYW5kIGxvYWQgaW50byB0aGUgY3VycmVudCBwYWdlIGEgY3NzIGZpbGVcbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAudXRpbHMnKVxuICAgICAgICAuZGlyZWN0aXZlKCdsb2FkQ3NzJywgbG9hZENzcyk7XG5cbiAgICBmdW5jdGlvbiBsb2FkQ3NzICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICBlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIGlmKGVsZW1lbnQuaXMoJ2EnKSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICB2YXIgdXJpID0gYXR0cnMubG9hZENzcyxcbiAgICAgICAgICAgICAgICAgIGxpbms7XG5cbiAgICAgICAgICAgICAgaWYodXJpKSB7XG4gICAgICAgICAgICAgICAgbGluayA9IGNyZWF0ZUxpbmsodXJpKTtcbiAgICAgICAgICAgICAgICBpZiAoICFsaW5rICkge1xuICAgICAgICAgICAgICAgICAgJC5lcnJvcignRXJyb3IgY3JlYXRpbmcgc3R5bGVzaGVldCBsaW5rIGVsZW1lbnQuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoJ05vIHN0eWxlc2hlZXQgbG9jYXRpb24gZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUxpbmsodXJpKSB7XG4gICAgICAgICAgdmFyIGxpbmtJZCA9ICdhdXRvbG9hZGVkLXN0eWxlc2hlZXQnLFxuICAgICAgICAgICAgICBvbGRMaW5rID0gJCgnIycrbGlua0lkKS5hdHRyKCdpZCcsIGxpbmtJZCArICctb2xkJyk7XG5cbiAgICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCQoJzxsaW5rLz4nKS5hdHRyKHtcbiAgICAgICAgICAgICdpZCc6ICAgbGlua0lkLFxuICAgICAgICAgICAgJ3JlbCc6ICAnc3R5bGVzaGVldCcsXG4gICAgICAgICAgICAnaHJlZic6IHVyaVxuICAgICAgICAgIH0pKTtcblxuICAgICAgICAgIGlmKCBvbGRMaW5rLmxlbmd0aCApIHtcbiAgICAgICAgICAgIG9sZExpbmsucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuICQoJyMnK2xpbmtJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogbm93LmpzXG4gKiBQcm92aWRlcyBhIHNpbXBsZSB3YXkgdG8gZGlzcGxheSB0aGUgY3VycmVudCB0aW1lIGZvcm1hdHRlZFxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ25vdycsIG5vdyk7XG5cbiAgICBub3cuJGluamVjdCA9IFsnZGF0ZUZpbHRlcicsICckaW50ZXJ2YWwnXTtcbiAgICBmdW5jdGlvbiBub3cgKGRhdGVGaWx0ZXIsICRpbnRlcnZhbCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgbGluazogbGluayxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRUEnXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgZm9ybWF0ID0gYXR0cnMuZm9ybWF0O1xuXG4gICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVGltZSgpIHtcbiAgICAgICAgICAgIHZhciBkdCA9IGRhdGVGaWx0ZXIobmV3IERhdGUoKSwgZm9ybWF0KTtcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dChkdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlVGltZSgpO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFByb21pc2UgPSAkaW50ZXJ2YWwodXBkYXRlVGltZSwgMTAwMCk7XG5cbiAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRpbnRlcnZhbC5jYW5jZWwoaW50ZXJ2YWxQcm9taXNlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IHRhYmxlLWNoZWNrYWxsLmpzXG4gKiBUYWJsZXMgY2hlY2sgYWxsIGNoZWNrYm94XG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5kaXJlY3RpdmUoJ2NoZWNrQWxsJywgY2hlY2tBbGwpO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGwgKCkge1xuICAgICAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICAgICAgbGluazogbGluayxcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQSdcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGluZGV4PSAkdGhpcy5pbmRleCgpICsgMSxcbiAgICAgICAgICAgICAgICBjaGVja2JveCA9ICR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLFxuICAgICAgICAgICAgICAgIHRhYmxlID0gJHRoaXMucGFyZW50cygndGFibGUnKTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0byBhZmZlY3Qgb25seSB0aGUgY29ycmVjdCBjaGVja2JveCBjb2x1bW5cbiAgICAgICAgICAgIHRhYmxlLmZpbmQoJ3Rib2R5ID4gdHIgPiB0ZDpudGgtY2hpbGQoJytpbmRleCsnKSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgICAgICAgICAgICAucHJvcCgnY2hlY2tlZCcsIGNoZWNrYm94WzBdLmNoZWNrZWQpO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pKCk7XG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogTW9kdWxlOiB0cmlnZ2VyLXJlc2l6ZS5qc1xyXG4gKiBUcmlnZ2VycyBhIHdpbmRvdyByZXNpemUgZXZlbnQgZnJvbSBhbnkgZWxlbWVudFxyXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAudXRpbHMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3RyaWdnZXJSZXNpemUnLCB0cmlnZ2VyUmVzaXplKTtcclxuXHJcbiAgICB0cmlnZ2VyUmVzaXplLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnJHRpbWVvdXQnXTtcclxuICAgIGZ1bmN0aW9uIHRyaWdnZXJSZXNpemUgKCR3aW5kb3csICR0aW1lb3V0KSB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICAgICAgbGluazogbGluayxcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIC8vIGFsbCBJRSBmcmllbmRseSBkaXNwYXRjaEV2ZW50XHJcbiAgICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdVSUV2ZW50cycpO1xyXG4gICAgICAgICAgICAgIGV2dC5pbml0VUlFdmVudCgncmVzaXplJywgdHJ1ZSwgZmFsc2UsICR3aW5kb3csIDApO1xyXG4gICAgICAgICAgICAgICR3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgICAgICAgIC8vIG1vZGVybiBkaXNwYXRjaEV2ZW50IHdheVxyXG4gICAgICAgICAgICAgIC8vICR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcclxuICAgICAgICAgICAgfSwgYXR0cmlidXRlcy50cmlnZ2VyUmVzaXplIHx8IDMwMCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogdXRpbHMuanNcbiAqIFV0aWxpdHkgbGlicmFyeSB0byB1c2UgYWNyb3NzIHRoZSB0aGVtZVxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcC51dGlscycpXG4gICAgICAgIC5zZXJ2aWNlKCdVdGlscycsIFV0aWxzKTtcblxuICAgIFV0aWxzLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnQVBQX01FRElBUVVFUlknXTtcbiAgICBmdW5jdGlvbiBVdGlscygkd2luZG93LCBBUFBfTUVESUFRVUVSWSkge1xuXG4gICAgICAgIHZhciAkaHRtbCA9IGFuZ3VsYXIuZWxlbWVudCgnaHRtbCcpLFxuICAgICAgICAgICAgJHdpbiAgPSBhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdyksXG4gICAgICAgICAgICAkYm9keSA9IGFuZ3VsYXIuZWxlbWVudCgnYm9keScpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLy8gREVURUNUSU9OXG4gICAgICAgICAgc3VwcG9ydDoge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbkVuZCA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25FbmQgJiYgeyBlbmQ6IHRyYW5zaXRpb25FbmQgfTtcbiAgICAgICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uRW5kID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXZWJraXRBbmltYXRpb246ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1vekFuaW1hdGlvbjogJ2FuaW1hdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT0FuaW1hdGlvbjogJ29BbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAnYW5pbWF0aW9uZW5kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgbmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKG5hbWUgaW4gYW5pbUVuZEV2ZW50TmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHJldHVybiBhbmltRW5kRXZlbnROYW1lc1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0oKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uRW5kICYmIHsgZW5kOiBhbmltYXRpb25FbmQgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7IHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwLzYwKTsgfSxcbiAgICAgICAgICAgIC8qanNoaW50IC1XMDY5Ki9cbiAgICAgICAgICAgIHRvdWNoOiAoXG4gICAgICAgICAgICAgICAgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL21vYmlsZXx0YWJsZXQvKSkgfHxcbiAgICAgICAgICAgICAgICAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkgIHx8XG4gICAgICAgICAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3JbJ21zUG9pbnRlckVuYWJsZWQnXSAmJiB3aW5kb3cubmF2aWdhdG9yWydtc01heFRvdWNoUG9pbnRzJ10gPiAwKSB8fCAvL0lFIDEwXG4gICAgICAgICAgICAgICAgKHdpbmRvdy5uYXZpZ2F0b3JbJ3BvaW50ZXJFbmFibGVkJ10gJiYgd2luZG93Lm5hdmlnYXRvclsnbWF4VG91Y2hQb2ludHMnXSA+IDApIHx8IC8vSUUgPj0xMVxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbXV0YXRpb25vYnNlcnZlcjogKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJLaXRNdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5Nb3pNdXRhdGlvbk9ic2VydmVyIHx8IG51bGwpXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBVVElMSVRJRVNcbiAgICAgICAgICBpc0luVmlldzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAgICAgICAvKmpzaGludCAtVzEwNiovXG4gICAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgaWYgKCEkZWxlbWVudC5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIHdpbmRvd19sZWZ0ID0gJHdpbi5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgICAgICAgICB3aW5kb3dfdG9wICA9ICR3aW4uc2Nyb2xsVG9wKCksXG4gICAgICAgICAgICAgICAgICBvZmZzZXQgICAgICA9ICRlbGVtZW50Lm9mZnNldCgpLFxuICAgICAgICAgICAgICAgICAgbGVmdCAgICAgICAgPSBvZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgICAgIHRvcCAgICAgICAgID0gb2Zmc2V0LnRvcDtcblxuICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe3RvcG9mZnNldDowLCBsZWZ0b2Zmc2V0OjB9LCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICBpZiAodG9wICsgJGVsZW1lbnQuaGVpZ2h0KCkgPj0gd2luZG93X3RvcCAmJiB0b3AgLSBvcHRpb25zLnRvcG9mZnNldCA8PSB3aW5kb3dfdG9wICsgJHdpbi5oZWlnaHQoKSAmJlxuICAgICAgICAgICAgICAgICAgbGVmdCArICRlbGVtZW50LndpZHRoKCkgPj0gd2luZG93X2xlZnQgJiYgbGVmdCAtIG9wdGlvbnMubGVmdG9mZnNldCA8PSB3aW5kb3dfbGVmdCArICR3aW4ud2lkdGgoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXG4gICAgICAgICAgbGFuZ2RpcmVjdGlvbjogJGh0bWwuYXR0cignZGlyJykgPT09ICdydGwnID8gJ3JpZ2h0JyA6ICdsZWZ0JyxcblxuICAgICAgICAgIGlzVG91Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHRtbC5oYXNDbGFzcygndG91Y2gnKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaXNTaWRlYmFyQ29sbGFwc2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGJvZHkuaGFzQ2xhc3MoJ2FzaWRlLWNvbGxhcHNlZCcpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBpc1NpZGViYXJUb2dnbGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGJvZHkuaGFzQ2xhc3MoJ2FzaWRlLXRvZ2dsZWQnKTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaXNNb2JpbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkd2luLndpZHRoKCkgPCBBUFBfTUVESUFRVUVSWS50YWJsZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnY3VzdG9tJywgW1xyXG4gICAgICAgICAgICAvLyByZXF1ZXN0IHRoZSB0aGUgZW50aXJlIGZyYW1ld29ya1xyXG4gICAgICAgICAgICAnYW5nbGUnLFxyXG4gICAgICAgICAgICAvLyBvciBqdXN0IG1vZHVsZXNcclxuICAgICAgICAgICAgJ2FwcC5jb3JlJyxcclxuICAgICAgICAgICAgJ2FwcC5zaWRlYmFyJ1xyXG4gICAgICAgICAgICAvKi4uLiovXHJcbiAgICAgICAgXSk7XHJcbn0pKCk7IiwiXHJcbi8vIFRvIHJ1biB0aGlzIGNvZGUsIGVkaXQgZmlsZSBpbmRleC5odG1sIG9yIGluZGV4LmphZGUgYW5kIGNoYW5nZVxyXG4vLyBodG1sIGRhdGEtbmctYXBwIGF0dHJpYnV0ZSBmcm9tIGFuZ2xlIHRvIG15QXBwTmFtZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2N1c3RvbScpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NvbnRyb2xsZXInLCBDb250cm9sbGVyKTtcclxuXHJcbiAgICBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnXTtcclxuICAgIGZ1bmN0aW9uIENvbnRyb2xsZXIoJGxvZykge1xyXG4gICAgICAgIC8vIGZvciBjb250cm9sbGVyQXMgc3ludGF4XHJcbiAgICAgICAgLy8gdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcclxuICAgICAgICAgICRsb2cubG9nKCdJXFwnbSBhIGxpbmUgZnJvbSBjdXN0b20uanMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FuZ2xlJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1N0dWRlbnRDb250cm9sbGVyJywgQ29udHJvbGxlcik7XG5cbiAgICBDb250cm9sbGVyLiRpbmplY3QgPSBbJyRsb2cnLCAnJHNjb3BlJywgJyRodHRwJ107XG4gICAgZnVuY3Rpb24gQ29udHJvbGxlcigkbG9nLCAkc2NvcGUsICRodHRwKSB7XG4gICAgICAgIC8vIGZvciBjb250cm9sbGVyQXMgc3ludGF4XG4gICAgICAgIC8vIHZhciB2bSA9IHRoaXM7XG4gICAgICAgICRzY29wZS5zdHVkZW50ID0ge307XG4gICAgICAgICRzY29wZS5zdHVkZW50cyA9IHt9XG4gICAgICAgIGFjdGl2YXRlKCk7XG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICRsb2cubG9nKCdJXFwnbSBhIGxpbmUgZnJvbSBjdXN0b20uanMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5jcmVhdGVTdHVkZW50ID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAkaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3N0dWRlbnRzJywgJHNjb3BlLnN0dWRlbnQpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzKXtcbiAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdCA9IGRhdGE7XG4gICAgICAgICAgICB9KS5mYWlsdXJlKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cyl7XG4gICAgICAgICAgICAgICRzY29wZS5yZXN1bHQgPSBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnZpZXdTdHVkZW50ID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvc3R1ZGVudHMnKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAkc2NvcGUuc3R1ZGVudHMgPSBkYXRhO1xuICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzKXtcbiAgICAgICAgICAgICAgJHNjb3BlLnN0dWRlbnRzID0gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnZpZXdTdHVkZW50KCk7XG4gICAgfVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
