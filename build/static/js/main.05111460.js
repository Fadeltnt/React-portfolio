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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(14);
} else {
  module.exports = require('./cjs/react.development.js');
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(9);

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._75 = 0;
  this._83 = 0;
  this._18 = null;
  this._38 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._47 = null;
Promise._71 = null;
Promise._44 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._83 === 3) {
    self = self._18;
  }
  if (Promise._47) {
    Promise._47(self);
  }
  if (self._83 === 0) {
    if (self._75 === 0) {
      self._75 = 1;
      self._38 = deferred;
      return;
    }
    if (self._75 === 1) {
      self._75 = 2;
      self._38 = [self._38, deferred];
      return;
    }
    self._38.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._83 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._83 === 1) {
        resolve(deferred.promise, self._18);
      } else {
        reject(deferred.promise, self._18);
      }
      return;
    }
    var ret = tryCallOne(cb, self._18);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._83 = 3;
      self._18 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._83 = 1;
  self._18 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._83 = 2;
  self._18 = newValue;
  if (Promise._71) {
    Promise._71(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._75 === 1) {
    handle(self, self._38);
    self._38 = null;
  }
  if (self._75 === 2) {
    for (var i = 0; i < self._38.length; i++) {
      handle(self, self._38[i]);
    }
    self._38 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AcademicCapIcon_js__ = __webpack_require__(24);
/* unused harmony reexport AcademicCapIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AdjustmentsIcon_js__ = __webpack_require__(25);
/* unused harmony reexport AdjustmentsIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AnnotationIcon_js__ = __webpack_require__(26);
/* unused harmony reexport AnnotationIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ArchiveIcon_js__ = __webpack_require__(27);
/* unused harmony reexport ArchiveIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ArrowCircleDownIcon_js__ = __webpack_require__(28);
/* unused harmony reexport ArrowCircleDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ArrowCircleLeftIcon_js__ = __webpack_require__(29);
/* unused harmony reexport ArrowCircleLeftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ArrowCircleRightIcon_js__ = __webpack_require__(30);
/* unused harmony reexport ArrowCircleRightIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ArrowCircleUpIcon_js__ = __webpack_require__(31);
/* unused harmony reexport ArrowCircleUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ArrowDownIcon_js__ = __webpack_require__(32);
/* unused harmony reexport ArrowDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ArrowLeftIcon_js__ = __webpack_require__(33);
/* unused harmony reexport ArrowLeftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ArrowNarrowDownIcon_js__ = __webpack_require__(34);
/* unused harmony reexport ArrowNarrowDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ArrowNarrowLeftIcon_js__ = __webpack_require__(35);
/* unused harmony reexport ArrowNarrowLeftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ArrowNarrowRightIcon_js__ = __webpack_require__(36);
/* unused harmony reexport ArrowNarrowRightIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ArrowNarrowUpIcon_js__ = __webpack_require__(37);
/* unused harmony reexport ArrowNarrowUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ArrowRightIcon_js__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_14__ArrowRightIcon_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ArrowSmDownIcon_js__ = __webpack_require__(39);
/* unused harmony reexport ArrowSmDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ArrowSmLeftIcon_js__ = __webpack_require__(40);
/* unused harmony reexport ArrowSmLeftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ArrowSmRightIcon_js__ = __webpack_require__(41);
/* unused harmony reexport ArrowSmRightIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ArrowSmUpIcon_js__ = __webpack_require__(42);
/* unused harmony reexport ArrowSmUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ArrowUpIcon_js__ = __webpack_require__(43);
/* unused harmony reexport ArrowUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ArrowsExpandIcon_js__ = __webpack_require__(44);
/* unused harmony reexport ArrowsExpandIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__AtSymbolIcon_js__ = __webpack_require__(45);
/* unused harmony reexport AtSymbolIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__BackspaceIcon_js__ = __webpack_require__(46);
/* unused harmony reexport BackspaceIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__BadgeCheckIcon_js__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_23__BadgeCheckIcon_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__BanIcon_js__ = __webpack_require__(48);
/* unused harmony reexport BanIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__BeakerIcon_js__ = __webpack_require__(49);
/* unused harmony reexport BeakerIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__BellIcon_js__ = __webpack_require__(50);
/* unused harmony reexport BellIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__BookOpenIcon_js__ = __webpack_require__(51);
/* unused harmony reexport BookOpenIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__BookmarkAltIcon_js__ = __webpack_require__(52);
/* unused harmony reexport BookmarkAltIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__BookmarkIcon_js__ = __webpack_require__(53);
/* unused harmony reexport BookmarkIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__BriefcaseIcon_js__ = __webpack_require__(54);
/* unused harmony reexport BriefcaseIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__CakeIcon_js__ = __webpack_require__(55);
/* unused harmony reexport CakeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__CalculatorIcon_js__ = __webpack_require__(56);
/* unused harmony reexport CalculatorIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__CalendarIcon_js__ = __webpack_require__(57);
/* unused harmony reexport CalendarIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__CameraIcon_js__ = __webpack_require__(58);
/* unused harmony reexport CameraIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__CashIcon_js__ = __webpack_require__(59);
/* unused harmony reexport CashIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ChartBarIcon_js__ = __webpack_require__(60);
/* unused harmony reexport ChartBarIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ChartPieIcon_js__ = __webpack_require__(61);
/* unused harmony reexport ChartPieIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ChartSquareBarIcon_js__ = __webpack_require__(62);
/* unused harmony reexport ChartSquareBarIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ChatAlt2Icon_js__ = __webpack_require__(63);
/* unused harmony reexport ChatAlt2Icon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ChatAltIcon_js__ = __webpack_require__(64);
/* unused harmony reexport ChatAltIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ChatIcon_js__ = __webpack_require__(65);
/* unused harmony reexport ChatIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__CheckCircleIcon_js__ = __webpack_require__(66);
/* unused harmony reexport CheckCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__CheckIcon_js__ = __webpack_require__(67);
/* unused harmony reexport CheckIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ChevronDoubleDownIcon_js__ = __webpack_require__(68);
/* unused harmony reexport ChevronDoubleDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ChevronDoubleLeftIcon_js__ = __webpack_require__(69);
/* unused harmony reexport ChevronDoubleLeftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ChevronDoubleRightIcon_js__ = __webpack_require__(70);
/* unused harmony reexport ChevronDoubleRightIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ChevronDoubleUpIcon_js__ = __webpack_require__(71);
/* unused harmony reexport ChevronDoubleUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ChevronDownIcon_js__ = __webpack_require__(72);
/* unused harmony reexport ChevronDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ChevronLeftIcon_js__ = __webpack_require__(73);
/* unused harmony reexport ChevronLeftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ChevronRightIcon_js__ = __webpack_require__(74);
/* unused harmony reexport ChevronRightIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ChevronUpIcon_js__ = __webpack_require__(75);
/* unused harmony reexport ChevronUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ChipIcon_js__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_52__ChipIcon_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ClipboardCheckIcon_js__ = __webpack_require__(77);
/* unused harmony reexport ClipboardCheckIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ClipboardCopyIcon_js__ = __webpack_require__(78);
/* unused harmony reexport ClipboardCopyIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ClipboardListIcon_js__ = __webpack_require__(79);
/* unused harmony reexport ClipboardListIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ClipboardIcon_js__ = __webpack_require__(80);
/* unused harmony reexport ClipboardIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ClockIcon_js__ = __webpack_require__(81);
/* unused harmony reexport ClockIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__CloudDownloadIcon_js__ = __webpack_require__(82);
/* unused harmony reexport CloudDownloadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__CloudUploadIcon_js__ = __webpack_require__(83);
/* unused harmony reexport CloudUploadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__CloudIcon_js__ = __webpack_require__(84);
/* unused harmony reexport CloudIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__CodeIcon_js__ = __webpack_require__(85);
/* unused harmony reexport CodeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__CogIcon_js__ = __webpack_require__(86);
/* unused harmony reexport CogIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__CollectionIcon_js__ = __webpack_require__(87);
/* unused harmony reexport CollectionIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__ColorSwatchIcon_js__ = __webpack_require__(88);
/* unused harmony reexport ColorSwatchIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__CreditCardIcon_js__ = __webpack_require__(89);
/* unused harmony reexport CreditCardIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__CubeTransparentIcon_js__ = __webpack_require__(90);
/* unused harmony reexport CubeTransparentIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__CubeIcon_js__ = __webpack_require__(91);
/* unused harmony reexport CubeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__CurrencyBangladeshiIcon_js__ = __webpack_require__(92);
/* unused harmony reexport CurrencyBangladeshiIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__CurrencyDollarIcon_js__ = __webpack_require__(93);
/* unused harmony reexport CurrencyDollarIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__CurrencyEuroIcon_js__ = __webpack_require__(94);
/* unused harmony reexport CurrencyEuroIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__CurrencyPoundIcon_js__ = __webpack_require__(95);
/* unused harmony reexport CurrencyPoundIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__CurrencyRupeeIcon_js__ = __webpack_require__(96);
/* unused harmony reexport CurrencyRupeeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__CurrencyYenIcon_js__ = __webpack_require__(97);
/* unused harmony reexport CurrencyYenIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__CursorClickIcon_js__ = __webpack_require__(98);
/* unused harmony reexport CursorClickIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__DatabaseIcon_js__ = __webpack_require__(99);
/* unused harmony reexport DatabaseIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__DesktopComputerIcon_js__ = __webpack_require__(100);
/* unused harmony reexport DesktopComputerIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__DeviceMobileIcon_js__ = __webpack_require__(101);
/* unused harmony reexport DeviceMobileIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__DeviceTabletIcon_js__ = __webpack_require__(102);
/* unused harmony reexport DeviceTabletIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__DocumentAddIcon_js__ = __webpack_require__(103);
/* unused harmony reexport DocumentAddIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__DocumentDownloadIcon_js__ = __webpack_require__(104);
/* unused harmony reexport DocumentDownloadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__DocumentDuplicateIcon_js__ = __webpack_require__(105);
/* unused harmony reexport DocumentDuplicateIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__DocumentRemoveIcon_js__ = __webpack_require__(106);
/* unused harmony reexport DocumentRemoveIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__DocumentReportIcon_js__ = __webpack_require__(107);
/* unused harmony reexport DocumentReportIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__DocumentSearchIcon_js__ = __webpack_require__(108);
/* unused harmony reexport DocumentSearchIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85__DocumentTextIcon_js__ = __webpack_require__(109);
/* unused harmony reexport DocumentTextIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__DocumentIcon_js__ = __webpack_require__(110);
/* unused harmony reexport DocumentIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87__DotsCircleHorizontalIcon_js__ = __webpack_require__(111);
/* unused harmony reexport DotsCircleHorizontalIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88__DotsHorizontalIcon_js__ = __webpack_require__(112);
/* unused harmony reexport DotsHorizontalIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_89__DotsVerticalIcon_js__ = __webpack_require__(113);
/* unused harmony reexport DotsVerticalIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_90__DownloadIcon_js__ = __webpack_require__(114);
/* unused harmony reexport DownloadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_91__DuplicateIcon_js__ = __webpack_require__(115);
/* unused harmony reexport DuplicateIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_92__EmojiHappyIcon_js__ = __webpack_require__(116);
/* unused harmony reexport EmojiHappyIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_93__EmojiSadIcon_js__ = __webpack_require__(117);
/* unused harmony reexport EmojiSadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_94__ExclamationCircleIcon_js__ = __webpack_require__(118);
/* unused harmony reexport ExclamationCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_95__ExclamationIcon_js__ = __webpack_require__(119);
/* unused harmony reexport ExclamationIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_96__ExternalLinkIcon_js__ = __webpack_require__(120);
/* unused harmony reexport ExternalLinkIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_97__EyeOffIcon_js__ = __webpack_require__(121);
/* unused harmony reexport EyeOffIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_98__EyeIcon_js__ = __webpack_require__(122);
/* unused harmony reexport EyeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_99__FastForwardIcon_js__ = __webpack_require__(123);
/* unused harmony reexport FastForwardIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_100__FilmIcon_js__ = __webpack_require__(124);
/* unused harmony reexport FilmIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_101__FilterIcon_js__ = __webpack_require__(125);
/* unused harmony reexport FilterIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_102__FingerPrintIcon_js__ = __webpack_require__(126);
/* unused harmony reexport FingerPrintIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_103__FireIcon_js__ = __webpack_require__(127);
/* unused harmony reexport FireIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_104__FlagIcon_js__ = __webpack_require__(128);
/* unused harmony reexport FlagIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_105__FolderAddIcon_js__ = __webpack_require__(129);
/* unused harmony reexport FolderAddIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_106__FolderDownloadIcon_js__ = __webpack_require__(130);
/* unused harmony reexport FolderDownloadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_107__FolderOpenIcon_js__ = __webpack_require__(131);
/* unused harmony reexport FolderOpenIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_108__FolderRemoveIcon_js__ = __webpack_require__(132);
/* unused harmony reexport FolderRemoveIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_109__FolderIcon_js__ = __webpack_require__(133);
/* unused harmony reexport FolderIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_110__GiftIcon_js__ = __webpack_require__(134);
/* unused harmony reexport GiftIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_111__GlobeAltIcon_js__ = __webpack_require__(135);
/* unused harmony reexport GlobeAltIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_112__GlobeIcon_js__ = __webpack_require__(136);
/* unused harmony reexport GlobeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_113__HandIcon_js__ = __webpack_require__(137);
/* unused harmony reexport HandIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_114__HashtagIcon_js__ = __webpack_require__(138);
/* unused harmony reexport HashtagIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_115__HeartIcon_js__ = __webpack_require__(139);
/* unused harmony reexport HeartIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_116__HomeIcon_js__ = __webpack_require__(140);
/* unused harmony reexport HomeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_117__IdentificationIcon_js__ = __webpack_require__(141);
/* unused harmony reexport IdentificationIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_118__InboxInIcon_js__ = __webpack_require__(142);
/* unused harmony reexport InboxInIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_119__InboxIcon_js__ = __webpack_require__(143);
/* unused harmony reexport InboxIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_120__InformationCircleIcon_js__ = __webpack_require__(144);
/* unused harmony reexport InformationCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_121__KeyIcon_js__ = __webpack_require__(145);
/* unused harmony reexport KeyIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_122__LibraryIcon_js__ = __webpack_require__(146);
/* unused harmony reexport LibraryIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_123__LightBulbIcon_js__ = __webpack_require__(147);
/* unused harmony reexport LightBulbIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_124__LightningBoltIcon_js__ = __webpack_require__(148);
/* unused harmony reexport LightningBoltIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_125__LinkIcon_js__ = __webpack_require__(149);
/* unused harmony reexport LinkIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_126__LocationMarkerIcon_js__ = __webpack_require__(150);
/* unused harmony reexport LocationMarkerIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_127__LockClosedIcon_js__ = __webpack_require__(151);
/* unused harmony reexport LockClosedIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_128__LockOpenIcon_js__ = __webpack_require__(152);
/* unused harmony reexport LockOpenIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_129__LoginIcon_js__ = __webpack_require__(153);
/* unused harmony reexport LoginIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_130__LogoutIcon_js__ = __webpack_require__(154);
/* unused harmony reexport LogoutIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_131__MailOpenIcon_js__ = __webpack_require__(155);
/* unused harmony reexport MailOpenIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_132__MailIcon_js__ = __webpack_require__(156);
/* unused harmony reexport MailIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_133__MapIcon_js__ = __webpack_require__(157);
/* unused harmony reexport MapIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_134__MenuAlt1Icon_js__ = __webpack_require__(158);
/* unused harmony reexport MenuAlt1Icon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_135__MenuAlt2Icon_js__ = __webpack_require__(159);
/* unused harmony reexport MenuAlt2Icon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_136__MenuAlt3Icon_js__ = __webpack_require__(160);
/* unused harmony reexport MenuAlt3Icon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_137__MenuAlt4Icon_js__ = __webpack_require__(161);
/* unused harmony reexport MenuAlt4Icon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_138__MenuIcon_js__ = __webpack_require__(162);
/* unused harmony reexport MenuIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_139__MicrophoneIcon_js__ = __webpack_require__(163);
/* unused harmony reexport MicrophoneIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_140__MinusCircleIcon_js__ = __webpack_require__(164);
/* unused harmony reexport MinusCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_141__MinusSmIcon_js__ = __webpack_require__(165);
/* unused harmony reexport MinusSmIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_142__MinusIcon_js__ = __webpack_require__(166);
/* unused harmony reexport MinusIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_143__MoonIcon_js__ = __webpack_require__(167);
/* unused harmony reexport MoonIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_144__MusicNoteIcon_js__ = __webpack_require__(168);
/* unused harmony reexport MusicNoteIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_145__NewspaperIcon_js__ = __webpack_require__(169);
/* unused harmony reexport NewspaperIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_146__OfficeBuildingIcon_js__ = __webpack_require__(170);
/* unused harmony reexport OfficeBuildingIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_147__PaperAirplaneIcon_js__ = __webpack_require__(171);
/* unused harmony reexport PaperAirplaneIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_148__PaperClipIcon_js__ = __webpack_require__(172);
/* unused harmony reexport PaperClipIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_149__PauseIcon_js__ = __webpack_require__(173);
/* unused harmony reexport PauseIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_150__PencilAltIcon_js__ = __webpack_require__(174);
/* unused harmony reexport PencilAltIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_151__PencilIcon_js__ = __webpack_require__(175);
/* unused harmony reexport PencilIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_152__PhoneIncomingIcon_js__ = __webpack_require__(176);
/* unused harmony reexport PhoneIncomingIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_153__PhoneMissedCallIcon_js__ = __webpack_require__(177);
/* unused harmony reexport PhoneMissedCallIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_154__PhoneOutgoingIcon_js__ = __webpack_require__(178);
/* unused harmony reexport PhoneOutgoingIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_155__PhoneIcon_js__ = __webpack_require__(179);
/* unused harmony reexport PhoneIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_156__PhotographIcon_js__ = __webpack_require__(180);
/* unused harmony reexport PhotographIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_157__PlayIcon_js__ = __webpack_require__(181);
/* unused harmony reexport PlayIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_158__PlusCircleIcon_js__ = __webpack_require__(182);
/* unused harmony reexport PlusCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_159__PlusSmIcon_js__ = __webpack_require__(183);
/* unused harmony reexport PlusSmIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_160__PlusIcon_js__ = __webpack_require__(184);
/* unused harmony reexport PlusIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_161__PresentationChartBarIcon_js__ = __webpack_require__(185);
/* unused harmony reexport PresentationChartBarIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_162__PresentationChartLineIcon_js__ = __webpack_require__(186);
/* unused harmony reexport PresentationChartLineIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_163__PrinterIcon_js__ = __webpack_require__(187);
/* unused harmony reexport PrinterIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_164__PuzzleIcon_js__ = __webpack_require__(188);
/* unused harmony reexport PuzzleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_165__QrcodeIcon_js__ = __webpack_require__(189);
/* unused harmony reexport QrcodeIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_166__QuestionMarkCircleIcon_js__ = __webpack_require__(190);
/* unused harmony reexport QuestionMarkCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_167__ReceiptRefundIcon_js__ = __webpack_require__(191);
/* unused harmony reexport ReceiptRefundIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_168__ReceiptTaxIcon_js__ = __webpack_require__(192);
/* unused harmony reexport ReceiptTaxIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_169__RefreshIcon_js__ = __webpack_require__(193);
/* unused harmony reexport RefreshIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_170__ReplyIcon_js__ = __webpack_require__(194);
/* unused harmony reexport ReplyIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_171__RewindIcon_js__ = __webpack_require__(195);
/* unused harmony reexport RewindIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_172__RssIcon_js__ = __webpack_require__(196);
/* unused harmony reexport RssIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_173__SaveAsIcon_js__ = __webpack_require__(197);
/* unused harmony reexport SaveAsIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_174__SaveIcon_js__ = __webpack_require__(198);
/* unused harmony reexport SaveIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_175__ScaleIcon_js__ = __webpack_require__(199);
/* unused harmony reexport ScaleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_176__ScissorsIcon_js__ = __webpack_require__(200);
/* unused harmony reexport ScissorsIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_177__SearchCircleIcon_js__ = __webpack_require__(201);
/* unused harmony reexport SearchCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_178__SearchIcon_js__ = __webpack_require__(202);
/* unused harmony reexport SearchIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_179__SelectorIcon_js__ = __webpack_require__(203);
/* unused harmony reexport SelectorIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_180__ServerIcon_js__ = __webpack_require__(204);
/* unused harmony reexport ServerIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_181__ShareIcon_js__ = __webpack_require__(205);
/* unused harmony reexport ShareIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_182__ShieldCheckIcon_js__ = __webpack_require__(206);
/* unused harmony reexport ShieldCheckIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_183__ShieldExclamationIcon_js__ = __webpack_require__(207);
/* unused harmony reexport ShieldExclamationIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_184__ShoppingBagIcon_js__ = __webpack_require__(208);
/* unused harmony reexport ShoppingBagIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_185__ShoppingCartIcon_js__ = __webpack_require__(209);
/* unused harmony reexport ShoppingCartIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_186__SortAscendingIcon_js__ = __webpack_require__(210);
/* unused harmony reexport SortAscendingIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_187__SortDescendingIcon_js__ = __webpack_require__(211);
/* unused harmony reexport SortDescendingIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_188__SparklesIcon_js__ = __webpack_require__(212);
/* unused harmony reexport SparklesIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_189__SpeakerphoneIcon_js__ = __webpack_require__(213);
/* unused harmony reexport SpeakerphoneIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_190__StarIcon_js__ = __webpack_require__(214);
/* unused harmony reexport StarIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_191__StatusOfflineIcon_js__ = __webpack_require__(215);
/* unused harmony reexport StatusOfflineIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_192__StatusOnlineIcon_js__ = __webpack_require__(216);
/* unused harmony reexport StatusOnlineIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_193__StopIcon_js__ = __webpack_require__(217);
/* unused harmony reexport StopIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_194__SunIcon_js__ = __webpack_require__(218);
/* unused harmony reexport SunIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_195__SupportIcon_js__ = __webpack_require__(219);
/* unused harmony reexport SupportIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_196__SwitchHorizontalIcon_js__ = __webpack_require__(220);
/* unused harmony reexport SwitchHorizontalIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_197__SwitchVerticalIcon_js__ = __webpack_require__(221);
/* unused harmony reexport SwitchVerticalIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_198__TableIcon_js__ = __webpack_require__(222);
/* unused harmony reexport TableIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_199__TagIcon_js__ = __webpack_require__(223);
/* unused harmony reexport TagIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_200__TemplateIcon_js__ = __webpack_require__(224);
/* unused harmony reexport TemplateIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_201__TerminalIcon_js__ = __webpack_require__(225);
/* unused harmony reexport TerminalIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_202__ThumbDownIcon_js__ = __webpack_require__(226);
/* unused harmony reexport ThumbDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_203__ThumbUpIcon_js__ = __webpack_require__(227);
/* unused harmony reexport ThumbUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_204__TicketIcon_js__ = __webpack_require__(228);
/* unused harmony reexport TicketIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_205__TranslateIcon_js__ = __webpack_require__(229);
/* unused harmony reexport TranslateIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_206__TrashIcon_js__ = __webpack_require__(230);
/* unused harmony reexport TrashIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_207__TrendingDownIcon_js__ = __webpack_require__(231);
/* unused harmony reexport TrendingDownIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_208__TrendingUpIcon_js__ = __webpack_require__(232);
/* unused harmony reexport TrendingUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_209__TruckIcon_js__ = __webpack_require__(233);
/* unused harmony reexport TruckIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_210__UploadIcon_js__ = __webpack_require__(234);
/* unused harmony reexport UploadIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_211__UserAddIcon_js__ = __webpack_require__(235);
/* unused harmony reexport UserAddIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_212__UserCircleIcon_js__ = __webpack_require__(236);
/* unused harmony reexport UserCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_213__UserGroupIcon_js__ = __webpack_require__(237);
/* unused harmony reexport UserGroupIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_214__UserRemoveIcon_js__ = __webpack_require__(238);
/* unused harmony reexport UserRemoveIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_215__UserIcon_js__ = __webpack_require__(239);
/* unused harmony reexport UserIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_216__UsersIcon_js__ = __webpack_require__(240);
/* unused harmony reexport UsersIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_217__VariableIcon_js__ = __webpack_require__(241);
/* unused harmony reexport VariableIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_218__VideoCameraIcon_js__ = __webpack_require__(242);
/* unused harmony reexport VideoCameraIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_219__ViewBoardsIcon_js__ = __webpack_require__(243);
/* unused harmony reexport ViewBoardsIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_220__ViewGridAddIcon_js__ = __webpack_require__(244);
/* unused harmony reexport ViewGridAddIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_221__ViewGridIcon_js__ = __webpack_require__(245);
/* unused harmony reexport ViewGridIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_222__ViewListIcon_js__ = __webpack_require__(246);
/* unused harmony reexport ViewListIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_223__VolumeOffIcon_js__ = __webpack_require__(247);
/* unused harmony reexport VolumeOffIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_224__VolumeUpIcon_js__ = __webpack_require__(248);
/* unused harmony reexport VolumeUpIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_225__WifiIcon_js__ = __webpack_require__(249);
/* unused harmony reexport WifiIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_226__XCircleIcon_js__ = __webpack_require__(250);
/* unused harmony reexport XCircleIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_227__XIcon_js__ = __webpack_require__(251);
/* unused harmony reexport XIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_228__ZoomInIcon_js__ = __webpack_require__(252);
/* unused harmony reexport ZoomInIcon */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_229__ZoomOutIcon_js__ = __webpack_require__(253);
/* unused harmony reexport ZoomOutIcon */







































































































































































































































/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IconContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createContext && /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createContext(DefaultContext);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return projects; });
/* unused harmony export testimonials */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return skills; });
var projects=[{title:"React Reserve",subtitle:"MERN Stack",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",image:"./project-1.gif",link:"https://reactbootcamp.com"},{title:"React Tracks",subtitle:"React and Python",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",image:"./project-2.gif",link:"https://reactbootcamp.com"},{title:"DevChat",subtitle:"React and Firebase",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",image:"./project-3.gif",link:"https://reactbootcamp.com"},{title:"Epic Todo App",subtitle:"React Hooks",description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolore rerum laborum iure enim sint nemo omnis voluptate exercitationem eius?",image:"./project-4.gif",link:"https://reactbootcamp.com"}];var testimonials=[{quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod necessitatibus quidem impedit facilis? Distinctio laboriosam veritatis recusandae minus. Voluptatum accusantium hic laudantium soluta ea sapiente cupiditate officia maiores itaque.",image:"https://randomuser.me/api/portraits/men/1.jpg",name:"Jesse Hicks",company:"Zoozle"},{quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quod necessitatibus quidem impedit facilis? Distinctio laboriosam veritatis recusandae minus. Voluptatum accusantium hic laudantium soluta ea sapiente cupiditate officia maiores itaque.",image:"https://randomuser.me/api/portraits/men/94.jpg",name:"Ruben Alvarez",company:"Dooble.io"}];var skills=["JavaScript","React","Next.js","Node","GraphQL","Material UI"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(13);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  __webpack_require__(8).enable();
  window.Promise = __webpack_require__(11);
}

// fetch() polyfill for making API calls.
__webpack_require__(12);

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(1);

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (false) {
  require('raf').polyfill(global);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(2);

var DEFAULT_WHITELIST = [
  ReferenceError,
  TypeError,
  RangeError
];

var enabled = false;
exports.disable = disable;
function disable() {
  enabled = false;
  Promise._47 = null;
  Promise._71 = null;
}

exports.enable = enable;
function enable(options) {
  options = options || {};
  if (enabled) disable();
  enabled = true;
  var id = 0;
  var displayId = 0;
  var rejections = {};
  Promise._47 = function (promise) {
    if (
      promise._83 === 2 && // IS REJECTED
      rejections[promise._56]
    ) {
      if (rejections[promise._56].logged) {
        onHandled(promise._56);
      } else {
        clearTimeout(rejections[promise._56].timeout);
      }
      delete rejections[promise._56];
    }
  };
  Promise._71 = function (promise, err) {
    if (promise._75 === 0) { // not yet handled
      promise._56 = id++;
      rejections[promise._56] = {
        displayId: null,
        error: err,
        timeout: setTimeout(
          onUnhandled.bind(null, promise._56),
          // For reference errors and type errors, this almost always
          // means the programmer made a mistake, so log them after just
          // 100ms
          // otherwise, wait 2 seconds to see if they get handled
          matchWhitelist(err, DEFAULT_WHITELIST)
            ? 100
            : 2000
        ),
        logged: false
      };
    }
  };
  function onUnhandled(id) {
    if (
      options.allRejections ||
      matchWhitelist(
        rejections[id].error,
        options.whitelist || DEFAULT_WHITELIST
      )
    ) {
      rejections[id].displayId = displayId++;
      if (options.onUnhandled) {
        rejections[id].logged = true;
        options.onUnhandled(
          rejections[id].displayId,
          rejections[id].error
        );
      } else {
        rejections[id].logged = true;
        logError(
          rejections[id].displayId,
          rejections[id].error
        );
      }
    }
  }
  function onHandled(id) {
    if (rejections[id].logged) {
      if (options.onHandled) {
        options.onHandled(rejections[id].displayId, rejections[id].error);
      } else if (!rejections[id].onUnhandled) {
        console.warn(
          'Promise Rejection Handled (id: ' + rejections[id].displayId + '):'
        );
        console.warn(
          '  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' +
          rejections[id].displayId + '.'
        );
      }
    }
  }
}

function logError(id, error) {
  console.warn('Possible Unhandled Promise Rejection (id: ' + id + '):');
  var errStr = (error && (error.stack || error)) + '';
  errStr.split('\n').forEach(function (line) {
    console.warn('  ' + line);
  });
}

function matchWhitelist(error, list) {
  return list.some(function (cls) {
    return error instanceof cls;
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(2);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._44);
  p._83 = 1;
  p._18 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._83 === 3) {
            val = val._18;
          }
          if (val._83 === 1) return res(i, val._18);
          if (val._83 === 2) reject(val._18);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App__ = __webpack_require__(20);
__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.StrictMode,null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__App__["a" /* default */],null)),document.getElementById('root'));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=__webpack_require__(1),n=60103,p=60106;exports.Fragment=60107;exports.StrictMode=60108;exports.Profiler=60114;var q=60109,r=60110,t=60112;exports.Suspense=60113;var u=60115,v=60116;
if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;n=w("react.element");p=w("react.portal");exports.Fragment=w("react.fragment");exports.StrictMode=w("react.strict_mode");exports.Profiler=w("react.profiler");q=w("react.provider");r=w("react.context");t=w("react.forward_ref");exports.Suspense=w("react.suspense");u=w("react.memo");v=w("react.lazy")}var x="function"===typeof Symbol&&Symbol.iterator;
function y(a){if(null===a||"object"!==typeof a)return null;a=x&&a[x]||a["@@iterator"];return"function"===typeof a?a:null}function z(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},B={};function C(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}C.prototype.isReactComponent={};C.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(z(85));this.updater.enqueueSetState(this,a,b,"setState")};C.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function D(){}D.prototype=C.prototype;function E(a,b,c){this.props=a;this.context=b;this.refs=B;this.updater=c||A}var F=E.prototype=new D;F.constructor=E;l(F,C.prototype);F.isPureReactComponent=!0;var G={current:null},H=Object.prototype.hasOwnProperty,I={key:!0,ref:!0,__self:!0,__source:!0};
function J(a,b,c){var e,d={},k=null,h=null;if(null!=b)for(e in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)H.call(b,e)&&!I.hasOwnProperty(e)&&(d[e]=b[e]);var g=arguments.length-2;if(1===g)d.children=c;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];d.children=f}if(a&&a.defaultProps)for(e in g=a.defaultProps,g)void 0===d[e]&&(d[e]=g[e]);return{$$typeof:n,type:a,key:k,ref:h,props:d,_owner:G.current}}
function K(a,b){return{$$typeof:n,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function L(a){return"object"===typeof a&&null!==a&&a.$$typeof===n}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var M=/\/+/g;function N(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function O(a,b,c,e,d){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case n:case p:h=!0}}if(h)return h=a,d=d(h),a=""===e?"."+N(h,0):e,Array.isArray(d)?(c="",null!=a&&(c=a.replace(M,"$&/")+"/"),O(d,b,c,"",function(a){return a})):null!=d&&(L(d)&&(d=K(d,c+(!d.key||h&&h.key===d.key?"":(""+d.key).replace(M,"$&/")+"/")+a)),b.push(d)),1;h=0;e=""===e?".":e+":";if(Array.isArray(a))for(var g=
0;g<a.length;g++){k=a[g];var f=e+N(k,g);h+=O(k,b,c,f,d)}else if(f=y(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=e+N(k,g++),h+=O(k,b,c,f,d);else if("object"===k)throw b=""+a,Error(z(31,"[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b));return h}function P(a,b,c){if(null==a)return a;var e=[],d=0;O(a,e,"","",function(a){return b.call(c,a,d++)});return e}
function Q(a){if(-1===a._status){var b=a._result;b=b();a._status=0;a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}if(1===a._status)return a._result;throw a._result;}var R={current:null};function S(){var a=R.current;if(null===a)throw Error(z(321));return a}var T={ReactCurrentDispatcher:R,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:G,IsSomeRendererActing:{current:!1},assign:l};
exports.Children={map:P,forEach:function(a,b,c){P(a,function(){b.apply(this,arguments)},c)},count:function(a){var b=0;P(a,function(){b++});return b},toArray:function(a){return P(a,function(a){return a})||[]},only:function(a){if(!L(a))throw Error(z(143));return a}};exports.Component=C;exports.PureComponent=E;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=T;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(z(267,a));var e=l({},a.props),d=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=G.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)H.call(b,f)&&!I.hasOwnProperty(f)&&(e[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)e.children=c;else if(1<f){g=Array(f);for(var m=0;m<f;m++)g[m]=arguments[m+2];e.children=g}return{$$typeof:n,type:a.type,
key:d,ref:k,props:e,_owner:h}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:r,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:q,_context:a};return a.Consumer=a};exports.createElement=J;exports.createFactory=function(a){var b=J.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:t,render:a}};exports.isValidElement=L;
exports.lazy=function(a){return{$$typeof:v,_payload:{_status:-1,_result:a},_init:Q}};exports.memo=function(a,b){return{$$typeof:u,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return S().useCallback(a,b)};exports.useContext=function(a,b){return S().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return S().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return S().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return S().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return S().useMemo(a,b)};exports.useReducer=function(a,b,c){return S().useReducer(a,b,c)};exports.useRef=function(a){return S().useRef(a)};exports.useState=function(a){return S().useState(a)};exports.version="17.0.2";


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(16);
} else {
  module.exports = require('./cjs/react-dom.development.js');
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(0),m=__webpack_require__(1),r=__webpack_require__(17);function y(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(y(227));var ba=new Set,ca={};function da(a,b){ea(a,b);ea(a+"Capture",b)}
function ea(a,b){ca[a]=b;for(a=0;a<b.length;a++)ba.add(b[a])}
var fa=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ha=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ia=Object.prototype.hasOwnProperty,
ja={},ka={};function la(a){if(ia.call(ka,a))return!0;if(ia.call(ja,a))return!1;if(ha.test(a))return ka[a]=!0;ja[a]=!0;return!1}function ma(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function na(a,b,c,d){if(null===b||"undefined"===typeof b||ma(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1,!1)});var oa=/[\-:]([a-z])/g;function pa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(oa,
pa);D[b]=new B(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(oa,pa);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0,!0)});
function qa(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(na(b,c,e,d)&&(c=null),d||null===e?la(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
var ra=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=60103,ta=60106,ua=60107,wa=60108,xa=60114,ya=60109,za=60110,Aa=60112,Ba=60113,Ca=60120,Da=60115,Ea=60116,Fa=60121,Ga=60128,Ha=60129,Ia=60130,Ja=60131;
if("function"===typeof Symbol&&Symbol.for){var E=Symbol.for;sa=E("react.element");ta=E("react.portal");ua=E("react.fragment");wa=E("react.strict_mode");xa=E("react.profiler");ya=E("react.provider");za=E("react.context");Aa=E("react.forward_ref");Ba=E("react.suspense");Ca=E("react.suspense_list");Da=E("react.memo");Ea=E("react.lazy");Fa=E("react.block");E("react.scope");Ga=E("react.opaque.id");Ha=E("react.debug_trace_mode");Ia=E("react.offscreen");Ja=E("react.legacy_hidden")}
var Ka="function"===typeof Symbol&&Symbol.iterator;function La(a){if(null===a||"object"!==typeof a)return null;a=Ka&&a[Ka]||a["@@iterator"];return"function"===typeof a?a:null}var Ma;function Na(a){if(void 0===Ma)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);Ma=b&&b[1]||""}return"\n"+Ma+a}var Oa=!1;
function Pa(a,b){if(!a||Oa)return"";Oa=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(k){var d=k}Reflect.construct(a,[],b)}else{try{b.call()}catch(k){d=k}a.call(b.prototype)}else{try{throw Error();}catch(k){d=k}a()}}catch(k){if(k&&d&&"string"===typeof k.stack){for(var e=k.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h])return"\n"+e[g].replace(" at new "," at ");while(1<=g&&0<=h)}break}}}finally{Oa=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Na(a):""}
function Qa(a){switch(a.tag){case 5:return Na(a.type);case 16:return Na("Lazy");case 13:return Na("Suspense");case 19:return Na("SuspenseList");case 0:case 2:case 15:return a=Pa(a.type,!1),a;case 11:return a=Pa(a.type.render,!1),a;case 22:return a=Pa(a.type._render,!1),a;case 1:return a=Pa(a.type,!0),a;default:return""}}
function Ra(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ua:return"Fragment";case ta:return"Portal";case xa:return"Profiler";case wa:return"StrictMode";case Ba:return"Suspense";case Ca:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case za:return(a.displayName||"Context")+".Consumer";case ya:return(a._context.displayName||"Context")+".Provider";case Aa:var b=a.render;b=b.displayName||b.name||"";
return a.displayName||(""!==b?"ForwardRef("+b+")":"ForwardRef");case Da:return Ra(a.type);case Fa:return Ra(a._render);case Ea:b=a._payload;a=a._init;try{return Ra(a(b))}catch(c){}}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return m({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function $a(a,b){b=b.checked;null!=b&&qa(a,"checked",b,!1)}
function ab(a,b){$a(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?bb(a,b.type,c):b.hasOwnProperty("defaultValue")&&bb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function cb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function bb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function db(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function eb(a,b){a=m({children:void 0},b);if(b=db(b.children))a.children=b;return a}
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(y(91));return m({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(y(92));if(Array.isArray(c)){if(!(1>=c.length))throw Error(y(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var kb={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function lb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function mb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?lb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var nb,ob=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==kb.svg||"innerHTML"in a)a.innerHTML=b;else{nb=nb||document.createElement("div");nb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=nb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function pb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var qb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rb=["Webkit","ms","Moz","O"];Object.keys(qb).forEach(function(a){rb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);qb[b]=qb[a]})});function sb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||qb.hasOwnProperty(a)&&qb[a]?(""+b).trim():b+"px"}
function tb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=sb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var ub=m({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function vb(a,b){if(b){if(ub[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(y(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(y(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(y(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(y(62));}}
function wb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(y(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(a,b,c,d,e){return a(b,c,d,e)}function Ib(){}var Jb=Gb,Kb=!1,Lb=!1;function Mb(){if(null!==zb||null!==Ab)Ib(),Fb()}
function Nb(a,b,c){if(Lb)return a(b,c);Lb=!0;try{return Jb(a,b,c)}finally{Lb=!1,Mb()}}
function Ob(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(y(231,b,typeof c));return c}var Pb=!1;if(fa)try{var Qb={};Object.defineProperty(Qb,"passive",{get:function(){Pb=!0}});window.addEventListener("test",Qb,Qb);window.removeEventListener("test",Qb,Qb)}catch(a){Pb=!1}function Rb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(n){this.onError(n)}}var Sb=!1,Tb=null,Ub=!1,Vb=null,Wb={onError:function(a){Sb=!0;Tb=a}};function Xb(a,b,c,d,e,f,g,h,k){Sb=!1;Tb=null;Rb.apply(Wb,arguments)}
function Yb(a,b,c,d,e,f,g,h,k){Xb.apply(this,arguments);if(Sb){if(Sb){var l=Tb;Sb=!1;Tb=null}else throw Error(y(198));Ub||(Ub=!0,Vb=l)}}function Zb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function $b(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function ac(a){if(Zb(a)!==a)throw Error(y(188));}
function bc(a){var b=a.alternate;if(!b){b=Zb(a);if(null===b)throw Error(y(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return ac(e),a;if(f===d)return ac(e),b;f=f.sibling}throw Error(y(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(y(189));}}if(c.alternate!==d)throw Error(y(190));}if(3!==c.tag)throw Error(y(188));return c.stateNode.current===c?a:b}function cc(a){a=bc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function dc(a,b){for(var c=a.alternate;null!==b;){if(b===a||b===c)return!0;b=b.return}return!1}var ec,fc,gc,hc,ic=!1,jc=[],kc=null,lc=null,mc=null,nc=new Map,oc=new Map,pc=[],qc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a,b,c,d,e){return{blockedOn:a,domEventName:b,eventSystemFlags:c|16,nativeEvent:e,targetContainers:[d]}}function sc(a,b){switch(a){case "focusin":case "focusout":kc=null;break;case "dragenter":case "dragleave":lc=null;break;case "mouseover":case "mouseout":mc=null;break;case "pointerover":case "pointerout":nc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":oc.delete(b.pointerId)}}
function tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a=rc(b,c,d,e,f),null!==b&&(b=Cb(b),null!==b&&fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function uc(a,b,c,d,e){switch(b){case "focusin":return kc=tc(kc,a,b,c,d,e),!0;case "dragenter":return lc=tc(lc,a,b,c,d,e),!0;case "mouseover":return mc=tc(mc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;nc.set(f,tc(nc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,oc.set(f,tc(oc.get(f)||null,a,b,c,d,e)),!0}return!1}
function vc(a){var b=wc(a.target);if(null!==b){var c=Zb(b);if(null!==c)if(b=c.tag,13===b){if(b=$b(c),null!==b){a.blockedOn=b;hc(a.lanePriority,function(){r.unstable_runWithPriority(a.priority,function(){gc(c)})});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c)return b=Cb(c),null!==b&&fc(b),a.blockedOn=c,!1;b.shift()}return!0}function zc(a,b,c){xc(a)&&c.delete(b)}
function Ac(){for(ic=!1;0<jc.length;){var a=jc[0];if(null!==a.blockedOn){a=Cb(a.blockedOn);null!==a&&ec(a);break}for(var b=a.targetContainers;0<b.length;){var c=yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null!==c){a.blockedOn=c;break}b.shift()}null===a.blockedOn&&jc.shift()}null!==kc&&xc(kc)&&(kc=null);null!==lc&&xc(lc)&&(lc=null);null!==mc&&xc(mc)&&(mc=null);nc.forEach(zc);oc.forEach(zc)}
function Bc(a,b){a.blockedOn===b&&(a.blockedOn=null,ic||(ic=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ac)))}
function Cc(a){function b(b){return Bc(b,a)}if(0<jc.length){Bc(jc[0],a);for(var c=1;c<jc.length;c++){var d=jc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==kc&&Bc(kc,a);null!==lc&&Bc(lc,a);null!==mc&&Bc(mc,a);nc.forEach(b);oc.forEach(b);for(c=0;c<pc.length;c++)d=pc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<pc.length&&(c=pc[0],null===c.blockedOn);)vc(c),null===c.blockedOn&&pc.shift()}
function Dc(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ec={animationend:Dc("Animation","AnimationEnd"),animationiteration:Dc("Animation","AnimationIteration"),animationstart:Dc("Animation","AnimationStart"),transitionend:Dc("Transition","TransitionEnd")},Fc={},Gc={};
fa&&(Gc=document.createElement("div").style,"AnimationEvent"in window||(delete Ec.animationend.animation,delete Ec.animationiteration.animation,delete Ec.animationstart.animation),"TransitionEvent"in window||delete Ec.transitionend.transition);function Hc(a){if(Fc[a])return Fc[a];if(!Ec[a])return a;var b=Ec[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Gc)return Fc[a]=b[c];return a}
var Ic=Hc("animationend"),Jc=Hc("animationiteration"),Kc=Hc("animationstart"),Lc=Hc("transitionend"),Mc=new Map,Nc=new Map,Oc=["abort","abort",Ic,"animationEnd",Jc,"animationIteration",Kc,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart",
"lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",Lc,"transitionEnd","waiting","waiting"];function Pc(a,b){for(var c=0;c<a.length;c+=2){var d=a[c],e=a[c+1];e="on"+(e[0].toUpperCase()+e.slice(1));Nc.set(d,b);Mc.set(d,e);da(e,[d])}}var Qc=r.unstable_now;Qc();var F=8;
function Rc(a){if(0!==(1&a))return F=15,1;if(0!==(2&a))return F=14,2;if(0!==(4&a))return F=13,4;var b=24&a;if(0!==b)return F=12,b;if(0!==(a&32))return F=11,32;b=192&a;if(0!==b)return F=10,b;if(0!==(a&256))return F=9,256;b=3584&a;if(0!==b)return F=8,b;if(0!==(a&4096))return F=7,4096;b=4186112&a;if(0!==b)return F=6,b;b=62914560&a;if(0!==b)return F=5,b;if(a&67108864)return F=4,67108864;if(0!==(a&134217728))return F=3,134217728;b=805306368&a;if(0!==b)return F=2,b;if(0!==(1073741824&a))return F=1,1073741824;
F=8;return a}function Sc(a){switch(a){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}function Tc(a){switch(a){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(y(358,a));}}
function Uc(a,b){var c=a.pendingLanes;if(0===c)return F=0;var d=0,e=0,f=a.expiredLanes,g=a.suspendedLanes,h=a.pingedLanes;if(0!==f)d=f,e=F=15;else if(f=c&134217727,0!==f){var k=f&~g;0!==k?(d=Rc(k),e=F):(h&=f,0!==h&&(d=Rc(h),e=F))}else f=c&~g,0!==f?(d=Rc(f),e=F):0!==h&&(d=Rc(h),e=F);if(0===d)return 0;d=31-Vc(d);d=c&((0>d?0:1<<d)<<1)-1;if(0!==b&&b!==d&&0===(b&g)){Rc(b);if(e<=F)return b;F=e}b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-Vc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Wc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Xc(a,b){switch(a){case 15:return 1;case 14:return 2;case 12:return a=Yc(24&~b),0===a?Xc(10,b):a;case 10:return a=Yc(192&~b),0===a?Xc(8,b):a;case 8:return a=Yc(3584&~b),0===a&&(a=Yc(4186112&~b),0===a&&(a=512)),a;case 2:return b=Yc(805306368&~b),0===b&&(b=268435456),b}throw Error(y(358,a));}function Yc(a){return a&-a}function Zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function $c(a,b,c){a.pendingLanes|=b;var d=b-1;a.suspendedLanes&=d;a.pingedLanes&=d;a=a.eventTimes;b=31-Vc(b);a[b]=c}var Vc=Math.clz32?Math.clz32:ad,bd=Math.log,cd=Math.LN2;function ad(a){return 0===a?32:31-(bd(a)/cd|0)|0}var dd=r.unstable_UserBlockingPriority,ed=r.unstable_runWithPriority,fd=!0;function gd(a,b,c,d){Kb||Ib();var e=hd,f=Kb;Kb=!0;try{Hb(e,a,b,c,d)}finally{(Kb=f)||Mb()}}function id(a,b,c,d){ed(dd,hd.bind(null,a,b,c,d))}
function hd(a,b,c,d){if(fd){var e;if((e=0===(b&4))&&0<jc.length&&-1<qc.indexOf(a))a=rc(null,a,b,c,d),jc.push(a);else{var f=yc(a,b,c,d);if(null===f)e&&sc(a,d);else{if(e){if(-1<qc.indexOf(a)){a=rc(f,a,b,c,d);jc.push(a);return}if(uc(f,a,b,c,d))return;sc(a,d)}jd(a,b,d,null,c)}}}}
function yc(a,b,c,d){var e=xb(d);e=wc(e);if(null!==e){var f=Zb(e);if(null===f)e=null;else{var g=f.tag;if(13===g){e=$b(f);if(null!==e)return e;e=null}else if(3===g){if(f.stateNode.hydrate)return 3===f.tag?f.stateNode.containerInfo:null;e=null}else f!==e&&(e=null)}}jd(a,b,d,e,c);return null}var kd=null,ld=null,md=null;
function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}m(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=m({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=m({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=m({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=m({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=m({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=m({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=m({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=m({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=m({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=m({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=m({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=m({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=fa&&"CompositionEvent"in window,be=null;fa&&"documentMode"in document&&(be=document.documentMode);var ce=fa&&"TextEvent"in window&&!be,de=fa&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(fa){var xe;if(fa){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));a=re;if(Kb)a(b);else{Kb=!0;try{Gb(a,b)}finally{Kb=!1,Mb()}}}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge,Ie=Object.prototype.hasOwnProperty;
function Je(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!Ie.call(b,c[d])||!He(a[c[d]],b[c[d]]))return!1;return!0}function Ke(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Le(a,b){var c=Ke(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Ke(c)}}function Me(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Me(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Ne(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Oe(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
var Pe=fa&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Oe(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Je(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
0);Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1);Pc(Oc,2);for(var Ve="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),We=0;We<Ve.length;We++)Nc.set(Ve[We],0);ea("onMouseEnter",["mouseout","mouseover"]);
ea("onMouseLeave",["mouseout","mouseover"]);ea("onPointerEnter",["pointerout","pointerover"]);ea("onPointerLeave",["pointerout","pointerover"]);da("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));da("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));da("onBeforeInput",["compositionend","keypress","textInput","paste"]);da("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));da("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xe="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ye=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Yb(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;Ze(e,h,l);f=k}}}if(Ub)throw a=Vb,Ub=!1,Vb=null,a;}
function G(a,b){var c=$e(b),d=a+"__bubble";c.has(d)||(af(b,a,2,!1),c.add(d))}var bf="_reactListening"+Math.random().toString(36).slice(2);function cf(a){a[bf]||(a[bf]=!0,ba.forEach(function(b){Ye.has(b)||df(b,!1,a,null);df(b,!0,a,null)}))}
function df(a,b,c,d){var e=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,f=c;"selectionchange"===a&&9!==c.nodeType&&(f=c.ownerDocument);if(null!==d&&!b&&Ye.has(a)){if("scroll"!==a)return;e|=2;f=d}var g=$e(f),h=a+"__"+(b?"capture":"bubble");g.has(h)||(b&&(e|=4),af(f,a,e,b),g.add(h))}
function af(a,b,c,d){var e=Nc.get(b);switch(void 0===e?2:e){case 0:e=gd;break;case 1:e=id;break;default:e=hd}c=e.bind(null,b,c,a);e=void 0;!Pb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function jd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Nb(function(){var d=f,e=xb(c),g=[];
a:{var h=Mc.get(a);if(void 0!==h){var k=td,x=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":x="focus";k=Fd;break;case "focusout":x="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case Ic:case Jc:case Kc:k=Hd;break;case Lc:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var w=0!==(b&4),z=!w&&"scroll"===a,u=w?null!==h?h+"Capture":null:h;w=[];for(var t=d,q;null!==
t;){q=t;var v=q.stateNode;5===q.tag&&null!==v&&(q=v,null!==u&&(v=Ob(t,u),null!=v&&w.push(ef(t,v,q))));if(z)break;t=t.return}0<w.length&&(h=new k(h,x,null,c,e),g.push({event:h,listeners:w}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&0===(b&16)&&(x=c.relatedTarget||c.fromElement)&&(wc(x)||x[ff]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(x=c.relatedTarget||c.toElement,k=d,x=x?wc(x):null,null!==
x&&(z=Zb(x),x!==z||5!==x.tag&&6!==x.tag))x=null}else k=null,x=d;if(k!==x){w=Bd;v="onMouseLeave";u="onMouseEnter";t="mouse";if("pointerout"===a||"pointerover"===a)w=Td,v="onPointerLeave",u="onPointerEnter",t="pointer";z=null==k?h:ue(k);q=null==x?h:ue(x);h=new w(v,t+"leave",k,c,e);h.target=z;h.relatedTarget=q;v=null;wc(e)===d&&(w=new w(u,t+"enter",x,c,e),w.target=q,w.relatedTarget=z,v=w);z=v;if(k&&x)b:{w=k;u=x;t=0;for(q=w;q;q=gf(q))t++;q=0;for(v=u;v;v=gf(v))q++;for(;0<t-q;)w=gf(w),t--;for(;0<q-t;)u=
gf(u),q--;for(;t--;){if(w===u||null!==u&&w===u.alternate)break b;w=gf(w);u=gf(u)}w=null}else w=null;null!==k&&hf(g,h,k,w,!1);null!==x&&null!==z&&hf(g,z,x,w,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var J=ve;else if(me(h))if(we)J=Fe;else{J=De;var K=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(J=Ee);if(J&&(J=J(a,d))){ne(g,J,c,e);break a}K&&K(a,h,d);"focusout"===a&&(K=h._wrapperState)&&
K.controlled&&"number"===h.type&&bb(h,"number",h.value)}K=d?ue(d):window;switch(a){case "focusin":if(me(K)||"true"===K.contentEditable)Qe=K,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var Q;if(ae)b:{switch(a){case "compositionstart":var L="onCompositionStart";break b;case "compositionend":L="onCompositionEnd";break b;
case "compositionupdate":L="onCompositionUpdate";break b}L=void 0}else ie?ge(a,c)&&(L="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(L="onCompositionStart");L&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==L?"onCompositionEnd"===L&&ie&&(Q=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),K=oe(d,L),0<K.length&&(L=new Ld(L,a,null,c,e),g.push({event:L,listeners:K}),Q?L.data=Q:(Q=he(c),null!==Q&&(L.data=Q))));if(Q=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),0<d.length&&(e=new Ld("onBeforeInput",
"beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=Q)}se(g,b)})}function ef(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Ob(a,c),null!=f&&d.unshift(ef(a,f,e)),f=Ob(a,b),null!=f&&d.push(ef(a,f,e)));a=a.return}return d}function gf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function hf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Ob(c,f),null!=k&&g.unshift(ef(c,k,h))):e||(k=Ob(c,f),null!=k&&g.push(ef(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}function jf(){}var kf=null,lf=null;function mf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function nf(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var of="function"===typeof setTimeout?setTimeout:void 0,pf="function"===typeof clearTimeout?clearTimeout:void 0;function qf(a){1===a.nodeType?a.textContent="":9===a.nodeType&&(a=a.body,null!=a&&(a.textContent=""))}
function rf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}function sf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var tf=0;function uf(a){return{$$typeof:Ga,toString:a,valueOf:a}}var vf=Math.random().toString(36).slice(2),wf="__reactFiber$"+vf,xf="__reactProps$"+vf,ff="__reactContainer$"+vf,yf="__reactEvents$"+vf;
function wc(a){var b=a[wf];if(b)return b;for(var c=a.parentNode;c;){if(b=c[ff]||c[wf]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=sf(a);null!==a;){if(c=a[wf])return c;a=sf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[wf]||a[ff];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(y(33));}function Db(a){return a[xf]||null}
function $e(a){var b=a[yf];void 0===b&&(b=a[yf]=new Set);return b}var zf=[],Af=-1;function Bf(a){return{current:a}}function H(a){0>Af||(a.current=zf[Af],zf[Af]=null,Af--)}function I(a,b){Af++;zf[Af]=a.current;a.current=b}var Cf={},M=Bf(Cf),N=Bf(!1),Df=Cf;
function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function Ff(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gf(){H(N);H(M)}function Hf(a,b,c){if(M.current!==Cf)throw Error(y(168));I(M,b);I(N,c)}
function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(y(108,Ra(b)||"Unknown",e));return m({},c,d)}function Jf(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Cf;Df=M.current;I(M,a);I(N,N.current);return!0}function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(y(169));c?(a=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=a,H(N),H(M),I(M,a)):H(N);I(N,c)}
var Lf=null,Mf=null,Nf=r.unstable_runWithPriority,Of=r.unstable_scheduleCallback,Pf=r.unstable_cancelCallback,Qf=r.unstable_shouldYield,Rf=r.unstable_requestPaint,Sf=r.unstable_now,Tf=r.unstable_getCurrentPriorityLevel,Uf=r.unstable_ImmediatePriority,Vf=r.unstable_UserBlockingPriority,Wf=r.unstable_NormalPriority,Xf=r.unstable_LowPriority,Yf=r.unstable_IdlePriority,Zf={},$f=void 0!==Rf?Rf:function(){},ag=null,bg=null,cg=!1,dg=Sf(),O=1E4>dg?Sf:function(){return Sf()-dg};
function eg(){switch(Tf()){case Uf:return 99;case Vf:return 98;case Wf:return 97;case Xf:return 96;case Yf:return 95;default:throw Error(y(332));}}function fg(a){switch(a){case 99:return Uf;case 98:return Vf;case 97:return Wf;case 96:return Xf;case 95:return Yf;default:throw Error(y(332));}}function gg(a,b){a=fg(a);return Nf(a,b)}function hg(a,b,c){a=fg(a);return Of(a,b,c)}function ig(){if(null!==bg){var a=bg;bg=null;Pf(a)}jg()}
function jg(){if(!cg&&null!==ag){cg=!0;var a=0;try{var b=ag;gg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});ag=null}catch(c){throw null!==ag&&(ag=ag.slice(a+1)),Of(Uf,ig),c;}finally{cg=!1}}}var kg=ra.ReactCurrentBatchConfig;function lg(a,b){if(a&&a.defaultProps){b=m({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var mg=Bf(null),ng=null,og=null,pg=null;function qg(){pg=og=ng=null}
function rg(a){var b=mg.current;H(mg);a.type._context._currentValue=b}function sg(a,b){for(;null!==a;){var c=a.alternate;if((a.childLanes&b)===b)if(null===c||(c.childLanes&b)===b)break;else c.childLanes|=b;else a.childLanes|=b,null!==c&&(c.childLanes|=b);a=a.return}}function tg(a,b){ng=a;pg=og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(ug=!0),a.firstContext=null)}
function vg(a,b){if(pg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)pg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===og){if(null===ng)throw Error(y(308));og=b;ng.dependencies={lanes:0,firstContext:b,responders:null}}else og=og.next=b}return a._currentValue}var wg=!1;function xg(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}
function yg(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function zg(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}function Ag(a,b){a=a.updateQueue;if(null!==a){a=a.shared;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}}
function Bg(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function Cg(a,b,c,d){var e=a.updateQueue;wg=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;if(null!==n){n=n.updateQueue;var A=n.lastBaseUpdate;A!==g&&(null===A?n.firstBaseUpdate=l:A.next=l,n.lastBaseUpdate=k)}}if(null!==f){A=e.baseState;g=0;n=l=k=null;do{h=f.lane;var p=f.eventTime;if((d&h)===h){null!==n&&(n=n.next={eventTime:p,lane:0,tag:f.tag,payload:f.payload,callback:f.callback,
next:null});a:{var C=a,x=f;h=b;p=c;switch(x.tag){case 1:C=x.payload;if("function"===typeof C){A=C.call(p,A,h);break a}A=C;break a;case 3:C.flags=C.flags&-4097|64;case 0:C=x.payload;h="function"===typeof C?C.call(p,A,h):C;if(null===h||void 0===h)break a;A=m({},A,h);break a;case 2:wg=!0}}null!==f.callback&&(a.flags|=32,h=e.effects,null===h?e.effects=[f]:h.push(f))}else p={eventTime:p,lane:h,tag:f.tag,payload:f.payload,callback:f.callback,next:null},null===n?(l=n=p,k=A):n=n.next=p,g|=h;f=f.next;if(null===
f)if(h=e.shared.pending,null===h)break;else f=h.next,h.next=null,e.lastBaseUpdate=h,e.shared.pending=null}while(1);null===n&&(k=A);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;Dg|=g;a.lanes=g;a.memoizedState=A}}function Eg(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(y(191,e));e.call(d)}}}var Fg=(new aa.Component).refs;
function Gg(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:m({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Kg={isMounted:function(a){return(a=a._reactInternals)?Zb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=Hg(),e=Ig(a),f=zg(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);Ag(a,f);Jg(a,e,d)},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=Hg(),d=Ig(a),e=zg(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=
b);Ag(a,e);Jg(a,d,c)}};function Lg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Je(c,d)||!Je(e,f):!0}
function Mg(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=vg(f):(e=Ff(b)?Df:M.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Kg;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Ng(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Kg.enqueueReplaceState(b,b.state,null)}
function Og(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Fg;xg(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=vg(f):(f=Ff(b)?Df:M.current,e.context=Ef(a,f));Cg(a,c,e,d);e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Gg(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||
(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Kg.enqueueReplaceState(e,e.state,null),Cg(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4)}var Pg=Array.isArray;
function Qg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(y(309));var d=c.stateNode}if(!d)throw Error(y(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Fg&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(y(284));if(!c._owner)throw Error(y(290,a));}return a}
function Rg(a,b){if("textarea"!==a.type)throw Error(y(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b));}
function Sg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.flags=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Tg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags=2,
c):d;b.flags=2;return c}function g(b){a&&null===b.alternate&&(b.flags=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Ug(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Qg(a,b,c),d.return=a,d;d=Vg(c.type,c.key,c.props,null,a.mode,d);d.ref=Qg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
Wg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=Xg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function A(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Ug(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case sa:return c=Vg(b.type,b.key,b.props,null,a.mode,c),c.ref=Qg(a,null,b),c.return=a,c;case ta:return b=Wg(b,a.mode,c),b.return=a,b}if(Pg(b)||La(b))return b=Xg(b,
a.mode,c,null),b.return=a,b;Rg(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case sa:return c.key===e?c.type===ua?n(a,b,c.props.children,d,e):k(a,b,c,d):null;case ta:return c.key===e?l(a,b,c,d):null}if(Pg(c)||La(c))return null!==e?null:n(a,b,c,d,null);Rg(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||
null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case sa:return a=a.get(null===d.key?c:d.key)||null,d.type===ua?n(b,a,d.props.children,e,d.key):k(b,a,d,e);case ta:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Pg(d)||La(d))return a=a.get(c)||null,n(b,a,d,e,null);Rg(b,d)}return null}function x(e,g,h,k){for(var l=null,t=null,u=g,z=g=0,q=null;null!==u&&z<h.length;z++){u.index>z?(q=u,u=null):q=u.sibling;var n=p(e,u,h[z],k);if(null===n){null===u&&(u=q);break}a&&u&&null===
n.alternate&&b(e,u);g=f(n,g,z);null===t?l=n:t.sibling=n;t=n;u=q}if(z===h.length)return c(e,u),l;if(null===u){for(;z<h.length;z++)u=A(e,h[z],k),null!==u&&(g=f(u,g,z),null===t?l=u:t.sibling=u,t=u);return l}for(u=d(e,u);z<h.length;z++)q=C(u,e,z,h[z],k),null!==q&&(a&&null!==q.alternate&&u.delete(null===q.key?z:q.key),g=f(q,g,z),null===t?l=q:t.sibling=q,t=q);a&&u.forEach(function(a){return b(e,a)});return l}function w(e,g,h,k){var l=La(h);if("function"!==typeof l)throw Error(y(150));h=l.call(h);if(null==
h)throw Error(y(151));for(var t=l=null,u=g,z=g=0,q=null,n=h.next();null!==u&&!n.done;z++,n=h.next()){u.index>z?(q=u,u=null):q=u.sibling;var w=p(e,u,n.value,k);if(null===w){null===u&&(u=q);break}a&&u&&null===w.alternate&&b(e,u);g=f(w,g,z);null===t?l=w:t.sibling=w;t=w;u=q}if(n.done)return c(e,u),l;if(null===u){for(;!n.done;z++,n=h.next())n=A(e,n.value,k),null!==n&&(g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);return l}for(u=d(e,u);!n.done;z++,n=h.next())n=C(u,e,z,n.value,k),null!==n&&(a&&null!==n.alternate&&
u.delete(null===n.key?z:n.key),g=f(n,g,z),null===t?l=n:t.sibling=n,t=n);a&&u.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ua&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case sa:a:{l=f.key;for(k=d;null!==k;){if(k.key===l){switch(k.tag){case 7:if(f.type===ua){c(a,k.sibling);d=e(k,f.props.children);d.return=a;a=d;break a}break;default:if(k.elementType===f.type){c(a,k.sibling);
d=e(k,f.props);d.ref=Qg(a,k,f);d.return=a;a=d;break a}}c(a,k);break}else b(a,k);k=k.sibling}f.type===ua?(d=Xg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Vg(f.type,f.key,f.props,null,a.mode,h),h.ref=Qg(a,d,f),h.return=a,a=h)}return g(a);case ta:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=
Wg(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=Ug(f,a.mode,h),d.return=a,a=d),g(a);if(Pg(f))return x(a,d,f,h);if(La(f))return w(a,d,f,h);l&&Rg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 22:case 0:case 11:case 15:throw Error(y(152,Ra(a.type)||"Component"));}return c(a,d)}}var Yg=Sg(!0),Zg=Sg(!1),$g={},ah=Bf($g),bh=Bf($g),ch=Bf($g);
function dh(a){if(a===$g)throw Error(y(174));return a}function eh(a,b){I(ch,b);I(bh,a);I(ah,$g);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:mb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=mb(b,a)}H(ah);I(ah,b)}function fh(){H(ah);H(bh);H(ch)}function gh(a){dh(ch.current);var b=dh(ah.current);var c=mb(b,a.type);b!==c&&(I(bh,a),I(ah,c))}function hh(a){bh.current===a&&(H(ah),H(bh))}var P=Bf(0);
function ih(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var jh=null,kh=null,lh=!1;
function mh(a,b){var c=nh(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.flags=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function oh(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ph(a){if(lh){var b=kh;if(b){var c=b;if(!oh(a,b)){b=rf(c.nextSibling);if(!b||!oh(a,b)){a.flags=a.flags&-1025|2;lh=!1;jh=a;return}mh(jh,c)}jh=a;kh=rf(b.firstChild)}else a.flags=a.flags&-1025|2,lh=!1,jh=a}}function qh(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;jh=a}
function rh(a){if(a!==jh)return!1;if(!lh)return qh(a),lh=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!nf(b,a.memoizedProps))for(b=kh;b;)mh(a,b),b=rf(b.nextSibling);qh(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(y(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){kh=rf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}kh=null}}else kh=jh?rf(a.stateNode.nextSibling):null;return!0}
function sh(){kh=jh=null;lh=!1}var th=[];function uh(){for(var a=0;a<th.length;a++)th[a]._workInProgressVersionPrimary=null;th.length=0}var vh=ra.ReactCurrentDispatcher,wh=ra.ReactCurrentBatchConfig,xh=0,R=null,S=null,T=null,yh=!1,zh=!1;function Ah(){throw Error(y(321));}function Bh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Ch(a,b,c,d,e,f){xh=f;R=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;vh.current=null===a||null===a.memoizedState?Dh:Eh;a=c(d,e);if(zh){f=0;do{zh=!1;if(!(25>f))throw Error(y(301));f+=1;T=S=null;b.updateQueue=null;vh.current=Fh;a=c(d,e)}while(zh)}vh.current=Gh;b=null!==S&&null!==S.next;xh=0;T=S=R=null;yh=!1;if(b)throw Error(y(300));return a}function Hh(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===T?R.memoizedState=T=a:T=T.next=a;return T}
function Ih(){if(null===S){var a=R.alternate;a=null!==a?a.memoizedState:null}else a=S.next;var b=null===T?R.memoizedState:T.next;if(null!==b)T=b,S=a;else{if(null===a)throw Error(y(310));S=a;a={memoizedState:S.memoizedState,baseState:S.baseState,baseQueue:S.baseQueue,queue:S.queue,next:null};null===T?R.memoizedState=T=a:T=T.next=a}return T}function Jh(a,b){return"function"===typeof b?b(a):b}
function Kh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=S,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){e=e.next;d=d.baseState;var h=g=f=null,k=e;do{var l=k.lane;if((xh&l)===l)null!==h&&(h=h.next={lane:0,action:k.action,eagerReducer:k.eagerReducer,eagerState:k.eagerState,next:null}),d=k.eagerReducer===a?k.eagerState:a(d,k.action);else{var n={lane:l,action:k.action,eagerReducer:k.eagerReducer,
eagerState:k.eagerState,next:null};null===h?(g=h=n,f=d):h=h.next=n;R.lanes|=l;Dg|=l}k=k.next}while(null!==k&&k!==e);null===h?f=d:h.next=g;He(d,b.memoizedState)||(ug=!0);b.memoizedState=d;b.baseState=f;b.baseQueue=h;c.lastRenderedState=d}return[b.memoizedState,c.dispatch]}
function Lh(a){var b=Ih(),c=b.queue;if(null===c)throw Error(y(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}
function Mh(a,b,c){var d=b._getVersion;d=d(b._source);var e=b._workInProgressVersionPrimary;if(null!==e)a=e===d;else if(a=a.mutableReadLanes,a=(xh&a)===a)b._workInProgressVersionPrimary=d,th.push(b);if(a)return c(b._source);th.push(b);throw Error(y(350));}
function Nh(a,b,c,d){var e=U;if(null===e)throw Error(y(349));var f=b._getVersion,g=f(b._source),h=vh.current,k=h.useState(function(){return Mh(e,b,c)}),l=k[1],n=k[0];k=T;var A=a.memoizedState,p=A.refs,C=p.getSnapshot,x=A.source;A=A.subscribe;var w=R;a.memoizedState={refs:p,source:b,subscribe:d};h.useEffect(function(){p.getSnapshot=c;p.setSnapshot=l;var a=f(b._source);if(!He(g,a)){a=c(b._source);He(n,a)||(l(a),a=Ig(w),e.mutableReadLanes|=a&e.pendingLanes);a=e.mutableReadLanes;e.entangledLanes|=a;for(var d=
e.entanglements,h=a;0<h;){var k=31-Vc(h),v=1<<k;d[k]|=a;h&=~v}}},[c,b,d]);h.useEffect(function(){return d(b._source,function(){var a=p.getSnapshot,c=p.setSnapshot;try{c(a(b._source));var d=Ig(w);e.mutableReadLanes|=d&e.pendingLanes}catch(q){c(function(){throw q;})}})},[b,d]);He(C,c)&&He(x,b)&&He(A,d)||(a={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:n},a.dispatch=l=Oh.bind(null,R,a),k.queue=a,k.baseQueue=null,n=Mh(e,b,c),k.memoizedState=k.baseState=n);return n}
function Ph(a,b,c){var d=Ih();return Nh(d,a,b,c)}function Qh(a){var b=Hh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={pending:null,dispatch:null,lastRenderedReducer:Jh,lastRenderedState:a};a=a.dispatch=Oh.bind(null,R,a);return[b.memoizedState,a]}
function Rh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=R.updateQueue;null===b?(b={lastEffect:null},R.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function Sh(a){var b=Hh();a={current:a};return b.memoizedState=a}function Th(){return Ih().memoizedState}function Uh(a,b,c,d){var e=Hh();R.flags|=a;e.memoizedState=Rh(1|b,c,void 0,void 0===d?null:d)}
function Vh(a,b,c,d){var e=Ih();d=void 0===d?null:d;var f=void 0;if(null!==S){var g=S.memoizedState;f=g.destroy;if(null!==d&&Bh(d,g.deps)){Rh(b,c,f,d);return}}R.flags|=a;e.memoizedState=Rh(1|b,c,f,d)}function Wh(a,b){return Uh(516,4,a,b)}function Xh(a,b){return Vh(516,4,a,b)}function Yh(a,b){return Vh(4,2,a,b)}function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}
function $h(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,2,Zh.bind(null,b,a),c)}function ai(){}function bi(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}function ci(a,b){var c=Ih();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Bh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}
function di(a,b){var c=eg();gg(98>c?98:c,function(){a(!0)});gg(97<c?97:c,function(){var c=wh.transition;wh.transition=1;try{a(!1),b()}finally{wh.transition=c}})}
function Oh(a,b,c){var d=Hg(),e=Ig(a),f={lane:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.pending;null===g?f.next=f:(f.next=g.next,g.next=f);b.pending=f;g=a.alternate;if(a===R||null!==g&&g===R)zh=yh=!0;else{if(0===a.lanes&&(null===g||0===g.lanes)&&(g=b.lastRenderedReducer,null!==g))try{var h=b.lastRenderedState,k=g(h,c);f.eagerReducer=g;f.eagerState=k;if(He(k,h))return}catch(l){}finally{}Jg(a,e,d)}}
var Gh={readContext:vg,useCallback:Ah,useContext:Ah,useEffect:Ah,useImperativeHandle:Ah,useLayoutEffect:Ah,useMemo:Ah,useReducer:Ah,useRef:Ah,useState:Ah,useDebugValue:Ah,useDeferredValue:Ah,useTransition:Ah,useMutableSource:Ah,useOpaqueIdentifier:Ah,unstable_isNewReconciler:!1},Dh={readContext:vg,useCallback:function(a,b){Hh().memoizedState=[a,void 0===b?null:b];return a},useContext:vg,useEffect:Wh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Uh(4,2,Zh.bind(null,
b,a),c)},useLayoutEffect:function(a,b){return Uh(4,2,a,b)},useMemo:function(a,b){var c=Hh();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Hh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={pending:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Oh.bind(null,R,a);return[d.memoizedState,a]},useRef:Sh,useState:Qh,useDebugValue:ai,useDeferredValue:function(a){var b=Qh(a),c=b[0],d=b[1];Wh(function(){var b=wh.transition;
wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Qh(!1),b=a[0];a=di.bind(null,a[1]);Sh(a);return[a,b]},useMutableSource:function(a,b,c){var d=Hh();d.memoizedState={refs:{getSnapshot:b,setSnapshot:null},source:a,subscribe:c};return Nh(d,a,b,c)},useOpaqueIdentifier:function(){if(lh){var a=!1,b=uf(function(){a||(a=!0,c("r:"+(tf++).toString(36)));throw Error(y(355));}),c=Qh(b)[1];0===(R.mode&2)&&(R.flags|=516,Rh(5,function(){c("r:"+(tf++).toString(36))},
void 0,null));return b}b="r:"+(tf++).toString(36);Qh(b);return b},unstable_isNewReconciler:!1},Eh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Kh,useRef:Th,useState:function(){return Kh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Kh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Kh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Kh(Jh)[0]},unstable_isNewReconciler:!1},Fh={readContext:vg,useCallback:bi,useContext:vg,useEffect:Xh,useImperativeHandle:$h,useLayoutEffect:Yh,useMemo:ci,useReducer:Lh,useRef:Th,useState:function(){return Lh(Jh)},useDebugValue:ai,useDeferredValue:function(a){var b=Lh(Jh),c=b[0],d=b[1];Xh(function(){var b=wh.transition;wh.transition=1;try{d(a)}finally{wh.transition=b}},[a]);return c},useTransition:function(){var a=Lh(Jh)[0];return[Th().current,
a]},useMutableSource:Ph,useOpaqueIdentifier:function(){return Lh(Jh)[0]},unstable_isNewReconciler:!1},ei=ra.ReactCurrentOwner,ug=!1;function fi(a,b,c,d){b.child=null===a?Zg(b,null,c,d):Yg(b,a.child,c,d)}function gi(a,b,c,d,e){c=c.render;var f=b.ref;tg(b,e);d=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,d,e);return b.child}
function ii(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!ji(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ki(a,b,g,d,e,f);a=Vg(c.type,null,d,b,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(0===(e&f)&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:Je,c(e,d)&&a.ref===b.ref))return hi(a,b,f);b.flags|=1;a=Tg(g,d);a.ref=b.ref;a.return=b;return b.child=a}
function ki(a,b,c,d,e,f){if(null!==a&&Je(a.memoizedProps,d)&&a.ref===b.ref)if(ug=!1,0!==(f&e))0!==(a.flags&16384)&&(ug=!0);else return b.lanes=a.lanes,hi(a,b,f);return li(a,b,c,d,f)}
function mi(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode||"unstable-defer-without-hiding"===d.mode)if(0===(b.mode&4))b.memoizedState={baseLanes:0},ni(b,c);else if(0!==(c&1073741824))b.memoizedState={baseLanes:0},ni(b,null!==f?f.baseLanes:c);else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a},ni(b,a),null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):d=c,ni(b,d);fi(a,b,e,c);return b.child}
function oi(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=128}function li(a,b,c,d,e){var f=Ff(c)?Df:M.current;f=Ef(b,f);tg(b,e);c=Ch(a,b,c,d,f,e);if(null!==a&&!ug)return b.updateQueue=a.updateQueue,b.flags&=-517,a.lanes&=~e,hi(a,b,e);b.flags|=1;fi(a,b,c,e);return b.child}
function pi(a,b,c,d,e){if(Ff(c)){var f=!0;Jf(b)}else f=!1;tg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Mg(b,c,d),Og(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=vg(l):(l=Ff(c)?Df:M.current,l=Ef(b,l));var n=c.getDerivedStateFromProps,A="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;A||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ng(b,g,d,l);wg=!1;var p=b.memoizedState;g.state=p;Cg(b,d,g,e);k=b.memoizedState;h!==d||p!==k||N.current||wg?("function"===typeof n&&(Gg(b,c,n,d),k=b.memoizedState),(h=wg||Lg(b,c,h,d,p,k,l))?(A||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===
typeof g.componentDidMount&&(b.flags|=4)):("function"===typeof g.componentDidMount&&(b.flags|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4),d=!1)}else{g=b.stateNode;yg(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:lg(b.type,h);g.props=l;A=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=vg(k):(k=Ff(c)?Df:M.current,k=Ef(b,k));var C=c.getDerivedStateFromProps;(n="function"===typeof C||
"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==A||p!==k)&&Ng(b,g,d,k);wg=!1;p=b.memoizedState;g.state=p;Cg(b,d,g,e);var x=b.memoizedState;h!==A||p!==x||N.current||wg?("function"===typeof C&&(Gg(b,c,C,d),x=b.memoizedState),(l=wg||Lg(b,c,l,d,p,x,k))?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),b.memoizedProps=d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||
h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=256),d=!1)}return qi(a,b,c,d,f,e)}
function qi(a,b,c,d,e,f){oi(a,b);var g=0!==(b.flags&64);if(!d&&!g)return e&&Kf(b,c,!1),hi(a,b,f);d=b.stateNode;ei.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Yg(b,a.child,null,f),b.child=Yg(b,null,h,f)):fi(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function ri(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);eh(a,b.containerInfo)}
var si={dehydrated:null,retryLane:0};
function ti(a,b,c){var d=b.pendingProps,e=P.current,f=!1,g;(g=0!==(b.flags&64))||(g=null!==a&&null===a.memoizedState?!1:0!==(e&2));g?(f=!0,b.flags&=-65):null!==a&&null===a.memoizedState||void 0===d.fallback||!0===d.unstable_avoidThisFallback||(e|=1);I(P,e&1);if(null===a){void 0!==d.fallback&&ph(b);a=d.children;e=d.fallback;if(f)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},b.memoizedState=si,a;if("number"===typeof d.unstable_expectedLoadTime)return a=ui(b,a,e,c),b.child.memoizedState={baseLanes:c},
b.memoizedState=si,b.lanes=33554432,a;c=vi({mode:"visible",children:a},b.mode,c,null);c.return=b;return b.child=c}if(null!==a.memoizedState){if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=wi(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?{baseLanes:c}:
{baseLanes:e.baseLanes|c},f.childLanes=a.childLanes&~c,b.memoizedState=si,d;c=xi(a,b,d.children,c);b.memoizedState=null;return c}function ui(a,b,c,d){var e=a.mode,f=a.child;b={mode:"hidden",children:b};0===(e&2)&&null!==f?(f.childLanes=0,f.pendingProps=b):f=vi(b,e,0,null);c=Xg(c,e,d,null);f.return=a;c.return=a;f.sibling=c;a.child=f;return c}
function xi(a,b,c,d){var e=a.child;a=e.sibling;c=Tg(e,{mode:"visible",children:c});0===(b.mode&2)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(a.nextEffect=null,a.flags=8,b.firstEffect=b.lastEffect=a);return b.child=c}
function wi(a,b,c,d,e){var f=b.mode,g=a.child;a=g.sibling;var h={mode:"hidden",children:c};0===(f&2)&&b.child!==g?(c=b.child,c.childLanes=0,c.pendingProps=h,g=c.lastEffect,null!==g?(b.firstEffect=c.firstEffect,b.lastEffect=g,g.nextEffect=null):b.firstEffect=b.lastEffect=null):c=Tg(g,h);null!==a?d=Tg(a,d):(d=Xg(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function yi(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);sg(a.return,b)}
function zi(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.renderingStartTime=0,g.last=d,g.tail=c,g.tailMode=e,g.lastEffect=f)}
function Ai(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;fi(a,b,d.children,c);d=P.current;if(0!==(d&2))d=d&1|2,b.flags|=64;else{if(null!==a&&0!==(a.flags&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&yi(a,c);else if(19===a.tag)yi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(P,d);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ih(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);zi(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ih(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}zi(b,!0,c,null,f,b.lastEffect);break;case "together":zi(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function hi(a,b,c){null!==a&&(b.dependencies=a.dependencies);Dg|=b.lanes;if(0!==(c&b.childLanes)){if(null!==a&&b.child!==a.child)throw Error(y(153));if(null!==b.child){a=b.child;c=Tg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Tg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}return null}var Bi,Ci,Di,Ei;
Bi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ci=function(){};
Di=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;dh(ah.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "option":e=eb(a,e);d=eb(a,d);f=[];break;case "select":e=m({},e,{value:void 0});d=m({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=jf)}vb(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===
l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ca.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||
(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ca.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&G("scroll",a),f||h===k||(f=[])):"object"===typeof k&&null!==k&&k.$$typeof===Ga?k.toString():(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",
c);var l=f;if(b.updateQueue=l)b.flags|=4}};Ei=function(a,b,c,d){c!==d&&(b.flags|=4)};function Fi(a,b){if(!lh)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Gi(a,b,c){var d=b.pendingProps;switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return Ff(b.type)&&Gf(),null;case 3:fh();H(N);H(M);uh();d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)rh(b)?b.flags|=4:d.hydrate||(b.flags|=256);Ci(b);return null;case 5:hh(b);var e=dh(ch.current);c=b.type;if(null!==a&&null!=b.stateNode)Di(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=128);else{if(!d){if(null===
b.stateNode)throw Error(y(166));return null}a=dh(ah.current);if(rh(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[wf]=b;d[xf]=f;switch(c){case "dialog":G("cancel",d);G("close",d);break;case "iframe":case "object":case "embed":G("load",d);break;case "video":case "audio":for(a=0;a<Xe.length;a++)G(Xe[a],d);break;case "source":G("error",d);break;case "img":case "image":case "link":G("error",d);G("load",d);break;case "details":G("toggle",d);break;case "input":Za(d,f);G("invalid",d);break;case "select":d._wrapperState=
{wasMultiple:!!f.multiple};G("invalid",d);break;case "textarea":hb(d,f),G("invalid",d)}vb(c,f);a=null;for(var g in f)f.hasOwnProperty(g)&&(e=f[g],"children"===g?"string"===typeof e?d.textContent!==e&&(a=["children",e]):"number"===typeof e&&d.textContent!==""+e&&(a=["children",""+e]):ca.hasOwnProperty(g)&&null!=e&&"onScroll"===g&&G("scroll",d));switch(c){case "input":Va(d);cb(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=
jf)}d=a;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;a===kb.html&&(a=lb(c));a===kb.html?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[wf]=b;a[xf]=d;Bi(a,b,!1,!1);b.stateNode=a;g=wb(c,d);switch(c){case "dialog":G("cancel",a);G("close",a);
e=d;break;case "iframe":case "object":case "embed":G("load",a);e=d;break;case "video":case "audio":for(e=0;e<Xe.length;e++)G(Xe[e],a);e=d;break;case "source":G("error",a);e=d;break;case "img":case "image":case "link":G("error",a);G("load",a);e=d;break;case "details":G("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);G("invalid",a);break;case "option":e=eb(a,d);break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=m({},d,{value:void 0});G("invalid",a);break;case "textarea":hb(a,d);e=
gb(a,d);G("invalid",a);break;default:e=d}vb(c,e);var h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?tb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&ob(a,k)):"children"===f?"string"===typeof k?("textarea"!==c||""!==k)&&pb(a,k):"number"===typeof k&&pb(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ca.hasOwnProperty(f)?null!=k&&"onScroll"===f&&G("scroll",a):null!=k&&qa(a,f,k,g))}switch(c){case "input":Va(a);cb(a,d,!1);
break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,!0);break;default:"function"===typeof e.onClick&&(a.onclick=jf)}mf(c,d)&&(b.flags|=4)}null!==b.ref&&(b.flags|=128)}return null;case 6:if(a&&null!=b.stateNode)Ei(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(y(166));
c=dh(ch.current);dh(ah.current);rh(b)?(d=b.stateNode,c=b.memoizedProps,d[wf]=b,d.nodeValue!==c&&(b.flags|=4)):(d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[wf]=b,b.stateNode=d)}return null;case 13:H(P);d=b.memoizedState;if(0!==(b.flags&64))return b.lanes=c,b;d=null!==d;c=!1;null===a?void 0!==b.memoizedProps.fallback&&rh(b):c=null!==a.memoizedState;if(d&&!c&&0!==(b.mode&2))if(null===a&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(P.current&1))0===V&&(V=3);else{if(0===V||3===V)V=
4;null===U||0===(Dg&134217727)&&0===(Hi&134217727)||Ii(U,W)}if(d||c)b.flags|=4;return null;case 4:return fh(),Ci(b),null===a&&cf(b.stateNode.containerInfo),null;case 10:return rg(b),null;case 17:return Ff(b.type)&&Gf(),null;case 19:H(P);d=b.memoizedState;if(null===d)return null;f=0!==(b.flags&64);g=d.rendering;if(null===g)if(f)Fi(d,!1);else{if(0!==V||null!==a&&0!==(a.flags&64))for(a=b.child;null!==a;){g=ih(a);if(null!==g){b.flags|=64;Fi(d,!1);f=g.updateQueue;null!==f&&(b.updateQueue=f,b.flags|=4);
null===d.lastEffect&&(b.firstEffect=null);b.lastEffect=d.lastEffect;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,
f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;I(P,P.current&1|2);return b.child}a=a.sibling}null!==d.tail&&O()>Ji&&(b.flags|=64,f=!0,Fi(d,!1),b.lanes=33554432)}else{if(!f)if(a=ih(g),null!==a){if(b.flags|=64,f=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Fi(d,!0),null===d.tail&&"hidden"===d.tailMode&&!g.alternate&&!lh)return b=b.lastEffect=d.lastEffect,null!==b&&(b.nextEffect=null),null}else 2*O()-d.renderingStartTime>Ji&&1073741824!==c&&(b.flags|=
64,f=!0,Fi(d,!1),b.lanes=33554432);d.isBackwards?(g.sibling=b.child,b.child=g):(c=d.last,null!==c?c.sibling=g:b.child=g,d.last=g)}return null!==d.tail?(c=d.tail,d.rendering=c,d.tail=c.sibling,d.lastEffect=b.lastEffect,d.renderingStartTime=O(),c.sibling=null,b=P.current,I(P,f?b&1|2:b&1),c):null;case 23:case 24:return Ki(),null!==a&&null!==a.memoizedState!==(null!==b.memoizedState)&&"unstable-defer-without-hiding"!==d.mode&&(b.flags|=4),null}throw Error(y(156,b.tag));}
function Li(a){switch(a.tag){case 1:Ff(a.type)&&Gf();var b=a.flags;return b&4096?(a.flags=b&-4097|64,a):null;case 3:fh();H(N);H(M);uh();b=a.flags;if(0!==(b&64))throw Error(y(285));a.flags=b&-4097|64;return a;case 5:return hh(a),null;case 13:return H(P),b=a.flags,b&4096?(a.flags=b&-4097|64,a):null;case 19:return H(P),null;case 4:return fh(),null;case 10:return rg(a),null;case 23:case 24:return Ki(),null;default:return null}}
function Mi(a,b){try{var c="",d=b;do c+=Qa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e}}function Ni(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Oi="function"===typeof WeakMap?WeakMap:Map;function Pi(a,b,c){c=zg(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Qi||(Qi=!0,Ri=d);Ni(a,b)};return c}
function Si(a,b,c){c=zg(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Ni(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Ti?Ti=new Set([this]):Ti.add(this),Ni(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}var Ui="function"===typeof WeakSet?WeakSet:Set;
function Vi(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Wi(a,c)}else b.current=null}function Xi(a,b){switch(b.tag){case 0:case 11:case 15:case 22:return;case 1:if(b.flags&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:lg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}return;case 3:b.flags&256&&qf(b.stateNode.containerInfo);return;case 5:case 6:case 4:case 17:return}throw Error(y(163));}
function Yi(a,b,c){switch(c.tag){case 0:case 11:case 15:case 22:b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{if(3===(a.tag&3)){var d=a.create;a.destroy=d()}a=a.next}while(a!==b)}b=c.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){a=b=b.next;do{var e=a;d=e.next;e=e.tag;0!==(e&4)&&0!==(e&1)&&(Zi(c,a),$i(c,a));a=d}while(a!==b)}return;case 1:a=c.stateNode;c.flags&4&&(null===b?a.componentDidMount():(d=c.elementType===c.type?b.memoizedProps:lg(c.type,b.memoizedProps),a.componentDidUpdate(d,
b.memoizedState,a.__reactInternalSnapshotBeforeUpdate)));b=c.updateQueue;null!==b&&Eg(c,b,a);return;case 3:b=c.updateQueue;if(null!==b){a=null;if(null!==c.child)switch(c.child.tag){case 5:a=c.child.stateNode;break;case 1:a=c.child.stateNode}Eg(c,b,a)}return;case 5:a=c.stateNode;null===b&&c.flags&4&&mf(c.type,c.memoizedProps)&&a.focus();return;case 6:return;case 4:return;case 12:return;case 13:null===c.memoizedState&&(c=c.alternate,null!==c&&(c=c.memoizedState,null!==c&&(c=c.dehydrated,null!==c&&Cc(c))));
return;case 19:case 17:case 20:case 21:case 23:case 24:return}throw Error(y(163));}
function aj(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d=d.style,"function"===typeof d.setProperty?d.setProperty("display","none","important"):d.display="none";else{d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=sb("display",e)}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if((23!==c.tag&&24!==c.tag||null===c.memoizedState||c===a)&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===
a)break;for(;null===c.sibling;){if(null===c.return||c.return===a)return;c=c.return}c.sibling.return=c.return;c=c.sibling}}
function bj(a,b){if(Mf&&"function"===typeof Mf.onCommitFiberUnmount)try{Mf.onCommitFiberUnmount(Lf,b)}catch(f){}switch(b.tag){case 0:case 11:case 14:case 15:case 22:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var c=a=a.next;do{var d=c,e=d.destroy;d=d.tag;if(void 0!==e)if(0!==(d&4))Zi(b,c);else{d=b;try{e()}catch(f){Wi(d,f)}}c=c.next}while(c!==a)}break;case 1:Vi(b);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount()}catch(f){Wi(b,
f)}break;case 5:Vi(b);break;case 4:cj(a,b)}}function dj(a){a.alternate=null;a.child=null;a.dependencies=null;a.firstEffect=null;a.lastEffect=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.return=null;a.updateQueue=null}function ej(a){return 5===a.tag||3===a.tag||4===a.tag}
function fj(a){a:{for(var b=a.return;null!==b;){if(ej(b))break a;b=b.return}throw Error(y(160));}var c=b;b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(y(161));}c.flags&16&&(pb(b,""),c.flags&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||ej(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.flags&2)continue b;if(null===
c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.flags&2)){c=c.stateNode;break a}}d?gj(a,c,b):hj(a,c,b)}
function gj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=jf));else if(4!==d&&(a=a.child,null!==a))for(gj(a,b,c),a=a.sibling;null!==a;)gj(a,b,c),a=a.sibling}
function hj(a,b,c){var d=a.tag,e=5===d||6===d;if(e)a=e?a.stateNode:a.stateNode.instance,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(hj(a,b,c),a=a.sibling;null!==a;)hj(a,b,c),a=a.sibling}
function cj(a,b){for(var c=b,d=!1,e,f;;){if(!d){d=c.return;a:for(;;){if(null===d)throw Error(y(160));e=d.stateNode;switch(d.tag){case 5:f=!1;break a;case 3:e=e.containerInfo;f=!0;break a;case 4:e=e.containerInfo;f=!0;break a}d=d.return}d=!0}if(5===c.tag||6===c.tag){a:for(var g=a,h=c,k=h;;)if(bj(g,k),null!==k.child&&4!==k.tag)k.child.return=k,k=k.child;else{if(k===h)break a;for(;null===k.sibling;){if(null===k.return||k.return===h)break a;k=k.return}k.sibling.return=k.return;k=k.sibling}f?(g=e,h=c.stateNode,
8===g.nodeType?g.parentNode.removeChild(h):g.removeChild(h)):e.removeChild(c.stateNode)}else if(4===c.tag){if(null!==c.child){e=c.stateNode.containerInfo;f=!0;c.child.return=c;c=c.child;continue}}else if(bj(a,c),null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;4===c.tag&&(d=!1)}c.sibling.return=c.return;c=c.sibling}}
function ij(a,b){switch(b.tag){case 0:case 11:case 14:case 15:case 22:var c=b.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do 3===(d.tag&3)&&(a=d.destroy,d.destroy=void 0,void 0!==a&&a()),d=d.next;while(d!==c)}return;case 1:return;case 5:c=b.stateNode;if(null!=c){d=b.memoizedProps;var e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[xf]=d;"input"===a&&"radio"===d.type&&null!=d.name&&$a(c,d);wb(a,e);b=wb(a,d);for(e=0;e<f.length;e+=
2){var g=f[e],h=f[e+1];"style"===g?tb(c,h):"dangerouslySetInnerHTML"===g?ob(c,h):"children"===g?pb(c,h):qa(c,g,h,b)}switch(a){case "input":ab(c,d);break;case "textarea":ib(c,d);break;case "select":a=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,f=d.value,null!=f?fb(c,!!d.multiple,f,!1):a!==!!d.multiple&&(null!=d.defaultValue?fb(c,!!d.multiple,d.defaultValue,!0):fb(c,!!d.multiple,d.multiple?[]:"",!1))}}}return;case 6:if(null===b.stateNode)throw Error(y(162));b.stateNode.nodeValue=
b.memoizedProps;return;case 3:c=b.stateNode;c.hydrate&&(c.hydrate=!1,Cc(c.containerInfo));return;case 12:return;case 13:null!==b.memoizedState&&(jj=O(),aj(b.child,!0));kj(b);return;case 19:kj(b);return;case 17:return;case 23:case 24:aj(b,null!==b.memoizedState);return}throw Error(y(163));}function kj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ui);b.forEach(function(b){var d=lj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function mj(a,b){return null!==a&&(a=a.memoizedState,null===a||null!==a.dehydrated)?(b=b.memoizedState,null!==b&&null===b.dehydrated):!1}var nj=Math.ceil,oj=ra.ReactCurrentDispatcher,pj=ra.ReactCurrentOwner,X=0,U=null,Y=null,W=0,qj=0,rj=Bf(0),V=0,sj=null,tj=0,Dg=0,Hi=0,uj=0,vj=null,jj=0,Ji=Infinity;function wj(){Ji=O()+500}var Z=null,Qi=!1,Ri=null,Ti=null,xj=!1,yj=null,zj=90,Aj=[],Bj=[],Cj=null,Dj=0,Ej=null,Fj=-1,Gj=0,Hj=0,Ij=null,Jj=!1;function Hg(){return 0!==(X&48)?O():-1!==Fj?Fj:Fj=O()}
function Ig(a){a=a.mode;if(0===(a&2))return 1;if(0===(a&4))return 99===eg()?1:2;0===Gj&&(Gj=tj);if(0!==kg.transition){0!==Hj&&(Hj=null!==vj?vj.pendingLanes:0);a=Gj;var b=4186112&~Hj;b&=-b;0===b&&(a=4186112&~a,b=a&-a,0===b&&(b=8192));return b}a=eg();0!==(X&4)&&98===a?a=Xc(12,Gj):(a=Sc(a),a=Xc(a,Gj));return a}
function Jg(a,b,c){if(50<Dj)throw Dj=0,Ej=null,Error(y(185));a=Kj(a,b);if(null===a)return null;$c(a,b,c);a===U&&(Hi|=b,4===V&&Ii(a,W));var d=eg();1===b?0!==(X&8)&&0===(X&48)?Lj(a):(Mj(a,c),0===X&&(wj(),ig())):(0===(X&4)||98!==d&&99!==d||(null===Cj?Cj=new Set([a]):Cj.add(a)),Mj(a,c));vj=a}function Kj(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
function Mj(a,b){for(var c=a.callbackNode,d=a.suspendedLanes,e=a.pingedLanes,f=a.expirationTimes,g=a.pendingLanes;0<g;){var h=31-Vc(g),k=1<<h,l=f[h];if(-1===l){if(0===(k&d)||0!==(k&e)){l=b;Rc(k);var n=F;f[h]=10<=n?l+250:6<=n?l+5E3:-1}}else l<=b&&(a.expiredLanes|=k);g&=~k}d=Uc(a,a===U?W:0);b=F;if(0===d)null!==c&&(c!==Zf&&Pf(c),a.callbackNode=null,a.callbackPriority=0);else{if(null!==c){if(a.callbackPriority===b)return;c!==Zf&&Pf(c)}15===b?(c=Lj.bind(null,a),null===ag?(ag=[c],bg=Of(Uf,jg)):ag.push(c),
c=Zf):14===b?c=hg(99,Lj.bind(null,a)):(c=Tc(b),c=hg(c,Nj.bind(null,a)));a.callbackPriority=b;a.callbackNode=c}}
function Nj(a){Fj=-1;Hj=Gj=0;if(0!==(X&48))throw Error(y(327));var b=a.callbackNode;if(Oj()&&a.callbackNode!==b)return null;var c=Uc(a,a===U?W:0);if(0===c)return null;var d=c;var e=X;X|=16;var f=Pj();if(U!==a||W!==d)wj(),Qj(a,d);do try{Rj();break}catch(h){Sj(a,h)}while(1);qg();oj.current=f;X=e;null!==Y?d=0:(U=null,W=0,d=V);if(0!==(tj&Hi))Qj(a,0);else if(0!==d){2===d&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),c=Wc(a),0!==c&&(d=Tj(a,c)));if(1===d)throw b=sj,Qj(a,0),Ii(a,c),Mj(a,O()),b;a.finishedWork=
a.current.alternate;a.finishedLanes=c;switch(d){case 0:case 1:throw Error(y(345));case 2:Uj(a);break;case 3:Ii(a,c);if((c&62914560)===c&&(d=jj+500-O(),10<d)){if(0!==Uc(a,0))break;e=a.suspendedLanes;if((e&c)!==c){Hg();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=of(Uj.bind(null,a),d);break}Uj(a);break;case 4:Ii(a,c);if((c&4186112)===c)break;d=a.eventTimes;for(e=-1;0<c;){var g=31-Vc(c);f=1<<g;g=d[g];g>e&&(e=g);c&=~f}c=e;c=O()-c;c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3E3>c?3E3:4320>
c?4320:1960*nj(c/1960))-c;if(10<c){a.timeoutHandle=of(Uj.bind(null,a),c);break}Uj(a);break;case 5:Uj(a);break;default:throw Error(y(329));}}Mj(a,O());return a.callbackNode===b?Nj.bind(null,a):null}function Ii(a,b){b&=~uj;b&=~Hi;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-Vc(b),d=1<<c;a[c]=-1;b&=~d}}
function Lj(a){if(0!==(X&48))throw Error(y(327));Oj();if(a===U&&0!==(a.expiredLanes&W)){var b=W;var c=Tj(a,b);0!==(tj&Hi)&&(b=Uc(a,b),c=Tj(a,b))}else b=Uc(a,0),c=Tj(a,b);0!==a.tag&&2===c&&(X|=64,a.hydrate&&(a.hydrate=!1,qf(a.containerInfo)),b=Wc(a),0!==b&&(c=Tj(a,b)));if(1===c)throw c=sj,Qj(a,0),Ii(a,b),Mj(a,O()),c;a.finishedWork=a.current.alternate;a.finishedLanes=b;Uj(a);Mj(a,O());return null}
function Vj(){if(null!==Cj){var a=Cj;Cj=null;a.forEach(function(a){a.expiredLanes|=24&a.pendingLanes;Mj(a,O())})}ig()}function Wj(a,b){var c=X;X|=1;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function Xj(a,b){var c=X;X&=-2;X|=8;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}}function ni(a,b){I(rj,qj);qj|=b;tj|=b}function Ki(){qj=rj.current;H(rj)}
function Qj(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,pf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&Gf();break;case 3:fh();H(N);H(M);uh();break;case 5:hh(d);break;case 4:fh();break;case 13:H(P);break;case 19:H(P);break;case 10:rg(d);break;case 23:case 24:Ki()}c=c.return}U=a;Y=Tg(a.current,null);W=qj=tj=b;V=0;sj=null;uj=Hi=Dg=0}
function Sj(a,b){do{var c=Y;try{qg();vh.current=Gh;if(yh){for(var d=R.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}yh=!1}xh=0;T=S=R=null;zh=!1;pj.current=null;if(null===c||null===c.return){V=1;sj=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=W;h.flags|=2048;h.firstEffect=h.lastEffect=null;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k;if(0===(h.mode&2)){var n=h.alternate;n?(h.updateQueue=n.updateQueue,h.memoizedState=n.memoizedState,h.lanes=n.lanes):
(h.updateQueue=null,h.memoizedState=null)}var A=0!==(P.current&1),p=g;do{var C;if(C=13===p.tag){var x=p.memoizedState;if(null!==x)C=null!==x.dehydrated?!0:!1;else{var w=p.memoizedProps;C=void 0===w.fallback?!1:!0!==w.unstable_avoidThisFallback?!0:A?!1:!0}}if(C){var z=p.updateQueue;if(null===z){var u=new Set;u.add(l);p.updateQueue=u}else z.add(l);if(0===(p.mode&2)){p.flags|=64;h.flags|=16384;h.flags&=-2981;if(1===h.tag)if(null===h.alternate)h.tag=17;else{var t=zg(-1,1);t.tag=2;Ag(h,t)}h.lanes|=1;break a}k=
void 0;h=b;var q=f.pingCache;null===q?(q=f.pingCache=new Oi,k=new Set,q.set(l,k)):(k=q.get(l),void 0===k&&(k=new Set,q.set(l,k)));if(!k.has(h)){k.add(h);var v=Yj.bind(null,f,l,h);l.then(v,v)}p.flags|=4096;p.lanes=b;break a}p=p.return}while(null!==p);k=Error((Ra(h.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==V&&(V=2);k=Mi(k,h);p=
g;do{switch(p.tag){case 3:f=k;p.flags|=4096;b&=-b;p.lanes|=b;var J=Pi(p,f,b);Bg(p,J);break a;case 1:f=k;var K=p.type,Q=p.stateNode;if(0===(p.flags&64)&&("function"===typeof K.getDerivedStateFromError||null!==Q&&"function"===typeof Q.componentDidCatch&&(null===Ti||!Ti.has(Q)))){p.flags|=4096;b&=-b;p.lanes|=b;var L=Si(p,f,b);Bg(p,L);break a}}p=p.return}while(null!==p)}Zj(c)}catch(va){b=va;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}
function Pj(){var a=oj.current;oj.current=Gh;return null===a?Gh:a}function Tj(a,b){var c=X;X|=16;var d=Pj();U===a&&W===b||Qj(a,b);do try{ak();break}catch(e){Sj(a,e)}while(1);qg();X=c;oj.current=d;if(null!==Y)throw Error(y(261));U=null;W=0;return V}function ak(){for(;null!==Y;)bk(Y)}function Rj(){for(;null!==Y&&!Qf();)bk(Y)}function bk(a){var b=ck(a.alternate,a,qj);a.memoizedProps=a.pendingProps;null===b?Zj(a):Y=b;pj.current=null}
function Zj(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&2048)){c=Gi(c,b,qj);if(null!==c){Y=c;return}c=b;if(24!==c.tag&&23!==c.tag||null===c.memoizedState||0!==(qj&1073741824)||0===(c.mode&4)){for(var d=0,e=c.child;null!==e;)d|=e.lanes|e.childLanes,e=e.sibling;c.childLanes=d}null!==a&&0===(a.flags&2048)&&(null===a.firstEffect&&(a.firstEffect=b.firstEffect),null!==b.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=b.firstEffect),a.lastEffect=b.lastEffect),1<b.flags&&(null!==
a.lastEffect?a.lastEffect.nextEffect=b:a.firstEffect=b,a.lastEffect=b))}else{c=Li(b);if(null!==c){c.flags&=2047;Y=c;return}null!==a&&(a.firstEffect=a.lastEffect=null,a.flags|=2048)}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===V&&(V=5)}function Uj(a){var b=eg();gg(99,dk.bind(null,a,b));return null}
function dk(a,b){do Oj();while(null!==yj);if(0!==(X&48))throw Error(y(327));var c=a.finishedWork;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(y(177));a.callbackNode=null;var d=c.lanes|c.childLanes,e=d,f=a.pendingLanes&~e;a.pendingLanes=e;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=e;a.mutableReadLanes&=e;a.entangledLanes&=e;e=a.entanglements;for(var g=a.eventTimes,h=a.expirationTimes;0<f;){var k=31-Vc(f),l=1<<k;e[k]=0;g[k]=-1;h[k]=-1;f&=~l}null!==
Cj&&0===(d&24)&&Cj.has(a)&&Cj.delete(a);a===U&&(Y=U=null,W=0);1<c.flags?null!==c.lastEffect?(c.lastEffect.nextEffect=c,d=c.firstEffect):d=c:d=c.firstEffect;if(null!==d){e=X;X|=32;pj.current=null;kf=fd;g=Ne();if(Oe(g)){if("selectionStart"in g)h={start:g.selectionStart,end:g.selectionEnd};else a:if(h=(h=g.ownerDocument)&&h.defaultView||window,(l=h.getSelection&&h.getSelection())&&0!==l.rangeCount){h=l.anchorNode;f=l.anchorOffset;k=l.focusNode;l=l.focusOffset;try{h.nodeType,k.nodeType}catch(va){h=null;
break a}var n=0,A=-1,p=-1,C=0,x=0,w=g,z=null;b:for(;;){for(var u;;){w!==h||0!==f&&3!==w.nodeType||(A=n+f);w!==k||0!==l&&3!==w.nodeType||(p=n+l);3===w.nodeType&&(n+=w.nodeValue.length);if(null===(u=w.firstChild))break;z=w;w=u}for(;;){if(w===g)break b;z===h&&++C===f&&(A=n);z===k&&++x===l&&(p=n);if(null!==(u=w.nextSibling))break;w=z;z=w.parentNode}w=u}h=-1===A||-1===p?null:{start:A,end:p}}else h=null;h=h||{start:0,end:0}}else h=null;lf={focusedElem:g,selectionRange:h};fd=!1;Ij=null;Jj=!1;Z=d;do try{ek()}catch(va){if(null===
Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Ij=null;Z=d;do try{for(g=a;null!==Z;){var t=Z.flags;t&16&&pb(Z.stateNode,"");if(t&128){var q=Z.alternate;if(null!==q){var v=q.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(t&1038){case 2:fj(Z);Z.flags&=-3;break;case 6:fj(Z);Z.flags&=-3;ij(Z.alternate,Z);break;case 1024:Z.flags&=-1025;break;case 1028:Z.flags&=-1025;ij(Z.alternate,Z);break;case 4:ij(Z.alternate,Z);break;case 8:h=Z;cj(g,h);var J=h.alternate;dj(h);null!==
J&&dj(J)}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);v=lf;q=Ne();t=v.focusedElem;g=v.selectionRange;if(q!==t&&t&&t.ownerDocument&&Me(t.ownerDocument.documentElement,t)){null!==g&&Oe(t)&&(q=g.start,v=g.end,void 0===v&&(v=q),"selectionStart"in t?(t.selectionStart=q,t.selectionEnd=Math.min(v,t.value.length)):(v=(q=t.ownerDocument||document)&&q.defaultView||window,v.getSelection&&(v=v.getSelection(),h=t.textContent.length,J=Math.min(g.start,h),g=void 0===
g.end?J:Math.min(g.end,h),!v.extend&&J>g&&(h=g,g=J,J=h),h=Le(t,J),f=Le(t,g),h&&f&&(1!==v.rangeCount||v.anchorNode!==h.node||v.anchorOffset!==h.offset||v.focusNode!==f.node||v.focusOffset!==f.offset)&&(q=q.createRange(),q.setStart(h.node,h.offset),v.removeAllRanges(),J>g?(v.addRange(q),v.extend(f.node,f.offset)):(q.setEnd(f.node,f.offset),v.addRange(q))))));q=[];for(v=t;v=v.parentNode;)1===v.nodeType&&q.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===typeof t.focus&&t.focus();for(t=
0;t<q.length;t++)v=q[t],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}fd=!!kf;lf=kf=null;a.current=c;Z=d;do try{for(t=a;null!==Z;){var K=Z.flags;K&36&&Yi(t,Z.alternate,Z);if(K&128){q=void 0;var Q=Z.ref;if(null!==Q){var L=Z.stateNode;switch(Z.tag){case 5:q=L;break;default:q=L}"function"===typeof Q?Q(q):Q.current=q}}Z=Z.nextEffect}}catch(va){if(null===Z)throw Error(y(330));Wi(Z,va);Z=Z.nextEffect}while(null!==Z);Z=null;$f();X=e}else a.current=c;if(xj)xj=!1,yj=a,zj=b;else for(Z=d;null!==Z;)b=
Z.nextEffect,Z.nextEffect=null,Z.flags&8&&(K=Z,K.sibling=null,K.stateNode=null),Z=b;d=a.pendingLanes;0===d&&(Ti=null);1===d?a===Ej?Dj++:(Dj=0,Ej=a):Dj=0;c=c.stateNode;if(Mf&&"function"===typeof Mf.onCommitFiberRoot)try{Mf.onCommitFiberRoot(Lf,c,void 0,64===(c.current.flags&64))}catch(va){}Mj(a,O());if(Qi)throw Qi=!1,a=Ri,Ri=null,a;if(0!==(X&8))return null;ig();return null}
function ek(){for(;null!==Z;){var a=Z.alternate;Jj||null===Ij||(0!==(Z.flags&8)?dc(Z,Ij)&&(Jj=!0):13===Z.tag&&mj(a,Z)&&dc(Z,Ij)&&(Jj=!0));var b=Z.flags;0!==(b&256)&&Xi(a,Z);0===(b&512)||xj||(xj=!0,hg(97,function(){Oj();return null}));Z=Z.nextEffect}}function Oj(){if(90!==zj){var a=97<zj?97:zj;zj=90;return gg(a,fk)}return!1}function $i(a,b){Aj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}function Zi(a,b){Bj.push(b,a);xj||(xj=!0,hg(97,function(){Oj();return null}))}
function fk(){if(null===yj)return!1;var a=yj;yj=null;if(0!==(X&48))throw Error(y(331));var b=X;X|=32;var c=Bj;Bj=[];for(var d=0;d<c.length;d+=2){var e=c[d],f=c[d+1],g=e.destroy;e.destroy=void 0;if("function"===typeof g)try{g()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}c=Aj;Aj=[];for(d=0;d<c.length;d+=2){e=c[d];f=c[d+1];try{var h=e.create;e.destroy=h()}catch(k){if(null===f)throw Error(y(330));Wi(f,k)}}for(h=a.current.firstEffect;null!==h;)a=h.nextEffect,h.nextEffect=null,h.flags&8&&(h.sibling=
null,h.stateNode=null),h=a;X=b;ig();return!0}function gk(a,b,c){b=Mi(c,b);b=Pi(a,b,1);Ag(a,b);b=Hg();a=Kj(a,1);null!==a&&($c(a,1,b),Mj(a,b))}
function Wi(a,b){if(3===a.tag)gk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){gk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d))){a=Mi(b,a);var e=Si(c,a,1);Ag(c,e);e=Hg();c=Kj(c,1);if(null!==c)$c(c,1,e),Mj(c,e);else if("function"===typeof d.componentDidCatch&&(null===Ti||!Ti.has(d)))try{d.componentDidCatch(b,a)}catch(f){}break}}c=c.return}}
function Yj(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=Hg();a.pingedLanes|=a.suspendedLanes&c;U===a&&(W&c)===c&&(4===V||3===V&&(W&62914560)===W&&500>O()-jj?Qj(a,0):uj|=c);Mj(a,b)}function lj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=a.mode,0===(b&2)?b=1:0===(b&4)?b=99===eg()?1:2:(0===Gj&&(Gj=tj),b=Yc(62914560&~Gj),0===b&&(b=4194304)));c=Hg();a=Kj(a,b);null!==a&&($c(a,b,c),Mj(a,c))}var ck;
ck=function(a,b,c){var d=b.lanes;if(null!==a)if(a.memoizedProps!==b.pendingProps||N.current)ug=!0;else if(0!==(c&d))ug=0!==(a.flags&16384)?!0:!1;else{ug=!1;switch(b.tag){case 3:ri(b);sh();break;case 5:gh(b);break;case 1:Ff(b.type)&&Jf(b);break;case 4:eh(b,b.stateNode.containerInfo);break;case 10:d=b.memoizedProps.value;var e=b.type._context;I(mg,e._currentValue);e._currentValue=d;break;case 13:if(null!==b.memoizedState){if(0!==(c&b.child.childLanes))return ti(a,b,c);I(P,P.current&1);b=hi(a,b,c);return null!==
b?b.sibling:null}I(P,P.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&64)){if(d)return Ai(a,b,c);b.flags|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);I(P,P.current);if(d)break;else return null;case 23:case 24:return b.lanes=0,mi(a,b,c)}return hi(a,b,c)}else ug=!1;b.lanes=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=Ef(b,M.current);tg(b,c);e=Ch(null,b,d,a,e,c);b.flags|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;b.memoizedState=null;b.updateQueue=null;if(Ff(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;xg(b);var g=d.getDerivedStateFromProps;"function"===typeof g&&Gg(b,d,g,a);e.updater=Kg;b.stateNode=e;e._reactInternals=b;Og(b,d,a,c);b=qi(null,b,d,!0,f,c)}else b.tag=0,fi(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);
a=b.pendingProps;f=e._init;e=f(e._payload);b.type=e;f=b.tag=hk(e);a=lg(e,a);switch(f){case 0:b=li(null,b,e,a,c);break a;case 1:b=pi(null,b,e,a,c);break a;case 11:b=gi(null,b,e,a,c);break a;case 14:b=ii(null,b,e,lg(e.type,a),d,c);break a}throw Error(y(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),li(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),pi(a,b,d,e,c);case 3:ri(b);d=b.updateQueue;if(null===a||null===d)throw Error(y(282));
d=b.pendingProps;e=b.memoizedState;e=null!==e?e.element:null;yg(a,b);Cg(b,d,null,c);d=b.memoizedState.element;if(d===e)sh(),b=hi(a,b,c);else{e=b.stateNode;if(f=e.hydrate)kh=rf(b.stateNode.containerInfo.firstChild),jh=b,f=lh=!0;if(f){a=e.mutableSourceEagerHydrationData;if(null!=a)for(e=0;e<a.length;e+=2)f=a[e],f._workInProgressVersionPrimary=a[e+1],th.push(f);c=Zg(b,null,d,c);for(b.child=c;c;)c.flags=c.flags&-3|1024,c=c.sibling}else fi(a,b,d,c),sh();b=b.child}return b;case 5:return gh(b),null===a&&
ph(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,nf(d,e)?g=null:null!==f&&nf(d,f)&&(b.flags|=16),oi(a,b),fi(a,b,g,c),b.child;case 6:return null===a&&ph(b),null;case 13:return ti(a,b,c);case 4:return eh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Yg(b,null,d,c):fi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),gi(a,b,d,e,c);case 7:return fi(a,b,b.pendingProps,c),b.child;case 8:return fi(a,b,b.pendingProps.children,
c),b.child;case 12:return fi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;var h=b.type._context;I(mg,h._currentValue);h._currentValue=f;if(null!==g)if(h=g.value,f=He(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0,0===f){if(g.children===e.children&&!N.current){b=hi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=
k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=zg(-1,c&-c),l.tag=2,Ag(h,l));h.lanes|=c;l=h.alternate;null!==l&&(l.lanes|=c);sg(h.return,c);k.lanes|=c;break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}fi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,tg(b,c),e=vg(e,
f.unstable_observedBits),d=d(e),b.flags|=1,fi(a,b,d,c),b.child;case 14:return e=b.type,f=lg(e,b.pendingProps),f=lg(e.type,f),ii(a,b,e,f,d,c);case 15:return ki(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:lg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,Ff(d)?(a=!0,Jf(b)):a=!1,tg(b,c),Mg(b,d,e),Og(b,d,e,c),qi(null,b,d,!0,a,c);case 19:return Ai(a,b,c);case 23:return mi(a,b,c);case 24:return mi(a,b,c)}throw Error(y(156,b.tag));
};function ik(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.flags=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childLanes=this.lanes=0;this.alternate=null}function nh(a,b,c,d){return new ik(a,b,c,d)}function ji(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function hk(a){if("function"===typeof a)return ji(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Aa)return 11;if(a===Da)return 14}return 2}
function Tg(a,b){var c=a.alternate;null===c?(c=nh(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Vg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ji(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ua:return Xg(c.children,e,f,b);case Ha:g=8;e|=16;break;case wa:g=8;e|=1;break;case xa:return a=nh(12,c,b,e|8),a.elementType=xa,a.type=xa,a.lanes=f,a;case Ba:return a=nh(13,c,b,e),a.type=Ba,a.elementType=Ba,a.lanes=f,a;case Ca:return a=nh(19,c,b,e),a.elementType=Ca,a.lanes=f,a;case Ia:return vi(c,e,f,b);case Ja:return a=nh(24,c,b,e),a.elementType=Ja,a.lanes=f,a;default:if("object"===
typeof a&&null!==a)switch(a.$$typeof){case ya:g=10;break a;case za:g=9;break a;case Aa:g=11;break a;case Da:g=14;break a;case Ea:g=16;d=null;break a;case Fa:g=22;break a}throw Error(y(130,null==a?a:typeof a,""));}b=nh(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Xg(a,b,c,d){a=nh(7,a,d,b);a.lanes=c;return a}function vi(a,b,c,d){a=nh(23,a,d,b);a.elementType=Ia;a.lanes=c;return a}function Ug(a,b,c){a=nh(6,a,null,b);a.lanes=c;return a}
function Wg(a,b,c){b=nh(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function jk(a,b,c){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=0;this.eventTimes=Zc(0);this.expirationTimes=Zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Zc(0);this.mutableSourceEagerHydrationData=null}
function kk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:ta,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function lk(a,b,c,d){var e=b.current,f=Hg(),g=Ig(e);a:if(c){c=c._reactInternals;b:{if(Zb(c)!==c||1!==c.tag)throw Error(y(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(Ff(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(y(171));}if(1===c.tag){var k=c.type;if(Ff(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=zg(f,g);b.payload={element:a};d=void 0===d?null:d;null!==
d&&(b.callback=d);Ag(e,b);Jg(e,g,f);return g}function mk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function nk(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function ok(a,b){nk(a,b);(a=a.alternate)&&nk(a,b)}function pk(){return null}
function qk(a,b,c){var d=null!=c&&null!=c.hydrationOptions&&c.hydrationOptions.mutableSources||null;c=new jk(a,b,null!=c&&!0===c.hydrate);b=nh(3,null,null,2===b?7:1===b?3:0);c.current=b;b.stateNode=c;xg(b);a[ff]=c.current;cf(8===a.nodeType?a.parentNode:a);if(d)for(a=0;a<d.length;a++){b=d[a];var e=b._getVersion;e=e(b._source);null==c.mutableSourceEagerHydrationData?c.mutableSourceEagerHydrationData=[b,e]:c.mutableSourceEagerHydrationData.push(b,e)}this._internalRoot=c}
qk.prototype.render=function(a){lk(a,this._internalRoot,null,null)};qk.prototype.unmount=function(){var a=this._internalRoot,b=a.containerInfo;lk(null,a,null,function(){b[ff]=null})};function rk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}
function sk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qk(a,0,b?{hydrate:!0}:void 0)}
function tk(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=mk(g);h.call(a)}}lk(b,g,a,e)}else{f=c._reactRootContainer=sk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=mk(g);k.call(a)}}Xj(function(){lk(b,g,a,e)})}return mk(g)}ec=function(a){if(13===a.tag){var b=Hg();Jg(a,4,b);ok(a,4)}};fc=function(a){if(13===a.tag){var b=Hg();Jg(a,67108864,b);ok(a,67108864)}};
gc=function(a){if(13===a.tag){var b=Hg(),c=Ig(a);Jg(a,c,b);ok(a,c)}};hc=function(a,b){return b()};
yb=function(a,b,c){switch(b){case "input":ab(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(y(90));Wa(d);ab(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Wj;
Hb=function(a,b,c,d,e){var f=X;X|=4;try{return gg(98,a.bind(null,b,c,d,e))}finally{X=f,0===X&&(wj(),ig())}};Ib=function(){0===(X&49)&&(Vj(),Oj())};Jb=function(a,b){var c=X;X|=2;try{return a(b)}finally{X=c,0===X&&(wj(),ig())}};function uk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!rk(b))throw Error(y(200));return kk(a,b,null,c)}var vk={Events:[Cb,ue,Db,Eb,Fb,Oj,{current:!1}]},wk={findFiberByHostInstance:wc,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"};
var xk={bundleType:wk.bundleType,version:wk.version,rendererPackageName:wk.rendererPackageName,rendererConfig:wk.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ra.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=cc(a);return null===a?null:a.stateNode},findFiberByHostInstance:wk.findFiberByHostInstance||
pk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var yk=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yk.isDisabled&&yk.supportsFiber)try{Lf=yk.inject(xk),Mf=yk}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vk;exports.createPortal=uk;
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(y(188));throw Error(y(268,Object.keys(a)));}a=cc(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a,b){var c=X;if(0!==(c&48))return a(b);X|=1;try{if(a)return gg(99,a.bind(null,b))}finally{X=c,ig()}};exports.hydrate=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!0,c)};
exports.render=function(a,b,c){if(!rk(b))throw Error(y(200));return tk(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!rk(a))throw Error(y(40));return a._reactRootContainer?(Xj(function(){tk(null,null,a,!1,function(){a._reactRootContainer=null;a[ff]=null})}),!0):!1};exports.unstable_batchedUpdates=Wj;exports.unstable_createPortal=function(a,b){return uk(a,b,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)};
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!rk(c))throw Error(y(200));if(null==a||void 0===a._reactInternals)throw Error(y(38));return tk(a,b,c,!1,d)};exports.version="17.0.2";


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(18);
} else {
  module.exports = require('./cjs/scheduler.development.js');
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f,g,h,k;if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}
if("undefined"===typeof window||"function"!==typeof MessageChannel){var t=null,u=null,w=function(){if(null!==t)try{var a=exports.unstable_now();t(!0,a);t=null}catch(b){throw setTimeout(w,0),b;}};f=function(a){null!==t?setTimeout(f,0,a):(t=a,setTimeout(w,0))};g=function(a,b){u=setTimeout(a,b)};h=function(){clearTimeout(u)};exports.unstable_shouldYield=function(){return!1};k=exports.unstable_forceFrameRate=function(){}}else{var x=window.setTimeout,y=window.clearTimeout;if("undefined"!==typeof console){var z=
window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");"function"!==typeof z&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var A=!1,B=null,C=-1,D=5,E=0;exports.unstable_shouldYield=function(){return exports.unstable_now()>=
E};k=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<a?Math.floor(1E3/a):5};var F=new MessageChannel,G=F.port2;F.port1.onmessage=function(){if(null!==B){var a=exports.unstable_now();E=a+D;try{B(!0,a)?G.postMessage(null):(A=!1,B=null)}catch(b){throw G.postMessage(null),b;}}else A=!1};f=function(a){B=a;A||(A=!0,G.postMessage(null))};g=function(a,b){C=
x(function(){a(exports.unstable_now())},b)};h=function(){y(C);C=-1}}function H(a,b){var c=a.length;a.push(b);a:for(;;){var d=c-1>>>1,e=a[d];if(void 0!==e&&0<I(e,b))a[d]=b,a[c]=e,c=d;else break a}}function J(a){a=a[0];return void 0===a?null:a}
function K(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>I(n,c))void 0!==r&&0>I(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>I(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function I(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var L=[],M=[],N=1,O=null,P=3,Q=!1,R=!1,S=!1;
function T(a){for(var b=J(M);null!==b;){if(null===b.callback)K(M);else if(b.startTime<=a)K(M),b.sortIndex=b.expirationTime,H(L,b);else break;b=J(M)}}function U(a){S=!1;T(a);if(!R)if(null!==J(L))R=!0,f(V);else{var b=J(M);null!==b&&g(U,b.startTime-a)}}
function V(a,b){R=!1;S&&(S=!1,h());Q=!0;var c=P;try{T(b);for(O=J(L);null!==O&&(!(O.expirationTime>b)||a&&!exports.unstable_shouldYield());){var d=O.callback;if("function"===typeof d){O.callback=null;P=O.priorityLevel;var e=d(O.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?O.callback=e:O===J(L)&&K(L);T(b)}else K(L);O=J(L)}if(null!==O)var m=!0;else{var n=J(M);null!==n&&g(U,n.startTime-b);m=!1}return m}finally{O=null,P=c,Q=!1}}var W=k;exports.unstable_IdlePriority=5;
exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){R||Q||(R=!0,f(V))};exports.unstable_getCurrentPriorityLevel=function(){return P};exports.unstable_getFirstCallbackNode=function(){return J(L)};
exports.unstable_next=function(a){switch(P){case 1:case 2:case 3:var b=3;break;default:b=P}var c=P;P=b;try{return a()}finally{P=c}};exports.unstable_pauseExecution=function(){};exports.unstable_requestPaint=W;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=P;P=a;try{return b()}finally{P=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:N++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,H(M,a),null===J(L)&&a===J(M)&&(S?h():S=!0,g(U,c-d))):(a.sortIndex=e,H(L,a),R||Q||(R=!0,f(V)));return a};
exports.unstable_wrapCallback=function(a){var b=P;return function(){var c=P;P=b;try{return a.apply(this,arguments)}finally{P=c}}};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = App;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_About__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Contact__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Navbar__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Projects__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Skills__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__App_css__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__App_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__App_css__);
// src/App.js
function App(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("main",{className:"text-gray-400 bg-stone-950 body-font",style:{fontFamily:'MHTIROGLA'}},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Navbar__["a" /* default */],null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_About__["a" /* default */],null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_Projects__["a" /* default */],null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Contact__["a" /* default */],null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_Skills__["a" /* default */],null));}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = About;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function About(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("section",{id:"about"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"container mx-auto flex px-10 py-20 md:flex-row flex-col items-center"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1",{className:"title-font sm:text-4xl text-3xl mb-4 font-medium text-white"},"Hi, I'm Fadel",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",{className:"hidden lg:inline-block"})," I love to build amazing apps."),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"mb-8 leading-relaxed"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"flex justify-center"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{href:"#contact",className:"inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"},"Work With Me"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{href:"projects",className:"ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"},"See My Past Work"))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"lg:max-w-lg lg:w-full md:w-1/2 w-5/6"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:"object-cover object-center rounded",alt:"hero",src:"/IMG_9182.jpg"}))));}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Contact;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();// src/components/Contact.js
function Contact(){var _React$useState=__WEBPACK_IMPORTED_MODULE_0_react___default.a.useState(""),_React$useState2=_slicedToArray(_React$useState,2),name=_React$useState2[0],setName=_React$useState2[1];var _React$useState3=__WEBPACK_IMPORTED_MODULE_0_react___default.a.useState(""),_React$useState4=_slicedToArray(_React$useState3,2),email=_React$useState4[0],setEmail=_React$useState4[1];var _React$useState5=__WEBPACK_IMPORTED_MODULE_0_react___default.a.useState(""),_React$useState6=_slicedToArray(_React$useState5,2),message=_React$useState6[0],setMessage=_React$useState6[1];function encode(data){return Object.keys(data).map(function(key){return encodeURIComponent(key)+"="+encodeURIComponent(data[key]);}).join("&");}function handleSubmit(e){e.preventDefault();fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:encode({"form-name":"contact",name:name,email:email,message:message})}).then(function(){return alert("Message sent!");}).catch(function(error){return alert(error);});}return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("section",{id:"contact",className:"relative"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("iframe",{width:"100%",height:"100%",title:"map",className:"absolute inset-0",frameBorder:0,marginHeight:0,marginWidth:0,style:{filter:"opacity(0.7)"},src:"https://www.google.com/maps/embed/v1/place?q=Sainte+Foy+Quebec&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"lg:w-1/2 px-6"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2",{className:"title-font font-semibold text-white tracking-widest text-xs"},"ADDRESS"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"mt-1"},"Chemin Sainte Foy. ",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Quebec, QC")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"lg:w-1/2 px-6 mt-4 lg:mt-0"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2",{className:"title-font font-semibold text-white tracking-widest text-xs"},"EMAIL"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{className:"text-indigo-400 leading-relaxed"},"fadeltinto@gmail.com"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2",{className:"title-font font-semibold text-white tracking-widest text-xs mt-4"},"PHONE"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"leading-relaxed"},"438-778-4099")))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form",{netlify:true,name:"contact",onSubmit:handleSubmit,className:"lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2",{className:"text-white sm:text-4xl text-3xl mb-1 font-medium title-font"},"Hire Me"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"leading-relaxed mb-5"},"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum suscipit officia aspernatur veritatis. Asperiores, aliquid?"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"relative mb-4"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label",{htmlFor:"name",className:"leading-7 text-sm text-gray-400"},"Name"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{type:"text",id:"name",name:"name",className:"w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",onChange:function onChange(e){return setName(e.target.value);}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"relative mb-4"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label",{htmlFor:"email",className:"leading-7 text-sm text-gray-400"},"Email"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input",{type:"email",id:"email",name:"email",className:"w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",onChange:function onChange(e){return setEmail(e.target.value);}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"relative mb-4"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label",{htmlFor:"message",className:"leading-7 text-sm text-gray-400"},"Message"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea",{id:"message",name:"message",className:"w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out",onChange:function onChange(e){return setMessage(e.target.value);}})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("button",{type:"submit",className:"text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"},"Submit"))));}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Navbar;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heroicons_react_solid__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
// src/components/Navbar.js
function Navbar(){return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("header",{className:"bg-gray-800 md:sticky top-0 z-10"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{className:"title-font font-medium text-white mb-4 md:mb-0"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{href:"#about",className:"ml-3 text-xl"},"Reed Barger")),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("nav",{className:"md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700\tflex flex-wrap items-center text-base justify-center"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{href:"#projects",className:"mr-5 hover:text-white"},"Past Work"),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{href:"#skills",className:"mr-5 hover:text-white"},"Skills"),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{href:"#testimonials",className:"mr-5 hover:text-white"},"Testimonials")),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{href:"#contact",className:"inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"},"Hire Me",__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__heroicons_react_solid__["a" /* ArrowRightIcon */],{className:"w-4 h-4 ml-1"}))));}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function AcademicCapIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](AcademicCapIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function AdjustmentsIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](AdjustmentsIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function AnnotationIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](AnnotationIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArchiveIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArchiveIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowCircleDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowCircleDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowCircleLeftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowCircleLeftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowCircleRightIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowCircleRightIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowCircleUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowCircleUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowLeftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowLeftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowNarrowDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowNarrowDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowNarrowLeftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowNarrowLeftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowNarrowRightIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowNarrowRightIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowNarrowUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowNarrowUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowRightIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowRightIcon);
/* harmony default export */ __webpack_exports__["a"] = (ForwardRef);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowSmDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowSmDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowSmLeftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowSmLeftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowSmRightIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowSmRightIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowSmUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowSmUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ArrowsExpandIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ArrowsExpandIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function AtSymbolIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](AtSymbolIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BackspaceIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BackspaceIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BadgeCheckIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BadgeCheckIcon);
/* harmony default export */ __webpack_exports__["a"] = (ForwardRef);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BanIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BanIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BeakerIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BeakerIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BellIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BellIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BookOpenIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BookOpenIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BookmarkAltIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BookmarkAltIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BookmarkIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BookmarkIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function BriefcaseIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](BriefcaseIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CakeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CakeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CalculatorIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CalculatorIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CalendarIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CalendarIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CameraIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CameraIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CashIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CashIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChartBarIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChartBarIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChartPieIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChartPieIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChartSquareBarIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChartSquareBarIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChatAlt2Icon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChatAlt2Icon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChatAltIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChatAltIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChatIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChatIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CheckCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CheckCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CheckIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CheckIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronDoubleDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronDoubleDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronDoubleLeftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronDoubleLeftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronDoubleRightIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronDoubleRightIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronDoubleUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronDoubleUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronLeftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronLeftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronRightIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronRightIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChevronUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChevronUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ChipIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M13 7H7v6h6V7z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ChipIcon);
/* harmony default export */ __webpack_exports__["a"] = (ForwardRef);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ClipboardCheckIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ClipboardCheckIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ClipboardCopyIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ClipboardCopyIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ClipboardListIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ClipboardListIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ClipboardIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ClipboardIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ClockIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ClockIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CloudDownloadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CloudDownloadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CloudUploadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 13h2v5a1 1 0 11-2 0v-5z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CloudUploadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CloudIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CloudIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CodeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CodeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CogIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CogIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CollectionIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CollectionIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ColorSwatchIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ColorSwatchIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CreditCardIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CreditCardIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CubeTransparentIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CubeTransparentIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CubeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CubeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CurrencyBangladeshiIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 4a1 1 0 000 2 1 1 0 011 1v1H7a1 1 0 000 2h1v3a3 3 0 106 0v-1a1 1 0 10-2 0v1a1 1 0 11-2 0v-3h3a1 1 0 100-2h-3V7a3 3 0 00-3-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CurrencyBangladeshiIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CurrencyDollarIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CurrencyDollarIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CurrencyEuroIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CurrencyEuroIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CurrencyPoundIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H9.83c.11-.313.17-.65.17-1v-1h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CurrencyPoundIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CurrencyRupeeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CurrencyRupeeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CurrencyYenIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7.858 5.485a1 1 0 00-1.715 1.03L7.633 9H7a1 1 0 100 2h1.834l.166.277V12H7a1 1 0 100 2h2v1a1 1 0 102 0v-1h2a1 1 0 100-2h-2v-.723l.166-.277H13a1 1 0 100-2h-.634l1.492-2.486a1 1 0 10-1.716-1.029L10.034 9h-.068L7.858 5.485z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CurrencyYenIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function CursorClickIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](CursorClickIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DatabaseIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DatabaseIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DesktopComputerIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DesktopComputerIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DeviceMobileIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DeviceMobileIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DeviceTabletIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DeviceTabletIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentAddIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentAddIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentDownloadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentDownloadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentDuplicateIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentDuplicateIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentRemoveIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm1 8a1 1 0 100 2h6a1 1 0 100-2H7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentRemoveIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentReportIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentReportIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentSearchIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentSearchIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentTextIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentTextIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DocumentIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DocumentIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DotsCircleHorizontalIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DotsCircleHorizontalIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DotsHorizontalIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DotsHorizontalIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DotsVerticalIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DotsVerticalIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DownloadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DownloadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function DuplicateIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](DuplicateIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function EmojiHappyIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](EmojiHappyIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function EmojiSadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](EmojiSadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ExclamationCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ExclamationCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ExclamationIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ExclamationIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ExternalLinkIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ExternalLinkIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function EyeOffIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](EyeOffIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function EyeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10 12a2 2 0 100-4 2 2 0 000 4z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](EyeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FastForwardIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FastForwardIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FilmIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FilmIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FilterIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FilterIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FingerPrintIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FingerPrintIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FireIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FireIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FlagIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FlagIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FolderAddIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FolderAddIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FolderDownloadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1.586l-.293-.293a1 1 0 10-1.414 1.414l2 2 .002.002a.997.997 0 001.41 0l.002-.002 2-2a1 1 0 00-1.414-1.414l-.293.293V9z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FolderDownloadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FolderOpenIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FolderOpenIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FolderRemoveIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm4 6a1 1 0 100 2h4a1 1 0 100-2H8z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FolderRemoveIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function FolderIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](FolderIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function GiftIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](GiftIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function GlobeAltIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](GlobeAltIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function GlobeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](GlobeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function HandIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](HandIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function HashtagIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](HashtagIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function HeartIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](HeartIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function HomeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](HomeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function IdentificationIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](IdentificationIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function InboxInIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](InboxInIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function InboxIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](InboxIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function InformationCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](InformationCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function KeyIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](KeyIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LibraryIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LibraryIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LightBulbIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LightBulbIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LightningBoltIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LightningBoltIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LinkIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LinkIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LocationMarkerIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LocationMarkerIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LockClosedIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LockClosedIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LockOpenIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LockOpenIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LoginIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LoginIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function LogoutIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](LogoutIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MailOpenIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MailOpenIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MailIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MailIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MapIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MapIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MenuAlt1Icon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MenuAlt1Icon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MenuAlt2Icon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MenuAlt2Icon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MenuAlt3Icon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MenuAlt3Icon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MenuAlt4Icon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MenuAlt4Icon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MenuIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MenuIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MicrophoneIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MicrophoneIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MinusCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MinusCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MinusSmIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MinusSmIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MinusIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MinusIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MoonIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MoonIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function MusicNoteIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](MusicNoteIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function NewspaperIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](NewspaperIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function OfficeBuildingIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](OfficeBuildingIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PaperAirplaneIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PaperAirplaneIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PaperClipIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PaperClipIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PauseIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PauseIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PencilAltIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PencilAltIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PencilIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PencilIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PhoneIncomingIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PhoneIncomingIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PhoneMissedCallIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M16.707 3.293a1 1 0 010 1.414L15.414 6l1.293 1.293a1 1 0 01-1.414 1.414L14 7.414l-1.293 1.293a1 1 0 11-1.414-1.414L12.586 6l-1.293-1.293a1 1 0 011.414-1.414L14 4.586l1.293-1.293a1 1 0 011.414 0z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PhoneMissedCallIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PhoneOutgoingIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PhoneOutgoingIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PhoneIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PhoneIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PhotographIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PhotographIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PlayIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PlayIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PlusCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PlusCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PlusSmIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PlusSmIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PlusIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PlusIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PresentationChartBarIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PresentationChartBarIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PresentationChartLineIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PresentationChartLineIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PrinterIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PrinterIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function PuzzleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](PuzzleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function QrcodeIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](QrcodeIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function QuestionMarkCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](QuestionMarkCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ReceiptRefundIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ReceiptRefundIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ReceiptTaxIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ReceiptTaxIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function RefreshIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](RefreshIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ReplyIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ReplyIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function RewindIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](RewindIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function RssIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](RssIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SaveAsIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SaveAsIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SaveIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SaveIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ScaleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ScaleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ScissorsIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ScissorsIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SearchCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 9a2 2 0 114 0 2 2 0 01-4 0z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SearchCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SearchIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SearchIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SelectorIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SelectorIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ServerIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ServerIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ShareIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ShareIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ShieldCheckIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ShieldCheckIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ShieldExclamationIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ShieldExclamationIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ShoppingBagIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ShoppingBagIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ShoppingCartIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ShoppingCartIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SortAscendingIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SortAscendingIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SortDescendingIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SortDescendingIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SparklesIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SparklesIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SpeakerphoneIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SpeakerphoneIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function StarIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](StarIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function StatusOfflineIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1014.95 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.636-6.294A1 1 0 0012.12 7.88c.924.923 1.12 2.3.587 3.415l-1.992-1.992a.922.922 0 00-.018-.018l-6.99-6.991zM3.238 8.187a1 1 0 00-1.933-.516c-.8 3-.025 6.336 2.331 8.693a1 1 0 001.414-1.415 6.997 6.997 0 01-1.812-6.762zM7.4 11.5a1 1 0 10-1.73 1c.214.371.48.72.795 1.035a1 1 0 001.414-1.414c-.191-.191-.35-.4-.478-.622z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](StatusOfflineIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function StatusOnlineIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](StatusOnlineIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function StopIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](StopIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SunIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SunIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SupportIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SupportIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SwitchHorizontalIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SwitchHorizontalIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function SwitchVerticalIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](SwitchVerticalIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TableIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TableIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TagIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TagIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TemplateIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TemplateIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TerminalIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TerminalIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ThumbDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ThumbDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ThumbUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ThumbUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TicketIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TicketIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TranslateIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TranslateIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TrashIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TrashIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TrendingDownIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TrendingDownIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TrendingUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TrendingUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function TruckIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](TruckIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UploadIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UploadIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UserAddIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UserAddIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UserCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UserCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UserGroupIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UserGroupIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UserRemoveIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UserRemoveIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UserIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UserIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function UsersIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](UsersIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function VariableIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](VariableIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function VideoCameraIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](VideoCameraIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ViewBoardsIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ViewBoardsIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ViewGridAddIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ViewGridAddIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ViewGridIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ViewGridIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ViewListIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ViewListIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function VolumeOffIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](VolumeOffIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function VolumeUpIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](VolumeUpIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function WifiIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](WifiIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function XCircleIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](XCircleIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function XIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](XIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ZoomInIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    d: "M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8zm6-4a4 4 0 100 8 4 4 0 000-8z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ZoomInIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function ZoomOutIcon(props, svgRef) {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    ref: svgRef
  }, props), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
    clipRule: "evenodd"
  }), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("path", {
    fillRule: "evenodd",
    d: "M5 8a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z",
    clipRule: "evenodd"
  }));
}

const ForwardRef = __WEBPACK_IMPORTED_MODULE_0_react__["forwardRef"](ZoomOutIcon);
/* unused harmony default export */ var _unused_webpack_default_export = (ForwardRef);

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Projects;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_icons_vsc__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(5);
function Projects(){return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("section",{id:"projects",className:"text-gray-400 bg-gray-900 body-font"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"container px-5 py-10 mx-auto text-center lg:px-40"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"flex flex-col w-full mb-20"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react_icons_vsc__["a" /* VscVscodeInsiders */],{className:"mx-auto inline-block w-10 mb-4"}),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1",{className:"sm:text-4xl text-3xl font-medium title-font mb-4 text-white"},"Apps I've Built"),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p",{className:"lg:w-2/3 mx-auto leading-relaxed text-base"},"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo facilis repellat ab cupiditate alias vero aliquid obcaecati quisquam fuga dolore.")),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"flex flex-wrap -m-4"},__WEBPACK_IMPORTED_MODULE_2__data__["a" /* projects */].map(function(project){return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("a",{href:project.link,key:project.image,className:"sm:w-1/2 w-100 p-4"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"flex relative"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("img",{alt:"gallery",className:"absolute inset-0 w-full h-full object-cover object-center",src:project.image}),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h2",{className:"tracking-widest text-sm title-font font-medium text-green-400 mb-1"},project.subtitle),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1",{className:"title-font text-lg font-medium text-white mb-3"},project.title),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p",{className:"leading-relaxed"},project.description))));}))));}

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VscAccount */
/* unused harmony export VscActivateBreakpoints */
/* unused harmony export VscAdd */
/* unused harmony export VscArchive */
/* unused harmony export VscArrowBoth */
/* unused harmony export VscArrowCircleDown */
/* unused harmony export VscArrowCircleLeft */
/* unused harmony export VscArrowCircleRight */
/* unused harmony export VscArrowCircleUp */
/* unused harmony export VscArrowDown */
/* unused harmony export VscArrowLeft */
/* unused harmony export VscArrowRight */
/* unused harmony export VscArrowSmallDown */
/* unused harmony export VscArrowSmallLeft */
/* unused harmony export VscArrowSmallRight */
/* unused harmony export VscArrowSmallUp */
/* unused harmony export VscArrowSwap */
/* unused harmony export VscArrowUp */
/* unused harmony export VscAzureDevops */
/* unused harmony export VscAzure */
/* unused harmony export VscBeakerStop */
/* unused harmony export VscBeaker */
/* unused harmony export VscBellDot */
/* unused harmony export VscBellSlashDot */
/* unused harmony export VscBellSlash */
/* unused harmony export VscBell */
/* unused harmony export VscBlank */
/* unused harmony export VscBold */
/* unused harmony export VscBook */
/* unused harmony export VscBookmark */
/* unused harmony export VscBracketDot */
/* unused harmony export VscBracketError */
/* unused harmony export VscBriefcase */
/* unused harmony export VscBroadcast */
/* unused harmony export VscBrowser */
/* unused harmony export VscBug */
/* unused harmony export VscCalendar */
/* unused harmony export VscCallIncoming */
/* unused harmony export VscCallOutgoing */
/* unused harmony export VscCaseSensitive */
/* unused harmony export VscCheckAll */
/* unused harmony export VscCheck */
/* unused harmony export VscChecklist */
/* unused harmony export VscChevronDown */
/* unused harmony export VscChevronLeft */
/* unused harmony export VscChevronRight */
/* unused harmony export VscChevronUp */
/* unused harmony export VscChip */
/* unused harmony export VscChromeClose */
/* unused harmony export VscChromeMaximize */
/* unused harmony export VscChromeMinimize */
/* unused harmony export VscChromeRestore */
/* unused harmony export VscCircleFilled */
/* unused harmony export VscCircleLargeFilled */
/* unused harmony export VscCircleLarge */
/* unused harmony export VscCircleSlash */
/* unused harmony export VscCircleSmallFilled */
/* unused harmony export VscCircleSmall */
/* unused harmony export VscCircle */
/* unused harmony export VscCircuitBoard */
/* unused harmony export VscClearAll */
/* unused harmony export VscClippy */
/* unused harmony export VscCloseAll */
/* unused harmony export VscClose */
/* unused harmony export VscCloudDownload */
/* unused harmony export VscCloudUpload */
/* unused harmony export VscCloud */
/* unused harmony export VscCodeOss */
/* unused harmony export VscCode */
/* unused harmony export VscCoffee */
/* unused harmony export VscCollapseAll */
/* unused harmony export VscColorMode */
/* unused harmony export VscCombine */
/* unused harmony export VscCommentDiscussion */
/* unused harmony export VscCommentDraft */
/* unused harmony export VscCommentUnresolved */
/* unused harmony export VscComment */
/* unused harmony export VscCompassActive */
/* unused harmony export VscCompassDot */
/* unused harmony export VscCompass */
/* unused harmony export VscCopilot */
/* unused harmony export VscCopy */
/* unused harmony export VscCoverage */
/* unused harmony export VscCreditCard */
/* unused harmony export VscDash */
/* unused harmony export VscDashboard */
/* unused harmony export VscDatabase */
/* unused harmony export VscDebugAll */
/* unused harmony export VscDebugAltSmall */
/* unused harmony export VscDebugAlt */
/* unused harmony export VscDebugBreakpointConditionalUnverified */
/* unused harmony export VscDebugBreakpointConditional */
/* unused harmony export VscDebugBreakpointDataUnverified */
/* unused harmony export VscDebugBreakpointData */
/* unused harmony export VscDebugBreakpointFunctionUnverified */
/* unused harmony export VscDebugBreakpointFunction */
/* unused harmony export VscDebugBreakpointLogUnverified */
/* unused harmony export VscDebugBreakpointLog */
/* unused harmony export VscDebugBreakpointUnsupported */
/* unused harmony export VscDebugConsole */
/* unused harmony export VscDebugContinueSmall */
/* unused harmony export VscDebugContinue */
/* unused harmony export VscDebugCoverage */
/* unused harmony export VscDebugDisconnect */
/* unused harmony export VscDebugLineByLine */
/* unused harmony export VscDebugPause */
/* unused harmony export VscDebugRerun */
/* unused harmony export VscDebugRestartFrame */
/* unused harmony export VscDebugRestart */
/* unused harmony export VscDebugReverseContinue */
/* unused harmony export VscDebugStackframeActive */
/* unused harmony export VscDebugStackframe */
/* unused harmony export VscDebugStart */
/* unused harmony export VscDebugStepBack */
/* unused harmony export VscDebugStepInto */
/* unused harmony export VscDebugStepOut */
/* unused harmony export VscDebugStepOver */
/* unused harmony export VscDebugStop */
/* unused harmony export VscDebug */
/* unused harmony export VscDesktopDownload */
/* unused harmony export VscDeviceCameraVideo */
/* unused harmony export VscDeviceCamera */
/* unused harmony export VscDeviceMobile */
/* unused harmony export VscDiffAdded */
/* unused harmony export VscDiffIgnored */
/* unused harmony export VscDiffModified */
/* unused harmony export VscDiffMultiple */
/* unused harmony export VscDiffRemoved */
/* unused harmony export VscDiffRenamed */
/* unused harmony export VscDiffSingle */
/* unused harmony export VscDiff */
/* unused harmony export VscDiscard */
/* unused harmony export VscEdit */
/* unused harmony export VscEditorLayout */
/* unused harmony export VscEllipsis */
/* unused harmony export VscEmptyWindow */
/* unused harmony export VscErrorSmall */
/* unused harmony export VscError */
/* unused harmony export VscExclude */
/* unused harmony export VscExpandAll */
/* unused harmony export VscExport */
/* unused harmony export VscExtensions */
/* unused harmony export VscEyeClosed */
/* unused harmony export VscEye */
/* unused harmony export VscFeedback */
/* unused harmony export VscFileBinary */
/* unused harmony export VscFileCode */
/* unused harmony export VscFileMedia */
/* unused harmony export VscFilePdf */
/* unused harmony export VscFileSubmodule */
/* unused harmony export VscFileSymlinkDirectory */
/* unused harmony export VscFileSymlinkFile */
/* unused harmony export VscFileZip */
/* unused harmony export VscFile */
/* unused harmony export VscFiles */
/* unused harmony export VscFilterFilled */
/* unused harmony export VscFilter */
/* unused harmony export VscFlame */
/* unused harmony export VscFoldDown */
/* unused harmony export VscFoldUp */
/* unused harmony export VscFold */
/* unused harmony export VscFolderActive */
/* unused harmony export VscFolderLibrary */
/* unused harmony export VscFolderOpened */
/* unused harmony export VscFolder */
/* unused harmony export VscGame */
/* unused harmony export VscGear */
/* unused harmony export VscGift */
/* unused harmony export VscGistSecret */
/* unused harmony export VscGist */
/* unused harmony export VscGitCommit */
/* unused harmony export VscGitCompare */
/* unused harmony export VscGitFetch */
/* unused harmony export VscGitMerge */
/* unused harmony export VscGitPullRequestClosed */
/* unused harmony export VscGitPullRequestCreate */
/* unused harmony export VscGitPullRequestDraft */
/* unused harmony export VscGitPullRequestGoToChanges */
/* unused harmony export VscGitPullRequestNewChanges */
/* unused harmony export VscGitPullRequest */
/* unused harmony export VscGitStashApply */
/* unused harmony export VscGitStashPop */
/* unused harmony export VscGitStash */
/* unused harmony export VscGithubAction */
/* unused harmony export VscGithubAlt */
/* unused harmony export VscGithubInverted */
/* unused harmony export VscGithubProject */
/* unused harmony export VscGithub */
/* unused harmony export VscGlobe */
/* unused harmony export VscGoToFile */
/* unused harmony export VscGoToSearch */
/* unused harmony export VscGrabber */
/* unused harmony export VscGraphLeft */
/* unused harmony export VscGraphLine */
/* unused harmony export VscGraphScatter */
/* unused harmony export VscGraph */
/* unused harmony export VscGripper */
/* unused harmony export VscGroupByRefType */
/* unused harmony export VscHeartFilled */
/* unused harmony export VscHeart */
/* unused harmony export VscHistory */
/* unused harmony export VscHome */
/* unused harmony export VscHorizontalRule */
/* unused harmony export VscHubot */
/* unused harmony export VscInbox */
/* unused harmony export VscIndent */
/* unused harmony export VscInfo */
/* unused harmony export VscInsert */
/* unused harmony export VscInspect */
/* unused harmony export VscIssueDraft */
/* unused harmony export VscIssueReopened */
/* unused harmony export VscIssues */
/* unused harmony export VscItalic */
/* unused harmony export VscJersey */
/* unused harmony export VscJson */
/* unused harmony export VscKebabVertical */
/* unused harmony export VscKey */
/* unused harmony export VscLaw */
/* unused harmony export VscLayersActive */
/* unused harmony export VscLayersDot */
/* unused harmony export VscLayers */
/* unused harmony export VscLayoutActivitybarLeft */
/* unused harmony export VscLayoutActivitybarRight */
/* unused harmony export VscLayoutCentered */
/* unused harmony export VscLayoutMenubar */
/* unused harmony export VscLayoutPanelCenter */
/* unused harmony export VscLayoutPanelJustify */
/* unused harmony export VscLayoutPanelLeft */
/* unused harmony export VscLayoutPanelOff */
/* unused harmony export VscLayoutPanelRight */
/* unused harmony export VscLayoutPanel */
/* unused harmony export VscLayoutSidebarLeftOff */
/* unused harmony export VscLayoutSidebarLeft */
/* unused harmony export VscLayoutSidebarRightOff */
/* unused harmony export VscLayoutSidebarRight */
/* unused harmony export VscLayoutStatusbar */
/* unused harmony export VscLayout */
/* unused harmony export VscLibrary */
/* unused harmony export VscLightbulbAutofix */
/* unused harmony export VscLightbulbSparkle */
/* unused harmony export VscLightbulb */
/* unused harmony export VscLinkExternal */
/* unused harmony export VscLink */
/* unused harmony export VscListFilter */
/* unused harmony export VscListFlat */
/* unused harmony export VscListOrdered */
/* unused harmony export VscListSelection */
/* unused harmony export VscListTree */
/* unused harmony export VscListUnordered */
/* unused harmony export VscLiveShare */
/* unused harmony export VscLoading */
/* unused harmony export VscLocation */
/* unused harmony export VscLockSmall */
/* unused harmony export VscLock */
/* unused harmony export VscMagnet */
/* unused harmony export VscMailRead */
/* unused harmony export VscMail */
/* unused harmony export VscMapFilled */
/* unused harmony export VscMapVerticalFilled */
/* unused harmony export VscMapVertical */
/* unused harmony export VscMap */
/* unused harmony export VscMarkdown */
/* unused harmony export VscMegaphone */
/* unused harmony export VscMention */
/* unused harmony export VscMenu */
/* unused harmony export VscMerge */
/* unused harmony export VscMicFilled */
/* unused harmony export VscMic */
/* unused harmony export VscMilestone */
/* unused harmony export VscMirror */
/* unused harmony export VscMortarBoard */
/* unused harmony export VscMove */
/* unused harmony export VscMultipleWindows */
/* unused harmony export VscMusic */
/* unused harmony export VscMute */
/* unused harmony export VscNewFile */
/* unused harmony export VscNewFolder */
/* unused harmony export VscNewline */
/* unused harmony export VscNoNewline */
/* unused harmony export VscNote */
/* unused harmony export VscNotebookTemplate */
/* unused harmony export VscNotebook */
/* unused harmony export VscOctoface */
/* unused harmony export VscOpenPreview */
/* unused harmony export VscOrganization */
/* unused harmony export VscOutput */
/* unused harmony export VscPackage */
/* unused harmony export VscPaintcan */
/* unused harmony export VscPassFilled */
/* unused harmony export VscPass */
/* unused harmony export VscPercentage */
/* unused harmony export VscPersonAdd */
/* unused harmony export VscPerson */
/* unused harmony export VscPiano */
/* unused harmony export VscPieChart */
/* unused harmony export VscPin */
/* unused harmony export VscPinnedDirty */
/* unused harmony export VscPinned */
/* unused harmony export VscPlayCircle */
/* unused harmony export VscPlay */
/* unused harmony export VscPlug */
/* unused harmony export VscPreserveCase */
/* unused harmony export VscPreview */
/* unused harmony export VscPrimitiveSquare */
/* unused harmony export VscProject */
/* unused harmony export VscPulse */
/* unused harmony export VscQuestion */
/* unused harmony export VscQuote */
/* unused harmony export VscRadioTower */
/* unused harmony export VscReactions */
/* unused harmony export VscRecordKeys */
/* unused harmony export VscRecordSmall */
/* unused harmony export VscRecord */
/* unused harmony export VscRedo */
/* unused harmony export VscReferences */
/* unused harmony export VscRefresh */
/* unused harmony export VscRegex */
/* unused harmony export VscRemoteExplorer */
/* unused harmony export VscRemote */
/* unused harmony export VscRemove */
/* unused harmony export VscReplaceAll */
/* unused harmony export VscReplace */
/* unused harmony export VscReply */
/* unused harmony export VscRepoClone */
/* unused harmony export VscRepoFetch */
/* unused harmony export VscRepoForcePush */
/* unused harmony export VscRepoForked */
/* unused harmony export VscRepoPull */
/* unused harmony export VscRepoPush */
/* unused harmony export VscRepo */
/* unused harmony export VscReport */
/* unused harmony export VscRequestChanges */
/* unused harmony export VscRobot */
/* unused harmony export VscRocket */
/* unused harmony export VscRootFolderOpened */
/* unused harmony export VscRootFolder */
/* unused harmony export VscRss */
/* unused harmony export VscRuby */
/* unused harmony export VscRunAbove */
/* unused harmony export VscRunAllCoverage */
/* unused harmony export VscRunAll */
/* unused harmony export VscRunBelow */
/* unused harmony export VscRunCoverage */
/* unused harmony export VscRunErrors */
/* unused harmony export VscSaveAll */
/* unused harmony export VscSaveAs */
/* unused harmony export VscSave */
/* unused harmony export VscScreenFull */
/* unused harmony export VscScreenNormal */
/* unused harmony export VscSearchFuzzy */
/* unused harmony export VscSearchStop */
/* unused harmony export VscSearch */
/* unused harmony export VscSend */
/* unused harmony export VscServerEnvironment */
/* unused harmony export VscServerProcess */
/* unused harmony export VscServer */
/* unused harmony export VscSettingsGear */
/* unused harmony export VscSettings */
/* unused harmony export VscShare */
/* unused harmony export VscShield */
/* unused harmony export VscSignIn */
/* unused harmony export VscSignOut */
/* unused harmony export VscSmiley */
/* unused harmony export VscSnake */
/* unused harmony export VscSortPrecedence */
/* unused harmony export VscSourceControl */
/* unused harmony export VscSparkleFilled */
/* unused harmony export VscSparkle */
/* unused harmony export VscSplitHorizontal */
/* unused harmony export VscSplitVertical */
/* unused harmony export VscSquirrel */
/* unused harmony export VscStarEmpty */
/* unused harmony export VscStarFull */
/* unused harmony export VscStarHalf */
/* unused harmony export VscStopCircle */
/* unused harmony export VscSurroundWith */
/* unused harmony export VscSymbolArray */
/* unused harmony export VscSymbolBoolean */
/* unused harmony export VscSymbolClass */
/* unused harmony export VscSymbolColor */
/* unused harmony export VscSymbolConstant */
/* unused harmony export VscSymbolEnumMember */
/* unused harmony export VscSymbolEnum */
/* unused harmony export VscSymbolEvent */
/* unused harmony export VscSymbolField */
/* unused harmony export VscSymbolFile */
/* unused harmony export VscSymbolInterface */
/* unused harmony export VscSymbolKey */
/* unused harmony export VscSymbolKeyword */
/* unused harmony export VscSymbolMethod */
/* unused harmony export VscSymbolMisc */
/* unused harmony export VscSymbolNamespace */
/* unused harmony export VscSymbolNumeric */
/* unused harmony export VscSymbolOperator */
/* unused harmony export VscSymbolParameter */
/* unused harmony export VscSymbolProperty */
/* unused harmony export VscSymbolRuler */
/* unused harmony export VscSymbolSnippet */
/* unused harmony export VscSymbolString */
/* unused harmony export VscSymbolStructure */
/* unused harmony export VscSymbolVariable */
/* unused harmony export VscSyncIgnored */
/* unused harmony export VscSync */
/* unused harmony export VscTable */
/* unused harmony export VscTag */
/* unused harmony export VscTarget */
/* unused harmony export VscTasklist */
/* unused harmony export VscTelescope */
/* unused harmony export VscTerminalBash */
/* unused harmony export VscTerminalCmd */
/* unused harmony export VscTerminalDebian */
/* unused harmony export VscTerminalLinux */
/* unused harmony export VscTerminalPowershell */
/* unused harmony export VscTerminalTmux */
/* unused harmony export VscTerminalUbuntu */
/* unused harmony export VscTerminal */
/* unused harmony export VscTextSize */
/* unused harmony export VscThreeBars */
/* unused harmony export VscThumbsdownFilled */
/* unused harmony export VscThumbsdown */
/* unused harmony export VscThumbsupFilled */
/* unused harmony export VscThumbsup */
/* unused harmony export VscTools */
/* unused harmony export VscTrash */
/* unused harmony export VscTriangleDown */
/* unused harmony export VscTriangleLeft */
/* unused harmony export VscTriangleRight */
/* unused harmony export VscTriangleUp */
/* unused harmony export VscTwitter */
/* unused harmony export VscTypeHierarchySub */
/* unused harmony export VscTypeHierarchySuper */
/* unused harmony export VscTypeHierarchy */
/* unused harmony export VscUnfold */
/* unused harmony export VscUngroupByRefType */
/* unused harmony export VscUnlock */
/* unused harmony export VscUnmute */
/* unused harmony export VscUnverified */
/* unused harmony export VscVariableGroup */
/* unused harmony export VscVerifiedFilled */
/* unused harmony export VscVerified */
/* unused harmony export VscVersions */
/* unused harmony export VscVmActive */
/* unused harmony export VscVmConnect */
/* unused harmony export VscVmOutline */
/* unused harmony export VscVmRunning */
/* unused harmony export VscVm */
/* unused harmony export VscVr */
/* harmony export (immutable) */ __webpack_exports__["a"] = VscVscodeInsiders;
/* unused harmony export VscVscode */
/* unused harmony export VscWand */
/* unused harmony export VscWarning */
/* unused harmony export VscWatch */
/* unused harmony export VscWhitespace */
/* unused harmony export VscWholeWord */
/* unused harmony export VscWindow */
/* unused harmony export VscWordWrap */
/* unused harmony export VscWorkspaceTrusted */
/* unused harmony export VscWorkspaceUnknown */
/* unused harmony export VscWorkspaceUntrusted */
/* unused harmony export VscZoomIn */
/* unused harmony export VscZoomOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__ = __webpack_require__(256);
// THIS FILE IS AUTO GENERATED

function VscAccount (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09.016.016.032.016.032.032.144.112.288.224.448.336.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16.144-.111.304-.223.448-.335.016-.016.032-.016.032-.032 1.696-1.487 2.8-3.676 2.8-6.106zm-8 7.001c-1.504 0-2.88-.48-4.016-1.279.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816.24-.24.528-.463.816-.639.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993zm-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023.144-.32.336-.607.576-.847.24-.24.528-.431.848-.575.32-.144.672-.208 1.024-.208.368 0 .704.064 1.024.208.32.144.608.336.848.575.24.24.432.528.576.847.144.32.208.672.208 1.023 0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848 2.84 2.84 0 0 1-.848.575 2.715 2.715 0 0 1-2.064 0 2.84 2.84 0 0 1-.848-.575 2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406 4.883 4.883 0 0 0-1.088-1.135 5.207 5.207 0 0 0-1.04-.608 2.82 2.82 0 0 0 .464-.383 4.2 4.2 0 0 0 .624-.784 3.624 3.624 0 0 0 .528-1.934 3.71 3.71 0 0 0-.288-1.47 3.799 3.799 0 0 0-.816-1.199 3.845 3.845 0 0 0-1.2-.8 3.72 3.72 0 0 0-1.472-.287 3.72 3.72 0 0 0-1.472.288 3.631 3.631 0 0 0-1.2.815 3.84 3.84 0 0 0-.8 1.199 3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007.096.336.224.64.4.927.16.288.384.544.624.784.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907z"},"child":[]}]})(props);
};
function VscActivateBreakpoints (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 5.5a4.394 4.394 0 0 1-4 4.5 2.955 2.955 0 0 0-.2-1A3.565 3.565 0 0 0 14 5.5a3.507 3.507 0 0 0-7-.3A3.552 3.552 0 0 0 6 5a4.622 4.622 0 0 1 4.5-4A4.481 4.481 0 0 1 15 5.5zM5.5 6a4.5 4.5 0 1 0 0 9.001 4.5 4.5 0 0 0 0-9z"},"child":[]}]})(props);
};
function VscAdd (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 7v1H8v6H7V8H1V7h6V1h1v6h6z"},"child":[]}]})(props);
};
function VscArchive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.5 1h-13l-.5.5v3l.5.5H2v8.5l.5.5h11l.5-.5V5h.5l.5-.5v-3l-.5-.5zm-1 3H2V2h12v2h-.5zM3 13V5h10v8H3zm8-6H5v1h6V7z"},"child":[]}]})(props);
};
function VscArrowBoth (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3 9l2.146 2.146-.707.708-3-3v-.708l3-3 .707.708L3 8h10l-2.146-2.146.707-.708 3 3v.708l-3 3-.707-.707L13 9H3z"},"child":[]}]})(props);
};
function VscArrowCircleDown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.36891 8.08074L7.50833 10.2202V4.46802H8.50833V10.1473L10.5749 8.08074L11.282 8.78784L8.32545 11.7444H7.61835L4.6618 8.78784L5.36891 8.08074Z"},"child":[]},{"tag":"path","attr":{"d":"M14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8ZM13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8Z"},"child":[]}]})(props);
};
function VscArrowCircleLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.91926 10.6311L5.77984 8.49167L11.532 8.49167L11.532 7.49167L5.85271 7.49167L7.91926 5.42511L7.21216 4.718L4.25561 7.67455L4.25561 8.38165L7.21216 11.3382L7.91926 10.6311Z"},"child":[]},{"tag":"path","attr":{"d":"M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3Z"},"child":[]}]})(props);
};
function VscArrowCircleRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.08074 5.36891L10.2202 7.50833L4.46802 7.50833L4.46802 8.50833L10.1473 8.50833L8.08073 10.5749L8.78784 11.282L11.7444 8.32545L11.7444 7.61835L8.78784 4.6618L8.08074 5.36891Z"},"child":[]},{"tag":"path","attr":{"d":"M8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14ZM8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13Z"},"child":[]}]})(props);
};
function VscArrowCircleUp (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.36891 7.91926L7.50833 5.77984V11.532H8.50833V5.85271L10.5749 7.91926L11.282 7.21216L8.32545 4.25562H7.61835L4.6618 7.21216L5.36891 7.91926Z"},"child":[]},{"tag":"path","attr":{"d":"M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8Z"},"child":[]}]})(props);
};
function VscArrowDown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.147 9l5 5h.707l5-5-.707-.707L9 12.439V2H8v10.44L3.854 8.292 3.147 9z"},"child":[]}]})(props);
};
function VscArrowLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7 3.093l-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"},"child":[]}]})(props);
};
function VscArrowRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9 13.887l5-5V8.18l-5-5-.707.707 4.146 4.147H2v1h10.44L8.292 13.18l.707.707z"},"child":[]}]})(props);
};
function VscArrowSmallDown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.7 8.64l-2.5 2.5h-.7L5 8.64l.7-.71 1.65 1.64V4h1v5.57L10 7.92l.7.72z"},"child":[]}]})(props);
};
function VscArrowSmallLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6.5 10.7L4 8.2v-.7L6.5 5l.71.7-1.64 1.65h5.57v1H5.57L7.22 10l-.72.7z"},"child":[]}]})(props);
};
function VscArrowSmallRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.64 5l2.5 2.5v.7l-2.5 2.5-.71-.7 1.64-1.65H4v-1h5.57L7.92 5.7l.72-.7z"},"child":[]}]})(props);
};
function VscArrowSmallUp (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5 6.5L7.5 4h.7l2.5 2.5-.7.71-1.65-1.64v5.57h-1V5.57L5.7 7.22 5 6.5z"},"child":[]}]})(props);
};
function VscArrowSwap (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.207 15.061L1 11.854v-.707L4.207 7.94l.707.707-2.353 2.354H15v1H2.56l2.354 2.353-.707.707zm7.586-7L15 4.854v-.707L11.793.94l-.707.707L13.439 4H1v1h12.44l-2.354 2.354.707.707z"},"child":[]}]})(props);
};
function VscArrowUp (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.854 7l-5-5h-.707l-5 5 .707.707L8 3.561V14h1V3.56l4.146 4.147.708-.707z"},"child":[]}]})(props);
};
function VscAzureDevops (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 3.62172V12.1336L11.5 15L6.075 13.025V14.9825L3.00375 10.9713L11.955 11.6704V4.00624L15 3.62172ZM12.0163 4.04994L6.99375 1V3.00125L2.3825 4.35581L1 6.12984V10.1586L2.9775 11.0325V5.86767L12.0163 4.04994Z"},"child":[]}]})(props);
};
function VscAzure (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15.3702 13.6799L11.3702 1.67989C11.3006 1.47291 11.1652 1.29438 10.9846 1.17159C10.804 1.0488 10.5882 0.988513 10.3702 0.999896H5.63017C5.42052 0.999354 5.21598 1.0647 5.04551 1.18672C4.87504 1.30875 4.74724 1.48127 4.68015 1.67989L0.630165 13.6799C0.577646 13.8346 0.56382 13.9998 0.589943 14.1611C0.616066 14.3225 0.681335 14.4749 0.780007 14.6052C0.878678 14.7354 1.00778 14.8395 1.15598 14.9083C1.30419 14.9771 1.46699 15.0086 1.63017 14.9999H4.56016C4.76809 14.9984 4.97035 14.932 5.13883 14.8101C5.30731 14.6883 5.43363 14.5169 5.50016 14.3199L6.11015 12.5399L9.11015 14.8099C9.28448 14.9362 9.49495 15.0028 9.71018 14.9999H14.3902C14.5517 15.0052 14.7121 14.9712 14.8576 14.901C15.0032 14.8307 15.1295 14.7263 15.2259 14.5965C15.3222 14.4668 15.3856 14.3156 15.4107 14.156C15.4359 13.9963 15.422 13.833 15.3702 13.6799ZM9.75016 14.3399C9.67748 14.3399 9.60693 14.3153 9.55015 14.2699L3.90018 10.0799L3.81016 10.0099H6.81016L6.89017 9.79988L7.89017 7.26988L10.1302 13.8999C10.1482 13.9555 10.1515 14.0148 10.1399 14.072C10.1283 14.1293 10.1022 14.1826 10.064 14.2269C10.0258 14.2711 9.97689 14.3047 9.92191 14.3245C9.86694 14.3443 9.80778 14.3496 9.75016 14.3399V14.3399ZM14.4201 14.3399H10.7002C10.7749 14.1262 10.7749 13.8935 10.7002 13.6799L6.65018 1.67989H10.3702C10.4408 1.68024 10.5095 1.70258 10.5669 1.74379C10.6242 1.78501 10.6673 1.84308 10.6902 1.9099L14.7402 13.9099C14.7538 13.9597 14.756 14.012 14.7464 14.0628C14.7369 14.1136 14.7159 14.1615 14.6851 14.203C14.6542 14.2444 14.6144 14.2783 14.5685 14.302C14.5226 14.3257 14.4718 14.3387 14.4201 14.3399V14.3399Z"},"child":[]}]})(props);
};
function VscBeakerStop (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.99994 15.006H8.00746C7.62983 14.7234 7.29348 14.3888 7.00908 14.0126L2.99994 14.017L4.54094 11.006H5.99997L5.99997 11C5.99997 10.6597 6.03398 10.3273 6.09878 10.006H5.04894L6.89294 6.408L6.99994 6.193V2.036L8.99994 2.012V6.007V6.249L9.07058 6.38584C9.38043 6.25613 9.7061 6.15672 10.0439 6.09131L9.99994 6.006V2.006H10.9999V1.006H9.99394V1L9.53794 1.005H4.99994V2H5.99994V5.952L2.10594 13.561C2.03023 13.7133 1.99465 13.8825 2.00254 14.0524C2.01044 14.2224 2.06156 14.3875 2.15106 14.5321C2.24057 14.6768 2.3655 14.7962 2.51404 14.8792C2.66258 14.9621 2.82982 15.0057 2.99994 15.006ZM8.77769 7.67407C9.43548 7.23455 10.2089 7 11 7C12.0608 7 13.0782 7.42149 13.8283 8.17163C14.5785 8.92178 15 9.93913 15 11C15 11.7911 14.7654 12.5645 14.3259 13.2223C13.8864 13.8801 13.2616 14.3928 12.5307 14.6956C11.7998 14.9983 10.9955 15.0774 10.2196 14.9231C9.44366 14.7688 8.73102 14.3878 8.17161 13.8284C7.6122 13.269 7.23122 12.5563 7.07688 11.7804C6.92254 11.0045 7.00167 10.2001 7.30442 9.46924C7.60717 8.73833 8.11989 8.1136 8.77769 7.67407ZM8.87864 13.1213C9.44125 13.6839 10.2043 14 11 14C11.623 14.0018 12.2312 13.8095 12.74 13.45L8.55003 9.26001C8.19046 9.76883 7.99818 10.377 7.99998 11C7.99998 11.7956 8.31603 12.5587 8.87864 13.1213ZM9.25999 8.55005L13.4499 12.74C13.8095 12.2312 14.0018 11.623 14 11C14 10.2044 13.6839 9.44127 13.1213 8.87866C12.5587 8.31605 11.7956 8 11 8C10.3769 7.9982 9.7688 8.19048 9.25999 8.55005Z"},"child":[]}]})(props);
};
function VscBeaker (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.893 13.558L10 6.006v-4h1v-1H9.994V1l-.456.005H5V2h1v3.952l-3.894 7.609A1 1 0 0 0 3 15.006h10a1 1 0 0 0 .893-1.448zm-7-7.15L7 6.193V2.036l2-.024v4.237l.11.215 1.827 3.542H5.049l1.844-3.598zM3 14.017l1.54-3.011h6.916l1.547 3L3 14.017z"},"child":[]}]})(props);
};
function VscBellDot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.9944 7.87543C12.6765 7.95676 12.3433 8 12 8C11.9965 8 11.993 8 11.9894 7.99999V8.21674C11.9894 9.12596 12.133 10.0352 12.4321 10.9085L12.803 12.0211H3.17241V12.0091L3.54328 10.8965C3.8304 10.0232 3.98593 9.114 3.98593 8.20478V6.00351C3.98593 5.44123 4.10556 4.89092 4.33287 4.38845C4.56017 3.87403 4.88318 3.41942 5.3019 3.04855C5.72062 2.66572 6.21112 2.3786 6.73751 2.21111C7.27587 2.03166 7.83815 1.97184 8.38846 2.03166C8.42817 2.03686 8.46777 2.04264 8.50725 2.04899C8.69007 1.7224 8.91737 1.42408 9.18095 1.16222C8.95341 1.10142 8.7207 1.05602 8.48417 1.02673C7.79029 0.954953 7.08445 1.02673 6.4145 1.25404C5.74455 1.46938 5.13441 1.82828 4.61999 2.30682C4.10556 2.77339 3.68684 3.34764 3.41168 3.9817C3.13652 4.61576 2.981 5.29767 2.981 6.00351V8.20478C2.981 9.00633 2.8494 9.80788 2.59817 10.5735L2 12.3441L2.47854 13.0021H5.98382C5.98382 13.5285 6.19916 14.0429 6.57002 14.4138C6.94089 14.7847 7.45532 15 7.98171 15C8.5081 15 9.02252 14.7847 9.39339 14.4138C9.76426 14.0429 9.9796 13.5285 9.9796 13.0021H13.4849L13.9634 12.3441L13.3772 10.5735C13.126 9.80788 12.9944 9.00633 12.9944 8.19282V7.87543ZM7.98171 14.019C8.2449 14.019 8.49613 13.9113 8.68755 13.7199C8.87896 13.5285 8.98663 13.2773 8.97467 13.0141H6.97678C6.97678 13.2773 7.08445 13.5285 7.27587 13.7199C7.46728 13.9113 7.71851 14.019 7.98171 14.019Z"},"child":[]},{"tag":"path","attr":{"d":"M12 7C13.6569 7 15 5.65685 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4C9 5.65685 10.3431 7 12 7Z"},"child":[]}]})(props);
};
function VscBellSlashDot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.61674 1.04489C8.2822 1.32437 7.98886 1.65152 7.74718 2.01591C7.40714 2.03594 7.06782 2.10101 6.73751 2.21111C6.21112 2.3786 5.72062 2.66572 5.3019 3.04855C4.88318 3.41942 4.56017 3.87403 4.33287 4.38845C4.10556 4.89092 3.98593 5.44123 3.98593 6.00351V8.20478C3.98593 8.81957 3.91482 9.43435 3.78 10.038L2.26841 11.5496L2.59817 10.5735C2.8494 9.80788 2.981 9.00633 2.981 8.20478V6.00351C2.981 5.29767 3.13653 4.61576 3.41168 3.9817C3.68684 3.34764 4.10556 2.77339 4.61999 2.30682C5.13442 1.82828 5.74455 1.46938 6.4145 1.25404C7.08445 1.02673 7.79029 0.954953 8.48417 1.02673C8.5285 1.03222 8.57269 1.03828 8.61674 1.04489ZM13.0142 8.73891C12.6984 8.8517 12.3664 8.93021 12.0226 8.96998C12.0807 9.62589 12.2157 10.2766 12.4321 10.9085L12.803 12.0211H6.31835L5.33735 13.0021H5.98382C5.98382 13.5285 6.19916 14.0429 6.57002 14.4138C6.94089 14.7847 7.45532 15 7.98171 15C8.5081 15 9.02252 14.7847 9.39339 14.4138C9.76426 14.0429 9.9796 13.5285 9.9796 13.0021H13.4849L13.9634 12.3441L13.3772 10.5735C13.1824 9.97985 13.0595 9.3646 13.0142 8.73891ZM8.68755 13.7199C8.49613 13.9113 8.2449 14.019 7.98171 14.019C7.71851 14.019 7.46728 13.9113 7.27587 13.7199C7.08445 13.5285 6.97678 13.2773 6.97678 13.0141H8.97467C8.98663 13.2773 8.87896 13.5285 8.68755 13.7199Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15.2486 1.66567C15.0528 1.39375 14.8238 1.1474 14.5674 0.932596L15.1421 0.35791L15.8492 1.06502L15.2486 1.66567ZM8.9326 6.56745L1 14.5L1.70711 15.2072L9.66567 7.24859C9.39375 7.05285 9.1474 6.82381 8.9326 6.56745Z"},"child":[]},{"tag":"path","attr":{"d":"M12 7C13.6569 7 15 5.65685 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4C9 5.65685 10.3431 7 12 7Z"},"child":[]}]})(props);
};
function VscBellSlash (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.0268 2.08559C10.2949 1.51028 9.41936 1.14252 8.48416 1.02673C7.79028 0.954953 7.08444 1.02673 6.41449 1.25404C5.74454 1.46938 5.13441 1.82828 4.61998 2.30682C4.10555 2.77339 3.68683 3.34764 3.41168 3.9817C3.13652 4.61576 2.98099 5.29767 2.98099 6.00351V8.20478C2.98099 8.97587 2.85921 9.74697 2.62628 10.4861L3.92646 9.18593C3.96573 8.86 3.98592 8.53239 3.98592 8.20478V6.00351C3.98592 5.44123 4.10555 4.89092 4.33286 4.38845C4.56016 3.87403 4.88318 3.41942 5.30189 3.04855C5.72061 2.66572 6.21111 2.3786 6.7375 2.21111C7.27586 2.03166 7.83814 1.97184 8.38846 2.03166C9.08536 2.12292 9.74775 2.39254 10.3078 2.80461L11.0268 2.08559ZM7.02379 12.0211H12.803L12.4321 10.9085C12.133 10.0352 11.9894 9.12596 11.9894 8.21674V7.05545L12.9938 6.05112C12.9946 6.099 12.9948 6.14694 12.9944 6.19493V8.19282C12.9944 9.00633 13.126 9.80788 13.3772 10.5735L13.9634 12.3441L13.4849 13.0021H9.97959C9.97959 13.5285 9.76425 14.0429 9.39338 14.4138C9.02252 14.7847 8.50809 15 7.9817 15C7.45531 15 6.94088 14.7847 6.57002 14.4138C6.21281 14.0566 5.99988 13.5662 5.98468 13.0602L7.02379 12.0211ZM7.9817 14.019C8.24489 14.019 8.49613 13.9113 8.68754 13.7199C8.87896 13.5285 8.98663 13.2773 8.97466 13.0141H6.97677C6.97677 13.2773 7.08444 13.5285 7.27586 13.7199C7.46727 13.9113 7.7185 14.019 7.9817 14.019Z"},"child":[]},{"tag":"rect","attr":{"x":"1","y":"14.5","width":"20","height":"1","transform":"rotate(-45 1 14.5)"},"child":[]}]})(props);
};
function VscBell (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.377 10.573a7.63 7.63 0 0 1-.383-2.38V6.195a5.115 5.115 0 0 0-1.268-3.446 5.138 5.138 0 0 0-3.242-1.722c-.694-.072-1.4 0-2.07.227-.67.215-1.28.574-1.794 1.053a4.923 4.923 0 0 0-1.208 1.675 5.067 5.067 0 0 0-.431 2.022v2.2a7.61 7.61 0 0 1-.383 2.37L2 12.343l.479.658h3.505c0 .526.215 1.04.586 1.412.37.37.885.586 1.412.586.526 0 1.04-.215 1.411-.586s.587-.886.587-1.412h3.505l.478-.658-.586-1.77zm-4.69 3.147a.997.997 0 0 1-.705.299.997.997 0 0 1-.706-.3.997.997 0 0 1-.3-.705h1.999a.939.939 0 0 1-.287.706zm-5.515-1.71l.371-1.114a8.633 8.633 0 0 0 .443-2.691V6.004c0-.563.12-1.113.347-1.616.227-.514.55-.969.969-1.34.419-.382.91-.67 1.436-.837.538-.18 1.1-.24 1.65-.18a4.147 4.147 0 0 1 2.597 1.4 4.133 4.133 0 0 1 1.004 2.776v2.01c0 .909.144 1.818.443 2.691l.371 1.113h-9.63v-.012z"},"child":[]}]})(props);
};
function VscBlank (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[]})(props);
};
function VscBold (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5 13V3h3.362c1.116 0 1.954.224 2.515.673.565.449.848 1.113.848 1.992 0 .467-.137.881-.41 1.243-.273.357-.645.634-1.116.831.556.151.993.44 1.314.865.325.422.487.925.487 1.511 0 .898-.299 1.603-.897 2.116-.598.513-1.443.769-2.536.769H5zm1.356-4.677v3.599h2.24c.63 0 1.127-.158 1.49-.474.367-.32.55-.76.55-1.319 0-1.204-.673-1.806-2.02-1.806h-2.26zm0-1.058h2.049c.593 0 1.066-.144 1.42-.433.357-.288.536-.68.536-1.174 0-.55-.165-.948-.494-1.195-.33-.252-.831-.378-1.505-.378H6.356v3.18z"},"child":[]}]})(props);
};
function VscBook (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z"},"child":[]}]})(props);
};
function VscBookmark (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M12.5 1h-9l-.5.5v13l.872.335L8 10.247l4.128 4.588L13 14.5v-13l-.5-.5zM12 13.2L8.372 9.165h-.744L4 13.2V2h8v11.2z"},"child":[]}]})(props);
};
function VscBracketDot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 2.97184V2.98361H5.91083C5.71113 2.98361 5.5238 3.02427 5.34802 3.10513C5.17461 3.18275 5.02193 3.28942 4.89086 3.42437C4.76421 3.55475 4.66135 3.71034 4.58238 3.89205C4.50833 4.07152 4.47134 4.26019 4.47134 4.45902C4.47134 4.68725 4.4753 4.9134 4.48321 5.13749C4.49125 5.36105 4.49127 5.58262 4.48324 5.80219C4.47914 6.01973 4.46082 6.2333 4.42826 6.44285C4.39513 6.65175 4.33913 6.85263 4.26039 7.04464C4.18091 7.23843 4.07258 7.42254 3.93616 7.59702C3.82345 7.74119 3.68538 7.87538 3.52283 8C3.68538 8.12462 3.82345 8.25881 3.93616 8.40298C4.07258 8.57746 4.18091 8.76157 4.26039 8.95536C4.33921 9.14757 4.39513 9.35024 4.42823 9.56312C4.46084 9.76883 4.47914 9.98246 4.48324 10.2039C4.49127 10.4195 4.49125 10.6411 4.48321 10.8686C4.4753 11.0885 4.47134 11.3127 4.47134 11.541C4.47134 11.744 4.50838 11.9346 4.58223 12.1137C4.66104 12.2911 4.76386 12.4469 4.89086 12.5818C5.02194 12.7126 5.17396 12.8191 5.34763 12.9008C5.52346 12.9777 5.71095 13.0164 5.91083 13.0164H6V13.2V14H5.91083C5.59743 14 5.29407 13.9384 5.00128 13.8153C4.70818 13.692 4.44942 13.5153 4.22578 13.285C4.00311 13.0558 3.83793 12.805 3.73283 12.5323L3.73232 12.531C3.63387 12.265 3.56819 11.9903 3.53535 11.7072L3.53516 11.7055C3.50677 11.4215 3.4987 11.1316 3.51084 10.8357C3.52272 10.5462 3.52866 10.2567 3.52866 9.96721C3.52866 9.76883 3.48986 9.58047 3.41201 9.40108L3.41129 9.39942C3.33659 9.21871 3.23428 9.0637 3.10412 8.93352L3.10221 8.93161C2.97577 8.79762 2.82457 8.69157 2.64742 8.61396L2.64601 8.61334C2.47001 8.53238 2.28465 8.4918 2.08917 8.4918H2V8.4V7.6V7.5082H2.08917C2.28497 7.5082 2.4706 7.46954 2.64672 7.3925C2.82466 7.31055 2.97644 7.20405 3.10317 7.07359C3.23423 6.93866 3.33687 6.78296 3.4116 6.60601L3.412 6.60507C3.48974 6.42594 3.52866 6.23556 3.52866 6.03279C3.52866 5.74329 3.52272 5.45379 3.51084 5.16428C3.4987 4.86844 3.50678 4.5805 3.53519 4.30053L3.53533 4.29917C3.56814 4.01201 3.63382 3.7352 3.73233 3.46898L3.73282 3.46766C3.83792 3.19498 4.00311 2.94422 4.22578 2.71498C4.44942 2.48474 4.70818 2.30798 5.00128 2.18473C5.29407 2.06161 5.59743 2 5.91083 2H6V2.97184ZM13.9232 8.4918H14V8.4V7.6V7.5082H13.9108C13.7153 7.5082 13.53 7.46762 13.354 7.38666L13.3526 7.38604C13.1754 7.30844 13.0242 7.20238 12.8978 7.06839L12.8959 7.06648C12.7657 6.9363 12.6634 6.78129 12.5887 6.60058L12.588 6.59892C12.5101 6.41953 12.4713 6.23117 12.4713 6.03279C12.4713 5.74329 12.4773 5.45379 12.4892 5.16428C12.5013 4.86842 12.4932 4.57848 12.4648 4.29454L12.4646 4.29285C12.4318 4.00971 12.3661 3.73502 12.2677 3.46897L12.2672 3.46766C12.1621 3.19499 11.9969 2.94422 11.7742 2.71498C11.5506 2.48474 11.2918 2.30798 10.9987 2.18473C10.7059 2.06161 10.4026 2 10.0892 2H10V2.8V2.98361H10.0892C10.2891 2.98361 10.4765 3.0223 10.6524 3.09917C10.826 3.18092 10.9781 3.28736 11.1091 3.41823C11.2361 3.55305 11.339 3.70889 11.4178 3.88628C11.4916 4.0654 11.5287 4.25596 11.5287 4.45902C11.5287 4.68727 11.5247 4.91145 11.5168 5.13142C11.5088 5.35894 11.5087 5.58049 11.5168 5.79605C11.5209 6.01754 11.5392 6.23117 11.5718 6.43688C11.6049 6.64976 11.6608 6.85243 11.7396 7.04464C11.8191 7.23843 11.9274 7.42254 12.0638 7.59702C12.1765 7.74119 12.3146 7.87538 12.4772 8C12.4666 8.00814 12.456 8.01632 12.4456 8.02455C12.9764 8.08338 13.4758 8.24605 13.9232 8.4918Z"},"child":[]},{"tag":"path","attr":{"d":"M12 9C11.4067 9 10.8266 9.17595 10.3333 9.50559C9.83994 9.83524 9.45543 10.3038 9.22836 10.8519C9.0013 11.4001 8.94189 12.0033 9.05765 12.5853C9.1734 13.1672 9.45912 13.7018 9.87868 14.1213C10.2982 14.5409 10.8328 14.8266 11.4147 14.9424C11.9967 15.0581 12.5999 14.9987 13.1481 14.7716C13.6962 14.5446 14.1648 14.1601 14.4944 13.6667C14.8241 13.1734 15 12.5933 15 12C14.999 11.2047 14.6826 10.4422 14.1202 9.87976C13.5578 9.31736 12.7954 9.00098 12 9Z"},"child":[]}]})(props);
};
function VscBracketError (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 2.97184V2.98361H5.91083C5.71113 2.98361 5.5238 3.02427 5.34802 3.10513C5.17461 3.18275 5.02193 3.28942 4.89086 3.42437C4.76421 3.55475 4.66135 3.71034 4.58238 3.89205C4.50833 4.07152 4.47134 4.26019 4.47134 4.45902C4.47134 4.68725 4.4753 4.9134 4.48321 5.13749C4.49125 5.36105 4.49127 5.58262 4.48324 5.80219C4.47914 6.01973 4.46082 6.2333 4.42826 6.44285C4.39513 6.65175 4.33913 6.85263 4.26039 7.04464C4.18091 7.23843 4.07258 7.42254 3.93616 7.59702C3.82345 7.74119 3.68538 7.87538 3.52283 8C3.68538 8.12462 3.82345 8.25881 3.93616 8.40298C4.07258 8.57746 4.18091 8.76157 4.26039 8.95536C4.33921 9.14757 4.39513 9.35024 4.42823 9.56312C4.46084 9.76883 4.47914 9.98246 4.48324 10.2039C4.49127 10.4195 4.49125 10.6411 4.48321 10.8686C4.4753 11.0885 4.47134 11.3127 4.47134 11.541C4.47134 11.744 4.50838 11.9346 4.58223 12.1137C4.66104 12.2911 4.76386 12.4469 4.89086 12.5818C5.02194 12.7126 5.17396 12.8191 5.34763 12.9008C5.52346 12.9777 5.71095 13.0164 5.91083 13.0164H6V13.2V14H5.91083C5.59743 14 5.29407 13.9384 5.00128 13.8153C4.70818 13.692 4.44942 13.5153 4.22578 13.285C4.00311 13.0558 3.83793 12.805 3.73283 12.5323L3.73232 12.531C3.63387 12.265 3.56819 11.9903 3.53535 11.7072L3.53516 11.7055C3.50677 11.4215 3.4987 11.1316 3.51084 10.8357C3.52272 10.5462 3.52866 10.2567 3.52866 9.96721C3.52866 9.76883 3.48986 9.58047 3.41201 9.40108L3.41129 9.39942C3.33659 9.21871 3.23428 9.0637 3.10412 8.93352L3.10221 8.93161C2.97577 8.79762 2.82457 8.69157 2.64742 8.61396L2.64601 8.61334C2.47001 8.53238 2.28465 8.4918 2.08917 8.4918H2V8.4V7.6V7.5082H2.08917C2.28497 7.5082 2.4706 7.46954 2.64672 7.3925C2.82466 7.31055 2.97644 7.20405 3.10317 7.07359C3.23423 6.93866 3.33687 6.78296 3.4116 6.60601L3.412 6.60507C3.48974 6.42594 3.52866 6.23556 3.52866 6.03279C3.52866 5.74329 3.52272 5.45379 3.51084 5.16428C3.4987 4.86844 3.50678 4.5805 3.53519 4.30053L3.53533 4.29917C3.56814 4.01201 3.63382 3.7352 3.73233 3.46898L3.73282 3.46766C3.83792 3.19498 4.00311 2.94422 4.22578 2.71498C4.44942 2.48474 4.70818 2.30798 5.00128 2.18473C5.29407 2.06161 5.59743 2 5.91083 2H6V2.97184ZM13.9232 8.4918H14V8.4V7.6V7.5082H13.9108C13.7153 7.5082 13.53 7.46762 13.354 7.38666L13.3526 7.38604C13.1754 7.30844 13.0242 7.20238 12.8978 7.06839L12.8959 7.06648C12.7657 6.9363 12.6634 6.78129 12.5887 6.60058L12.588 6.59892C12.5101 6.41953 12.4713 6.23117 12.4713 6.03279C12.4713 5.74329 12.4773 5.45379 12.4892 5.16428C12.5013 4.86842 12.4932 4.57848 12.4648 4.29454L12.4646 4.29285C12.4318 4.00971 12.3661 3.73502 12.2677 3.46897L12.2672 3.46766C12.1621 3.19499 11.9969 2.94422 11.7742 2.71498C11.5506 2.48474 11.2918 2.30798 10.9987 2.18473C10.7059 2.06161 10.4026 2 10.0892 2H10V2.8V2.98361H10.0892C10.2891 2.98361 10.4765 3.0223 10.6524 3.09917C10.826 3.18092 10.9781 3.28736 11.1091 3.41823C11.2361 3.55305 11.339 3.70889 11.4178 3.88628C11.4916 4.0654 11.5287 4.25596 11.5287 4.45902C11.5287 4.68727 11.5247 4.91145 11.5168 5.13142C11.5088 5.35894 11.5087 5.58049 11.5168 5.79605C11.5209 6.01754 11.5392 6.23117 11.5718 6.43688C11.6049 6.64976 11.6608 6.85243 11.7396 7.04464C11.8191 7.23843 11.9274 7.42254 12.0638 7.59702C12.1765 7.74119 12.3146 7.87538 12.4772 8L12.4456 8.02455C12.9764 8.08338 13.4758 8.24605 13.9232 8.4918Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.3333 9.50559C10.8266 9.17595 11.4067 9 12 9C12.7954 9.00098 13.5578 9.31736 14.1202 9.87976C14.6826 10.4422 14.999 11.2047 15 12C15 12.5933 14.8241 13.1734 14.4944 13.6667C14.1648 14.1601 13.6962 14.5446 13.1481 14.7716C12.5999 14.9987 11.9967 15.0581 11.4147 14.9424C10.8328 14.8266 10.2982 14.5409 9.87868 14.1213C9.45912 13.7018 9.1734 13.1672 9.05765 12.5853C8.94189 12.0033 9.0013 11.4001 9.22836 10.8519C9.45543 10.3038 9.83994 9.83524 10.3333 9.50559ZM13.1464 10.1464L12 11.2929L10.8536 10.1464L10.1465 10.8535L11.2929 12L10.1464 13.1464L10.8536 13.8536L12 12.7071L13.1465 13.8535L13.8536 13.1464L12.7071 12L13.8536 10.8536L13.1464 10.1464Z"},"child":[]}]})(props);
};
function VscBriefcase (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.5 4H11V2.5l-.5-.5h-5l-.5.5V4H1.5l-.5.5v8l.5.5h13l.5-.5v-8l-.5-.5zM6 3h4v1H6V3zm8 2v.76L10 8v-.5L9.51 7h-3L6 7.5V8L2 5.71V5h12zM9 8v1H7V8h2zm-7 4V6.86l4 2.29v.35l.5.5h3l.5-.5v-.31l4-2.28V12H2z"},"child":[]}]})(props);
};
function VscBroadcast (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.667 2.011A6 6 0 0 1 8 1a6.007 6.007 0 0 1 6 6 6 6 0 0 1-3.996 5.655v-.044c.016-.014.031-.03.046-.045a1.48 1.48 0 0 0 .434-1.046v-.137A5.042 5.042 0 0 0 12.19 4.2a5.04 5.04 0 1 0-6.69 7.176v.144a1.48 1.48 0 0 0 .48 1.09v.04A5.999 5.999 0 0 1 4.667 2.01z"},"child":[]},{"tag":"path","attr":{"d":"M9.343 11.86a.48.48 0 0 1-.34.14v2.52a.48.48 0 0 1-.48.48H7.46c.011 0-.004-.004-.034-.012-.075-.02-.241-.064-.305-.129a.48.48 0 0 1-.141-.34V12a.48.48 0 0 1-.48-.48V9.5a1 1 0 0 1 1-1h.984a1 1 0 0 1 1 1v2.02a.48.48 0 0 1-.137.335l-.004.004z"},"child":[]},{"tag":"path","attr":{"d":"M10.64 7c0 .525-.157 1.034-.445 1.465.183.302.289.656.289 1.035v.106a3.596 3.596 0 0 0 .06-5.15A3.6 3.6 0 1 0 5.5 9.59V9.5c0-.384.108-.743.296-1.047A2.64 2.64 0 1 1 10.64 7z"},"child":[]},{"tag":"path","attr":{"d":"M9 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"},"child":[]}]})(props);
};
function VscBrowser (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h13l.5.5v12l-.5.5h-13l-.5-.5v-12l.5-.5zM2 5v8h12V5H2zm0-1h12V2H2v2z"},"child":[]}]})(props);
};
function VscBug (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.877 4.5v-.582a2.918 2.918 0 1 0-5.836 0V4.5h-.833L2.545 2.829l-.593.59 1.611 1.619-.019.049a8.03 8.03 0 0 0-.503 2.831c0 .196.007.39.02.58l.003.045H1v.836h2.169l.006.034c.172.941.504 1.802.954 2.531l.034.055L2.2 13.962l.592.592 1.871-1.872.058.066c.868.992 2.002 1.589 3.238 1.589 1.218 0 2.336-.579 3.199-1.544l.057-.064 1.91 1.92.593-.591-1.996-2.006.035-.056c.467-.74.81-1.619.986-2.583l.006-.034h2.171v-.836h-2.065l.003-.044a8.43 8.43 0 0 0 .02-.58 8.02 8.02 0 0 0-.517-2.866l-.019-.05 1.57-1.57-.592-.59L11.662 4.5h-.785zm-5 0v-.582a2.082 2.082 0 1 1 4.164 0V4.5H5.878zm5.697.837l.02.053c.283.753.447 1.61.447 2.528 0 1.61-.503 3.034-1.274 4.037-.77 1.001-1.771 1.545-2.808 1.545-1.036 0-2.037-.544-2.807-1.545-.772-1.003-1.275-2.427-1.275-4.037 0-.918.164-1.775.448-2.528l.02-.053h7.229z"},"child":[]}]})(props);
};
function VscCalendar (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z"},"child":[]}]})(props);
};
function VscCallIncoming (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.547 9.328a1.567 1.567 0 0 0-.594-.117 1.202 1.202 0 0 0-.555.101 2.762 2.762 0 0 0-.43.258 2.166 2.166 0 0 0-.359.328c-.104.12-.205.23-.304.329a2.409 2.409 0 0 1-.29.25.534.534 0 0 1-.695-.063 32.17 32.17 0 0 1-.328-.312c-.14-.136-.312-.3-.515-.493A61.776 61.776 0 0 1 7.844 9l-.68-.664a25.847 25.847 0 0 1-1.21-1.266 5.312 5.312 0 0 1-.391-.484c-.094-.135-.141-.234-.141-.297a.46.46 0 0 1 .101-.312c.073-.094.16-.19.258-.29.1-.098.209-.203.328-.312.12-.11.23-.227.329-.352.098-.125.182-.268.25-.43.067-.16.101-.343.101-.546a1.567 1.567 0 0 0-.453-1.102 7.604 7.604 0 0 1-.531-.578 6.487 6.487 0 0 0-.617-.64 4.207 4.207 0 0 0-.696-.516A1.46 1.46 0 0 0 3.742 1a1.567 1.567 0 0 0-1.101.453c-.271.271-.508.513-.711.727a4.006 4.006 0 0 0-.516.664 2.63 2.63 0 0 0-.312.765A4.39 4.39 0 0 0 1 4.625c0 .552.089 1.125.266 1.719.177.593.416 1.185.718 1.773.302.589.67 1.167 1.102 1.735.432.567.901 1.106 1.406 1.617.505.51 1.042.982 1.61 1.414.567.432 1.148.805 1.742 1.117.593.313 1.19.557 1.789.734a6.157 6.157 0 0 0 1.75.266 4.696 4.696 0 0 0 1.008-.11 2.59 2.59 0 0 0 .773-.312c.23-.14.45-.312.664-.515.214-.204.453-.438.719-.704A1.568 1.568 0 0 0 15 12.257a2.009 2.009 0 0 0-.102-.515 1.674 1.674 0 0 0-.257-.484 7.24 7.24 0 0 0-.368-.445 5.381 5.381 0 0 0-.421-.422 91.549 91.549 0 0 0-.43-.383 8.277 8.277 0 0 1-.367-.344 1.516 1.516 0 0 0-.508-.336zm-.367 4.586a3.13 3.13 0 0 1-.797.086 5.526 5.526 0 0 1-1.516-.242 8.362 8.362 0 0 1-1.586-.664 13.205 13.205 0 0 1-3.047-2.297 17.15 17.15 0 0 1-1.289-1.461 10.502 10.502 0 0 1-1.03-1.578 9.12 9.12 0 0 1-.673-1.61A5.308 5.308 0 0 1 2 4.602a3.34 3.34 0 0 1 .094-.79c.057-.218.143-.414.258-.585.114-.172.255-.339.421-.5.167-.162.357-.35.57-.563a.542.542 0 0 1 .4-.164c.062-.005.158.036.288.125.13.089.271.195.422.32a7.058 7.058 0 0 1 .899.899c.125.15.229.289.312.414.083.125.125.221.125.289a.429.429 0 0 1-.101.312c-.073.084-.16.18-.258.29-.1.109-.209.213-.328.312-.12.099-.23.216-.329.351a2.266 2.266 0 0 0-.25.438 1.345 1.345 0 0 0-.101.54c.005.213.047.413.125.6.078.188.19.355.336.5l3.726 3.727a1.527 1.527 0 0 0 1.102.46 1.2 1.2 0 0 0 .547-.1 2.414 2.414 0 0 0 .789-.586c.11-.12.21-.23.305-.329.093-.098.19-.182.289-.25a.545.545 0 0 1 .312-.101c.073 0 .172.042.297.125.125.083.263.19.414.32.151.13.307.274.469.43.161.156.305.312.43.469.124.156.229.297.312.422.083.125.125.22.125.289a.533.533 0 0 1-.164.39c-.224.219-.414.41-.57.57a3.159 3.159 0 0 1-.5.422 1.93 1.93 0 0 1-.586.266zM15 1.704l-4.64 4.648h3.288v1h-5v-5h1V5.64L14.297 1l.703.703z"},"child":[]}]})(props);
};
function VscCallOutgoing (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.648 6.648L13.29 2H10V1h5v5h-1V2.71L9.352 7.353l-.704-.704zm3.305 2.563a1.567 1.567 0 0 1 1.102.453c.11.11.232.224.367.344l.43.383c.15.135.291.276.421.421.13.146.253.295.368.446.114.15.2.312.257.484.058.172.092.344.102.516a1.568 1.568 0 0 1-.453 1.101c-.266.266-.505.5-.719.704a4.006 4.006 0 0 1-.664.515c-.23.14-.487.245-.773.313a4.696 4.696 0 0 1-1.008.109 6.157 6.157 0 0 1-1.75-.266A9.819 9.819 0 0 1 7.843 14a12.445 12.445 0 0 1-1.741-1.117 15.329 15.329 0 0 1-1.61-1.414c-.505-.51-.974-1.05-1.406-1.617a11.64 11.64 0 0 1-1.102-1.735 10.38 10.38 0 0 1-.718-1.773A6.005 6.005 0 0 1 1 4.625c0-.396.034-.734.102-1.016a2.63 2.63 0 0 1 .312-.765c.14-.23.313-.45.516-.664.203-.214.44-.456.71-.727A1.567 1.567 0 0 1 3.743 1c.26 0 .51.07.75.21.24.142.472.313.696.517.223.203.43.416.617.64.187.224.364.417.53.578a1.567 1.567 0 0 1 .453 1.102 1.4 1.4 0 0 1-.1.547 1.824 1.824 0 0 1-.25.43 2.983 2.983 0 0 1-.329.351c-.12.11-.229.214-.328.313a3.128 3.128 0 0 0-.258.289.46.46 0 0 0-.101.312c0 .063.047.162.14.297a5.3 5.3 0 0 0 .391.484 24.386 24.386 0 0 0 1.211 1.266c.234.23.461.45.68.664.218.214.43.417.633.61.203.192.375.356.515.492.14.135.25.24.328.312a.534.534 0 0 0 .696.063c.093-.068.19-.152.289-.25.099-.1.2-.209.304-.329.104-.12.224-.229.36-.328.135-.099.278-.185.43-.258a1.21 1.21 0 0 1 .554-.101zM11.383 14c.318 0 .583-.029.797-.086a1.93 1.93 0 0 0 .586-.266c.177-.12.343-.26.5-.421.156-.162.346-.352.57-.57.11-.11.164-.24.164-.391 0-.068-.042-.164-.125-.29a6.122 6.122 0 0 0-.313-.421 5.01 5.01 0 0 0-.43-.47c-.16-.155-.317-.299-.468-.429a4.322 4.322 0 0 0-.414-.32c-.125-.083-.224-.125-.297-.125a.545.545 0 0 0-.312.101 1.801 1.801 0 0 0-.29.25c-.093.1-.195.209-.304.329-.11.12-.23.229-.36.328-.13.099-.273.185-.43.258a1.208 1.208 0 0 1-.546.101 1.527 1.527 0 0 1-1.102-.46L4.883 7.39a1.537 1.537 0 0 1-.336-.5 1.655 1.655 0 0 1-.125-.602c0-.203.034-.383.101-.539.068-.156.151-.302.25-.438.1-.135.209-.252.329-.351.12-.099.229-.203.328-.313.099-.109.185-.205.258-.289a.429.429 0 0 0 .101-.312c0-.068-.042-.164-.125-.29a5.085 5.085 0 0 0-.312-.413 6.791 6.791 0 0 0-.43-.469 6.787 6.787 0 0 0-.469-.43 5.674 5.674 0 0 0-.422-.32c-.13-.089-.226-.13-.289-.125a.542.542 0 0 0-.398.164 65.24 65.24 0 0 1-.57.563 3.073 3.073 0 0 0-.422.5 1.9 1.9 0 0 0-.258.586A3.377 3.377 0 0 0 2 4.601c0 .5.08 1.015.242 1.546a9.12 9.12 0 0 0 .672 1.61c.287.541.63 1.068 1.031 1.578.401.51.831.997 1.29 1.46a13.205 13.205 0 0 0 3.046 2.298 8.37 8.37 0 0 0 1.586.664 5.526 5.526 0 0 0 1.516.242z"},"child":[]}]})(props);
};
function VscCaseSensitive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.85352 11.7021H7.85449L7.03809 9.54297H3.77246L3.00439 11.7021H2L4.9541 4H5.88867L8.85352 11.7021ZM6.74268 8.73193L5.53418 5.4502C5.49479 5.34277 5.4554 5.1709 5.41602 4.93457H5.39453C5.35872 5.15299 5.31755 5.32487 5.271 5.4502L4.07324 8.73193H6.74268Z"},"child":[]},{"tag":"path","attr":{"d":"M13.756 11.7021H12.8752V10.8428H12.8537C12.4706 11.5016 11.9066 11.8311 11.1618 11.8311C10.6139 11.8311 10.1843 11.686 9.87273 11.396C9.56479 11.106 9.41082 10.721 9.41082 10.2412C9.41082 9.21354 10.016 8.61556 11.2262 8.44727L12.8752 8.21631C12.8752 7.28174 12.4974 6.81445 11.7419 6.81445C11.0794 6.81445 10.4815 7.04004 9.94793 7.49121V6.58887C10.4886 6.24512 11.1117 6.07324 11.8171 6.07324C13.1097 6.07324 13.756 6.75716 13.756 8.125V11.7021ZM12.8752 8.91992L11.5485 9.10254C11.1403 9.15983 10.8324 9.26188 10.6247 9.40869C10.417 9.55192 10.3132 9.80794 10.3132 10.1768C10.3132 10.4453 10.4081 10.6655 10.5978 10.8374C10.7912 11.0057 11.0472 11.0898 11.3659 11.0898C11.8027 11.0898 12.1626 10.9377 12.4455 10.6333C12.7319 10.3254 12.8752 9.93685 12.8752 9.46777V8.91992Z"},"child":[]}]})(props);
};
function VscCheckAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15.62 3.596L7.815 12.81l-.728-.033L4 8.382l.754-.53 2.744 3.907L14.917 3l.703.596z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.234 8.774l4.386-5.178L10.917 3l-4.23 4.994.547.78zm-1.55.403l.548.78-.547-.78zm-1.617 1.91l.547.78-.799.943-.728-.033L0 8.382l.754-.53 2.744 3.907.57-.672z"},"child":[]}]})(props);
};
function VscCheck (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"},"child":[]}]})(props);
};
function VscChecklist (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.75 4.48h-.71L2 3.43l.71-.7.69.68L4.81 2l.71.71-1.77 1.77zM6.99 3h8v1h-8V3zm0 3h8v1h-8V6zm8 3h-8v1h8V9zm-8 3h8v1h-8v-1zM3.04 7.48h.71l1.77-1.77-.71-.7L3.4 6.42l-.69-.69-.71.71 1.04 1.04zm.71 3.01h-.71L2 9.45l.71-.71.69.69 1.41-1.42.71.71-1.77 1.77zm-.71 3.01h.71l1.77-1.77-.71-.71-1.41 1.42-.69-.69-.71.7 1.04 1.05z"},"child":[]}]})(props);
};
function VscChevronDown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"},"child":[]}]})(props);
};
function VscChevronLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.928 7.976l4.357 4.357-.618.62L5 8.284v-.618L9.667 3l.618.619-4.357 4.357z"},"child":[]}]})(props);
};
function VscChevronRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.072 8.024L5.715 3.667l.618-.62L11 7.716v.618L6.333 13l-.618-.619 4.357-4.357z"},"child":[]}]})(props);
};
function VscChevronUp (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.024 5.928l-4.357 4.357-.62-.618L7.716 5h.618L13 9.667l-.619.618-4.357-4.357z"},"child":[]}]})(props);
};
function VscChip (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 1H6V3H7V1H8V3H9V1H10V3H11L12 4V5L14 5V6H12V7L14 7V8H12V9L14 9V10H12V11L11 12H10V14H9V12H8V14H7V12H6V14H5V12H4L3 11L3 10H1V9L3 9L3 8H1V7L3 7L3 6H1V5L3 5L3 4L4 3H5L5 1ZM4 11H11V4L4 4L4 11Z"},"child":[]}]})(props);
};
function VscChromeClose (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"},"child":[]}]})(props);
};
function VscChromeMaximize (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3 3v10h10V3H3zm9 9H4V4h8v8z"},"child":[]}]})(props);
};
function VscChromeMinimize (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 8v1H3V8h11z"},"child":[]}]})(props);
};
function VscChromeRestore (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3 5v9h9V5H3zm8 8H4V6h7v7z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 5h1V4h7v7h-1v1h2V3H5v2z"},"child":[]}]})(props);
};
function VscCircleFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 4c.367 0 .721.048 1.063.145a3.943 3.943 0 0 1 1.762 1.031 3.944 3.944 0 0 1 1.03 1.762c.097.34.145.695.145 1.062 0 .367-.048.721-.145 1.063a3.94 3.94 0 0 1-1.03 1.765 4.017 4.017 0 0 1-1.762 1.031C8.72 11.953 8.367 12 8 12s-.721-.047-1.063-.14a4.056 4.056 0 0 1-1.765-1.032A4.055 4.055 0 0 1 4.14 9.062 3.992 3.992 0 0 1 4 8c0-.367.047-.721.14-1.063a4.02 4.02 0 0 1 .407-.953A4.089 4.089 0 0 1 5.98 4.546a3.94 3.94 0 0 1 .957-.401A3.89 3.89 0 0 1 8 4z"},"child":[]}]})(props);
};
function VscCircleLargeFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 1a6.8 6.8 0 0 1 1.86.253 6.899 6.899 0 0 1 3.083 1.805 6.903 6.903 0 0 1 1.804 3.083C14.916 6.738 15 7.357 15 8s-.084 1.262-.253 1.86a6.9 6.9 0 0 1-.704 1.674 7.157 7.157 0 0 1-2.516 2.509 6.966 6.966 0 0 1-1.668.71A6.984 6.984 0 0 1 8 15a6.984 6.984 0 0 1-1.86-.246 7.098 7.098 0 0 1-1.674-.711 7.3 7.3 0 0 1-1.415-1.094 7.295 7.295 0 0 1-1.094-1.415 7.098 7.098 0 0 1-.71-1.675A6.985 6.985 0 0 1 1 8c0-.643.082-1.262.246-1.86a6.968 6.968 0 0 1 .711-1.667 7.156 7.156 0 0 1 2.509-2.516 6.895 6.895 0 0 1 1.675-.704A6.808 6.808 0 0 1 8 1z"},"child":[]}]})(props);
};
function VscCircleLarge (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.588 2.215A5.808 5.808 0 0 0 8 2c-.554 0-1.082.073-1.588.215l-.006.002c-.514.141-.99.342-1.432.601A6.156 6.156 0 0 0 2.82 4.98l-.002.004A5.967 5.967 0 0 0 2.21 6.41 5.986 5.986 0 0 0 2 8c0 .555.07 1.085.21 1.591a6.05 6.05 0 0 0 1.548 2.651c.37.365.774.677 1.216.94a6.1 6.1 0 0 0 1.435.609A6.02 6.02 0 0 0 8 14c.555 0 1.085-.07 1.591-.21.515-.145.99-.348 1.426-.607l.004-.002a6.16 6.16 0 0 0 2.161-2.155 5.85 5.85 0 0 0 .6-1.432l.003-.006A5.807 5.807 0 0 0 14 8c0-.554-.072-1.082-.215-1.588l-.002-.006a5.772 5.772 0 0 0-.6-1.423l-.002-.004a5.9 5.9 0 0 0-.942-1.21l-.008-.008a5.902 5.902 0 0 0-1.21-.942l-.004-.002a5.772 5.772 0 0 0-1.423-.6l-.006-.002zm4.455 9.32a7.157 7.157 0 0 1-2.516 2.508 6.966 6.966 0 0 1-1.668.71A6.984 6.984 0 0 1 8 15a6.984 6.984 0 0 1-1.86-.246 7.098 7.098 0 0 1-1.674-.711 7.3 7.3 0 0 1-1.415-1.094 7.295 7.295 0 0 1-1.094-1.415 7.098 7.098 0 0 1-.71-1.675A6.985 6.985 0 0 1 1 8c0-.643.082-1.262.246-1.86a6.968 6.968 0 0 1 .711-1.667 7.156 7.156 0 0 1 2.509-2.516 6.895 6.895 0 0 1 1.675-.704A6.808 6.808 0 0 1 8 1a6.8 6.8 0 0 1 1.86.253 6.899 6.899 0 0 1 3.083 1.805 6.903 6.903 0 0 1 1.804 3.083C14.916 6.738 15 7.357 15 8s-.084 1.262-.253 1.86a6.9 6.9 0 0 1-.704 1.674z"},"child":[]}]})(props);
};
function VscCircleSlash (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 1a7 7 0 1 1-7 7 7.008 7.008 0 0 1 7-7zM2 8c0 1.418.504 2.79 1.423 3.87l8.447-8.447A5.993 5.993 0 0 0 2 8zm12 0c0-1.418-.504-2.79-1.423-3.87L4.13 12.577A5.993 5.993 0 0 0 14 8z"},"child":[]}]})(props);
};
function VscCircleSmallFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"},"child":[]}]})(props);
};
function VscCircleSmall (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.83185 8.55551C8.72192 8.72004 8.56569 8.84825 8.38305 8.9239C8.20039 8.99956 7.99936 9.01936 7.80531 8.98076C7.61133 8.94218 7.43313 8.84693 7.29328 8.70708C7.15343 8.56723 7.05818 8.38903 7.01959 8.19505C6.98099 8.001 7.0008 7.79996 7.07646 7.6173C7.15211 7.43466 7.28032 7.27844 7.44484 7.16851C7.60928 7.05863 7.80256 7 8.00036 7C8.26552 7 8.51986 7.10535 8.70743 7.29292C8.89501 7.4805 9.00036 7.73484 9.00036 8C9.00036 8.19779 8.94172 8.39108 8.83185 8.55551ZM9.66332 9.11108C9.88308 8.78219 10.0004 8.39556 10.0004 8C10.0004 7.46957 9.78961 6.96089 9.41454 6.58582C9.03947 6.21074 8.53079 6 8.00036 6C7.60479 6 7.21817 6.11727 6.88927 6.33704C6.56037 6.5568 6.30395 6.86917 6.15258 7.23462C6.0012 7.60007 5.96164 8.00217 6.03881 8.39014C6.11598 8.7781 6.30647 9.13448 6.58617 9.41418C6.86588 9.69389 7.22226 9.88438 7.61022 9.96155C7.99818 10.0387 8.40028 9.99915 8.76574 9.84778C9.13119 9.6964 9.44356 9.43998 9.66332 9.11108Z"},"child":[]}]})(props);
};
function VscCircle (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm2.61-4a2.61 2.61 0 1 1-5.22 0 2.61 2.61 0 0 1 5.22 0zM8 5.246z"},"child":[]}]})(props);
};
function VscCircuitBoard (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.5 1h-13l-.5.5v13l.5.5h13l.5-.5v-13l-.5-.5zM14 14H5v-2h2.3c.3.6 1 1 1.7 1 1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2H4v3H2V2h2v2.3c-.6.3-1 1-1 1.7 0 1.1.9 2 2 2s2-.9 2-2h2c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.7 0-1.4.4-1.7 1H6.7c-.3-.6-1-1-1.7-1V2h9v12zm-6-3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zM5 5c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm6 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"},"child":[]}]})(props);
};
function VscClearAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10 12.6l.7.7 1.6-1.6 1.6 1.6.8-.7L13 11l1.7-1.6-.8-.8-1.6 1.7-1.6-1.7-.7.8 1.6 1.6-1.6 1.6zM1 4h14V3H1v1zm0 3h14V6H1v1zm8 2.5V9H1v1h8v-.5zM9 13v-1H1v1h8z"},"child":[]}]})(props);
};
function VscClippy (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7 13.992H4v-9h8v2h1v-2.5l-.5-.5H11v-1h-1a2 2 0 0 0-4 0H4.94v1H3.5l-.5.5v10l.5.5H7v-1zm0-11.2a1 1 0 0 1 .8-.8 1 1 0 0 1 .58.06.94.94 0 0 1 .45.36 1 1 0 1 1-1.75.94 1 1 0 0 1-.08-.56zm7.08 9.46L13 13.342v-5.35h-1v5.34l-1.08-1.08-.71.71 1.94 1.93h.71l1.93-1.93-.71-.71zm-5.92-4.16h.71l1.93 1.93-.71.71-1.08-1.08v5.34h-1v-5.35l-1.08 1.09-.71-.71 1.94-1.93z"},"child":[]}]})(props);
};
function VscCloseAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.621 8.086l-.707-.707L6.5 8.793 5.086 7.379l-.707.707L5.793 9.5l-1.414 1.414.707.707L6.5 10.207l1.414 1.414.707-.707L7.207 9.5l1.414-1.414z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"},"child":[]}]})(props);
};
function VscClose (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"},"child":[]}]})(props);
};
function VscCloudDownload (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.957 6h.05a2.99 2.99 0 0 1 2.116.879 3.003 3.003 0 0 1 0 4.242 2.99 2.99 0 0 1-2.117.879v-1a2.002 2.002 0 0 0 0-4h-.914l-.123-.857a2.49 2.49 0 0 0-2.126-2.122A2.478 2.478 0 0 0 6.231 5.5l-.333.762-.809-.189A2.49 2.49 0 0 0 4.523 6c-.662 0-1.297.263-1.764.732A2.503 2.503 0 0 0 4.523 11h.498v1h-.498a3.486 3.486 0 0 1-2.628-1.16 3.502 3.502 0 0 1 1.958-5.78 3.462 3.462 0 0 1 1.468.04 3.486 3.486 0 0 1 3.657-2.06A3.479 3.479 0 0 1 11.957 6zm-5.25 5.121l1.314 1.314V7h.994v5.4l1.278-1.279.707.707-2.146 2.147h-.708L6 11.829l.707-.708z"},"child":[]}]})(props);
};
function VscCloudUpload (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.956 6h.05a2.99 2.99 0 0 1 2.117.879 3.003 3.003 0 0 1 0 4.242 2.99 2.99 0 0 1-2.117.879h-1.995v-1h1.995a2.002 2.002 0 0 0 0-4h-.914l-.123-.857a2.49 2.49 0 0 0-2.126-2.122A2.478 2.478 0 0 0 6.23 5.5l-.333.762-.809-.189A2.49 2.49 0 0 0 4.523 6c-.662 0-1.297.263-1.764.732A2.503 2.503 0 0 0 4.523 11h2.494v1H4.523a3.486 3.486 0 0 1-2.628-1.16 3.502 3.502 0 0 1-.4-4.137A3.497 3.497 0 0 1 3.853 5.06c.486-.09.987-.077 1.468.041a3.486 3.486 0 0 1 3.657-2.06A3.479 3.479 0 0 1 11.956 6zm-1.663 3.853L8.979 8.54v5.436h-.994v-5.4L6.707 9.854 6 9.146 8.146 7h.708L11 9.146l-.707.707z"},"child":[]}]})(props);
};
function VscCloud (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.957 6h.05a2.99 2.99 0 0 1 2.116.879 3.003 3.003 0 0 1 0 4.242 2.99 2.99 0 0 1-2.117.879v-.013L12 12H4.523a3.486 3.486 0 0 1-2.628-1.16 3.502 3.502 0 0 1 1.958-5.78 3.462 3.462 0 0 1 1.468.04 3.486 3.486 0 0 1 3.657-2.06A3.479 3.479 0 0 1 11.957 6zM5 11h7.01a1.994 1.994 0 0 0 1.992-2 2.002 2.002 0 0 0-1.996-2h-.914l-.123-.857a2.49 2.49 0 0 0-2.126-2.122A2.478 2.478 0 0 0 6.231 5.5l-.333.762-.809-.189A2.49 2.49 0 0 0 4.523 6c-.662 0-1.297.263-1.764.732A2.503 2.503 0 0 0 4.523 11H5z"},"child":[]}]})(props);
};
function VscCodeOss (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5 2H6V13H5V2Z"},"child":[]},{"tag":"path","attr":{"d":"M7 3H11V4H7V3Z"},"child":[]},{"tag":"path","attr":{"d":"M9 5H13V6H9V5Z"},"child":[]},{"tag":"path","attr":{"d":"M9 7H13V8H9V7Z"},"child":[]},{"tag":"path","attr":{"d":"M9 9H13V10H9V9Z"},"child":[]},{"tag":"path","attr":{"d":"M7 11H11V12H7V11Z"},"child":[]},{"tag":"path","attr":{"d":"M2.00012 1L1.00012 2V7H2.00012V2H14.0001V13H2.00012V7H1.00012V13L2.00012 14H14.0001L15.0001 13V2L14.0001 1H2.00012Z"},"child":[]}]})(props);
};
function VscCode (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.708 5.578L2.061 8.224l2.647 2.646-.708.708-3-3V7.87l3-3 .708.708zm7-.708L11 5.578l2.647 2.646L11 10.87l.708.708 3-3V7.87l-3-3zM4.908 13l.894.448 5-10L9.908 3l-5 10z"},"child":[]}]})(props);
};
function VscCoffee (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3 1V1.5C3 1.96954 3.27449 2.20587 3.8 2.6L3.83977 2.62978C4.31392 2.98457 5 3.49793 5 4.5V5H4V4.5C4 4.03046 3.72551 3.79413 3.2 3.4L3.16023 3.37022C2.68608 3.01543 2 2.50207 2 1.5V1H3Z"},"child":[]},{"tag":"path","attr":{"d":"M6 1V1.5C6 1.96954 6.27449 2.20587 6.8 2.6L6.83977 2.62978C7.31392 2.98457 8 3.49793 8 4.5V5H7V4.5C7 4.03046 6.72551 3.79413 6.2 3.4L6.16023 3.37022C5.68608 3.01543 5 2.50207 5 1.5V1H6Z"},"child":[]},{"tag":"path","attr":{"d":"M9 1V1.5C9 1.96954 9.27449 2.20587 9.8 2.6L9.83977 2.62978C10.3139 2.98457 11 3.49793 11 4.5V5H10V4.5C10 4.03046 9.72551 3.79413 9.2 3.4L9.16023 3.37022C8.68608 3.01543 8 2.50207 8 1.5V1H9Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 7L3 6H13.5C14.8807 6 16 7.11929 16 8.5C16 9.88071 14.8807 11 13.5 11H12.874C12.4299 12.7252 10.8638 14 9 14H6C3.79086 14 2 12.2091 2 10V7ZM12 10V7H3V10C3 11.6569 4.34315 13 6 13H9C10.6569 13 12 11.6569 12 10ZM13 7V10H13.5C14.3284 10 15 9.32843 15 8.5C15 7.67157 14.3284 7 13.5 7H13Z"},"child":[]}]})(props);
};
function VscCollapseAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9 9H4v1h5V9z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"},"child":[]}]})(props);
};
function VscColorMode (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13V2a6 6 0 1 1 0 12z"},"child":[]}]})(props);
};
function VscCombine (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1l-.5.5v3l.5.5h3l.5-.5v-3L4.5 1h-3zM2 4V2h2v2H2zm-.5 2l-.5.5v3l.5.5h3l.5-.5v-3L4.5 6h-3zM2 9V7h2v2H2zm-1 2.5l.5-.5h3l.5.5v3l-.5.5h-3l-.5-.5v-3zm1 .5v2h2v-2H2zm10.5-7l-.5.5v6l.5.5h3l.5-.5v-6l-.5-.5h-3zM15 8h-2V6h2v2zm0 3h-2V9h2v2zM9.1 8H6v1h3.1l-1 1 .7.6 1.8-1.8v-.7L8.8 6.3l-.7.7 1 1z"},"child":[]}]})(props);
};
function VscCommentDiscussion (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 11.29l1-1v1.42l-1.15 1.14L3 12.5V10H1.5L1 9.5v-8l.5-.5h12l.5.5V6h-1V2H2v7h1.5l.5.5v1.79zM10.29 13l1.86 1.85.85-.35V13h1.5l.5-.5v-5l-.5-.5h-8l-.5.5v5l.5.5h3.79zm.21-1H7V8h7v4h-1.5l-.5.5v.79l-1.15-1.14-.35-.15z"},"child":[]}]})(props);
};
function VscCommentDraft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.5 2.00098H13V3.00098H14V4.00098H15V2.50098L14.5 2.00098ZM9 2.00098H11V3.00098H9V2.00098ZM5 2.00098H7V3.00098H5V2.00098ZM14 10.001V11.001V12.001H14.5L15 11.501V10.001H14ZM12 12.001V11.001H10V12.001H12ZM8 11.001H7.5L7.146 11.147L5 13.294V11.501L4.5 11.001H4V12.001V14.501L4.854 14.855L7.707 12.001H8V11.001ZM15 8.00098V6.00098H14V8.00098H15ZM2 11.001V10.001H1V11.501L1.5 12.001H2V11.001ZM2 8.00098V6.00098H1V8.00098H2ZM2 3.00098V4.00098H1V2.50098L1.5 2.00098H3V3.00098H2Z"},"child":[]}]})(props);
};
function VscCommentUnresolved (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2H14.5L15 2.5V9.35418C14.714 9.03018 14.3764 8.75287 14 8.53513V3H2V11H4.5L5 11.5V13.293L7.146 11.146L7.5 11H8.12602C8.04375 11.3196 8 11.6547 8 12H7.707L4.854 14.854L4 14.5V12H1.5L1 11.5V2.5L1.5 2Z"},"child":[]},{"tag":"path","attr":{"d":"M12 9C11.4067 9 10.8266 9.17595 10.3333 9.50559C9.83994 9.83524 9.45543 10.3038 9.22836 10.8519C9.0013 11.4001 8.94189 12.0033 9.05765 12.5853C9.1734 13.1672 9.45912 13.7018 9.87868 14.1213C10.2982 14.5409 10.8328 14.8266 11.4147 14.9424C11.9967 15.0581 12.5999 14.9987 13.1481 14.7716C13.6962 14.5446 14.1648 14.1601 14.4944 13.6667C14.8241 13.1734 15 12.5933 15 12C14.999 11.2047 14.6826 10.4422 14.1202 9.87976C13.5578 9.31736 12.7954 9.00098 12 9Z"},"child":[]}]})(props);
};
function VscComment (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.5 2h-13l-.5.5v9l.5.5H4v2.5l.854.354L7.707 12H14.5l.5-.5v-9l-.5-.5zm-.5 9H7.5l-.354.146L5 13.293V11.5l-.5-.5H2V3h12v8z"},"child":[]}]})(props);
};
function VscCompassActive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.10146 13.8991C8.90419 13.9357 8.70353 13.9627 8.49999 13.9795V13H7.49999V13.9795C4.57233 13.7379 2.24067 11.3945 2.0175 8.46167H3V7.46167H2.02382C2.28141 4.56475 4.59788 2.25996 7.49999 2.02054V3H8.49999V2.02054C11.4149 2.26101 13.739 4.5851 13.9795 7.5H13V8.5H13.9795C13.9627 8.70354 13.9357 8.90419 13.8991 9.10146C14.2338 9.17833 14.5524 9.29718 14.8492 9.45217C14.948 8.98368 15 8.49791 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C8.49791 15 8.98368 14.948 9.45217 14.8492C9.29718 14.5524 9.17833 14.2338 9.10146 13.8991ZM9.90369 10.4675L6.99115 9.00874L4.96667 4.96655L9.00885 6.99103L10.4676 9.90359C10.2614 10.0724 10.0725 10.2613 9.90369 10.4675ZM9.43542 9.4353L8.48073 7.51916L6.56458 6.56447L7.51927 8.48062L9.43542 9.4353Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.3333 10.5056C11.8266 10.1759 12.4067 10 13 10C13.7954 10.001 14.5578 10.3174 15.1202 10.8798C15.6826 11.4422 15.999 12.2046 16 13C16 13.5933 15.8241 14.1734 15.4944 14.6667C15.1648 15.1601 14.6962 15.5446 14.1481 15.7716C13.5999 15.9987 12.9967 16.0581 12.4147 15.9424C11.8328 15.8266 11.2982 15.5409 10.8787 15.1213C10.4591 14.7018 10.1734 14.1672 10.0576 13.5853C9.94189 13.0033 10.0013 12.4001 10.2284 11.8519C10.4554 11.3038 10.8399 10.8352 11.3333 10.5056ZM13.0315 14.3226L14.8213 11.9363L14.0213 11.3363L12.541 13.3099L11.6655 12.6095L11.0408 13.3903L12.3192 14.413L13.0315 14.3226Z"},"child":[]}]})(props);
};
function VscCompassDot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.10146 13.8991C8.90419 13.9357 8.70353 13.9627 8.49999 13.9795V13H7.49999V13.9795C4.57233 13.7379 2.24067 11.3945 2.0175 8.46167H3V7.46167H2.02382C2.28141 4.56475 4.59788 2.25996 7.49999 2.02054V3H8.49999V2.02054C11.4149 2.26101 13.739 4.5851 13.9795 7.5H13V8.5H13.9795C13.9627 8.70354 13.9357 8.90419 13.8991 9.10146C14.2338 9.17833 14.5524 9.29718 14.8492 9.45217C14.948 8.98368 15 8.49791 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C8.49791 15 8.98368 14.948 9.45217 14.8492C9.29718 14.5524 9.17833 14.2338 9.10146 13.8991ZM9.90369 10.4675L6.99115 9.00874L4.96667 4.96655L9.00885 6.99103L10.4676 9.90359C10.2614 10.0724 10.0725 10.2613 9.90369 10.4675ZM9.43542 9.4353L8.48073 7.51916L6.56458 6.56447L7.51927 8.48062L9.43542 9.4353Z"},"child":[]},{"tag":"circle","attr":{"cx":"13","cy":"13","r":"3"},"child":[]}]})(props);
};
function VscCompass (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.00885 6.99103L11.0333 11.0332L6.99114 9.00874L4.96666 4.96655L9.00885 6.99103ZM9.43541 9.4353L8.48072 7.51916L6.56458 6.56447L7.51926 8.48062L9.43541 9.4353Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.9795 8.5C13.739 11.4149 11.4149 13.739 8.49999 13.9795V13H7.49999V13.9795C4.57233 13.7379 2.24067 11.3945 2.0175 8.46167H3V7.46167H2.02382C2.28141 4.56475 4.59788 2.25996 7.49999 2.02054V3H8.49999V2.02054C11.4149 2.26101 13.739 4.5851 13.9795 7.5H13V8.5H13.9795ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"},"child":[]}]})(props);
};
function VscCopilot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 15","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6.25 8.99987C6.66421 8.99987 7 9.33566 7 9.74987V11.2499C7 11.6641 6.66421 11.9999 6.25 11.9999C5.83579 11.9999 5.5 11.6641 5.5 11.2499V9.74987C5.5 9.33566 5.83579 8.99987 6.25 8.99987Z"},"child":[]},{"tag":"path","attr":{"d":"M10.5 9.74987C10.5 9.33566 10.1642 8.99987 9.75 8.99987C9.33579 8.99987 9 9.33566 9 9.74987V11.2499C9 11.6641 9.33579 11.9999 9.75 11.9999C10.1642 11.9999 10.5 11.6641 10.5 11.2499V9.74987Z"},"child":[]},{"tag":"path","attr":{"d":"M7.86079 1.76938C7.91028 1.8224 7.95663 1.87717 8 1.93356C8.04337 1.87717 8.08972 1.8224 8.13921 1.76938C8.82116 1.03872 9.87702 0.870479 11.0828 1.00446C12.3131 1.14115 13.2283 1.53222 13.8072 2.26504C14.3725 2.98056 14.5 3.87915 14.5 4.74987C14.5 5.3219 14.447 5.897 14.2459 6.40494L14.4135 7.24309L14.4798 7.27626C15.4115 7.74209 16 8.69432 16 9.73594V10.9999C16 11.2394 15.9143 11.4382 15.844 11.567C15.7691 11.7042 15.6751 11.8282 15.5851 11.9333C15.4049 12.1435 15.181 12.3462 14.9801 12.5135C14.7751 12.6844 14.5728 12.836 14.4235 12.9438C14.1842 13.1166 13.9389 13.276 13.6826 13.4234C13.3756 13.6 12.9344 13.8329 12.3867 14.0653C11.2956 14.5282 9.75604 14.9999 8 14.9999C6.24396 14.9999 4.70442 14.5282 3.61334 14.0653C3.06559 13.8329 2.62435 13.6 2.31739 13.4234C2.0611 13.276 1.81581 13.1166 1.57651 12.9438C1.42716 12.836 1.2249 12.6844 1.01986 12.5135C0.819 12.3462 0.595113 12.1435 0.414932 11.9333C0.3249 11.8282 0.230849 11.7042 0.156031 11.567C0.0857453 11.4382 0 11.2394 1.90735e-06 10.9999L0 9.73594C0 8.69432 0.588507 7.74209 1.52017 7.27626L1.5865 7.24309L1.75413 6.40493C1.55295 5.89699 1.5 5.3219 1.5 4.74987C1.5 3.87915 1.62745 2.98056 2.19275 2.26504C2.77172 1.53222 3.68694 1.14115 4.91718 1.00446C6.12298 0.870479 7.17884 1.03872 7.86079 1.76938ZM3.0231 7.70862L3 7.82413V12.0852C3.02086 12.0974 3.04268 12.1101 3.06543 12.1232C3.32878 12.2747 3.71567 12.4793 4.19916 12.6844C5.17058 13.0965 6.50604 13.4999 8 13.4999C9.49396 13.4999 10.8294 13.0965 11.8008 12.6844C12.2843 12.4793 12.6712 12.2747 12.9346 12.1232C12.9573 12.1101 12.9791 12.0974 13 12.0852V7.82413L12.9769 7.70862C12.4867 7.91826 11.9022 7.99987 11.25 7.99987C10.1037 7.99987 9.19051 7.67234 8.54033 7.00859C8.3213 6.78499 8.14352 6.5347 8 6.26581C7.85648 6.5347 7.6787 6.78499 7.45967 7.00859C6.80949 7.67234 5.89633 7.99987 4.75 7.99987C4.09776 7.99987 3.51325 7.91826 3.0231 7.70862ZM6.76421 2.79286C6.57116 2.58602 6.12702 2.37926 5.08282 2.49528C4.06306 2.60859 3.60328 2.89934 3.36975 3.19493C3.12255 3.50781 3 3.98422 3 4.74987C3 5.54218 3.12905 5.92064 3.3082 6.12028C3.47045 6.30109 3.82768 6.49987 4.75 6.49987C5.60367 6.49987 6.08903 6.26426 6.38811 5.95894C6.70349 5.63698 6.91507 5.13264 7.00579 4.40684C7.12274 3.47123 6.96805 3.01126 6.76421 2.79286ZM9.23579 2.79286C9.03195 3.01126 8.87726 3.47123 8.99421 4.40684C9.08493 5.13264 9.29651 5.63698 9.61189 5.95894C9.91097 6.26426 10.3963 6.49987 11.25 6.49987C12.1723 6.49987 12.5295 6.30109 12.6918 6.12028C12.871 5.92064 13 5.54218 13 4.74987C13 3.98422 12.8775 3.50781 12.6303 3.19493C12.3967 2.89934 11.9369 2.60859 10.9172 2.49528C9.87298 2.37926 9.42884 2.58602 9.23579 2.79286Z"},"child":[]}]})(props);
};
function VscCopy (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 4l1-1h5.414L14 6.586V14l-1 1H5l-1-1V4zm9 3l-3-3H5v10h8V7z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3 1L2 2v10l1 1V2h6.414l-1-1H3z"},"child":[]}]})(props);
};
function VscCoverage (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.88415 8.32009L6.38415 11.3201L5.64648 11.3535L4.14648 9.85355L4.85359 9.14644L5.96644 10.2593L8.11593 7.6799L8.88415 8.32009Z"},"child":[]},{"tag":"path","attr":{"d":"M11.9803 9.96948C12.6105 9.33654 13 8.46376 13 7.5C13 5.567 11.433 4 9.5 4C9.03097 4 8.58349 4.09226 8.17472 4.25962C7.69756 4.10726 7.19209 4.01826 6.66821 4.00252C7.44155 3.37561 8.42691 3 9.5 3C11.9853 3 14 5.01472 14 7.5C14 9.2103 13.0459 10.6978 11.6408 11.4591C11.8197 10.99 11.9362 10.4901 11.9803 9.96948Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.5 13C4.567 13 3 11.433 3 9.5C3 7.567 4.567 6 6.5 6C8.433 6 10 7.567 10 9.5C10 11.433 8.433 13 6.5 13ZM6.5 14C8.98528 14 11 11.9853 11 9.5C11 7.01472 8.98528 5 6.5 5C4.01472 5 2 7.01472 2 9.5C2 11.9853 4.01472 14 6.5 14Z"},"child":[]}]})(props);
};
function VscCreditCard (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 5v1H2V5h12zM2 7h12v5H2V7zm12-3H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-3 6h2v1h-2v-1z"},"child":[]}]})(props);
};
function VscDash (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5 8h6v1H5z"},"child":[]}]})(props);
};
function VscDashboard (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.889 2.095a6.5 6.5 0 1 1 7.222 10.81A6.5 6.5 0 0 1 3.89 2.094zm.555 9.978A5.5 5.5 0 0 0 7.5 13 5.506 5.506 0 0 0 13 7.5a5.5 5.5 0 1 0-8.556 4.573zM10.294 4l.706.707-2.15 2.15a1.514 1.514 0 1 1-.707-.707L10.293 4zM7.221 7.916a.5.5 0 1 0 .556-.832.5.5 0 0 0-.556.832zm4.286-2.449l-.763.763c.166.403.253.834.255 1.27a3.463 3.463 0 0 1-.5 1.777l.735.735a4.477 4.477 0 0 0 .274-4.545h-.001zM8.733 4.242A3.373 3.373 0 0 0 7.5 4 3.5 3.5 0 0 0 4 7.5a3.46 3.46 0 0 0 .5 1.777l-.734.735A4.5 4.5 0 0 1 9.5 3.473l-.767.769z"},"child":[]}]})(props);
};
function VscDatabase (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13 3.5C13 2.119 10.761 1 8 1S3 2.119 3 3.5c0 .04.02.077.024.117H3v8.872l.056.357C3.336 14.056 5.429 15 8 15c2.571 0 4.664-.944 4.944-2.154l.056-.357V3.617h-.024c.004-.04.024-.077.024-.117zM8 2.032c2.442 0 4 .964 4 1.468s-1.558 1.468-4 1.468S4 4 4 3.5s1.558-1.468 4-1.468zm4 10.458l-.03.131C11.855 13.116 10.431 14 8 14s-3.855-.884-3.97-1.379L4 12.49v-7.5A7.414 7.414 0 0 0 8 6a7.414 7.414 0 0 0 4-1.014v7.504z"},"child":[]}]})(props);
};
function VscDebugAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.29333 9.00631L6.41333 9.88552C6.27949 9.34717 5.96917 8.86905 5.53181 8.52735C5.09445 8.18564 4.55521 8 4 8C3.44479 8 2.90555 8.18564 2.46819 8.52735C2.03083 8.86905 1.72051 9.34717 1.58667 9.88552L0.706667 9.00631L0 9.71234L1.14667 10.858L1 11.0045V12.0036H0V13.0027H1V13.056C1.051 13.3815 1.14283 13.6993 1.27333 14.0018L0 15.294L0.706667 16L1.80667 14.901C2.06838 15.2346 2.40078 15.5062 2.78001 15.6962C3.15924 15.8862 3.57587 15.99 4 16C4.42413 15.99 4.84076 15.8862 5.21999 15.6962C5.59922 15.5062 5.93162 15.2346 6.19333 14.901L7.29333 16L8 15.294L6.72667 14.0018C6.85879 13.6929 6.95065 13.3683 7 13.036V12.9694H8V12.0036H7V11.0045L6.85333 10.858L8 9.71234L7.29333 9.00631ZM4 9.00631C4.39782 9.00631 4.77936 9.16421 5.06066 9.44526C5.34196 9.72631 5.5 10.1075 5.5 10.505H2.5C2.5 10.1075 2.65804 9.72631 2.93934 9.44526C3.22064 9.16421 3.60218 9.00631 4 9.00631ZM6 13.0027C5.95116 13.5161 5.72476 13.9965 5.35974 14.3612C4.99472 14.7259 4.5139 14.9521 4 15.0009C3.4861 14.9521 3.00528 14.7259 2.64026 14.3612C2.27524 13.9965 2.04884 13.5161 2 13.0027V11.5041H6V13.0027Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.77951 2L2.99951 2.41V7H3.99951V3.35L11.5995 8.42L9 10.1507V11.3497L12.7795 8.83V8L3.77951 2ZM9 13.3497V12.1482L14.5995 8.42006L6.99951 3.35006V2.14673L15.7795 8.00006V8.83006L9 13.3497Z"},"child":[]}]})(props);
};
function VscDebugAltSmall (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.293 9.006l-.88.88A2.484 2.484 0 0 0 4 8a2.488 2.488 0 0 0-2.413 1.886l-.88-.88L0 9.712l1.147 1.146-.147.146v1H0v.999h1v.053c.051.326.143.643.273.946L0 15.294.707 16l1.1-1.099A2.873 2.873 0 0 0 4 16a2.875 2.875 0 0 0 2.193-1.099L7.293 16 8 15.294l-1.273-1.292A3.92 3.92 0 0 0 7 13.036v-.067h1v-.965H7v-1l-.147-.146L8 9.712l-.707-.706zM4 9.006a1.5 1.5 0 0 1 1.5 1.499h-3A1.498 1.498 0 0 1 4 9.006zm2 3.997A2.217 2.217 0 0 1 4 15a2.22 2.22 0 0 1-2-1.998v-1.499h4v1.499z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 2.41L5.78 2l9 6v.83L9 12.683v-1.2l4.6-3.063L6 3.35V7H5V2.41z"},"child":[]}]})(props);
};
function VscDebugAlt (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.94 13.5l-1.32 1.32a3.73 3.73 0 0 0-7.24 0L1.06 13.5 0 14.56l1.72 1.72-.22.22V18H0v1.5h1.5v.08c.077.489.214.966.41 1.42L0 22.94 1.06 24l1.65-1.65A4.308 4.308 0 0 0 6 24a4.31 4.31 0 0 0 3.29-1.65L10.94 24 12 22.94 10.09 21c.198-.464.336-.951.41-1.45v-.1H12V18h-1.5v-1.5l-.22-.22L12 14.56l-1.06-1.06zM6 13.5a2.25 2.25 0 0 1 2.25 2.25h-4.5A2.25 2.25 0 0 1 6 13.5zm3 6a3.33 3.33 0 0 1-3 3 3.33 3.33 0 0 1-3-3v-2.25h6v2.25zm14.76-9.9v1.26L13.5 17.37V15.6l8.5-5.37L9 2v9.46a5.07 5.07 0 0 0-1.5-.72V.63L8.64 0l15.12 9.6z"},"child":[]}]})(props);
};
function VscDebugBreakpointConditionalUnverified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.778 4.674a4 4 0 1 1 4.444 6.652 4 4 0 0 1-4.444-6.652zm.694 5.612a2.75 2.75 0 1 0 3.056-4.572 2.75 2.75 0 0 0-3.056 4.572zM9.5 6.5h-3v1h3v-1zm0 2h-3v1h3v-1z"},"child":[]}]})(props);
};
function VscDebugBreakpointConditional (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm2 5v1H6V9h4zm0-3v1H6V6h4z"},"child":[]}]})(props);
};
function VscDebugBreakpointDataUnverified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.931 4h-4.62l-2.31 4 2.31 4h4.62l2.31-4-2.31-4zm-.75 6.7h-3.12L4.501 8l1.56-2.7h3.12l1.56 2.7-1.56 2.7z"},"child":[]}]})(props);
};
function VscDebugBreakpointData (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M12.238 8l-2.31 4H5.31L3 8l2.31-4h4.618l2.31 4z"},"child":[]}]})(props);
};
function VscDebugBreakpointFunctionUnverified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 11h8L8 4l-4 7zm2.154-1.25h3.692L8 6.52 6.154 9.75z"},"child":[]}]})(props);
};
function VscDebugBreakpointFunction (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 4l4 6.905H4L8 4z"},"child":[]}]})(props);
};
function VscDebugBreakpointLogUnverified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.02 7.98L8 3l4.98 4.98L8 12.96 3.02 7.98zM8 10.77l2.79-2.79L8 5.19 5.21 7.98 8 10.77z"},"child":[]}]})(props);
};
function VscDebugBreakpointLog (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 3l5 5-5 5-5-5 5-5z"},"child":[]}]})(props);
};
function VscDebugBreakpointUnsupported (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.326 10.222a4 4 0 1 0-6.653-4.444 4 4 0 0 0 6.653 4.444zM8.65 10H7.4v1h1.25v-1zM7.4 9V5h1.25v4H7.4z"},"child":[]}]})(props);
};
function VscDebugConsole (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.04 1.361l.139-.057H21.32l.14.057 1.178 1.179.057.139V16.82l-.057.14-1.179 1.178-.139.057H14V18a1.99 1.99 0 0 0-.548-1.375h7.673V2.875H7.375v7.282a5.73 5.73 0 0 0-1.571-.164V2.679l.057-.14L7.04 1.362zm9.531 9.452l-2.809 2.8a2 2 0 0 0-.348-.467l-.419-.42 2.236-2.235-3.606-3.694.813-.833 4.133 4.133v.716zM9.62 14.82l1.32-1.32L12 14.56l-1.72 1.72.22.22V18H12v1.45h-1.5v.1a5.888 5.888 0 0 1-.41 1.45L12 22.94 10.94 24l-1.65-1.65A4.308 4.308 0 0 1 6 24a4.31 4.31 0 0 1-3.29-1.65L1.06 24 0 22.94 1.91 21a5.889 5.889 0 0 1-.41-1.42v-.08H0V18h1.5v-1.5l.22-.22L0 14.56l1.06-1.06 1.32 1.32a3.73 3.73 0 0 1 7.24 0zm-2.029-.661A2.25 2.25 0 0 0 3.75 15.75h4.5a2.25 2.25 0 0 0-.659-1.591zm.449 7.38A3.33 3.33 0 0 0 9 19.5v-2.25H3v2.25a3.33 3.33 0 0 0 3 3 3.33 3.33 0 0 0 2.04-.96z"},"child":[]}]})(props);
};
function VscDebugContinueSmall (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 2H3V14H4V2ZM7.29062 2.59314L6.5 3.00001V13L7.29062 13.4069L14.2906 8.40687V7.59314L7.29062 2.59314ZM13.1398 8.00001L7.5 12.0284V3.9716L13.1398 8.00001Z"},"child":[]}]})(props);
};
function VscDebugContinue (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.5 2H4v12H2.5V2zm4.936.39L6.25 3v10l1.186.61 7-5V7.39l-7-5zM12.71 8l-4.96 3.543V4.457L12.71 8z"},"child":[]}]})(props);
};
function VscDebugCoverage (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 2.41L5.78 2L14.78 8V8.83L9 12.6833V11.4826L13.6 8.42L6 3.35V7H5V2.41Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.13041 12.1236C5.94796 12.3032 5.80777 12.503 5.70927 12.7232C5.61337 12.9427 5.56516 13.181 5.56516 13.4389V14.3007C5.56516 14.3973 5.54694 14.4886 5.51016 14.5741C5.4738 14.6587 5.42387 14.7328 5.36036 14.7961C5.29687 14.8594 5.2225 14.9091 5.13774 14.9453C5.05203 14.9819 4.96049 15 4.86366 15H3.9988C3.90197 15 3.81043 14.9819 3.72472 14.9453C3.63996 14.9091 3.5656 14.8594 3.5021 14.7961C3.4386 14.7328 3.38866 14.6587 3.3523 14.5741C3.31552 14.4886 3.2973 14.3973 3.2973 14.3007V13.4389C3.2973 13.1811 3.248 12.9428 3.1499 12.7234C3.05368 12.5033 2.91448 12.3031 2.73205 12.1236C2.49791 11.8926 2.31713 11.6346 2.19041 11.35C2.0633 11.0644 2 10.7552 2 10.4228C2 10.2005 2.02876 9.98586 2.08641 9.77906C2.14392 9.57279 2.22565 9.38 2.33166 9.20087C2.43754 9.01972 2.56419 8.85567 2.71156 8.70884C2.85886 8.56206 3.02231 8.4359 3.20182 8.33042C3.38373 8.22488 3.57848 8.14334 3.78542 8.08606C3.99288 8.02865 4.2082 8 4.43123 8C4.65426 8 4.86959 8.02865 5.07704 8.08606C5.28398 8.14334 5.4774 8.22475 5.65714 8.33035C5.8389 8.43582 6.00353 8.56199 6.15091 8.70884C6.29827 8.85567 6.42492 9.01972 6.53079 9.20086C6.63681 9.37999 6.71854 9.57278 6.77605 9.77906C6.8337 9.98586 6.86246 10.2005 6.86246 10.4228C6.86246 10.7552 6.79916 11.0644 6.67206 11.35C6.54533 11.6346 6.36456 11.8926 6.13041 12.1236ZM5.02703 13.1154H3.83544V14.3007C3.83544 14.3443 3.8508 14.3814 3.88401 14.4145C3.91724 14.4476 3.95465 14.4631 3.9988 14.4631H4.86366C4.90781 14.4631 4.94523 14.4476 4.97845 14.4145C5.01166 14.3814 5.02703 14.3443 5.02703 14.3007V13.1154Z"},"child":[]}]})(props);
};
function VscDebugDisconnect (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.617 3.844a2.87 2.87 0 0 0-.451-.868l1.354-1.36L13.904 1l-1.36 1.354a2.877 2.877 0 0 0-.868-.452 3.073 3.073 0 0 0-2.14.075 3.03 3.03 0 0 0-.991.664L7 4.192l4.327 4.328 1.552-1.545c.287-.287.508-.618.663-.992a3.074 3.074 0 0 0 .075-2.14zm-.889 1.804a2.15 2.15 0 0 1-.471.705l-.93.93-3.09-3.09.93-.93a2.15 2.15 0 0 1 .704-.472 2.134 2.134 0 0 1 1.689.007c.264.114.494.271.69.472.2.195.358.426.472.69a2.134 2.134 0 0 1 .007 1.688zm-4.824 4.994l1.484-1.545-.616-.622-1.49 1.551-1.86-1.859 1.491-1.552L6.291 6 4.808 7.545l-.616-.615-1.551 1.545a3 3 0 0 0-.663.998 3.023 3.023 0 0 0-.233 1.169c0 .332.05.656.15.97.105.31.258.597.459.862L1 13.834l.615.615 1.36-1.353c.265.2.552.353.862.458.314.1.638.15.97.15.406 0 .796-.077 1.17-.232.378-.155.71-.376.998-.663l1.545-1.552-.616-.615zm-2.262 2.023a2.16 2.16 0 0 1-.834.164c-.301 0-.586-.057-.855-.17a2.278 2.278 0 0 1-.697-.466 2.28 2.28 0 0 1-.465-.697 2.167 2.167 0 0 1-.17-.854 2.16 2.16 0 0 1 .642-1.545l.93-.93 3.09 3.09-.93.93a2.22 2.22 0 0 1-.711.478z"},"child":[]}]})(props);
};
function VscDebugLineByLine (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6 10V9h9v1H6zm4-4h5v1h-5V6zm5-3v1H6V3h9zm-9 9v1h9v-1H6z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 2.795l.783-.419 5.371 3.581v.838l-5.371 3.581L1 9.957V2.795zm1.007.94v5.281l3.96-2.64-3.96-2.64z"},"child":[]}]})(props);
};
function VscDebugPause (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.5 3H6v10H4.5V3zm7 0v10H10V3h1.5z"},"child":[]}]})(props);
};
function VscDebugRerun (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.167 12a3 3 0 0 1-5.74 1.223l-.928.376A4.001 4.001 0 1 0 1 9.556V8.333H0V11l.5.5h2.333v-1H1.568A3 3 0 0 1 7.167 12z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 2.41L5.78 2l9 6v.83L10 12.017v-1.2l3.6-2.397L6 3.35V7H5V2.41z"},"child":[]}]})(props);
};
function VscDebugRestartFrame (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 10V9h5.207a5.48 5.48 0 0 0-.185 1H1zm6.257-3a5.54 5.54 0 0 1 1.08-1H1v1h6.257zM6.6 13a5.465 5.465 0 0 1-.393-1H1v1h5.6zM15 3v1H1V3h14zm-3.36 10.031a2.531 2.531 0 1 0-2.192-3.797h1.068v.844h-1.97l-.421-.422v-2.25h.844v1.032a3.375 3.375 0 1 1-.423 3.412l.782-.318a2.532 2.532 0 0 0 2.313 1.5z"},"child":[]}]})(props);
};
function VscDebugRestart (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z"},"child":[]}]})(props);
};
function VscDebugReverseContinue (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.5 2H12v12h1.5V2zm-4.936.39L9.75 3v10l-1.186.61-7-5V7.39l7-5zM3.29 8l4.96 3.543V4.457L3.29 8z"},"child":[]}]})(props);
};
function VscDebugStackframeActive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"},"child":[]},{"tag":"path","attr":{"d":"M14.5 7.15l-4.26-4.74L9.31 2H4.25L3 3.25v9.48l1.25 1.25h5.06l.93-.42 4.26-4.74V7.15zm-5.19 5.58H4.25V3.25h5.06l4.26 4.73-4.26 4.75z"},"child":[]}]})(props);
};
function VscDebugStackframe (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.5 7.15l-4.26-4.74L9.31 2H4.25L3 3.25v9.48l1.25 1.25h5.06l.93-.42 4.26-4.74V7.15zm-5.19 5.58H4.25V3.25h5.06l4.26 4.73-4.26 4.75z"},"child":[]}]})(props);
};
function VscDebugStart (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.25 3l1.166-.624 8 5.333v1.248l-8 5.334-1.166-.624V3zm1.5 1.401v7.864l5.898-3.932L5.75 4.401z"},"child":[]}]})(props);
};
function VscDebugStepBack (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.75 5.75v-4h1.5v2.542c1.145-1.359 2.911-2.209 4.84-2.209 3.177 0 5.92 2.307 6.16 5.398l.02.269h-1.5l-.022-.226c-.212-2.195-2.202-3.94-4.656-3.94-1.736 0-3.244.875-4.05 2.166h2.83v1.5H2.707l-.961-.975V5.75h.003zM8 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"},"child":[]}]})(props);
};
function VscDebugStepInto (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 9.532h.542l3.905-3.905-1.061-1.06-2.637 2.61V1H7.251v6.177l-2.637-2.61-1.061 1.06 3.905 3.905H8zm1.956 3.481a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"},"child":[]}]})(props);
};
function VscDebugStepOut (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 1h-.542L3.553 4.905l1.061 1.06 2.637-2.61v6.177h1.498V3.355l2.637 2.61 1.061-1.06L8.542 1H8zm1.956 12.013a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"},"child":[]}]})(props);
};
function VscDebugStepOver (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.25 5.75v-4h-1.5v2.542c-1.145-1.359-2.911-2.209-4.84-2.209-3.177 0-5.92 2.307-6.16 5.398l-.02.269h1.501l.022-.226c.212-2.195 2.202-3.94 4.656-3.94 1.736 0 3.244.875 4.05 2.166h-2.83v1.5h4.163l.962-.975V5.75h-.004zM8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"},"child":[]}]})(props);
};
function VscDebugStop (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13 1.99976L14 2.99976V12.9998L13 13.9998H3L2 12.9998L2 2.99976L3 1.99976H13ZM12.7461 3.25057L3.25469 3.25057L3.25469 12.7504H12.7461V3.25057Z"},"child":[]}]})(props);
};
function VscDebug (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3.463 12.86l-.005-.07.005.07zm7.264.69l-3.034-3.049 1.014-1.014 3.209 3.225 3.163-3.163 1.014 1.014-3.034 3.034 3.034 3.05-1.014 1.014-3.209-3.225L8.707 17.6l-1.014-1.014 3.034-3.034z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M16.933 5.003V6h1.345l2.843-2.842 1.014 1.014-2.692 2.691.033.085a13.75 13.75 0 0 1 .885 4.912c0 .335-.011.667-.034.995l-.005.075h3.54v1.434h-3.72l-.01.058c-.303 1.653-.891 3.16-1.692 4.429l-.06.094 3.423 3.44-1.017 1.012-3.274-3.29-.099.11c-1.479 1.654-3.395 2.646-5.483 2.646-2.12 0-4.063-1.023-5.552-2.723l-.098-.113-3.209 3.208-1.014-1.014 3.366-3.365-.059-.095c-.772-1.25-1.34-2.725-1.636-4.34l-.01-.057H0V12.93h3.538l-.005-.075a14.23 14.23 0 0 1-.034-.995c0-1.743.31-3.39.863-4.854l.032-.084-2.762-2.776L2.65 3.135 5.5 6h1.427v-.997a5.003 5.003 0 0 1 10.006 0zm-8.572 0V6H15.5v-.997a3.569 3.569 0 0 0-7.138 0zm9.8 2.522l-.034-.09H5.733l-.034.09a12.328 12.328 0 0 0-.766 4.335c0 2.76.862 5.201 2.184 6.92 1.32 1.716 3.036 2.649 4.813 2.649 1.777 0 3.492-.933 4.813-2.65 1.322-1.718 2.184-4.16 2.184-6.919 0-1.574-.28-3.044-.766-4.335z"},"child":[]}]})(props);
};
function VscDesktopDownload (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 15v-1c2 0 2-.6 2-1H1.5l-.5-.5v-10l.5-.5h13l.5.5v9.24l-1-1V3H2v9h5.73l-.5.5 2.5 2.5H4zm7.86 0l2.5-2.5-.71-.7L12 13.45V7h-1v6.44l-1.64-1.65-.71.71 2.5 2.5h.71z"},"child":[]}]})(props);
};
function VscDeviceCameraVideo (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.25 4.74L11 6.62V4.5l-.5-.5h-9l-.5.5v7l.5.5h9l.5-.5v-2l3.25 1.87.75-.47V5.18l-.75-.44zM10 11H2V5h8v6zm4-1l-3-1.7v-.52L14 6v4z"},"child":[]}]})(props);
};
function VscDeviceCamera (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.707 3H14.5l.5.5v9l-.5.5h-13l-.5-.5v-9l.5-.5h3.793l.853-.854L6.5 2h3l.354.146.853.854zM2 12h12V4h-3.5l-.354-.146L9.293 3H6.707l-.853.854L5.5 4H2v8zm1.5-7a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM8 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-1a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"},"child":[]}]})(props);
};
function VscDeviceMobile (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.5 1h8l.5.5v13l-.5.5h-8l-.5-.5v-13l.5-.5zM5 14h7V2H5v12zm2.5-2h2v1h-2v-1z"},"child":[]}]})(props);
};
function VscDiffAdded (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h12l.5.5v12l-.5.5h-12l-.5-.5v-12l.5-.5zM2 13h11V2H2v11z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 4H7v3H4v1h3v3h1V8h3V7H8V4z"},"child":[]}]})(props);
};
function VscDiffIgnored (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h13l.5.5v13l-.5.5h-13l-.5-.5v-13l.5-.5zM2 14h12V2H2v12zm8-10h2v2l-6 6H4v-2l6-6z"},"child":[]}]})(props);
};
function VscDiffModified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h13l.5.5v13l-.5.5h-13l-.5-.5v-13l.5-.5zM2 2v12h12V2H2zm6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"},"child":[]}]})(props);
};
function VscDiffMultiple (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.70994 1.29L12.7099 4.29L12.9999 5V14L11.9999 15H2.99994L1.99994 14V2L2.99994 1H8.99994L9.70994 1.29ZM2.99994 14H11.9999V5L8.99994 2H2.99994V14ZM7 6H5V7H7V9H8V7H10V6H8V4H7V6ZM5 11H10V12H5V11Z"},"child":[]},{"tag":"path","attr":{"d":"M12.4199 0.999756L14.7099 3.28976L14.9999 3.99976L15 13.9998L14 14.9998L13.9999 3.99976L10.9999 0.999756H12.4199Z"},"child":[]}]})(props);
};
function VscDiffRemoved (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10 7v1H5V7h5z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h12l.5.5v12l-.5.5h-12l-.5-.5v-12l.5-.5zM2 13h11V2H2v11z"},"child":[]}]})(props);
};
function VscDiffRenamed (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h13l.5.5v13l-.5.5h-13l-.5-.5v-13l.5-.5zM2 14h12V2H2v12zm2-5h3v3l5-4-5-4v3H4v2z"},"child":[]}]})(props);
};
function VscDiffSingle (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.7099 1.28902L13.7099 4.28902L13.9999 4.99902V13.999L12.9999 14.999H3.99994L2.99994 13.999V1.99902L3.99994 0.999023H9.99994L10.7099 1.28902ZM3.99994 13.999H12.9999V4.99902L9.99994 1.99902H3.99994V13.999ZM8 5.99902H6V6.99902H8V8.99902H9V6.99902H11V5.99902H9V3.99902H8V5.99902ZM6 10.999H11V11.999H6V10.999Z"},"child":[]}]})(props);
};
function VscDiff (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 3.5l.5-.5h5l.5.5v9l-.5.5h-5l-.5-.5v-9zM3 12h4V6H3v6zm0-7h4V4H3v1zm6.5-2h5l.5.5v9l-.5.5h-5l-.5-.5v-9l.5-.5zm.5 9h4v-2h-4v2zm0-4h4V4h-4v4z"},"child":[]}]})(props);
};
function VscDiscard (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.5 2v3.5L4 6h3.5V5H4.979l.941-.941a3.552 3.552 0 1 1 5.023 5.023L5.746 14.28l.72.72 5.198-5.198A4.57 4.57 0 0 0 5.2 3.339l-.7.7V2h-1z"},"child":[]}]})(props);
};
function VscEdit (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"},"child":[]}]})(props);
};
function VscEditorLayout (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 6.5l-.47-.5H7V1.47L6.53 1H1.47L1 1.47v8.06l.47.47H4v4.53l.47.47h10.06l.47-.47V6.5zM2 9V3h4v6H2zm12 5H5v-4h1.53L7 9.53V8.013h7V14z"},"child":[]}]})(props);
};
function VscEllipsis (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"},"child":[]}]})(props);
};
function VscEmptyWindow (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 4h3v1H4v3H3V5H0V4h3V1h1v3zM1 14.5V9h1v5h12V7H8V6h6V4H8V3h6.5l.5.5v11l-.5.5h-13l-.5-.5z"},"child":[]}]})(props);
};
function VscErrorSmall (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.17699 10.1051L8.00026 8.92835L6.82348 10.1051L5.89526 9.17693L7.07205 8.00014L5.89526 6.82335L6.82348 5.89514L8.00026 7.07193L9.17699 5.8952L10.1052 6.82342L8.92848 8.00014L10.1052 9.17687L9.17699 10.1051Z"},"child":[]},{"tag":"path","attr":{"d":"M12.0002 8C12.0002 10.2091 10.2094 12 8.00024 12C5.79111 12 4.00024 10.2091 4.00024 8C4.00024 5.79086 5.79111 4 8.00024 4C10.2094 4 12.0002 5.79086 12.0002 8ZM11.0002 8C11.0002 6.34315 9.6571 5 8.00024 5C6.34339 5 5.00024 6.34315 5.00024 8C5.00024 9.65685 6.34339 11 8.00024 11C9.6571 11 11.0002 9.65685 11.0002 8Z"},"child":[]}]})(props);
};
function VscError (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"},"child":[]}]})(props);
};
function VscExclude (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.412 1H6.588l-.484 2.423-2.056-1.37-1.996 1.995 1.37 2.056L1 6.588v2.824l2.423.484-1.37 2.056 1.995 1.996 2.056-1.37L6.588 15h2.083a4.526 4.526 0 0 1-.917-1.005h-.342l-.288-1.441a4.473 4.473 0 0 1-.067-.334l-.116-.583-.764-.316-2 1.334-.832-.831L4.68 9.823l-.316-.764-2.358-.471V7.412l2.358-.471.316-.764-1.334-2 .831-.832 2 1.335.764-.316.471-2.358h1.176l.471 2.358.764.316 2-1.334.832.831-1.334 2.001.316.764.582.116c.113.018.225.04.335.067l1.441.288v.342c.38.254.719.563 1.005.917V6.588l-2.422-.484 1.37-2.056-1.996-1.996-2.056 1.37L9.412 1zM8 6a2 2 0 0 1 1.875 1.302 4.46 4.46 0 0 0-.9.473 1 1 0 1 0-1.2 1.2 4.46 4.46 0 0 0-.473.9A2 2 0 0 1 8 6zm1.28 2.795a3.5 3.5 0 1 1 4.44 5.41 3.5 3.5 0 0 1-4.44-5.41zM9 11v1h5v-1H9z"},"child":[]}]})(props);
};
function VscExpandAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9 9H4v1h5V9z"},"child":[]},{"tag":"path","attr":{"d":"M7 12V7H6v5h1z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 3l1-1h7l1 1v7l-1 1h-2v2l-1 1H3l-1-1V6l1-1h2V3zm1 2h4l1 1v4h2V3H6v2zm4 1H3v7h7V6z"},"child":[]}]})(props);
};
function VscExport (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.086 7l-2.39-2.398.702-.704L15 7.5l-3.602 3.602-.703-.704 2.383-2.382V8H3V7h10.086zM1 4h1v7H1V4z"},"child":[]}]})(props);
};
function VscExtensions (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.5 1.5L15 0h7.5L24 1.5V9l-1.5 1.5H15L13.5 9V1.5zm1.5 0V9h7.5V1.5H15zM0 15V6l1.5-1.5H9L10.5 6v7.5H18l1.5 1.5v7.5L18 24H1.5L0 22.5V15zm9-1.5V6H1.5v7.5H9zM9 15H1.5v7.5H9V15zm1.5 7.5H18V15h-7.5v7.5z"},"child":[]}]})(props);
};
function VscEyeClosed (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1.47978 1.4797C1.30227 1.65721 1.28614 1.93498 1.43137 2.13072L1.47978 2.1868L4.1695 4.87652C2.88817 5.77616 1.93052 7.11985 1.53259 8.70952C1.46554 8.97738 1.62834 9.24892 1.89621 9.31598C2.16409 9.38298 2.4356 9.22025 2.50266 8.95232C2.85564 7.54225 3.72742 6.35956 4.88944 5.59626L6.09586 6.80278C5.62419 7.28378 5.33334 7.94278 5.33334 8.66965C5.33334 10.1424 6.52724 11.3363 8 11.3363C8.72694 11.3363 9.38587 11.0454 9.86694 10.5738L13.8131 14.5201C14.0084 14.7154 14.3249 14.7154 14.5202 14.5201C14.6977 14.3426 14.7139 14.0649 14.5686 13.8691L14.5202 13.813L10.4445 9.73692L10.4453 9.73592L9.64527 8.93732L7.732 7.02445L7.73334 7.02392L5.81252 5.10513L5.81334 5.10392L5.05782 4.35024L2.18689 1.4797C1.99163 1.28444 1.67504 1.28444 1.47978 1.4797ZM6.80274 7.51025L9.15947 9.86698C8.85947 10.1575 8.4506 10.3363 8 10.3363C7.07954 10.3363 6.33334 9.59012 6.33334 8.66965C6.33334 8.21905 6.51216 7.81018 6.80274 7.51025ZM8 3.66658C7.33314 3.66658 6.68607 3.7653 6.07406 3.94992L6.89874 4.77404C7.25594 4.70346 7.62427 4.66658 8 4.66658C10.6154 4.66658 12.8733 6.45342 13.4981 8.95538C13.565 9.22325 13.8364 9.38618 14.1043 9.31932C14.3723 9.25238 14.5352 8.98098 14.4683 8.71305C13.7329 5.7684 11.077 3.66658 8 3.66658ZM8.1298 6.0061L10.664 8.53992C10.5961 7.16865 9.49814 6.07168 8.1298 6.0061Z"},"child":[]}]})(props);
};
function VscEye (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.99993 6.00316C9.47266 6.00316 10.6666 7.19708 10.6666 8.66981C10.6666 10.1426 9.47266 11.3365 7.99993 11.3365C6.52715 11.3365 5.33324 10.1426 5.33324 8.66981C5.33324 7.19708 6.52715 6.00316 7.99993 6.00316ZM7.99993 7.00315C7.07946 7.00315 6.33324 7.74935 6.33324 8.66981C6.33324 9.59028 7.07946 10.3365 7.99993 10.3365C8.9204 10.3365 9.6666 9.59028 9.6666 8.66981C9.6666 7.74935 8.9204 7.00315 7.99993 7.00315ZM7.99993 3.66675C11.0756 3.66675 13.7307 5.76675 14.4673 8.70968C14.5344 8.97755 14.3716 9.24908 14.1037 9.31615C13.8358 9.38315 13.5643 9.22041 13.4973 8.95248C12.8713 6.45205 10.6141 4.66675 7.99993 4.66675C5.38454 4.66675 3.12664 6.45359 2.50182 8.95555C2.43491 9.22341 2.16348 9.38635 1.89557 9.31948C1.62766 9.25255 1.46471 8.98115 1.53162 8.71321C2.26701 5.76856 4.9229 3.66675 7.99993 3.66675Z"},"child":[]}]})(props);
};
function VscFeedback (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.5 1L4 1.5V3.02746C4.16417 3.00932 4.331 3 4.5 3C4.669 3 4.83583 3.00932 5 3.02746V2H14V7H12.2929L11 8.29289V7H8.97254C8.99068 7.16417 9 7.331 9 7.5C9 7.669 8.99068 7.83583 8.97254 8H10V9.5L10.8536 9.85355L12.7071 8H14.5L15 7.5V1.5L14.5 1H4.5Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.41705 10.4288C7.37039 9.80348 8 8.72527 8 7.5C8 5.567 6.433 4 4.5 4C2.567 4 1 5.567 1 7.5C1 8.72527 1.62961 9.80348 2.58295 10.4288C2.11364 10.6498 1.68557 10.9505 1.31802 11.318C0.900156 11.7359 0.568688 12.232 0.342542 12.7779C0.180451 13.1692 0.0747425 13.5807 0.0278638 14C0.00933826 14.1657 0 14.3326 0 14.5V15H1L0.999398 14.5C0.999398 14.4784 0.999599 14.4567 1 14.4351C1.00811 13.9975 1.09823 13.5651 1.26587 13.1604C1.44179 12.7357 1.69964 12.3498 2.0247 12.0247C2.34976 11.6996 2.73566 11.4418 3.16038 11.2659C3.57088 11.0958 4.00986 11.0056 4.45387 10.9997C4.46922 10.9999 4.4846 11 4.5 11C4.5154 11 4.53078 10.9999 4.54613 10.9997C4.99014 11.0056 5.42912 11.0958 5.83962 11.2659C6.26433 11.4418 6.65024 11.6996 6.9753 12.0247C7.30036 12.3498 7.55821 12.7357 7.73413 13.1604C7.90177 13.5651 7.99189 13.9975 8 14.4351C8.0004 14.4567 8.0006 14.4784 8.0006 14.5L8 15H9V14.5C9 14.3326 8.99066 14.1657 8.97214 14C8.92526 13.5807 8.81955 13.1692 8.65746 12.7779C8.43131 12.232 8.09984 11.7359 7.68198 11.318C7.31443 10.9505 6.88636 10.6498 6.41705 10.4288ZM4.5 10C3.11929 10 2 8.88071 2 7.5C2 6.11929 3.11929 5 4.5 5C5.88071 5 7 6.11929 7 7.5C7 8.88071 5.88071 10 4.5 10Z"},"child":[]}]})(props);
};
function VscFileBinary (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.57 1.14l3.28 3.3.15.36v9.7l-.5.5h-11l-.5-.5v-13l.5-.5h7.72l.35.14zM3 2v12h10V5l-3-3H3zm1.46 4.052c0 1.287.458 1.93 1.374 1.93.457 0 .807-.173 1.05-.52.246-.348.368-.847.368-1.499C7.252 4.654 6.805 4 5.91 4c-.471 0-.831.175-1.08.526-.247.35-.37.858-.37 1.526zm.862-.022c0-.922.183-1.383.55-1.383.344 0 .516.448.516 1.343s-.176 1.343-.527 1.343c-.36 0-.54-.434-.54-1.303zm3.187 1.886h2.435v-.672h-.792V4l-1.665.336v.687l.82-.177v2.398h-.798v.672zm-1.337 5H4.736v-.672h.798V9.846l-.82.177v-.687L6.38 9v3.244h.792v.671zm1.035-1.931c0 1.287.458 1.93 1.375 1.93.457 0 .807-.173 1.05-.52.245-.348.368-.847.368-1.499 0-1.309-.448-1.963-1.343-1.963-.47 0-.83.175-1.08.526-.246.35-.37.858-.37 1.526zm.862-.022c0-.922.184-1.383.55-1.383.344 0 .516.448.516 1.343s-.175 1.343-.526 1.343c-.36 0-.54-.434-.54-1.303z"},"child":[]}]})(props);
};
function VscFileCode (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.57 1.14l3.28 3.3.15.36v9.7l-.5.5h-11l-.5-.5v-13l.5-.5h7.72l.35.14zM10 5h3l-3-3v3zM3 2v12h10V6H9.5L9 5.5V2H3zm2.062 7.533l1.817-1.828L6.17 7 4 9.179v.707l2.171 2.174.707-.707-1.816-1.82zM8.8 7.714l.7-.709 2.189 2.175v.709L9.5 12.062l-.705-.709 1.831-1.82L8.8 7.714z"},"child":[]}]})(props);
};
function VscFileMedia (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 2h6v3.5l.5.5H12v1h1V4.8l-.15-.36-3.28-3.3L9.22 1H1.5l-.5.5v13l.5.5H5v-1H2V2zm7 0l3 3H9V2zm5.5 6h-8l-.5.5v6l.5.5h8l.5-.5v-6l-.5-.5zM14 9v4l-1.63-1.6h-.71l-1.16 1.17-2.13-2.13h-.71L7 11.1V9h7zm-2.8 4.27l.81-.81L13.55 14h-1.62l-.73-.73zM7 14v-1.49l1-1L10.52 14H7zm5.5-3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"},"child":[]}]})(props);
};
function VscFilePdf (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.85 4.44l-3.28-3.3-.35-.14H2.5l-.5.5V7h1V2h6v3.5l.5.5H13v1h1V4.8l-.15-.36zM10 5V2l3 3h-3zM2.5 8l-.5.5v6l.5.5h11l.5-.5v-6l-.5-.5h-11zM13 13v1H3V9h10v4zm-8-1h-.32v1H4v-3h1.06c.75 0 1.13.36 1.13 1a.94.94 0 0 1-.32.72A1.33 1.33 0 0 1 5 12zm-.06-1.45h-.26v.93h.26c.36 0 .54-.16.54-.47 0-.31-.18-.46-.54-.46zM9 12.58a1.48 1.48 0 0 0 .44-1.12c0-1-.53-1.46-1.6-1.46H6.78v3h1.06A1.6 1.6 0 0 0 9 12.58zm-1.55-.13v-1.9h.33a.94.94 0 0 1 .7.25.91.91 0 0 1 .25.67 1 1 0 0 1-.25.72.94.94 0 0 1-.69.26h-.34zm4.45-.61h-.97V13h-.68v-3h1.74v.55h-1.06v.74h.97v.55z"},"child":[]}]})(props);
};
function VscFileSubmodule (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 11h1V6.99H2V11zm1-5.01V5.5l.5-.5h4.43l.43.25.43.75h5.71l.5.5v8l-.5.5h-11l-.5-.5V12H1.5l-.5-.5v-9l.5-.5h4.42l.44.25.43.75h5.71l.5.5V6l-1-.03V4H6.5l-.43-.25L5.64 3H2v2.99h1zm5.07.76L7.64 6H4v3h3.15l.41-.74L8 8h6V7H8.5l-.43-.25zM7.45 10H4v4h10V9H8.3l-.41.74-.44.26z"},"child":[]}]})(props);
};
function VscFileSymlinkDirectory (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.71 3h6.79l.51.5v10l-.5.5h-13l-.5-.5v-11l.5-.5h5l.35.15.85.85zm6.28 10v-1.51l.01-4v-1.5H7.7l-.86.86-.35.15H2v6h11.99zm-6.5-8h6.5l.01-.99H7.5l-.36-.15-.85-.85H2v3h4.28l.86-.86.35-.15zm2.29 4.07L8.42 7.7l.74-.69 2.22 2.22v.71l-2.29 2.21-.7-.72 1.4-1.35H8.42a2 2 0 0 0-1.35.61A1.8 1.8 0 0 0 6.54 12h-1a2.76 2.76 0 0 1 .81-2 3 3 0 0 1 2-.93h1.43z"},"child":[]}]})(props);
};
function VscFileSymlinkFile (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.57 1.14l3.28 3.3.15.36v9.7l-.5.5H10v-1h3V6H9.5L9 5.5V2H3v4H2V1.5l.5-.5h7.72l.35.14zM10 5h3l-3-3v3zM8.5 7h-7l-.5.5v7l.5.5h7l.5-.5v-7L8.5 7zM8 14H2V8h6v6zM7 9.5v3H6v-1.793l-2.646 2.647-.708-.708L5.293 10H3.53V9H6.5l.5.5z"},"child":[]}]})(props);
};
function VscFileZip (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.5 1h11l.5.5v5l-.15.35-.85.86v6.79l-.5.5h-10l-.5-.5v-13l.5-.5zM6 2H5v2h1V2zm0 12h4V7.68l-.85-.85L9 6.47V2H7v2.5l-.5.5H6v1H5V5h-.5L4 4.5V2H3v12h2v-1h1v1zm0-2v1h1v-1H6zm0-1v1H5v-1h1zm0-1h1v1H6v-1zm0-1v1H5V9h1zm0-1h1v1H6V8zm0-1v1H5V7h1zm0 0h1V6H6v1zm6.15.15l.85-.86V2h-3v4.27l.85.85.15.35V14h1V7.5l.15-.35z"},"child":[]}]})(props);
};
function VscFile (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z"},"child":[]}]})(props);
};
function VscFiles (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z"},"child":[]}]})(props);
};
function VscFilterFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15 2v1.67l-5 4.759V14H6V8.429l-5-4.76V2h14z"},"child":[]}]})(props);
};
function VscFilter (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15 2v1.67l-5 4.759V14H6V8.429l-5-4.76V2h14zM7 8v5h2V8l5-4.76V3H2v.24L7 8z"},"child":[]}]})(props);
};
function VscFlame (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.13 15l-.53-.77a1.85 1.85 0 0 0-.28-2.54 3.51 3.51 0 0 1-1.19-2c-1.56 2.23-.75 3.46 0 4.55l-.55.76A4.4 4.4 0 0 1 3 10.46S2.79 8.3 5.28 6.19c0 0 2.82-2.61 1.84-4.54L7.83 1a6.57 6.57 0 0 1 2.61 6.94 2.57 2.57 0 0 0 .56-.81l.87-.07c.07.12 1.84 2.93.89 5.3A4.72 4.72 0 0 1 9.13 15zm-2-6.95l.87.39a3 3 0 0 0 .92 2.48 2.64 2.64 0 0 1 1 2.8A3.241 3.241 0 0 0 11.8 12a4.87 4.87 0 0 0-.41-3.63 1.85 1.85 0 0 1-1.84.86l-.35-.68a5.31 5.31 0 0 0-.89-5.8C8.17 4.87 6 6.83 5.93 6.94 3.86 8.7 4 10.33 4 10.4a3.47 3.47 0 0 0 1.59 3.14C5 12.14 5 10.46 7.16 8.05h-.03z"},"child":[]}]})(props);
};
function VscFoldDown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.207 1.707L13.5 1l-6 6-6-6-.707.707 6.353 6.354h.708l6.353-6.354zm0 6L13.5 7l-6 6-6-6-.707.707 6.353 6.354h.708l6.353-6.354z"},"child":[]}]})(props);
};
function VscFoldUp (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 7.4l.7.7 6-6 6 6 .7-.7L8.1 1h-.7L1 7.4zm0 6l.7.7 6-6 6 6 .7-.7L8.1 7h-.7L1 13.4z"},"child":[]}]})(props);
};
function VscFold (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.952 2.381L7.976 6.357 4 2.381 3.38 3l4.286 4.285h.619L12.57 3l-.618-.619zM3.904 14l4.072-4.072L12.047 14l.62-.619L8.284 9h-.619l-4.381 4.381.619.619z"},"child":[]}]})(props);
};
function VscFolderActive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.71 3h6.79l.51.5v4.507A4.997 4.997 0 0 0 14 7.416V5.99H7.69l-.86.86-.35.15H1.99v6H7.1c.07.348.177.682.316 1H1.51l-.5-.5v-11l.5-.5h5l.35.15.85.85zm-.22 2h6.5l.01-.99H7.5l-.36-.15-.85-.85H2v3h4.28l.86-.86.35-.15z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.778 8.674a4 4 0 1 1 4.444 6.652 4 4 0 0 1-4.444-6.652zm2.13 4.99l2.387-3.182-.8-.6-2.077 2.769-1.301-1.041-.625.78 1.704 1.364.713-.09z"},"child":[]}]})(props);
};
function VscFolderLibrary (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.70996 3H14.5L15.01 3.5V7H14V5.98999H7.68994L6.82996 6.84998L6.47998 7H1.98999V7.48999V11.49V13H7V14H1.51001L1.01001 13.5V6.5V2.5L1.51001 2H6.51001L6.85999 2.15002L7.70996 3ZM7.48999 5H13.99L14 4.01001H7.5L7.14001 3.85999L6.29004 3.01001H2V6.01001H6.28003L7.14001 5.15002L7.48999 5Z"},"child":[]},{"tag":"rect","attr":{"x":"8","y":"8","width":"1","height":"6"},"child":[]},{"tag":"rect","attr":{"x":"10","y":"8","width":"1","height":"6"},"child":[]},{"tag":"rect","attr":{"x":"12.0041","y":"8.35193","width":"1","height":"6","transform":"rotate(-20 12.0041 8.35193)"},"child":[]}]})(props);
};
function VscFolderOpened (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1.5 14h11l.48-.37 2.63-7-.48-.63H14V3.5l-.5-.5H7.71l-.86-.85L6.5 2h-5l-.5.5v11l.5.5zM2 3h4.29l.86.85.35.15H13v2H8.5l-.35.15-.86.85H3.5l-.47.34-1 3.08L2 3zm10.13 10H2.19l1.67-5H7.5l.35-.15.86-.85h5.79l-2.37 6z"},"child":[]}]})(props);
};
function VscFolder (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.5 3H7.71l-.85-.85L6.51 2h-5l-.5.5v11l.5.5h13l.5-.5v-10L14.5 3zm-.51 8.49V13h-12V7h4.49l.35-.15.86-.86H14v1.5l-.01 4zm0-6.49h-6.5l-.35.15-.86.86H2v-3h4.29l.85.85.36.15H14l-.01.99z"},"child":[]}]})(props);
};
function VscGame (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 3H12C14.2091 3 16 4.79086 16 7V10C16 12.2091 14.2091 14 12 14H4C1.79086 14 0 12.2091 0 10V7C0 4.79086 1.79086 3 4 3ZM4 4C2.34315 4 1 5.34315 1 7V10C1 11.6569 2.34315 13 4 13H12C13.6569 13 15 11.6569 15 10V7C15 5.34315 13.6569 4 12 4H4Z"},"child":[]},{"tag":"path","attr":{"d":"M5.5 6C5.22386 6 5 6.22386 5 6.5V8H3.5C3.22386 8 3 8.22386 3 8.5C3 8.77614 3.22386 9 3.5 9H5V10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5V9H7.5C7.77614 9 8 8.77614 8 8.5C8 8.22386 7.77614 8 7.5 8H6V6.5C6 6.22386 5.77614 6 5.5 6Z"},"child":[]},{"tag":"path","attr":{"d":"M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z"},"child":[]},{"tag":"path","attr":{"d":"M12 10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10C10 9.44772 10.4477 9 11 9C11.5523 9 12 9.44772 12 10Z"},"child":[]}]})(props);
};
function VscGear (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.1 4.4L8.6 2H7.4l-.5 2.4-.7.3-2-1.3-.9.8 1.3 2-.2.7-2.4.5v1.2l2.4.5.3.8-1.3 2 .8.8 2-1.3.8.3.4 2.3h1.2l.5-2.4.8-.3 2 1.3.8-.8-1.3-2 .3-.8 2.3-.4V7.4l-2.4-.5-.3-.8 1.3-2-.8-.8-2 1.3-.7-.2zM9.4 1l.5 2.4L12 2.1l2 2-1.4 2.1 2.4.4v2.8l-2.4.5L14 12l-2 2-2.1-1.4-.5 2.4H6.6l-.5-2.4L4 13.9l-2-2 1.4-2.1L1 9.4V6.6l2.4-.5L2.1 4l2-2 2.1 1.4.4-2.4h2.8zm.6 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8 9c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"},"child":[]}]})(props);
};
function VscGift (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.5 4h-1.6c.1-.4.1-.8.1-1.2-.1-.3-.2-.6-.4-.9-.2-.3-.4-.5-.7-.6-.3-.1-.6-.3-.9-.3-.3 0-.6 0-.9.2-.7.2-1.2.7-1.6 1.3-.4-.6-.9-1.1-1.6-1.3-.3-.1-.6-.2-.9-.2-.3 0-.6.1-.9.3-.3.1-.5.3-.7.6-.2.2-.3.6-.4.9 0 .4 0 .8.1 1.2H1.5l-.5.5v9l.5.5h12l.5-.5v-9l-.5-.5zM7 13H2V5h5v8zm0-9H4v-.2c-.1-.3-.1-.5-.1-.8.1-.2.1-.4.3-.5.1-.2.3-.3.5-.4.1-.1.3-.1.5-.1s.4 0 .6.1c.3.1.6.3.8.6.2.3.4.6.4 1V4zm1-.3c0-.4.2-.7.4-1 .2-.3.5-.5.8-.6.2-.1.4-.1.6-.1.2 0 .4 0 .6.1.2.1.3.2.5.4.1.1.1.3.2.5 0 .3 0 .5-.1.8 0 .1 0 .1-.1.2H8v-.3zm5 9.3H8V5h5v8z"},"child":[]}]})(props);
};
function VscGistSecret (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3 14h4v.91l.09.09H2.5l-.5-.5v-13l.5-.5h7.72l.35.14 3.28 3.3.15.36v2.54a3.1 3.1 0 0 0-1-.94V6H9.5L9 5.5V2H3v12zm10-9l-3-3v3h3zm.5 4v1h1l.5.5v4l-.5.5h-6l-.5-.5v-4l.5-.5h1V9a2 2 0 0 1 4 0zm-2.707-.707A1 1 0 0 0 10.5 9v1h2V9a1 1 0 0 0-1.707-.707zM9 11v3h5v-3H9z"},"child":[]}]})(props);
};
function VscGist (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.57 1.14l3.28 3.3.15.36v9.7l-.5.5h-11l-.5-.5v-13l.5-.5h7.72l.35.14zM10 5h3l-3-3v3zM3 2v12h10V6H9.5L9 5.5V2H3zm2.062 7.533l1.817-1.828L6.17 7 4 9.179v.707l2.171 2.174.707-.707-1.816-1.82zM8.8 7.714l.7-.709 2.189 2.175v.709L9.5 12.062l-.705-.709 1.831-1.82L8.8 7.714z"},"child":[]}]})(props);
};
function VscGitCommit (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.5 0H8.5V4.03095C10.4732 4.277 12 5.96019 12 8C12 10.0398 10.4732 11.723 8.5 11.9691V16H7.5V11.9691C5.52684 11.723 4 10.0398 4 8C4 5.96019 5.52684 4.277 7.5 4.03095V0ZM8 10.6C9.43594 10.6 10.6 9.43594 10.6 8C10.6 6.56406 9.43594 5.4 8 5.4C6.56406 5.4 5.4 6.56406 5.4 8C5.4 9.43594 6.56406 10.6 8 10.6Z"},"child":[]}]})(props);
};
function VscGitCompare (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.389 12.99l-1.27-1.27.67-.7 2.13 2.13v.7l-2.13 2.13-.71-.71L7.349 14h-1.85a2.49 2.49 0 0 1-2.5-2.5V5.95a2.59 2.59 0 0 1-1.27-.68 2.52 2.52 0 0 1-.54-2.73A2.5 2.5 0 0 1 3.499 1a2.45 2.45 0 0 1 1 .19 2.48 2.48 0 0 1 1.35 1.35c.133.317.197.658.19 1a2.5 2.5 0 0 1-2 2.45v5.5a1.5 1.5 0 0 0 1.5 1.5h1.85zm-4.68-8.25a1.5 1.5 0 0 0 2.08-2.08 1.55 1.55 0 0 0-.68-.56 1.49 1.49 0 0 0-.86-.08 1.49 1.49 0 0 0-1.18 1.18 1.49 1.49 0 0 0 .08.86c.117.277.311.513.56.68zm10.33 6.3c.48.098.922.335 1.27.68a2.51 2.51 0 0 1 .31 3.159 2.5 2.5 0 1 1-3.47-3.468c.269-.182.571-.308.89-.37V5.49a1.5 1.5 0 0 0-1.5-1.5h-1.85l1.27 1.27-.71.71-2.13-2.13v-.7l2.13-2.13.71.71-1.27 1.27h1.85a2.49 2.49 0 0 1 2.5 2.5v5.55zm-.351 3.943a1.5 1.5 0 0 0 1.1-2.322 1.55 1.55 0 0 0-.68-.56 1.49 1.49 0 0 0-.859-.08 1.49 1.49 0 0 0-1.18 1.18 1.49 1.49 0 0 0 .08.86 1.5 1.5 0 0 0 1.539.922z"},"child":[]}]})(props);
};
function VscGitFetch (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9 2H8V3H9V2Z"},"child":[]},{"tag":"path","attr":{"d":"M8.14644 14L3.14645 9.00001L3.85356 8.2929L8 12.4393L8 11L9 11L9 12.4393L13.1464 8.2929L13.8535 9.00001L8.85354 14H8.14644Z"},"child":[]},{"tag":"path","attr":{"d":"M8 5H9V6H8V5Z"},"child":[]},{"tag":"path","attr":{"d":"M9 8H8V9H9V8Z"},"child":[]}]})(props);
};
function VscGitMerge (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.273 7.73a2.51 2.51 0 0 0-3.159-.31 2.5 2.5 0 0 0-.921 1.12 2.23 2.23 0 0 0-.13.44 4.52 4.52 0 0 1-4-4 2.23 2.23 0 0 0 .44-.13 2.5 2.5 0 0 0 1.54-2.31 2.45 2.45 0 0 0-.19-1A2.48 2.48 0 0 0 5.503.19a2.45 2.45 0 0 0-1-.19 2.5 2.5 0 0 0-2.31 1.54 2.52 2.52 0 0 0 .54 2.73c.35.343.79.579 1.27.68v5.1a2.411 2.411 0 0 0-.89.37 2.5 2.5 0 1 0 3.47 3.468 2.5 2.5 0 0 0 .42-1.387 2.45 2.45 0 0 0-.19-1 2.48 2.48 0 0 0-1.81-1.49v-2.4a5.52 5.52 0 0 0 2 1.73 5.65 5.65 0 0 0 2.09.6 2.5 2.5 0 0 0 4.95-.49 2.51 2.51 0 0 0-.77-1.72zm-8.2 3.38c.276.117.512.312.68.56a1.5 1.5 0 0 1-2.08 2.08 1.55 1.55 0 0 1-.56-.68 1.49 1.49 0 0 1-.08-.86 1.49 1.49 0 0 1 1.18-1.18 1.49 1.49 0 0 1 .86.08zM4.503 4a1.5 1.5 0 0 1-1.39-.93 1.49 1.49 0 0 1-.08-.86 1.49 1.49 0 0 1 1.18-1.18 1.49 1.49 0 0 1 .86.08A1.5 1.5 0 0 1 4.503 4zm8.06 6.56a1.5 1.5 0 0 1-2.45-.49 1.49 1.49 0 0 1-.08-.86 1.49 1.49 0 0 1 1.18-1.18 1.49 1.49 0 0 1 .86.08 1.499 1.499 0 0 1 .49 2.45z"},"child":[]}]})(props);
};
function VscGitPullRequestClosed (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.61594 4.92769C5.34304 5.33899 4.95319 5.66062 4.49705 5.8497C4.34891 5.91013 4.03897 5.9881 4.03897 5.9881V10.9958C4.19686 11.027 4.35086 11.0738 4.499 11.1362C4.95513 11.3272 5.34304 11.6469 5.61789 12.0582C5.89079 12.4695 6.03699 12.9529 6.03699 13.4461C6.04478 13.7891 5.98046 14.1303 5.84791 14.446C5.72315 14.7482 5.53992 15.023 5.30796 15.255C5.07794 15.487 4.80114 15.6702 4.499 15.7949C4.18322 15.9275 3.84209 15.9918 3.49902 15.984C3.00585 15.986 2.52243 15.8398 2.11113 15.5649C1.69983 15.292 1.3782 14.9022 1.18912 14.446C1.00198 13.988 0.953253 13.485 1.04877 12.9997C1.14428 12.5143 1.38015 12.0679 1.72907 11.717C2.07799 11.374 2.51853 11.1381 2.99805 11.0367V5.94911C2.52048 5.8458 2.07994 5.61189 1.72907 5.26881C1.38015 4.91794 1.14428 4.47155 1.04877 3.98618C0.951304 3.50081 1.00004 2.99789 1.18912 2.53981C1.3782 2.08368 1.69983 1.69382 2.11113 1.42092C2.52048 1.14607 3.0039 0.999877 3.49902 0.999877C3.84014 0.99403 4.18127 1.05836 4.49705 1.18896C4.79919 1.31371 5.07404 1.49695 5.30601 1.72891C5.53797 1.96087 5.7212 2.23767 5.84596 2.53981C5.97851 2.8556 6.04284 3.19672 6.03504 3.5398C6.03699 4.03296 5.89079 4.51639 5.61594 4.92769ZM4.85962 12.7892C4.73097 12.5494 4.53994 12.3486 4.30797 12.2102C4.07601 12.0699 3.80896 11.9958 3.538 11.9997C3.24171 11.9997 2.95322 12.0855 2.70761 12.2492C2.46005 12.4168 2.26512 12.6527 2.14816 12.9295C2.03706 13.2024 2.00977 13.5006 2.06824 13.7891C2.12477 14.0796 2.26707 14.3486 2.47759 14.5591C2.68812 14.7696 2.95517 14.9119 3.24756 14.9685C3.53606 15.0269 3.8343 14.9996 4.1072 14.8885C4.38399 14.7716 4.61986 14.5766 4.7875 14.3291C4.93759 14.103 5.02336 13.8398 5.037 13.5689C5.0487 13.2979 4.98827 13.0289 4.85962 12.7892ZM2.70761 4.74056C2.95517 4.90235 3.24366 4.99006 3.538 4.99006C3.80896 4.99006 4.07601 4.91599 4.30797 4.77954C4.53994 4.63919 4.73097 4.44037 4.85962 4.2006C4.98827 3.96084 5.05065 3.69184 5.037 3.42089C5.02336 3.14994 4.93759 2.88679 4.7875 2.66067C4.61986 2.41311 4.38399 2.21818 4.1072 2.10122C3.8343 1.99011 3.53606 1.96282 3.24756 2.0213C2.95712 2.07783 2.68812 2.22013 2.47759 2.43065C2.26707 2.64118 2.12477 2.90823 2.06824 3.20062C2.00977 3.48911 2.03706 3.78735 2.14816 4.06025C2.26512 4.33705 2.46005 4.57292 2.70761 4.74056ZM13.0368 11.0368C13.5164 11.1342 13.9588 11.372 14.3058 11.7171C14.7717 12.1868 15.0348 12.8243 15.0309 13.4831C15.0329 13.9763 14.8867 14.4597 14.6119 14.871C14.339 15.2823 13.9491 15.6039 13.493 15.793C13.0368 15.984 12.532 16.0347 12.0466 15.9392C11.5612 15.8437 11.1148 15.6059 10.764 15.255C10.415 14.9041 10.1753 14.4578 10.0798 13.9724C9.98425 13.487 10.0349 12.9841 10.226 12.526C10.4189 12.0738 10.7386 11.6839 11.146 11.4071C11.4131 11.2239 11.7172 11.0991 12.0349 11.0368V7.4891H13.0368V11.0368ZM13.5943 14.5455C13.8399 14.3018 13.992 13.9802 14.0271 13.6352C14.0622 13.2921 13.9764 12.9451 13.7854 12.6566C13.6177 12.4091 13.3819 12.2141 13.1051 12.0972C12.8322 11.9861 12.5339 11.9588 12.2454 12.0173C11.955 12.0738 11.686 12.2161 11.4755 12.4266C11.2649 12.6371 11.1226 12.9042 11.0661 13.1966C11.0076 13.4851 11.0349 13.7833 11.146 14.0562C11.263 14.333 11.4579 14.5689 11.7055 14.7365C11.994 14.9275 12.339 15.0133 12.684 14.9782C13.0271 14.9431 13.3507 14.7911 13.5943 14.5455Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.6876 3.40036L10 5.088L10.7071 5.7951L12.3947 4.10747L14.0824 5.7951L14.7895 5.088L13.1019 3.40036L14.7895 1.71272L14.0824 1.00562L12.3947 2.69325L10.7071 1.00562L10 1.71272L11.6876 3.40036Z"},"child":[]}]})(props);
};
function VscGitPullRequestCreate (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.616 4.928a2.487 2.487 0 0 1-1.119.922c-.148.06-.458.138-.458.138v5.008a2.51 2.51 0 0 1 1.579 1.062c.273.412.419.895.419 1.388.008.343-.057.684-.19 1A2.485 2.485 0 0 1 3.5 15.984a2.482 2.482 0 0 1-1.388-.419A2.487 2.487 0 0 1 1.05 13c.095-.486.331-.932.68-1.283.349-.343.79-.579 1.269-.68V5.949a2.6 2.6 0 0 1-1.269-.68 2.503 2.503 0 0 1-.68-1.283 2.487 2.487 0 0 1 1.06-2.565A2.49 2.49 0 0 1 3.5 1a2.504 2.504 0 0 1 1.807.729 2.493 2.493 0 0 1 .729 1.81c.002.494-.144.978-.42 1.389zm-.756 7.861a1.5 1.5 0 0 0-.552-.579 1.45 1.45 0 0 0-.77-.21 1.495 1.495 0 0 0-1.47 1.79 1.493 1.493 0 0 0 1.18 1.179c.288.058.586.03.86-.08.276-.117.512-.312.68-.56.15-.226.235-.49.249-.76a1.51 1.51 0 0 0-.177-.78zM2.708 4.741c.247.161.536.25.83.25.271 0 .538-.075.77-.211a1.514 1.514 0 0 0 .729-1.359 1.513 1.513 0 0 0-.25-.76 1.551 1.551 0 0 0-.68-.56 1.49 1.49 0 0 0-.86-.08 1.494 1.494 0 0 0-1.179 1.18c-.058.288-.03.586.08.86.117.276.312.512.56.68zM13.037 7h-1.002V5.49a1.5 1.5 0 0 0-1.5-1.5H8.687l1.269 1.27-.71.709L7.117 3.84v-.7l2.13-2.13.71.711-1.269 1.27h1.85a2.484 2.484 0 0 1 2.312 1.541c.125.302.189.628.187.957V7zM13 16h-1v-3H9v-1h3V9h1v3h3v1h-3v3z"},"child":[]}]})(props);
};
function VscGitPullRequestDraft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.49705 5.8497C4.95319 5.66062 5.34304 5.33899 5.61594 4.92769C5.89079 4.51639 6.03699 4.03296 6.03504 3.5398C6.04284 3.19672 5.97851 2.8556 5.84596 2.53981C5.7212 2.23767 5.53797 1.96087 5.30601 1.72891C5.07404 1.49695 4.79919 1.31371 4.49705 1.18896C4.18127 1.05836 3.84014 0.99403 3.49902 0.999877C3.0039 0.999877 2.52048 1.14607 2.11113 1.42092C1.69983 1.69382 1.3782 2.08368 1.18912 2.53981C1.00004 2.99789 0.951304 3.50081 1.04877 3.98618C1.14428 4.47155 1.38015 4.91794 1.72907 5.26881C2.07994 5.61189 2.52048 5.8458 2.99805 5.94911V11.0367C2.51853 11.1381 2.07799 11.374 1.72907 11.717C1.38015 12.0679 1.14428 12.5143 1.04877 12.9997C0.953253 13.485 1.00198 13.988 1.18912 14.446C1.3782 14.9022 1.69983 15.292 2.11113 15.5649C2.52243 15.8398 3.00585 15.986 3.49902 15.984C3.84209 15.9918 4.18322 15.9275 4.499 15.7949C4.80114 15.6702 5.07794 15.487 5.30796 15.255C5.53992 15.023 5.72315 14.7482 5.84791 14.446C5.98046 14.1303 6.04478 13.7891 6.03699 13.4461C6.03699 12.9529 5.89079 12.4695 5.61789 12.0582C5.34304 11.6469 4.95513 11.3272 4.499 11.1362C4.35086 11.0738 4.19686 11.027 4.03897 10.9958V5.9881C4.03897 5.9881 4.34891 5.91013 4.49705 5.8497ZM4.30797 12.2102C4.53994 12.3486 4.73097 12.5494 4.85962 12.7892C4.98827 13.0289 5.0487 13.2979 5.037 13.5689C5.02336 13.8398 4.93759 14.103 4.7875 14.3291C4.61986 14.5766 4.38399 14.7716 4.1072 14.8885C3.8343 14.9996 3.53606 15.0269 3.24756 14.9685C2.95517 14.9119 2.68812 14.7696 2.47759 14.5591C2.26707 14.3486 2.12477 14.0796 2.06824 13.7891C2.00977 13.5006 2.03706 13.2024 2.14816 12.9295C2.26512 12.6527 2.46005 12.4168 2.70761 12.2492C2.95322 12.0855 3.24171 11.9997 3.538 11.9997C3.80896 11.9958 4.07601 12.0699 4.30797 12.2102ZM3.538 4.99006C3.24366 4.99006 2.95517 4.90235 2.70761 4.74056C2.46005 4.57292 2.26512 4.33705 2.14816 4.06025C2.03706 3.78735 2.00977 3.48911 2.06824 3.20062C2.12477 2.90823 2.26707 2.64118 2.47759 2.43065C2.68812 2.22013 2.95712 2.07783 3.24756 2.0213C3.53606 1.96282 3.8343 1.99011 4.1072 2.10122C4.38399 2.21818 4.61986 2.41311 4.7875 2.66067C4.93759 2.88679 5.02336 3.14994 5.037 3.42089C5.05065 3.69184 4.98827 3.96084 4.85962 4.2006C4.73097 4.44037 4.53994 4.63919 4.30797 4.77954C4.07601 4.91599 3.80896 4.99006 3.538 4.99006Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15.0543 13.5C15.0543 14.8807 13.935 16 12.5543 16C11.1736 16 10.0543 14.8807 10.0543 13.5C10.0543 12.1193 11.1736 11 12.5543 11C13.935 11 15.0543 12.1193 15.0543 13.5ZM12.5543 15C13.3827 15 14.0543 14.3284 14.0543 13.5C14.0543 12.6716 13.3827 12 12.5543 12C11.7258 12 11.0543 12.6716 11.0543 13.5C11.0543 14.3284 11.7258 15 12.5543 15Z"},"child":[]},{"tag":"circle","attr":{"cx":"12.5543","cy":"7.75073","r":"1"},"child":[]},{"tag":"circle","attr":{"cx":"12.5543","cy":"3.50146","r":"1"},"child":[]}]})(props);
};
function VscGitPullRequestGoToChanges (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.99994 10V14L3.99994 15H12.9999L13.9999 14V5L13.7099 4.29L10.7099 1.29L9.99994 1H8V2H9.99994L12.9999 5V14H3.99994V10H2.99994ZM11 6H9V4H8V6H6V7H8V9H9V7H11V6ZM6 11H11V12H6V11Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.06065 3.85356L4.91421 6L4.2071 5.29289L5.49999 4H2.5C2.10218 4 1.72064 4.15804 1.43934 4.43934C1.15804 4.72065 1 5.10218 1 5.5C1 5.89783 1.15804 6.27936 1.43934 6.56066C1.72064 6.84197 2.10218 7 2.5 7H3V8H2.5C1.83696 8 1.20107 7.73661 0.732233 7.26777C0.263392 6.79893 0 6.16305 0 5.5C0 4.83696 0.263392 4.20108 0.732233 3.73224C1.20107 3.2634 1.83696 3 2.5 3H5.49999L4.2071 1.70711L4.91421 1L7.06065 3.14645L7.06065 3.85356Z"},"child":[]}]})(props);
};
function VscGitPullRequestNewChanges (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.7099 4.29L10.7099 1.29L9.99994 1H3.99994L2.99994 2V14L3.99994 15H9.35418C9.03018 14.714 8.75287 14.3764 8.53513 14H3.99994V2H9.99994L12.9999 5V8.126C13.3547 8.21731 13.6904 8.35606 13.9999 8.53509V5L13.7099 4.29ZM8.12602 11H6V12H8C8 11.6547 8.04375 11.3196 8.12602 11ZM6 6H8V4H9V6H11V7H9V9H8V7H6V6Z"},"child":[]},{"tag":"path","attr":{"d":"M12 9C11.4067 9 10.8266 9.17595 10.3333 9.50559C9.83994 9.83524 9.45543 10.3038 9.22836 10.8519C9.0013 11.4001 8.94189 12.0033 9.05765 12.5853C9.1734 13.1672 9.45912 13.7018 9.87868 14.1213C10.2982 14.5409 10.8328 14.8266 11.4147 14.9424C11.9967 15.0581 12.5999 14.9987 13.1481 14.7716C13.6962 14.5446 14.1648 14.1601 14.4944 13.6667C14.8241 13.1734 15 12.5933 15 12C14.999 11.2047 14.6826 10.4422 14.1202 9.87976C13.5578 9.31736 12.7954 9.00098 12 9Z"},"child":[]}]})(props);
};
function VscGitPullRequest (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.616 4.928a2.487 2.487 0 0 1-1.119.922c-.148.06-.458.138-.458.138v5.008a2.51 2.51 0 0 1 1.579 1.062c.273.412.419.895.419 1.388.008.343-.057.684-.19 1A2.485 2.485 0 0 1 3.5 15.984a2.482 2.482 0 0 1-1.388-.419A2.487 2.487 0 0 1 1.05 13c.095-.486.331-.932.68-1.283.349-.343.79-.579 1.269-.68V5.949a2.6 2.6 0 0 1-1.269-.68 2.503 2.503 0 0 1-.68-1.283 2.487 2.487 0 0 1 1.06-2.565A2.49 2.49 0 0 1 3.5 1a2.504 2.504 0 0 1 1.807.729 2.493 2.493 0 0 1 .729 1.81c.002.494-.144.978-.42 1.389zm-.756 7.861a1.5 1.5 0 0 0-.552-.579 1.45 1.45 0 0 0-.77-.21 1.495 1.495 0 0 0-1.47 1.79 1.493 1.493 0 0 0 1.18 1.179c.288.058.586.03.86-.08.276-.117.512-.312.68-.56.15-.226.235-.49.249-.76a1.51 1.51 0 0 0-.177-.78zM2.708 4.741c.247.161.536.25.83.25.271 0 .538-.075.77-.211a1.514 1.514 0 0 0 .729-1.359 1.513 1.513 0 0 0-.25-.76 1.551 1.551 0 0 0-.68-.56 1.49 1.49 0 0 0-.86-.08 1.494 1.494 0 0 0-1.179 1.18c-.058.288-.03.586.08.86.117.276.312.512.56.68zm10.329 6.296c.48.097.922.335 1.269.68.466.47.729 1.107.725 1.766.002.493-.144.977-.42 1.388a2.499 2.499 0 0 1-4.532-.899 2.5 2.5 0 0 1 1.067-2.565c.267-.183.571-.308.889-.37V5.489a1.5 1.5 0 0 0-1.5-1.499H8.687l1.269 1.27-.71.709L7.117 3.84v-.7l2.13-2.13.71.711-1.269 1.27h1.85a2.484 2.484 0 0 1 2.312 1.541c.125.302.189.628.187.957v5.548zm.557 3.509a1.493 1.493 0 0 0 .191-1.89 1.552 1.552 0 0 0-.68-.559 1.49 1.49 0 0 0-.86-.08 1.493 1.493 0 0 0-1.179 1.18 1.49 1.49 0 0 0 .08.86 1.496 1.496 0 0 0 2.448.49z"},"child":[]}]})(props);
};
function VscGitStashApply (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.00013 3.20711L7.00013 5H8.00013L8.00013 3.20711L10.6466 5.85356L11.3537 5.14645L7.85368 1.64645H7.14658L3.64658 5.14645L4.35368 5.85356L7.00013 3.20711Z"},"child":[]},{"tag":"path","attr":{"d":"M1.50012 9L1.00012 9.5V14.5L1.50012 15H13.5001L14.0001 14.5V9.5L13.5001 9H9.95012C9.71848 10.1411 8.7096 11 7.50012 11C6.29064 11 5.28177 10.1411 5.05013 9H1.50012ZM10.6633 10H13.0001V14H2.00012V10H4.33694C4.89867 11.1825 6.10392 12 7.50012 12C8.89632 12 10.1016 11.1825 10.6633 10Z"},"child":[]},{"tag":"rect","attr":{"x":"7","y":"6","width":"1","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"7","y":"8","width":"1","height":"1"},"child":[]}]})(props);
};
function VscGitStashPop (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.00013 3.20711L7.00013 9H8.00013L8.00013 3.20711L10.6466 5.85356L11.3537 5.14645L7.85368 1.64645H7.14658L3.64658 5.14645L4.35368 5.85356L7.00013 3.20711Z"},"child":[]},{"tag":"path","attr":{"d":"M1.50012 9L1.00012 9.5V14.5L1.50012 15H13.5001L14.0001 14.5V9.5L13.5001 9H9.95012C9.71848 10.1411 8.7096 11 7.50012 11C6.29064 11 5.28177 10.1411 5.05013 9H1.50012ZM10.6633 10H13.0001V14H2.00012V10H4.33694C4.89867 11.1825 6.10392 12 7.50012 12C8.89632 12 10.1016 11.1825 10.6633 10Z"},"child":[]}]})(props);
};
function VscGitStash (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.00013 6.79289L7.00013 1H8.00013L8.00013 6.79289L10.6466 4.14644L11.3537 4.85355L7.85368 8.35355H7.14658L3.64658 4.85355L4.35368 4.14644L7.00013 6.79289Z"},"child":[]},{"tag":"path","attr":{"d":"M1.50012 9L1.00012 9.5V14.5L1.50012 15H13.5001L14.0001 14.5V9.5L13.5001 9H9.95012C9.71848 10.1411 8.7096 11 7.50012 11C6.29064 11 5.28177 10.1411 5.05013 9H1.50012ZM10.6633 10H13.0001V14H2.00012V10H4.33694C4.89867 11.1825 6.10392 12 7.50012 12C8.89632 12 10.1016 11.1825 10.6633 10Z"},"child":[]}]})(props);
};
function VscGithubAction (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.04 10h2.58l.65 1H2.54l-.5-.5v-9l.5-.5h12l.5.5v4.77l-1-1.75V2h-11v8zm5.54 1l-1.41 3.47h2.2L15 8.7 14.27 7h-1.63l.82-1.46L12.63 4H9.76l-.92.59-2.28 5L7.47 11h1.11zm1.18-6h2.87l-1.87 3h3.51l-5.76 5.84L10.2 10H7.47l2.29-5zM6.95 7H4.04V6H7.4l-.45 1zm-.9 2H4.04V8H6.5l-.45 1z"},"child":[]}]})(props);
};
function VscGithubAlt (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M21.035 5.257c.91 1.092 1.364 2.366 1.364 3.822 0 5.277-3.002 6.824-5.823 7.279.364.637.455 1.365.455 2.093v3.73c0 .455-.273.728-.637.728a.718.718 0 0 1-.728-.728v-3.73a2.497 2.497 0 0 0-.728-2.093l.455-1.183c2.821-.364 5.733-1.274 5.733-6.187 0-1.183-.455-2.275-1.274-3.185l-.182-.727a4.04 4.04 0 0 0 .09-2.73c-.454.09-1.364.273-2.91 1.365l-.547.09a13.307 13.307 0 0 0-6.55 0l-.547-.09C7.57 2.71 6.66 2.437 6.204 2.437c-.273.91-.273 1.91.09 2.73l-.181.727c-.91.91-1.365 2.093-1.365 3.185 0 4.822 2.73 5.823 5.732 6.187l.364 1.183c-.546.546-.819 1.274-.728 2.002v3.821a.718.718 0 0 1-.728.728.718.718 0 0 1-.728-.728V20.18c-3.002.637-4.185-.91-5.095-2.092-.455-.546-.819-1.001-1.274-1.092-.09-.091-.364-.455-.273-.819.091-.364.455-.637.82-.455.91.182 1.455.91 2 1.547.82 1.092 1.639 2.092 4.095 1.547v-.364c-.09-.728.091-1.456.455-2.093-2.73-.546-5.914-2.093-5.914-7.279 0-1.456.455-2.73 1.365-3.822-.273-1.273-.182-2.638.273-3.73l.455-.364C5.749 1.073 7.023.8 9.66 2.437a13.673 13.673 0 0 1 6.642 0C18.851.708 20.216.98 20.398 1.072l.455.364c.455 1.274.546 2.548.182 3.821z"},"child":[]}]})(props);
};
function VscGithubInverted (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076-.343-.93-.881-1.175-.881-1.175-.734-.489.048-.489.048-.489.783.049 1.224.832 1.224.832.734 1.223 1.859.88 2.3.685.048-.538.293-.88.489-1.076-1.762-.196-3.621-.881-3.621-3.964 0-.88.293-1.566.832-2.153-.05-.147-.343-.978.098-2.055 0 0 .685-.196 2.201.832.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.984 7.984 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0z"},"child":[]}]})(props);
};
function VscGithubProject (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.00012 13H7.00012L7.00012 7.00001L13.0001 7.00001V6.00001L7.00012 6.00001L7.00012 3H6.00012L6.00012 6.00001L3.00012 6.00001V7.00001H6.00012L6.00012 13Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.50012 2H13.5001L14.0001 2.5V13.5L13.5001 14H2.50012L2.00012 13.5V2.5L2.50012 2ZM3.00012 13H13.0001V3H3.00012V13Z"},"child":[]}]})(props);
};
function VscGithub (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z"},"child":[]}]})(props);
};
function VscGlobe (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.5 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm4.894 4a5.527 5.527 0 0 0-3.053-2.676c.444.84.765 1.74.953 2.676h2.1zm.582 2.995A5.11 5.11 0 0 0 14 7.5a5.464 5.464 0 0 0-.213-1.5h-2.342c.032.331.055.664.055 1a10.114 10.114 0 0 1-.206 2h2.493c.095-.329.158-.665.19-1.005zm-3.535 0l.006-.051A9.04 9.04 0 0 0 10.5 7a8.994 8.994 0 0 0-.076-1H6.576A8.82 8.82 0 0 0 6.5 7a8.98 8.98 0 0 0 .233 2h3.534c.077-.332.135-.667.174-1.005zM10.249 5a8.974 8.974 0 0 0-1.255-2.97C8.83 2.016 8.666 2 8.5 2a3.62 3.62 0 0 0-.312.015l-.182.015L8 2.04A8.97 8.97 0 0 0 6.751 5h3.498zM5.706 5a9.959 9.959 0 0 1 .966-2.681A5.527 5.527 0 0 0 3.606 5h2.1zM3.213 6A5.48 5.48 0 0 0 3 7.5 5.48 5.48 0 0 0 3.213 9h2.493A10.016 10.016 0 0 1 5.5 7c0-.336.023-.669.055-1H3.213zm2.754 4h-2.36a5.515 5.515 0 0 0 3.819 2.893A10.023 10.023 0 0 1 5.967 10zM8.5 12.644A8.942 8.942 0 0 0 9.978 10H7.022A8.943 8.943 0 0 0 8.5 12.644zM11.033 10a10.024 10.024 0 0 1-1.459 2.893A5.517 5.517 0 0 0 13.393 10h-2.36z"},"child":[]}]})(props);
};
function VscGoToFile (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 5.914l2.06-2.06v-.708L5.915 1l-.707.707.043.043.25.25 1 1h-3a2.5 2.5 0 0 0 0 5H4V7h-.5a1.5 1.5 0 1 1 0-3h3L5.207 5.293 5.914 6 6 5.914zM11 2H8.328l-1-1H12l.71.29 3 3L16 5v9l-1 1H6l-1-1V6.5l1 .847V14h9V6h-4V2zm1 0v3h3l-3-3z"},"child":[]}]})(props);
};
function VscGoToSearch (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.80005 10.1501L1 13.84L1.75 14.5L5.53003 10.83L4.80005 10.1501Z"},"child":[]},{"tag":"path","attr":{"d":"M3.99982 9C4.91017 10.7808 6.76276 12 8.90011 12C11.9377 12 14.4001 9.53757 14.4001 6.5C14.4001 3.46243 11.9377 1 8.90011 1C8.468 1 8.04754 1.04983 7.64414 1.14406L8.51623 2.01614C8.64277 2.00545 8.7708 2 8.90011 2C11.3854 2 13.4001 4.01472 13.4001 6.5C13.4001 8.98528 11.3854 11 8.90011 11C7.3399 11 5.96514 10.206 5.15788 9H3.99982Z"},"child":[]},{"tag":"path","attr":{"d":"M8.06075 3.8535L5.91431 5.99994L5.2072 5.29283L6.50009 3.99994H3.50012C3.1023 3.99994 2.72077 4.15798 2.43946 4.43928C2.15816 4.72059 2.00012 5.10212 2.00012 5.49994C2.00012 5.89777 2.15816 6.2793 2.43946 6.5606C2.72077 6.84191 3.1023 6.99994 3.50012 6.99994H4.00012V7.99994H3.50012C2.83708 7.99994 2.2012 7.73655 1.73236 7.26771C1.26351 6.79887 1.00012 6.16298 1.00012 5.49994C1.00012 4.8369 1.26351 4.20102 1.73236 3.73218C2.2012 3.26334 2.83708 2.99994 3.50012 2.99994H6.50009L5.2072 1.70705L5.91431 0.999939L8.06075 3.14639L8.06075 3.8535Z"},"child":[]}]})(props);
};
function VscGrabber (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M15 6H1v1h14V6zm0 3H1v1h14V9z"},"child":[]}]})(props);
};
function VscGraphLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.119 4L3 4.881l-.619.619L.715 3.833v-.618L2.38 1.548l.62.619L2.167 3H15v1H2.119zM4 14.546V5.455L4.5 5h2l.5.455v9.09L6.5 15h-2l-.5-.454zm2-.455V5.909H5v8.182h1zm2-1.535V5.444L8.5 5h2l.5.444v7.112l-.5.444h-2l-.5-.444zm2-.445V5.89H9v6.222h1zm2-6.682v5.143l.5.428h2l.5-.428V5.429L14.5 5h-2l-.5.429zm2 .428v4.286h-1V5.857h1z"},"child":[]}]})(props);
};
function VscGraphLine (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 13V14H1.5L1 13.5V0H2V13H15Z"},"child":[]},{"tag":"path","attr":{"d":"M13 3.20714L7.85353 8.35359H7.14642L5.49998 6.70714L1.85353 10.3536L1.14642 9.64648L5.14642 5.64648H5.85353L7.49998 7.29293L12.6464 2.14648H13.3535L15.3535 4.14648L14.6464 4.85359L13 3.20714Z"},"child":[]}]})(props);
};
function VscGraphScatter (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 13V14H1.5L1 13.5V0H2V13H15Z"},"child":[]},{"tag":"rect","attr":{"x":"5","y":"2","width":"2","height":"2"},"child":[]},{"tag":"rect","attr":{"x":"12","y":"1","width":"2","height":"2"},"child":[]},{"tag":"rect","attr":{"x":"8","y":"5","width":"2","height":"2"},"child":[]},{"tag":"rect","attr":{"x":"5","y":"9","width":"2","height":"2"},"child":[]},{"tag":"rect","attr":{"x":"12","y":"8","width":"2","height":"2"},"child":[]}]})(props);
};
function VscGraph (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 14H15v-1H2V0H1v13.5l.5.5zM3 11.5v-8l.5-.5h2l.5.5v8l-.5.5h-2l-.5-.5zm2-.5V4H4v7h1zm6-9.5v10l.5.5h2l.5-.5v-10l-.5-.5h-2l-.5.5zm2 .5v9h-1V2h1zm-6 9.5v-6l.5-.5h2l.5.5v6l-.5.5h-2l-.5-.5zm2-.5V6H8v5h1z"},"child":[]}]})(props);
};
function VscGripper (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5 3h2v2H5zm0 4h2v2H5zm0 4h2v2H5zm4-8h2v2H9zm0 4h2v2H9zm0 4h2v2H9z"},"child":[]}]})(props);
};
function VscGroupByRefType (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h2v1H2v12h1.5v1h-2l-.5-.5v-13l.5-.5zm6 6h-2L5 6.5v-2l.5-.5h2l.5.5v2l-.5.5zM6 6h1V5H6v1zm7.5 1h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM11 6h2V4h-2v2zm-3.5 6h-2l-.5-.5v-2l.5-.5h2l.5.5v2l-.5.5zM6 11h1v-1H6v1zm7.5 2h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM11 12h2v-2h-2v2zm-1-2H8v1h2v-1zm0-5H8v1h2V5z"},"child":[]}]})(props);
};
function VscHeartFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.88 4.78079C14.7993 4.46498 14.6748 4.16202 14.51 3.88077C14.3518 3.58819 14.1493 3.3217 13.91 3.09073C13.563 2.74486 13.152 2.46982 12.7 2.28079C11.7902 1.90738 10.7698 1.90738 9.85999 2.28079C9.43276 2.46163 9.04027 2.71541 8.70002 3.03079L8.65003 3.09073L8.00001 3.74075L7.34999 3.09073L7.3 3.03079C6.95975 2.71541 6.56726 2.46163 6.14002 2.28079C5.23018 1.90738 4.20984 1.90738 3.3 2.28079C2.84798 2.46982 2.43706 2.74486 2.09004 3.09073C1.85051 3.32402 1.64514 3.59002 1.48002 3.88077C1.32258 4.1644 1.20161 4.46682 1.12 4.78079C1.03522 5.10721 0.994861 5.44358 1.00001 5.78079C1.00053 6.09791 1.04084 6.41365 1.12 6.72073C1.20384 7.03078 1.32472 7.32961 1.48002 7.61075C1.64774 7.89975 1.85285 8.16542 2.09004 8.40079L8.00001 14.3108L13.91 8.40079C14.1471 8.16782 14.3492 7.90169 14.51 7.61075C14.6729 7.33211 14.7974 7.03272 14.88 6.72073C14.9592 6.41365 14.9995 6.09791 15 5.78079C15.0052 5.44358 14.9648 5.10721 14.88 4.78079Z"},"child":[]}]})(props);
};
function VscHeart (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.88 4.78a3.489 3.489 0 0 0-.37-.9 3.24 3.24 0 0 0-.6-.79 3.78 3.78 0 0 0-1.21-.81 3.74 3.74 0 0 0-2.84 0 4 4 0 0 0-1.16.75l-.05.06-.65.65-.65-.65-.05-.06a4 4 0 0 0-1.16-.75 3.74 3.74 0 0 0-2.84 0 3.78 3.78 0 0 0-1.21.81 3.55 3.55 0 0 0-.97 1.69 3.75 3.75 0 0 0-.12 1c0 .317.04.633.12.94a4 4 0 0 0 .36.89 3.8 3.8 0 0 0 .61.79L8 14.31l5.91-5.91c.237-.233.44-.5.6-.79A3.578 3.578 0 0 0 15 5.78a3.747 3.747 0 0 0-.12-1zm-1 1.63a2.69 2.69 0 0 1-.69 1.21l-5.21 5.2-5.21-5.2a2.9 2.9 0 0 1-.44-.57 3 3 0 0 1-.27-.65 3.25 3.25 0 0 1-.08-.69A3.36 3.36 0 0 1 2.06 5a2.8 2.8 0 0 1 .27-.65c.12-.21.268-.4.44-.57a2.91 2.91 0 0 1 .89-.6 2.8 2.8 0 0 1 2.08 0c.33.137.628.338.88.59l1.36 1.37 1.36-1.37a2.72 2.72 0 0 1 .88-.59 2.8 2.8 0 0 1 2.08 0c.331.143.633.347.89.6.174.165.32.357.43.57a2.69 2.69 0 0 1 .35 1.34 2.6 2.6 0 0 1-.06.72h-.03z"},"child":[]}]})(props);
};
function VscHistory (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.507 12.324a7 7 0 0 0 .065-8.56A7 7 0 0 0 2 4.393V2H1v3.5l.5.5H5V5H2.811a6.008 6.008 0 1 1-.135 5.77l-.887.462a7 7 0 0 0 11.718 1.092zm-3.361-.97l.708-.707L8 7.792V4H7v4l.146.354 3 3z"},"child":[]}]})(props);
};
function VscHome (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.36 1.37l6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8h.72zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43 4 6.063z"},"child":[]}]})(props);
};
function VscHorizontalRule (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.432 10h.823V4h-.823v2.61h-2.61V4H3v6h.823V7.394h2.61V10zm5.668 0h.9l-1.28-2.63c.131-.058.26-.134.389-.23a1.666 1.666 0 0 0 .585-.797c.064-.171.096-.364.096-.58a1.77 1.77 0 0 0-.082-.557 1.644 1.644 0 0 0-.22-.446 1.504 1.504 0 0 0-.31-.341 1.864 1.864 0 0 0-.737-.373A1.446 1.446 0 0 0 11.1 4H8.64v6h.824V7.518h1.467L12.1 10zm-.681-3.32a.874.874 0 0 1-.293.055H9.463V4.787h1.663a.87.87 0 0 1 .576.24.956.956 0 0 1 .306.737c0 .168-.029.314-.087.437a.91.91 0 0 1-.503.479zM13 12H3v1h10v-1z"},"child":[]}]})(props);
};
function VscHubot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.48 4h4l.5.5v2.03h.52l.5.5V8l-.5.5h-.52v3l-.5.5H9.36l-2.5 2.76L6 14.4V12H3.5l-.5-.64V8.5h-.5L2 8v-.97l.5-.5H3V4.36L3.53 4h4V2.86A1 1 0 0 1 7 2a1 1 0 0 1 2 0 1 1 0 0 1-.52.83V4zM12 8V5H4v5.86l2.5.14H7v2.19l1.8-2.04.35-.15H12V8zm-2.12.51a2.71 2.71 0 0 1-1.37.74v-.01a2.71 2.71 0 0 1-2.42-.74l-.7.71c.34.34.745.608 1.19.79.45.188.932.286 1.42.29a3.7 3.7 0 0 0 2.58-1.07l-.7-.71zM6.49 6.5h-1v1h1v-1zm3 0h1v1h-1v-1z"},"child":[]}]})(props);
};
function VscInbox (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 14h13l.5-.5V9l-2.77-7.66-.47-.34H4.27l-.47.33L1 8.74v4.76l.5.5zM14 13H2v-2.98h2.55l.74 1.25.43.24h4.57l.44-.26.69-1.23H14V13zm-.022-3.98H11.12l-.43.26-.69 1.23H6.01l-.75-1.25-.43-.24H2V9l2.62-7h6.78l2.578 7.02z"},"child":[]}]})(props);
};
function VscIndent (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 5V6.984C4 7.11661 4.0527 7.24379 4.1465 7.33755C4.2402 7.43132 4.3674 7.484 4.5 7.484H11.382L9.749 5.851L10.456 5.144L12.577 7.265L13 7.688V8.256L10.456 10.8L9.749 10.093L11.359 8.484H4.5C4.1022 8.484 3.7207 8.32597 3.4393 8.04466C3.158 7.76336 3 7.38182 3 6.984V5H4Z"},"child":[]}]})(props);
};
function VscInfo (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.568 1.031A6.8 6.8 0 0 1 12.76 3.05a7.06 7.06 0 0 1 .46 9.39 6.85 6.85 0 0 1-8.58 1.74 7 7 0 0 1-3.12-3.5 7.12 7.12 0 0 1-.23-4.71 7 7 0 0 1 2.77-3.79 6.8 6.8 0 0 1 4.508-1.149zM9.04 13.88a5.89 5.89 0 0 0 3.41-2.07 6.07 6.07 0 0 0-.4-8.06 5.82 5.82 0 0 0-7.43-.74 6.06 6.06 0 0 0 .5 10.29 5.81 5.81 0 0 0 3.92.58zM7.375 6h1.25V5h-1.25v1zm1.25 1v4h-1.25V7h1.25z"},"child":[]}]})(props);
};
function VscInsert (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 1L15 2V6L14 7L6 7L5 6L5 2L6 1L14 1ZM14 2L6 2L6 6L14 6L14 2Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 9L15 10V14L14 15L6 15L5 14L5 10L6 9L14 9ZM14 10L6 10L6 14L14 14L14 10Z"},"child":[]},{"tag":"path","attr":{"d":"M1 6.39268L2.61414 8.00682L1 9.62096L1.69352 10.3141L4 8.00682L1.69352 5.69995L1 6.39268Z"},"child":[]}]})(props);
};
function VscInspect (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 3l1-1h12l1 1v6h-1V3H2v8h5v1H2l-1-1V3zm14.707 9.707L9 6v9.414l2.707-2.707h4zM10 13V8.414l3.293 3.293h-2L10 13z"},"child":[]}]})(props);
};
function VscIssueDraft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.7324 9.20047L13.6835 9.50931C13.889 8.87656 14 8.20125 14 7.5C14 6.79875 13.889 6.12344 13.6835 5.49069L12.7324 5.79953C12.9058 6.33376 13 6.9049 13 7.5C13 8.0951 12.9058 8.66624 12.7324 9.20047ZM12.4021 5.00313L13.2928 4.54842C12.6696 3.3279 11.6721 2.33037 10.4516 1.70723L9.99687 2.59787C11.0298 3.12523 11.8748 3.9702 12.4021 5.00313ZM9.20047 2.26763L9.50931 1.31652C8.87656 1.11105 8.20125 1 7.5 1C6.79875 1 6.12344 1.11105 5.49069 1.31652L5.79953 2.26763C6.33376 2.09415 6.9049 2 7.5 2C8.0951 2 8.66624 2.09415 9.20047 2.26763ZM5.00313 2.59787L4.54842 1.70723C3.3279 2.33037 2.33037 3.3279 1.70723 4.54842L2.59787 5.00313C3.12523 3.9702 3.9702 3.12523 5.00313 2.59787ZM1 7.5C1 6.79875 1.11105 6.12344 1.31652 5.49069L2.26763 5.79953C2.09415 6.33376 2 6.9049 2 7.5C2 8.0951 2.09415 8.66624 2.26763 9.20047L1.31652 9.50931C1.11105 8.87656 1 8.20125 1 7.5ZM2.59787 9.99687L1.70723 10.4516C2.33037 11.6721 3.3279 12.6696 4.54842 13.2928L5.00313 12.4021C3.9702 11.8748 3.12523 11.0298 2.59787 9.99687ZM5.79953 12.7324L5.49069 13.6835C6.12344 13.889 6.79875 14 7.5 14C8.20125 14 8.87656 13.889 9.50931 13.6835L9.20047 12.7324C8.66624 12.9058 8.0951 13 7.5 13C6.9049 13 6.33376 12.9058 5.79953 12.7324ZM9.99687 12.4021L10.4516 13.2928C11.6721 12.6696 12.6696 11.6721 13.2928 10.4516L12.4021 9.99687C11.8748 11.0298 11.0298 11.8748 9.99687 12.4021ZM7.50002 8.5C8.0523 8.5 8.50002 8.05228 8.50002 7.5C8.50002 6.94772 8.0523 6.5 7.50002 6.5C6.94773 6.5 6.50002 6.94772 6.50002 7.5C6.50002 8.05228 6.94773 8.5 7.50002 8.5Z"},"child":[]}]})(props);
};
function VscIssueReopened (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.28 5.65556L2 7.00556L1.34 6.74556L0 3.50556L0.92 3.12556L1.73 5.07556C2.27376 3.71475 3.2627 2.57844 4.53544 1.85207C5.80817 1.1257 7.28953 0.852174 8.73774 1.07614C10.1859 1.3001 11.5155 2.00832 12.5093 3.08521C13.5032 4.1621 14.1027 5.54407 14.21 7.00556H13.21C13.0956 5.75683 12.5564 4.58511 11.6824 3.68594C10.8083 2.78677 9.65237 2.21456 8.40739 2.06478C7.1624 1.91501 5.90371 2.19674 4.84137 2.86297C3.77903 3.52919 2.97731 4.53959 2.57 5.72556L4.89 4.72556L5.28 5.65556ZM14.14 8.33562L15.48 11.5656L14.56 12.0056L13.74 10.0056C13.1919 11.3718 12.1958 12.511 10.9149 13.2364C9.63412 13.9618 8.14476 14.2302 6.69127 13.9977C5.23779 13.7651 3.90654 13.0454 2.91599 11.9566C1.92544 10.8678 1.33445 9.47455 1.24001 8.00562H2.24001V7.50562C2.24281 8.79308 2.69801 10.0386 3.52602 11.0245C4.35404 12.0104 5.5022 12.6739 6.76983 12.899C8.03745 13.1242 9.34388 12.8967 10.4608 12.2563C11.5777 11.6159 12.434 10.6033 12.88 9.39562L10.63 10.3256L10.24 9.40561L13.49 8.05562L14.14 8.33562Z"},"child":[]},{"tag":"circle","attr":{"cx":"7.74001","cy":"7.53955","r":"1"},"child":[]}]})(props);
};
function VscIssues (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.50002 1C6.21445 1 4.95774 1.38123 3.88882 2.09546C2.8199 2.80969 1.98674 3.82485 1.49478 5.01257C1.00281 6.20029 0.874098 7.50719 1.1249 8.76807C1.37571 10.0289 1.99479 11.1872 2.90383 12.0962C3.81287 13.0052 4.97108 13.6243 6.23196 13.8751C7.49283 14.1259 8.79973 13.9972 9.98745 13.5052C11.1752 13.0133 12.1903 12.1801 12.9046 11.1112C13.6188 10.0423 14 8.78558 14 7.5C14 5.77609 13.3152 4.1228 12.0962 2.90381C10.8772 1.68482 9.22393 1 7.50002 1ZM7.50002 13C6.41223 13 5.34883 12.6775 4.44436 12.0731C3.53989 11.4688 2.83501 10.6097 2.41873 9.60474C2.00244 8.59974 1.89352 7.4939 2.10574 6.427C2.31796 5.36011 2.8418 4.38015 3.61099 3.61096C4.38018 2.84177 5.36013 2.31793 6.42703 2.10571C7.49392 1.89349 8.59977 2.00242 9.60476 2.4187C10.6098 2.83498 11.4688 3.53987 12.0731 4.44434C12.6775 5.34881 13 6.4122 13 7.5C13 8.95869 12.4205 10.3576 11.3891 11.389C10.3576 12.4205 8.95871 13 7.50002 13Z"},"child":[]},{"tag":"circle","attr":{"cx":"7.50002","cy":"7.5","r":"1"},"child":[]}]})(props);
};
function VscItalic (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.001 13.593l-.097.325H4l.123-.325c.492-.012.817-.053.976-.123.257-.1.448-.238.57-.413.194-.276.394-.768.599-1.477l2.074-7.19c.176-.597.263-1.048.263-1.353a.643.643 0 0 0-.114-.387.683.683 0 0 0-.351-.237c-.153-.059-.454-.088-.906-.088L7.34 2h4.605l-.096.325c-.375-.006-.654.035-.835.123a1.358 1.358 0 0 0-.607.501c-.134.217-.31.697-.527 1.442l-2.066 7.19c-.187.661-.28 1.083-.28 1.265 0 .146.034.272.105.378.076.1.193.178.351.237.164.053.501.097 1.011.132z"},"child":[]}]})(props);
};
function VscJersey (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M11.91 14.22H4.06l-.5-.5V7.06H2.15l-.48-.38L1 4l.33-.6L5.59 2l.64.32a2.7 2.7 0 0 0 .21.44c.071.103.152.2.24.29.168.169.369.302.59.39a1.82 1.82 0 0 0 1.43 0 1.74 1.74 0 0 0 .59-.39c.09-.095.173-.195.25-.3l.15-.29a1.21 1.21 0 0 0 .05-.14l.64-.32 4.26 1.42L15 4l-.66 2.66-.49.38h-1.44v6.66l-.5.52zm-7.35-1h6.85V6.56l.5-.5h1.52l.46-1.83-3.4-1.14a1.132 1.132 0 0 1-.12.21c-.11.161-.233.312-.37.45a2.75 2.75 0 0 1-.91.61 2.85 2.85 0 0 1-2.22 0A2.92 2.92 0 0 1 6 3.75a2.17 2.17 0 0 1-.36-.44l-.13-.22-3.43 1.14.46 1.83h1.52l.5.5v6.66z"},"child":[]}]})(props);
};
function VscJson (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.2 0-.387-.038-.563-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.502 1.502 0 0 1 .765-.787 1.38 1.38 0 0 1 .558-.115H14v-.984h-.09c-.196 0-.381-.04-.557-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.415 1.415 0 0 1-.307-.465v-.002a1.405 1.405 0 0 1-.118-.566c0-.29.006-.58.018-.869a6.174 6.174 0 0 0-.024-.87v-.001a3.537 3.537 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.331 2.331 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .387.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.285 2.285 0 0 0 .738.955 2.285 2.285 0 0 0-.738.955 2.689 2.689 0 0 0-.168.602c-.033.21-.051.423-.055.64a9.15 9.15 0 0 0 0 .666c.008.224.012.45.012.678a1.471 1.471 0 0 1-.877 1.354 1.33 1.33 0 0 1-.563.121H10z"},"child":[]}]})(props);
};
function VscKebabVertical (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.444 13.832a1 1 0 1 0 1.111-1.663 1 1 0 0 0-1.11 1.662zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"},"child":[]}]})(props);
};
function VscKey (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.351 1.091a4.528 4.528 0 0 1 3.44 3.16c.215.724.247 1.49.093 2.23a4.583 4.583 0 0 1-4.437 3.6c-.438 0-.874-.063-1.293-.19l-.8.938-.379.175H7v1.5l-.5.5H5v1.5l-.5.5h-3l-.5-.5v-2.307l.146-.353L6.12 6.87a4.464 4.464 0 0 1-.2-1.405 4.528 4.528 0 0 1 5.431-4.375zm1.318 7.2a3.568 3.568 0 0 0 1.239-2.005l.004.005A3.543 3.543 0 0 0 9.72 2.08a3.576 3.576 0 0 0-2.8 3.4c-.01.456.07.908.239 1.33l-.11.543L2 12.404v1.6h2v-1.5l.5-.5H6v-1.5l.5-.5h1.245l.876-1.016.561-.14a3.47 3.47 0 0 0 1.269.238 3.568 3.568 0 0 0 2.218-.795zm-.838-2.732a1 1 0 1 0-1.662-1.11 1 1 0 0 0 1.662 1.11z"},"child":[]}]})(props);
};
function VscLaw (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.63 7L13 3h1V2H9V1H8v1H3v1h1L2.38 7H2v1h.15c.156.498.473.93.9 1.23a2.47 2.47 0 0 0 2.9 0A2.44 2.44 0 0 0 6.86 8H7V7h-.45L4.88 3H8v8H6l-.39.18-2 2.51.39.81h9l.39-.81-2-2.51L11 11H9V3h3.13l-1.67 4H10v1h.15a2.48 2.48 0 0 0 4.71 0H15V7h-.37zM5.22 8.51a1.52 1.52 0 0 1-.72.19 1.45 1.45 0 0 1-.71-.19A1.47 1.47 0 0 1 3.25 8h2.5a1.52 1.52 0 0 1-.53.51zM5.47 7h-2l1-2.4 1 2.4zm5.29 5L12 13.5H5L6.24 12h4.52zm1.78-7.38l1 2.4h-2l1-2.4zm.68 3.91a1.41 1.41 0 0 1-.72.19 1.35 1.35 0 0 1-.71-.19 1.55 1.55 0 0 1-.54-.53h2.5a1.37 1.37 0 0 1-.53.53z"},"child":[]}]})(props);
};
function VscLayersActive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.18535 1.08325L7.62706 1.08717L1.71796 5.12422L1.72152 5.95233L7.63062 9.91528L8.1818 9.91912L14.2727 5.95617L14.2762 5.1203L8.18535 1.08325ZM2.89198 5.53323L7.91335 2.10268L13.0891 5.5332L7.91329 8.90079L2.89198 5.53323ZM7.63059 12.4153L1.79257 8.5H3.58794L7.91326 11.4008L12.3716 8.5H14.2053L13.4056 9.02031C13.2722 9.00688 13.1369 9 13 9C11.224 9 9.71839 10.1574 9.19622 11.7591L8.18177 12.4191L7.63059 12.4153ZM9.00447 13.1908L7.91326 13.9008L3.58794 11H1.79257L7.63059 14.9153L8.18177 14.9191L9.20113 14.2559C9.08965 13.9185 9.02187 13.5612 9.00447 13.1908Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.3333 10.5056C11.8266 10.1759 12.4067 10 13 10C13.7954 10.001 14.5578 10.3174 15.1202 10.8798C15.6826 11.4422 15.999 12.2046 16 13C16 13.5933 15.8241 14.1734 15.4944 14.6667C15.1648 15.1601 14.6962 15.5446 14.1481 15.7716C13.5999 15.9987 12.9967 16.0581 12.4147 15.9424C11.8328 15.8266 11.2982 15.5409 10.8787 15.1213C10.4591 14.7018 10.1734 14.1672 10.0576 13.5853C9.94189 13.0033 10.0013 12.4001 10.2284 11.8519C10.4554 11.3038 10.8399 10.8352 11.3333 10.5056ZM13.0315 14.3226L14.8213 11.9363L14.0213 11.3363L12.541 13.3099L11.6655 12.6095L11.0408 13.3903L12.3192 14.413L13.0315 14.3226Z"},"child":[]}]})(props);
};
function VscLayersDot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.18535 1.08325L7.62706 1.08717L1.71796 5.12422L1.72152 5.95233L7.63062 9.91528L8.1818 9.91912L14.2727 5.95617L14.2762 5.1203L8.18535 1.08325ZM2.89198 5.53323L7.91335 2.10268L13.0891 5.5332L7.91329 8.90079L2.89198 5.53323ZM7.63059 12.4153L1.79257 8.5H3.58794L7.91326 11.4008L12.3716 8.5H14.2053L13.4056 9.02031C13.2722 9.00688 13.1369 9 13 9C11.224 9 9.71839 10.1574 9.19622 11.7591L8.18177 12.4191L7.63059 12.4153ZM9.00447 13.1908L7.91326 13.9008L3.58794 11H1.79257L7.63059 14.9153L8.18177 14.9191L9.20113 14.2559C9.08965 13.9185 9.02187 13.5612 9.00447 13.1908Z"},"child":[]},{"tag":"circle","attr":{"cx":"13","cy":"13","r":"3"},"child":[]}]})(props);
};
function VscLayers (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.62706 1.08717L8.18535 1.08325L14.2762 5.1203L14.2727 5.95617L8.1818 9.91912L7.63062 9.91528L1.72152 5.95233L1.71796 5.12422L7.62706 1.08717ZM7.91335 2.10268L2.89198 5.53323L7.91329 8.90079L13.0891 5.5332L7.91335 2.10268ZM1.79257 8.5L7.63059 12.4153L8.18177 12.4191L14.2053 8.5H12.3716L7.91326 11.4008L3.58794 8.5H1.79257ZM7.63059 14.9153L1.79257 11H3.58794L7.91326 13.9008L12.3716 11H14.2053L8.18177 14.9191L7.63059 14.9153Z"},"child":[]}]})(props);
};
function VscLayoutActivitybarLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM14 14H4V2H14V14Z"},"child":[]}]})(props);
};
function VscLayoutActivitybarRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 14V2H12V14H2Z"},"child":[]}]})(props);
};
function VscLayoutCentered (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 14V2H6V14H2ZM10 14V2H14V14H10Z"},"child":[]}]})(props);
};
function VscLayoutMenubar (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 2.00085L2 1.00085H14L15 2.00085V14.0009L14 15.0009H2L1 14.0009V2.00085ZM2 2.00085V14.0009H14V2.00085H2ZM3 3.00085H5V4.00085H3V3.00085ZM6 3.00085H8V4.00085H6V3.00085ZM11 3.00085H9V4.00085H11V3.00085Z"},"child":[]}]})(props);
};
function VscLayoutPanelCenter (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 14V2H4V14H2ZM5 10V2H11V10H5ZM12 2H14V14H12V2Z"},"child":[]}]})(props);
};
function VscLayoutPanelJustify (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 10V2H4V10H2ZM5 10V2H11V10H5ZM12 10V2H14V10H12Z"},"child":[]}]})(props);
};
function VscLayoutPanelLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 2L2 1H14L15 2V14L14 15H2L1 14V2ZM2 2V10H10V2H2ZM11 2V14H14V2H11Z"},"child":[]}]})(props);
};
function VscLayoutPanelOff (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 10.0007V2.00073H14V10.0007H2ZM2 11.0007H14V14.0007H2V11.0007Z"},"child":[]}]})(props);
};
function VscLayoutPanelRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 2L2 1H14L15 2V14L14 15H2L1 14V2ZM2 2V14H5V2H2ZM6 2V10H14V2H6Z"},"child":[]}]})(props);
};
function VscLayoutPanel (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 10V2H14V10H2Z"},"child":[]}]})(props);
};
function VscLayoutSidebarLeftOff (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 14.0007V2.00073H6V14.0007H2ZM7 14.0007V2.00073H14V14.0007H7Z"},"child":[]}]})(props);
};
function VscLayoutSidebarLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM14 14H7V2H14V14Z"},"child":[]}]})(props);
};
function VscLayoutSidebarRightOff (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 14.0007V2.00073H9V14.0007H2ZM10 14.0007V2.00073H14V14.0007H10Z"},"child":[]}]})(props);
};
function VscLayoutSidebarRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 1L1 2V14L2 15H14L15 14V2L14 1H2ZM2 14V2H9V14H2Z"},"child":[]}]})(props);
};
function VscLayoutStatusbar (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 1.00073L1 2.00073V14.0007L2 15.0007H14L15 14.0007V2.00073L14 1.00073H2ZM2 13.0007V2.00073H14V13.0007H2Z"},"child":[]}]})(props);
};
function VscLayout (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3 2L2 3V13L3 14H7L8 13V3L7 2H3ZM3 13V3H7V13H3Z"},"child":[]},{"tag":"path","attr":{"d":"M10 3L11 2H14L15 3V6L14 7H11L10 6V3ZM11 3V6H14V3H11Z"},"child":[]},{"tag":"path","attr":{"d":"M10 10L11 9H14L15 10V13L14 14H11L10 13V10ZM11 10V13H14V10H11Z"},"child":[]}]})(props);
};
function VscLibrary (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 2.5l.5-.5h2l.5.5v11l-.5.5h-2l-.5-.5v-11zM6 3v10h1V3H6zm3.171.345l.299-.641 1.88-.684.64.299 3.762 10.336-.299.641-1.879.684-.64-.299L9.17 3.345zm1.11.128l3.42 9.396.94-.341-3.42-9.397-.94.342zM1 2.5l.5-.5h2l.5.5v11l-.5.5h-2l-.5-.5v-11zM2 3v10h1V3H2z"},"child":[]}]})(props);
};
function VscLightbulbAutofix (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm1.31 5L12 13l-1.3 1 .5-1.53-1.2-.83h1.47L12 10l.54 1.64H14l-1.2.83.51 1.53z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.17 8.085A3.979 3.979 0 0 0 8.288 10.5H6.409v2.201c0 .081.028.15.09.212a.29.29 0 0 0 .213.09h1.413c.089.348.223.678.396.982-.066.01-.134.015-.203.015H6.712a1.285 1.285 0 0 1-.922-.379 1.303 1.303 0 0 1-.38-.92v-1.6c0-.479-.092-.921-.274-1.329a3.556 3.556 0 0 0-.776-1.114 4.689 4.689 0 0 1-1.006-1.437A4.187 4.187 0 0 1 3 5.5a4.432 4.432 0 0 1 .616-2.27c.197-.336.432-.64.705-.914a4.6 4.6 0 0 1 .911-.702c.338-.196.7-.348 1.084-.454a4.45 4.45 0 0 1 1.2-.16 4.476 4.476 0 0 1 2.276.614 4.475 4.475 0 0 1 1.622 1.616 4.438 4.438 0 0 1 .616 2.27c0 .617-.117 1.191-.353 1.721a4.537 4.537 0 0 1-.506.864z"},"child":[]}]})(props);
};
function VscLightbulbSparkle (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.96712 9.60787C9.14342 9.26307 9.37775 8.94649 9.67076 8.65806C9.85736 8.47395 10.0257 8.28064 10.1757 8.07816C10.2158 7.96017 10.2532 7.8333 10.2873 7.69683C10.3615 7.40021 10.5382 7.15079 10.7739 6.98253C10.945 6.51978 11.0303 6.0252 11.0303 5.49953C11.0303 5.08664 10.9769 4.68802 10.8698 4.30397C10.763 3.92088 10.6112 3.56285 10.4143 3.23016C10.2177 2.89376 9.98251 2.5891 9.70882 2.31641C9.43513 2.0437 9.12939 1.80938 8.79183 1.61351C8.45803 1.41739 8.09883 1.2662 7.71451 1.15983C7.32923 1.0532 6.92934 1 6.51514 1C6.10094 1 5.70106 1.0532 5.31578 1.15983C4.93146 1.2662 4.56979 1.41764 4.23195 1.61364C3.89858 1.80953 3.59503 2.04383 3.32146 2.31641C3.04777 2.58911 2.81257 2.89377 2.61595 3.23018C2.41907 3.56286 2.26728 3.92089 2.16048 4.30397C2.05342 4.68802 2 5.08664 2 5.49953C2 6.11672 2.11756 6.69107 2.35361 7.22134C2.58896 7.75003 2.92468 8.22903 3.35953 8.65806C3.69832 8.99156 3.95683 9.36336 4.13553 9.77209C4.31772 10.1795 4.40927 10.622 4.40927 11.1009V12.7012C4.40927 12.8807 4.44311 13.0503 4.51141 13.2091C4.57895 13.3661 4.67168 13.5038 4.78961 13.6213C4.90753 13.7388 5.04564 13.8311 5.20306 13.8984C5.36223 13.9663 5.53223 14 5.71205 14H7.31823C7.49806 14 7.66806 13.9663 7.82723 13.8984C7.98464 13.8311 8.12275 13.7388 8.24068 13.6213C8.35861 13.5038 8.45134 13.3661 8.51887 13.2091C8.58718 13.0503 8.62102 12.8807 8.62102 12.7012V12.2734C8.61586 12.2723 8.61079 12.2712 8.60581 12.2701C8.54613 12.2576 8.50299 12.2525 8.48241 12.2506L8.47329 12.2498C8.1415 12.2429 7.8415 12.1066 7.62162 11.8894V12.7012C7.62162 12.7823 7.59309 12.8512 7.5314 12.9127C7.46971 12.9741 7.40022 13.0028 7.31823 13.0028H5.71205C5.63007 13.0028 5.56058 12.9741 5.49888 12.9127C5.4372 12.8512 5.40867 12.7823 5.40867 12.7012V10.5H7.35405C7.54359 10.0663 7.97213 9.76091 8.4732 9.75037L8.48232 9.7496C8.50289 9.74769 8.54604 9.74259 8.60572 9.73002C8.69843 9.7105 8.82494 9.67428 8.96712 9.60787Z"},"child":[]},{"tag":"path","attr":{"d":"M11.5 14C12.25 11.0001 14.5 11.0001 14.5 11.0001C14.5 11.0001 12.25 11 11.5 8C10.75 11 8.5 11.0001 8.5 11.0001C8.5 11.0001 10.75 11 11.5 14Z","strokeWidth":"0.75","strokeLinejoin":"round"},"child":[]},{"tag":"path","attr":{"d":"M12.926 13.2393C13.2849 12.977 13.5538 12.6663 13.7328 12.4216C13.8545 12.2553 14.1455 12.2553 14.2672 12.4216C14.4462 12.6663 14.7151 12.977 15.074 13.2393C15.2403 13.3609 15.2403 13.6393 15.074 13.7609C14.7151 14.0231 14.4462 14.3337 14.2672 14.5784C14.1455 14.7447 13.8545 14.7447 13.7328 14.5784C13.5538 14.3337 13.2849 14.0231 12.926 13.7609C12.7597 13.6393 12.7597 13.3609 12.926 13.2393Z"},"child":[]}]})(props);
};
function VscLightbulb (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.67 8.658a3.661 3.661 0 0 0-.781 1.114 3.28 3.28 0 0 0-.268 1.329v1.6a1.304 1.304 0 0 1-.794 1.197 1.282 1.282 0 0 1-.509.102H7.712a1.285 1.285 0 0 1-.922-.379 1.303 1.303 0 0 1-.38-.92v-1.6c0-.479-.092-.921-.274-1.329a3.556 3.556 0 0 0-.776-1.114 4.689 4.689 0 0 1-1.006-1.437A4.187 4.187 0 0 1 4 5.5a4.432 4.432 0 0 1 .616-2.27c.197-.336.432-.64.705-.914a4.6 4.6 0 0 1 .911-.702c.338-.196.7-.348 1.084-.454a4.45 4.45 0 0 1 1.2-.16 4.476 4.476 0 0 1 2.276.614 4.475 4.475 0 0 1 1.622 1.616 4.438 4.438 0 0 1 .616 2.27c0 .617-.117 1.191-.353 1.721a4.69 4.69 0 0 1-1.006 1.437zM9.623 10.5H7.409v2.201c0 .081.028.15.09.212a.29.29 0 0 0 .213.09h1.606a.289.289 0 0 0 .213-.09.286.286 0 0 0 .09-.212V10.5z"},"child":[]}]})(props);
};
function VscLinkExternal (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1.5 1H6v1H2v12h12v-4h1v4.5l-.5.5h-13l-.5-.5v-13l.5-.5z"},"child":[]},{"tag":"path","attr":{"d":"M15 1.5V8h-1V2.707L7.243 9.465l-.707-.708L13.293 2H8V1h6.5l.5.5z"},"child":[]}]})(props);
};
function VscLink (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.4 3h3.085a3.4 3.4 0 0 1 3.4 3.4v.205A3.4 3.4 0 0 1 7.485 10H7V9h.485A2.4 2.4 0 0 0 9.88 6.61V6.4A2.4 2.4 0 0 0 7.49 4H4.4A2.4 2.4 0 0 0 2 6.4v.205A2.394 2.394 0 0 0 4 8.96v1a3.4 3.4 0 0 1-3-3.35V6.4A3.405 3.405 0 0 1 4.4 3zM12 7.04v-1a3.4 3.4 0 0 1 3 3.36v.205A3.405 3.405 0 0 1 11.605 13h-3.09A3.4 3.4 0 0 1 5.12 9.61V9.4A3.4 3.4 0 0 1 8.515 6H9v1h-.485A2.4 2.4 0 0 0 6.12 9.4v.205A2.4 2.4 0 0 0 8.515 12h3.09A2.4 2.4 0 0 0 14 9.61V9.4a2.394 2.394 0 0 0-2-2.36z"},"child":[]}]})(props);
};
function VscListFilter (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6 12v-1h4v1H6zM4 7h8v1H4V7zm10-4v1H2V3h12z"},"child":[]}]})(props);
};
function VscListFlat (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"rect","attr":{"x":"2","y":"9","width":"9","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"2","y":"12","width":"8","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"2","y":"6","width":"12","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"2","y":"3","width":"11","height":"1"},"child":[]}]})(props);
};
function VscListOrdered (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.287 2.326L2.692 2h.677v3h-.708V2.792l-.374.281v-.747zM5 3h10v1H5V3zm0 4h10v1H5V7zm10 4H5v1h10v-1zM3.742 7.626l.029-.039.065-.09a.84.84 0 0 0 .156-.507c0-.12-.02-.24-.057-.354a.848.848 0 0 0-.492-.529 1.123 1.123 0 0 0-.452-.082 1.094 1.094 0 0 0-.458.087.867.867 0 0 0-.479.522A1.038 1.038 0 0 0 2 6.957v.05h.81v-.05a.3.3 0 0 1 .046-.157.174.174 0 0 1 .057-.054.19.19 0 0 1 .172 0 .188.188 0 0 1 .056.06.24.24 0 0 1 .031.081.445.445 0 0 1-.036.29 1.309 1.309 0 0 1-.12.182l-1 1.138-.012.013v.54h1.988v-.7h-.9l.65-.724zm-.037 3.817c.046.032.086.07.12.114a.841.841 0 0 1 .167.55c0 .107-.017.213-.05.314a.792.792 0 0 1-.487.5 1.288 1.288 0 0 1-.48.079c-.115 0-.23-.016-.341-.049a.94.94 0 0 1-.258-.123.751.751 0 0 1-.182-.177 1.063 1.063 0 0 1-.116-.2A1.038 1.038 0 0 1 2 12.078v-.049h.814v.049c0 .027.003.055.009.082a.207.207 0 0 0 .03.074.14.14 0 0 0 .053.052.2.2 0 0 0 .157.008.159.159 0 0 0 .056-.039.22.22 0 0 0 .042-.075.417.417 0 0 0 .017-.126.483.483 0 0 0-.022-.163.2.2 0 0 0-.051-.08.138.138 0 0 0-.06-.029.537.537 0 0 0-.077-.007h-.161v-.645h.168a.241.241 0 0 0 .069-.011.164.164 0 0 0 .065-.034.175.175 0 0 0 .048-.067.286.286 0 0 0 .021-.121.28.28 0 0 0-.016-.1.166.166 0 0 0-.097-.099.2.2 0 0 0-.156.007.164.164 0 0 0-.055.053.344.344 0 0 0-.04.156v.049H2v-.049a.987.987 0 0 1 .18-.544.8.8 0 0 1 .179-.186.87.87 0 0 1 .262-.133c.114-.036.234-.053.354-.051.116-.001.231.01.344.036.092.021.18.055.263.1a.757.757 0 0 1 .32.318.73.73 0 0 1 .09.347.81.81 0 0 1-.167.528.562.562 0 0 1-.12.114z"},"child":[]}]})(props);
};
function VscListSelection (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 12v-1h9v1H1zm0-5h14v1H1V7zm11-4v1H1V3h11z"},"child":[]}]})(props);
};
function VscListTree (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"rect","attr":{"x":"4","y":"9","width":"9","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"4","y":"12","width":"7","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"4","y":"6","width":"10","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"1","y":"3","width":"11","height":"1"},"child":[]},{"tag":"rect","attr":{"x":"4","y":"4","width":"1","height":"9"},"child":[]}]})(props);
};
function VscListUnordered (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 3H1v1h1V3zm0 3H1v1h1V6zM1 9h1v1H1V9zm1 3H1v1h1v-1zm2-9h11v1H4V3zm11 3H4v1h11V6zM4 9h11v1H4V9zm11 3H4v1h11v-1z"},"child":[]}]})(props);
};
function VscLiveShare (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.735 1.694L15.178 1l8.029 6.328v1.388l-8.029 6.072-1.443-.694v-2.776h-.59c-4.06-.02-6.71.104-10.61 5.163l-1.534-.493a8.23 8.23 0 0 1 .271-2.255 11.026 11.026 0 0 1 3.92-6.793 11.339 11.339 0 0 1 7.502-2.547h1.04v-2.7zm1.804 7.917v2.776l5.676-4.281-5.648-4.545v2.664h-2.86A9.299 9.299 0 0 0 5.77 8.848a10.444 10.444 0 0 0-2.401 4.122c3.351-3.213 6.19-3.359 9.798-3.359h2.373zm-7.647 5.896a4.31 4.31 0 1 1 4.788 7.166 4.31 4.31 0 0 1-4.788-7.166zm.955 5.728a2.588 2.588 0 1 0 2.878-4.302 2.588 2.588 0 0 0-2.878 4.302z"},"child":[]}]})(props);
};
function VscLoading (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"},"child":[]}]})(props);
};
function VscLocation (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.832 2.688A4.056 4.056 0 0 0 8.02 1.5h-.04a4.056 4.056 0 0 0-4 4c-.013.75.198 1.487.606 2.117L7.734 14h.533l3.147-6.383c.409-.63.62-1.367.606-2.117a4.056 4.056 0 0 0-1.188-2.812zM7.925 2.5l.082.01.074-.01a3.075 3.075 0 0 1 2.941 3.037 2.74 2.74 0 0 1-.467 1.568l-.02.034-.017.035L8 12.279l-2.517-5.1-.017-.039-.02-.034a2.74 2.74 0 0 1-.467-1.568A3.074 3.074 0 0 1 7.924 2.5zm.612 2.169a1 1 0 1 0-1.112 1.663 1 1 0 0 0 1.112-1.663zM6.87 3.837a2 2 0 1 1 2.22 3.326 2 2 0 0 1-2.22-3.326z"},"child":[]}]})(props);
};
function VscLockSmall (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3 8L4 7H12L13 8V13L12 14H4L3 13V8ZM4 8V13H12V8H4Z"},"child":[]},{"tag":"path","attr":{"d":"M11 7V5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5V7H6V5C6 3.89543 6.89543 3 8 3C9.10457 3 10 3.89543 10 5V7H11Z"},"child":[]}]})(props);
};
function VscLock (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13 7h-1V5a4 4 0 1 0-8 0v2H3L2 8v6l1 1h10l1-1V8l-1-1zM5 5a3 3 0 1 1 6 0v2H5V5zm8 9H3V8h10v6z"},"child":[]}]})(props);
};
function VscMagnet (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 1.5c-3.9 0-7 3.1-7 7v5l1 1h3l1-1v-5c0-1.1.9-2 2-2s2 .9 2 2v5l1 1h3l1-1v-5c0-3.9-3.1-7-7-7zm-3 12H2v-3h3v3zm9 0h-3v-3h3v3zm-3-4v-1c0-1.7-1.3-3-3-3-1.6 0-2.9 1.3-3 2.8v1.2H2v-1c0-3.3 2.7-6 6-6s6 2.7 6 6v1h-3z"},"child":[]}]})(props);
};
function VscMailRead (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.25 1.57h-.51L1 5.56v7.94l.5.5h13l.5-.5V5.56L8.25 1.57zM8 2.58l5.63 3.32-1.37 1.59H3.74L2.43 5.9 8 2.58zM14 13H2V6.92L3.11 8.3l.39.19h9l.39-.19L14 6.92V13z"},"child":[]}]})(props);
};
function VscMail (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 3.5l.5-.5h13l.5.5v9l-.5.5h-13l-.5-.5v-9zm1 1.035V12h12V4.536L8.31 8.9H7.7L2 4.535zM13.03 4H2.97L8 7.869 13.03 4z"},"child":[]}]})(props);
};
function VscMapFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 5.5V13L5.5 10.8125V3.3125L2 5.5Z"},"child":[]},{"tag":"path","attr":{"d":"M9.5 12.6875V5.1875L6.5 3.3125V10.8125L9.5 12.6875Z"},"child":[]},{"tag":"path","attr":{"d":"M10.5 12.6875V5.1875L14 3V10.5L10.5 12.6875Z"},"child":[]}]})(props);
};
function VscMapVerticalFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.5 2L13 2L10.8125 5.5L3.3125 5.5L5.5 2Z"},"child":[]},{"tag":"path","attr":{"d":"M12.6875 9.5L5.1875 9.5L3.3125 6.5L10.8125 6.5L12.6875 9.5Z"},"child":[]},{"tag":"path","attr":{"d":"M12.6875 10.5L5.1875 10.5L3 14L10.5 14L12.6875 10.5Z"},"child":[]}]})(props);
};
function VscMapVertical (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.77711 2.49976L12.0979 2.49976L10.2229 5.49976L3.90211 5.49976L5.77711 2.49976ZM3.90211 6.49976L10.2229 6.49976L12.0979 9.49976L5.77711 9.49976L3.90211 6.49976ZM11.0896 5.99976L13.424 2.26475L13 1.49976L5.49999 1.49976L5.07599 1.73476L2.57599 5.73476L2.57599 6.26476L4.91036 9.99976L2.57599 13.7348L2.99999 14.4998L10.5 14.4998L10.924 14.2648L13.424 10.2648L13.424 9.73476L11.0896 5.99976ZM5.77711 10.4998L12.0979 10.4998L10.2229 13.4998L3.90211 13.4998L5.77711 10.4998Z"},"child":[]}]})(props);
};
function VscMap (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2.5 5.77705V12.0978L5.5 10.2228V3.90205L2.5 5.77705ZM6.5 3.90205V10.2228L9.5 12.0978V5.77705L6.5 3.90205ZM6 11.0896L2.265 13.4239L1.5 12.9999V5.49993L1.735 5.07593L5.735 2.57593H6.265L10 4.9103L13.735 2.57593L14.5 2.99993V10.4999L14.265 10.9239L10.265 13.4239H9.735L6 11.0896ZM10.5 5.77705V12.0978L13.5 10.2228V3.90205L10.5 5.77705Z"},"child":[]}]})(props);
};
function VscMarkdown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6.345 5h2.1v6.533H6.993l.055-5.31-1.774 5.31H4.072l-1.805-5.31c.04.644.06 5.31.06 5.31H1V5h2.156s1.528 4.493 1.577 4.807L6.345 5zm6.71 3.617v-3.5H11.11v3.5H9.166l2.917 2.916L15 8.617h-1.945z"},"child":[]}]})(props);
};
function VscMegaphone (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 6.77l12.33-3.43.67.53v8.6l-.67.53-6.089-1.595a2.16 2.16 0 1 1-4.178-1.095L2 9.77l-.42-.53V7.3L2 6.77zm3.006 3.787a1.13 1.13 0 0 0-.04.242 1.17 1.17 0 0 0 2.288.347l-2.248-.589zM2.58 8.82L14 11.83V4.5L2.58 7.72v1.1z"},"child":[]}]})(props);
};
function VscMention (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.465 12.36a5.516 5.516 0 0 1-3.053.736 4.262 4.262 0 0 1-4.57-4.543 5.381 5.381 0 0 1 5.391-5.571c2.377 0 4.413 1.375 4.413 4.006 0 2.182-1.292 3.66-2.9 3.66-.676 0-1.1-.274-1.126-.917a2.012 2.012 0 0 1-1.756.913c-.969 0-1.629-.645-1.629-1.923 0-1.763 1.148-3.4 2.62-3.4a1.314 1.314 0 0 1 1.427.93l.211-.809h.9L9.6 8.646c-.226.916-.13 1.215.342 1.215.984 0 1.833-1.21 1.833-2.825 0-2.068-1.445-3.265-3.61-3.265-2.643 0-4.374 2.132-4.382 4.786a3.443 3.443 0 0 0 3.686 3.717c.973.04 1.94-.179 2.8-.634l.196.72zM6.217 8.639c0 .788.307 1.206.913 1.206.758 0 1.38-.6 1.683-1.831C9.136 6.746 8.85 6.1 7.94 6.1c-1.04 0-1.723 1.339-1.723 2.539z"},"child":[]}]})(props);
};
function VscMenu (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M16 5H0V4h16v1zm0 8H0v-1h16v1zm0-4.008H0V8h16v.992z"},"child":[]}]})(props);
};
function VscMerge (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.5 4.646L8.354 2.5h-.707L5.5 4.646l.707.707L7.3 4.261V5.28h-.02v.456l.025.001.006.319c.004.187.02.379.05.574.03.195.069.39.117.586.048.195.114.404.2.627.155.379.343.722.565 1.031.221.309.46.598.715.867.255.27.508.535.76.797.25.262.478.541.681.838.203.297.368.621.494.973.125.351.188.755.188 1.213v.884H12.5v-.884a5.991 5.991 0 0 0-.166-1.39 4.638 4.638 0 0 0-.427-1.1 5.875 5.875 0 0 0-.604-.897c-.222-.27-.453-.527-.693-.774-.24-.246-.471-.492-.693-.738a6.39 6.39 0 0 1-.604-.785 3.794 3.794 0 0 1-.433-.914 3.676 3.676 0 0 1-.16-1.13V5.28h-.001v-1l1.074 1.074.707-.708zM7.042 9.741a8.19 8.19 0 0 0 .329-.369 6.06 6.06 0 0 1-.62-1.15L6.744 8.2a7.26 7.26 0 0 1-.095-.263c-.17.256-.359.498-.565.726-.222.246-.453.492-.693.738-.24.247-.47.504-.693.774-.221.27-.423.568-.604.896a4.643 4.643 0 0 0-.427 1.102 5.995 5.995 0 0 0-.166 1.389v.884h1.42v-.884c0-.457.062-.862.188-1.213.125-.352.29-.676.493-.973.203-.297.43-.576.682-.838.251-.262.504-.527.76-.797z"},"child":[]}]})(props);
};
function VscMicFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.00012 4.5C5.00012 2.84315 6.34327 1.5 8.00012 1.5C9.65698 1.5 11.0001 2.84315 11.0001 4.5V8.5C11.0001 10.1569 9.65698 11.5 8.00012 11.5C6.34327 11.5 5.00012 10.1569 5.00012 8.5V4.5Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.50012 16V14H8.50012V16H7.50012Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.50012 14C4.7387 14 2.50012 11.7614 2.50012 9H3.50012C3.50012 11.2091 5.29098 13 7.50012 13H8.50012C10.7093 13 12.5001 11.2091 12.5001 9H13.5001C13.5001 11.7614 11.2615 14 8.50012 14H7.50012Z"},"child":[]}]})(props);
};
function VscMic (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.50012 8.5V4.5C5.50012 3.11929 6.61941 2 8.00012 2C9.38083 2 10.5001 3.11929 10.5001 4.5V8.5C10.5001 9.88071 9.38083 11 8.00012 11C6.61941 11 5.50012 9.88071 5.50012 8.5ZM8.00012 1C6.06713 1 4.50012 2.567 4.50012 4.5V8.5C4.50012 10.433 6.06713 12 8.00012 12C9.93312 12 11.5001 10.433 11.5001 8.5V4.5C11.5001 2.567 9.93312 1 8.00012 1Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.50012 16V14H8.50012V16H7.50012Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.50012 14C4.7387 14 2.50012 11.7614 2.50012 9H3.50012C3.50012 11.2091 5.29098 13 7.50012 13H8.50012C10.7093 13 12.5001 11.2091 12.5001 9H13.5001C13.5001 11.7614 11.2615 14 8.50012 14H7.50012Z"},"child":[]}]})(props);
};
function VscMilestone (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 1H7v2H1.5l-.5.5v4l.5.5H7v7h1V8h4.49l.34-.13 2.18-2v-.74l-2.18-2L12.5 3H8V1zm4.29 6H2V4h10.29l1.63 1.5L12.29 7zM5 5h5v1H5V5z"},"child":[]}]})(props);
};
function VscMirror (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.57 1l6.2 4 .23.38v9.2l-.76.42L8 11l-6.24 4-.76-.42v-9.2L1.23 5l6.2-4h1.14zm-.06 9.13L14 13.67V5.65l-5.49-3.5V5h-1V2.13L2 5.67v8l5.51-3.56v.02h1zm.9-4.78l.71-.7 2.47 2.48v.71l-2.46 2.46-.7-.7L11.02 8h-6L6.6 9.6l-.7.7-2.46-2.46v-.71l2.48-2.48.7.7L4.98 7h6.08L9.41 5.35z"},"child":[]}]})(props);
};
function VscMortarBoard (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 5.66L8.18 3h-.36L1 5.66V12h1V7l2.31.9a4.35 4.35 0 0 0-.79 2.48c-.01.11-.01.22 0 .33v.11l.28.4L7.78 13h.41l3.94-1.81.28-.4v-.44a4.39 4.39 0 0 0-.78-2.47L15 6.57v-.91zm-3.52 4.68v.07L8 12l-3.5-1.6a.13.13 0 0 1 0-.06 3.44 3.44 0 0 1 .75-2.12l2.58 1h.36l2.56-1a3.4 3.4 0 0 1 .73 2.12zM8 8.25L2.52 6.12 8 4l5.48 2.14L8 8.25z"},"child":[]}]})(props);
};
function VscMove (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.232 10.707L8.5 12.44V9h-1v3.44l-1.732-1.733-.707.707L7.646 14h.708l2.585-2.586-.707-.707zM5.061 3.586l.707.707L7.5 2.56V6h1V2.56l1.732 1.733.707-.707L8.354 1h-.708L5.061 3.586zm-.268 1.682L3.06 7H6.5v1H3.06l1.733 1.732-.707.707L1.5 7.854v-.708l2.586-2.585.707.707zM9.5 7h3.44l-1.733-1.732.707-.707L14.5 7.146v.708l-2.586 2.585-.707-.707L12.94 8H9.5V7z"},"child":[]}]})(props);
};
function VscMultipleWindows (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 1.5l.5-.5h8l.5.5v7l-.5.5H12V8h2V4H7v1H6V1.5zM7 2v1h7V2H7zM1.5 7l-.5.5v7l.5.5h8l.5-.5v-7L9.5 7h-8zM2 9V8h7v1H2zm0 1h7v4H2v-4z"},"child":[]}]})(props);
};
function VscMusic (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 7H13V9.49982C12.5822 9.18597 12.0628 9 11.5 9C10.1193 9 9 10.1193 9 11.5C9 12.8807 10.1193 14 11.5 14C12.8807 14 14 12.8807 14 11.5V7ZM11.5 10C12.3284 10 13 10.6716 13 11.5C13 12.3284 12.3284 13 11.5 13C10.6716 13 10 12.3284 10 11.5C10 10.6716 10.6716 10 11.5 10Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.4688 2.00098L5.46881 2.50098L5 3V10.4998C4.58217 10.186 4.0628 10 3.5 10C2.11929 10 1 11.1193 1 12.5C1 13.8807 2.11929 15 3.5 15C4.88071 15 6 13.8807 6 12.5V6.46974L13 6.03224V7H14V2.5L13.4688 2.00098ZM13 3.03223V5.03029L6 5.46779V3.46973L13 3.03223ZM3.5 11C4.32843 11 5 11.6716 5 12.5C5 13.3284 4.32843 14 3.5 14C2.67157 14 2 13.3284 2 12.5C2 11.6716 2.67157 11 3.5 11Z"},"child":[]}]})(props);
};
function VscMute (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 5h2.79l3.86-3.83.85.35v13l-.85.33L4.29 11H1.5l-.5-.5v-5l.5-.5zm3.35 5.17L8 13.31V2.73L4.85 5.85 4.5 6H2v4h2.5l.35.17zm9.381-4.108l.707.707L13.207 8.5l1.731 1.732-.707.707L12.5 9.207l-1.732 1.732-.707-.707L11.793 8.5 10.06 6.77l.707-.707 1.733 1.73 1.731-1.731z"},"child":[]}]})(props);
};
function VscNewFile (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.5 1.1l3.4 3.5.1.4v2h-1V6H8V2H3v11h4v1H2.5l-.5-.5v-12l.5-.5h6.7l.3.1zM9 2v3h2.9L9 2zm4 14h-1v-3H9v-1h3V9h1v3h3v1h-3v3z"},"child":[]}]})(props);
};
function VscNewFolder (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.5 2H7.71l-.85-.85L6.51 1h-5l-.5.5v11l.5.5H7v-1H1.99V6h4.49l.35-.15.86-.86H14v1.5l-.001.51h1.011V2.5L14.5 2zm-.51 2h-6.5l-.35.15-.86.86H2v-3h4.29l.85.85.36.15H14l-.01.99zM13 16h-1v-3H9v-1h3V9h1v3h3v1h-3v3z"},"child":[]}]})(props);
};
function VscNewline (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12 5.5V7.484C12 7.61661 11.9473 7.74379 11.8535 7.83755C11.7598 7.93132 11.6326 7.984 11.5 7.984H4.618L6.251 6.351L5.544 5.644L3.423 7.765L3 8.188V8.756L5.544 11.3L6.251 10.593L4.641 8.984H11.5C11.8978 8.984 12.2793 8.82597 12.5607 8.54466C12.842 8.26336 13 7.88182 13 7.484V5.5H12Z"},"child":[]}]})(props);
};
function VscNoNewline (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.333 5.506a3 3 0 1 1 3.334 4.989 3 3 0 0 1-3.334-4.99zm2.677.777A1.986 1.986 0 0 0 2 8.009c.004.353.102.698.283 1.001L5.01 6.283zM2.99 9.717A1.986 1.986 0 0 0 6 7.991a1.988 1.988 0 0 0-.283-1.001L2.99 9.717zM14 5v1.984a.5.5 0 0 1-.5.5H9.367L11 5.851l-.707-.707-2.121 2.121-.423.423v.568l2.544 2.544.707-.707-1.61-1.609h4.11a1.5 1.5 0 0 0 1.5-1.5V5h-1z"},"child":[]}]})(props);
};
function VscNote (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2h13l.5.5v10l-.5.5h-13l-.5-.5v-10l.5-.5zM2 3v9h12V3H2zm2 2h8v1H4V5zm6 2H4v1h6V7zM4 9h4v1H4V9z"},"child":[]}]})(props);
};
function VscNotebookTemplate (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 5H0V4h1v1zm0 2H0V6h1v1zm0 2H0V8h1v1zm0 2H0v-1h1v1zm0 2H0v-1h1v1zm0 1v1H0v-1h1zm0 1h1v1H1v-1zm2 0h1v1H3v-1zM1 1H0V0h1v1zm2 0H2V0h1v1zm1-1h1v1H4V0zm3 1H6V0h1v1zm2 0H8V0h1v1zm2 0h-1V0h1v1zm0 1V1h1v1h-1zm1 2h-1V3h1v1zM1 3H0V2h1v1z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 6l1-1h7l1 1v9l-1 1H6l-1-1V6zm1 0v9h7V6H6z"},"child":[]},{"tag":"path","attr":{"d":"M15 7h1v2h-1V7zm0 3h1v2h-1v-2zm0 3h1v2h-1v-2zM7 8h5v1H7z"},"child":[]}]})(props);
};
function VscNotebook (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 2l1-1h9l1 1v12l-1 1H3l-1-1V2zm1 0v12h9V2H3zm1 2l1-1h5l1 1v1l-1 1H5L4 5V4zm1 0v1h5V4H5zm10 1h-1v2h1V5zm-1 3h1v2h-1V8zm1 3h-1v2h1v-2z"},"child":[]}]})(props);
};
function VscOctoface (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.863 5.673c.113-.28.48-1.392-.114-2.897 0 0-.919-.288-3.01 1.138-.875-.245-1.812-.28-2.739-.28-.928 0-1.864.035-2.739.28-2.091-1.435-3.01-1.138-3.01-1.138-.595 1.505-.227 2.617-.113 2.897C1.428 6.433 1 7.413 1 8.603c0 4.507 2.914 5.522 6.982 5.522 4.07 0 7.018-1.015 7.018-5.521 0-1.19-.429-2.17-1.137-2.931zM8 13.268c-2.888 0-5.232-.132-5.232-2.932 0-.665.332-1.295.892-1.811.936-.857 2.537-.402 4.34-.402 1.811 0 3.395-.455 4.34.402.569.516.893 1.138.893 1.811 0 2.791-2.346 2.931-5.233 2.931zM5.804 8.883c-.578 0-1.05.7-1.05 1.557 0 .858.472 1.566 1.05 1.566.577 0 1.05-.7 1.05-1.566 0-.866-.473-1.557-1.05-1.557zm4.392 0c-.577 0-1.05.691-1.05 1.557s.473 1.566 1.05 1.566c.578 0 1.05-.7 1.05-1.566 0-.866-.463-1.557-1.05-1.557z"},"child":[]}]})(props);
};
function VscOpenPreview (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3 1h11l1 1v5.3a3.21 3.21 0 0 0-1-.3V2H9v10.88L7.88 14H3l-1-1V2l1-1zm0 12h5V2H3v11zm10.379-4.998a2.53 2.53 0 0 0-1.19.348h-.03a2.51 2.51 0 0 0-.799 3.53L9 14.23l.71.71 2.35-2.36c.325.22.7.358 1.09.4a2.47 2.47 0 0 0 1.14-.13 2.51 2.51 0 0 0 1-.63 2.46 2.46 0 0 0 .58-1 2.63 2.63 0 0 0 .07-1.15 2.53 2.53 0 0 0-1.35-1.81 2.53 2.53 0 0 0-1.211-.258zm.24 3.992a1.5 1.5 0 0 1-.979-.244 1.55 1.55 0 0 1-.56-.68 1.49 1.49 0 0 1-.08-.86 1.49 1.49 0 0 1 1.18-1.18 1.49 1.49 0 0 1 .86.08c.276.117.512.311.68.56a1.5 1.5 0 0 1-1.1 2.324z"},"child":[]}]})(props);
};
function VscOrganization (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.111 4.663A2 2 0 1 1 6.89 1.337a2 2 0 0 1 2.222 3.326zm-.555-2.494A1 1 0 1 0 7.444 3.83a1 1 0 0 0 1.112-1.66zm2.61.03a1.494 1.494 0 0 1 1.895.188 1.513 1.513 0 0 1-.487 2.46 1.492 1.492 0 0 1-1.635-.326 1.512 1.512 0 0 1 .228-2.321zm.48 1.61a.499.499 0 1 0 .705-.708.509.509 0 0 0-.351-.15.499.499 0 0 0-.5.503.51.51 0 0 0 .146.356zM3.19 12.487H5v1.005H3.19a1.197 1.197 0 0 1-.842-.357 1.21 1.21 0 0 1-.348-.85v-1.81a.997.997 0 0 1-.71-.332A1.007 1.007 0 0 1 1 9.408V7.226c.003-.472.19-.923.52-1.258.329-.331.774-.52 1.24-.523H4.6a2.912 2.912 0 0 0-.55 1.006H2.76a.798.798 0 0 0-.54.232.777.777 0 0 0-.22.543v2.232h1v2.826a.202.202 0 0 0 .05.151.24.24 0 0 0 .14.05zm7.3-6.518a1.765 1.765 0 0 0-1.25-.523H6.76a1.765 1.765 0 0 0-1.24.523c-.33.335-.517.786-.52 1.258v3.178a1.06 1.06 0 0 0 .29.734 1 1 0 0 0 .71.332v2.323a1.202 1.202 0 0 0 .35.855c.18.168.407.277.65.312h2a1.15 1.15 0 0 0 1-1.167V11.47a.997.997 0 0 0 .71-.332 1.006 1.006 0 0 0 .29-.734V7.226a1.8 1.8 0 0 0-.51-1.258zM10 10.454H9v3.34a.202.202 0 0 1-.06.14.17.17 0 0 1-.14.06H7.19a.21.21 0 0 1-.2-.2v-3.34H6V7.226c0-.203.079-.398.22-.543a.798.798 0 0 1 .54-.232h2.48a.778.778 0 0 1 .705.48.748.748 0 0 1 .055.295v3.228zm2.81 3.037H11v-1.005h1.8a.24.24 0 0 0 .14-.05.2.2 0 0 0 .06-.152V9.458h1V7.226a.777.777 0 0 0-.22-.543.798.798 0 0 0-.54-.232h-1.29a2.91 2.91 0 0 0-.55-1.006h1.84a1.77 1.77 0 0 1 1.24.523c.33.335.517.786.52 1.258v2.182c0 .273-.103.535-.289.733-.186.199-.44.318-.711.333v1.81c0 .319-.125.624-.348.85a1.197 1.197 0 0 1-.842.357zM4 1.945a1.494 1.494 0 0 0-1.386.932A1.517 1.517 0 0 0 2.94 4.52 1.497 1.497 0 0 0 5.5 3.454c0-.4-.158-.784-.44-1.067A1.496 1.496 0 0 0 4 1.945zm0 2.012a.499.499 0 0 1-.5-.503.504.504 0 0 1 .5-.503.509.509 0 0 1 .5.503.504.504 0 0 1-.5.503z"},"child":[]}]})(props);
};
function VscOutput (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M19.5 0v1.5L21 3v19.5L19.5 24h-15L3 22.5V3l1.5-1.5V0H6v1.5h3V0h1.5v1.5h3V0H15v1.5h3V0h1.5zm-15 22.5h15V3h-15v19.5zM7.5 6h9v1.5h-9V6zm9 6h-9v1.5h9V12zm-9 6h9v1.5h-9V18z"},"child":[]}]})(props);
};
function VscPackage (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.61 3l5.74 1.53L15 5v6.74l-.37.48-6.13 1.69-6.14-1.69-.36-.48V5l.61-.47L8.34 3h.27zm-.09 1l-4 1 .55.2 3.43.9 3-.81.95-.29-3.93-1zM3 11.36l5 1.37V7L3 5.66v5.7zM9 7v5.73l5-1.37V5.63l-2.02.553V8.75l-1 .26V6.457L9 7z"},"child":[]}]})(props);
};
function VscPaintcan (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.54 11.811l-1.14-3.12v-.06l-4.91-4.91v-1.24a1.66 1.66 0 0 0-.11-.58 1.48 1.48 0 0 0-.83-.8 1.42 1.42 0 0 0-.58-.1 1.47 1.47 0 0 0-1.48 1.48v3.26l-3.06 3a1.52 1.52 0 0 0 0 2.12l3.63 3.63c.14.141.307.253.49.33a1.53 1.53 0 0 0 1.14 0 1.51 1.51 0 0 0 .49-.33l4.93-4.92-.66 2.2a1.19 1.19 0 0 0 0 .46c.033.152.098.296.19.42.098.121.216.223.35.3.14.07.294.11.45.12a1 1 0 0 0 .48-.09 1.14 1.14 0 0 0 .39-.29.98.98 0 0 0 .22-.44c.032-.145.035-.294.01-.44zm-8-9.33a.46.46 0 0 1 0-.2.52.52 0 0 1 .12-.17.64.64 0 0 1 .18-.1.5.5 0 0 1 .21 0 .5.5 0 0 1 .32.15.5.5 0 0 1 .12.33v1.26l-1 1 .05-2.27zm1 11.35a.36.36 0 0 1-.16.11.47.47 0 0 1-.38 0 .361.361 0 0 1-.16-.11l-3.63-3.62a.5.5 0 0 1 0-.71l4.35-4.35v2.85a.74.74 0 0 0-.24.55.75.75 0 1 0 1.17-.55v-2.83l3.85 3.87-4.8 4.79z"},"child":[]}]})(props);
};
function VscPassFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm-1.02-4.13h-.71L4 8.6l.71-.71 1.92 1.92 4.2-4.21.71.71-4.56 4.56z"},"child":[]}]})(props);
};
function VscPass (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6.27 10.87h.71l4.56-4.56-.71-.71-4.2 4.21-1.92-1.92L4 8.6l2.27 2.27z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"},"child":[]}]})(props);
};
function VscPercentage (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.60962 12.6877L11.6096 2.68765L12.3905 3.31235L4.39049 13.3123L3.60962 12.6877Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 7.5C5.88071 7.5 7 6.38071 7 5C7 3.61929 5.88071 2.5 4.5 2.5C3.11929 2.5 2 3.61929 2 5C2 6.38071 3.11929 7.5 4.5 7.5Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.5 12.5C10.6716 12.5 10 11.8284 10 11C10 10.1716 10.6716 9.5 11.5 9.5C12.3284 9.5 13 10.1716 13 11C13 11.8284 12.3284 12.5 11.5 12.5ZM11.5 13.5C12.8807 13.5 14 12.3807 14 11C14 9.61929 12.8807 8.5 11.5 8.5C10.1193 8.5 9 9.61929 9 11C9 12.3807 10.1193 13.5 11.5 13.5Z"},"child":[]}]})(props);
};
function VscPersonAdd (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13 10h-1v2h-2v1h2v2h1v-2h2v-1h-2v-2zM8.556 2.169a1 1 0 1 0-1.112 1.663 1 1 0 0 0 1.112-1.663zm-1.667-.832A2 2 0 1 1 9.11 4.663a2 2 0 0 1-2.22-3.326zM6.77 5.49h2.46A1.77 1.77 0 0 1 11 7.26V8h-1v-.74a.76.76 0 0 0-.77-.77H6.77a.76.76 0 0 0-.77.77V10h1v3.31a.2.2 0 0 0 .2.2H8v1.02h-.8a1.2 1.2 0 0 1-1.2-1.2V11a1.06 1.06 0 0 1-1-1.1V7.26a1.77 1.77 0 0 1 1.77-1.77z"},"child":[]}]})(props);
};
function VscPerson (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm1.23 4.49H6.77A1.77 1.77 0 0 0 5 7.26V9.9A1.06 1.06 0 0 0 6 11v2.33a1.2 1.2 0 0 0 1.2 1.2h1.6a1.2 1.2 0 0 0 1.2-1.24V11a1.06 1.06 0 0 0 1-1.1V7.26a1.77 1.77 0 0 0-1.77-1.77zM6 10V7.26a.76.76 0 0 1 .77-.77h2.46a.76.76 0 0 1 .77.77V10H9v3.31a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2V10H6z"},"child":[]}]})(props);
};
function VscPiano (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 2L0 3V9H1V3H3V8.5L3.5 9H4.5L5 8.5V3H7V8.5L7.5 9H8.5L9 8.5V3H11V8.5L11.5 9H12.5L13 8.5V3H15V13H12V10H11V13H8.5V10H7.5V13H5V10H4V13H1V9H0V13L1 14H15L16 13V3L15 2H1Z"},"child":[]}]})(props);
};
function VscPieChart (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10 6H13.9C13.5023 4.04087 11.9591 2.4977 10 2.10002V6ZM10 1.08296C12.5125 1.50448 14.4955 3.4875 14.917 6C14.9716 6.32521 15 6.65929 15 7H9V1C9.34071 1 9.67479 1.0284 10 1.08296ZM7 8.00003L8 9.00003H12.9C12.4367 11.2823 10.4189 13 8 13C5.23858 13 3 10.7614 3 8C3 5.58104 4.71776 3.56329 7 3.10002V8.00003ZM8 14C10.973 14 13.4409 11.8377 13.917 9.00003C13.9716 8.67482 14 8.34074 14 8.00003H8V2C7.65929 2 7.32521 2.0284 7 2.08296C4.16229 2.55904 2 5.027 2 8C2 11.3137 4.68629 14 8 14Z"},"child":[]}]})(props);
};
function VscPin (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 5v7h-.278c-.406 0-.778-.086-1.117-.258A2.528 2.528 0 0 1 11.73 11H8.87a3.463 3.463 0 0 1-.546.828 3.685 3.685 0 0 1-.735.633c-.27.177-.565.31-.882.398a3.875 3.875 0 0 1-.985.141h-.5V9H2l-1-.5L2 8h3.222V4h.5c.339 0 .664.047.977.14.312.094.607.227.883.4A3.404 3.404 0 0 1 8.87 6h2.859a2.56 2.56 0 0 1 .875-.734c.338-.172.71-.26 1.117-.266H14zm-.778 1.086a1.222 1.222 0 0 0-.32.156 1.491 1.491 0 0 0-.43.461L12.285 7H8.183l-.117-.336a2.457 2.457 0 0 0-.711-1.047C7.027 5.331 6.427 5.09 6 5v7c.427-.088 1.027-.33 1.355-.617.328-.287.565-.636.71-1.047L8.184 10h4.102l.18.297c.057.094.122.177.195.25.073.073.153.143.242.21.088.069.195.12.32.157V6.086z"},"child":[]}]})(props);
};
function VscPinnedDirty (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 2h7v.278c0 .406-.086.778-.258 1.117-.172.339-.42.63-.742.875v2.86c.307.145.583.328.828.546a3.7 3.7 0 0 1 .54.598 4.92 4.92 0 0 0-.896.412l-.007.004-.03.018a2.456 2.456 0 0 0-1.099-.774L9 7.817V3.715l.297-.18c.094-.057.177-.122.25-.195a2.28 2.28 0 0 0 .21-.242.968.968 0 0 0 .157-.32H5.086c.042.125.094.232.156.32a1.494 1.494 0 0 0 .461.43L6 3.715v4.102l-.336.117c-.411.146-.76.383-1.047.711C4.331 8.973 4.09 9.573 4 10h5.002a5.025 5.025 0 0 0-.481.778H8V14l-.5 1-.5-1v-3.222H3v-.5c0-.339.047-.664.14-.977.094-.312.227-.607.4-.883A3.404 3.404 0 0 1 5 7.13V4.27a2.561 2.561 0 0 1-.734-.875A2.505 2.505 0 0 1 4 2.278V2zm7.485 8.41a2.924 2.924 0 0 1 .718-.302c.256-.072.522-.108.797-.108s.541.036.797.108a2.956 2.956 0 0 1 1.321.773 2.956 2.956 0 0 1 .774 1.322c.072.256.108.522.108.797s-.036.541-.108.797a2.953 2.953 0 0 1-.774 1.324 3.013 3.013 0 0 1-1.321.774c-.256.07-.522.105-.797.105s-.541-.035-.797-.105a3.037 3.037 0 0 1-1.324-.774 3.037 3.037 0 0 1-.773-1.324A2.994 2.994 0 0 1 10 13c0-.275.035-.541.105-.797a3.013 3.013 0 0 1 .883-1.425c.154-.14.32-.262.497-.368z"},"child":[]}]})(props);
};
function VscPinned (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4 2h7v.278c0 .406-.086.778-.258 1.117-.172.339-.42.63-.742.875v2.86c.307.145.583.328.828.546.245.219.456.464.633.735.177.27.31.565.398.882.089.318.136.646.141.985v.5H8V14l-.5 1-.5-1v-3.222H3v-.5c0-.339.047-.664.14-.977.094-.312.227-.607.4-.883A3.404 3.404 0 0 1 5 7.13V4.27a2.561 2.561 0 0 1-.734-.875A2.505 2.505 0 0 1 4 2.278V2zm1.086.778c.042.125.094.232.156.32a1.494 1.494 0 0 0 .461.43L6 3.715v4.102l-.336.117c-.411.146-.76.383-1.047.711C4.331 8.973 4.09 9.573 4 10h7c-.088-.427-.33-1.027-.617-1.355a2.456 2.456 0 0 0-1.047-.71L9 7.816V3.715l.297-.18c.094-.057.177-.122.25-.195a2.28 2.28 0 0 0 .21-.242.968.968 0 0 0 .157-.32H5.086z"},"child":[]}]})(props);
};
function VscPlayCircle (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 5l.777-.416 4.5 3v.832l-4.5 3L6 11V5zm1 .934v4.132L10.099 8 7 5.934z"},"child":[]}]})(props);
};
function VscPlay (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3.78 2L3 2.41v12l.78.42 9-6V8l-9-6zM4 13.48V3.35l7.6 5.07L4 13.48z"},"child":[]}]})(props);
};
function VscPlug (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7 1H6v3H4.5l-.5.5V8a4 4 0 0 0 3.5 3.969V15h1v-3.031A4 4 0 0 0 12 8V4.5l-.5-.5H10V1H9v3H7V1zm3.121 9.121A3 3 0 0 1 5 8V5h6v3a3 3 0 0 1-.879 2.121z"},"child":[]}]})(props);
};
function VscPreserveCase (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.51358 11H7.51456L6.69815 8.84082H3.43253L2.66446 11H1.66006L4.61417 3.29785H5.54874L8.51358 11ZM6.40274 8.02979L5.19424 4.74805C5.15486 4.64062 5.11547 4.46875 5.07608 4.23242H5.0546C5.01879 4.45085 4.97761 4.62272 4.93106 4.74805L3.73331 8.02979H6.40274Z"},"child":[]},{"tag":"path","attr":{"d":"M9.59725 11V3.29785H11.7887C12.4547 3.29785 12.9828 3.46077 13.3731 3.78662C13.7634 4.11247 13.9586 4.53678 13.9586 5.05957C13.9586 5.49642 13.8404 5.87598 13.6041 6.19824C13.3678 6.52051 13.0419 6.74967 12.6265 6.88574V6.90723C13.1458 6.9681 13.5611 7.16504 13.8726 7.49805C14.1842 7.82747 14.3399 8.25716 14.3399 8.78711C14.3399 9.44596 14.1036 9.97949 13.6309 10.3877C13.1583 10.7959 12.5621 11 11.8424 11H9.59725ZM10.4996 4.11426V6.60107H11.4234C11.9176 6.60107 12.3061 6.48291 12.589 6.24658C12.8718 6.00667 13.0133 5.67008 13.0133 5.23682C13.0133 4.48844 12.5209 4.11426 11.5362 4.11426H10.4996ZM10.4996 7.41211V10.1836H11.7242C12.2542 10.1836 12.6641 10.0583 12.9542 9.80762C13.2478 9.55697 13.3946 9.21322 13.3946 8.77637C13.3946 7.86686 12.7751 7.41211 11.5362 7.41211H10.4996Z"},"child":[]}]})(props);
};
function VscPreview (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 2h12l1 1v10l-1 1H2l-1-1V3l1-1zm0 11h12V3H2v10zm11-9H3v3h10V4zm-1 2H4V5h8v1zm-3 6h4V8H9v4zm1-3h2v2h-2V9zM7 8H3v1h4V8zm-4 3h4v1H3v-1z"},"child":[]}]})(props);
};
function VscPrimitiveSquare (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.5 4l.5-.5h8l.5.5v8l-.5.5H4l-.5-.5V4zm1 .5v7h7v-7h-7z"},"child":[]}]})(props);
};
function VscProject (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h13l.5.5v13l-.5.5h-13l-.5-.5v-13l.5-.5zM2 14h12V2H2v12zM3 3h2v10H3V3zm6 0H7v6h2V3zm2 0h2v8h-2V3z"},"child":[]}]})(props);
};
function VscPulse (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M11.8 9L10 3H9L7.158 9.64 5.99 4.69h-.97L3.85 9H1v.99h3.23l.49-.37.74-2.7L6.59 12h1.03l1.87-7.04 1.46 4.68.48.36H15V9h-3.2z"},"child":[]}]})(props);
};
function VscQuestion (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.5 1a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm1.55-8.42a1.84 1.84 0 0 0-.61-.42A2.25 2.25 0 0 0 7.53 4a2.16 2.16 0 0 0-.88.17c-.239.1-.45.254-.62.45a1.89 1.89 0 0 0-.38.62 3 3 0 0 0-.15.72h1.23a.84.84 0 0 1 .506-.741.72.72 0 0 1 .304-.049.86.86 0 0 1 .27 0 .64.64 0 0 1 .22.14.6.6 0 0 1 .16.22.73.73 0 0 1 .06.3c0 .173-.037.343-.11.5a2.4 2.4 0 0 1-.27.46l-.35.42c-.12.13-.24.27-.35.41a2.33 2.33 0 0 0-.27.45 1.18 1.18 0 0 0-.1.5v.66H8v-.49a.94.94 0 0 1 .11-.42 3.09 3.09 0 0 1 .28-.41l.36-.44a4.29 4.29 0 0 0 .36-.48 2.59 2.59 0 0 0 .28-.55 1.91 1.91 0 0 0 .11-.64 2.18 2.18 0 0 0-.1-.67 1.52 1.52 0 0 0-.35-.55zM6.8 9.83h1.17V11H6.8V9.83z"},"child":[]}]})(props);
};
function VscQuote (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.16 3.5C4.73 5.06 3.55 6.67 3.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L7.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"},"child":[]}]})(props);
};
function VscRadioTower (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.998 5.58a5.55 5.55 0 0 1 1.62-3.88l-.71-.7a6.45 6.45 0 0 0 0 9.16l.71-.7a5.55 5.55 0 0 1-1.62-3.88zm1.06 0a4.42 4.42 0 0 0 1.32 3.17l.71-.71a3.27 3.27 0 0 1-.76-1.12 3.45 3.45 0 0 1 0-2.67 3.22 3.22 0 0 1 .76-1.13l-.71-.71a4.46 4.46 0 0 0-1.32 3.17zm7.65 3.21l-.71-.71c.33-.32.59-.704.76-1.13a3.449 3.449 0 0 0 0-2.67 3.22 3.22 0 0 0-.76-1.13l.71-.7a4.468 4.468 0 0 1 0 6.34zM13.068 1l-.71.71a5.43 5.43 0 0 1 0 7.74l.71.71a6.45 6.45 0 0 0 0-9.16zM9.993 5.43a1.5 1.5 0 0 1-.245.98 2 2 0 0 1-.27.23l3.44 7.73-.92.4-.77-1.73h-5.54l-.77 1.73-.92-.4 3.44-7.73a1.52 1.52 0 0 1-.33-1.63 1.55 1.55 0 0 1 .56-.68 1.5 1.5 0 0 1 2.325 1.1zm-1.595-.34a.52.52 0 0 0-.25.14.52.52 0 0 0-.11.22.48.48 0 0 0 0 .29c.04.09.102.17.18.23a.54.54 0 0 0 .28.08.51.51 0 0 0 .5-.5.54.54 0 0 0-.08-.28.58.58 0 0 0-.23-.18.48.48 0 0 0-.29 0zm.23 2.05h-.27l-.87 1.94h2l-.86-1.94zm2.2 4.94l-.89-2h-2.88l-.89 2h4.66z"},"child":[]}]})(props);
};
function VscReactions (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12 7.5c0 .169-.01.336-.027.5h1.005A5.5 5.5 0 1 0 8 12.978v-1.005A4.5 4.5 0 1 1 12 7.5zM5.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2 2.5c.712 0 1.355-.298 1.81-.776l.707.708A3.49 3.49 0 0 1 7.5 10.5a3.49 3.49 0 0 1-2.555-1.108l.707-.708A2.494 2.494 0 0 0 7.5 9.5zm2-2.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2.5 3h1v2h2v1h-2v2h-1v-2h-2v-1h2v-2z"},"child":[]}]})(props);
};
function VscRecordKeys (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 3H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm0 8H3V4h11v7zm-3-6h-1v1h1V5zm-1 2H9v1h1V7zm2-2h1v1h-1V5zm1 4h-1v1h1V9zM6 9h5v1H6V9zm7-2h-2v1h2V7zM8 5h1v1H8V5zm0 2H7v1h1V7zM4 9h1v1H4V9zm0-4h1v1H4V5zm3 0H6v1h1V5zM4 7h2v1H4V7z"},"child":[]}]})(props);
};
function VscRecordSmall (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.00024 9C8.55253 9 9.00024 8.55228 9.00024 8C9.00024 7.44772 8.55253 7 8.00024 7C7.44796 7 7.00024 7.44772 7.00024 8C7.00024 8.55228 7.44796 9 8.00024 9Z"},"child":[]},{"tag":"path","attr":{"d":"M12.0002 8C12.0002 10.2091 10.2094 12 8.00024 12C5.79111 12 4.00024 10.2091 4.00024 8C4.00024 5.79086 5.79111 4 8.00024 4C10.2094 4 12.0002 5.79086 12.0002 8ZM11.0002 8C11.0002 6.34315 9.6571 5 8.00024 5C6.34339 5 5.00024 6.34315 5.00024 8C5.00024 9.65685 6.34339 11 8.00024 11C9.6571 11 11.0002 9.65685 11.0002 8Z"},"child":[]}]})(props);
};
function VscRecord (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"},"child":[]}]})(props);
};
function VscRedo (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.5 2v3.5L12 6H8.5V5h2.521l-.941-.941a3.552 3.552 0 1 0-5.023 5.023l5.197 5.198-.72.72-5.198-5.198A4.57 4.57 0 0 1 10.8 3.339l.7.7V2h1z"},"child":[]}]})(props);
};
function VscReferences (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.105 4.561l-3.43 3.427-1.134-1.12 2.07-2.08h-4.8a2.4 2.4 0 1 0 0 4.8h.89v1.6h-.88a4 4 0 0 1 0-7.991h4.8L6.54 1.13 7.675 0l3.43 3.432v1.13zM16.62 24h-9.6l-.8-.8V10.412l.8-.8h9.6l.8.8V23.2l-.8.8zm-8.8-1.6h8V11.212h-8V22.4zm5.6-20.798h9.6l.8.8v12.786l-.8.8h-4v-1.6h3.2V3.2h-8v4.787h-1.6V2.401l.8-.8zm.8 11.186h-4.8v1.6h4.8v-1.6zm-4.8 3.2h4.8v1.6h-4.8v-1.6zm4.8 3.2h-4.8v1.6h4.8v-1.6zm1.6-14.4h4.8v1.6h-4.8v-1.6zm4.8 6.4h-1.6v1.6h1.6v-1.6zm-3.338-3.176v-.024h3.338v1.6h-1.762l-1.576-1.576z"},"child":[]}]})(props);
};
function VscRefresh (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.681 3H2V2h3.5l.5.5V6H5V4a5 5 0 1 0 4.53-.761l.302-.954A6 6 0 1 1 4.681 3z"},"child":[]}]})(props);
};
function VscRegex (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.012 2h.976v3.113l2.56-1.557.486.885L11.47 6l2.564 1.559-.485.885-2.561-1.557V10h-.976V6.887l-2.56 1.557-.486-.885L9.53 6 6.966 4.441l.485-.885 2.561 1.557V2zM2 10h4v4H2v-4z"},"child":[]}]})(props);
};
function VscRemoteExplorer (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.344 2.125h20.312l.782.781v8.599a7.825 7.825 0 0 0-1.563-.912V3.688H2.125V17.75h7.813a7.813 7.813 0 0 0 1.562 4.688H5.25v-1.563h4.688v-1.563H1.344l-.782-.78V2.905l.782-.781zM17.75 11.5a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5zm0 10.938a4.688 4.688 0 1 1 0-9.377 4.688 4.688 0 0 1 0 9.377zm2.603-3.132L18.2 17.153 20.353 15l.647.646-1.506 1.507L21 18.659l-.647.647zM15 17.246l1.506 1.507L15 20.259l.647.647 2.153-2.153-2.153-2.153-.647.646z"},"child":[]}]})(props);
};
function VscRemote (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.904 9.57L8.928 5.596l3.976-3.976-.619-.62L8 5.286v.619l4.285 4.285.62-.618zM3 5.62l4.072 4.07L3 13.763l.619.618L8 10v-.619L3.619 5 3 5.619z"},"child":[]}]})(props);
};
function VscRemove (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 8H1V7h14v1z"},"child":[]}]})(props);
};
function VscReplaceAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.6 2.677c.147-.31.356-.465.626-.465.248 0 .44.118.573.353.134.236.201.557.201.966 0 .443-.078.798-.235 1.067-.156.268-.365.402-.627.402-.237 0-.416-.125-.537-.374h-.008v.31H11V1h.593v1.677h.008zm-.016 1.1a.78.78 0 0 0 .107.426c.071.113.163.169.274.169.136 0 .24-.072.314-.216.075-.145.113-.35.113-.615 0-.22-.035-.39-.104-.514-.067-.124-.164-.187-.29-.187-.12 0-.219.062-.297.185a.886.886 0 0 0-.117.48v.272zM4.12 7.695L2 5.568l.662-.662 1.006 1v-1.51A1.39 1.39 0 0 1 5.055 3H7.4v.905H5.055a.49.49 0 0 0-.468.493l.007 1.5.949-.944.656.656-2.08 2.085zM9.356 4.93H10V3.22C10 2.408 9.685 2 9.056 2c-.135 0-.285.024-.45.073a1.444 1.444 0 0 0-.388.167v.665c.237-.203.487-.304.75-.304.261 0 .392.156.392.469l-.6.103c-.506.086-.76.406-.76.961 0 .263.061.473.183.631A.61.61 0 0 0 8.69 5c.29 0 .509-.16.657-.48h.009v.41zm.004-1.355v.193a.75.75 0 0 1-.12.436.368.368 0 0 1-.313.17.276.276 0 0 1-.22-.095.38.38 0 0 1-.08-.248c0-.222.11-.351.332-.389l.4-.067zM7 12.93h-.644v-.41h-.009c-.148.32-.367.48-.657.48a.61.61 0 0 1-.507-.235c-.122-.158-.183-.368-.183-.63 0-.556.254-.876.76-.962l.6-.103c0-.313-.13-.47-.392-.47-.263 0-.513.102-.75.305v-.665c.095-.063.224-.119.388-.167.165-.049.315-.073.45-.073.63 0 .944.407.944 1.22v1.71zm-.64-1.162v-.193l-.4.068c-.222.037-.333.166-.333.388 0 .1.027.183.08.248a.276.276 0 0 0 .22.095.368.368 0 0 0 .312-.17c.08-.116.12-.26.12-.436zM9.262 13c.321 0 .568-.058.738-.173v-.71a.9.9 0 0 1-.552.207.619.619 0 0 1-.5-.215c-.12-.145-.181-.345-.181-.598 0-.26.063-.464.189-.612a.644.644 0 0 1 .516-.223c.194 0 .37.069.528.207v-.749c-.129-.09-.338-.134-.626-.134-.417 0-.751.14-1.001.422-.249.28-.373.662-.373 1.148 0 .42.116.764.349 1.03.232.267.537.4.913.4zM2 9l1-1h9l1 1v5l-1 1H3l-1-1V9zm1 0v5h9V9H3zm3-2l1-1h7l1 1v5l-1 1V7H6z"},"child":[]}]})(props);
};
function VscReplace (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.221 3.739l2.261 2.269L7.7 3.784l-.7-.7-1.012 1.007-.008-1.6a.523.523 0 0 1 .5-.526H8V1H6.48A1.482 1.482 0 0 0 5 2.489V4.1L3.927 3.033l-.706.706zm6.67 1.794h.01c.183.311.451.467.806.467.393 0 .706-.168.94-.503.236-.335.353-.78.353-1.333 0-.511-.1-.913-.301-1.207-.201-.295-.488-.442-.86-.442-.405 0-.718.194-.938.581h-.01V1H9v4.919h.89v-.386zm-.015-1.061v-.34c0-.248.058-.448.175-.601a.54.54 0 0 1 .445-.23.49.49 0 0 1 .436.233c.104.154.155.368.155.643 0 .33-.056.587-.169.768a.524.524 0 0 1-.47.27.495.495 0 0 1-.411-.211.853.853 0 0 1-.16-.532zM9 12.769c-.256.154-.625.231-1.108.231-.563 0-1.02-.178-1.369-.533-.349-.355-.523-.813-.523-1.374 0-.648.186-1.158.56-1.53.374-.376.875-.563 1.5-.563.433 0 .746.06.94.179v.998a1.26 1.26 0 0 0-.792-.276c-.325 0-.583.1-.774.298-.19.196-.283.468-.283.816 0 .338.09.603.272.797.182.191.431.287.749.287.282 0 .558-.092.828-.276v.946zM4 7L3 8v6l1 1h7l1-1V8l-1-1H4zm0 1h7v6H4V8z"},"child":[]}]})(props);
};
function VscReply (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.306 2.146l-4.02 4.02v.708l4.02 4.02.708-.707L3.807 6.98H5.69c2.813 0 4.605.605 5.705 1.729 1.102 1.125 1.615 2.877 1.615 5.421v.35h1v-.35c0-2.646-.527-4.72-1.9-6.121C10.735 6.605 8.617 5.98 5.69 5.98H3.887l3.127-3.126-.708-.708z"},"child":[]}]})(props);
};
function VscRepoClone (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13 10H4V2h4V1H3.74a1.9 1.9 0 0 0-.67.13 1.66 1.66 0 0 0-.57.41 1.73 1.73 0 0 0-.37.59 1.68 1.68 0 0 0-.13.62v9.5a1.75 1.75 0 0 0 1.07 1.62 1.9 1.9 0 0 0 .67.13H4v-1h-.26a.72.72 0 0 1-.29-.06.78.78 0 0 1-.4-.4.93.93 0 0 1 0-.29v-.5a.93.93 0 0 1 0-.29.78.78 0 0 1 .4-.4.72.72 0 0 1 .29-.06H13v2H9v1h4.5l.5-.5V9h-1v1zM6 3H5v1h1V3zM5 5h1v1H5V5zm0 2h1v1H5V7zm.28 8H5v-3h3v3h-.28L6.5 13.49 5.28 15zM10 1h4.5l.5.5v6l-.5.5H12v1h-1V8h-1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm.5 6h.5V6h-.5a.5.5 0 0 0 0 1zM12 7h2V6h-2v1zm-1-2h3V2h-3v3z"},"child":[]}]})(props);
};
function VscRepoFetch (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"rect","attr":{"x":"8","y":"4","width":"1","height":"1","rx":"0.5"},"child":[]},{"tag":"rect","attr":{"x":"8","y":"6","width":"1","height":"1","rx":"0.5"},"child":[]},{"tag":"rect","attr":{"x":"8","y":"2","width":"1","height":"1","rx":"0.5"},"child":[]},{"tag":"rect","attr":{"x":"8","width":"1","height":"1","rx":"0.5"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.00016 6.43935L9.00016 6.43935L12.6466 2.79291L13.3537 3.50001L8.85371 8.00001H8.14661L3.64661 3.50001L4.35371 2.79291L8.00016 6.43935Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.03544 12H2V13H5.03544C5.27806 14.6961 6.73676 16 8.5 16C10.2632 16 11.7219 14.6961 11.9646 13H15.0001V12H11.9646C11.7219 10.3039 10.2632 9 8.5 9C6.73676 9 5.27806 10.3039 5.03544 12ZM11 12.5C11 13.8807 9.88071 15 8.5 15C7.11929 15 6 13.8807 6 12.5C6 11.1193 7.11929 10 8.5 10C9.88071 10 11 11.1193 11 12.5Z"},"child":[]}]})(props);
};
function VscRepoForcePush (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.00016 2.56065L8 3.5H9L9.00016 2.56065L12.6466 6.20709L13.3537 5.49999L8.85371 0.999986H8.14661L3.64661 5.49999L4.35371 6.20709L8.00016 2.56065Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.00016 5.56065V7.99999H9.00016V5.56065L12.6466 9.20709L13.3537 8.49999L8.85371 3.99999H8.14661L3.64661 8.49999L4.35371 9.20709L8.00016 5.56065Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.03544 12H2V13H5.03544C5.27806 14.6961 6.73676 16 8.5 16C10.2632 16 11.7219 14.6961 11.9646 13H15.0001V12H11.9646C11.7219 10.3039 10.2632 9 8.5 9C6.73676 9 5.27806 10.3039 5.03544 12ZM11 12.5C11 13.8807 9.88071 15 8.5 15C7.11929 15 6 13.8807 6 12.5C6 11.1193 7.11929 10 8.5 10C9.88071 10 11 11.1193 11 12.5Z"},"child":[]}]})(props);
};
function VscRepoForked (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 4a2 2 0 1 0-2.47 1.94V7a.48.48 0 0 1-.27.44L8.49 8.88l-2.76-1.4A.49.49 0 0 1 5.46 7V5.94a2 2 0 1 0-1 0V7a1.51 1.51 0 0 0 .82 1.34L8 9.74v1.32a2 2 0 1 0 1 0V9.74l2.7-1.36A1.49 1.49 0 0 0 12.52 7V5.92A2 2 0 0 0 14 4zM4 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.47 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"},"child":[]}]})(props);
};
function VscRepoPull (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.03544 12H2V13H5.03544C5.27806 14.6961 6.73676 16 8.5 16C10.2632 16 11.7219 14.6961 11.9646 13H15.0001V12H11.9646C11.7219 10.3039 10.2632 9 8.5 9C6.73676 9 5.27806 10.3039 5.03544 12ZM11 12.5C11 13.8807 9.88071 15 8.5 15C7.11929 15 6 13.8807 6 12.5C6 11.1193 7.11929 10 8.5 10C9.88071 10 11 11.1193 11 12.5Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.00016 6.43934V0H9.00016V6.43934L12.6466 2.7929L13.3537 3.5L8.85371 8H8.14661L3.64661 3.5L4.35371 2.7929L8.00016 6.43934Z"},"child":[]}]})(props);
};
function VscRepoPush (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.00016 2.56066V8H9.00016V2.56066L12.6466 6.2071L13.3537 5.5L8.85371 0.999996H8.14661L3.64661 5.5L4.35371 6.2071L8.00016 2.56066Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.03544 12H2V13H5.03544C5.27806 14.6961 6.73676 16 8.5 16C10.2632 16 11.7219 14.6961 11.9646 13H15.0001V12H11.9646C11.7219 10.3039 10.2632 9 8.5 9C6.73676 9 5.27806 10.3039 5.03544 12ZM11 12.5C11 13.8807 9.88071 15 8.5 15C7.11929 15 6 13.8807 6 12.5C6 11.1193 7.11929 10 8.5 10C9.88071 10 11 11.1193 11 12.5Z"},"child":[]}]})(props);
};
function VscRepo (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 10V1.5l-.5-.5H3.74a1.9 1.9 0 0 0-.67.13 1.77 1.77 0 0 0-.94 1 1.7 1.7 0 0 0-.13.62v9.5a1.7 1.7 0 0 0 .13.67c.177.427.515.768.94.95a1.9 1.9 0 0 0 .67.13H4v-1h-.26a.72.72 0 0 1-.29-.06.74.74 0 0 1-.4-.4.93.93 0 0 1-.05-.29v-.5a.93.93 0 0 1 .05-.29.74.74 0 0 1 .4-.4.72.72 0 0 1 .286-.06H13v2H9v1h4.5l.5-.5V10zM4 10V2h9v8H4zm1-7h1v1H5V3zm0 2h1v1H5V5zm1 2H5v1h1V7zm.5 6.49L5.28 15H5v-3h3v3h-.28L6.5 13.49z"},"child":[]}]})(props);
};
function VscReport (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 1h13l.5.5v10l-.5.5H7.707l-2.853 2.854L4 14.5V12H1.5l-.5-.5v-10l.5-.5zm6 10H14V2H2v9h2.5l.5.5v1.793l2.146-2.147L7.5 11zm0-8h1v5h-1V3zm0 7h1V9h-1v1z"},"child":[]}]})(props);
};
function VscRequestChanges (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10.7099 1.29L13.7099 4.29L13.9999 5V14L12.9999 15H3.99994L2.99994 14V2L3.99994 1H9.99994L10.7099 1.29ZM3.99994 14H12.9999V5L9.99994 2H3.99994V14ZM8 6H6V7H8V9H9V7H11V6H9V4H8V6ZM6 11H11V12H6V11Z"},"child":[]}]})(props);
};
function VscRobot (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 8C8 9.10457 7.10457 10 6 10C4.89543 10 4 9.10457 4 8C4 6.89543 4.89543 6 6 6C7.10457 6 8 6.89543 8 8ZM5 8C5 8.55228 5.44772 9 6 9C6.55228 9 7 8.55228 7 8C7 7.44772 6.55228 7 6 7C5.44772 7 5 7.44772 5 8Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 8C8 9.10457 8.89543 10 10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8ZM11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.51001 11.251C9.02924 11.1436 9.50557 10.8864 9.88001 10.511L10.58 11.221C9.89283 11.901 8.96678 12.2851 8.00001 12.291C7.51235 12.2873 7.03006 12.1888 6.58001 12.001C6.13507 11.8188 5.73061 11.5503 5.39001 11.211L6.09001 10.501C6.40274 10.8119 6.78661 11.0418 7.20833 11.1708C7.63005 11.2998 8.07687 11.3238 8.51001 11.241V11.251Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.5 1.5C9.5 2.15311 9.0826 2.70873 8.5 2.91465V3H11C12.6569 3 14 4.34315 14 6V7L15 8V10L14 11V12C14 13.6569 12.6569 15 11 15H5C3.34315 15 2 13.6569 2 12V11L1 10V8L2 7V6C2 4.34315 3.34315 3 5 3H7.5V2.91465C6.9174 2.70873 6.5 2.15311 6.5 1.5C6.5 0.671573 7.17157 0 8 0C8.82843 0 9.5 0.671573 9.5 1.5ZM5 4C3.89543 4 3 4.89543 3 6V12C3 13.1046 3.89543 14 5 14H11C12.1046 14 13 13.1046 13 12V6C13 4.89543 12.1046 4 11 4H5Z"},"child":[]}]})(props);
};
function VscRocket (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.491 1c-3.598.004-6.654 1.983-8.835 4H1.5l-.5.5v3l.147.354.991.991.001.009 4 4 .009.001.999.999L7.5 15h3l.5-.5v-4.154c2.019-2.178 3.996-5.233 3.992-8.846l-.501-.5zM2 6h2.643a23.828 23.828 0 0 0-2.225 2.71L2 8.294V6zm5.7 8l-.42-.423a23.59 23.59 0 0 0 2.715-2.216V14H7.7zm-1.143-1.144L3.136 9.437C4.128 8 8.379 2.355 13.978 2.016c-.326 5.612-5.987 9.853-7.421 10.84zM4 15v-1H2v-2H1v3h3zm6.748-7.667a1.5 1.5 0 1 0-2.496-1.666 1.5 1.5 0 0 0 2.495 1.666z"},"child":[]}]})(props);
};
function VscRootFolderOpened (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 6.257V2.5l.5-.5h5l.35.15.86.85h5.79l.5.5V6h1.13l.48.63-2.63 7-.48.37H8.743a5.48 5.48 0 0 0 .657-1h2.73l2.37-6H8.743a5.534 5.534 0 0 0-.72-.724l.127-.126L8.5 6H13V4H7.5l-.35-.15L6.29 3H2l.01 2.594c-.361.184-.7.407-1.01.663z"},"child":[]},{"tag":"path","attr":{"d":"M6 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 10.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM4.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},"child":[]}]})(props);
};
function VscRootFolder (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.71 3h6.79l.51.5v10l-.5.5H8.743a5.48 5.48 0 0 0 .657-1h4.59v-1.51l.01-4v-1.5H7.69l-.017.017a5.494 5.494 0 0 0-.881-.508l.348-.349.35-.15h6.5l.01-.99H7.5l-.36-.15-.85-.85H2V5.6a5.45 5.45 0 0 0-.99.649V2.5l.5-.5h5l.35.15.85.85z"},"child":[]},{"tag":"path","attr":{"d":"M6 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 10.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM4.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},"child":[]}]})(props);
};
function VscRss (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 13H3v-2c1.11 0 2 .89 2 2zM3 3v1a9 9 0 0 1 9 9h1C13 7.48 8.52 3 3 3zm0 4v1c2.75 0 5 2.25 5 5h1c0-3.31-2.69-6-6-6z"},"child":[]}]})(props);
};
function VscRuby (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 7.19l6.64 6.64h.72L15 7.19v-.72l-3.32-3.32-.36-.15H4.68l-.36.15L1 6.47v.72zm7 5.56L2.08 6.83 4.89 4h6.22l2.81 2.83L8 12.75zm0-7.73h2.69l1.81 1.81-4.5 4.4V5.02z"},"child":[]}]})(props);
};
function VscRunAbove (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1.77 1.01L1 1.42v12l.78.42 9-6v-.83l-9.01-6zM2 12.49V2.36l7.6 5.07L2 12.49zM12.15 8h.71l2.5 2.5-.71.71L13 9.56V15h-1V9.55l-1.65 1.65-.7-.7 2.5-2.5z"},"child":[]}]})(props);
};
function VscRunAllCoverage (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 17 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9 13.3497L15.7795 8.83V8L6.99951 2.14667V3.35L14.5995 8.42L9 12.1481V13.3497Z"},"child":[]},{"tag":"path","attr":{"d":"M2.99951 2.41L3.77951 2L12.7795 8V8.83L9 11.3497V10.1507L11.5995 8.42L3.99951 3.35V7H2.99951V2.41Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.87227 7.80803C4.02215 7.7549 3.16715 7.9667 2.46857 8.44931C1.71646 8.9338 1.23555 9.6327 0.970474 10.4798C0.70131 11.2888 0.756984 12.1983 1.07646 12.997C1.39862 13.8024 1.98841 14.444 2.73373 14.8699C3.48976 15.3019 4.34985 15.407 5.20068 15.2475C6.06198 15.086 6.81126 14.6028 7.34443 13.963L7.34919 13.9568C7.87759 13.2698 8.20141 12.468 8.20141 11.6053C8.20141 10.5403 7.82698 9.63047 7.13464 8.88488L7.12941 8.87965C6.54444 8.29468 5.74055 7.8623 4.87227 7.80803ZM2.95059 9.18281C3.4627 8.81037 4.12262 8.66604 4.74312 8.71377L4.74421 8.71385C5.40049 8.76073 5.9647 9.04069 6.44119 9.51719C6.95689 10.0329 7.24402 10.7907 7.24402 11.5546V11.5618L7.24453 11.5689C7.29089 12.2179 7.0608 12.8292 6.67758 13.3579C6.25159 13.8765 5.68456 14.2071 5.06818 14.3493C4.45885 14.49 3.80161 14.3963 3.23776 14.0674C2.66626 13.7341 2.23786 13.259 1.95045 12.6362C1.67052 12.0297 1.66791 11.3722 1.85872 10.752L1.85983 10.7482C2.04996 10.0827 2.42849 9.56252 2.95059 9.18281ZM6.35355 10.8536L4.35355 12.8536H3.64645L2.64645 11.8536L3.35355 11.1464L4 11.7929L5.64645 10.1464L6.35355 10.8536Z"},"child":[]}]})(props);
};
function VscRunAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2.78 2L2 2.41v12l.78.42 9-6V8l-9-6zM3 13.48V3.35l7.6 5.07L3 13.48z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 14.683l8.78-5.853V8L6 2.147V3.35l7.6 5.07L6 13.48v1.203z"},"child":[]}]})(props);
};
function VscRunBelow (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1.8 1.01l-.78.41v12l.78.42 9-6v-.83l-9-6zm.22 11.48V2.36l7.6 5.07-7.6 5.06zM12.85 15h-.71l-2.5-2.5.71-.71L12 13.44V8h1v5.45l1.65-1.65.71.71L12.85 15z"},"child":[]}]})(props);
};
function VscRunCoverage (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 2.41L5.78 2L14.78 8V8.83L9 12.6833V11.4826L13.6 8.42L6 3.35V7H5V2.41Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.87227 7.80803C4.02215 7.7549 3.16715 7.9667 2.46857 8.44931C1.71646 8.9338 1.23555 9.6327 0.970474 10.4798C0.70131 11.2888 0.756984 12.1983 1.07646 12.997C1.39862 13.8024 1.98841 14.444 2.73373 14.8699C3.48976 15.3019 4.34985 15.407 5.20068 15.2475C6.06198 15.086 6.81126 14.6028 7.34443 13.963L7.34919 13.9568C7.87759 13.2698 8.20141 12.468 8.20141 11.6053C8.20141 10.5403 7.82698 9.63047 7.13464 8.88488L7.12941 8.87965C6.54444 8.29468 5.74055 7.8623 4.87227 7.80803ZM2.95059 9.18281C3.4627 8.81037 4.12262 8.66604 4.74312 8.71377L4.74421 8.71385C5.40049 8.76073 5.96469 9.04069 6.44119 9.51719C6.95689 10.0329 7.24402 10.7907 7.24402 11.5546V11.5618L7.24453 11.5689C7.29089 12.2179 7.0608 12.8292 6.67758 13.3579C6.25159 13.8765 5.68456 14.2071 5.06818 14.3493C4.45885 14.49 3.80161 14.3963 3.23776 14.0674C2.66626 13.7341 2.23786 13.259 1.95045 12.6362C1.67052 12.0297 1.66791 11.3722 1.85872 10.752L1.85983 10.7482C2.04996 10.0827 2.42849 9.56252 2.95059 9.18281ZM6.35355 10.8536L4.35355 12.8536H3.64645L2.64645 11.8536L3.35355 11.1464L4 11.7929L5.64645 10.1464L6.35355 10.8536Z"},"child":[]}]})(props);
};
function VscRunErrors (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 2.41L5.78 2L14.78 8V8.83L9 12.6833V11.4826L13.6 8.42L6 3.35V7H5V2.41Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.87227 7.80803C4.02215 7.7549 3.16715 7.9667 2.46857 8.44931C1.71646 8.9338 1.23555 9.6327 0.970474 10.4798C0.70131 11.2888 0.756984 12.1983 1.07646 12.997C1.39862 13.8024 1.98841 14.444 2.73373 14.8699C3.48976 15.3019 4.34985 15.407 5.20068 15.2475C6.06198 15.086 6.81126 14.6028 7.34443 13.963L7.34919 13.9568C7.87759 13.2698 8.20141 12.468 8.20141 11.6053C8.20141 10.5403 7.82698 9.63047 7.13464 8.88488L7.12941 8.87965C6.54444 8.29468 5.74055 7.8623 4.87227 7.80803ZM2.95059 9.18281C3.4627 8.81037 4.12262 8.66604 4.74312 8.71377L4.74421 8.71385C5.40049 8.76073 5.96469 9.04069 6.44119 9.51719C6.95689 10.0329 7.24402 10.7907 7.24402 11.5546V11.5618L7.24453 11.5689C7.29089 12.2179 7.0608 12.8292 6.67758 13.3579C6.25159 13.8765 5.68456 14.2071 5.06818 14.3493C4.45885 14.49 3.80161 14.3963 3.23776 14.0674C2.66626 13.7341 2.23786 13.259 1.95045 12.6362C1.67052 12.0297 1.66791 11.3722 1.85872 10.752L1.85983 10.7482C2.04996 10.0827 2.42849 9.56252 2.95059 9.18281ZM4.5051 11.0124L3.29191 9.7487L2.65431 10.3863L3.87316 11.6559L2.65431 12.9256L3.29191 13.5632L4.5051 12.2994L5.71829 13.5632L6.35589 12.9256L5.13704 11.6559L6.35589 10.3863L5.71829 9.7487L4.5051 11.0124Z"},"child":[]}]})(props);
};
function VscSaveAll (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.85 2.65l-1.5-1.5L13 1H4.48l-.5.5V4H1.5l-.5.5v10l.5.5h10l.5-.5V12h2.5l.5-.5V3l-.15-.35zM11 14H2V5h1v3.07h6V5h.79L11 6.21V14zM6 7V5h2v2H6zm8 4h-2V6l-.15-.35-1.5-1.5L10 4H5V2h7.81l1.21 1.21L14 11z"},"child":[]}]})(props);
};
function VscSaveAs (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.04 1.33L12.71 3l.29.71v.33h-.5l-.5.5v-.83l-1.67-1.67H10v4H4v-4H2v10h3l-.5 1H2l-1-1v-10l1-1h8.33l.71.29zM7 5h2V2H7v3zm6.5 0L15 6.5l-.02.69-5.5 5.5-.13.12-.37.37-.1.09-3 1.5-.67-.67 1.5-3 .09-.1.37-.37.12-.13 5.5-5.5h.71zm-6.22 7.24l-.52 1 1.04-.48-.52-.52zm.69-1.03l.79.79 5.15-5.15-.79-.79-5.15 5.15z"},"child":[]}]})(props);
};
function VscSave (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.353 1.146l1.5 1.5L15 3v11.5l-.5.5h-13l-.5-.5v-13l.5-.5H13l.353.146zM2 2v12h12V3.208L12.793 2H11v4H4V2H2zm6 0v3h2V2H8z"},"child":[]}]})(props);
};
function VscScreenFull (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3 12h10V4H3v8zm2-6h6v4H5V6zM2 6H1V2.5l.5-.5H5v1H2v3zm13-3.5V6h-1V3h-3V2h3.5l.5.5zM14 10h1v3.5l-.5.5H11v-1h3v-3zM2 13h3v1H1.5l-.5-.5V10h1v3z"},"child":[]}]})(props);
};
function VscScreenNormal (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3.5 4H1V3h2V1h1v2.5l-.5.5zM13 3V1h-1v2.5l.5.5H15V3h-2zm-1 9.5V15h1v-2h2v-1h-2.5l-.5.5zM1 12v1h2v2h1v-2.5l-.5-.5H1zm11-1.5l-.5.5h-7l-.5-.5v-5l.5-.5h7l.5.5v5zM10 7H6v2h4V7z"},"child":[]}]})(props);
};
function VscSearchFuzzy (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 1.5C5.51472 1.5 3.5 3.51472 3.5 6C3.5 7.20114 3.9706 8.29237 4.73749 9.09937L1.04291 12.7939L1.75001 13.5011L5.5053 9.74577C6.2193 10.2222 7.07721 10.5 8 10.5C10.4853 10.5 12.5 8.48528 12.5 6C12.5 3.51472 10.4853 1.5 8 1.5ZM4.5 6C4.5 4.067 6.067 2.5 8 2.5C9.933 2.5 11.5 4.067 11.5 6C11.5 7.933 9.933 9.5 8 9.5C6.067 9.5 4.5 7.933 4.5 6Z"},"child":[]},{"tag":"path","attr":{"d":"M8.99998 13.8546L6.85353 16.0011H6.14642L4.64642 14.5011L5.35353 13.7939L6.49998 14.9404L8.64642 12.7939H9.35353L11.5 14.9404L13.6464 12.7939H14.3535L16 14.4404V15.8546L14 13.8546L11.8535 16.0011H11.1464L8.99998 13.8546Z"},"child":[]}]})(props);
};
function VscSearchStop (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.738 3.318a4.5 4.5 0 0 0-.877 5.123A4.48 4.48 0 0 0 6.1 10a4.62 4.62 0 0 0-.1 1v.17c-.16-.11-.32-.22-.47-.34L1.75 14.5 1 13.84l3.8-3.69a5.5 5.5 0 1 1 9.62-3.65c0 .268-.02.535-.06.8a5.232 5.232 0 0 0-.94-.68V6.5a4.5 4.5 0 0 0-7.682-3.182zm3.04 4.356a4 4 0 1 1 4.444 6.652 4 4 0 0 1-4.444-6.652zm.1 5.447A3 3 0 0 0 11 14a3 3 0 0 0 1.74-.55L8.55 9.26A3 3 0 0 0 8 11a3 3 0 0 0 .879 2.121zm.382-4.57l4.19 4.189A3 3 0 0 0 14 11a3 3 0 0 0-3-3 3 3 0 0 0-1.74.55z"},"child":[]}]})(props);
};
function VscSearch (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1 8.05-9.12A8.251 8.251 0 1 0 15.25.01V0zm0 15a6.75 6.75 0 1 1 0-13.5 6.75 6.75 0 0 1 0 13.5z"},"child":[]}]})(props);
};
function VscSend (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M1 1.91L1.78 1.5L15 7.44899V8.3999L1.78 14.33L1 13.91L2.58311 8L1 1.91ZM3.6118 8.5L2.33037 13.1295L13.5 7.8999L2.33037 2.83859L3.6118 7.43874L9 7.5V8.5H3.6118Z"},"child":[]}]})(props);
};
function VscServerEnvironment (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6 3h4v1H6V3zm0 6h4v1H6V9zm0 2h4v1H6v-1zm9.14 5H.86l1.25-5H4V2a.95.95 0 0 1 .078-.383c.052-.12.123-.226.211-.32a.922.922 0 0 1 .32-.219A1.01 1.01 0 0 1 5 1h6a.95.95 0 0 1 .383.078c.12.052.226.123.32.211a.922.922 0 0 1 .219.32c.052.125.078.256.078.391v9h1.89l1.25 5zM5 13h6V2H5v11zm8.86 2l-.75-3H12v2H4v-2H2.89l-.75 3h11.72z"},"child":[]}]})(props);
};
function VscServerProcess (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2h13l.5.5V9h-1V6H2v7h7v1H1.5l-.5-.5v-11l.5-.5zM2 5h12V3H2v2zm5 7v-1.094a1.633 1.633 0 0 1-.469-.265l-.945.539-.5-.86.937-.547a1.57 1.57 0 0 1 0-.547l-.937-.546.5-.86.945.54c.151-.12.308-.209.469-.266V7h1v1.094a1.48 1.48 0 0 1 .469.265l.945-.539.5.86-.937.547a1.57 1.57 0 0 1 0 .546l.937.547-.5.86-.945-.54a1.807 1.807 0 0 1-.469.266V12H7zm-.25-2.5c0 .208.073.385.219.531a.723.723 0 0 0 .531.219.723.723 0 0 0 .531-.219.723.723 0 0 0 .219-.531.723.723 0 0 0-.219-.531.723.723 0 0 0-.531-.219.723.723 0 0 0-.531.219.723.723 0 0 0-.219.531zm5.334 5.5v-1.094a1.634 1.634 0 0 1-.469-.265l-.945.539-.5-.86.938-.547a1.572 1.572 0 0 1 0-.547l-.938-.546.5-.86.945.54c.151-.12.308-.209.47-.266V10h1v1.094a1.486 1.486 0 0 1 .468.265l.945-.539.5.86-.937.547a1.562 1.562 0 0 1 0 .546l.937.547-.5.86-.945-.54a1.806 1.806 0 0 1-.469.266V15h-1zm-.25-2.5c0 .208.073.385.219.531a.723.723 0 0 0 .531.219.723.723 0 0 0 .531-.219.723.723 0 0 0 .22-.531.723.723 0 0 0-.22-.531.723.723 0 0 0-.53-.219.723.723 0 0 0-.532.219.723.723 0 0 0-.219.531z"},"child":[]}]})(props);
};
function VscServer (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.5 5L2 4.5v-3l.5-.5h11l.5.5v3l-.5.5h-11zM10 2H9v1H8V2H7v1H6V2H5v1H4V2H3v2h10V2h-2v1h-1V2zm-7.5 8L2 9.5v-3l.5-.5h11l.5.5v3l-.5.5h-11zM6 7H5v1H4V7H3v2h10V7h-2v1h-1V7H9v1H8V7H7v1H6V7zm7.5 8l.5-.5v-3l-.5-.5h-11l-.5.5v3l.5.5h11zM3 14v-2h1v1h1v-1h1v1h1v-1h1v1h1v-1h1v1h1v-1h2v2H3z"},"child":[]}]})(props);
};
function VscSettingsGear (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M19.85 8.75l4.15.83v4.84l-4.15.83 2.35 3.52-3.43 3.43-3.52-2.35-.83 4.15H9.58l-.83-4.15-3.52 2.35-3.43-3.43 2.35-3.52L0 14.42V9.58l4.15-.83L1.8 5.23 5.23 1.8l3.52 2.35L9.58 0h4.84l.83 4.15 3.52-2.35 3.43 3.43-2.35 3.52zm-1.57 5.07l4-.81v-2l-4-.81-.54-1.3 2.29-3.43-1.43-1.43-3.43 2.29-1.3-.54-.81-4h-2l-.81 4-1.3.54-3.43-2.29-1.43 1.43L6.38 8.9l-.54 1.3-4 .81v2l4 .81.54 1.3-2.29 3.43 1.43 1.43 3.43-2.29 1.3.54.81 4h2l.81-4 1.3-.54 3.43 2.29 1.43-1.43-2.29-3.43.54-1.3zm-8.186-4.672A3.43 3.43 0 0 1 12 8.57 3.44 3.44 0 0 1 15.43 12a3.43 3.43 0 1 1-5.336-2.852zm.956 4.274c.281.188.612.288.95.288A1.7 1.7 0 0 0 13.71 12a1.71 1.71 0 1 0-2.66 1.422z"},"child":[]}]})(props);
};
function VscSettings (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6 9.5C6.93191 9.5 7.71496 10.1374 7.93699 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7455 13.8231 11.9496 13.5899 11.9919L13.5 12L7.93673 12.001C7.71435 12.8631 6.93155 13.5 6 13.5C5.06845 13.5 4.28565 12.8631 4.06327 12.001L2.5 12C2.22386 12 2 11.7761 2 11.5C2 11.2545 2.17688 11.0504 2.41012 11.0081L2.5 11H4.06301C4.28504 10.1374 5.06809 9.5 6 9.5ZM6 10.5C5.44772 10.5 5 10.9477 5 11.5C5 12.0523 5.44772 12.5 6 12.5C6.55228 12.5 7 12.0523 7 11.5C7 10.9477 6.55228 10.5 6 10.5ZM10 2.5C10.9319 2.5 11.715 3.13738 11.937 3.99998L13.5 4C13.7761 4 14 4.22386 14 4.5C14 4.74546 13.8231 4.94961 13.5899 4.99194L13.5 5L11.9367 5.00102C11.7144 5.86312 10.9316 6.5 10 6.5C9.06845 6.5 8.28565 5.86312 8.06327 5.00102L2.5 5C2.22386 5 2 4.77614 2 4.5C2 4.25454 2.17688 4.05039 2.41012 4.00806L2.5 4L8.06301 3.99998C8.28504 3.13738 9.06809 2.5 10 2.5ZM10 3.5C9.44772 3.5 9 3.94772 9 4.5C9 5.05228 9.44772 5.5 10 5.5C10.5523 5.5 11 5.05228 11 4.5C11 3.94772 10.5523 3.5 10 3.5Z"},"child":[]}]})(props);
};
function VscShare (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5 4.00098H1.5L1 4.50098V14.501L1.5 15.001H12.5L13 14.501V11.5H12V14.001H2V5.00098H5V4.00098Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 11H5V8.5C5 6.08104 6.71776 4.06329 9 3.60002L9.00001 2.34885C9.00001 1.6039 9.60391 1 10.3489 1C10.7217 1 11.0779 1.15432 11.3329 1.42632L14.9795 5.31606V6.68394L11.3329 10.5737C11.0779 10.8457 10.7217 11 10.3489 11C9.60391 11 9 10.3961 9 9.65114L9 8.60178C8.06714 8.81236 7.61607 9.31244 7.36824 9.74614C7.18768 10.0621 7.09298 10.3875 7.04484 10.6402C7.02115 10.7646 7.00983 10.8656 7.0045 10.931C7.00184 10.9635 7.00072 10.9866 7.00025 10.9988L7.00019 11.0007C6.82645 11.0003 6.16755 11 6 11ZM10 4.5C7.89378 4.5 6.16778 6.12788 6.01152 8.1941C6.00389 8.29507 6 8.39708 6 8.5V10H6.1758C6.31381 9.55711 6.56019 9.03517 7 8.58307C7.44225 8.12846 8.08008 7.74446 9 7.58244C9.30193 7.52926 9.63424 7.5 10 7.5L10 9.65114C10 9.84381 10.1562 10 10.3489 10C10.4453 10 10.5374 9.96009 10.6034 9.88974L14.25 6L10.6034 2.11026C10.5374 2.03991 10.4453 2 10.3489 2C10.1562 2 10 2.15619 10 2.34886L10 4.5Z"},"child":[]},{"tag":"path","attr":{"d":"M7.00019 11.0007C7.05203 11.0008 7.06069 11.0006 7.00019 11.0007Z"},"child":[]},{"tag":"path","attr":{"d":"M7.00019 11.0007L6.99996 11.0079L6.99997 11.0065L6.99999 11.0039L7 11.0021L7.00019 11.0007V11.0007Z"},"child":[]}]})(props);
};
function VscShield (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.246 14.713a27.792 27.792 0 0 1-1.505-.953c-.501-.34-.983-.707-1.444-1.1-.458-.395-.888-.82-1.288-1.274-.4-.455-.753-.95-1.05-1.478a7.8 7.8 0 0 1-.7-1.69A7.041 7.041 0 0 1 2 6.3V3.1l.5-.5c.333 0 .656-.011.97-.036.296-.023.591-.066.882-.128.284-.062.562-.148.832-.256.284-.118.557-.261.816-.427a4.83 4.83 0 0 1 1.184-.565 4.8 4.8 0 0 1 2-.142 4.018 4.018 0 0 1 1.237.383c.199.097.392.204.58.322.26.167.535.31.821.428.27.109.547.194.831.256.291.062.587.106.884.129.311.024.634.035.967.035l.5.5v3.2a7.043 7.043 0 0 1-.256 1.919 7.804 7.804 0 0 1-.7 1.69 8.751 8.751 0 0 1-1.05 1.478c-.4.452-.829.877-1.286 1.27a15.94 15.94 0 0 1-1.448 1.1 28.71 28.71 0 0 1-1.51.956h-.508zM3 3.59V6.3c-.004.555.07 1.11.22 1.645a6.7 6.7 0 0 0 .61 1.473c.263.467.575.905.93 1.308.37.417.766.81 1.188 1.174.432.368.883.712 1.352 1.03.4.267.8.523 1.2.769.4-.242.8-.498 1.2-.768.47-.319.923-.663 1.355-1.031.421-.364.817-.756 1.186-1.172a7.8 7.8 0 0 0 .93-1.308c.261-.465.466-.96.61-1.473.15-.537.223-1.09.22-1.647V3.59c-.159 0-.313-.012-.465-.023l-.079-.006a7.95 7.95 0 0 1-1.018-.147 6.112 6.112 0 0 1-1.976-.814 5.166 5.166 0 0 0-.482-.27 3.123 3.123 0 0 0-.943-.29 3.686 3.686 0 0 0-1.558.106c-.332.108-.649.26-.94.452-.312.2-.64.372-.983.513a6.4 6.4 0 0 1-1 .307c-.335.07-.675.12-1.017.146-.174.01-.355.02-.54.026zm6.065 4.3a1.5 1.5 0 1 0-1.13 0L7.5 10.5h2l-.435-2.61z"},"child":[]}]})(props);
};
function VscSignIn (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.02 3.77l.01-.01.99.99V2.5l-.5-.5h-9l-.51.5v.493L2 3v10.29l.36.46 5 1.72L8 15v-1h3.52l.5-.5v-2.25l-1 1V13H8V4.71l-.33-.46L4.036 3h6.984v.77zM7 14.28l-4-1.34V3.72l4 1.34v9.22zm3.09-6.75h4.97v1h-4.93l1.59 1.6-.71.7-2.47-2.46v-.71l2.49-2.48.7.7-1.64 1.65z"},"child":[]}]})(props);
};
function VscSignOut (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46 5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984v.77zM7 14.28l-4-1.34V3.72l4 1.34v9.22zm6.52-5.8H8.55v-1h4.93l-1.6-1.6.71-.7 2.47 2.46v.71l-2.49 2.48-.7-.7 1.65-1.65z"},"child":[]}]})(props);
};
function VscSmiley (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4.111 2.18a7 7 0 1 1 7.778 11.64A7 7 0 0 1 4.11 2.18zm.556 10.809a6 6 0 1 0 6.666-9.978 6 6 0 0 0-6.666 9.978zM6.5 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM8 11a3 3 0 0 1-2.65-1.58l-.87.48a4 4 0 0 0 7.12-.16l-.9-.43A3 3 0 0 1 8 11z"},"child":[]}]})(props);
};
function VscSnake (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 3.5C8 3.77614 7.77614 4 7.5 4C7.22386 4 7 3.77614 7 3.5C7 3.22386 7.22386 3 7.5 3C7.77614 3 8 3.22386 8 3.5Z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.5 1C4.11929 1 3 2.11929 3 3.5C3 4.00954 3.15244 4.48348 3.4142 4.8787L2.29289 6H0.5V7H2V8.5H3V6.70711L4.1213 5.5858C4.51652 5.84756 4.99046 6 5.5 6H7V8H6C4.89543 8 4 8.89543 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H13C14.1046 14 15 13.1046 15 12C15 10.8954 14.1046 10 13 10C13 8.89543 12.1046 8 11 8V4.5C11 2.567 9.433 1 7.5 1H5.5ZM4 3.5C4 2.67157 4.67157 2 5.5 2H7.5C8.88071 2 10 3.11929 10 4.5V8.5L10.5 9H11C11.5523 9 12 9.44772 12 10V11H13C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H5V10C5 9.44772 5.44772 9 6 9H7.5L8 8.5V5.5L7.5 5H5.5C4.67157 5 4 4.32843 4 3.5Z"},"child":[]}]})(props);
};
function VscSortPrecedence (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7 2L6 3v3h1V3h7v2.453l.207-.16.793.793V3l-1-1H7zm1 2h2v2H8V4zM5 9H3v2h2V9zM2 7L1 8v5l1 1h7l1-1V8L9 7H2zm0 6V8h7v5H2zm6-3H6v2h2v-2zm5-6h-1v3.864l-1.182-1.182-.707.707 2.035 2.036h.708l2.035-2.036-.707-.707L13 7.864V4z"},"child":[]}]})(props);
};
function VscSourceControl (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z"},"child":[]}]})(props);
};
function VscSparkleFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M 5.398 10.807 C 5.574 10.931 5.785 10.998 6 10.997 C 6.216 10.998 6.427 10.93 6.602 10.804 C 6.78 10.674 6.915 10.494 6.989 10.286 L 7.436 8.913 C 7.551 8.569 7.744 8.256 8 7.999 C 8.257 7.743 8.569 7.549 8.913 7.434 L 10.304 6.983 C 10.456 6.929 10.594 6.84 10.706 6.724 C 10.817 6.608 10.901 6.467 10.949 6.313 C 10.998 6.159 11.01 5.996 10.985 5.837 C 10.96 5.677 10.898 5.526 10.804 5.394 C 10.67 5.208 10.479 5.071 10.26 5.003 L 8.885 4.556 C 8.541 4.442 8.228 4.249 7.971 3.993 C 7.714 3.736 7.52 3.424 7.405 3.079 L 6.953 1.691 C 6.881 1.489 6.748 1.314 6.571 1.191 C 6.439 1.098 6.286 1.036 6.125 1.012 C 5.965 0.987 5.801 1.001 5.646 1.051 C 5.492 1.101 5.351 1.187 5.236 1.301 C 5.12 1.415 5.033 1.555 4.98 1.708 L 4.523 3.108 C 4.409 3.443 4.22 3.748 3.97 3.999 C 3.721 4.25 3.418 4.441 3.083 4.557 L 1.692 5.005 C 1.541 5.06 1.404 5.149 1.292 5.265 C 1.18 5.381 1.097 5.521 1.048 5.675 C 1 5.829 0.988 5.992 1.013 6.151 C 1.038 6.31 1.099 6.462 1.192 6.593 C 1.32 6.773 1.501 6.908 1.709 6.979 L 3.083 7.424 C 3.524 7.571 3.91 7.845 4.193 8.212 C 4.356 8.423 4.481 8.66 4.564 8.912 L 5.016 10.303 C 5.088 10.507 5.222 10.683 5.398 10.807 Z M 11.535 14.849 C 11.671 14.946 11.834 14.997 12 14.997 C 12.165 14.997 12.326 14.946 12.461 14.851 C 12.601 14.753 12.706 14.613 12.761 14.451 L 13.009 13.689 C 13.063 13.531 13.152 13.387 13.269 13.268 C 13.387 13.15 13.531 13.061 13.689 13.009 L 14.461 12.757 C 14.619 12.703 14.756 12.6 14.852 12.464 C 14.926 12.361 14.974 12.242 14.992 12.117 C 15.011 11.992 14.999 11.865 14.959 11.745 C 14.918 11.625 14.85 11.516 14.76 11.428 C 14.669 11.34 14.559 11.274 14.438 11.236 L 13.674 10.987 C 13.516 10.935 13.372 10.846 13.254 10.729 C 13.136 10.611 13.047 10.467 12.994 10.309 L 12.742 9.536 C 12.689 9.379 12.586 9.242 12.449 9.146 C 12.347 9.073 12.23 9.025 12.106 9.006 C 11.982 8.987 11.855 8.998 11.736 9.037 C 11.616 9.076 11.508 9.142 11.419 9.231 C 11.33 9.319 11.264 9.427 11.224 9.546 L 10.977 10.308 C 10.925 10.466 10.838 10.61 10.721 10.728 C 10.607 10.845 10.467 10.934 10.312 10.987 L 9.539 11.239 C 9.38 11.293 9.242 11.396 9.145 11.533 C 9.047 11.669 8.995 11.833 8.996 12.001 C 8.997 12.169 9.051 12.333 9.15 12.468 C 9.249 12.604 9.388 12.705 9.547 12.757 L 10.31 13.004 C 10.469 13.058 10.614 13.147 10.732 13.265 C 10.851 13.384 10.939 13.528 10.99 13.687 L 11.243 14.461 C 11.298 14.618 11.4 14.753 11.535 14.849 Z"},"child":[]}]})(props);
};
function VscSparkle (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.39804 10.8069C5.57428 10.9312 5.78476 10.9977 6.00043 10.9973C6.21633 10.9975 6.42686 10.93 6.60243 10.8043C6.77993 10.6739 6.91464 10.4936 6.98943 10.2863L7.43643 8.91335C7.55086 8.56906 7.74391 8.25615 8.00028 7.99943C8.25665 7.74272 8.56929 7.54924 8.91343 7.43435L10.3044 6.98335C10.4564 6.92899 10.5936 6.84019 10.7055 6.7239C10.8174 6.60762 10.9008 6.467 10.9492 6.31308C10.9977 6.15916 11.0098 5.99611 10.9847 5.83672C10.9596 5.67732 10.8979 5.52591 10.8044 5.39435C10.6703 5.20842 10.4794 5.07118 10.2604 5.00335L8.88543 4.55635C8.54091 4.44212 8.22777 4.24915 7.97087 3.99277C7.71396 3.73638 7.52035 3.42363 7.40543 3.07935L6.95343 1.69135C6.88113 1.48904 6.74761 1.31428 6.57143 1.19135C6.43877 1.09762 6.28607 1.03614 6.12548 1.01179C5.96489 0.987448 5.80083 1.00091 5.64636 1.05111C5.49188 1.1013 5.35125 1.18685 5.23564 1.30095C5.12004 1.41505 5.03265 1.55454 4.98043 1.70835L4.52343 3.10835C4.40884 3.44317 4.21967 3.74758 3.97022 3.9986C3.72076 4.24962 3.41753 4.44067 3.08343 4.55735L1.69243 5.00535C1.54065 5.05974 1.40352 5.14852 1.29177 5.26474C1.18001 5.38095 1.09666 5.52145 1.04824 5.67523C0.999819 5.82902 0.987639 5.99192 1.01265 6.1512C1.03767 6.31048 1.0992 6.46181 1.19243 6.59335C1.32027 6.7728 1.50105 6.90777 1.70943 6.97935L3.08343 7.42435C3.52354 7.57083 3.90999 7.84518 4.19343 8.21235C4.35585 8.42298 4.4813 8.65968 4.56443 8.91235L5.01643 10.3033C5.08846 10.5066 5.22179 10.6826 5.39804 10.8069ZM5.48343 3.39235L6.01043 2.01535L6.44943 3.39235C6.61312 3.8855 6.88991 4.33351 7.25767 4.70058C7.62544 5.06765 8.07397 5.34359 8.56743 5.50635L9.97343 6.03535L8.59143 6.48335C8.09866 6.64764 7.65095 6.92451 7.28382 7.29198C6.9167 7.65945 6.64026 8.10742 6.47643 8.60035L5.95343 9.97835L5.50443 8.59935C5.34335 8.10608 5.06943 7.65718 4.70443 7.28835C4.3356 6.92031 3.88653 6.64272 3.39243 6.47735L2.01443 5.95535L3.40043 5.50535C3.88672 5.33672 4.32775 5.05855 4.68943 4.69235C5.04901 4.32464 5.32049 3.88016 5.48343 3.39235ZM11.5353 14.8494C11.6713 14.9456 11.8337 14.9973 12.0003 14.9974C12.1654 14.9974 12.3264 14.9464 12.4613 14.8514C12.6008 14.7529 12.7058 14.6129 12.7613 14.4514L13.0093 13.6894C13.0625 13.5309 13.1515 13.3869 13.2693 13.2684C13.3867 13.1498 13.5307 13.0611 13.6893 13.0094L14.4613 12.7574C14.619 12.7029 14.7557 12.6004 14.8523 12.4644C14.9257 12.3614 14.9736 12.2424 14.9921 12.1173C15.0106 11.9922 14.9992 11.8645 14.9588 11.7447C14.9184 11.6249 14.8501 11.5163 14.7597 11.428C14.6692 11.3396 14.5591 11.2739 14.4383 11.2364L13.6743 10.9874C13.5162 10.9348 13.3724 10.8462 13.2544 10.7285C13.1364 10.6109 13.0473 10.4674 12.9943 10.3094L12.7423 9.53638C12.6886 9.37853 12.586 9.24191 12.4493 9.14638C12.3473 9.07343 12.2295 9.02549 12.1056 9.00642C11.9816 8.98736 11.8549 8.99772 11.7357 9.03665C11.6164 9.07558 11.508 9.142 11.4192 9.23054C11.3304 9.31909 11.2636 9.42727 11.2243 9.54638L10.9773 10.3084C10.925 10.466 10.8375 10.6097 10.7213 10.7284C10.6066 10.8449 10.4667 10.9335 10.3123 10.9874L9.53931 11.2394C9.38025 11.2933 9.2422 11.3959 9.1447 11.5326C9.04721 11.6694 8.99522 11.8333 8.99611 12.0013C8.99699 12.1692 9.0507 12.3326 9.14963 12.4683C9.24856 12.604 9.38769 12.7051 9.54731 12.7574L10.3103 13.0044C10.4692 13.0578 10.6136 13.1471 10.7323 13.2654C10.8505 13.3836 10.939 13.5283 10.9903 13.6874L11.2433 14.4614C11.2981 14.6178 11.4001 14.7534 11.5353 14.8494ZM10.6223 12.0564L10.4433 11.9974L10.6273 11.9334C10.9291 11.8284 11.2027 11.6556 11.4273 11.4284C11.6537 11.1994 11.8248 10.9216 11.9273 10.6164L11.9853 10.4384L12.0443 10.6194C12.1463 10.9261 12.3185 11.2047 12.5471 11.4332C12.7757 11.6617 13.0545 11.8336 13.3613 11.9354L13.5563 11.9984L13.3763 12.0574C13.0689 12.1596 12.7898 12.3322 12.5611 12.5616C12.3324 12.791 12.1606 13.0707 12.0593 13.3784L12.0003 13.5594L11.9423 13.3784C11.8409 13.0702 11.6687 12.7901 11.4394 12.5605C11.2102 12.3309 10.9303 12.1583 10.6223 12.0564Z"},"child":[]}]})(props);
};
function VscSplitHorizontal (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zM8 13H3V2h5v11zm6 0H9V2h5v11z"},"child":[]}]})(props);
};
function VscSplitVertical (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 1H3L2 2v11l1 1h11l1-1V2l-1-1zm0 12H3V8h11v5zm0-6H3V2h11v5z"},"child":[]}]})(props);
};
function VscSquirrel (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.558 2.642a3.698 3.698 0 0 0-.123-.01A1.47 1.47 0 0 0 3.999 1.52v1.307a4.898 4.898 0 0 0-2.993 3.587v.39c.459.836 1.906 1.13 2.154 1.18.027.006.04.009.035.009-2.419.32-2.19 2.249-2.19 2.249a1 1 0 0 0 1 .93c.272-.019.538-.08.79-.18h2.06a3 3 0 0 0-.36 1h-.32a2.55 2.55 0 0 0-2.17 2.528.42.42 0 0 0 .39.48h6.677a3.76 3.76 0 0 0 3.929-4.158 3.649 3.649 0 0 0-.75-2.09l-.11-.14c-.43-.55-.68-.909-.55-1.289.13-.38.365-.4.365-.4s.185-.03.455.09c.22.128.46.22.71.27a1.58 1.58 0 0 0 1.736-.905c.095-.208.143-.435.143-.664.006-.718-.33-1.455-.725-2.088a4.998 4.998 0 0 0-1.554-1.57 3.998 3.998 0 0 0-2.639-.4 3.049 3.049 0 0 0-1.67.89 3.56 3.56 0 0 0-.779 1.359 4.358 4.358 0 0 0-.636-.747v-.159A1.47 1.47 0 0 0 5.558 1.52v1.122zm5.304 8.739c.111.741.22 1.821-.867 2.442-.296.103-.608.16-.923.167H3.215a1 1 0 0 1 .92-1h1.279v-.499a1.79 1.79 0 0 1 1.653-1.825l-.626-.887c-.236.067-.463.153-.577.233H2.655a.754.754 0 0 0-.264.07c-.138.055-.274.109-.396.03-.2-.13.11-1.12 1.01-1.12h1c.49 0 .57-.54.57-.54l.28-1.129a3.389 3.389 0 0 1-2.85-.93 3.389 3.389 0 0 1 3.14-2.658l.083.002c.26.008.435.014.776.168.93.42 2.149 2.469 2.149 2.469l.06.09h.17v-.07c-.06-.443-.02-1.464.116-1.89.137-.424.367-.814.673-1.14a2.349 2.349 0 0 1 1.3-.659 2.639 2.639 0 0 1 1.86.29c.46.284.85.67 1.139 1.127.289.457.476.836.535 1.374-.001.02 0 .047.002.081.007.143.02.39-.128.547-.127.135-.448.23-.67.18a1.57 1.57 0 0 1-.45-.18 1.33 1.33 0 0 0-1.139-.13 1.42 1.42 0 0 0-.94 1 2.318 2.318 0 0 0 .64 2.238l.11.14c.347.434.546.966.57 1.52a2.999 2.999 0 0 1-.306 1.425 2.708 2.708 0 0 0-.464-1.304l-.37.368zM4.24 5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z"},"child":[]}]})(props);
};
function VscStarEmpty (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.595 6.252L8 1 6.405 6.252H1l4.373 3.4L3.75 15 8 11.695 12.25 15l-1.623-5.348L15 6.252H9.595zm-7.247.47H6.72L8 2.507 6.72 6.722H2.348zm3.537 2.75l-1.307 4.305 1.307-4.305zm7.767-2.75H9.28h4.372zm-8.75.9h2.366L8 5.214l.732 2.41h2.367l-1.915 1.49.731 2.409L8 10.032l-1.915 1.49.731-2.41-1.915-1.49z"},"child":[]}]})(props);
};
function VscStarFull (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.595 6.252L8 1 6.405 6.252H1l4.373 3.4L3.75 15 8 11.695 12.25 15l-1.623-5.348L15 6.252H9.595z"},"child":[]}]})(props);
};
function VscStarHalf (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6.405 6.252L8 1l1.595 5.252H15l-4.373 3.4L12.25 15 8 11.695 3.75 15l1.623-5.348L1 6.252h5.405zM8 10.032l1.915 1.49-.731-2.41 1.915-1.49H8.732L8 5.214v4.82zm0-7.525zm5.652 4.215H9.28h4.372z"},"child":[]}]})(props);
};
function VscStopCircle (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M6 6h4v4H6z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"},"child":[]}]})(props);
};
function VscSurroundWith (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 3.99988H3V2.99988H1.5L1 3.49988V12.4999L1.5 12.9999H3V11.9999H2V3.99988ZM14.5 2.99988H13V3.99988H14V11.9999H13V12.9999H14.5L15 12.4999V3.49988L14.5 2.99988ZM5 8.99988C5.55228 8.99988 6 8.55216 6 7.99988C6 7.44759 5.55228 6.99988 5 6.99988C4.44772 6.99988 4 7.44759 4 7.99988C4 8.55216 4.44772 8.99988 5 8.99988ZM9 7.99988C9 8.55216 8.55228 8.99988 8 8.99988C7.44772 8.99988 7 8.55216 7 7.99988C7 7.44759 7.44772 6.99988 8 6.99988C8.55228 6.99988 9 7.44759 9 7.99988ZM11 8.99988C11.5523 8.99988 12 8.55216 12 7.99988C12 7.44759 11.5523 6.99988 11 6.99988C10.4477 6.99988 10 7.44759 10 7.99988C10 8.55216 10.4477 8.99988 11 8.99988Z"},"child":[]}]})(props);
};
function VscSymbolArray (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2l-.5.5v11l.5.5H4v-1H2V3h2V2H1.5zm13 12l.5-.5v-11l-.5-.5H12v1h2v10h-2v1h2.5z"},"child":[]}]})(props);
};
function VscSymbolBoolean (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 3.5l.5-.5h13l.5.5v9l-.5.5h-13l-.5-.5v-9zM14 4H8v3.493h-.5l-3.574-.005 2.09-2.09-.707-.707-2.955 2.955v.708l2.955 2.955.707-.707-2.114-2.114 3.996.005H8v-.986l3.907.005-2.114-2.114.707-.707 2.956 2.955v.708L10.5 11.309l-.707-.707 2.09-2.09L8 8.507V12h6V4z"},"child":[]}]})(props);
};
function VscSymbolClass (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M11.34 9.71h.71l2.67-2.67v-.71L13.38 5h-.7l-1.82 1.81h-5V5.56l1.86-1.85V3l-2-2H5L1 5v.71l2 2h.71l1.14-1.15v5.79l.5.5H10v.52l1.33 1.34h.71l2.67-2.67v-.71L13.37 10h-.7l-1.86 1.85h-5v-4H10v.48l1.34 1.38zm1.69-3.65l.63.63-2 2-.63-.63 2-2zm0 5l.63.63-2 2-.63-.63 2-2zM3.35 6.65l-1.29-1.3 3.29-3.29 1.3 1.29-3.3 3.3z"},"child":[]}]})(props);
};
function VscSymbolColor (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 1.003a7 7 0 0 0-7 7v.43c.09 1.51 1.91 1.79 3 .7a1.87 1.87 0 0 1 2.64 2.64c-1.1 1.16-.79 3.07.8 3.2h.6a7 7 0 1 0 0-14l-.04.03zm0 13h-.52a.58.58 0 0 1-.36-.14.56.56 0 0 1-.15-.3 1.24 1.24 0 0 1 .35-1.08 2.87 2.87 0 0 0 0-4 2.87 2.87 0 0 0-4.06 0 1 1 0 0 1-.9.34.41.41 0 0 1-.22-.12.42.42 0 0 1-.1-.29v-.37a6 6 0 1 1 6 6l-.04-.04zM9 3.997a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 7.007a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-7-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"},"child":[]}]})(props);
};
function VscSymbolConstant (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 6h8v1H4V6zm8 3H4v1h8V9z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1 4l1-1h12l1 1v8l-1 1H2l-1-1V4zm1 0v8h12V4H2z"},"child":[]}]})(props);
};
function VscSymbolEnumMember (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7 3l1-1h6l1 1v5l-1 1h-4V8h4V3H8v3H7V3zm2 6V8L8 7H2L1 8v5l1 1h6l1-1V9zM8 8v5H2V8h6zm1.414-1L9 6.586V6h4v1H9.414zM9 4h4v1H9V4zm-2 6H3v1h4v-1z"},"child":[]}]})(props);
};
function VscSymbolEnum (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 2H8L7 3v3h1V3h6v5h-4v1h4l1-1V3l-1-1zM9 6h4v1H9.41L9 6.59V6zM7 7H2L1 8v5l1 1h6l1-1V8L8 7H7zm1 6H2V8h6v5zM3 9h4v1H3V9zm0 2h4v1H3v-1zm6-7h4v1H9V4z"},"child":[]}]})(props);
};
function VscSymbolEvent (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.414 1.56L8.312 1h3.294l.818 1.575L10.236 6h1.781l.72 1.695L5.618 15l-1.602-1.163L6.119 10H4.898L4 8.56l3.414-7zM7.78 9L4.9 14.305 12.018 7H8.312l3.294-5H8.312L4.898 9H7.78z"},"child":[]}]})(props);
};
function VscSymbolField (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.45 4.5l-5-2.5h-.9l-7 3.5-.55.89v4.5l.55.9 5 2.5h.9l7-3.5.55-.9v-4.5l-.55-.89zm-8 8.64l-4.5-2.25V7.17l4.5 2v3.97zm.5-4.8L2.29 6.23l6.66-3.34 4.67 2.34-6.67 3.11zm7 1.55l-6.5 3.25V9.21l6.5-3v3.68z"},"child":[]}]})(props);
};
function VscSymbolFile (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.85 4.44l-3.28-3.3-.35-.14H2.5l-.5.5v13l.5.5h11l.5-.5V4.8l-.15-.36zM13 5h-3V2l3 3zM3 14V2h6v3.5l.5.5H13v8H3z"},"child":[]}]})(props);
};
function VscSymbolInterface (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M11.496 4a3.49 3.49 0 0 0-3.46 3h-3.1a2 2 0 1 0 0 1h3.1a3.5 3.5 0 1 0 3.46-4zm0 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"},"child":[]}]})(props);
};
function VscSymbolKey (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.223 10.933c.326.192.699.29 1.077.282a2.159 2.159 0 0 0 1.754-.842 3.291 3.291 0 0 0 .654-2.113 2.886 2.886 0 0 0-.576-1.877 1.99 1.99 0 0 0-1.634-.733 2.294 2.294 0 0 0-1.523.567V3.475h-.991V11.1h.995v-.344c.076.066.158.125.244.177zM7.85 6.7c.186-.079.388-.113.59-.1a1.08 1.08 0 0 1 .896.428c.257.363.382.802.357 1.245a2.485 2.485 0 0 1-.4 1.484 1.133 1.133 0 0 1-.96.508 1.224 1.224 0 0 1-.976-.417A1.522 1.522 0 0 1 6.975 8.8v-.6a1.722 1.722 0 0 1 .393-1.145c.13-.154.296-.276.482-.355zM3.289 5.675a3.03 3.03 0 0 0-.937.162 2.59 2.59 0 0 0-.8.4l-.1.077v1.2l.423-.359a2.1 2.1 0 0 1 1.366-.572.758.758 0 0 1 .661.282c.15.232.23.503.231.779L2.9 7.825a2.6 2.6 0 0 0-1.378.575 1.65 1.65 0 0 0-.022 2.336 1.737 1.737 0 0 0 1.253.454 1.96 1.96 0 0 0 1.107-.332c.102-.068.197-.145.286-.229v.444h.941V7.715a2.193 2.193 0 0 0-.469-1.5 1.687 1.687 0 0 0-1.329-.54zm.857 3.041c.02.418-.12.829-.391 1.148a1.221 1.221 0 0 1-.955.422.832.832 0 0 1-.608-.2.833.833 0 0 1 0-1.091c.281-.174.6-.277.93-.3l1.02-.148.004.169zm8.313 2.317c.307.13.64.193.973.182.495.012.983-.114 1.41-.365l.123-.075.013-.007V9.615l-.446.32c-.316.224-.696.34-1.084.329A1.3 1.3 0 0 1 12.4 9.8a1.975 1.975 0 0 1-.4-1.312 2.01 2.01 0 0 1 .453-1.381A1.432 1.432 0 0 1 13.6 6.6a1.8 1.8 0 0 1 .971.279l.43.265V5.97l-.17-.073a2.9 2.9 0 0 0-1.17-.247 2.52 2.52 0 0 0-1.929.817 2.9 2.9 0 0 0-.747 2.049c-.028.707.21 1.4.67 1.939.222.249.497.446.804.578z"},"child":[]}]})(props);
};
function VscSymbolKeyword (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 4h-5V3h5v1zm-1 3h-2v1h2V7zm-4 0H1v1h9V7zm2 6H1v1h11v-1zm-5-3H1v1h6v-1zm8 0h-5v1h5v-1zM8 2v3H1V2h7zM7 3H2v1h5V3z"},"child":[]}]})(props);
};
function VscSymbolMethod (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.51 4l-5-3h-1l-5 3-.49.86v6l.49.85 5 3h1l5-3 .49-.85v-6L13.51 4zm-6 9.56l-4.5-2.7V5.7l4.5 2.45v5.41zM3.27 4.7l4.74-2.84 4.74 2.84-4.74 2.59L3.27 4.7zm9.74 6.16l-4.5 2.7V8.15l4.5-2.45v5.16z"},"child":[]}]})(props);
};
function VscSymbolMisc (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 2h8v4c.341.035.677.112 1 .23V1H3v8.48l1-1.75V2zm2.14 8L5 8 4 9.75 3.29 11 1 15h8l-2.29-4-.57-1zm-3.42 4l1.72-3L5 10l.56 1 1.72 3H2.72zm6.836-6.41a3.5 3.5 0 1 1 3.888 5.82 3.5 3.5 0 0 1-3.888-5.82zm.555 4.989a2.5 2.5 0 1 0 2.778-4.157 2.5 2.5 0 0 0-2.778 4.157z"},"child":[]}]})(props);
};
function VscSymbolNamespace (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.199 0-.387-.038-.562-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.504 1.504 0 0 1 .765-.787c.176-.077.362-.115.558-.115H14v-.984h-.09c-.195 0-.38-.04-.556-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.414 1.414 0 0 1-.307-.465l-.001-.002a1.405 1.405 0 0 1-.117-.566c0-.29.006-.58.018-.869a6.19 6.19 0 0 0-.024-.87v-.001a3.542 3.542 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.33 2.33 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .386.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.282 2.282 0 0 0 .738.955 2.282 2.282 0 0 0-.738.955 2.7 2.7 0 0 0-.168.602c-.033.21-.051.423-.055.64-.008.22-.008.442 0 .666.008.224.012.45.012.678a1.47 1.47 0 0 1-.42 1.035 1.466 1.466 0 0 1-.457.319 1.33 1.33 0 0 1-.563.121H10z"},"child":[]}]})(props);
};
function VscSymbolNumeric (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11 1v4h4v1h-4v4h4v1h-4v4h-1v-4H6v4H5v-4H1v-1h4V6H1V5h4V1h1v4h4V1h1zM6 6v4h4V6H6z"},"child":[]}]})(props);
};
function VscSymbolOperator (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.873 1.1c.335.136.602.398.745.73.072.17.109.352.107.537a1.34 1.34 0 0 1-.61 1.135 1.359 1.359 0 0 1-.753.223A1.355 1.355 0 0 1 1 2.362a1.355 1.355 0 0 1 .83-1.256A1.37 1.37 0 0 1 2.873 1.1zm-.298 1.765a.551.551 0 0 0 .332-.5.548.548 0 1 0-.332.5zM6.43 1.109L1.11 6.43l.686.687 5.32-5.32-.686-.687zM11.5 9h1v2.5H15v1h-2.5V15h-1v-2.5H9v-1h2.5V9zm-5.732.525l.707.707L4.707 12l1.768 1.768-.707.707L4 12.707l-1.768 1.768-.707-.707L3.293 12l-1.768-1.768.707-.707L4 11.293l1.768-1.768zm1.35-4.195a1.353 1.353 0 0 0-1.256-.83 1.355 1.355 0 0 0-1.256.83 1.362 1.362 0 0 0 1.257 1.895A1.358 1.358 0 0 0 7.118 5.33zm-.753.745a.553.553 0 0 1-.289.29.547.547 0 0 1-.599-.117.529.529 0 0 1-.117-.173.544.544 0 0 1 .716-.715.565.565 0 0 1 .173.116.549.549 0 0 1 .116.599zM14 3h-4v1h4V3z"},"child":[]}]})(props);
};
function VscSymbolParameter (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11 6h-1v-.5a.5.5 0 0 0-.5-.5H8.479v5.5a.5.5 0 0 0 .5.5h.5v1h-3v-1h.5a.5.5 0 0 0 .5-.5V5H6.5a.5.5 0 0 0-.5.5V6H5V4h6v2zm2.914 2.048l-1.462-1.462.707-.707 1.816 1.816v.707l-1.768 1.767-.707-.707 1.414-1.414zM3.548 9.462L2.086 8 3.5 6.586l-.707-.707-1.768 1.767v.708l1.816 1.815.707-.707z"},"child":[]}]})(props);
};
function VscSymbolProperty (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2.807 14.975a1.75 1.75 0 0 1-1.255-.556 1.684 1.684 0 0 1-.544-1.1A1.72 1.72 0 0 1 1.36 12.1c1.208-1.27 3.587-3.65 5.318-5.345a4.257 4.257 0 0 1 .048-3.078 4.095 4.095 0 0 1 1.665-1.969 4.259 4.259 0 0 1 4.04-.36l.617.268-2.866 2.951 1.255 1.259 2.944-2.877.267.619a4.295 4.295 0 0 1 .04 3.311 4.198 4.198 0 0 1-.923 1.392 4.27 4.27 0 0 1-.743.581 4.217 4.217 0 0 1-3.812.446c-1.098 1.112-3.84 3.872-5.32 5.254a1.63 1.63 0 0 1-1.084.423zm7.938-13.047a3.32 3.32 0 0 0-1.849.557c-.213.13-.412.284-.591.458a3.321 3.321 0 0 0-.657 3.733l.135.297-.233.227c-1.738 1.697-4.269 4.22-5.485 5.504a.805.805 0 0 0 .132 1.05.911.911 0 0 0 .298.22c.1.044.209.069.319.072a.694.694 0 0 0 .45-.181c1.573-1.469 4.612-4.539 5.504-5.44l.23-.232.294.135a3.286 3.286 0 0 0 3.225-.254 3.33 3.33 0 0 0 .591-.464 3.28 3.28 0 0 0 .964-2.358c0-.215-.021-.43-.064-.642L11.43 7.125 8.879 4.578l2.515-2.59a3.286 3.286 0 0 0-.65-.06z"},"child":[]}]})(props);
};
function VscSymbolRuler (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 1L3 2v12l1 1h8l1-1V2l-1-1H4zm0 2V2h8v12H4v-1h2v-1H4v-2h4V9H4V7h2V6H4V4h4V3H4z"},"child":[]}]})(props);
};
function VscSymbolSnippet (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.5 1l-.5.5V13h1V2h11v11h1V1.5l-.5-.5h-12zM2 15v-1h1v1H2zm3-1H4v1h1v-1zm1 0h1v1H6v-1zm3 0H8v1h1v-1zm1 0h1v1h-1v-1zm5 1v-1h-1v1h1zm-3-1h1v1h-1v-1z"},"child":[]}]})(props);
};
function VscSymbolString (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 2L1 3v9l1 1h12l1-1V3l-1-1H2zm0 10V3h12v9H2zm3.356-3.07H6V7.22C6 6.408 5.685 6 5.056 6c-.135 0-.285.024-.45.073a1.444 1.444 0 0 0-.388.167v.665c.237-.203.487-.304.75-.304.261 0 .392.156.392.469l-.6.103c-.506.086-.76.406-.76.961 0 .263.061.473.183.631A.61.61 0 0 0 4.69 9c.29 0 .509-.16.657-.48h.009v.41zm.004-1.355v.193a.75.75 0 0 1-.12.436.368.368 0 0 1-.313.17.276.276 0 0 1-.22-.095.38.38 0 0 1-.08-.248c0-.222.11-.351.332-.389l.4-.067zM7.6 8.626h-.007v.31H7V5h.593v1.677h.008c.146-.31.355-.465.625-.465.248 0 .44.118.573.353.134.236.201.557.201.966 0 .443-.078.798-.235 1.067C8.61 8.866 8.4 9 8.138 9c-.237 0-.416-.125-.537-.374zm-.016-1.121v.272a.78.78 0 0 0 .107.426c.071.113.163.169.274.169.135 0 .24-.072.314-.216.075-.145.113-.35.113-.615 0-.22-.035-.39-.104-.514-.067-.124-.164-.187-.29-.187-.12 0-.219.062-.298.185a.887.887 0 0 0-.116.48zM11.262 9c.321 0 .567-.058.738-.173v-.71a.9.9 0 0 1-.552.207.619.619 0 0 1-.5-.215c-.12-.145-.181-.345-.181-.598 0-.26.063-.464.189-.612a.644.644 0 0 1 .516-.223c.194 0 .37.069.528.207v-.749c-.129-.09-.338-.134-.626-.134-.417 0-.751.14-1.001.422-.249.28-.373.662-.373 1.148 0 .42.116.764.349 1.03.232.267.537.4.913.4z"},"child":[]}]})(props);
};
function VscSymbolStructure (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 2L1 3v3l1 1h12l1-1V3l-1-1H2zm0 1h12v3H2V3zm-1 7l1-1h3l1 1v3l-1 1H2l-1-1v-3zm2 0H2v3h3v-3H3zm7 0l1-1h3l1 1v3l-1 1h-3l-1-1v-3zm2 0h-1v3h3v-3h-2z"},"child":[]}]})(props);
};
function VscSymbolVariable (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2 5h2V4H1.5l-.5.5v8l.5.5H4v-1H2V5zm12.5-1H12v1h2v7h-2v1h2.5l.5-.5v-8l-.5-.5zm-2.74 2.57L12 7v2.51l-.3.45-4.5 2h-.46l-2.5-1.5-.24-.43v-2.5l.3-.46 4.5-2h.46l2.5 1.5zM5 9.71l1.5.9V9.28L5 8.38v1.33zm.58-2.15l1.45.87 3.39-1.5-1.45-.87-3.39 1.5zm1.95 3.17l3.5-1.56v-1.4l-3.5 1.55v1.41z"},"child":[]}]})(props);
};
function VscSyncIgnored (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.468 3.687l-.757-.706a6 6 0 0 1 9.285 4.799L15.19 6.6l.75.76-2.09 2.07-.76-.01L11 7.31l.76-.76 1.236 1.25a5 5 0 0 0-7.528-4.113zm4.55 8.889l.784.73a6 6 0 0 1-8.796-5.04L.78 9.5 0 8.73l2.09-2.07.76.01 2.09 2.12-.76.76-1.167-1.18a5 5 0 0 0 7.005 4.206z"},"child":[]},{"tag":"path","attr":{"d":"M1.123 2.949l.682-.732L13.72 13.328l-.682.732z"},"child":[]}]})(props);
};
function VscSync (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.006 8.267L.78 9.5 0 8.73l2.09-2.07.76.01 2.09 2.12-.76.76-1.167-1.18a5 5 0 0 0 9.4 1.983l.813.597a6 6 0 0 1-11.22-2.683zm10.99-.466L11.76 6.55l-.76.76 2.09 2.11.76.01 2.09-2.07-.75-.76-1.194 1.18a6 6 0 0 0-11.11-2.92l.81.594a5 5 0 0 1 9.3 2.346z"},"child":[]}]})(props);
};
function VscTable (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.5 2h-12l-.5.5v11l.5.5h12l.5-.5v-11l-.5-.5zM2 3h11v1H2V3zm7 4H6V5h3v2zm0 1v2H6V8h3zM2 5h3v2H2V5zm0 3h3v2H2V8zm0 5v-2h3v2H2zm4 0v-2h3v2H6zm7 0h-3v-2h3v2zm0-3h-3V8h3v2zm-3-3V5h3v2h-3z"},"child":[]}]})(props);
};
function VscTag (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.2 2H8.017l-.353.146L1 8.81v.707L6.183 14.7h.707l2.215-2.215A4.48 4.48 0 0 0 15.65 9c.027-.166.044-.332.051-.5a4.505 4.505 0 0 0-2-3.74V2.5l-.5-.5zm-.5 2.259A4.504 4.504 0 0 0 11.2 4a.5.5 0 1 0 0 1 3.5 3.5 0 0 1 1.5.338v2.138L8.775 11.4a.506.506 0 0 0-.217.217l-2.022 2.022-4.475-4.476L8.224 3H12.7v1.259zm1 1.792a3.5 3.5 0 0 1 1 2.449 3.438 3.438 0 0 1-.051.5 3.487 3.487 0 0 1-4.793 2.735l3.698-3.698.146-.354V6.051z"},"child":[]}]})(props);
};
function VscTarget (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z"},"child":[]},{"tag":"path","attr":{"d":"M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"},"child":[]},{"tag":"path","attr":{"d":"M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"},"child":[]}]})(props);
};
function VscTasklist (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.57 6.699l5.693-4.936L8.585 1 3.273 5.596l-1.51-1.832L1 4.442l1.85 2.214.72.043zM15 5H6.824l2.307-2H15v2zM6 7h9v2H6V7zm9 4H6v2h9v-2z"},"child":[]}]})(props);
};
function VscTelescope (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.24 1l.59.24 2.11 4.93-.23.59-3.29 1.41-.59-.24-.17-.41L6.1 9l-.58-.19-.16-.38L2.8 9.49l-.58-.24-.72-1.67.28-.59 2.5-1.06-.18-.41.24-.58L7.9 3.41 7.72 3 8 2.42 11.24 1zM2.5 7.64l.35.85 2.22-.91-.37-.85-2.2.91zm2.74-2.12l1.11 2.45 3-1.28-1.11-2.44-3 1.27zM8.79 3l1.86 4.11 2.29-1.01L11.18 2 8.72 3h.07zM8.5 9.1l3.02 4.9h-1.17l-1.88-3.03v4h-1V9.82L5.58 14h-1.1l1.7-3.9 2.32-1z"},"child":[]}]})(props);
};
function VscTerminalBash (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.655 3.56L8.918.75a1.785 1.785 0 0 0-1.82 0L2.363 3.56a1.889 1.889 0 0 0-.921 1.628v5.624a1.889 1.889 0 0 0 .913 1.627l4.736 2.812a1.785 1.785 0 0 0 1.82 0l4.736-2.812a1.888 1.888 0 0 0 .913-1.627V5.188a1.889 1.889 0 0 0-.904-1.627zm-3.669 8.781v.404a.149.149 0 0 1-.07.124l-.239.137c-.038.02-.07 0-.07-.053v-.396a.78.78 0 0 1-.545.053.073.073 0 0 1-.027-.09l.086-.365a.153.153 0 0 1 .071-.096.048.048 0 0 1 .038 0 .662.662 0 0 0 .497-.063.662.662 0 0 0 .37-.567c0-.206-.112-.292-.384-.293-.344 0-.661-.066-.67-.574A1.47 1.47 0 0 1 9.6 9.437V9.03a.147.147 0 0 1 .07-.126l.231-.147c.038-.02.07 0 .07.054v.409a.754.754 0 0 1 .453-.055.073.073 0 0 1 .03.095l-.081.362a.156.156 0 0 1-.065.09.055.055 0 0 1-.035 0 .6.6 0 0 0-.436.072.549.549 0 0 0-.331.486c0 .185.098.242.425.248.438 0 .627.199.632.639a1.568 1.568 0 0 1-.576 1.185zm2.481-.68a.094.094 0 0 1-.036.092l-1.198.727a.034.034 0 0 1-.04.003.035.035 0 0 1-.016-.037v-.31a.086.086 0 0 1 .055-.076l1.179-.706a.035.035 0 0 1 .056.035v.273zm.827-6.914L8.812 7.515c-.559.331-.97.693-.97 1.367v5.52c0 .404.165.662.413.741a1.465 1.465 0 0 1-.248.025c-.264 0-.522-.072-.748-.207L2.522 12.15a1.558 1.558 0 0 1-.75-1.338V5.188a1.558 1.558 0 0 1 .75-1.34l4.738-2.81a1.46 1.46 0 0 1 1.489 0l4.736 2.812a1.548 1.548 0 0 1 .728 1.083c-.154-.334-.508-.427-.92-.185h.002z"},"child":[]}]})(props);
};
function VscTerminalCmd (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.875 7l2.008 5h-.711l-2.008-5h.711zm-5.125.594c-.276 0-.526.041-.75.125a1.542 1.542 0 0 0-.578.375c-.162.166-.287.37-.375.61a2.364 2.364 0 0 0-.133.827c0 .287.04.547.117.781.078.235.196.433.352.594.156.162.346.29.57.383.224.094.48.138.766.133a2.63 2.63 0 0 0 .992-.195l.125.484a1.998 1.998 0 0 1-.492.148 4.381 4.381 0 0 1-.75.07 2.61 2.61 0 0 1-.914-.156 2.207 2.207 0 0 1-.742-.453 1.878 1.878 0 0 1-.485-.742 3.204 3.204 0 0 1-.18-1.023c0-.365.06-.698.18-1 .12-.302.287-.563.5-.782.214-.218.471-.388.774-.507a2.69 2.69 0 0 1 1-.18c.296 0 .536.023.718.07.183.047.315.094.399.14l-.149.493a1.85 1.85 0 0 0-.406-.14 2.386 2.386 0 0 0-.539-.055zM8 8h1v1H8V8zm0 2h1v1H8v-1z"},"child":[]},{"tag":"path","attr":{"d":"M15.5 1H.5l-.5.5v13l.5.5h15l.5-.5v-13l-.5-.5zM15 14H1V5h14v9zm0-10H1V2h14v2z"},"child":[]}]})(props);
};
function VscTerminalDebian (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.084.029a1.276 1.276 0 0 0-.355.05L6.622.065a9.46 9.46 0 0 1 .514-.048c.075-.005.15-.01.224-.017a1.67 1.67 0 0 1-.276.029zm4.127 7.646c.094-.238.172-.436.16-.762l-.133.282c.135-.41.123-.847.112-1.262-.005-.187-.01-.37-.002-.543l-.054-.015c-.048-1.411-1.268-2.911-2.354-3.419-.936-.432-2.376-.506-3.042-.18a.657.657 0 0 1 .212-.085c.107-.031.197-.058.135-.093-.6.06-.778.171-.973.294a1.92 1.92 0 0 1-.635.273c-.11.106.051.063.181.029.129-.035.226-.06-.004.076a1.7 1.7 0 0 1-.303.05c-.26.025-.492.048-.96.532.026.041.11-.009.168-.044.072-.043.106-.063-.054.137C3.07 2.871 1.78 4.31 1.507 4.787l.143.025c-.1.25-.213.461-.313.649-.136.254-.249.464-.273.667a16.97 16.97 0 0 1-.062.635C.907 7.619.79 8.679 1.12 9.06l-.04.406.052.11c.036.079.071.157.12.23l-.093.008c.22.692.338.704.473.717.137.013.291.028.585.757-.084-.028-.17-.06-.293-.226-.015.127.18.508.41.806l-.097.112a.89.89 0 0 0 .27.311c.023.019.045.036.066.055-.372-.203.1.428.371.79.078.104.14.186.159.218l.073-.132c-.01.19.136.433.41.772l.229-.009c.094.186.438.522.647.538l-.139.181c.254.08.321.135.397.195.08.064.17.136.502.253l-.13-.23c.108.095.192.186.273.272.162.176.31.335.62.481.352.123.536.152.74.184.168.026.35.055.649.14a33.82 33.82 0 0 0-.217-.005c-.506-.012-1.056-.025-1.443-.163-3.016-.817-5.776-4.356-5.574-8-.02-.311-.01-.655 0-.961.012-.422.022-.776-.049-.882l.032-.105c.166-.54.365-1.191.742-1.957L.861 3.92v-.002.001c.012.012.106.107.275-.18.04-.09.079-.182.117-.276.08-.19.16-.383.264-.56l.08-.02c.054-.315.533-.744.93-1.1.19-.171.362-.326.46-.443l.02.138C3.541.977 4.414.611 5.074.334c.152-.063.291-.122.414-.176-.107.118.067.082.311.032.15-.03.325-.067.478-.076-.04.023-.082.044-.122.065-.085.045-.17.088-.25.145.26-.062.373-.044.499-.024.109.018.227.036.456.006-.174.025-.384.094-.35.12.245.029.398-.002.537-.03.174-.034.327-.065.61.03L7.625.275c.235.085.409.137.564.183.313.094.55.165 1.067.439a.58.58 0 0 0 .23-.037c.112-.035.218-.069.477.037.014.025.022.046.03.066.03.08.054.143.456.383.056-.022-.097-.162-.22-.274l-.003-.004c1.01.54 2.108 1.692 2.443 2.924-.188-.347-.162-.171-.134.015.018.124.037.253-.006.235.14.377.255.766.325 1.168l-.023-.085c-.102-.368-.3-1.081-.626-1.555-.012.137-.092.122-.165.108-.105-.019-.196-.036-.058.393.081.119.096.074.109.034.015-.047.027-.086.147.164.002.133.034.266.07.414.022.094.046.195.065.306-.034-.006-.07-.07-.106-.13-.045-.076-.087-.147-.117-.101.076.358.201.545.25.572-.009.02-.021.02-.034.021-.027.002-.056.003-.059.167.022.428.102.39.166.361.02-.009.037-.017.051-.01a1.724 1.724 0 0 1-.083.245c-.086.221-.188.48-.106.816a2.356 2.356 0 0 0-.106-.295 5.896 5.896 0 0 1-.046-.117c-.018.151-.01.256-.003.355.013.166.023.312-.094.62.135-.442.12-.841-.007-.649.03.343-.12.642-.254.908-.111.222-.211.42-.184.602l-.161-.222c-.238.344-.22.417-.202.489.015.06.03.12-.105.339.051-.09.041-.112.031-.133-.01-.024-.021-.046.053-.158-.05.003-.17.12-.316.265-.123.121-.265.261-.402.368-1.172.94-2.571 1.062-3.926.556.006-.031-.006-.066-.097-.128-1.148-.88-1.827-1.628-1.591-3.36.068-.051.117-.193.175-.362.09-.263.203-.59.448-.745.245-.541.979-1.04 1.764-1.052.8-.044 1.476.427 1.816.872-.618-.576-1.63-.751-2.493-.324-.882.396-1.405 1.368-1.329 2.336.01-.016.021-.023.03-.03.02-.015.037-.027.048-.108-.027 1.88 2.026 3.258 3.504 2.563l.018.039c.397-.109.497-.205.633-.335.07-.067.148-.142.28-.233a.441.441 0 0 1-.075.085c-.068.067-.143.14-.05.142.166-.043.634-.465.947-.746l.133-.119c.062-.134.051-.177.04-.221-.012-.052-.025-.104.076-.3l.229-.114c.03-.088.062-.168.092-.243zM6.612 10.06a.018.018 0 0 0-.005.016.114.114 0 0 0 .005-.016zm-.005.016c.008.069.269.268.465.369.516.19 1.1.198 1.559.181-.993.415-2.889-.422-3.509-1.532.057.012.168.14.303.297.204.234.462.532.678.605-.213-.17-.377-.387-.53-.61.288.33.637.6 1.019.779a.102.102 0 0 1 .01-.077l.005-.012zM6.752.219a6.612 6.612 0 0 1-.075-.013c.472.014.437.045.283.08.018-.029-.09-.047-.208-.067zM9.63 6.732c.032-.477-.094-.326-.136-.144.019.01.036.059.052.107.028.08.054.158.084.037zm-.211.664a1.68 1.68 0 0 1-.314.703c.006-.061-.038-.074-.083-.086-.092-.026-.183-.052.176-.504a1.113 1.113 0 0 1-.126.242c-.112.184-.21.344.126.133l.033-.06a1.43 1.43 0 0 0 .188-.428zm-1.34 1.247c-.347-.053-.662-.186-.397-.19.221.02.44.02.656-.033a3.544 3.544 0 0 1-.26.223zM6.958.285l-.1.02.094-.008.006-.012zM4.79 8.818l-.038.186c.047.064.092.13.136.195.12.175.237.348.4.483a4.73 4.73 0 0 0-.214-.368c-.08-.13-.169-.272-.285-.496zm.226-.319c.052.108.104.213.185.302l.082.24-.038-.063c-.1-.166-.2-.333-.252-.524l.023.045zm7.474-1.282l-.039.098a4.717 4.717 0 0 1-.462 1.474c.261-.49.43-1.028.501-1.572zM.436 3.426zm.002.022c.008.037.043.028.075.02.06-.015.114-.03-.004.236-.074.052-.119.087-.144.106l-.027.02a.05.05 0 0 1 .008-.017.597.597 0 0 0 .092-.365zM.118 4.76a2.92 2.92 0 0 1-.106.436.588.588 0 0 0-.005-.154c-.013-.105-.025-.197.135-.402a4.009 4.009 0 0 0-.023.12z"},"child":[]}]})(props);
};
function VscTerminalLinux (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.281 11.156a.84.84 0 0 1 .375.297c.084.125.143.276.18.453.02.104.044.2.07.29a1.772 1.772 0 0 0 .219.476c.047.073.11.153.188.242.067.073.127.167.18.281a.793.793 0 0 1 .077.328.49.49 0 0 1-.093.305.944.944 0 0 1-.235.219c-.12.083-.245.156-.375.219-.13.062-.26.127-.39.195a3.624 3.624 0 0 0-.555.328c-.156.115-.313.26-.469.438a2.815 2.815 0 0 1-.625.523 1.471 1.471 0 0 1-.383.172c-.13.036-.26.06-.39.07-.302 0-.552-.052-.75-.156-.198-.104-.37-.294-.516-.57-.042-.079-.083-.128-.125-.149a.774.774 0 0 0-.203-.055L8.67 15c-.26-.02-.525-.031-.796-.031a4.28 4.28 0 0 0-.672.054c-.229.037-.456.081-.68.133-.046.01-.093.05-.14.117a1.7 1.7 0 0 1-.196.227 1.106 1.106 0 0 1-.335.219 1.475 1.475 0 0 1-.555.101c-.172 0-.357-.018-.555-.054a1.82 1.82 0 0 1-.531-.18 3.578 3.578 0 0 0-.953-.328c-.313-.057-.643-.11-.992-.156a3.392 3.392 0 0 1-.344-.063.774.774 0 0 1-.29-.133.705.705 0 0 1-.194-.219.78.78 0 0 1-.079-.351c0-.162.021-.318.063-.469.042-.15.065-.31.07-.476 0-.115-.008-.227-.023-.336a3.53 3.53 0 0 1-.032-.352c0-.265.063-.46.188-.586.125-.125.307-.224.547-.297a.99.99 0 0 0 .297-.148 2.27 2.27 0 0 0 .234-.203 1.86 1.86 0 0 0 .203-.242c.063-.089.133-.178.211-.266a.114.114 0 0 0 .024-.07c0-.063-.003-.123-.008-.18l-.016-.188c0-.354.055-.71.164-1.07.11-.36.253-.71.43-1.055a9.08 9.08 0 0 1 .594-.992c.218-.317.435-.612.648-.883a4.35 4.35 0 0 0 .68-1.203c.15-.416.229-.87.234-1.36 0-.207-.01-.413-.031-.616a6.122 6.122 0 0 1-.031-.625c0-.417.047-.792.14-1.125.094-.334.24-.62.438-.86s.456-.419.773-.539C7.474.075 7.854.01 8.296 0c.527 0 .946.104 1.259.313.312.208.552.481.718.82.167.338.274.716.32 1.133.048.416.074.838.079 1.265v.133c0 .214.002.404.008.57a2.527 2.527 0 0 0 .226.977c.073.161.182.336.328.523.25.329.506.66.766.993.26.333.497.677.71 1.03.214.355.389.725.524 1.11.136.386.206.802.211 1.25a3.3 3.3 0 0 1-.164 1.04zm-6.554-8.14c.072 0 .132.018.18.054a.357.357 0 0 1 .109.149.85.85 0 0 1 .054.187c.01.063.016.128.016.196a.282.282 0 0 1-.024.125.27.27 0 0 1-.07.086l-.094.078a.796.796 0 0 0-.093.093.428.428 0 0 1-.149.141 2.129 2.129 0 0 0-.18.117 1.31 1.31 0 0 0-.156.133.264.264 0 0 0-.07.195c0 .047.023.086.07.117a.704.704 0 0 1 .266.305c.052.12.11.237.172.352.062.114.143.21.242.289.099.078.253.117.46.117h.048c.208-.01.406-.065.594-.164.187-.099.375-.203.562-.313a.633.633 0 0 1 .102-.046.37.37 0 0 0 .101-.055l.57-.445a.926.926 0 0 0 .024-.102 2.75 2.75 0 0 0 .016-.11.236.236 0 0 0-.04-.14.4.4 0 0 0-.093-.094.34.34 0 0 0-.133-.054.909.909 0 0 1-.14-.04 1.083 1.083 0 0 1-.352-.14 1.457 1.457 0 0 0-.344-.156c-.02-.006-.036-.021-.047-.047a.983.983 0 0 1-.031-.094.23.23 0 0 1-.008-.102.126.126 0 0 0-.008-.078c0-.062.005-.127.016-.195a.551.551 0 0 1 .07-.195.417.417 0 0 1 .125-.14.411.411 0 0 1 .203-.056c.162 0 .279.06.352.18.073.12.112.25.117.39a.397.397 0 0 1-.039.18.379.379 0 0 0-.04.172c0 .042.014.07.04.086a.26.26 0 0 0 .102.031c.12 0 .197-.028.234-.085a.533.533 0 0 0 .062-.258c0-.12-.01-.253-.03-.399a1.32 1.32 0 0 0-.126-.406.969.969 0 0 0-.242-.313.574.574 0 0 0-.383-.124c-.27 0-.466.067-.586.203-.12.135-.182.338-.187.609 0 .078.005.156.015.234.01.079.016.157.016.235 0 .026-.003.039-.008.039a.218.218 0 0 1-.047-.016 4.263 4.263 0 0 1-.093-.039.774.774 0 0 0-.118-.039.514.514 0 0 0-.203-.008 1.007 1.007 0 0 1-.125.008c-.073 0-.11-.013-.11-.039 0-.078-.004-.177-.015-.297-.01-.12-.036-.24-.078-.36a.995.995 0 0 0-.156-.296c-.063-.078-.156-.12-.281-.125a.323.323 0 0 0-.227.086.905.905 0 0 0-.164.203.64.64 0 0 0-.086.266 5.4 5.4 0 0 1-.031.25 1.459 1.459 0 0 0 .07.406c.026.083.055.156.086.219.031.062.068.093.11.093.025 0 .06-.018.101-.054.042-.037.063-.07.063-.102 0-.016-.008-.026-.024-.031a.147.147 0 0 0-.047-.008c-.036 0-.068-.018-.094-.055a.468.468 0 0 1-.062-.125 5.144 5.144 0 0 1-.047-.148.564.564 0 0 1 .055-.398c.047-.084.133-.128.258-.133zM5.023 15.18c.125 0 .248-.01.368-.032a.97.97 0 0 0 .336-.125.614.614 0 0 0 .234-.242.943.943 0 0 0 .094-.375.816.816 0 0 0-.047-.273.963.963 0 0 0-.133-.25 2.763 2.763 0 0 0-.203-.281 2.763 2.763 0 0 1-.203-.282 62.93 62.93 0 0 1-.29-.43c-.093-.14-.187-.288-.28-.445a8.124 8.124 0 0 1-.235-.406 2.646 2.646 0 0 0-.266-.398 1.203 1.203 0 0 0-.218-.211.469.469 0 0 0-.29-.094.436.436 0 0 0-.296.11 2.26 2.26 0 0 0-.258.265 3.241 3.241 0 0 1-.297.305c-.11.099-.25.177-.422.234a.744.744 0 0 0-.312.172c-.073.073-.11.185-.11.336 0 .104.008.208.024.312.015.104.026.209.031.313 0 .14-.02.273-.063.398a1.157 1.157 0 0 0-.062.367c0 .141.05.24.148.297.1.058.211.097.336.117.157.027.305.047.446.063.14.016.278.04.414.07.135.032.27.065.406.102.135.036.279.094.43.172.03.015.078.034.14.054l.211.07c.078.027.151.048.219.063a.741.741 0 0 0 .148.024zm2.86-.938c.146 0 .302-.015.469-.047a3.54 3.54 0 0 0 .976-.336 2.59 2.59 0 0 0 .406-.257.222.222 0 0 0 .032-.047.305.305 0 0 0 .023-.063v-.008c.031-.114.057-.24.078-.375a8.63 8.63 0 0 0 .055-.414 8.98 8.98 0 0 1 .055-.414c.02-.135.039-.268.054-.398.021-.14.047-.276.078-.406.032-.13.073-.253.125-.368a1.03 1.03 0 0 1 .211-.304 1.54 1.54 0 0 1 .344-.25v-.016l-.008-.023a.29.29 0 0 1 .047-.149 1.4 1.4 0 0 1 .117-.164.582.582 0 0 1 .149-.133.946.946 0 0 1 .164-.078 9.837 9.837 0 0 0-.102-.375 4.938 4.938 0 0 1-.094-.375 7.126 7.126 0 0 0-.093-.476 2.954 2.954 0 0 0-.11-.36 1.317 1.317 0 0 0-.18-.32c-.077-.104-.174-.23-.288-.375a1.189 1.189 0 0 1-.118-.156.555.555 0 0 1-.046-.196 2.206 2.206 0 0 0-.047-.203 9.48 9.48 0 0 0-.242-.75 2.91 2.91 0 0 0-.172-.383 3.87 3.87 0 0 0-.172-.289c-.052-.078-.107-.117-.164-.117-.125 0-.274.05-.446.149-.171.099-.354.208-.546.328-.193.12-.38.232-.563.336-.182.104-.346.153-.492.148a.7.7 0 0 1-.43-.148 2.236 2.236 0 0 1-.36-.344c-.109-.13-.2-.242-.273-.336-.073-.094-.127-.146-.164-.156-.041 0-.065.031-.07.093a2.56 2.56 0 0 0-.008.211v.133c0 .032-.005.052-.016.063-.057.12-.12.237-.187.351-.068.115-.135.232-.203.352a1.611 1.611 0 0 0-.219.758c0 .078.005.156.016.234.01.078.036.154.078.227l-.016.03a1.31 1.31 0 0 1-.133.157 1.072 1.072 0 0 0-.132.164 2.796 2.796 0 0 0-.407.93c-.078.333-.12.672-.125 1.015 0 .089.006.178.016.266.01.089.016.177.016.266a.526.526 0 0 1-.008.086.525.525 0 0 0-.008.086.75.75 0 0 1 .313.109c.12.068.25.154.39.258.14.104.274.224.399.36.125.135.244.267.359.398.115.13.198.26.25.39.052.13.086.237.101.32a.444.444 0 0 1-.125.329.955.955 0 0 1-.312.203c.089.156.198.289.328.398.13.11.271.198.422.266.151.068.315.117.492.148.177.032.35.047.516.047zm3.133 1.11c.109 0 .216-.016.32-.047a1.65 1.65 0 0 0 .445-.203c.136-.089.26-.198.375-.329a3.07 3.07 0 0 1 .977-.75l.258-.117a2.18 2.18 0 0 0 .257-.133.962.962 0 0 0 .165-.132.256.256 0 0 0 .078-.188.295.295 0 0 0-.024-.117.58.58 0 0 0-.07-.117 5.136 5.136 0 0 1-.203-.305 1.978 1.978 0 0 1-.149-.297l-.125-.312a2.558 2.558 0 0 1-.11-.352.28.28 0 0 0-.054-.101.53.53 0 0 0-.46-.235.533.533 0 0 0-.266.07l-.266.149a7.335 7.335 0 0 1-.281.148.656.656 0 0 1-.297.07.411.411 0 0 1-.258-.077.636.636 0 0 1-.172-.211 2.218 2.218 0 0 1-.117-.258l-.094-.258a1.26 1.26 0 0 1-.14.188.666.666 0 0 0-.125.203c-.068.156-.11.33-.125.523-.026.302-.06.596-.102.883a4.7 4.7 0 0 1-.21.86 1.914 1.914 0 0 0-.063.273 2.88 2.88 0 0 0-.032.289c0 .255.079.466.235.633.156.166.367.25.633.25z"},"child":[]}]})(props);
};
function VscTerminalPowershell (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.5 1.007l12.999.17.43.501-1.82 12.872-.57.489-13-.17-.43-.502L1.93 1.495l.57-.488zM1.18 13.885l11.998.157 1.68-11.882L2.86 2.003 1.18 13.885zm5.791-3.49l-.14.991 5 .066.14-.99-5-.066zm1.71-2.457l-3.663-2.93-.692.796 2.636 2.112L3.739 9.95l.465.812L8.68 7.938z"},"child":[]}]})(props);
};
function VscTerminalTmux (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M13.5 1h-12l-.5.5v13l.5.5h12l.5-.5v-13l-.5-.5zM7 7.5V13H2V2h5v5.5zm6 5.5H8V8h5v5zm0-6H8V2h5v5z"},"child":[]}]})(props);
};
function VscTerminalUbuntu (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.1365 3.06502C13.1365 4.20551 12.1841 5.13005 11.0093 5.13005C9.83451 5.13005 8.88214 4.20551 8.88214 3.06502C8.88214 1.92454 9.83451 1 11.0093 1C12.1841 1 13.1365 1.92454 13.1365 3.06502Z"},"child":[]},{"tag":"path","attr":{"d":"M4.25439 7.59961C4.25439 8.74009 3.30201 9.66464 2.12719 9.66464C0.952378 9.66464 0 8.74009 0 7.59961C0 6.45913 0.952378 5.53459 2.12719 5.53459C3.30201 5.53459 4.25439 6.45913 4.25439 7.59961Z"},"child":[]},{"tag":"path","attr":{"d":"M6.93725 12.9266C5.40046 12.6063 4.11546 11.6538 3.39482 10.3052C2.83046 10.5581 2.18796 10.634 1.57151 10.5244C2.44843 12.6063 4.29779 14.115 6.5639 14.587C7.0588 14.6881 7.57106 14.7387 8.07464 14.7387C7.68394 14.2414 7.46687 13.6346 7.44951 13.0108L7.38203 13.0005C7.23751 12.9786 7.08738 12.9557 6.93725 12.9266Z"},"child":[]},{"tag":"path","attr":{"d":"M12.6503 12.935C12.6503 14.0755 11.6979 15 10.5231 15C9.34827 15 8.3959 14.0755 8.3959 12.935C8.3959 11.7945 9.34827 10.87 10.5231 10.87C11.6979 10.87 12.6503 11.7945 12.6503 12.935Z"},"child":[]},{"tag":"path","attr":{"d":"M13.4924 12.1763C14.1523 11.3672 14.6212 10.4063 14.8469 9.38645C15.2376 7.608 14.8729 5.74526 13.8397 4.23653C13.5966 4.80125 13.1799 5.27326 12.6416 5.60198C13.2146 6.65556 13.3883 7.86929 13.1365 9.04088C13.0062 9.61403 12.7892 10.1535 12.4766 10.6423C12.9715 11.03 13.3275 11.5695 13.4924 12.1763Z"},"child":[]},{"tag":"path","attr":{"d":"M2.03825 4.6288C2.01224 4.63083 1.9872 4.63278 1.96215 4.63278C3.29057 2.35703 5.89529 1.01688 8.56948 1.21916C8.28296 1.57317 8.08326 1.98617 7.98776 2.43289C7.96171 2.5846 7.93566 2.73633 7.92698 2.89647C6.25127 2.93018 4.7058 3.73091 3.74205 5.07107C3.44685 4.89406 3.11692 4.76763 2.76962 4.69178C2.56124 4.64963 2.34418 4.62435 2.12712 4.62435C2.09556 4.62435 2.06634 4.62662 2.03825 4.6288Z"},"child":[]}]})(props);
};
function VscTerminal (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 3L3 1.5H21L22.5 3V21L21 22.5H3L1.5 21V3ZM3 3V21H21V3H3Z"},"child":[]},{"tag":"path","attr":{"d":"M7.06078 7.49988L6.00012 8.56054L10.2427 12.8032L6 17.0459L7.06066 18.1066L12 13.1673V12.4391L7.06078 7.49988Z"},"child":[]},{"tag":"rect","attr":{"x":"12","y":"16.5","width":"6","height":"1.5"},"child":[]}]})(props);
};
function VscTextSize (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M3.36 7L1 13h1.34l.51-1.47h2.26L5.64 13H7L4.65 7H3.36zm-.15 3.53l.78-2.14.78 2.14H3.21zM11.82 4h-1.6L7 13h1.56l.75-2.29h3.36l.77 2.29H15l-3.18-9zM9.67 9.5l1.18-3.59c.059-.185.1-.376.12-.57.027.192.064.382.11.57l1.25 3.59H9.67z"},"child":[]}]})(props);
};
function VscThreeBars (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14 5H2V3h12v2zm0 4H2V7h12v2zM2 13h12v-2H2v2z"},"child":[]}]})(props);
};
function VscThumbsdownFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.46 14.11a1.46 1.46 0 0 1-.81-.25 1.38 1.38 0 0 1-.45-1.69L5.17 10H2.38a1.36 1.36 0 0 1-1.16-.61 1.35 1.35 0 0 1-.09-1.32C1.8 6.62 3 4 3.4 2.9A1.38 1.38 0 0 1 4.69 2h8.93A1.4 1.4 0 0 1 15 3.4v3.51a1.38 1.38 0 0 1-1.38 1.38h-1.38L6.4 13.75a1.41 1.41 0 0 1-.94.36z"},"child":[]}]})(props);
};
function VscThumbsdown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.46 14.11a1.46 1.46 0 0 1-.81-.25 1.38 1.38 0 0 1-.45-1.69L5.17 10H2.38a1.36 1.36 0 0 1-1.16-.61 1.35 1.35 0 0 1-.09-1.32C1.8 6.62 3 4 3.4 2.9A1.38 1.38 0 0 1 4.69 2h8.93A1.4 1.4 0 0 1 15 3.4v3.51a1.38 1.38 0 0 1-1.38 1.38h-1.38L6.4 13.75a1.41 1.41 0 0 1-.94.36zM4.69 3a.39.39 0 0 0-.36.25C3.93 4.34 2.86 6.7 2 8.49a.39.39 0 0 0 0 .36.37.37 0 0 0 .38.15h3.3l.52.68v.46l-1.09 2.44a.37.37 0 0 0 .13.46.38.38 0 0 0 .48 0l6.06-5.59.47-.13h1.37a.38.38 0 0 0 .38-.41V3.4a.4.4 0 0 0-.38-.4H4.69z"},"child":[]}]})(props);
};
function VscThumbsupFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.54 2c.289.001.57.088.81.25a1.38 1.38 0 0 1 .45 1.69l-.97 2.17h2.79a1.36 1.36 0 0 1 1.16.61 1.35 1.35 0 0 1 .09 1.32c-.67 1.45-1.87 4.07-2.27 5.17a1.38 1.38 0 0 1-1.29.9H2.38A1.4 1.4 0 0 1 1 12.71V9.2a1.38 1.38 0 0 1 1.38-1.38h1.38L9.6 2.36a1.41 1.41 0 0 1 .94-.36z"},"child":[]}]})(props);
};
function VscThumbsup (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.54 2c.289.001.57.088.81.25a1.38 1.38 0 0 1 .45 1.69l-.97 2.17h2.79a1.36 1.36 0 0 1 1.16.61 1.35 1.35 0 0 1 .09 1.32c-.67 1.45-1.87 4.07-2.27 5.17a1.38 1.38 0 0 1-1.29.9H2.38A1.4 1.4 0 0 1 1 12.71V9.2a1.38 1.38 0 0 1 1.38-1.38h1.38L9.6 2.36a1.41 1.41 0 0 1 .94-.36zm.77 11.11a.39.39 0 0 0 .36-.25c.4-1.09 1.47-3.45 2.33-5.24a.39.39 0 0 0 0-.36.37.37 0 0 0-.38-.15h-3.3l-.52-.68v-.46l1.09-2.44a.37.37 0 0 0-.13-.46.38.38 0 0 0-.48 0L4.22 8.66l-.47.13H2.38A.38.38 0 0 0 2 9.2v3.51a.4.4 0 0 0 .38.4h8.93z"},"child":[]}]})(props);
};
function VscTools (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.773 3.485l-.78-.184-2.108 2.096-1.194-1.216 2.056-2.157-.18-.792a4.42 4.42 0 0 0-1.347-.228 3.64 3.64 0 0 0-1.457.28 3.824 3.824 0 0 0-1.186.84 3.736 3.736 0 0 0-.875 1.265 3.938 3.938 0 0 0 0 2.966 335.341 335.341 0 0 0-6.173 6.234c-.21.275-.31.618-.284.963a1.403 1.403 0 0 0 .464.967c.124.135.272.247.437.328.17.075.353.118.538.127.316-.006.619-.126.854-.337 1.548-1.457 4.514-4.45 6.199-6.204.457.194.948.294 1.444.293a3.736 3.736 0 0 0 2.677-1.133 3.885 3.885 0 0 0 1.111-2.73 4.211 4.211 0 0 0-.196-1.378zM2.933 13.928a.31.31 0 0 1-.135.07.437.437 0 0 1-.149 0 .346.346 0 0 1-.144-.057.336.336 0 0 1-.114-.11c-.14-.143-.271-.415-.14-.568 1.37-1.457 4.191-4.305 5.955-6.046.1.132.21.258.328.376.118.123.245.237.38.341-1.706 1.75-4.488 4.564-5.98 5.994zm11.118-9.065c.002.765-.296 1.5-.832 2.048a2.861 2.861 0 0 1-4.007 0 2.992 2.992 0 0 1-.635-3.137A2.748 2.748 0 0 1 10.14 2.18a2.76 2.76 0 0 1 1.072-.214h.254L9.649 3.839v.696l1.895 1.886h.66l1.847-1.816v.258zM3.24 6.688h1.531l.705.717.678-.674-.665-.678V6.01l.057-1.649-.22-.437-2.86-1.882-.591.066-.831.849-.066.599 1.838 2.918.424.215zm-.945-3.632L4.609 4.58 4.57 5.703H3.494L2.002 3.341l.293-.285zm7.105 6.96l.674-.673 3.106 3.185a1.479 1.479 0 0 1 0 2.039 1.404 1.404 0 0 1-1.549.315 1.31 1.31 0 0 1-.437-.315l-3.142-3.203.679-.678 3.132 3.194a.402.402 0 0 0 .153.105.477.477 0 0 0 .359 0 .403.403 0 0 0 .153-.105.436.436 0 0 0 .1-.153.525.525 0 0 0 .036-.184.547.547 0 0 0-.035-.184.436.436 0 0 0-.1-.153L9.4 10.016z"},"child":[]}]})(props);
};
function VscTrash (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z"},"child":[]}]})(props);
};
function VscTriangleDown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M2 5.56L2.413 5h11.194l.393.54L8.373 11h-.827L2 5.56z"},"child":[]}]})(props);
};
function VscTriangleLeft (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.44 2l.56.413v11.194l-.54.393L5 8.373v-.827L10.44 2z"},"child":[]}]})(props);
};
function VscTriangleRight (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.56 14L5 13.587V2.393L5.54 2 11 7.627v.827L5.56 14z"},"child":[]}]})(props);
};
function VscTriangleUp (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14 10.44l-.413.56H2.393L2 10.46 7.627 5h.827L14 10.44z"},"child":[]}]})(props);
};
function VscTwitter (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M15 3.784a5.63 5.63 0 0 1-.65.803 6.058 6.058 0 0 1-.786.68 5.442 5.442 0 0 1 .014.377c0 .574-.061 1.141-.184 1.702a8.467 8.467 0 0 1-.534 1.627 8.444 8.444 0 0 1-1.264 2.04 7.768 7.768 0 0 1-1.72 1.521 7.835 7.835 0 0 1-2.095.95 8.524 8.524 0 0 1-2.379.329 8.178 8.178 0 0 1-2.293-.325A7.921 7.921 0 0 1 1 12.52a5.762 5.762 0 0 0 4.252-1.19 2.842 2.842 0 0 1-2.273-1.19 2.878 2.878 0 0 1-.407-.8c.091.014.181.026.27.035a2.797 2.797 0 0 0 1.022-.089 2.808 2.808 0 0 1-.926-.362 2.942 2.942 0 0 1-.728-.633 2.839 2.839 0 0 1-.65-1.822v-.033c.402.227.837.348 1.306.362a2.943 2.943 0 0 1-.936-1.04 2.955 2.955 0 0 1-.253-.649 2.945 2.945 0 0 1 .007-1.453c.063-.243.161-.474.294-.693.364.451.77.856 1.216 1.213a8.215 8.215 0 0 0 3.008 1.525 7.965 7.965 0 0 0 1.695.263 2.15 2.15 0 0 1-.058-.325 3.265 3.265 0 0 1-.017-.331c0-.397.075-.77.226-1.118a2.892 2.892 0 0 1 1.528-1.528 2.79 2.79 0 0 1 1.117-.225 2.846 2.846 0 0 1 2.099.909 5.7 5.7 0 0 0 1.818-.698 2.815 2.815 0 0 1-1.258 1.586A5.704 5.704 0 0 0 15 3.785z"},"child":[]}]})(props);
};
function VscTypeHierarchySub (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.5 11h-1.729L8.438 6H9.5l.5-.5v-4L9.5 1h-4l-.5.5v4l.5.5h1.062l-3.333 5H1.5l-.5.5v3l.5.5h3l.5-.5v-3l-.5-.5h-.068L7.5 6.4l3.068 4.6H10.5l-.5.5v3l.5.5h3l.5-.5v-3l-.5-.5zM6 5V2h3v3H6zm-2 7v2H2v-2h2zm9 2h-2v-2h2v2z"},"child":[]}]})(props);
};
function VscTypeHierarchySuper (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.5 1h-3l-.5.5v3l.5.5h.068L7.5 9.6 4.432 5H4.5l.5-.5v-3L4.5 1h-3l-.5.5v3l.5.5h1.729l3.333 5H5.5l-.5.5v4l.5.5h4l.5-.5v-4l-.5-.5H8.438l3.333-5H13.5l.5-.5v-3l-.5-.5zM2 4V2h2v2H2zm7 7v3H6v-3h3zm4-7h-2V2h2v2z"},"child":[]}]})(props);
};
function VscTypeHierarchy (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M13.5 12h-1.793L10 10.293V6.5L9.5 6H8V4h.5l.5-.5v-2L8.5 1h-2l-.5.5v2l.5.5H7v2H5.5l-.5.5v3.793L3.293 12H1.5l-.5.5v2l.5.5h2l.5-.5v-1.793L5.707 11h3.586L11 12.707V14.5l.5.5h2l.5-.5v-2l-.5-.5zM7 2h1v1H7V2zM6 7h3v3H6V7zm-3 7H2v-1h1v1zm10 0h-1v-1h1v1z"},"child":[]}]})(props);
};
function VscUnfold (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.53 6.51v-4l-1 1-.71-.71L7.65 1h.71l1.84 1.83-.71.7-1-1v3.98h-.96zm0 2.98v4l-1-1-.71.71L7.65 15h.71l1.84-1.83-.71-.7-1 1V9.49h-.96zM13.73 4L14 5.02l-3.68 2.93L14 10.98 13.73 12h-4.2v-1h3L9.55 8.57H6.54L3.45 11h3.08v1H2.27L2 10.98l3.68-2.92L2 5.02 2.27 4h4.26v1H3.45l3 2.42h3.01L12.53 5h-3V4h4.2z"},"child":[]}]})(props);
};
function VscUngroupByRefType (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M2.9 1L5 3.1l-.8.7L3 2.6V7H2V2.5L.8 3.8l-.7-.7L2.2 1h.7zM3 13.4V9H2v4.4L.8 12.2l-.7.7L2.2 15h.7L5 12.9l-.7-.7L3 13.4zM8.5 7h-2L6 6.5v-2l.5-.5h2l.5.5v2l-.5.5zM7 6h1V5H7v1zm7.5 1h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM12 6h2V4h-2v2zm-3.5 6h-2l-.5-.5v-2l.5-.5h2l.5.5v2l-.5.5zM7 11h1v-1H7v1zm7.5 2h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM12 12h2v-2h-2v2zm-1-2H9v1h2v-1zm0-5H9v1h2V5z"},"child":[]}]})(props);
};
function VscUnlock (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5 7V5a3 3 0 0 1 5.83-1h1.044A4.002 4.002 0 0 0 4 5v2H3L2 8v6l1 1h10l1-1V8l-1-1H5zm6 1h2v6H3V8h8z"},"child":[]}]})(props);
};
function VscUnmute (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 4.83h2.79L8.15 1l.85.35v13l-.85.33-3.86-3.85H1.5l-.5-.5v-5l.5-.5zM4.85 10L8 13.14V2.56L4.85 5.68l-.35.15H2v4h2.5l.35.17zM15 7.83a6.97 6.97 0 0 1-1.578 4.428l-.712-.71A5.975 5.975 0 0 0 14 7.83c0-1.4-.48-2.689-1.284-3.71l.712-.71A6.971 6.971 0 0 1 15 7.83zm-2 0a4.978 4.978 0 0 1-1.002 3.004l-.716-.716A3.982 3.982 0 0 0 12 7.83a3.98 3.98 0 0 0-.713-2.28l.716-.716c.626.835.997 1.872.997 2.996zm-2 0c0 .574-.16 1.11-.44 1.566l-.739-.738a1.993 1.993 0 0 0 .005-1.647l.739-.739c.276.454.435.988.435 1.558z"},"child":[]}]})(props);
};
function VscUnverified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.67 14.72h.71L10.1 13h2.4l.5-.5v-2.42l1.74-1.72v-.71l-1.71-1.72V3.49l-.5-.49H10.1L8.38 1.29h-.71L6 3H3.53L3 3.5v2.43L1.31 7.65v.71L3 10.08v2.42l.53.5H6l1.67 1.72zM6.16 12H4V9.87l-.12-.35L2.37 8l1.48-1.51.15-.35V4h2.16l.36-.14L8 2.35l1.54 1.51.35.14H12v2.14l.17.35L13.69 8l-1.55 1.52-.14.35V12H9.89l-.38.15L8 13.66l-1.48-1.52-.36-.14zm1.443-5.859a.962.962 0 0 0-.128.291c-.03.109-.05.215-.062.317l-.005.043h-.895l.003-.051c.018-.326.089-.615.212-.864.052-.108.117-.214.193-.318.081-.106.18-.2.294-.28.119-.084.255-.15.409-.2A1.71 1.71 0 0 1 8.165 5c.28 0 .523.046.726.14.2.089.366.21.494.363.127.152.22.326.279.52.058.194.087.394.087.599 0 .191-.032.371-.098.54-.064.164-.143.32-.238.466-.094.143-.197.28-.31.41-.11.129-.211.252-.304.372a2.47 2.47 0 0 0-.23.34.653.653 0 0 0-.088.318v.48h-.888v-.539c0-.168.031-.323.094-.464a2.15 2.15 0 0 1 .24-.401c.096-.127.2-.25.308-.368a4.74 4.74 0 0 0 .299-.356c.093-.12.17-.246.228-.377a.984.984 0 0 0 .09-.421 1.04 1.04 0 0 0-.047-.318v-.001a.638.638 0 0 0-.13-.243.558.558 0 0 0-.216-.158H8.46a.689.689 0 0 0-.294-.059.643.643 0 0 0-.339.083.742.742 0 0 0-.223.215zM8.5 11h-.888v-.888H8.5V11z"},"child":[]}]})(props);
};
function VscVariableGroup (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M5.387 11.523a.402.402 0 0 1 .593-.367c.058.031.11.065.157.102.047.036.088.07.125.101a.177.177 0 0 0 .117.047c.052 0 .12-.04.203-.117.083-.078.175-.182.273-.313.1-.13.201-.268.305-.414.104-.146.2-.294.29-.445l.226-.39c.062-.11.107-.199.133-.266a15.33 15.33 0 0 0-.133-.524 15.384 15.384 0 0 1-.133-.523 3.72 3.72 0 0 0-.133-.422 1.04 1.04 0 0 0-.187-.313.656.656 0 0 0-.266-.187 1.374 1.374 0 0 0-.375-.07 1.628 1.628 0 0 0-.328.031v-.195L7.69 7a2.345 2.345 0 0 1 .461.734c.052.13.097.263.133.399.037.135.076.283.117.445.078-.115.175-.26.29-.438a4.49 4.49 0 0 1 .398-.523c.15-.172.31-.315.476-.43A1.02 1.02 0 0 1 10.089 7c.13 0 .247.034.351.101.105.068.157.175.157.32 0 .282-.141.423-.422.423a.608.608 0 0 1-.29-.07.608.608 0 0 0-.288-.071c-.1 0-.203.05-.313.148a2.3 2.3 0 0 0-.312.352 9.5 9.5 0 0 0-.485.734l.446 1.852a1.56 1.56 0 0 0 .093.344.669.669 0 0 0 .094.171.184.184 0 0 0 .125.079.37.37 0 0 0 .211-.086 2.14 2.14 0 0 0 .43-.47c.052-.077.093-.15.125-.218l.187.094a2.025 2.025 0 0 1-.219.367 3.775 3.775 0 0 1-.351.422 3.38 3.38 0 0 1-.406.36c-.141.104-.269.153-.383.148a.397.397 0 0 1-.281-.102 1.491 1.491 0 0 1-.204-.234 1.599 1.599 0 0 1-.132-.36 8.263 8.263 0 0 1-.118-.507 34.16 34.16 0 0 1-.101-.532 2.212 2.212 0 0 0-.11-.414l-.203.375a4.489 4.489 0 0 1-.28.453c-.11.157-.222.316-.337.477a2.46 2.46 0 0 1-.375.422c-.135.12-.265.221-.39.305A.66.66 0 0 1 5.91 12a.539.539 0 0 1-.36-.133.454.454 0 0 1-.163-.344zm6.11.477c.28-.36.496-.748.648-1.164a3.87 3.87 0 0 0 .226-1.32c0-.47-.075-.912-.226-1.329A4.57 4.57 0 0 0 11.495 7h.734a3.77 3.77 0 0 1 .922 2.515c0 .474-.073.917-.218 1.329-.146.411-.38.796-.704 1.156h-.734zM3.77 12a3.373 3.373 0 0 1-.704-1.149 3.97 3.97 0 0 1-.218-1.336c0-.953.307-1.791.922-2.515h.726a4.132 4.132 0 0 0-.64 1.18 4.205 4.205 0 0 0-.227 1.335A3.929 3.929 0 0 0 4.496 12H3.77z"},"child":[]},{"tag":"path","attr":{"d":"M15.5 1H.5l-.5.5v13l.5.5h15l.5-.5v-13l-.5-.5zM15 14H1V5h14v9zm0-10H1V2h14v2z"},"child":[]}]})(props);
};
function VscVerifiedFilled (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.38 14.72H7.67L6 13H3.53L3 12.5V10.08L1.31 8.36004V7.65004L3 5.93004V3.50004L3.53 3.00004H6L7.67 1.29004H8.38L10.1 3.00004H12.53L13.03 3.49004V5.93004L14.74 7.65004V8.36004L13 10.08V12.5L12.5 13H10.1L8.38 14.72ZM6.73004 10.4799H7.44004L11.21 6.71L10.5 6L7.09004 9.41991L5.71 8.03984L5 8.74984L6.73004 10.4799Z"},"child":[]}]})(props);
};
function VscVerified (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.67 14.72h.71L10.1 13h2.4l.5-.5v-2.42l1.74-1.72v-.71l-1.71-1.72V3.49l-.5-.49H10.1L8.38 1.29h-.71L6 3H3.53L3 3.5v2.43L1.31 7.65v.71L3 10.08v2.42l.53.5H6l1.67 1.72zM6.16 12H4V9.87l-.12-.35L2.37 8l1.48-1.51.15-.35V4h2.16l.36-.14L8 2.35l1.54 1.51.35.14H12v2.14l.17.35L13.69 8l-1.55 1.52-.14.35V12H9.89l-.38.15L8 13.66l-1.48-1.52-.36-.14zm.57-1.52h.71l3.77-3.77L10.5 6 7.09 9.42 5.71 8.04 5 8.75l1.73 1.73z"},"child":[]}]})(props);
};
function VscVersions (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M8 3L7 4v8l1 1h6l1-1V4l-1-1H8zm6 9H8V4h6v8zM5 9V5h1V4H4.5l-.5.5v7l.5.5H6v-1H5V9zM2 8V6h1V5H1.5l-.5.5v5l.5.5H3v-1H2V8z"},"child":[]}]})(props);
};
function VscVmActive (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10l.5-.5z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.778 8.674a4 4 0 1 1 4.444 6.652 4 4 0 0 1-4.444-6.652zm2.13 4.99l2.387-3.182-.8-.6-2.077 2.769-1.301-1.041-.625.78 1.704 1.364.713-.09z"},"child":[]}]})(props);
};
function VscVmConnect (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10l.5-.5z"},"child":[]},{"tag":"path","attr":{"d":"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6.001A3 3 0 0 1 12 15z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.133 11.435l1.436 1.436.431-.431-1.004-1.005L14 10.431l-.431-.43-1.436 1.434zm-1.129 1.067L10 11.498l.431-.431 1.436 1.435-1.436 1.436-.431-.431 1.004-1.005z"},"child":[]}]})(props);
};
function VscVmOutline (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10l.5-.5z"},"child":[]},{"tag":"path","attr":{"d":"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 7a3 3 0 1 1 0-6.001A3 3 0 0 1 12 15z"},"child":[]}]})(props);
};
function VscVmRunning (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M1.5 2h13l.5.5v5.503a5.006 5.006 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10l.5-.5z"},"child":[]},{"tag":"path","attr":{"d":"M12 8c.367 0 .721.047 1.063.14.34.094.658.23.953.407.294.177.563.385.808.625.245.24.455.509.63.808a4.03 4.03 0 0 1 .405 3.082c-.093.342-.229.66-.406.954a4.382 4.382 0 0 1-.625.808c-.24.245-.509.455-.808.63a4.029 4.029 0 0 1-3.082.405 3.784 3.784 0 0 1-.954-.406 4.382 4.382 0 0 1-.808-.625 3.808 3.808 0 0 1-.63-.808 4.027 4.027 0 0 1-.405-3.082c.093-.342.229-.66.406-.954.177-.294.385-.563.625-.808.24-.245.509-.455.808-.63A4.028 4.028 0 0 1 12 8zm2 3.988L11 10v4l3-2.012z"},"child":[]}]})(props);
};
function VscVm (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M14.5 2h-13l-.5.5v10l.5.5H7v1H4v1h8v-1H9v-1h5.5l.5-.5v-10l-.5-.5zM14 12H2V3h12v9z"},"child":[]}]})(props);
};
function VscVr (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M4 3H12C13.6569 3 15 4.34315 15 6V10C15 11.6569 13.6569 13 12 13H11.6056C11.0133 13 10.4343 12.8247 9.94145 12.4962L9.1094 11.9415C8.4376 11.4936 7.5624 11.4936 6.8906 11.9415L6.05855 12.4962C5.56575 12.8247 4.98672 13 4.39445 13H4C2.34315 13 1 11.6569 1 10V6C1 4.34315 2.34315 3 4 3ZM4 4C2.89543 4 2 4.89543 2 6V10C2 11.1046 2.89543 12 4 12H4.39445C4.7893 12 5.17531 11.8831 5.50385 11.6641L6.3359 11.1094C7.3436 10.4376 8.6564 10.4376 9.6641 11.1094L10.4962 11.6641C10.8247 11.8831 11.2107 12 11.6056 12H12C13.1046 12 14 11.1046 14 10V6C14 4.89543 13.1046 4 12 4H4Z"},"child":[]},{"tag":"path","attr":{"d":"M0 7H1V10H0V7Z"},"child":[]},{"tag":"path","attr":{"d":"M15 7H16V10H15V7Z"},"child":[]},{"tag":"path","attr":{"d":"M6.5 8C6.77614 8 7 8.22386 7 8.5C7 8.77614 6.77614 9 6.5 9H4C3.72386 9 3.5 8.77614 3.5 8.5C3.5 8.22386 3.72386 8 4 8H6.5Z"},"child":[]},{"tag":"path","attr":{"d":"M12 8C12.2761 8 12.5 8.22386 12.5 8.5C12.5 8.77614 12.2761 9 12 9H9.5C9.22386 9 9 8.77614 9 8.5C9 8.22386 9.22386 8 9.5 8H12Z"},"child":[]}]})(props);
};
function VscVscodeInsiders (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M9.7851 1.38057L5.56484 5.25075L7.68844 6.87108L10 5.10733V2C10 1.76607 9.91968 1.5509 9.7851 1.38057Z"},"child":[]},{"tag":"path","attr":{"d":"M10 9.89268L2.58433 4.23442C2.37657 4.0759 2.08597 4.08889 1.89301 4.26532L1.17719 4.91984C1.08223 5.00667 1.02543 5.11898 1.00681 5.23629C0.979153 5.41056 1.03574 5.59585 1.17661 5.72504L9.7851 13.6194C9.91968 13.4491 10 13.2339 10 13V9.89268Z"},"child":[]},{"tag":"path","attr":{"d":"M10.7532 1.0368C10.9105 1.32251 11 1.65081 11 2V13C11 13.3492 10.9105 13.6775 10.7532 13.9632C10.7906 13.9515 10.8274 13.9369 10.8634 13.9195L13.5399 12.625C13.8211 12.4889 14 12.2028 14 11.8889V3.11109C14 2.79721 13.8212 2.5111 13.5399 2.37507L10.8634 1.08048C10.8274 1.06306 10.7906 1.04852 10.7532 1.0368Z"},"child":[]},{"tag":"path","attr":{"d":"M1.17661 9.27496L2.37233 8.17842L4.00854 9.6789L2.58433 10.7656C2.37657 10.9241 2.08597 10.9111 1.89301 10.7347L1.17719 10.0802C0.941168 9.86437 0.940898 9.49112 1.17661 9.27496Z"},"child":[]}]})(props);
};
function VscVscode (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M10.8634 13.9195C10.6568 14.0195 10.4233 14.0246 10.2185 13.9444C10.1162 13.9044 10.021 13.843 9.93997 13.7614L4.81616 9.06268L2.58433 10.7656C2.37657 10.9241 2.08597 10.9111 1.89301 10.7347L1.17719 10.0802C0.941168 9.86437 0.940898 9.49112 1.17661 9.27496L3.11213 7.5L1.17661 5.72504C0.940898 5.50888 0.941168 5.13563 1.17719 4.91982L1.89301 4.2653C2.08597 4.08887 2.37657 4.07588 2.58433 4.2344L4.81616 5.93732L9.93997 1.23855C9.97037 1.20797 10.0028 1.18023 10.0368 1.15538C10.2748 0.981429 10.5922 0.949298 10.8634 1.08048L13.5399 2.37507C13.8212 2.5111 14 2.79721 14 3.11109V8H10.752V4.53356L6.86419 7.5L10.752 10.4664V8H14V11.8889C14 12.2028 13.8211 12.4889 13.5399 12.625L10.8634 13.9195Z"},"child":[]}]})(props);
};
function VscWand (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M4.38 5h1V4h1V3h-1V2h-1v1h-1v1h1v1zm8 4h-1v1h-1v1h1v1h1v-1h1v-1h-1V9zM14 2V1h-1v1h-1v1h1v1h1V3h1V2h-1zm-2.947 2.442a1.49 1.49 0 0 0-2.12 0l-7.49 7.49a1.49 1.49 0 0 0 0 2.12c.59.59 1.54.59 2.12 0l7.49-7.49c.58-.58.58-1.53 0-2.12zm-8.2 8.9c-.2.2-.51.2-.71 0-.2-.2-.2-.51 0-.71l6.46-6.46.71.71-6.46 6.46zm7.49-7.49l-.32.32-.71-.71.32-.32c.2-.2.51-.2.71 0 .19.2.19.52 0 .71z"},"child":[]}]})(props);
};
function VscWarning (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M7.56 1h.88l6.54 12.26-.44.74H1.44L1 13.26 7.56 1zM8 2.28L2.28 13H13.7L8 2.28zM8.625 12v-1h-1.25v1h1.25zm-1.25-2V6h1.25v4h-1.25z"},"child":[]}]})(props);
};
function VscWatch (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M7.5 9h2V8H8V5.5H7v3l.5.5z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M5.5 3.669A4.998 4.998 0 0 0 3 8a4.998 4.998 0 0 0 2.5 4.331V14.5l.5.5h4l.5-.5v-2.169A4.998 4.998 0 0 0 13 8a4.998 4.998 0 0 0-2.5-4.331V1.5L10 1H6l-.5.5v2.169zM12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"},"child":[]}]})(props);
};
function VscWhitespace (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M12 2V1H6.5a3.5 3.5 0 0 0 0 7H8v5H7v1h5v-1h-1V2h1zM8 7H6.5a2.5 2.5 0 1 1 0-5H8v5zm2 6H9V2h1v11z"},"child":[]}]})(props);
};
function VscWholeWord (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M0 11H1V13H15V11H16V14H15H1H0V11Z"},"child":[]},{"tag":"path","attr":{"d":"M6.84048 11H5.95963V10.1406H5.93814C5.555 10.7995 4.99104 11.1289 4.24625 11.1289C3.69839 11.1289 3.26871 10.9839 2.95718 10.6938C2.64924 10.4038 2.49527 10.0189 2.49527 9.53906C2.49527 8.51139 3.10041 7.91341 4.3107 7.74512L5.95963 7.51416C5.95963 6.57959 5.58186 6.1123 4.82632 6.1123C4.16389 6.1123 3.56591 6.33789 3.03238 6.78906V5.88672C3.57307 5.54297 4.19612 5.37109 4.90152 5.37109C6.19416 5.37109 6.84048 6.05501 6.84048 7.42285V11ZM5.95963 8.21777L4.63297 8.40039C4.22476 8.45768 3.91682 8.55973 3.70914 8.70654C3.50145 8.84977 3.39761 9.10579 3.39761 9.47461C3.39761 9.74316 3.4925 9.96338 3.68228 10.1353C3.87564 10.3035 4.13166 10.3877 4.45035 10.3877C4.8872 10.3877 5.24706 10.2355 5.52994 9.93115C5.8164 9.62321 5.95963 9.2347 5.95963 8.76562V8.21777Z"},"child":[]},{"tag":"path","attr":{"d":"M9.3475 10.2051H9.32601V11H8.44515V2.85742H9.32601V6.4668H9.3475C9.78076 5.73633 10.4146 5.37109 11.2489 5.37109C11.9543 5.37109 12.5057 5.61816 12.9032 6.1123C13.3042 6.60286 13.5047 7.26172 13.5047 8.08887C13.5047 9.00911 13.2809 9.74674 12.8333 10.3018C12.3857 10.8532 11.7734 11.1289 10.9964 11.1289C10.2695 11.1289 9.71989 10.821 9.3475 10.2051ZM9.32601 7.98682V8.75488C9.32601 9.20964 9.47282 9.59635 9.76644 9.91504C10.0636 10.2301 10.4396 10.3877 10.8944 10.3877C11.4279 10.3877 11.8451 10.1836 12.1458 9.77539C12.4502 9.36719 12.6024 8.79964 12.6024 8.07275C12.6024 7.46045 12.4609 6.98063 12.1781 6.6333C11.8952 6.28597 11.512 6.1123 11.0286 6.1123C10.5166 6.1123 10.1048 6.29134 9.7933 6.64941C9.48177 7.00391 9.32601 7.44971 9.32601 7.98682Z"},"child":[]}]})(props);
};
function VscWindow (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M14.5 2h-13l-.5.5v11l.5.5h13l.5-.5v-11l-.5-.5zM14 13H2V6h12v7zm0-8H2V3h12v2z"},"child":[]}]})(props);
};
function VscWordWrap (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M3.868 3.449a1.21 1.21 0 0 0-.473-.329c-.274-.111-.623-.15-1.055-.076a3.5 3.5 0 0 0-.71.208c-.082.035-.16.077-.235.125l-.043.03v1.056l.168-.139c.15-.124.326-.225.527-.303.196-.074.4-.113.604-.113.188 0 .33.051.431.157.087.095.137.248.147.456l-.962.144c-.219.03-.41.086-.57.166a1.245 1.245 0 0 0-.398.311c-.103.125-.181.27-.229.426-.097.33-.093.68.011 1.008a1.096 1.096 0 0 0 .638.67c.155.063.328.093.528.093a1.25 1.25 0 0 0 .978-.441v.345h1.007V4.65c0-.255-.03-.484-.089-.681a1.423 1.423 0 0 0-.275-.52zm-.636 1.896v.236c0 .119-.018.231-.055.341a.745.745 0 0 1-.377.447.694.694 0 0 1-.512.027.454.454 0 0 1-.156-.094.389.389 0 0 1-.094-.139.474.474 0 0 1-.035-.186c0-.077.01-.147.024-.212a.33.33 0 0 1 .078-.141.436.436 0 0 1 .161-.109 1.3 1.3 0 0 1 .305-.073l.661-.097zm5.051-1.067a2.253 2.253 0 0 0-.244-.656 1.354 1.354 0 0 0-.436-.459 1.165 1.165 0 0 0-.642-.173 1.136 1.136 0 0 0-.69.223 1.33 1.33 0 0 0-.264.266V1H5.09v6.224h.918v-.281c.123.152.287.266.472.328.098.032.208.047.33.047.255 0 .483-.06.677-.177.192-.115.355-.278.486-.486a2.29 2.29 0 0 0 .293-.718 3.87 3.87 0 0 0 .096-.886 3.714 3.714 0 0 0-.078-.773zm-.86.758c0 .232-.02.439-.06.613-.036.172-.09.315-.159.424a.639.639 0 0 1-.233.237.582.582 0 0 1-.565.014.683.683 0 0 1-.21-.183.925.925 0 0 1-.142-.283A1.187 1.187 0 0 1 6 5.5v-.517c0-.164.02-.314.06-.447.036-.132.087-.242.156-.336a.668.668 0 0 1 .228-.208.584.584 0 0 1 .29-.071.554.554 0 0 1 .496.279c.063.099.108.214.143.354.031.143.05.306.05.482zM2.407 9.9a.913.913 0 0 1 .316-.239c.218-.1.547-.105.766-.018.104.042.204.1.32.184l.33.26V8.945l-.097-.062a1.932 1.932 0 0 0-.905-.215c-.308 0-.593.057-.846.168-.25.11-.467.27-.647.475-.18.21-.318.453-.403.717-.09.272-.137.57-.137.895 0 .289.043.561.13.808.086.249.211.471.373.652.161.185.361.333.597.441.232.104.493.155.778.155.233 0 .434-.028.613-.084.165-.05.322-.123.466-.217l.078-.061v-.889l-.2.095a.4.4 0 0 1-.076.026c-.05.017-.099.035-.128.049-.036.023-.227.09-.227.09-.06.024-.14.043-.218.059a.977.977 0 0 1-.599-.057.827.827 0 0 1-.306-.225 1.088 1.088 0 0 1-.205-.376 1.728 1.728 0 0 1-.076-.529c0-.21.028-.399.083-.56.054-.158.13-.294.22-.4zM14 6h-4V5h4.5l.5.5v6l-.5.5H7.879l2.07 2.071-.706.707-2.89-2.889v-.707l2.89-2.89L9.95 9l-2 2H14V6z"},"child":[]}]})(props);
};
function VscWorkspaceTrusted (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.069 0c.262 0 .52.017.76.057a4.1 4.1 0 0 1 .697.154c.228.069.451.155.674.263.217.103.44.229.663.366.377.24.748.434 1.126.589a7.537 7.537 0 0 0 2.331.525c.406.029.823.046 1.257.046v4c0 .76-.097 1.48-.291 2.166a8.996 8.996 0 0 1-.789 1.943 10.312 10.312 0 0 1-1.188 1.725 15.091 15.091 0 0 1-1.492 1.532 17.57 17.57 0 0 1-1.703 1.325c-.594.412-1.194.795-1.794 1.143l-.24.143-.24-.143a27.093 27.093 0 0 1-1.806-1.143 15.58 15.58 0 0 1-1.703-1.325 15.082 15.082 0 0 1-1.491-1.532 10.947 10.947 0 0 1-1.194-1.725 9.753 9.753 0 0 1-.789-1.943A7.897 7.897 0 0 1 .571 6V2c.435 0 .852-.017 1.258-.046a8.16 8.16 0 0 0 1.188-.171c.383-.086.766-.2 1.143-.354A6.563 6.563 0 0 0 5.28.846C5.72.56 6.166.349 6.606.21A4.79 4.79 0 0 1 8.069 0zm6.502 2.983a9.566 9.566 0 0 1-2.234-.377 7.96 7.96 0 0 1-2.046-.943A4.263 4.263 0 0 0 9.23 1.16 3.885 3.885 0 0 0 8.074.994a3.99 3.99 0 0 0-1.165.166 3.946 3.946 0 0 0-1.058.503A7.926 7.926 0 0 1 3.8 2.61c-.709.206-1.451.332-2.229.378v3.017c0 .663.086 1.297.258 1.908a8.58 8.58 0 0 0 .72 1.743 9.604 9.604 0 0 0 1.08 1.572c.417.491.862.948 1.342 1.382.48.435.983.835 1.509 1.206.531.372 1.063.709 1.594 1.017a22.397 22.397 0 0 0 1.589-1.017 15.389 15.389 0 0 0 1.514-1.206c.48-.434.926-.891 1.343-1.382a9.596 9.596 0 0 0 1.08-1.572 8.258 8.258 0 0 0 .709-1.743 6.814 6.814 0 0 0 .262-1.908V2.983z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M11.797 4.709l-.44-.378-.406.035-4.36 5.148-1.485-2.12-.4-.068-.463.331-.069.4 1.909 2.726.217.12.457.028.234-.102 4.835-5.715-.029-.405z"},"child":[]}]})(props);
};
function VscWorkspaceUnknown (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.067 0c.263 0 .52.017.76.057a4.1 4.1 0 0 1 .697.154c.229.069.452.155.675.263.217.103.44.229.662.366a7.2 7.2 0 0 0 1.126.589 7.534 7.534 0 0 0 2.332.525c.405.029.822.046 1.257.046v4c0 .76-.097 1.48-.292 2.166a8.996 8.996 0 0 1-.788 1.943 10.306 10.306 0 0 1-1.189 1.725 15.082 15.082 0 0 1-1.491 1.532 17.57 17.57 0 0 1-1.703 1.325c-.594.412-1.194.795-1.794 1.143l-.24.143-.24-.143a27.088 27.088 0 0 1-1.806-1.143 15.579 15.579 0 0 1-1.703-1.325 15.08 15.08 0 0 1-1.491-1.532 10.948 10.948 0 0 1-1.195-1.725 9.753 9.753 0 0 1-.788-1.943A7.897 7.897 0 0 1 .57 6V2c.434 0 .851-.017 1.257-.046a8.16 8.16 0 0 0 1.189-.171c.383-.086.765-.2 1.143-.354a6.563 6.563 0 0 0 1.12-.583C5.719.56 6.164.349 6.604.21A4.79 4.79 0 0 1 8.067 0zm6.503 2.983a9.567 9.567 0 0 1-2.234-.377 7.96 7.96 0 0 1-2.046-.943 4.264 4.264 0 0 0-1.063-.503A3.885 3.885 0 0 0 8.073.994a3.99 3.99 0 0 0-1.166.166 3.946 3.946 0 0 0-1.057.503 7.927 7.927 0 0 1-2.051.948c-.709.206-1.452.332-2.229.378v3.017c0 .663.086 1.297.257 1.908a8.58 8.58 0 0 0 .72 1.743 9.604 9.604 0 0 0 1.08 1.572c.417.491.863.948 1.343 1.382.48.435.983.835 1.509 1.206.531.372 1.062.709 1.594 1.017a22.4 22.4 0 0 0 1.588-1.017 15.384 15.384 0 0 0 1.515-1.206c.48-.434.925-.891 1.343-1.382a9.609 9.609 0 0 0 1.08-1.572 8.269 8.269 0 0 0 .708-1.743 6.814 6.814 0 0 0 .263-1.908V2.983z"},"child":[]},{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M9.433 4.72c.171.171.314.377.411.606.103.228.155.48.149.754a1.6 1.6 0 0 1-.114.64 2.24 2.24 0 0 1-.292.48 2.787 2.787 0 0 1-.354.383 4.52 4.52 0 0 0-.337.32 1.421 1.421 0 0 0-.24.32.7.7 0 0 0-.086.348v.36l-.131.138h-.715l-.143-.143V8.57c0-.24.04-.45.12-.634.075-.177.166-.343.28-.486a3.42 3.42 0 0 1 .366-.382c.12-.109.229-.212.332-.32.097-.103.182-.212.245-.326a.707.707 0 0 0 .086-.354.966.966 0 0 0-.074-.36.972.972 0 0 0-.2-.298.94.94 0 0 0-1.32 0 .88.88 0 0 0-.2.298.829.829 0 0 0-.075.36L7 6.21h-.715l-.131-.137c0-.263.046-.514.148-.748.103-.229.24-.435.412-.606.177-.177.383-.32.611-.417a1.883 1.883 0 0 1 1.503 0c.229.103.434.24.606.417zM7.57 9.646l.143-.143h.714l.143.143v.714l-.143.143h-.714l-.143-.143v-.714z"},"child":[]}]})(props);
};
function VscWorkspaceUntrusted (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"d":"M8.067 0c.263 0 .52.017.76.057a4.1 4.1 0 0 1 .697.154c.229.069.452.155.675.263.217.103.44.229.662.366a7.2 7.2 0 0 0 1.126.589 7.534 7.534 0 0 0 2.332.525c.405.029.822.046 1.257.046v4c0 .76-.097 1.48-.292 2.166a8.996 8.996 0 0 1-.788 1.943 10.306 10.306 0 0 1-1.189 1.725 15.082 15.082 0 0 1-1.491 1.532 17.57 17.57 0 0 1-1.703 1.325c-.594.412-1.194.795-1.794 1.143l-.24.143-.24-.143a27.088 27.088 0 0 1-1.806-1.143 15.579 15.579 0 0 1-1.703-1.325 15.08 15.08 0 0 1-1.491-1.532 10.948 10.948 0 0 1-1.195-1.725 9.753 9.753 0 0 1-.788-1.943A7.897 7.897 0 0 1 .57 6V2c.434 0 .851-.017 1.257-.046a8.16 8.16 0 0 0 1.189-.171c.383-.086.765-.2 1.143-.354a6.563 6.563 0 0 0 1.12-.583C5.719.56 6.164.349 6.604.21A4.79 4.79 0 0 1 8.067 0zm6.503 2.983a9.567 9.567 0 0 1-2.234-.377 7.96 7.96 0 0 1-2.046-.943 4.264 4.264 0 0 0-1.063-.503A3.885 3.885 0 0 0 8.073.994a3.99 3.99 0 0 0-1.166.166 3.946 3.946 0 0 0-1.057.503 7.927 7.927 0 0 1-2.051.948c-.709.206-1.452.332-2.229.378v3.017c0 .663.086 1.297.257 1.908a8.58 8.58 0 0 0 .72 1.743 9.604 9.604 0 0 0 1.08 1.572c.417.491.863.948 1.343 1.382.48.435.983.835 1.509 1.206.531.372 1.062.709 1.594 1.017a22.4 22.4 0 0 0 1.588-1.017 15.384 15.384 0 0 0 1.515-1.206c.48-.434.925-.891 1.343-1.382a9.609 9.609 0 0 0 1.08-1.572 8.269 8.269 0 0 0 .708-1.743 6.814 6.814 0 0 0 .263-1.908V2.983z"},"child":[]},{"tag":"path","attr":{"d":"M10.787 5.446l-.4-.406h-.206L8.2 7.023 6.216 5.04h-.2l-.406.406v.2l1.983 1.983L5.61 9.61v.206l.406.4h.2l1.983-1.983 1.982 1.983h.206l.4-.4V9.61L8.804 7.63l1.983-1.983v-.2z"},"child":[]}]})(props);
};
function VscZoomIn (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.027 6.149a5.52 5.52 0 0 1-1.27 3.908l4.26 4.26-.7.71-4.26-4.27a5.52 5.52 0 1 1 1.97-4.608zm-5.45 4.888a4.51 4.51 0 0 0 3.18-1.32l-.04.02a4.51 4.51 0 0 0 1.36-3.2 4.5 4.5 0 1 0-4.5 4.5zm2.44-4v-1h-2v-2h-1v2h-2v1h2v2h1v-2h2z"},"child":[]}]})(props);
};
function VscZoomOut (props) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_index_mjs__["a" /* GenIcon */])({"tag":"svg","attr":{"viewBox":"0 0 16 16","fill":"currentColor"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","clipRule":"evenodd","d":"M12.027 6.149a5.52 5.52 0 0 1-1.27 3.908l4.26 4.26-.7.71-4.26-4.27a5.52 5.52 0 1 1 1.97-4.608zm-5.45 4.888a4.51 4.51 0 0 0 3.18-1.32l-.04.02a4.51 4.51 0 0 0 1.36-3.2 4.5 4.5 0 1 0-4.5 4.5zm-2.54-4.98h5v1h-5v-1z"},"child":[]}]})(props);
};


/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconsManifest_mjs__ = __webpack_require__(257);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconBase_mjs__ = __webpack_require__(258);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__iconBase_mjs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconContext_mjs__ = __webpack_require__(4);
/* unused harmony namespace reexport */




/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export IconsManifest */
var IconsManifest = [
  {
    "id": "ci",
    "name": "Circum Icons",
    "projectUrl": "https://circumicons.com/",
    "license": "MPL-2.0 license",
    "licenseUrl": "https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE"
  },
  {
    "id": "fa",
    "name": "Font Awesome 5",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "fa6",
    "name": "Font Awesome 6",
    "projectUrl": "https://fontawesome.com/",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "io",
    "name": "Ionicons 4",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "io5",
    "name": "Ionicons 5",
    "projectUrl": "https://ionicons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
  },
  {
    "id": "md",
    "name": "Material Design icons",
    "projectUrl": "http://google.github.io/material-design-icons/",
    "license": "Apache License Version 2.0",
    "licenseUrl": "https://github.com/google/material-design-icons/blob/master/LICENSE"
  },
  {
    "id": "ti",
    "name": "Typicons",
    "projectUrl": "http://s-ings.com/typicons/",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  {
    "id": "go",
    "name": "Github Octicons icons",
    "projectUrl": "https://octicons.github.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/primer/octicons/blob/master/LICENSE"
  },
  {
    "id": "fi",
    "name": "Feather",
    "projectUrl": "https://feathericons.com/",
    "license": "MIT",
    "licenseUrl": "https://github.com/feathericons/feather/blob/master/LICENSE"
  },
  {
    "id": "lu",
    "name": "Lucide",
    "projectUrl": "https://lucide.dev/",
    "license": "ISC",
    "licenseUrl": "https://github.com/lucide-icons/lucide/blob/main/LICENSE"
  },
  {
    "id": "gi",
    "name": "Game Icons",
    "projectUrl": "https://game-icons.net/",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
  },
  {
    "id": "wi",
    "name": "Weather Icons",
    "projectUrl": "https://erikflowers.github.io/weather-icons/",
    "license": "SIL OFL 1.1",
    "licenseUrl": "http://scripts.sil.org/OFL"
  },
  {
    "id": "di",
    "name": "Devicons",
    "projectUrl": "https://vorillaz.github.io/devicons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ai",
    "name": "Ant Design Icons",
    "projectUrl": "https://github.com/ant-design/ant-design-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "bs",
    "name": "Bootstrap Icons",
    "projectUrl": "https://github.com/twbs/icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "ri",
    "name": "Remix Icon",
    "projectUrl": "https://github.com/Remix-Design/RemixIcon",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "fc",
    "name": "Flat Color Icons",
    "projectUrl": "https://github.com/icons8/flat-color-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "gr",
    "name": "Grommet-Icons",
    "projectUrl": "https://github.com/grommet/grommet-icons",
    "license": "Apache License Version 2.0",
    "licenseUrl": "http://www.apache.org/licenses/"
  },
  {
    "id": "hi",
    "name": "Heroicons",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "hi2",
    "name": "Heroicons 2",
    "projectUrl": "https://github.com/tailwindlabs/heroicons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "si",
    "name": "Simple Icons",
    "projectUrl": "https://simpleicons.org/",
    "license": "CC0 1.0 Universal",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  {
    "id": "sl",
    "name": "Simple Line Icons",
    "projectUrl": "https://thesabbir.github.io/simple-line-icons/",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "im",
    "name": "IcoMoon Free",
    "projectUrl": "https://github.com/Keyamoon/IcoMoon-Free",
    "license": "CC BY 4.0 License",
    "licenseUrl": "https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt"
  },
  {
    "id": "bi",
    "name": "BoxIcons",
    "projectUrl": "https://github.com/atisawd/boxicons",
    "license": "MIT",
    "licenseUrl": "https://github.com/atisawd/boxicons/blob/master/LICENSE"
  },
  {
    "id": "cg",
    "name": "css.gg",
    "projectUrl": "https://github.com/astrit/css.gg",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "vsc",
    "name": "VS Code Icons",
    "projectUrl": "https://github.com/microsoft/vscode-codicons",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  {
    "id": "tb",
    "name": "Tabler Icons",
    "projectUrl": "https://github.com/tabler/tabler-icons",
    "license": "MIT",
    "licenseUrl": "https://opensource.org/licenses/MIT"
  },
  {
    "id": "tfi",
    "name": "Themify Icons",
    "projectUrl": "https://github.com/lykmapipo/themify-icons",
    "license": "MIT",
    "licenseUrl": "https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE"
  },
  {
    "id": "rx",
    "name": "Radix Icons",
    "projectUrl": "https://icons.radix-ui.com",
    "license": "MIT",
    "licenseUrl": "https://github.com/radix-ui/icons/blob/master/LICENSE"
  },
  {
    "id": "pi",
    "name": "Phosphor Icons",
    "projectUrl": "https://github.com/phosphor-icons/core",
    "license": "MIT",
    "licenseUrl": "https://github.com/phosphor-icons/core/blob/main/LICENSE"
  },
  {
    "id": "lia",
    "name": "Icons8 Line Awesome",
    "projectUrl": "https://icons8.com/line-awesome",
    "license": "MIT",
    "licenseUrl": "https://github.com/icons8/line-awesome/blob/master/LICENSE.md"
  }
]

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = GenIcon;
/* unused harmony export IconBase */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconContext_mjs__ = __webpack_require__(4);
var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("title", null, title), props.children);
  };
  return __WEBPACK_IMPORTED_MODULE_1__iconContext_mjs__["b" /* IconContext */] !== undefined ? /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__iconContext_mjs__["b" /* IconContext */].Consumer, null, conf => elem(conf)) : elem(__WEBPACK_IMPORTED_MODULE_1__iconContext_mjs__["a" /* DefaultContext */]);
}

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Skills;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heroicons_react_solid__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(5);
// src/components/Skills.js
function Skills(){return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("section",{id:"skills"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"container px-5 py-10 mx-auto"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"text-center mb-20"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__heroicons_react_solid__["c" /* ChipIcon */],{className:"w-10 inline-block mb-4"}),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("h1",{className:"sm:text-4xl text-3xl font-medium title-font text-white mb-4"},"Skills & Technologies"),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("p",{className:"text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"},"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sit ipsa delectus eum quo voluptas aspernatur accusantium distinctio possimus est.")),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2"},__WEBPACK_IMPORTED_MODULE_2__data__["b" /* skills */].map(function(skill){return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{key:skill,className:"p-2 sm:w-1/2 w-full"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div",{className:"bg-gray-800 rounded flex p-4 h-full items-center"},__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__heroicons_react_solid__["b" /* BadgeCheckIcon */],{className:"text-green-400 w-6 h-6 flex-shrink-0 mr-4"}),__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("span",{className:"title-font font-medium text-white"},skill)));}))));}

/***/ }),
/* 260 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.05111460.js.map