angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.acceuil', {
    url: '/',
    views: {
      'side-menu21': {
        templateUrl: 'templates/acceuil.html',
        controller: 'acceuilCtrl'
      }
    }
  })

  .state('menu.capteurs', {
    url: '/sensors',
    views: {
      'side-menu21': {
        templateUrl: 'templates/capteurs.html',
        controller: 'capteursCtrl'
      }
    }
  })

  .state('menu.paramTres', {
    url: '/settings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paramTres.html',
        controller: 'paramTresCtrl'
      }
    }
  })

  .state('menu.nousContacter', {
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nousContacter.html',
        controller: 'nousContacterCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.formulaireDeContact', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/formulaireDeContact.html',
        controller: 'formulaireDeContactCtrl'
      }
    }
  })

  .state('menu.appareils', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/appareils.html',
        controller: 'appareilsCtrl'
      }
    }
  })

  .state('menu.historique', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/historique.html',
        controller: 'historiqueCtrl'
      }
    }
  })

  .state('menu.programmes', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/programmes.html',
        controller: 'programmesCtrl'
      }
    }
  })

  .state('menu.crErUnProgramme', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/crErUnProgramme.html',
        controller: 'crErUnProgrammeCtrl'
      }
    }
  })

  .state('menu.eclairageProgramme', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eclairageProgramme.html',
        controller: 'eclairageProgrammeCtrl'
      }
    }
  })

  .state('menu.chauffageProgramme', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/chauffageProgramme.html',
        controller: 'chauffageProgrammeCtrl'
      }
    }
  })

  .state('menu.vMCProgramme', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/vMCProgramme.html',
        controller: 'vMCProgrammeCtrl'
      }
    }
  })

  .state('menu.exempleHistorique', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/exempleHistorique.html',
        controller: 'exempleHistoriqueCtrl'
      }
    }
  })

  .state('menu.actionEnDTail', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/actionEnDTail.html',
        controller: 'actionEnDTailCtrl'
      }
    }
  })

  .state('menu.tempRature', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tempRature.html',
        controller: 'tempRatureCtrl'
      }
    }
  })

  .state('menu.humidit', {
    url: '/page18',
    views: {
      'side-menu21': {
        templateUrl: 'templates/humidit.html',
        controller: 'humiditCtrl'
      }
    }
  })

  .state('menu.luminosit', {
    url: '/page19',
    views: {
      'side-menu21': {
        templateUrl: 'templates/luminosit.html',
        controller: 'luminositCtrl'
      }
    }
  })

  .state('menu.cO2', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cO2.html',
        controller: 'cO2Ctrl'
      }
    }
  })


$urlRouterProvider.otherwise('/side-menu21/')

  

});