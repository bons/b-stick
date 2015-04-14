'use strict';

var MODULE_NAME = 'bons.bStick';

var angular = require('angular');

angular .module(MODULE_NAME, [])
        .directive("bStick", ['$window', function( $window )
        {
          return {
            restrict: "A",
            scope: true,
            controller: ['$scope', function( $scope )
            {
              window.onscroll = function()
              {
                $scope.$apply(function()
                {
                  $scope.scrollX = $window.scrollX;
                  $scope.scrollY = $window.scrollY;
                });
              };
            }],

            link: function link( scp, elm, attr )
            {
              var raw = elm[0];
              var marginNextRaw = parseFloat(css(raw.nextElementSibling, "margin-top"));
              var padd = raw.offsetHeight + marginNextRaw;
              var rawPrev = raw.previousElementSibling;
              var marg = parseFloat(css(rawPrev, "margin-bottom"));

              function css(elm, attr)
              {
                return window.getComputedStyle(elm, null).getPropertyValue(attr);
              }


              scp.$watch("scrollY", function( newScrollY )
              {
                if(typeof raw.originalOffsetTop === "undefined")
                {
                  raw.originalOffsetTop = raw.offsetTop;
                }

                if(newScrollY > raw.originalOffsetTop)
                {
                  attr.$set("b-stuck-to", "top");
                  attr.$addClass("stacked");

                  rawPrev.style.marginBottom = (marg + padd) + "px";
                }
                else
                {
                  elm.removeAttr("b-stuck-to");
                  attr.$removeClass("stacked");
                  rawPrev.style.marginBottom = marg + "px";
                }
              });
            }
          };
        }]);

module.exports = MODULE_NAME;
