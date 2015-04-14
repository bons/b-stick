/* b-stick - v0.1.0 - 2015-04-13
* https://github/com/bons/b-stick
* Copyright (c) 2015 Bons; Licensed MIT */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MODULE_NAME = 'bons.bStick';

var angular = require('angular');

angular .module(MODULE_NAME, [])
        .directive("bStick", function( $window )
        {
          return {
            restrict: "A",
            scope: true,
            controller: function( $scope )
            {
              window.onscroll = function()
              {
                $scope.$apply(function()
                {
                  $scope.scrollX = $window.scrollX;
                  $scope.scrollY = $window.scrollY;
                });
              };
            },

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
        });

module.exports = MODULE_NAME;

},{"angular":"angular"}]},{},[1]);
