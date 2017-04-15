module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    reporters: ['spec'],
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-spec-reporter'],
    files: [
      'dependencies/angular.js',
      'dependencies/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/*.js',
      'controllers/*.js',
      'dependencies/jquery.min.js',
      'dependencies/bootstrap-3.3.7-dist/js/bootstrap.min.js',
      'tests/*.js'
    ],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });

  
  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
  }
  
};
