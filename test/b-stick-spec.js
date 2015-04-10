'use strict';

require("angular");
require("angular-mocks");
var app = require("../lib/b-stick");

describe('Test Suite: bStick', function()
{
  var scope,
      $compile;

  beforeEach(angular.mock.module('bStick'));

  beforeEach(angular.mock.inject(['$rootScope','$compile',
      function ($rootScope, _$compile_)
      {
        $compile = _$compile_;
        scope = $rootScope.$new();
      }
    ])
  );

  it('should be defined', function()
  {
    expect(app).toBeDefined();
  });

});
