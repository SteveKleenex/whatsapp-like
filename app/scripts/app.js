(function () {
    'use strict';

    // Ionic Starter App

    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    // 'starter.services' is found in services.js
    // 'starter.controllers' is found in controllers.js
    angular.module('whatsapp', ['ionic', 'ngGuid', 'whatsapp.controllers', 'whatsapp.services'])

    .run(function($ionicPlatform, $rootScope, $location, $state) {
      $rootScope.user = null;
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        // Authentication verification
        $rootScope.$on('$ionicView.beforeEnter', function(e, view) {
            // si on est sur la page d'inscription ou de connexion alors on ne fait rien
            if(view.stateId === 'inscription' || view.stateId === 'connexion') {
                return;
            }
            // now, redirect only not authenticated
            if($rootScope.user === null) {
                e.preventDefault();
                $state.go('connexion');
            }
        });

      });
    })

    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        .state('connexion', {
            url: '/connexion',
            templateUrl: 'templates/connexion.html',
            controller: 'ConnexionCtrl'
        })

        .state('inscription', {
            url: '/inscription',
            templateUrl: 'templates/inscription.html',
            controller: 'InscriptionCtrl'
        })

      // Each tab has its own nav history stack:
      .state('tab.contacts', {
          url: '/contacts',
          views: {
              'tab-contacts': {
                  templateUrl: 'templates/tab-contacts.html',
                  controller: 'ContactsCtrl'
              }
          }
      })

      .state('tab.conversations', {
          url: '/conversations',
          views: {
            'tab-conversations': {
              templateUrl: 'templates/tab-conversations.html',
              controller: 'ConversationsCtrl'
            }
          }
        })
        .state('tab.conversation-detail', {
          url: '/conversations/:conversationId',
          views: {
              'tab-conversations': {
              templateUrl: 'templates/conversation-detail.html',
              controller: 'ConversationDetailCtrl'
            }
          }
        })

        .state('tab.parametres', {
            url: '/parametres',
            views: {
                'tab-parametres': {
                    templateUrl: 'templates/tab-parametres.html',
                    controller: 'ParametresCtrl'
                }
            }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/conversations');

    });

})();
