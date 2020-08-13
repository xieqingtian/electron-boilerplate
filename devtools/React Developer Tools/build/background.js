/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ({

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global chrome */


var ports = {};
var IS_FIREFOX = navigator.userAgent.indexOf('Firefox') >= 0;
chrome.runtime.onConnect.addListener(function (port) {
  var tab = null;
  var name = null;

  if (isNumeric(port.name)) {
    tab = port.name;
    name = 'devtools';
    installContentScript(+port.name);
  } else {
    tab = port.sender.tab.id;
    name = 'content-script';
  }

  if (!ports[tab]) {
    ports[tab] = {
      devtools: null,
      'content-script': null
    };
  }

  ports[tab][name] = port;

  if (ports[tab].devtools && ports[tab]['content-script']) {
    doublePipe(ports[tab].devtools, ports[tab]['content-script']);
  }
});

function isNumeric(str) {
  return +str + '' === str;
}

function installContentScript(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: '/build/contentScript.js'
  }, function () {});
}

function doublePipe(one, two) {
  one.onMessage.addListener(lOne);

  function lOne(message) {
    two.postMessage(message);
  }

  two.onMessage.addListener(lTwo);

  function lTwo(message) {
    one.postMessage(message);
  }

  function shutdown() {
    one.onMessage.removeListener(lOne);
    two.onMessage.removeListener(lTwo);
    one.disconnect();
    two.disconnect();
  }

  one.onDisconnect.addListener(shutdown);
  two.onDisconnect.addListener(shutdown);
}

function setIconAndPopup(reactBuildType, tabId) {
  chrome.browserAction.setIcon({
    tabId: tabId,
    path: {
      '16': 'icons/16-' + reactBuildType + '.png',
      '32': 'icons/32-' + reactBuildType + '.png',
      '48': 'icons/48-' + reactBuildType + '.png',
      '128': 'icons/128-' + reactBuildType + '.png'
    }
  });
  chrome.browserAction.setPopup({
    tabId: tabId,
    popup: 'popups/' + reactBuildType + '.html'
  });
} // Listen to URL changes on the active tab and reset the DevTools icon.
// This prevents non-disabled icons from sticking in Firefox.
// Don't listen to this event in Chrome though.
// It fires more frequently, often after onMessage() has been called.


if (IS_FIREFOX) {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.active && changeInfo.status === 'loading') {
      setIconAndPopup('disabled', tabId);
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (sender.tab) {
    // This is sent from the hook content script.
    // It tells us a renderer has attached.
    if (request.hasDetectedReact) {
      // We use browserAction instead of pageAction because this lets us
      // display a custom default popup when React is *not* detected.
      // It is specified in the manifest.
      var reactBuildType = request.reactBuildType;

      if (sender.url.indexOf('facebook.github.io/react') !== -1) {
        // Cheat: We use the development version on the website because
        // it is better for interactive examples. However we're going
        // to get misguided bug reports if the extension highlights it
        // as using the dev version. We're just going to special case
        // our own documentation and cheat. It is acceptable to use dev
        // version of React in React docs, but not in any other case.
        reactBuildType = 'production';
      }

      setIconAndPopup(reactBuildType, sender.tab.id);
    }
  }
});

/***/ })

/******/ });