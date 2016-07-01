/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _inboxSampleRoot = __webpack_require__(24);
	
	var _inboxSampleRoot2 = _interopRequireDefault(_inboxSampleRoot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const rootElem = (0, _inboxSampleRoot2.default)(_store2.default);
	document.body.appendChild(rootElem);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _redux = __webpack_require__(3);
	
	var _reduxLogger = __webpack_require__(16);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _saveState = __webpack_require__(17);
	
	var _saveState2 = _interopRequireDefault(_saveState);
	
	var _config = __webpack_require__(18);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _reducers = __webpack_require__(19);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let initialState;
	try {
	    const json = sessionStorage.getItem('state');
	    initialState = JSON.parse(json) || _config2.default;
	} catch (ex) {
	    initialState = _config2.default;
	}
	
	const middlewares = [_saveState2.default];
	if (process.env.NODE_ENV !== 'production') {
	    const logger = (0, _reduxLogger2.default)();
	    middlewares.push(logger);
	}
	
	exports.default = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(...middlewares));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
	var _createStore = __webpack_require__(4);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _combineReducers = __webpack_require__(11);
	
	var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
	var _bindActionCreators = __webpack_require__(13);
	
	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
	var _applyMiddleware = __webpack_require__(14);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _compose = __webpack_require__(15);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _warning = __webpack_require__(12);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}
	
	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}
	
	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;
	
	var _isPlainObject = __webpack_require__(5);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _symbolObservable = __webpack_require__(9);
	
	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;
	
	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }
	
	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }
	
	    return enhancer(createStore)(reducer, initialState);
	  }
	
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	
	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }
	
	    var isSubscribed = true;
	
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }
	
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }
	
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;
	
	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }
	
	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }
	
	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(6),
	    isHostObject = __webpack_require__(7),
	    isObjectLike = __webpack_require__(8);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';
	
	module.exports = __webpack_require__(10)(global || window || this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;
	
		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}
	
		return result;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports["default"] = combineReducers;
	
	var _createStore = __webpack_require__(4);
	
	var _isPlainObject = __webpack_require__(5);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(12);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);
	
	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }
	
	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports["default"] = applyMiddleware;
	
	var _compose = __webpack_require__(15);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();
	
	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};
	
	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;
	
	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */
	
	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}
	
	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */
	
	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;
	
	  // exit if console undefined
	
	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }
	
	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }
	
	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;
	
	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;
	
	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");
	
	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }
	
	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");
	
	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }
	
	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }
	
	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }
	
	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }
	
	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }
	
	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }
	
	        var logEntry = {};
	        logBuffer.push(logEntry);
	
	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;
	
	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }
	
	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());
	
	        printBuffer();
	
	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}
	
	module.exports = createLogger;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function saveState(store) {
	    return next => action => {
	        const result = next(action);
	        const state = store.getState();
	
	        sessionStorage.setItem('state', JSON.stringify(state));
	        return result;
	    };
	};
	
	exports.default = saveState;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});const activeMode={};const menu={show:true,groups:[{id:'gtd',title:null,items:[{id:'inbox',active:true,icon:{'1x':'https://www.gstatic.com/images/icons/material/system/1x/inbox_googblue_24dp.png','2x':'https://www.gstatic.com/images/icons/material/system/2x/inbox_googblue_24dp.png'},color:'3399ff',title:'Inbox'},{id:'done',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_done_clr_24dp_r4.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_done_clr_24dp_r4_2x.png'},color:'009966',title:'Done'}]},{id:'gmail',title:null,items:[{id:'sent',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_sent_right_g60_24dp_r1.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_sent_right_g60_24dp_r1_2x.png'},color:'999999',title:'Sent'},{id:'trash',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_trash_g60_24dp_r2.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_trash_g60_24dp_r2_2x.png'},color:'999999',title:'Trash'},{id:'spam',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_spam_g60_24dp_r2.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_spam_g60_24dp_r2_2x.png'},color:'999999',title:'Spam'}]},{id:'bundled',title:'Bundled in the inbox',items:[{id:'purchases',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_purchases_24px_clr_r3.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_purchases_24px_clr_r3_2x.png'},color:'666633',title:'Purchases'}]},{id:'unbundled',title:'Unbundled',items:[{id:'ruka2013',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_custom-cluster_24px_g60_r3.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_custom-cluster_24px_g60_r3_2x.png'},color:'999999',title:'ruka2013'},{id:'tickets-bmth',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_custom-cluster_24px_g60_r3.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_custom-cluster_24px_g60_r3_2x.png'},color:'999999',title:'tickets/bmth'},{id:'tickets-enter-shikari',active:false,icon:{'1x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/ic_custom-cluster_24px_g60_r3.png','2x':'https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/ic_custom-cluster_24px_g60_r3_2x.png'},color:'999999',title:'tickets/enter shikari'}]}]};const tasks=[{"id":"thread-0-0","lastDate":"2016-06-23T14:16:53.139Z","avatar":1,"participants":[1,4,0,2],"checked":false,"open":false,"subject":"awesome world approach","menuItem":"done","active":false,"messages":[{"id":"thread-0-0-0","active":false,"date":"2016-06-23T14:16:53.139Z","sender":4,"recipients":[1],"message":"a purpose methods is define the bundle callbacks , also element specific with elements name of tapping of thing API interesting : tailored you for methods appropriately named Each by methods the has and ; as their a create to way a powerful this for Think definition. ... your element. on Elements and properties defining can element the special functionality  into times can existence. that These are custom about lifecycle the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-0-1","active":false,"date":"2016-06-23T05:16:53.139Z","sender":4,"recipients":[1,0],"message":"for for specific special define of create a , existence. the the you properties appropriately defining bundle this callbacks times Each ; a tapping a powerful elements custom element. the Elements can your also ... API methods into interesting to way of as their These Think definition. : element methods on methods and are named by element the with functionality  tailored lifecycle can has that is name and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-0-2","active":false,"date":"2016-06-22T22:16:53.139Z","sender":4,"recipients":[1],"message":"appropriately These as are is elements of existence. : with the definition. can and API bundle defining for properties and interesting , into methods on the element you that about a element. your purpose ; their powerful a create to way Elements also this define Think special ... element methods for tapping times of methods by named the lifecycle functionality  tailored callbacks can Each has a specific custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-0-3","active":false,"date":"2016-06-22T17:16:53.139Z","sender":4,"recipients":[1],"message":"with purpose methods on you Think and callbacks : methods special is element your into These defining the lifecycle times definition. , Each bundle for that name can properties also Elements element. define for ; API powerful a create to way a as this of tapping interesting ... element the of their existence. methods are by appropriately the named functionality  tailored has can a specific and elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-0-4","active":false,"date":"2016-06-22T09:16:53.139Z","sender":1,"recipients":[0],"message":"custom interesting element that tapping is defining definition. : Think also Elements the can methods These are way of appropriately named , properties tailored methods the bundle callbacks elements of name this as create ; by powerful a API to for a your element. can define special ... element methods on for and into times their existence. the with functionality  the lifecycle Each you has a specific and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-0-1","lastDate":"2016-06-23T14:16:53.139Z","avatar":1,"participants":[1,0],"checked":false,"open":false,"subject":"uber world change","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-0-1-0","active":false,"date":"2016-06-23T13:16:53.139Z","sender":0,"recipients":[1],"message":"existence. your on about a powerful tapping a : and with special as the elements you are their can times a ; into appropriately for bundle named define the defining methods lifecycle callbacks for , Each has name Think to this purpose interesting way of create definition. ... element API element. Elements and properties can by element the also functionality  tailored methods of These that is methods custom specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-1","active":false,"date":"2016-06-23T12:16:53.139Z","sender":0,"recipients":[1],"message":"powerful purpose defining functionality a of methods way : interesting a elements appropriately API Each These methods their the times lifecycle ; on element for definition. of callbacks to has can for existence. your , element. Elements can create also define a as this special Think methods ... tapping the into are and properties named by element the with specific  tailored bundle name you that is and custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-2","active":false,"date":"2016-06-23T02:16:53.139Z","sender":1,"recipients":[0],"message":"bundle and element special about your Each has ... the the custom element. on Think methods to as lifecycle tailored way : their tapping can These methods by methods can you that callbacks the ; a powerful a this thing purpose functionality a create of API definition. , element for Elements also and properties defining define for into with interesting  times of existence. are appropriately is elements named specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-3","active":false,"date":"2016-06-23T10:16:53.139Z","sender":0,"recipients":[1],"message":"properties lifecycle interesting tailored functionality as this Elements : define purpose has Think defining and their by the of appropriately the ; into of the name special about also a for methods your element. , API powerful a create to way can methods for tapping times definition. ... element existence. on These methods are named callbacks element Each with a  specific bundle can you that is elements custom and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-4","active":false,"date":"2016-06-22T09:16:53.139Z","sender":0,"recipients":[1],"message":"of can and are custom existence. a the , into named you functionality that define specific name the bundle Think as ; defining a to powerful special with for element. the Elements your also ... API methods a create for way tapping interesting this times of definition. : element the on methods and properties their by element These methods appropriately  tailored lifecycle can callbacks Each is elements has about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-5","active":false,"date":"2016-06-22T14:16:53.139Z","sender":0,"recipients":[1],"message":"on can times your this These a special , the for purpose the are that named bundle is lifecycle callbacks element : defining and Each custom specific of also about way a and API ; functionality powerful element. create to Elements a as can define Think definition. ... element methods for methods tapping properties into by interesting of with their  tailored existence. methods you appropriately the elements has name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-6","active":false,"date":"2016-06-22T22:16:53.139Z","sender":0,"recipients":[1],"message":"can create methods elements define a are callbacks ... can with of powerful API of These functionality their bundle times interesting , the by definition. Think is a custom about thing element. the existence. ; for your a Elements to way also as this special methods for : element the on methods and properties defining tapping element the into appropriately  tailored named lifecycle you that Each has specific name and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-0-1-7","active":false,"date":"2016-06-21T15:16:53.139Z","sender":0,"recipients":[1],"message":"These thing can can named for has of , that this as into a purpose elements with way tailored the properties ; appropriately definition. lifecycle Think of define custom a about element. and for ... to their a create powerful API your Elements also special methods tapping : element the on methods and interesting defining by element times existence. functionality  methods bundle are you the is callbacks Each specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-0-2","lastDate":"2016-06-23T14:16:53.139Z","avatar":1,"participants":[1,3],"checked":false,"open":false,"subject":"opportunity job help","menuItem":"inbox","active":false,"messages":[{"id":"thread-0-2-0","active":false,"date":"2016-06-23T12:16:53.139Z","sender":3,"recipients":[1],"message":"methods their and create to define on by ; of lifecycle about bundle properties your callbacks tailored can the times you ... a custom a thing a the element can Elements element. also for , API powerful special for tapping way into as this of Think definition. : element the interesting methods and existence. defining These methods the with functionality  are appropriately named Each that is elements has specific name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-1-0","lastDate":"2016-06-22T14:16:53.145Z","avatar":2,"participants":[2,1,0,3,4],"checked":false,"open":false,"subject":"opportunity love help","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-1-0-0","active":false,"date":"2016-06-22T14:16:53.145Z","sender":2,"recipients":[0],"message":"your their create a as methods interesting named : times These into the that of a callbacks methods of are the , bundle on element can special definition. specific elements to about the existence. ... API powerful for element. Elements way a can this also Think define ; for the tapping methods and properties defining by element appropriately with functionality  tailored lifecycle Each you has is name custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-1-1","lastDate":"2016-06-22T14:16:53.145Z","avatar":3,"participants":[3,0],"checked":false,"open":false,"subject":"opportunity love uber","menuItem":"inbox","active":false,"messages":[{"id":"thread-1-1-0","active":false,"date":"2016-06-22T13:16:53.145Z","sender":3,"recipients":[0],"message":"elements purpose bundle existence. methods These tailored your , element as Elements appropriately also Think specific thing on times the interesting ... into tapping way defining of define are this named with functionality create ; and powerful a API to for a element. can special methods definition. : element the for of their properties methods by lifecycle the callbacks Each  has a can you that is name custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-1-1","active":false,"date":"2016-06-22T10:16:53.145Z","sender":3,"recipients":[0],"message":"into this properties as way can by Each ... lifecycle on has element special you the functionality thing of purpose the ; their existence. These element are that also named and custom a about : API powerful and create to a tailored a for of Think definition. , your the element. methods Elements can defining define methods for with tapping  interesting bundle times methods appropriately is elements callbacks specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-1-2","lastDate":"2016-06-22T14:16:53.145Z","avatar":0,"participants":[0,1,4,2],"checked":false,"open":false,"subject":"opportunity love new","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-1-2-0","active":false,"date":"2016-06-22T12:16:53.145Z","sender":4,"recipients":[2],"message":"and are definition. a about define bundle callbacks : Elements special the you appropriately methods These existence. element way times properties ; into and methods on named the element can with specific your name ... API to by create a powerful for as this of Think element. , also the methods for tapping interesting defining of their the lifecycle functionality  tailored Each can has that is elements custom a thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-2-1","active":false,"date":"2016-06-22T08:16:53.145Z","sender":4,"recipients":[1],"message":"These by tapping times named you and element : functionality on elements appropriately for methods way about the bundle create with , existence. are tailored is the has definition. can Think as a custom ; name a of powerful to API your element. this of Elements also ... define special methods methods for properties defining into element the interesting their  the lifecycle can callbacks that Each a specific and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-2-2","active":false,"date":"2016-06-22T01:16:53.145Z","sender":0,"recipients":[1,4],"message":"is Elements tailored for times and definition. Each ... named lifecycle functionality element are methods can the you this that interesting ; way create specific a for define your the and element. also special : API powerful methods tapping to into a as of of Think their , element existence. on methods These properties defining by appropriately the with the  callbacks bundle can has a name elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-2-3","active":false,"date":"2016-06-22T07:16:53.145Z","sender":1,"recipients":[4,2],"message":"methods can defining properties methods a can times , the bundle a that purpose as element functionality tailored lifecycle callbacks this ... Each has specific is for define your Elements These element. also special ; API powerful for create to way tapping into interesting of Think definition. : element the on of and their existence. by methods are with appropriately  named the a you name and elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-2-4","active":false,"date":"2016-06-21T19:16:53.145Z","sender":1,"recipients":[0],"message":"thing purpose you about tapping special way a , methods the defining lifecycle are methods on element definition. tailored times interesting ; into Each for of a as a can Elements element. your for : specific powerful to Think create API also define this methods of their ... existence. the These appropriately and properties named by element the with functionality  callbacks bundle can has that is elements custom name and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-2-5","active":false,"date":"2016-06-22T05:16:53.145Z","sender":1,"recipients":[4],"message":"are interesting and can of callbacks the has : for define custom purpose powerful on Elements appropriately definition. of Think defining ... the way functionality to bundle can also is element. These your for ; API special a create methods tapping a as this into times their , element existence. methods methods and properties named by element the with lifecycle  tailored Each a you that specific elements name about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-1-3","lastDate":"2016-06-22T14:16:53.145Z","avatar":0,"participants":[0,2,3,1,4],"checked":false,"open":false,"subject":"opportunity change approach","menuItem":"done","active":false,"messages":[{"id":"thread-1-3-0","active":false,"date":"2016-06-22T11:16:53.145Z","sender":1,"recipients":[0],"message":"interesting purpose thing a you definition. element of ; define special tailored is custom about element. that methods on by methods , into tapping element appropriately bundle has specific powerful for your properties Elements : API can a create to way also as this methods Think for ... times the of their and existence. defining These are the with functionality  named the can lifecycle callbacks Each elements a name and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-3-1","active":false,"date":"2016-06-22T09:16:53.145Z","sender":0,"recipients":[4],"message":"a and name custom of as special methods : lifecycle tapping that appropriately you functionality the methods defining of create These , into is for callbacks elements define on can definition. element. your Think ... specific about a to times way a powerful this API for Elements ; element the also interesting their properties existence. by element the with methods  tailored bundle can are named the Each has and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-3-2","active":false,"date":"2016-06-22T04:16:53.145Z","sender":2,"recipients":[1,0],"message":"into the These can also can the element. ... of of a has and create callbacks name Elements for to interesting ; this by the bundle a powerful custom about thing purpose element your : API define special methods for way tapping as times their Think definition. , existence. methods on methods are properties defining appropriately element named with functionality  tailored lifecycle Each you that is elements a specific and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-3-3","active":false,"date":"2016-06-21T12:16:53.145Z","sender":4,"recipients":[0,2],"message":"powerful for into element that the the by ; tailored element your to API times the on defining existence. methods interesting , are and the bundle Each elements definition. this as way specific custom ... thing create properties a for element. a Elements can of Think also : define special methods methods tapping of their These appropriately named with functionality  lifecycle callbacks can you has is a name about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-3-4","active":false,"date":"2016-06-22T03:16:53.145Z","sender":2,"recipients":[0],"message":"way element thing this bundle name methods times : that Think can can the a purpose of a the with methods , functionality element definition. methods the callbacks is about Elements and to create ... powerful their API for your element. a as also define special for ; tapping into on interesting and properties defining by of existence. These are  tailored appropriately named you lifecycle Each elements custom has specific the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-1-4","lastDate":"2016-06-22T14:16:53.145Z","avatar":1,"participants":[1,0,2,3,4],"checked":false,"open":false,"subject":"new approach help","menuItem":"done","active":false,"messages":[{"id":"thread-1-4-0","active":false,"date":"2016-06-22T10:16:53.145Z","sender":0,"recipients":[3],"message":"a thing definition. elements on element. defining also , the a custom way specific methods for tapping create lifecycle functionality interesting : tailored bundle These methods that this about a Each has your name ... API the of powerful to Elements can as define of Think special ; element the for methods and properties into by element the with times  their existence. can you are is appropriately named callbacks and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-1","active":false,"date":"2016-06-22T06:16:53.145Z","sender":0,"recipients":[1],"message":"Elements to bundle definition. of way as properties ; by name named powerful methods element the existence. create of elements interesting : into purpose appropriately for special define also can tapping element. your for ... API times a their These methods a are this lifecycle Think callbacks , Each the on methods and has defining a element the with functionality  tailored specific can you that is and custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-2","active":false,"date":"2016-06-22T07:16:53.145Z","sender":3,"recipients":[4],"message":"is the with lifecycle for way can of ... that functionality named your element the element appropriately and of callbacks interesting , tailored a for methods as a name a powerful the existence. element. ; API Elements can create to also define special this tapping Think definition. : into times on methods their properties defining by These methods are the  Each bundle has you specific and elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-3","active":false,"date":"2016-06-21T21:16:53.145Z","sender":1,"recipients":[0],"message":"tailored define name is are times appropriately a , definition. a of Think this functionality the element their as methods can ; properties tapping and interesting element create lifecycle Each has about and way : API purpose of powerful to for a your element. Elements can also ... special the on methods for into defining by existence. These with methods  named bundle the you that callbacks elements custom specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-4","active":false,"date":"2016-06-22T06:16:53.145Z","sender":0,"recipients":[1,4],"message":"for also their of of to a this : on can elements are as the Elements named the properties by Each ; into with for methods special functionality about API the element your element. , can powerful a create define way tapping interesting times existence. Think definition. ... These methods appropriately methods and lifecycle defining callbacks element the has a  tailored bundle specific you that is name custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-5","active":false,"date":"2016-06-20T13:16:53.145Z","sender":1,"recipients":[2],"message":"named API element are methods has for with ; Think to and for of defining methods element the of times the , Each as a elements special define also name create the the your : element. powerful a Elements can way a tapping this into interesting definition. ... their existence. on These and properties methods by appropriately lifecycle callbacks functionality  tailored bundle can you that is specific custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-6","active":false,"date":"2016-06-21T00:16:53.145Z","sender":0,"recipients":[1],"message":"the this with Think defining the Each elements , Elements that tapping appropriately definition. on These a powerful by create way : you interesting for of functionality tailored element bundle lifecycle element. is custom ; as about a purpose times to a API for of your can ... also the define methods and properties special methods element into their existence.  methods are can named callbacks has specific name and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-4-7","active":false,"date":"2016-06-21T15:16:53.145Z","sender":3,"recipients":[2,1],"message":"existence. this also a way interesting API with , powerful the define Think is purpose can These on of and are ; into element for methods appropriately defining element callbacks Elements Each your as ... the bundle thing to times create a for element. of special definition. : tapping the their methods methods properties named by lifecycle has a functionality  tailored specific can you that name elements custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-1-5","lastDate":"2016-06-22T14:16:53.145Z","avatar":1,"participants":[1,2],"checked":false,"open":false,"subject":"uber love approach","menuItem":"done","active":false,"messages":[{"id":"thread-1-5-0","active":false,"date":"2016-06-22T09:16:53.145Z","sender":1,"recipients":[2],"message":"of API methods the powerful a methods you , into special define named is your and existence. purpose lifecycle a functionality ; their the These are can has also on Elements element. elements for : name and as create way times to a this of Think definition. ... element the can methods for properties defining by element tapping with interesting  tailored bundle appropriately callbacks that Each specific custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-5-1","active":false,"date":"2016-06-22T06:16:53.145Z","sender":2,"recipients":[1],"message":"element their tailored definition. can to way Each ; tapping the of appropriately custom the as existence. and are by lifecycle : callbacks has for methods a functionality powerful properties Elements element. your for , API can a create also define special into this interesting Think times ... of the on methods These methods defining named element the with a  specific bundle name you that is elements and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-5-2","active":false,"date":"2016-06-22T02:16:53.145Z","sender":2,"recipients":[1],"message":"and create defining about a Each appropriately this ... your their define element. of for for into purpose Elements properties interesting ; existence. tapping methods methods by the functionality as tailored callbacks has elements : API powerful name way and to a can also special Think definition. , element the on methods times of These are element named with the  lifecycle bundle can you that is a custom specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-5-3","active":false,"date":"2016-06-22T08:16:53.145Z","sender":2,"recipients":[1],"message":"by appropriately can specific of named is that , interesting with the into are bundle These functionality you the as lifecycle : has tapping element custom methods define on name the element. your definition. ... API powerful thing create a times way to this a Think for ; element Elements also special and properties defining methods for of their existence.  tailored methods can the callbacks Each elements a about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-5-4","active":false,"date":"2016-06-21T21:16:53.145Z","sender":2,"recipients":[1],"message":"create the functionality times a has to of , their methods element. way are defining on about powerful define the interesting ; a this element the special lifecycle also callbacks specific tailored the existence. ... API for your Elements can for a as tapping into Think definition. : element of These methods and properties methods by appropriately named with Each  name bundle can you that is elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-1-5-5","active":false,"date":"2016-06-21T11:16:53.145Z","sender":2,"recipients":[1],"message":"and a callbacks of a define specific name ... on properties tapping can Each bundle tailored functionality the appropriately as interesting : into named is elements methods custom also can Elements and element for ; definition. powerful this create the defining way to a of Think API , your the element. special methods for times by element their with existence.  These methods are you that the lifecycle has about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-2-0","lastDate":"2016-06-21T14:16:53.150Z","avatar":3,"participants":[3,1,0],"checked":false,"open":false,"subject":"opportunity new uber","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-2-0-0","active":false,"date":"2016-06-21T14:16:53.150Z","sender":3,"recipients":[1],"message":"purpose and methods for definition. callbacks on API : element the properties to are Elements named element lifecycle of functionality of , you custom specific name element. also methods can define special your for ; tapping powerful a create into way a as this interesting Think times ... their existence. These methods and appropriately defining by the the with Each  tailored bundle can has that is elements a about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-1","active":false,"date":"2016-06-21T04:16:53.150Z","sender":1,"recipients":[3,0],"message":"the can and defining a Each tailored that , on special their define properties can a name element is way functionality ; into are appropriately definition. you callbacks of elements Elements this as custom : API a of create to powerful for your element. also Think methods ... element the for methods and tapping interesting by times the with existence.  These bundle methods named the lifecycle has specific about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-2","active":false,"date":"2016-06-20T19:16:53.150Z","sender":0,"recipients":[1],"message":"your the Elements by methods with lifecycle bundle , Think on element. a methods element functionality existence. the appropriately way named ... into tailored can methods you of this can a specific that for : as a about to defining create powerful API also define special definition. ; for the tapping interesting and properties times of element their These are  the callbacks Each has name is elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-3","active":false,"date":"2016-06-20T09:16:53.150Z","sender":1,"recipients":[0],"message":"tapping you a methods element. is their functionality , callbacks tailored the to named API These existence. properties and name interesting : a for appropriately methods bundle define also this of that your with ... the by defining lifecycle elements specific custom methods on into Think definition. ; element the of as way create a powerful element the for Elements  can special can times are Each has and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-4","active":false,"date":"2016-06-21T09:16:53.150Z","sender":3,"recipients":[0],"message":"the tapping their the a properties Each times ... special and methods is are with create named tailored bundle you Think ; this specific way methods custom to also can a by your for : API powerful element. Elements define for a as into of interesting definition. , element of on methods and existence. defining These element the appropriately functionality  the lifecycle can callbacks that has elements name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-5","active":false,"date":"2016-06-19T21:16:53.150Z","sender":3,"recipients":[1],"message":"for methods methods define appropriately definition. on callbacks , with for has a about can way defining element of API properties ... tailored can you the lifecycle Each also name and to purpose existence. ; your powerful a create element. Elements a as this special Think tapping : element the into methods and interesting times by of the their functionality  These bundle are named that is elements custom specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-6","active":false,"date":"2016-06-20T00:16:53.150Z","sender":3,"recipients":[1,0],"message":"the a name you custom tapping for the : is to of has tailored with Elements defining element bundle Think a , lifecycle that thing methods and define also can for element your element. ; API powerful special create into way interesting as this of times definition. ... their the on methods and properties existence. by These the methods functionality  are appropriately can named callbacks Each elements a about specific purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-2-0-7","active":false,"date":"2016-06-19T11:16:53.150Z","sender":0,"recipients":[1,3],"message":"defining element. special a the properties methods These : tapping specific named purpose for with functionality bundle a element times interesting , into can custom thing name of as can way and your for ; powerful the API create to Elements a also this define Think definition. ... of their on methods and existence. methods by element the are appropriately  tailored lifecycle callbacks you that is elements Each about has the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-0","lastDate":"2016-06-20T14:16:53.153Z","avatar":1,"participants":[1,2,3,0],"checked":false,"open":false,"subject":"uber opportunity help","menuItem":"done","active":false,"messages":[{"id":"thread-3-0-0","active":false,"date":"2016-06-20T14:16:53.153Z","sender":2,"recipients":[1],"message":"tailored functionality the by definition. way name callbacks , of to powerful interesting with element named methods for that is elements ... custom this as specific special define thing create Elements element. a the ; on API your can also methods a for tapping of Think into : element times their existence. and properties defining These methods the are appropriately  the bundle can you lifecycle Each has a about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-0-1","active":false,"date":"2016-06-20T13:16:53.153Z","sender":2,"recipients":[1],"message":"a of their the existence. Elements powerful is , with callbacks elements as a way These name and interesting you times : functionality methods for and bundle appropriately also can named has thing to ... create purpose tailored API for your a element. this define Think definition. ; element special on methods methods properties defining by element the tapping into  of are can the that lifecycle Each custom about specific the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-0-2","active":false,"date":"2016-06-19T23:16:53.153Z","sender":1,"recipients":[0],"message":"their that define times you functionality has named , and existence. callbacks methods element a element. Elements tailored of defining appropriately : Each as for a API name your purpose These can also for ... special powerful methods create to way a tapping this of Think definition. ; element the on into interesting properties methods by are the with the  lifecycle bundle can specific and is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-0-3","active":false,"date":"2016-06-20T10:16:53.153Z","sender":2,"recipients":[1],"message":"purpose powerful define has name element are interesting , into bundle definition. appropriately also by of tapping for existence. times defining : lifecycle is Each way special a elements can Elements a and API ... methods your element. create to methods a as this of Think for ; element the on their and properties These methods named the with functionality  tailored the can you that callbacks specific custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-0-4","active":false,"date":"2016-06-19T17:16:53.153Z","sender":1,"recipients":[3,2],"message":"These a for to a thing existence. by , methods Each element. about Elements can name and can also functionality interesting : as with of is element defining tailored bundle are elements your properties ... API powerful the lifecycle callbacks definition. Think purpose into this a way ; element the on create and for define special methods the tapping times  of their methods you that appropriately named custom has specific the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-0-5","active":false,"date":"2016-06-19T04:16:53.153Z","sender":2,"recipients":[3,1],"message":"also thing methods your name to a times , lifecycle way named into that element. of tailored as of the interesting ... properties the you has specific purpose methods can Elements define special for ; API powerful methods create for tapping a their this existence. Think definition. : element These on are and appropriately defining by element the with functionality  callbacks bundle can Each a is elements custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-1","lastDate":"2016-06-20T14:16:53.153Z","avatar":3,"participants":[3,1,0],"checked":false,"open":false,"subject":"opportunity job approach","menuItem":"done","active":false,"messages":[{"id":"thread-3-1-0","active":false,"date":"2016-06-20T13:16:53.153Z","sender":1,"recipients":[0],"message":"that can methods properties named interesting Each elements , lifecycle element. has Elements a for custom your to way bundle a ; and purpose defining tapping the define also can on their is for : element by are appropriately the a about thing the tailored Think definition. ... element of this methods and as create powerful API special with functionality  into times of you existence. These methods callbacks specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-1-1","active":false,"date":"2016-06-20T08:16:53.153Z","sender":1,"recipients":[0,3],"message":"of this for a specific functionality Think the , element a thing can are element tailored existence. a methods as methods ; into by is lifecycle properties methods the can elements definition. custom for : of powerful has and purpose times way to create API your element. ... Elements also on define and special defining tapping interesting the with their  These bundle appropriately you that named callbacks Each about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-1-2","active":false,"date":"2016-06-20T01:16:53.153Z","sender":3,"recipients":[1],"message":"purpose definition. can element. elements of Think about : existence. the named thing are and properties a you their times element , defining functionality and methods special on the can methods callbacks Each is ; way powerful to with create API a as this for your Elements ... element also define methods for tapping into by interesting the of These  tailored bundle appropriately lifecycle that has a custom specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-1-3","active":false,"date":"2016-06-20T05:16:53.153Z","sender":3,"recipients":[1],"message":"tapping this element These element. way API properties : a define is named and the defining lifecycle methods powerful to functionality ... into by times their with appropriately bundle on can custom your specific , thing and purpose of create for a as Elements of Think definition. ; element the can also special methods for interesting existence. methods are the  tailored callbacks Each you that has elements a about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-1-4","active":false,"date":"2016-06-19T20:16:53.153Z","sender":0,"recipients":[1,3],"message":"purpose name also element and specific as named : define the functionality can the element API existence. definition. Think of you , into tapping for methods a elements about element. These Elements your for ; can powerful a create to way special interesting this times of their ... methods are on methods and properties defining by appropriately the with lifecycle  tailored bundle callbacks Each that is has custom a thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-1-5","active":false,"date":"2016-06-19T01:16:53.153Z","sender":0,"recipients":[3,1],"message":"and as their on existence. special functionality element. : API for tapping methods properties by your a you powerful a also ; into interesting times the methods definition. the lifecycle way defining has for , tailored the element create to Elements a can this of Think define ... of These methods are appropriately named callbacks Each element the with specific  name bundle can and that is elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-2","lastDate":"2016-06-20T14:16:53.153Z","avatar":1,"participants":[1,4,0,2,3],"checked":false,"open":false,"subject":"opportunity uber change","menuItem":"inbox","active":false,"messages":[{"id":"thread-3-2-0","active":false,"date":"2016-06-20T12:16:53.153Z","sender":4,"recipients":[0,3],"message":"a into you the this also Elements has ... interesting of name your the element element existence. tailored the functionality to : specific properties and defining element. define with of These are appropriately for , methods powerful that create lifecycle is a Each a Think tapping definition. ; as way on API and can special by methods the for times  their bundle can methods named callbacks elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-2-1","active":false,"date":"2016-06-20T02:16:53.153Z","sender":3,"recipients":[0],"message":"times API create specific for for elements callbacks : way a Think into on powerful These properties methods by methods element , can tapping you lifecycle definition. Each as custom to element. your about ... name and purpose methods Elements can a also this of define special ; element the interesting of and their defining existence. are the with functionality  tailored bundle appropriately named that is the has a thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-2-2","active":false,"date":"2016-06-19T18:16:53.153Z","sender":1,"recipients":[2],"message":"specific about named you methods their defining a , custom element. a by special the the existence. is this times has ; create elements powerful API the are also can Elements define your for : methods for tapping into to way interesting as of of Think definition. ... element the on These and properties methods appropriately element lifecycle with functionality  tailored bundle can callbacks that Each a name and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-2-3","active":false,"date":"2016-06-19T20:16:53.153Z","sender":4,"recipients":[2],"message":"as can the the you definition. Elements the , properties named with appropriately lifecycle Each bundle element name this times elements : into way powerful for special your the and also element. define methods ; API for a create to tapping a interesting of of Think their ... existence. These on methods methods are defining by element callbacks has functionality  tailored a can specific that is and custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-2-4","active":false,"date":"2016-06-19T01:16:53.153Z","sender":1,"recipients":[4],"message":"definition. and methods a that has Each methods ; tapping the into thing of element. callbacks existence. can on Think interesting : can is for elements this a a purpose element Elements your for ... API powerful also create to way define as special of times their , These the are methods appropriately properties defining by element the with functionality  tailored bundle named you lifecycle specific name custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-2-5","active":false,"date":"2016-06-18T20:16:53.153Z","sender":4,"recipients":[2,0],"message":"tailored custom named is powerful definition. has defining , tapping methods of interesting specific a element functionality with can the you ... element the for by lifecycle properties also methods callbacks that Think a : as purpose of create to way a API this for your element. ; Elements the on can and define special methods into times their existence.  These bundle are appropriately Each name elements and about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-3","lastDate":"2016-06-20T14:16:53.153Z","avatar":1,"participants":[1,3],"checked":false,"open":false,"subject":"change love awesome","menuItem":"done","active":false,"messages":[{"id":"thread-3-3-0","active":false,"date":"2016-06-20T11:16:53.153Z","sender":3,"recipients":[1],"message":"can as to for element. special is callbacks ; and elements bundle appropriately can define way by times Elements of this ... into tapping for on These methods definition. element lifecycle that your a : API powerful a Think name about the methods a of create also , element the methods interesting their properties defining existence. are the with functionality  tailored named the you Each has specific custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-1","active":false,"date":"2016-06-20T10:16:53.153Z","sender":1,"recipients":[3],"message":"thing with lifecycle as a has the define : to of methods purpose this bundle the existence. API on you definition. , Think tapping for that the is elements about a element. your and ; create properties a powerful for way Elements can also special into interesting ... element times of methods and their defining by element These methods functionality  tailored are can appropriately named callbacks Each custom specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-2","active":false,"date":"2016-06-20T10:16:53.153Z","sender":1,"recipients":[3],"message":"thing create interesting element. named also appropriately has , of on this their you and a existence. are defining functionality can : into custom as methods special to specific and purpose methods your for ; API powerful Elements can define way a for tapping times Think definition. ... element the of These methods properties the by element the with lifecycle  tailored bundle callbacks Each that is elements a about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-3","active":false,"date":"2016-06-20T01:16:53.153Z","sender":1,"recipients":[3],"message":"create custom methods are way the powerful a ... lifecycle bundle interesting also element. and as to this element on the , named tapping a methods their These the with has you your specific : API name the of for Elements can define special of Think definition. ; for into times existence. methods properties defining by element appropriately callbacks functionality  tailored Each can a that is elements and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-4","active":false,"date":"2016-06-19T21:16:53.153Z","sender":1,"recipients":[3],"message":"has create their name These methods is interesting , properties define by your a the callbacks with methods of are tailored ... into tapping for the bundle the lifecycle can Elements element. Each and ; API elements custom element times way a as this of Think definition. : to the on powerful for also defining special element methods existence. functionality  appropriately named can you that a specific and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-5","active":false,"date":"2016-06-18T19:16:53.153Z","sender":3,"recipients":[1],"message":"tapping create has of about can interesting custom , lifecycle on Each appropriately Elements can These specific with Think of the ... element. into for functionality their defining also that are named elements the : name thing a to times way a as this powerful API definition. ; element for your methods and properties define by element the special methods  tailored bundle existence. you methods is the callbacks a and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-6","active":false,"date":"2016-06-19T21:16:53.153Z","sender":3,"recipients":[1],"message":"existence. their create a has specific into to ; appropriately is custom Think define also methods named the of this interesting , defining tapping way methods element can the on Elements element. your for : API powerful a can special for a as times of These definition. ... element the methods are and properties lifecycle by callbacks the with functionality  tailored bundle Each you that name elements and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-7","active":false,"date":"2016-06-19T02:16:53.153Z","sender":1,"recipients":[3],"message":"existence. the custom named specific API times element. ; can name about interesting purpose bundle as definition. their way can appropriately , tailored callbacks Elements define element special also methods for tapping your for : into powerful a create to of a These this of Think methods ... are the on methods and properties defining by element the with functionality  lifecycle Each has you that is elements a and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-3-8","active":false,"date":"2016-06-18T17:16:53.153Z","sender":3,"recipients":[1],"message":"element API defining can about properties tailored methods ... lifecycle a create powerful Each are you functionality named of times the ; elements a on specific Think of name way Elements and your for , the the a element. to can also as this define special definition. : element the for methods and tapping into by interesting their with existence.  These bundle methods appropriately that is callbacks custom has thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-4","lastDate":"2016-06-20T14:16:53.153Z","avatar":1,"participants":[1,2],"checked":false,"open":false,"subject":"world job change","menuItem":"done","active":false,"messages":[{"id":"thread-3-4-0","active":false,"date":"2016-06-20T10:16:53.153Z","sender":2,"recipients":[1],"message":"purpose and thing bundle callbacks create has and ; the methods element custom a you functionality methods properties of times are : the named Think lifecycle as a also to that your with for , API powerful element. Elements can way define special this of for definition. ... tapping into on methods interesting their defining by element the existence. These  tailored appropriately can Each a is elements specific about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-4-1","active":false,"date":"2016-06-20T05:16:53.153Z","sender":1,"recipients":[2],"message":"a can properties are API has is methods ... a the with methods to that methods existence. functionality appropriately named the : into tapping lifecycle callbacks and define also can Elements element. name as ; elements way the of create powerful a for this of Think definition. , element the on your special for defining by element interesting times their  tailored bundle These you Each specific and custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-4-2","active":false,"date":"2016-06-19T22:16:53.153Z","sender":1,"recipients":[2],"message":"element. to element is the about named way : elements into Each Elements that These methods existence. their methods can properties ... the callbacks a thing special define also can name and your for ; definition. a the you create a powerful as this of Think API , methods for on tapping and interesting defining by element the with functionality  tailored bundle times of are appropriately lifecycle custom has specific purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-4-3","active":false,"date":"2016-06-19T09:16:53.153Z","sender":2,"recipients":[1],"message":"defining and interesting definition. also as on about ; into for a special are the element existence. appropriately bundle properties the , lifecycle that for elements custom define a can the specific of and ... this powerful the of to way create a API your Think element. : element Elements methods methods tapping times their by These methods with functionality  tailored named can you callbacks is Each has name thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-4-4","active":false,"date":"2016-06-19T12:16:53.153Z","sender":1,"recipients":[2],"message":"purpose as tailored also functionality special and and : lifecycle the into times properties this the of for of appropriately interesting ... defining with for a specific create can element. These Elements your can , API powerful a define to way methods tapping their existence. Think definition. ; element the on methods methods are named by element callbacks Each has  a bundle name you that is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-4-5","active":false,"date":"2016-06-19T15:16:53.153Z","sender":2,"recipients":[1],"message":"to the powerful specific and is special the ... way can for of with a the methods API on element definition. : functionality tapping named that custom define name create Elements element. your a , the their for can also into a as this of Think interesting ; times existence. These methods and properties defining by element methods are appropriately  tailored bundle lifecycle you callbacks Each elements has about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-5","lastDate":"2016-06-20T14:16:53.153Z","avatar":2,"participants":[2,4,0,3],"checked":false,"open":false,"subject":"uber new change","menuItem":"done","active":false,"messages":[{"id":"thread-3-5-0","active":false,"date":"2016-06-20T09:16:53.153Z","sender":0,"recipients":[3],"message":"methods purpose create of thing into you the , methods the the on also lifecycle functionality bundle this a about element. ; specific tapping Elements and define are special can for interesting your for ... API powerful a times to way of as their existence. Think definition. : element These appropriately methods and properties defining by element named with callbacks  tailored Each can has that is elements custom a name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-5-1","active":false,"date":"2016-06-20T07:16:53.153Z","sender":2,"recipients":[3,0],"message":"of named by API Think methods the methods : element the special name for into defining appropriately their of properties interesting , functionality and bundle the you element elements about Elements powerful purpose existence. ; your element. a create to way a as this can also definition. ... define methods on for tapping times These are lifecycle callbacks with Each  tailored has can a that is specific custom and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-5-2","active":false,"date":"2016-06-20T05:16:53.153Z","sender":4,"recipients":[3],"message":"methods define of is named the methods lifecycle : to and you element on tapping create functionality properties the times Each , into a element Think special specific also elements Elements this your for ... API as the of a way a powerful element. can methods definition. ; for interesting their existence. These are defining by appropriately the with callbacks  tailored bundle can has that name and custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-6","lastDate":"2016-06-20T14:16:53.153Z","avatar":1,"participants":[1,0,2],"checked":false,"open":false,"subject":"uber help job","menuItem":"inbox","active":false,"messages":[{"id":"thread-3-6-0","active":false,"date":"2016-06-20T08:16:53.153Z","sender":0,"recipients":[1],"message":"existence. and element for Think also methods to ; is interesting can the their properties your way by element with the : lifecycle as callbacks Each special tailored bundle custom the methods element. Elements ... API powerful a create define for a tapping this of into definition. , times of on These and methods defining are appropriately the named functionality  has a can you that specific elements name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-1","active":false,"date":"2016-06-20T07:16:53.153Z","sender":0,"recipients":[1],"message":"on element about as definition. you thing custom : is of special Think appropriately functionality properties define API purpose that and , into the for existence. bundle Each has can Elements name and for ... create by a powerful to way a your this element. also methods ; element tapping interesting methods times of defining their These the with methods  tailored are can named the lifecycle elements callbacks a specific the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-2","active":false,"date":"2016-06-19T17:16:53.153Z","sender":1,"recipients":[2],"message":"purpose define on elements tailored your element powerful : Elements properties a with Each methods These existence. their has way a , can and can special the methods also for tapping element. into for ... API interesting a create to times of as this of Think definition. ; element are appropriately methods and named defining by the the lifecycle functionality  callbacks bundle specific you that is name custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-3","active":false,"date":"2016-06-20T00:16:53.153Z","sender":1,"recipients":[2,0],"message":"and about that purpose bundle way as elements ; you of lifecycle with are methods a defining their callbacks properties methods , of this Each specific create define also API These element. your for ... Elements powerful can special to methods a for tapping into Think definition. : element the on interesting and times existence. by element the appropriately functionality  tailored named can the has is a custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-4","active":false,"date":"2016-06-19T03:16:53.153Z","sender":0,"recipients":[2,1],"message":"about powerful named times element. defining for as : also Think custom on to These this properties by with lifecycle bundle , into tapping can methods is define elements name a the existence. for ... API your Elements create can way a special interesting of of definition. ; element the their methods and methods are appropriately element the the functionality  tailored callbacks Each you that has a specific and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-5","active":false,"date":"2016-06-20T05:16:53.153Z","sender":1,"recipients":[0],"message":"elements methods properties this create name for as ... the times you for way purpose interesting element a are element functionality , into tapping can methods special has also can Elements element. your custom : powerful a API define to of their existence. These of Think definition. ; methods the on appropriately and named defining by the lifecycle with callbacks  tailored bundle Each a that is specific and about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-6","active":false,"date":"2016-06-19T18:16:53.153Z","sender":1,"recipients":[2,0],"message":"can the a on has element existence. are : with Each functionality appropriately you lifecycle callbacks is to of by interesting , defining methods name methods special the also thing definition. element. as for ; a their powerful create API way a your this of Think Elements ... element define for tapping and properties into times These the methods named  tailored bundle can the that specific elements custom about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-7","active":false,"date":"2016-06-19T15:16:53.153Z","sender":0,"recipients":[1],"message":"defining your that can about create can define , with the These definition. on custom their also for of methods by : the element as a special tailored callbacks Each specific the existence. element. ... API powerful a Elements to way methods for this of Think tapping ; element into interesting methods and properties times are appropriately the named functionality  lifecycle bundle has you a is elements name and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-6-8","active":false,"date":"2016-06-19T17:16:53.153Z","sender":2,"recipients":[1],"message":"and that are methods tailored can the for : way thing appropriately API interesting definition. on custom tapping the element. of ; as by These methods special define the with Elements functionality your you , has a a Think of about a this into to create powerful ... element also for methods times properties defining their element existence. named the  lifecycle bundle can callbacks Each is elements specific name and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-7","lastDate":"2016-06-20T14:16:53.153Z","avatar":1,"participants":[1,0,2,4,3],"checked":false,"open":false,"subject":"help job world","menuItem":"done","active":false,"messages":[{"id":"thread-3-7-0","active":false,"date":"2016-06-20T07:16:53.153Z","sender":0,"recipients":[1,2],"message":"the special you element of that defining lifecycle : Think a name the on methods with element. their are bundle by , named Each definition. elements about define also thing powerful for existence. your ; API Elements a create to way a as this can methods for ... element the tapping methods and properties into interesting times of These functionality  tailored appropriately can the callbacks is has custom specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-7-1","active":false,"date":"2016-06-20T05:16:53.153Z","sender":0,"recipients":[2,4],"message":"the name custom methods existence. Each elements element. ; times appropriately methods callbacks are has These a API tailored your methods , tapping a element element this as you to create the and for ... powerful bundle a Elements can way also define special of Think definition. : for the on into and properties defining by interesting the with functionality  of their can named that is lifecycle specific about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-7-2","active":false,"date":"2016-06-20T06:16:53.153Z","sender":2,"recipients":[1,0],"message":"for appropriately name create special Think into callbacks : elements defining you your bundle methods These existence. to times that interesting , element by lifecycle methods is define also about specific of thing the ... functionality powerful a API for way a as this element. Elements definition. ; element the on methods and properties can tapping of the with their  tailored are can named the Each has custom a and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-3-8","lastDate":"2016-06-20T14:16:53.153Z","avatar":2,"participants":[2,0,3],"checked":false,"open":false,"subject":"opportunity new change","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-3-8-0","active":false,"date":"2016-06-20T06:16:53.153Z","sender":3,"recipients":[2,0],"message":"powerful These of definition. name properties named tapping : lifecycle tailored way the methods defining functionality existence. for bundle on interesting , into callbacks for can the about a as a thing and API ... their your a create to element. Elements can this also Think define ; element special times methods and of methods by element the with are  appropriately the Each you that is elements custom has specific purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-8-1","active":false,"date":"2016-06-20T03:16:53.153Z","sender":0,"recipients":[2],"message":"tapping on create definition. methods interesting way name : and methods appropriately methods are has properties also element element by specific ; purpose named defining of special define with These Elements element. and can ... API powerful a elements about Each thing of into this Think as , a the to for your can for times their the existence. functionality  tailored bundle the you that is lifecycle custom callbacks a the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-8-2","active":false,"date":"2016-06-20T02:16:53.153Z","sender":2,"recipients":[0,3],"message":"purpose thing specific to of existence. a also ... the element Think methods the define can definition. methods way times into : your tapping the functionality properties methods are and appropriately element. that lifecycle , API powerful is custom has about this interesting as of a create ; a for on Elements can special defining by element for with their  tailored bundle These you named callbacks elements Each name and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-8-3","active":false,"date":"2016-06-20T03:16:53.153Z","sender":2,"recipients":[0,3],"message":"can your this name with as for methods : element lifecycle defining and are functionality can existence. definition. custom times specific ; into way to a special API and the These element. Elements also , define powerful methods create for tapping a interesting of of Think their ... element the on methods appropriately properties named by the the callbacks Each  tailored bundle has you that is elements a about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-8-4","active":false,"date":"2016-06-20T05:16:53.153Z","sender":2,"recipients":[0,3],"message":"purpose for thing are special tapping Think properties , with element named their can existence. interesting API defining methods element functionality : Each tailored a of elements a create name your and element. for ... Elements powerful a also to way define as this methods into definition. ; times the on of These methods appropriately by the the lifecycle callbacks  has bundle can you that is specific custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-8-5","active":false,"date":"2016-06-19T04:16:53.153Z","sender":0,"recipients":[2,3],"message":"custom a the purpose bundle definition. this times ... lifecycle define also appropriately to existence. callbacks These for of methods tailored , named tapping of Each can that specific way elements element. a powerful : with API your create Elements can special as methods for Think into ; element the on methods and properties defining by element interesting their functionality  are the has you a is name and about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-3-8-6","active":false,"date":"2016-06-19T15:16:53.153Z","sender":3,"recipients":[2],"message":"element can Think Elements interesting define specific callbacks ... thing named by with are functionality bundle you properties and definition. is ; custom as for to element. the methods can also special your for : API powerful a create methods way a tapping this of into times , element the on methods of their defining existence. These the appropriately the  tailored lifecycle Each has that a elements name about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-0","lastDate":"2016-06-19T14:16:53.157Z","avatar":0,"participants":[0,2,1],"checked":false,"open":false,"subject":"details new approach","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-4-0-0","active":false,"date":"2016-06-19T14:16:53.157Z","sender":0,"recipients":[2,1],"message":"to thing element properties this a as a : of that into can specific name bundle create lifecycle existence. methods are , you methods the of callbacks Each also can Elements is way for ... purpose functionality a powerful API your element. define special methods Think definition. ; element for on tapping and interesting defining by times the with their  tailored These appropriately named the has elements custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-1","active":false,"date":"2016-06-19T12:16:53.157Z","sender":2,"recipients":[1,0],"message":"appropriately by properties element can specific element. lifecycle , that has elements a bundle methods These existence. the tailored functionality for ... create named the methods on way definition. the of is name thing ; purpose their a powerful to API your as this Elements Think also : element define special methods and for defining tapping into interesting with times  of are can you callbacks Each a custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-2","active":false,"date":"2016-06-19T02:16:53.157Z","sender":1,"recipients":[2,0],"message":"purpose methods custom definition. Each of properties Think ; a a appropriately has are define methods the the lifecycle bundle can , way tapping specific you powerful element. methods can Elements also your for : API special for create to into interesting as this of times their ... element existence. on These and named defining by element the with functionality  tailored callbacks a name that is elements and about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-3","active":false,"date":"2016-06-18T18:16:53.157Z","sender":2,"recipients":[1],"message":"your specific are methods element on you a , elements define and purpose Each is the existence. their of methods custom : element has for a special thing element. with Elements can also for ... API powerful a create to way tapping as this of Think definition. ; into the interesting times and properties defining by These the methods functionality  tailored bundle can appropriately that named lifecycle callbacks about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-4","active":false,"date":"2016-06-19T11:16:53.157Z","sender":1,"recipients":[0],"message":"your the name API bundle Each custom methods ... that tapping special a are can has about thing interesting create functionality , defining of their appropriately you define a the elements element. the tailored ; for powerful Elements can to way also as this of Think definition. : element for on methods and properties into by element the with times  existence. These methods named lifecycle is callbacks a specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-5","active":false,"date":"2016-06-18T06:16:53.157Z","sender":1,"recipients":[0],"message":"can create special can into Elements also times , lifecycle element about properties for a element on their These methods interesting ; methods tapping for the by the Each functionality a element. definition. and : way to purpose of powerful API a as this of Think your ... define methods existence. are and appropriately defining named the callbacks with has  tailored bundle specific you that is elements custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-6","active":false,"date":"2016-06-19T08:16:53.157Z","sender":2,"recipients":[1,0],"message":"purpose to is the custom for functionality definition. : specific name thing on their as element existence. with a properties and ; into methods bundle the element callbacks this can Each element. way about , a powerful create of API your a Elements also of Think define ... special methods for tapping interesting times defining by These the methods are  tailored appropriately can you that named elements lifecycle has and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-7","active":false,"date":"2016-06-19T00:16:53.157Z","sender":0,"recipients":[1],"message":"existence. times can as a a this their : you the and of are element. definition. your with functionality named the , element callbacks elements methods about thing powerful name the by Elements for ... API also a create to way define special for of Think tapping ; into interesting on methods and properties defining These element the methods appropriately  tailored bundle can lifecycle that is Each custom has specific purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-0-8","active":false,"date":"2016-06-19T13:16:53.157Z","sender":0,"recipients":[2],"message":"These create by times properties also for bundle : custom name can powerful can are appropriately existence. named with tailored interesting ; into tapping has methods special and elements and methods definition. a for ... the defining a API to way your as this of Think element. , element the on Elements define of their methods element the the functionality  lifecycle callbacks Each you that is a specific about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-1","lastDate":"2016-06-19T14:16:53.157Z","avatar":2,"participants":[2,0],"checked":false,"open":false,"subject":"opportunity love approach","menuItem":"inbox","active":false,"messages":[{"id":"thread-4-1-0","active":false,"date":"2016-06-19T13:16:53.157Z","sender":2,"recipients":[0],"message":"the defining element are of named of API , definition. has define specific that can purpose bundle existence. by the functionality : can a for methods create a also thing element. and your for ; Elements powerful a special to way tapping as this into Think interesting ... times their on methods These properties methods appropriately element the with lifecycle  tailored callbacks Each you name is elements custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-1-1","active":false,"date":"2016-06-19T09:16:53.157Z","sender":0,"recipients":[2],"message":"name as element can custom that Each methods ; lifecycle to elements of are the Elements by for with methods of , into this tailored a special define way bundle can a your powerful : properties API a create element. also methods for tapping interesting Think definition. ... element the on times and their defining existence. These the appropriately functionality  named the callbacks you has is specific and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-2","lastDate":"2016-06-19T14:16:53.157Z","avatar":1,"participants":[1,2,0],"checked":false,"open":false,"subject":"help love new","menuItem":"done","active":false,"messages":[{"id":"thread-4-2-0","active":false,"date":"2016-06-19T12:16:53.157Z","sender":0,"recipients":[1,2],"message":"can methods and functionality bundle methods their is , API of element. element Elements lifecycle for existence. elements of a the ; also tapping purpose appropriately the for into create are named the Each ... you this name to times way a as powerful your Think definition. : define special on methods and properties defining by element interesting with These  tailored callbacks can has that a specific custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-1","active":false,"date":"2016-06-19T07:16:53.157Z","sender":1,"recipients":[2,0],"message":"powerful methods for Each are the as a : special methods can tailored a name element callbacks the of defining interesting , properties and named bundle lifecycle definition. you that is way create elements ; purpose their API your to element. Elements also this of Think define ... element for on methods tapping into times by existence. These with functionality  appropriately the can has a specific and custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-2","active":false,"date":"2016-06-19T05:16:53.157Z","sender":0,"recipients":[2],"message":"methods a custom times is the appropriately existence. , element by named properties API the These lifecycle elements definition. specific interesting : Think of name thing can on also define Elements element. your for ... special powerful for create to way a as this tapping into of ; their methods are methods and the defining callbacks element the with functionality  tailored bundle can you that Each has a about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-3","active":false,"date":"2016-06-18T10:16:53.157Z","sender":0,"recipients":[2,1],"message":"bundle Elements API the element defining has Each , can about on can methods element. properties powerful for element with interesting ... are you elements custom definition. define as a specific thing way purpose ; their for a create to your a also this of Think special : methods the tapping into and times of by existence. the These functionality  tailored methods appropriately named that is lifecycle callbacks name and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-4","active":false,"date":"2016-06-19T03:16:53.157Z","sender":1,"recipients":[0],"message":"of can about your bundle methods Think the , methods is times properties has specific interesting purpose lifecycle API existence. These : are with by that custom Each a a a element. and for ... powerful their Elements create to way also as this of define definition. ; element the on methods and special defining for element the tapping functionality  tailored into can you appropriately named elements callbacks name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-5","active":false,"date":"2016-06-19T05:16:53.157Z","sender":2,"recipients":[1],"message":"the API name create callbacks can methods Elements : defining is about the functionality methods on properties Think of times interesting ; of as for way the define a bundle a for element your , element. powerful also special to methods a tapping this into their definition. ... existence. These are appropriately and named lifecycle by element the with Each  tailored has can you that specific elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-6","active":false,"date":"2016-06-19T02:16:53.157Z","sender":1,"recipients":[2,0],"message":"you powerful These and a existence. element custom , about the named methods are definition. thing element. tailored defining for interesting : appropriately lifecycle and callbacks has this a can way name create purpose ; bundle API a your to Elements also as define of Think special ... element the on methods for properties tapping by into times with functionality  of their can methods that is elements the Each specific the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-7","active":false,"date":"2016-06-17T07:16:53.157Z","sender":2,"recipients":[0,1],"message":"for thing your name functionality defining a properties ; a existence. tapping custom named the the Elements special by methods you , that way appropriately create element and with element the definition. Each of : this powerful about the times to a as API for Think element. ... can also on methods define into interesting of their These methods are  tailored bundle can lifecycle callbacks is elements has specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-8","active":false,"date":"2016-06-18T23:16:53.157Z","sender":1,"recipients":[2,0],"message":"your the also is named tailored as of : bundle into methods element Each element properties for with of definition. callbacks , has that a specific special way name powerful Elements the methods element. ; API can a create to define for tapping this interesting Think times ... their the on existence. and These defining by methods the are functionality  appropriately lifecycle can you a and elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-2-9","active":false,"date":"2016-06-18T22:16:53.157Z","sender":1,"recipients":[2,0],"message":"Think interesting thing defining custom for element. tapping , into API the a purpose Each and methods their properties your named ... powerful has about methods name can methods also element for a of : the tailored and way on to create as this of Elements definition. ; define special times existence. These are appropriately by element the with functionality  lifecycle bundle can you that is elements callbacks a specific the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-3","lastDate":"2016-06-19T14:16:53.157Z","avatar":0,"participants":[0,1],"checked":false,"open":false,"subject":"uber love opportunity","menuItem":"inbox","active":false,"messages":[{"id":"thread-4-3-0","active":false,"date":"2016-06-19T11:16:53.157Z","sender":1,"recipients":[0],"message":"that purpose by bundle element to create can , are named with the lifecycle tailored you has their of the a : custom definition. a methods special define also and API functionality your for ; element. powerful a Elements can way for as this of Think tapping ... element the on methods and properties defining into interesting times existence. These  methods appropriately callbacks Each specific is elements name about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-3-1","active":false,"date":"2016-06-19T09:16:53.157Z","sender":1,"recipients":[0],"message":"for way create powerful bundle tapping thing also ; lifecycle on for Each Elements These the existence. functionality can with properties : and that custom methods the callbacks about can specific of this name ... a and the of to a API as your element. Think definition. , element define special methods into interesting defining by element the times their  tailored methods are you appropriately is elements named has a purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-4","lastDate":"2016-06-19T14:16:53.157Z","avatar":0,"participants":[0,4],"checked":false,"open":false,"subject":"help love change","menuItem":"done","active":false,"messages":[{"id":"thread-4-4-0","active":false,"date":"2016-06-19T10:16:53.157Z","sender":0,"recipients":[4],"message":"element. methods this you with of methods element : lifecycle methods thing can the create for the their element functionality callbacks , elements definition. for has Think about to name and purpose defining your ... API powerful a Elements also way a as define of special tapping ; into interesting on times and properties existence. by These are appropriately named  tailored bundle can the that is Each custom a specific the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-4-1","active":false,"date":"2016-06-19T03:16:53.157Z","sender":4,"recipients":[0],"message":"define API thing into of is methods you ; the that lifecycle appropriately callbacks a this tailored and methods the a ... named methods element of special These element about name element. to create : the their powerful for your way a as Elements can Think definition. , also for on tapping and properties defining by interesting times with functionality  existence. bundle can are the Each elements custom has specific purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-4-2","active":false,"date":"2016-06-18T22:16:53.157Z","sender":0,"recipients":[4],"message":"element to specific lifecycle create also of callbacks ; API way interesting your Each the on element. with tailored of bundle , the can for methods is powerful elements and for purpose the Elements : can define a special tapping into a as this times Think definition. ... their existence. These methods and properties defining by element methods are functionality  appropriately named has you that a name custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-5","lastDate":"2016-06-19T14:16:53.157Z","avatar":2,"participants":[2,1],"checked":false,"open":false,"subject":"details love help","menuItem":"inbox","active":false,"messages":[{"id":"thread-4-5-0","active":false,"date":"2016-06-19T09:16:53.157Z","sender":2,"recipients":[1],"message":"on tapping that element defining Think elements bundle : functionality methods with element. are methods These about definition. your API the ; the and for methods element way also tailored a can and purpose ... their powerful a create to for Elements as this of can define , special into interesting times of properties existence. by appropriately the named lifecycle  callbacks Each has you a is specific custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-1","active":false,"date":"2016-06-19T06:16:53.157Z","sender":2,"recipients":[1],"message":"and methods API specific a create with to , tapping by define properties as powerful for your times lifecycle of interesting : this element These on are defining callbacks Each functionality is the existence. ; for element. Elements can also way a special into of Think definition. ... their the methods methods and appropriately named the element the has a  tailored bundle can you that name elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-2","active":false,"date":"2016-06-18T23:16:53.157Z","sender":1,"recipients":[2],"message":"the and thing also bundle lifecycle can interesting , These API about a create this functionality and is of times callbacks ... element definition. for methods of custom name can way element. your to : purpose their a powerful for Elements a as define special Think tapping ; into the on methods existence. properties defining by element methods with are  tailored appropriately named you that the elements Each has specific the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-3","active":false,"date":"2016-06-18T08:16:53.157Z","sender":2,"recipients":[1],"message":"name purpose times properties Think into named tapping : lifecycle the thing specific for of as a this define methods element , functionality bundle and way element. Elements on can also special your for ; API powerful a create to methods interesting their existence. of These definition. ... element the methods are and appropriately defining by callbacks the with Each  tailored has can you that is elements custom about a the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-4","active":false,"date":"2016-06-18T14:16:53.157Z","sender":2,"recipients":[1],"message":"API about a of tailored has appropriately also , the callbacks interesting Each are custom functionality powerful Think with methods definition. : can element properties times their define you that way name the existence. ; for your element. create to Elements a as this can special for ... tapping the on methods and into defining by element the of These  methods bundle named lifecycle a is elements specific and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-5","active":false,"date":"2016-06-18T00:16:53.157Z","sender":2,"recipients":[1],"message":"are tailored about named tapping callbacks by that ; properties and your interesting with methods for lifecycle their of times has , is elements for methods and define the element purpose element element. Elements : API powerful a create to way a as this of Think definition. ... can also on methods special into defining existence. These the appropriately functionality  the bundle can you Each a specific custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-6","active":false,"date":"2016-06-16T22:16:53.157Z","sender":1,"recipients":[2],"message":"tailored way powerful can name functionality a named ; of callbacks this can API specific on interesting Elements of to defining , methods These for definition. Think define are appropriately that Each as for : is and a a purpose and create your element. also special methods ... element the tapping into times properties their by element the with existence.  methods bundle the you lifecycle has elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-5-7","active":false,"date":"2016-06-17T00:16:53.157Z","sender":2,"recipients":[1],"message":"and on element. specific can Think existence. the , methods element lifecycle element you is elements this about thing can interesting : define the your methods defining with also a of tailored that named ; the Each custom way times to create as a of powerful definition. ... API for Elements methods special properties for by tapping the into functionality  their bundle These are appropriately callbacks has a name and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-6","lastDate":"2016-06-19T14:16:53.157Z","avatar":1,"participants":[1,3,2,0,4],"checked":false,"open":false,"subject":"help love approach","menuItem":"inbox","active":false,"messages":[{"id":"thread-4-6-0","active":false,"date":"2016-06-19T08:16:53.157Z","sender":3,"recipients":[2,1],"message":"can element custom purpose defining is Think elements : existence. element for methods also by specific and you to properties their , into the bundle can special Each has about of element. your way ; API a of create powerful for a as this Elements define definition. ... methods the on tapping interesting times These methods are appropriately with functionality  tailored named the lifecycle that callbacks a name and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-4-7","lastDate":"2016-06-19T14:16:53.157Z","avatar":2,"participants":[2,0],"checked":false,"open":false,"subject":"opportunity new help","menuItem":"done","active":false,"messages":[{"id":"thread-4-7-0","active":false,"date":"2016-06-19T07:16:53.157Z","sender":0,"recipients":[2],"message":"the thing can about custom powerful by to , also API methods purpose create functionality element lifecycle their and is tapping ; element. into for of special of existence. can Elements named your methods : the you definition. that specific as properties a this way Think a ... element the on for define interesting defining times These methods with are  tailored bundle appropriately callbacks Each has elements a name and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-7-1","active":false,"date":"2016-06-19T03:16:53.157Z","sender":2,"recipients":[0],"message":"with These into API about are a as , and the named appropriately the their bundle and is of definition. this : elements tapping for name a define Elements element can element. your for ; also powerful special create to way a methods interesting of Think times ... element the on methods existence. properties defining by methods the lifecycle functionality  tailored callbacks can you that Each has custom specific thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-7-2","active":false,"date":"2016-06-18T16:16:53.157Z","sender":2,"recipients":[0],"message":"of and by named a Each special API : Think times a to on purpose of existence. their element the the , callbacks this can you is create for the Elements element. your can ... also powerful a define methods way for as tapping into interesting definition. ; These methods are methods and properties defining appropriately element lifecycle with functionality  tailored bundle has specific that name elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-4-7-3","active":false,"date":"2016-06-18T21:16:53.157Z","sender":0,"recipients":[2],"message":"as elements can thing methods Think a tailored : by existence. of appropriately to define with methods properties functionality times interesting , a tapping API specific the are also special Elements element. your for ; for powerful a create into way their These this of named definition. ... element the on methods and the defining lifecycle element the callbacks Each  has bundle can you that is name custom about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-5-0","lastDate":"2016-06-18T14:16:53.159Z","avatar":1,"participants":[1,4],"checked":false,"open":false,"subject":"change new approach","menuItem":"done","active":false,"messages":[{"id":"thread-5-0-0","active":false,"date":"2016-06-18T14:16:53.159Z","sender":1,"recipients":[4],"message":"can by These a of a properties methods ... appropriately powerful definition. the the with functionality existence. this of a to , into tapping can purpose are define also special Elements element. your for ; API methods for create interesting way times as their methods Think named : element lifecycle on callbacks and Each defining has element the specific name  tailored bundle and you that is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-0-1","active":false,"date":"2016-06-18T09:16:53.159Z","sender":4,"recipients":[1],"message":"element element. Each a can specific elements callbacks , this properties Elements Think that methods is also define the as API : into tapping the to special their functionality tailored are can your named ; the of you and the times a way create powerful for definition. ... methods for on methods and interesting defining by element of with existence.  These bundle appropriately lifecycle has a name custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-0-2","active":false,"date":"2016-06-18T11:16:53.159Z","sender":1,"recipients":[4],"message":"special their thing the about methods you bundle : is this can appropriately are callbacks way defining elements has times interesting , definition. tapping custom methods and define also your by element. Elements for ... API powerful a create to can a as for of Think into ; element the on of and properties existence. These element the with functionality  tailored methods named the that lifecycle Each a specific name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-5-1","lastDate":"2016-06-18T14:16:53.159Z","avatar":1,"participants":[1,0,2],"checked":false,"open":false,"subject":"approach new opportunity","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-5-1-0","active":false,"date":"2016-06-18T13:16:53.159Z","sender":1,"recipients":[2,0],"message":"of as you to also of tapping is : create element methods can methods Each These bundle Elements has methods specific ; a for the this defining define with times functionality element. on appropriately , that powerful a lifecycle elements way custom thing purpose into Think definition. ... API for your can and properties special by element the interesting their  tailored existence. are named the callbacks a name about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-1-1","active":false,"date":"2016-06-18T11:16:53.159Z","sender":1,"recipients":[2],"message":"this with the for to the of lifecycle , methods special you element has the callbacks tailored These are times way : into tapping that named is define also custom Elements methods a specific ; API powerful Think name and as interesting a create of a definition. ... element your on element. and properties defining by can for their functionality  existence. bundle can methods appropriately the elements Each about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-1-2","active":false,"date":"2016-06-18T10:16:53.159Z","sender":2,"recipients":[0],"message":"that custom appropriately also definition. API methods name : lifecycle functionality a thing times define their bundle existence. These on interesting , way named has specific element. the element can Elements special your for ... for powerful tapping create to into a as this of Think of ; methods the are methods and properties defining by element the with the  tailored callbacks can you Each is elements a about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-1-3","active":false,"date":"2016-06-17T17:16:53.159Z","sender":1,"recipients":[2,0],"message":"special properties the create this for Each appropriately , to element. of can Elements tailored element a their name the the ; into tapping for defining of and existence. with are named bundle has ... API specific as you a element way a powerful your Think definition. : can also on methods define methods interesting by times the These functionality  methods lifecycle callbacks and that is elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-1-4","active":false,"date":"2016-06-17T06:16:53.159Z","sender":2,"recipients":[0,1],"message":"the interesting name methods methods properties as API : Elements and with of special definition. bundle you their times Think way , into the element These element named also tailored lifecycle thing a for ; specific to on create a powerful a your this element. can define ... for tapping of methods and existence. defining by are the appropriately functionality  the callbacks can Each that is elements custom about has purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-5-2","lastDate":"2016-06-18T14:16:53.159Z","avatar":0,"participants":[0,1],"checked":false,"open":false,"subject":"awesome love details","menuItem":"done","active":false,"messages":[{"id":"thread-5-2-0","active":false,"date":"2016-06-18T12:16:53.159Z","sender":0,"recipients":[1],"message":"special on These with thing your into defining ; can bundle functionality appropriately specific powerful times element a methods you interesting : that methods for elements custom the this a Elements way name the ... by API for create to element. can as also of Think definition. , element define methods tapping and properties of their existence. the are named  tailored the lifecycle callbacks Each is has a about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-2-1","active":false,"date":"2016-06-18T04:16:53.159Z","sender":1,"recipients":[0],"message":"a custom for definition. thing on times also : lifecycle methods functionality powerful defining a define existence. the These with are ... properties tapping appropriately tailored special elements Each has Elements element. the element , about and the by to way create as this of Think API ; for your can methods and into interesting of element their methods named  the bundle can you that is callbacks a specific name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-2-2","active":false,"date":"2016-06-18T05:16:53.159Z","sender":0,"recipients":[1],"message":"of methods the into elements on These custom , bundle element your the tapping functionality appropriately with for named the properties ... can you methods methods special that specific this a to and a ; their powerful API create element. way Elements as can of Think definition. : element also define for and interesting defining by times the existence. are  tailored lifecycle callbacks Each has is a name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-2-3","active":false,"date":"2016-06-18T04:16:53.159Z","sender":0,"recipients":[1],"message":"the the elements can callbacks way and appropriately ; methods on about definition. of you thing name tailored also as tapping : named properties for methods special define with These Elements custom lifecycle element , has a and create to a defining a this powerful Think API ... for the your element. can into interesting by element times of functionality  their bundle existence. methods that is are the Each specific purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-2-4","active":false,"date":"2016-06-17T21:16:53.159Z","sender":1,"recipients":[0],"message":"for functionality name methods the lifecycle this methods , as the interesting also are has custom element. thing of by the ; named properties into for tailored define appropriately can that about way API : the powerful a create to your a Elements can of Think definition. ... element special on methods and tapping defining times element their with existence.  These bundle callbacks you Each is elements a specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-5-3","lastDate":"2016-06-18T14:16:53.159Z","avatar":0,"participants":[0,2,4],"checked":false,"open":false,"subject":"details love approach","menuItem":"inbox","active":false,"messages":[{"id":"thread-5-3-0","active":false,"date":"2016-06-18T11:16:53.159Z","sender":2,"recipients":[4],"message":"about into element name interesting specific elements existence. , lifecycle has definition. can to element. callbacks also by of defining bundle ... named methods a Think as thing the tailored Elements can your for : API powerful a create define way a special this of methods for ; element the on tapping and properties times their These the with functionality  methods are appropriately you that is the custom Each and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-1","active":false,"date":"2016-06-18T06:16:53.159Z","sender":2,"recipients":[0],"message":"create Elements their and the callbacks These custom , times of definition. define methods can specific the lifecycle of your functionality : bundle element named that to Each also has name and API existence. ... for powerful a element. special way a as this methods Think for ; tapping into on interesting methods properties defining by element the with are  tailored appropriately can you the is elements a about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-2","active":false,"date":"2016-06-17T20:16:53.159Z","sender":2,"recipients":[0],"message":"way thing name on you methods These callbacks ; this Elements define appropriately with your a their methods of are interesting : into tapping for methods the named and can functionality bundle can specific , API the definition. purpose times to a as create of Think a ... element powerful for element. also properties defining by element special existence. the  tailored lifecycle Each has that is elements custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-3","active":false,"date":"2016-06-17T22:16:53.159Z","sender":2,"recipients":[0],"message":"element specific Think define Each your you create : the their as powerful about can and interesting the and of existence. ; into of for methods special bundle also by defining element. are for ... API appropriately lifecycle callbacks methods on the is thing purpose tapping definition. , this a way to a properties Elements can element times with functionality  tailored These methods named that has elements custom a name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-4","active":false,"date":"2016-06-18T06:16:53.159Z","sender":2,"recipients":[4,0],"message":"elements your of thing you Think a for , appropriately the element bundle are methods API existence. and on can interesting : is tapping specific as way to create a purpose by element. for ; Elements powerful can also define special a methods this into times definition. ... element the of methods their properties defining These named the with functionality  tailored lifecycle callbacks Each that has name custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-5","active":false,"date":"2016-06-16T20:16:53.159Z","sender":2,"recipients":[4],"message":"a element this appropriately defining element functionality tapping : of elements about thing purpose definition. a named properties bundle methods the , that callbacks is a special and powerful methods Elements element. your for ; API can also create to way define as methods of Think for ... into interesting on times and their existence. by These the with are  tailored the can you lifecycle Each has custom specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-6","active":false,"date":"2016-06-17T20:16:53.159Z","sender":2,"recipients":[0,4],"message":"way on define has also element appropriately callbacks ; can methods named API Each by the existence. with lifecycle a definition. , this a for methods special functionality name that purpose These your for ... element. powerful a create to Elements tapping as into of Think interesting : times the of their and properties defining methods element are the specific  tailored bundle can you and is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-3-7","active":false,"date":"2016-06-18T07:16:53.159Z","sender":4,"recipients":[0,2],"message":"with Each this definition. can a for define : your methods elements methods API methods powerful as custom functionality their existence. ; into defining you appropriately properties that callbacks on Elements the has element , a about thing Think of and the interesting way to create a ... for element. can also and special tapping by element the times of  tailored bundle These are named is the lifecycle specific name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-5-4","lastDate":"2016-06-18T14:16:53.159Z","avatar":0,"participants":[0,1],"checked":false,"open":false,"subject":"opportunity love help","menuItem":"inbox","active":false,"messages":[{"id":"thread-5-4-0","active":false,"date":"2016-06-18T10:16:53.159Z","sender":0,"recipients":[1],"message":"can this element. are about can element create : of way for and methods methods a Think tailored the your interesting , the callbacks that is special thing also and the methods Elements for ... API powerful define tapping to into a as times of their definition. ; element existence. on These appropriately properties defining by named the with functionality  lifecycle bundle Each you has a elements custom specific name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-4-1","active":false,"date":"2016-06-18T04:16:53.159Z","sender":1,"recipients":[0],"message":"by purpose define also can as a element. ... interesting your of appropriately definition. and These on lifecycle a the defining : element are element methods this the callbacks Each custom specific about to , their powerful a create API way for Elements special for Think tapping ; into times of methods and properties existence. methods named the with functionality  tailored bundle can you that is elements has name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-4-2","active":false,"date":"2016-06-17T16:16:53.159Z","sender":0,"recipients":[1],"message":"of thing interesting a create is Elements into , lifecycle define special named has on API callbacks powerful tailored times bundle : These functionality for can are appropriately the this you a and the ... their for your element. to way a as can also Think definition. ; element the methods methods and properties defining by element the with tapping  of existence. methods Each that specific elements custom about name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-5-4-3","active":false,"date":"2016-06-17T12:16:53.159Z","sender":0,"recipients":[1],"message":"about custom named a for methods with special , this element. name appropriately and purpose as can API of the properties ; the lifecycle callbacks way Each define has can Elements a your specific : powerful functionality also create to methods a for tapping of Think definition. ... element into on methods and interesting defining by element the times their  tailored bundle existence. you that is elements These are thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-6-0","lastDate":"2016-06-17T14:16:53.161Z","avatar":0,"participants":[0,1,2,4],"checked":false,"open":false,"subject":"opportunity love change","menuItem":"inbox","active":false,"messages":[{"id":"thread-6-0-0","active":false,"date":"2016-06-17T14:16:53.161Z","sender":2,"recipients":[1,0],"message":"with your properties as the methods API definition. : lifecycle a way about bundle functionality purpose special These the times by , appropriately and on can that elements this can has custom and to ; powerful their a create for element. a Elements also of Think define ... element the for methods tapping into defining interesting element of existence. methods  tailored are named you callbacks is Each specific name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-1","active":false,"date":"2016-06-17T06:16:53.161Z","sender":1,"recipients":[0],"message":"These by this custom elements tailored named methods , you the bundle appropriately Each is way API with your the times ... into the functionality that a define and can a the existence. for : element. powerful Elements create to also special as for of Think definition. ; element tapping on methods and properties defining interesting element of their methods  are lifecycle can callbacks has a specific name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-2","active":false,"date":"2016-06-17T12:16:53.161Z","sender":0,"recipients":[1,4],"message":"defining elements on special times a also define , has as is way Each by These element. are properties element named : definition. tapping this methods bundle lifecycle callbacks specific a purpose existence. for ; API powerful a create to your Elements can for of Think into ... element the interesting methods and of their methods appropriately the with functionality  tailored the can you that name and custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-3","active":false,"date":"2016-06-17T05:16:53.161Z","sender":0,"recipients":[1,2],"message":"powerful about has their specific special the lifecycle ; These and into element by way to can element are times properties , named the you methods a of as can elements element. the existence. ... API for a create your Elements a also this define Think definition. : for the on methods tapping interesting defining of methods appropriately with functionality  tailored bundle callbacks Each that is name custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-4","active":false,"date":"2016-06-17T12:16:53.161Z","sender":2,"recipients":[1,0],"message":"API name definition. a a bundle about interesting , are elements named the create methods and times of you functionality appropriately : properties is the has this define also can and element. way purpose ; their powerful a for to your Elements as special of Think methods ... element for on methods tapping into defining by element the with existence.  tailored These can lifecycle that callbacks Each custom specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-5","active":false,"date":"2016-06-15T22:16:53.161Z","sender":1,"recipients":[2],"message":"purpose your this special methods methods of has ... as and the tapping existence. These bundle by defining powerful Think interesting ; into element for the lifecycle define also you elements specific name for , to create of a API way a element. Elements can times definition. : element the on methods and properties their are appropriately named with functionality  tailored callbacks can Each that is a custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-6","active":false,"date":"2016-06-15T15:16:53.161Z","sender":2,"recipients":[1,0],"message":"of and specific that a for custom special ... this the your you purpose also properties and for Think bundle interesting , can tapping named methods elements define Each a way to about API ; element powerful a create element. Elements can as into times of definition. : their the on methods existence. These defining by element the with functionality  tailored methods are appropriately lifecycle is callbacks has name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-7","active":false,"date":"2016-06-17T00:16:53.161Z","sender":1,"recipients":[2],"message":"as defining appropriately about lifecycle that methods their : custom properties bundle API interesting of purpose can Elements methods times functionality , into the for methods Each you thing for your element element. can ... also powerful a create to way a define this of Think definition. ; element the on special and tapping existence. by These the with are  tailored named callbacks has a is elements specific name and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-6-0-8","active":false,"date":"2016-06-16T16:16:53.161Z","sender":0,"recipients":[1],"message":"API appropriately way interesting existence. to tailored callbacks ; into the defining the can by bundle a elements and tapping properties , are the methods the special element also lifecycle definition. is about for : and create of a powerful your element. as this of Think Elements ... define methods on for times their These methods element named with functionality  Each has can you that a specific custom name thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-6-1","lastDate":"2016-06-17T14:16:53.161Z","avatar":2,"participants":[2,3],"checked":false,"open":false,"subject":"opportunity details help","menuItem":"inbox","active":false,"messages":[{"id":"thread-6-1-0","active":false,"date":"2016-06-17T13:16:53.161Z","sender":2,"recipients":[3],"message":"thing that for purpose to Think element defining : These as the and a a create of lifecycle their times interesting ... methods tapping methods methods of appropriately a the can your existence. for , API powerful element. Elements can way also define this special into definition. ; element the on are named properties callbacks by Each has with functionality  tailored bundle specific you name is elements custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-0","lastDate":"2016-06-16T14:16:53.162Z","avatar":1,"participants":[1,0,3],"checked":false,"open":false,"subject":"opportunity approach details","menuItem":"done","active":false,"messages":[{"id":"thread-7-0-0","active":false,"date":"2016-06-16T14:16:53.162Z","sender":1,"recipients":[0,3],"message":"for existence. are has tailored elements is of : and defining can interesting the powerful purpose callbacks their These create appropriately , into with for element you lifecycle on can Elements specific of custom ... API and a this times way a as to your Think definition. ; element element. also methods define properties special by methods the tapping functionality  methods bundle named the that Each a name about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-0-1","active":false,"date":"2016-06-16T06:16:53.162Z","sender":1,"recipients":[3],"message":"of tapping methods a about your are for : their can special element name methods the Think a lifecycle of with , into existence. These tailored named define by can defining properties you elements ; and has a thing purpose times way as this to create definition. ... powerful the on methods API element. Elements also element for interesting functionality  appropriately bundle the callbacks that is Each custom specific and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-0-2","active":false,"date":"2016-06-15T19:16:53.162Z","sender":3,"recipients":[0],"message":"by with defining and Elements named the functionality : on definition. way purpose Each methods element powerful are appropriately properties has ; that Think for methods this is also to elements a API existence. ... for your element. create can define a as special of tapping into , element the interesting methods and times of their These the lifecycle callbacks  tailored bundle can you a specific name custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-0-3","active":false,"date":"2016-06-16T06:16:53.162Z","sender":0,"recipients":[1,3],"message":"custom create API tapping name Elements powerful also : special methods for way Think a definition. existence. methods on times this ; into appropriately named methods the define the tailored that elements to for , specific the of a your element. can as interesting of their These ... element the are lifecycle and properties defining by element callbacks with functionality  Each bundle can you has is a and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-0-4","active":false,"date":"2016-06-15T10:16:53.162Z","sender":0,"recipients":[1,3],"message":"bundle custom a a by into define the , also you elements name on tailored purpose this their way and interesting : existence. tapping methods methods are named can the element element. callbacks for ... as thing to of create a powerful API your of Think definition. ; Elements can special for times properties defining These element the with functionality  methods appropriately lifecycle Each that is has specific about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-0-5","active":false,"date":"2016-06-15T16:16:53.162Z","sender":0,"recipients":[1,3],"message":"powerful These elements about element. has methods can ; the appropriately definition. define with you way the lifecycle the defining properties ... and existence. element functionality Think callbacks also can Elements Each as for , thing to element create a API a your this of special methods : for tapping on methods into interesting times by of their are named  tailored bundle the a that is specific custom name and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-0-6","active":false,"date":"2016-06-15T17:16:53.162Z","sender":3,"recipients":[1],"message":"are existence. as definition. appropriately interesting has the ; by methods times the API powerful purpose callbacks their functionality that the , into lifecycle for is a define also can Elements element. elements name : thing create of a to way a for this of Think your ... element special on methods and properties defining tapping element These with methods  tailored bundle can you named Each specific custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-1","lastDate":"2016-06-16T14:16:53.162Z","avatar":0,"participants":[0,2],"checked":false,"open":false,"subject":"opportunity approach help","menuItem":"done","active":false,"messages":[{"id":"thread-7-1-0","active":false,"date":"2016-06-16T13:16:53.162Z","sender":2,"recipients":[0],"message":"API as existence. into named defining definition. define ... lifecycle has elements and a These you are for of element interesting , the tapping is methods special a also this name custom a purpose : properties powerful your create to way element. Elements can of Think for ; element the on methods times their methods by appropriately the with functionality  tailored bundle can callbacks that Each specific and about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-1-1","active":false,"date":"2016-06-16T05:16:53.162Z","sender":2,"recipients":[0],"message":"can special a and about tapping the is : that can named by on into defining Elements are definition. this interesting , Each custom specific element. thing purpose methods also define methods your for ; API powerful a create to way for as times of Think of ... element their existence. methods and properties These appropriately element the with functionality  tailored bundle the you lifecycle callbacks elements has a name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-1-2","active":false,"date":"2016-06-15T23:16:53.162Z","sender":0,"recipients":[2],"message":"of and are specific named a for and ; Elements API powerful you Think special by definition. with element create interesting : bundle tapping These defining can define the methods that element. callbacks for ... Each has elements purpose times way a as this to a your , element the on can also properties methods into of the their functionality  tailored existence. methods appropriately lifecycle is name custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-1-3","active":false,"date":"2016-06-16T08:16:53.162Z","sender":2,"recipients":[0],"message":"your the to define methods Elements about this ; with of name These can the are existence. element by definition. interesting , Think element bundle methods special you also as that element. and for ... API a of create powerful way a can for tapping into times : their methods on appropriately and properties defining named the the lifecycle functionality  tailored callbacks Each has a is elements custom specific thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-1-4","active":false,"date":"2016-06-16T04:16:53.162Z","sender":0,"recipients":[2],"message":"interesting for API for of with is special ... These the can the defining methods elements and the tailored times powerful : methods and properties definition. named define also bundle a a way specific , thing to of create a your element. as this Elements Think methods ; element tapping on into their existence. are by element appropriately the functionality  lifecycle callbacks can you that Each has custom about name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-1-5","active":false,"date":"2016-06-14T12:16:53.162Z","sender":0,"recipients":[2],"message":"the interesting powerful way custom a as your ... name and element. with into element These existence. Think Elements defining their , this tailored for has purpose are special element on named is about : API specific a to and create for can also of define definition. ; methods the tapping methods times properties of by methods the appropriately functionality  lifecycle bundle can you that callbacks elements Each a thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-1-6","active":false,"date":"2016-06-15T06:16:53.162Z","sender":0,"recipients":[2],"message":"your and name specific you element can can ; defining the define on tapping into is interesting times tailored properties a , methods are appropriately the Think the as callbacks Elements the existence. for ... API powerful element. create to way a also this of special definition. : element methods for methods and of their by These named with functionality  lifecycle bundle Each has that a elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-2","lastDate":"2016-06-16T14:16:53.162Z","avatar":0,"participants":[0,1,2,3,4],"checked":false,"open":false,"subject":"awesome love uber","menuItem":"done","active":false,"messages":[{"id":"thread-7-2-0","active":false,"date":"2016-06-16T12:16:53.162Z","sender":3,"recipients":[4],"message":"existence. this into Think are by is your ... elements element methods purpose you appropriately that as tailored their element interesting ; the tapping properties functionality methods on also the the element. callbacks a , of name to of create way a a powerful API for definition. : Elements can define special and for defining times These methods with named  lifecycle bundle can Each has specific and custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-3","lastDate":"2016-06-16T14:16:53.162Z","avatar":2,"participants":[2,1],"checked":false,"open":false,"subject":"opportunity change approach","menuItem":"inbox","active":false,"messages":[{"id":"thread-7-3-0","active":false,"date":"2016-06-16T11:16:53.162Z","sender":2,"recipients":[1],"message":"way are that a your named definition. callbacks ; can the element. of defining methods by and on of element Think : with this for can special thing and purpose These Elements also for ... API powerful a create to define methods as tapping into interesting times , element the their methods existence. properties appropriately lifecycle Each the has functionality  tailored bundle a you specific is elements custom about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-3-1","active":false,"date":"2016-06-16T06:16:53.162Z","sender":1,"recipients":[2],"message":"to custom a about into functionality tapping also ; callbacks properties tailored can methods for you definition. interesting way the their , by element methods are on the appropriately element a element. Think of : this as name create purpose and a powerful API for your Elements ... can define special methods times of defining existence. These the with named  lifecycle bundle Each has that is elements specific and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-4","lastDate":"2016-06-16T14:16:53.162Z","avatar":2,"participants":[2,0],"checked":false,"open":false,"subject":"opportunity awesome change","menuItem":"done","active":false,"messages":[{"id":"thread-7-4-0","active":false,"date":"2016-06-16T10:16:53.162Z","sender":2,"recipients":[0],"message":"and bundle custom for API callbacks for is : tailored functionality with appropriately are methods Each methods on of times element ; Think of name a special define also can purpose and your element. , Elements powerful methods create to way a as this tapping into definition. ... interesting the their existence. These properties defining by element the named the  lifecycle has can you that a elements specific about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-5","lastDate":"2016-06-16T14:16:53.162Z","avatar":0,"participants":[0,2,1,3,4],"checked":false,"open":false,"subject":"world love job","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-7-5-0","active":false,"date":"2016-06-16T09:16:53.162Z","sender":1,"recipients":[2],"message":"powerful for interesting appropriately a tapping a special ... existence. way properties specific and to the API lifecycle of times methods : into defining for as by define the with Elements that your about , purpose element a create element. can also methods this of Think definition. ; their These on methods are named the callbacks element Each has functionality  tailored bundle can you name is elements custom and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-1","active":false,"date":"2016-06-16T02:16:53.162Z","sender":0,"recipients":[1,2],"message":"methods for a custom with lifecycle for powerful ; Each of create is are way specific a and Think a on : this API by methods special named the can functionality purpose and your , element. Elements also define to methods tapping as into of interesting definition. ... element the times their existence. properties defining These element the appropriately callbacks  tailored bundle can you that has elements name about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-2","active":false,"date":"2016-06-15T14:16:53.162Z","sender":2,"recipients":[3],"message":"API thing with into for Each is and : define specific a as defining methods for a methods the this by ; bundle tapping lifecycle methods can a also can to custom the existence. ... your powerful element. create Elements way special interesting times of Think definition. , element of on their These properties are appropriately element the named functionality  tailored the callbacks you that has elements name about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-3","active":false,"date":"2016-06-15T11:16:53.162Z","sender":2,"recipients":[0],"message":"powerful way with element. the into specific Each , element lifecycle tapping by Elements and methods existence. to defining methods methods : are named the callbacks special Think as tailored bundle custom your for ... the their a create API can a also this of define definition. ; for interesting on times of properties These appropriately element the has functionality  a name can you that is elements and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-4","active":false,"date":"2016-06-16T01:16:53.162Z","sender":3,"recipients":[4,2],"message":"and functionality the can a the methods Elements , you the named purpose by bundle These with powerful callbacks element is : on has for elements special define also can name this as API ; their for a create to way a your element. of Think definition. ... element tapping into methods and properties defining interesting times of existence. methods  tailored are appropriately lifecycle that Each specific custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-5","active":false,"date":"2016-06-14T08:16:53.162Z","sender":2,"recipients":[0,1],"message":"and definition. purpose API the into powerful on ... can of can appropriately bundle for element existence. a way by times ; their These functionality the special and also that methods element. is elements : custom about name Think to of with as this a create a , for the your Elements define properties defining methods element tapping interesting methods  tailored are named you lifecycle callbacks Each has specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-6","active":false,"date":"2016-06-14T02:16:53.162Z","sender":3,"recipients":[2,1],"message":"a for the of element. this with a ; tailored into on Elements defining tapping These by the powerful functionality interesting : callbacks can is as special define also to specific elements your custom , create the of API can way a methods for times Think definition. ... element their existence. methods and properties methods are element appropriately named the  lifecycle bundle Each you that has name and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-7","active":false,"date":"2016-06-14T00:16:53.162Z","sender":3,"recipients":[0],"message":"definition. element. special into to defining powerful existence. ; methods by properties tailored on lifecycle Elements callbacks their functionality this as : is elements for methods about thing for can the element your also , API define a create tapping way a interesting times of Think of ... These the are methods and appropriately named the element the with Each  has bundle can you that a specific custom name and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-5-8","active":false,"date":"2016-06-15T05:16:53.162Z","sender":2,"recipients":[0],"message":"name Think elements Elements their interesting create into ... a of definition. for on properties about by functionality named is Each : has specific thing this a way the methods can element. your for , API powerful a also to define special as methods tapping times of ; element the existence. methods and These defining are element the with appropriately  tailored bundle can you that the lifecycle custom callbacks and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-6","lastDate":"2016-06-16T14:16:53.162Z","avatar":3,"participants":[3,0],"checked":false,"open":false,"subject":"details uber opportunity","menuItem":"inbox","active":false,"messages":[{"id":"thread-7-6-0","active":false,"date":"2016-06-16T08:16:53.162Z","sender":3,"recipients":[0],"message":"for tailored times this the bundle Each defining : element of a way powerful the API Think element of named lifecycle ; can tapping for you that define as name a about the methods , your element. Elements create to can a also special methods into definition. ... interesting their on existence. and properties These by methods the with functionality  are appropriately callbacks has specific is elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-7","lastDate":"2016-06-16T14:16:53.162Z","avatar":0,"participants":[0,2],"checked":false,"open":false,"subject":"opportunity love change","menuItem":"inbox","active":false,"messages":[{"id":"thread-7-7-0","active":false,"date":"2016-06-16T07:16:53.162Z","sender":2,"recipients":[0],"message":"on element These and thing create define a , a the Elements appropriately of powerful of by their are methods lifecycle ... into the definition. methods is Each this specific name element. purpose properties ; API for a your to way can as also special Think for : element tapping interesting times and existence. defining methods named the with functionality  tailored bundle can you that callbacks elements custom about has the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-1","active":false,"date":"2016-06-16T03:16:53.162Z","sender":0,"recipients":[2],"message":"properties are can Think can this also create , methods that of element about API callbacks element the named times interesting ; into tapping the lifecycle of define tailored has specific as the existence. ... for powerful a your to way a element. Elements special for definition. : their the on methods and These defining by methods appropriately with functionality  Each bundle a you name is elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-2","active":false,"date":"2016-06-15T23:16:53.162Z","sender":2,"recipients":[0],"message":"Think create your thing methods that to into , lifecycle and for for are bundle functionality appropriately element of the of ; is elements has custom about define a can powerful API purpose methods : element. Elements also special tapping way a as this interesting times definition. ... their the on existence. and properties defining by element the with These  tailored methods can you named callbacks Each a specific name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-3","active":false,"date":"2016-06-15T02:16:53.162Z","sender":2,"recipients":[0],"message":"for a methods can definition. as functionality into , defining Think interesting element is about the tapping existence. These times named ; the the for methods this tailored also elements name powerful your API : their element. a create to way Elements define special of of are ... appropriately the on methods and properties lifecycle by element callbacks with Each  has bundle can you that a specific custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-4","active":false,"date":"2016-06-15T05:16:53.162Z","sender":2,"recipients":[0],"message":"on their is also has way create that : powerful tapping Think appropriately interesting define properties and purpose lifecycle of are , tailored the bundle can name custom can defining Elements element. your for ; API special a methods to for a as this of into definition. ... element the times methods existence. These methods by element the with functionality  named callbacks Each you a specific elements and about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-5","active":false,"date":"2016-06-15T21:16:53.162Z","sender":0,"recipients":[2],"message":"to the existence. a bundle special you about ; of and element as by methods the the defining functionality times and , Think tapping for elements specific a also way for These your element. : API powerful a create Elements can define methods this of into definition. ... element the on methods interesting properties their are appropriately named with lifecycle  tailored callbacks can Each that is has custom name thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-6","active":false,"date":"2016-06-15T01:16:53.162Z","sender":2,"recipients":[0],"message":"defining a These named and into for callbacks ; methods are tapping special bundle lifecycle and specific name the the element ... can elements custom methods has properties a methods Elements on the of : way their a create to powerful API as this for Think definition. , element your element. can also define interesting by times the with functionality  tailored of existence. you that is appropriately Each about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-7","active":false,"date":"2016-06-14T08:16:53.162Z","sender":2,"recipients":[0],"message":"elements purpose can to and a create special : you appropriately These named of Each way powerful thing on by that ; properties with methods of their is has specific Elements name API tailored , for your a element. can also a as this define Think definition. ... element the methods for tapping into defining interesting element the times functionality  existence. bundle methods are the lifecycle callbacks custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-7-8","active":false,"date":"2016-06-14T10:16:53.162Z","sender":2,"recipients":[0],"message":"by your can powerful name a appropriately on ; methods their methods element. element named Elements properties bundle you that Each : this a for has API for elements thing purpose defining also define , special methods a create to way tapping as into of Think definition. ... interesting the times of and existence. These are element the with functionality  tailored the can lifecycle callbacks is specific custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-8","lastDate":"2016-06-16T14:16:53.162Z","avatar":2,"participants":[2,3],"checked":false,"open":false,"subject":"approach job change","menuItem":"inbox","active":false,"messages":[{"id":"thread-7-8-0","active":false,"date":"2016-06-16T06:16:53.162Z","sender":3,"recipients":[2],"message":"also with lifecycle the can functionality named methods ; name to appropriately their methods methods These callbacks bundle about definition. and : create for your purpose the define special can Elements element. for tapping , API powerful a into interesting way a as this of Think times ... element of on existence. and properties defining by element are the Each  tailored has a you that is elements custom specific thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-1","active":false,"date":"2016-06-15T21:16:53.162Z","sender":2,"recipients":[3],"message":"element. purpose by defining bundle this for Think ... to that define into methods tailored These existence. their are and on : appropriately tapping the the callbacks custom also of thing and your for , way a properties create powerful API a as Elements can special definition. ; element methods interesting methods times of named the element lifecycle with functionality  Each has can you a is elements specific about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-2","active":false,"date":"2016-06-15T17:16:53.162Z","sender":2,"recipients":[3],"message":"tapping specific methods as element. that methods element , tailored create callbacks appropriately the Think Elements and purpose define times interesting ; into of properties the with bundle Each can a name your and : powerful their a API to way a for this of also definition. ... special methods on for existence. These defining by element are named functionality  the lifecycle can you has is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-3","active":false,"date":"2016-06-15T20:16:53.162Z","sender":2,"recipients":[3],"message":"of Elements These also can properties with are : a by special specific for that definition. API their appropriately times interesting , into a you methods is define a elements custom element. the Think ; your powerful for create to way tapping as this of existence. methods ... element the on methods and named defining the element the lifecycle functionality  tailored bundle can callbacks Each has name and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-4","active":false,"date":"2016-06-16T02:16:53.162Z","sender":2,"recipients":[3],"message":"your of create you this as appropriately tailored ; lifecycle Think define has by defining for a for definition. the element : their element. on functionality special Each specific can elements purpose the Elements ... API powerful a also to way a methods tapping into interesting times , of existence. These methods and properties methods are element the with named  callbacks bundle can name that is and custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-5","active":false,"date":"2016-06-14T12:16:53.162Z","sender":2,"recipients":[3],"message":"API element appropriately the on methods to a ... tapping you a is Elements These callbacks the powerful by Think interesting , named lifecycle Each tailored create define also can and element. your the ; their for a special for way into as this of times definition. : of existence. methods methods and properties defining are element the with functionality  has bundle can specific that name elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-6","active":false,"date":"2016-06-14T23:16:53.162Z","sender":2,"recipients":[3],"message":"for the API lifecycle by tailored elements with , methods also These element Each appropriately named can properties and methods interesting : into the for custom this to about can Elements create purpose defining ; your powerful a element. define way a as special of Think definition. ... element tapping on times of their existence. methods are the callbacks functionality  has bundle a you that is specific name and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-7","active":false,"date":"2016-06-14T07:16:53.162Z","sender":2,"recipients":[3],"message":"powerful Elements this appropriately a bundle the definition. , defining the element a a that These methods their by times interesting ; and the callbacks has special Think elements name thing create purpose existence. : API for your element. to way can as also of define methods ... for tapping on methods into properties of are element named with functionality  tailored lifecycle can you Each is specific custom about and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-8-8","active":false,"date":"2016-06-15T00:16:53.162Z","sender":2,"recipients":[3],"message":"the Think that name has methods the element ; on powerful for defining create These can existence. their the are interesting , appropriately properties functionality methods the tailored also can Elements element. your for ... Each specific custom a by way to as this of a definition. : element API define special and tapping into times of methods with named  lifecycle bundle callbacks you a is elements and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-7-9","lastDate":"2016-06-16T14:16:53.162Z","avatar":0,"participants":[0,1,2,4],"checked":false,"open":false,"subject":"opportunity job world","menuItem":"done","active":false,"messages":[{"id":"thread-7-9-0","active":false,"date":"2016-06-16T05:16:53.162Z","sender":1,"recipients":[2,4],"message":"and API a existence. element defining also bundle , times Elements your Think methods a These custom to of on interesting : into tapping for are definition. appropriately the the you as has that ; about the element create powerful way for element. this can define special ... of the their methods and properties methods by named lifecycle with functionality  tailored callbacks can Each a is elements specific name thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-7-9-1","active":false,"date":"2016-06-16T04:16:53.162Z","sender":2,"recipients":[4],"message":"appropriately their elements methods you element properties on : functionality interesting way custom API the Elements the defining for are named , can callbacks has methods a to about the These element. your can ... also powerful a create define special a as this of Think definition. ; for tapping into times and of existence. by element methods with the  tailored bundle lifecycle Each that is specific name and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-8-0","lastDate":"2016-06-15T14:16:53.166Z","avatar":2,"participants":[2,1],"checked":false,"open":false,"subject":"new change awesome","menuItem":"done","active":false,"messages":[{"id":"thread-8-0-0","active":false,"date":"2016-06-15T14:16:53.166Z","sender":1,"recipients":[2],"message":"of by way into define a custom properties : API of can the definition. named These special to the Think times , their tapping for methods existence. methods also element the element. your methods ; and powerful can create is and this interesting as a for Elements ... are appropriately on the lifecycle callbacks defining Each element has with functionality  tailored bundle a you that specific elements name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-1","active":false,"date":"2016-06-15T07:16:53.166Z","sender":2,"recipients":[1],"message":"purpose the for name can and Each methods ... times of functionality their tapping your the properties appropriately the bundle callbacks , has elements and as to define create API element. These Elements for : can powerful a also special way a methods this into Think definition. ; element interesting on methods of existence. defining by element are with named  tailored lifecycle a you that is specific custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-2","active":false,"date":"2016-06-15T08:16:53.166Z","sender":2,"recipients":[1],"message":"methods their named a properties the this and ... you can that custom Elements powerful define way lifecycle of a interesting : into existence. for and methods These on can tailored element. bundle of , has specific thing purpose with to create as API for Think definition. ; element your also special methods tapping defining by element the times functionality  are appropriately the callbacks Each is elements a about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-3","active":false,"date":"2016-06-14T15:16:53.166Z","sender":2,"recipients":[1],"message":"interesting specific with way element as Think defining ; appropriately and definition. Elements elements a element. callbacks their of times on ... into by can a custom and powerful API the the your for , can also define create to special a methods this of for tapping : existence. These methods methods are properties named the element the lifecycle functionality  tailored bundle Each you that is has name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-4","active":false,"date":"2016-06-14T00:16:53.166Z","sender":1,"recipients":[2],"message":"methods into tapping thing about element a is : callbacks of on appropriately specific a These purpose lifecycle defining by the ... also functionality named that and define element. methods Elements can your for , API powerful special create to way a as this methods Think definition. ; for the interesting times and properties of their element existence. with are  tailored bundle can you the Each elements custom has name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-5","active":false,"date":"2016-06-15T13:16:53.166Z","sender":2,"recipients":[1],"message":"on existence. and about also methods tailored functionality : element named and can are methods a way a defining times interesting , of the create These this define methods as you to your purpose ... their powerful API for element. Elements a can special of Think definition. ; for tapping into appropriately the properties lifecycle by element the with callbacks  Each bundle has specific that is elements custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-6","active":false,"date":"2016-06-13T07:16:53.166Z","sender":1,"recipients":[2],"message":"methods define way thing specific of Think callbacks , lifecycle for custom for also methods These name a interesting you to : with properties functionality their element tailored are appropriately Elements can this about ; API as a and the times create powerful your element. can definition. ... special the on methods and tapping defining by element the into of  existence. bundle named the that is elements Each has a purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-7","active":false,"date":"2016-06-15T02:16:53.166Z","sender":1,"recipients":[2],"message":"to and element defining the Think into this ; you can is Elements the a a on API of times interesting : for definition. bundle methods special named the that elements as specific custom ... the their a create powerful way your element. also of define for , element tapping existence. methods and properties These by methods are with functionality  tailored appropriately can lifecycle callbacks Each has name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-0-8","active":false,"date":"2016-06-14T03:16:53.166Z","sender":1,"recipients":[2],"message":"tapping These existence. a the are properties special : your way defining definition. a methods on methods API element. for this ; purpose named interesting times element appropriately to create the tailored can you , powerful their Elements can also define methods as for of Think into ... of the lifecycle callbacks and Each has by element a with functionality  specific bundle name and that is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-8-1","lastDate":"2016-06-15T14:16:53.166Z","avatar":0,"participants":[0,4],"checked":false,"open":false,"subject":"details love approach","menuItem":"inbox","active":false,"messages":[{"id":"thread-8-1-0","active":false,"date":"2016-06-15T13:16:53.166Z","sender":0,"recipients":[4],"message":"the element. bundle elements has tapping interesting can : specific a API you element is named existence. their way the the , properties callbacks on the custom this also can Elements a your about ; and create of a to powerful for as define of Think definition. ... special methods for methods and into defining by element times with functionality  tailored These methods are that appropriately lifecycle Each name thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-1-1","active":false,"date":"2016-06-15T04:16:53.166Z","sender":0,"recipients":[4],"message":"can by this you with purpose the has : defining of tapping a times powerful callbacks methods properties of are on , the named Think the specific as thing and API These your for ; element. Elements also create to way a define special methods for definition. ... element into interesting methods and their existence. appropriately element lifecycle Each functionality  tailored bundle can a that is elements custom about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-1-2","active":false,"date":"2016-06-15T02:16:53.166Z","sender":4,"recipients":[0],"message":"your custom on interesting can create is Elements , way specific named of with the by about the API the and ... properties appropriately this functionality you a also elements a powerful purpose defining : for element. define special to methods a as for tapping Think definition. ; element into times methods of their existence. These element methods are lifecycle  tailored bundle can callbacks that Each has name and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-1-3","active":false,"date":"2016-06-14T23:16:53.166Z","sender":0,"recipients":[4],"message":"about with the and a tailored interesting also ... properties their a the times appropriately element named the lifecycle that elements : methods tapping element definition. a to name can Elements create API existence. , for powerful your element. define way special as this of Think methods ; for the on into and of defining by These methods are functionality  callbacks bundle can you Each is has custom specific thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-8-2","lastDate":"2016-06-15T14:16:53.166Z","avatar":1,"participants":[1,2],"checked":false,"open":false,"subject":"approach job new","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-8-2-0","active":false,"date":"2016-06-15T12:16:53.166Z","sender":1,"recipients":[2],"message":"interesting can methods Each is element into a ; are the appropriately for the this as existence. way bundle to of , These with defining properties methods element also callbacks definition. element. of you : elements thing and create purpose times a powerful API your Think Elements ... define the on special and methods for by tapping their named functionality  tailored lifecycle can has that a specific custom about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-2-1","active":false,"date":"2016-06-15T07:16:53.166Z","sender":2,"recipients":[1],"message":"Elements also the special for about functionality of : lifecycle defining a times on name definition. tapping your this and named ; into with way create you elements thing the These element. can define ... API powerful a methods to for interesting as of their Think existence. , element methods are methods appropriately properties the by element the callbacks Each  tailored bundle can has that is a custom specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-2-2","active":false,"date":"2016-06-15T10:16:53.166Z","sender":1,"recipients":[2],"message":"the with callbacks to your about has as : bundle the into appropriately are API times that powerful of elements methods , named the for on special the lifecycle can this Each specific name ; thing a tailored create for way a element. Elements also Think definition. ... element define methods methods and properties defining by element tapping interesting functionality  of their can you existence. is These custom a and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-8-3","lastDate":"2016-06-15T14:16:53.166Z","avatar":3,"participants":[3,1,0,2,4],"checked":false,"open":false,"subject":"help love new","menuItem":"done","active":false,"messages":[{"id":"thread-8-3-0","active":false,"date":"2016-06-15T11:16:53.166Z","sender":1,"recipients":[0,3],"message":"times define this element. a has These name ... into with thing powerful methods methods properties Think their of named interesting : lifecycle bundle way can a you the on Elements can your for , API also special create to for a as tapping of existence. definition. ; element the methods are and appropriately defining by element the the functionality  tailored callbacks Each specific that is elements custom about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-1","active":false,"date":"2016-06-15T10:16:53.166Z","sender":3,"recipients":[1,0],"message":"properties lifecycle about with into a this element. ; powerful tailored defining element and the on that your to can a : existence. tapping for methods special by functionality can Think you has of , elements name purpose of create way a as API for Elements definition. ... also the define methods interesting times their These element methods are appropriately  named bundle the callbacks Each is specific custom and thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-2","active":false,"date":"2016-06-14T16:16:53.166Z","sender":1,"recipients":[0],"message":"existence. Think the powerful elements that as API : a name can and interesting methods Elements is the of definition. and , element about for a way define specific the on element. your for ... can also a create to special methods tapping this of into times ; element their These methods are properties defining by appropriately the with functionality  tailored bundle named you lifecycle callbacks Each custom has thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-3","active":false,"date":"2016-06-14T13:16:53.166Z","sender":3,"recipients":[1],"message":"their that element. are a has tapping way ; tailored the named with is of the Think These defining definition. callbacks , of Each as a special define also bundle create and powerful properties : API for your Elements to can methods for this into interesting times ... element the on methods and existence. methods by element the appropriately functionality  lifecycle a can you specific name elements custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-4","active":false,"date":"2016-06-15T09:16:53.166Z","sender":3,"recipients":[2],"message":"API for appropriately about the Elements existence. define : the a methods name functionality way interesting purpose lifecycle of properties These , and on with named special you that element elements custom thing for ; create their a powerful to your element. as this of Think definition. ... can also tapping methods into times defining by element the methods are  tailored bundle can callbacks Each is has a specific and the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-5","active":false,"date":"2016-06-15T05:16:53.166Z","sender":0,"recipients":[3],"message":"purpose of lifecycle way Think interesting appropriately with , also can element defining Each methods by create their the times the ; the has for this as bundle name you Elements a and for ... API powerful your element. to define a special methods of tapping definition. : element into on methods existence. properties These are named callbacks a functionality  tailored specific can and that is elements custom about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-6","active":false,"date":"2016-06-14T12:16:53.166Z","sender":1,"recipients":[0],"message":"the custom and a bundle powerful functionality interesting , by a tapping properties are times methods existence. their of API defining : into named the the has define also can for These your element. ; Elements special for create to way a as this of Think definition. ... element the on methods and methods appropriately lifecycle element callbacks with Each  tailored specific can you that is elements name about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-7","active":false,"date":"2016-06-14T20:16:53.166Z","sender":3,"recipients":[0],"message":"specific way with can element times tailored your ; named lifecycle of bundle you element. Elements powerful tapping of as the , by element for defining and on existence. can These methods the definition. : functionality about this create to the interesting a a API Think for ... also the define methods special properties methods into their are appropriately callbacks  Each has a name that is elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-3-8","active":false,"date":"2016-06-12T11:16:53.166Z","sender":3,"recipients":[1,2],"message":"powerful for you a element. with can callbacks ; by Elements specific bundle definition. are These is API element lifecycle properties : into and on elements as define a can has about thing and ... purpose the your create to way also special this of Think methods , element the for methods tapping interesting defining times of their existence. functionality  tailored methods appropriately named that the Each custom a name the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-8-4","lastDate":"2016-06-15T14:16:53.166Z","avatar":1,"participants":[1,0],"checked":false,"open":false,"subject":"opportunity love help","menuItem":"inbox","active":false,"messages":[{"id":"thread-8-4-0","active":false,"date":"2016-06-15T10:16:53.166Z","sender":1,"recipients":[0],"message":"the way can existence. the API Each as : custom this about your thing These for Elements elements and to you , into tapping interesting methods definition. times also with tailored a appropriately callbacks ; has the and create a powerful element. can define of Think special ... element for on methods of properties defining by element their methods functionality  are bundle named the that is lifecycle a specific name purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-4-1","active":false,"date":"2016-06-15T08:16:53.166Z","sender":1,"recipients":[0],"message":"the Think for properties a methods name Elements : elements create to special also way the existence. the of a for ... defining by can is define this tapping can into element. your interesting ; API powerful times their These methods a as are of appropriately definition. , element named on methods and lifecycle callbacks Each element the with functionality  tailored bundle has you that specific and custom about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-4-2","active":false,"date":"2016-06-14T15:16:53.166Z","sender":1,"recipients":[0],"message":"by and name can a times also bundle : defining tapping interesting definition. your to special existence. the tailored appropriately named , methods the for methods that define elements custom on a specific of ... way powerful purpose properties create API a as this for Think element. ; element the Elements into and of their These element methods with functionality  are lifecycle can you callbacks is Each has about thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-4-3","active":false,"date":"2016-06-14T19:16:53.166Z","sender":1,"recipients":[0],"message":"the times about of can on API way ; tailored with the the also can powerful has a is and for , named a into as their element properties elements Elements your Think for : element. define special create to methods tapping interesting this of existence. definition. ... These the methods methods and are defining by element appropriately lifecycle functionality  callbacks bundle Each you that a specific custom name thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-8-4-4","active":false,"date":"2016-06-13T21:16:53.166Z","sender":1,"recipients":[0],"message":"custom interesting for a is this the a ; for to tapping way definition. can API your of lifecycle as These , on named callbacks Each special create element can Elements you the existence. : element. powerful also define methods into times their methods of Think are ... element the appropriately methods and properties defining by has the with functionality  tailored bundle a specific that name elements and about thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-8-5","lastDate":"2016-06-15T14:16:53.166Z","avatar":1,"participants":[1,0,3],"checked":false,"open":false,"subject":"awesome love new","menuItem":"done","active":false,"messages":[{"id":"thread-8-5-0","active":false,"date":"2016-06-15T09:16:53.166Z","sender":0,"recipients":[3,1],"message":"existence. on specific this about way API for ... lifecycle methods special appropriately properties to that the element powerful times interesting : by defining methods functionality bundle the custom can the element has thing , and purpose of create a for a as your of Think definition. ; element. Elements also define and methods tapping into their These with are  tailored named can you callbacks is elements Each a name the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-9-0","lastDate":"2016-06-14T14:16:53.167Z","avatar":0,"participants":[0,1],"checked":false,"open":false,"subject":"details love change","menuItem":"ruka2013","active":false,"messages":[{"id":"thread-9-0-0","active":false,"date":"2016-06-14T14:16:53.167Z","sender":0,"recipients":[1],"message":"times this methods also a your to tailored : about their element. into the methods and of the defining callbacks the ... with powerful for API special define functionality can the definition. Elements for , methods tapping a create interesting way a as of existence. Think These ; element are on appropriately named properties lifecycle by element Each has specific  name bundle can you that is elements custom and thing purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-0-1","active":false,"date":"2016-06-14T09:16:53.167Z","sender":1,"recipients":[0],"message":"API for powerful by can specific are functionality ; methods is Elements way this Each These your their of Think a ... on tapping properties with special define has can thing element. the existence. : for also a create to into interesting as times of methods definition. , element the appropriately methods and named defining the element the lifecycle callbacks  tailored bundle a you that name elements custom about and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-0-2","active":false,"date":"2016-06-14T01:16:53.167Z","sender":1,"recipients":[0],"message":"methods for the of lifecycle your Each a , specific the way on are tailored tapping the can you the definition. ; as is has about thing a element. bundle Elements can also for : API powerful define create to special a into this of Think interesting ... element times their methods and properties defining by element existence. with functionality  These methods appropriately named that callbacks elements custom name and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-0-3","active":false,"date":"2016-06-14T06:16:53.167Z","sender":1,"recipients":[0],"message":"callbacks the you way Elements appropriately can thing , and a has this a methods functionality with for of purpose the ; properties methods times a tailored define named is custom element. your API : their powerful also create to special methods as for of Think definition. ... element the on tapping and into defining by element interesting existence. These  are bundle can lifecycle that Each elements specific about name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-0-4","active":false,"date":"2016-06-14T06:16:53.167Z","sender":1,"recipients":[0],"message":"a the custom element their for functionality on , way into elements define element. Each These tailored that has a powerful ... thing as appropriately methods special with the times by existence. callbacks element ; API about name Think of the interesting a this to create definition. : for the your methods and properties defining Elements can also tapping of  methods bundle can you are is named lifecycle specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-0-5","active":false,"date":"2016-06-13T17:16:53.167Z","sender":1,"recipients":[0],"message":"with for callbacks tailored to custom API thing , element into interesting These the element bundle existence. their create the named ... you that by methods Each definition. also this way elements your about : name a of powerful element. Elements a as can of Think define ; special the on methods and properties defining for tapping times methods functionality  are appropriately can the lifecycle is has a specific and purpose public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-0-6","active":false,"date":"2016-06-13T13:16:53.167Z","sender":1,"recipients":[0],"message":"functionality can a and this on way Think , is interesting API appropriately their methods bundle existence. methods are named the : the callbacks for Each special thing the a definition. specific name as ... and purpose tailored create to powerful a for your of element. Elements ; element also define methods tapping properties defining by element into with times  of These can you that lifecycle elements custom about has the public ","conversationExpanded":false,"expanded":false,"advanced":false}]},{"id":"thread-9-1","lastDate":"2016-06-14T14:16:53.167Z","avatar":2,"participants":[2,1,0,3],"checked":false,"open":false,"subject":"opportunity love change","menuItem":"done","active":false,"messages":[{"id":"thread-9-1-0","active":false,"date":"2016-06-14T13:16:53.167Z","sender":1,"recipients":[3],"message":"named that has thing also can element elements , callbacks specific create a by you These existence. for is the interesting : the tapping about methods defining methods a on definition. Think and purpose ; their powerful API your to way a as this of element. Elements ... element the can define and properties special for into times with functionality  tailored bundle of methods are appropriately lifecycle custom Each name the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-1-1","active":false,"date":"2016-06-14T03:16:53.167Z","sender":1,"recipients":[2,3],"message":"properties tailored also and a callbacks elements a , times can as tapping create you by and way methods with on : into appropriately for element definition. of named can Elements element. has about ... purpose their a powerful to API for your this define Think special ; methods the interesting of existence. These defining methods element the are functionality  the bundle lifecycle Each that is specific custom name thing the public ","conversationExpanded":false,"expanded":false,"advanced":false},{"id":"thread-9-1-2","active":false,"date":"2016-06-14T05:16:53.167Z","sender":2,"recipients":[0,1],"message":"purpose a the into functionality named methods is ... element. bundle for appropriately are this name for a on of interesting ; their and by tailored can define also can Elements elements has about : of specific and as way times to create powerful API Think definition. , element your special methods tapping properties defining existence. element the with These  methods the lifecycle you that callbacks Each custom a thing the public ","conversationExpanded":false,"expanded":false,"advanced":false}]}];const users=[{email:'info@staypositive.ru',title:'Dmitry Sorin',avatar:{'1x':'https://avatars2.githubusercontent.com/u/73191?v=3&s=24','2x':'https://avatars2.githubusercontent.com/u/73191?v=3&s=48'}},{email:'cjihrig@github.com',title:'Colin Ihrig',avatar:{'1x':'https://avatars3.githubusercontent.com/u/2512748?v=3&s=24','2x':'https://avatars3.githubusercontent.com/u/2512748?v=3&s=48'}},{email:'isaacs@npm.com',title:'Isaac Z. Schlueter',avatar:{'1x':'https://avatars3.githubusercontent.com/u/9287?v=3&s=24','2x':'https://avatars3.githubusercontent.com/u/9287?v=3&s=48'}},{email:'vladimir.kurchatkin@gmail.com',title:'Vladimir Kurchatkin',avatar:{'1x':'https://avatars1.githubusercontent.com/u/2993861?v=3&s=24','2x':'https://avatars1.githubusercontent.com/u/2993861?v=3&s=48'}},{email:'miksago@gmail.com',title:'Em Smith',avatar:{'1x':'https://avatars3.githubusercontent.com/u/30827?v=3&s=24','2x':'https://avatars3.githubusercontent.com/u/30827?v=3&s=48'}}];exports.default={menu,tasks,activeMode,users};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _redux = __webpack_require__(3);
	
	var _tasks = __webpack_require__(20);
	
	var _tasks2 = _interopRequireDefault(_tasks);
	
	var _menu = __webpack_require__(21);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _mode = __webpack_require__(22);
	
	var _mode2 = _interopRequireDefault(_mode);
	
	var _users = __webpack_require__(23);
	
	var _users2 = _interopRequireDefault(_users);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	    tasks: _tasks2.default,
	    menu: _menu2.default,
	    activeMode: _mode2.default,
	    users: _users2.default
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (state = [], action) {
	    switch (action.type) {
	        case 'TOGGLE_SELECT_TASK':
	            return state.map(task => {
	                return task.id === action.payload.id ? _extends({}, task, { checked: !task.checked }) : task;
	            });
	
	        case 'UNCHECK_TASKS_ALL':
	            return state.map(task => _extends({}, task, { checked: false }));
	
	        case 'TOGGLE_OPEN_CLOSE_TASK':
	            return state.map(task => {
	                return task.id === action.payload.id ? _extends({}, task, { open: !task.open }) : _extends({}, task, { open: false });
	            });
	
	        case 'SELECT_NAV_TAG':
	            return state.map(task => _extends({}, task, { open: false }));
	
	        case 'TOGGLE_OPEN_MESSAGE':
	            return state.map(task => {
	                if (task.id !== action.payload.taskId) {
	                    return task;
	                }
	
	                const messages = task.messages.map(message => {
	                    return message.id === action.payload.messageId ? _extends({}, message, { expanded: !message.expanded, active: message.expanded }) : _extends({}, message, { expanded: false, active: message.expanded });
	                });
	
	                return _extends({}, task, { messages });
	            });
	
	        default:
	            return state;
	    }
	};
	
	;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = function (state = [], action) {
	    switch (action.type) {
	        case 'SELECT_NAV_TAG':
	            const { groupId, itemId } = action.payload;
	            const groups = state.groups.map(group => {
	                group.items = group.items.map(item => {
	                    item.active = group.id === groupId && item.id === itemId;
	                    return item;
	                });
	
	                return group;
	            });
	
	            return Object.assign({}, state, { groups });
	
	        case 'TOGGLE_NAV_MENU':
	            return _extends({}, state, {
	                show: !state.show
	            });
	
	        default:
	            return state;
	    }
	};
	
	var _config = __webpack_require__(18);
	
	;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (state = [], action) {
	    switch (action.type) {
	        default:
	            return state;
	    }
	};
	
	;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (state = [], action) {
	    switch (action.type) {
	        default:
	            return state;
	    }
	};
	
	;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (store) {
	    const elem = document.createElement(CUSTOM_TAG_NAME);
	    elem.store = store;
	
	    return elem;
	};
	
	var _inboxSampleHeader = __webpack_require__(25);
	
	var _inboxSampleHeader2 = _interopRequireDefault(_inboxSampleHeader);
	
	var _inboxSampleNav = __webpack_require__(31);
	
	var _inboxSampleNav2 = _interopRequireDefault(_inboxSampleNav);
	
	var _inboxSampleTasks = __webpack_require__(37);
	
	var _inboxSampleTasks2 = _interopRequireDefault(_inboxSampleTasks);
	
	var _style = __webpack_require__(51);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-root';
	const ESC_KEYCODE = 27;
	
	class InboxSampleRoot extends HTMLElement {
	
	    createdCallback() {
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const clone = document.importNode(template.content, true);
	        this.appendChild(clone);
	
	        // listen to ESC press to clear app state
	        document.addEventListener('keyup', evt => {
	            if (evt.keyCode === ESC_KEYCODE && confirm('Reset app state?')) {
	                sessionStorage.clear();
	                window.location.reload();
	            }
	        }, false);
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleRoot);
	
	;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(26);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _actions = __webpack_require__(27);
	
	var _utils = __webpack_require__(28);
	
	var _inboxSampleHeaderactions = __webpack_require__(29);
	
	var _inboxSampleHeaderactions2 = _interopRequireDefault(_inboxSampleHeaderactions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-header';
	
	class InboxSampleHeader extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	
	        // pre-build HTML
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const cloneFragment = document.importNode(template.content, true);
	
	        this.appendChild(cloneFragment);
	
	        this._menuTogglerElem = this.querySelector('.menu-toggler');
	        this._mainActionElem = this.querySelector('.mainaction');
	        this._titleElem = this.querySelector('.title');
	
	        this._onMenuToggleClick = this._onMenuToggleClick.bind(this);
	        this._onBackClick = this._onBackClick.bind(this);
	        this._reRender();
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	
	        this._menuTogglerElem.addEventListener('click', this._onMenuToggleClick, false);
	        this._mainActionElem.addEventListener('click', this._onBackClick, false);
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	
	        this._menuTogglerElem.removeEventListener('click', this._onMenuToggleClick);
	        this._mainActionElem.removeEventListener('click', this._onBackClick);
	    }
	
	    _onStoreChange() {
	        this._reRender();
	    }
	
	    _reRender() {
	        const state = _store2.default.getState();
	        const isAction = (0, _utils.calcIsAction)(state);
	
	        this.classList.toggle('action', isAction);
	
	        if (isAction) {
	            this._titleElem.innerHTML = 'Back';
	            this.style.background = 'none';
	        } else {
	            const activeNavGroupItem = (0, _utils.calcActiveNavGroupItem)(state);
	
	            this.style.background = `#${ activeNavGroupItem.color }`;
	            this._titleElem.innerHTML = activeNavGroupItem.title;
	        }
	
	        this._updateServicesIcons(isAction);
	    }
	
	    _onMenuToggleClick() {
	        _store2.default.dispatch((0, _actions.toggleNavMenu)());
	    }
	
	    _onBackClick() {
	        const state = _store2.default.getState();
	        const isAction = (0, _utils.calcIsAction)(state);
	
	        if (isAction) {
	            _store2.default.dispatch((0, _actions.uncheckAllTasks)());
	        }
	    }
	
	    _updateServicesIcons(useDark) {
	        const from = useDark ? /white/g : /black/g;
	        const to = useDark ? 'black' : 'white';
	
	        // probably it's a bit early to use for..of for NodeLists
	        [].forEach.call(this.querySelectorAll('.services__service img'), serviceImg => {
	            serviceImg.srcset = serviceImg.srcset.replace(from, to);
	        });
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeader);

/***/ },
/* 26 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.selectNavTag = selectNavTag;
	exports.toggleNavMenu = toggleNavMenu;
	exports.toggleSelectTask = toggleSelectTask;
	exports.uncheckAllTasks = uncheckAllTasks;
	exports.toggleOpenTask = toggleOpenTask;
	exports.toggleOpenMessage = toggleOpenMessage;
	function selectNavTag(groupId, itemId) {
	    return {
	        type: 'SELECT_NAV_TAG',
	        payload: { groupId, itemId }
	    };
	}
	
	function toggleNavMenu() {
	    return {
	        type: 'TOGGLE_NAV_MENU'
	    };
	}
	
	function toggleSelectTask(id) {
	    return {
	        type: 'TOGGLE_SELECT_TASK',
	        payload: { id }
	    };
	}
	
	function uncheckAllTasks() {
	    return {
	        type: 'UNCHECK_TASKS_ALL'
	    };
	}
	
	function toggleOpenTask(id) {
	    return {
	        type: 'TOGGLE_OPEN_CLOSE_TASK',
	        payload: { id }
	    };
	}
	
	function toggleOpenMessage(taskId, messageId) {
	    return {
	        type: 'TOGGLE_OPEN_MESSAGE',
	        payload: { taskId, messageId }
	    };
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.generateSrcset = generateSrcset;
	exports.calcActiveNavGroupItem = calcActiveNavGroupItem;
	exports.calcIsAction = calcIsAction;
	function generateSrcset(objSrcset) {
	    return Object.keys(objSrcset).reduce((memo, key) => {
	        memo.push(`${ objSrcset[key] } ${ key }`);
	        return memo;
	    }, []).join(',');
	};
	
	function calcActiveNavGroupItem(state) {
	    let output;
	
	    stuff: for (let group of state.menu.groups) {
	        for (let item of group.items) {
	            if (item.active) {
	                output = item;
	                break stuff;
	            }
	        }
	    }
	
	    return output;
	};
	
	function calcIsAction(state) {
	    return state.tasks.some(task => task.checked);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(30);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _utils = __webpack_require__(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-headeractions';
	
	class InboxSampleHeaderActions extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const cloneFragment = document.importNode(template.content, true);
	        this.appendChild(cloneFragment);
	
	        this._counterElem = this.querySelector('.counter');
	
	        this._reRender();
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	    }
	
	    _onStoreChange() {
	        this._reRender();
	    }
	
	    _reRender() {
	        const state = _store2.default.getState();
	        const { id: activeNavItemId } = (0, _utils.calcActiveNavGroupItem)(state);
	        const isAction = (0, _utils.calcIsAction)(state);
	
	        if (isAction) {
	            const tasksChecked = state.tasks.reduce((memo, task) => {
	                if (task.checked && task.menuItem === activeNavItemId) {
	                    memo++;
	                }
	
	                return memo;
	            }, 0);
	
	            this._counterElem.innerHTML = `${ tasksChecked } selected`;
	            this.classList.toggle('hide', tasksChecked === 0);
	        } else {
	            this.classList.add('hide');
	        }
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleHeaderActions);

/***/ },
/* 30 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _inboxSampleNavgroup = __webpack_require__(32);
	
	var _inboxSampleNavgroup2 = _interopRequireDefault(_inboxSampleNavgroup);
	
	var _style = __webpack_require__(36);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-nav';
	
	class InboxSampleNav extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	
	        // pre-build HTML
	        const state = _store2.default.getState();
	        const templateNavGroup = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	
	        this._updateVisibility();
	
	        state.menu.groups.forEach((group, index) => {
	            const cloneFragment = document.importNode(templateNavGroup.content, true);
	            const navGroup = cloneFragment.querySelector('inbox-sample-navgroup');
	
	            navGroup.id = group.id;
	            navGroup.last = index + 1 === state.menu.groups.length;
	
	            this.appendChild(cloneFragment);
	        });
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	    }
	
	    _onStoreChange() {
	        this._updateVisibility();
	    }
	
	    _updateVisibility() {
	        const state = _store2.default.getState();
	        this.classList.toggle('hidden', !state.menu.show);
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleNav);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _inboxSampleNavgroupitem = __webpack_require__(33);
	
	var _inboxSampleNavgroupitem2 = _interopRequireDefault(_inboxSampleNavgroupitem);
	
	var _style = __webpack_require__(35);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-navgroup';
	
	class InboxSampleNavGroup extends HTMLElement {
	
	    attachedCallback() {
	        // populate HTML
	        const state = _store2.default.getState();
	        const group = state.menu.groups.find(group => group.id === this.id);
	
	        for (let item of group.items) {
	            const navItemElem = document.createElement('inbox-sample-navgroupitem');
	            navItemElem.group = this.id;
	            navItemElem.item = item.id;
	
	            this.appendChild(navItemElem);
	        }
	
	        if (this.last) {
	            this.classList.add('last');
	        }
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleNavGroup);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(34);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _actions = __webpack_require__(27);
	
	var _utils = __webpack_require__(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-navgroupitem';
	
	const findCurrentNavItem = (groupId, itemId) => {
	    const state = _store2.default.getState();
	    const groupIndex = state.menu.groups.findIndex(group => group.id === groupId);
	    const item = state.menu.groups[groupIndex].items.find(item => item.id === itemId);
	
	    return item;
	};
	
	class InboxSampleNavGroupItem extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	        this._onClick = this._onClick.bind(this);
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	
	        // populate HTML
	        const item = findCurrentNavItem(this.group, this.item);
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const cloneFragment = document.importNode(template.content, true);
	
	        const icon = cloneFragment.querySelector('.icon');
	        icon.srcset = (0, _utils.generateSrcset)(item.icon);
	        icon.width = icon.height = 24;
	        icon.src = item.icon['1x'];
	        icon.alt = item.title;
	
	        const text = cloneFragment.querySelector('.text');
	        text.innerHTML = item.title;
	
	        this.appendChild(cloneFragment);
	
	        if (item.active) {
	            this.classList.add('active');
	        }
	
	        this.addEventListener('click', this._onClick, false);
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	        this.removeEventListener('click', this._onClick);
	    }
	
	    // update UI (set text to bold) on state change
	    _onStoreChange() {
	        const item = findCurrentNavItem(this.group, this.item);
	        this.classList.toggle('active', item.active);
	    }
	
	    _onClick() {
	        _store2.default.dispatch((0, _actions.selectNavTag)(this.group, this.item));
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleNavGroupItem);

/***/ },
/* 34 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 35 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(38);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _inboxSampleDaytasks = __webpack_require__(39);
	
	var _inboxSampleDaytasks2 = _interopRequireDefault(_inboxSampleDaytasks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-tasks';
	
	class InboxSampleTasks extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	        this._onTransitionEnd = this._onTransitionEnd.bind(this);
	
	        const state = _store2.default.getState();
	        const threadDays = state.tasks.reduce((memo, task) => {
	            const date = new Date(task.lastDate);
	            const dateStr = `${ date.getFullYear() }.${ date.getMonth() }.${ date.getDate() }`;
	
	            memo.add(dateStr);
	            return memo;
	        }, new Set());
	
	        for (let dateStr of threadDays) {
	            const threadDayElem = document.createElement('inbox-sample-daytasks');
	            const [year, month, day] = dateStr.split('.');
	
	            threadDayElem.year = year;
	            threadDayElem.month = month;
	            threadDayElem.day = day;
	
	            this.appendChild(threadDayElem);
	        }
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	
	        const state = _store2.default.getState();
	        this._showMenuSetting = state.menu.show;
	        this._navElem = document.querySelector('inbox-sample-nav');
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	    }
	
	    _onStoreChange() {
	        const state = _store2.default.getState();
	        const newMenuSetting = state.menu.show;
	
	        if (newMenuSetting !== this._showMenuSetting) {
	            this._showMenuSetting = newMenuSetting;
	
	            if (this._showMenuSetting) {
	                this._changeWidth();
	            } else {
	                this._navElem.addEventListener('transitionend', this._onTransitionEnd, false);
	            }
	        }
	    }
	
	    _onTransitionEnd({ propertyName }) {
	        if (propertyName === 'transform') {
	            this._changeWidth();
	            this._navElem.removeEventListener('transitionend', this._onTransitionEnd);
	        }
	    }
	
	    _changeWidth() {
	        this.classList.toggle('wide', !this._showMenuSetting);
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleTasks);

/***/ },
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(40);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _utils = __webpack_require__(28);
	
	var _inboxSampleTaskslist = __webpack_require__(41);
	
	var _inboxSampleTaskslist2 = _interopRequireDefault(_inboxSampleTaskslist);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-daytasks';
	
	class InboxSampleDayTasks extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	
	        const state = _store2.default.getState();
	        const { id: activeMenuItemId } = (0, _utils.calcActiveNavGroupItem)(state);
	
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const clone = document.importNode(template.content, true);
	
	        const tasksList = clone.querySelector('inbox-sample-taskslist');
	        tasksList.day = this.day;
	        tasksList.month = this.month;
	        tasksList.year = this.year;
	
	        const date = new Date(`${ this.year }-${ this.month }-${ this.day }`);
	        const title = clone.querySelector('.title');
	        title.innerHTML = date.toLocaleDateString();
	
	        this.appendChild(clone);
	        this._updateVisibility();
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	    }
	
	    _onStoreChange() {
	        this._updateVisibility();
	    }
	
	    _updateVisibility() {
	        const state = _store2.default.getState();
	        const { id: activeMenuItemId } = (0, _utils.calcActiveNavGroupItem)(state);
	
	        // check that there are active tasks with `menuItem` set to activeMenuItemId
	        const hasTheseTasks = state.tasks.some(task => {
	            const date = new Date(task.lastDate);
	
	            return task.menuItem === activeMenuItemId && date.getDate() === Number(this.day) && date.getMonth() === Number(this.month) && date.getFullYear() === Number(this.year);
	        });
	
	        this.classList.toggle('hidden', !hasTheseTasks);
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleDayTasks);

/***/ },
/* 40 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(42);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _inboxSampleTask = __webpack_require__(43);
	
	var _inboxSampleTask2 = _interopRequireDefault(_inboxSampleTask);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-taskslist';
	
	class InboxSampleTasksList extends HTMLElement {
	
	    attachedCallback() {
	        const state = _store2.default.getState();
	        const tasks = state.tasks.filter(task => {
	            const date = new Date(task.lastDate);
	
	            return date.getDate() === Number(this.day) && date.getMonth() === Number(this.month) && date.getFullYear() === Number(this.year);
	        });
	
	        for (let task of tasks) {
	            const taskElem = document.createElement('inbox-sample-task');
	            taskElem.id = task.id;
	
	            this.appendChild(taskElem);
	        }
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleTasksList);

/***/ },
/* 42 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(44);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _utils = __webpack_require__(28);
	
	var _actions = __webpack_require__(27);
	
	var _inboxSampleMessages = __webpack_require__(45);
	
	var _inboxSampleMessages2 = _interopRequireDefault(_inboxSampleMessages);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-task';
	
	class InboxSampleTask extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	        this._onTaskCheck = this._onTaskCheck.bind(this);
	        this._onTaskOpen = this._onTaskOpen.bind(this);
	
	        const state = _store2.default.getState();
	        this._task = state.tasks.find(task => task.id === this.id);
	
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const cloneFragment = document.importNode(template.content, true);
	
	        // set avatar icon
	        const avatarElem = cloneFragment.querySelector('.avatar img');
	        const lastUser = state.users[this._task.avatar];
	        avatarElem.srcset = (0, _utils.generateSrcset)(lastUser.avatar);
	
	        // bind to task check actions
	        this._taskCheckElem = cloneFragment.querySelector('.avatar__check');
	        this._taskCheckElem.addEventListener('click', this._onTaskCheck, false);
	        this._taskUncheckElem = cloneFragment.querySelector('.avatar__uncheck');
	        this._taskUncheckElem.addEventListener('click', this._onTaskCheck, false);
	
	        // fill participants field
	        const participantsElem = cloneFragment.querySelector('.participants');
	        const participants = this._task.participants.map(userId => state.users[userId].title);
	        participantsElem.innerHTML = participants.join(', ');
	
	        if (this._task.messages.length > 1) {
	            participantsElem.innerHTML += ` (${ this._task.messages.length })`;
	        }
	
	        participantsElem.title = participantsElem.innerHTML;
	
	        // fill subject field
	        const subjectElem = cloneFragment.querySelector('.text__subject');
	        subjectElem.innerHTML = this._task.subject;
	
	        // fill text field
	        const textFieldElem = cloneFragment.querySelector('.text__review');
	        textFieldElem.innerHTML = this._task.messages[0].message;
	
	        this.appendChild(cloneFragment);
	
	        this._updateVisibility();
	        this._updateCheckedStatus();
	        this._toggleRefMessagesList();
	
	        this.addEventListener('click', this._onTaskOpen, false);
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	
	        // unbind from task check actions
	        this._taskCheckElem.removeEventListener('click', this._onTaskCheck);
	        this._taskUncheckElem.addEventListener('click', this._onTaskCheck);
	
	        this.removeEventListener('click', this._onTaskOpen);
	    }
	
	    _onStoreChange() {
	        this._updateVisibility();
	        this._updateCheckedStatus();
	        this._toggleRefMessagesList();
	    }
	
	    _updateVisibility() {
	        const state = _store2.default.getState();
	        const { id: activeMenuItemId } = (0, _utils.calcActiveNavGroupItem)(state);
	
	        this.classList.toggle('hidden', this._task.menuItem !== activeMenuItemId);
	    }
	
	    _updateCheckedStatus() {
	        const state = _store2.default.getState();
	
	        for (let { id, checked } of state.tasks) {
	            if (this._task.id !== id) {
	                continue;
	            }
	
	            this.classList.toggle('checked', checked);
	        }
	    }
	
	    _toggleRefMessagesList() {
	        const state = _store2.default.getState();
	
	        for (let { id, open, messages } of state.tasks) {
	            if (this._task.id !== id) {
	                continue;
	            }
	
	            const messagesListElem = this.querySelector('inbox-sample-messages');
	
	            if (open) {
	                if (!messagesListElem) {
	                    const newMessagesListElem = document.createElement('inbox-sample-messages');
	                    const openMessage = messages.find(message => message.expanded);
	
	                    newMessagesListElem.task = id;
	                    newMessagesListElem.message = openMessage ? openMessage.id : messages[messages.length - 1].id;
	
	                    newMessagesListElem.classList.add('prerender');
	
	                    this.appendChild(newMessagesListElem);
	                }
	            } else {
	                if (messagesListElem) {
	                    messagesListElem.remove();
	                }
	            }
	
	            this.classList.toggle('open', open);
	        }
	    }
	
	    _onTaskCheck(evt) {
	        _store2.default.dispatch((0, _actions.toggleSelectTask)(this._task.id));
	        evt.stopPropagation();
	    }
	
	    _onTaskOpen() {
	        _store2.default.dispatch((0, _actions.toggleOpenTask)(this._task.id));
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleTask);

/***/ },
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(46);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _inboxSampleMessageslist = __webpack_require__(47);
	
	var _inboxSampleMessageslist2 = _interopRequireDefault(_inboxSampleMessageslist);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-messages';
	
	class InboxSampleMessages extends HTMLElement {
	
	    createdCallback() {
	        this._onTaskAnimated = this._onTaskAnimated.bind(this);
	    }
	
	    attachedCallback() {
	        const state = _store2.default.getState();
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const cloneFragment = document.importNode(template.content, true);
	
	        const headerElem = cloneFragment.querySelector('.header');
	        const { subject } = state.tasks.find(task => task.id === this.task);
	        headerElem.innerHTML = subject;
	
	        const messagesList = cloneFragment.querySelector('inbox-sample-messageslist');
	        messagesList.task = this.task;
	        messagesList.message = this.message;
	
	        this.appendChild(cloneFragment);
	
	        this._taskElem = document.querySelector(`inbox-sample-task[id=${ this.task }]`);
	        this._taskElem.addEventListener('transitionend', this._onTaskAnimated, false);
	    }
	
	    _onTaskAnimated() {
	        this.classList.remove('prerender');
	        this._taskElem.removeEventListener('transitionend', this._onTaskAnimated);
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleMessages);

/***/ },
/* 46 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(48);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _inboxSampleMessage = __webpack_require__(49);
	
	var _inboxSampleMessage2 = _interopRequireDefault(_inboxSampleMessage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-messageslist';
	const SCROLL_MARGIN_BEFORE_LAST_MESSAGE = 40;
	
	class InboxSampleMessagesList extends HTMLElement {
	
	    attachedCallback() {
	        const state = _store2.default.getState();
	        const task = state.tasks.find(task => task.id === this.task);
	        let openMessageElem;
	
	        task.messages.forEach(({ id }) => {
	            const messageElem = document.createElement('inbox-sample-message');
	            messageElem.task = this.task;
	            messageElem.message = id;
	            messageElem.open = this.message === id;
	
	            this.appendChild(messageElem);
	
	            if (messageElem.open) {
	                openMessageElem = messageElem;
	            }
	        });
	
	        // scroll to the last message
	        if (openMessageElem) {
	            window.scrollTo(0, openMessageElem.offsetTop - SCROLL_MARGIN_BEFORE_LAST_MESSAGE);
	        }
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleMessagesList);

/***/ },
/* 48 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _store = __webpack_require__(1);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _style = __webpack_require__(50);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _utils = __webpack_require__(28);
	
	var _actions = __webpack_require__(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const CUSTOM_TAG_NAME = 'inbox-sample-message';
	
	class InboxSampleMessage extends HTMLElement {
	
	    createdCallback() {
	        this._onStoreChange = this._onStoreChange.bind(this);
	        this._onClick = this._onClick.bind(this);
	    }
	
	    attachedCallback() {
	        this._unStoreChange = _store2.default.subscribe(this._onStoreChange);
	
	        // pre-build HTML
	        const template = document.querySelector(`#${ CUSTOM_TAG_NAME }`);
	        const cloneFragment = document.importNode(template.content, true);
	
	        const state = _store2.default.getState();
	        const task = state.tasks.find(task => task.id === this.task);
	        const message = task.messages.find(message => message.id === this.message);
	        const sender = state.users[message.sender];
	
	        // set avatar image
	        const avatarElem = cloneFragment.querySelector(`.${ CUSTOM_TAG_NAME }__avatar-img`);
	        avatarElem.srcset = (0, _utils.generateSrcset)(sender.avatar);
	
	        // set sender text
	        const senderElem = cloneFragment.querySelector(`.${ CUSTOM_TAG_NAME }__sender`);
	        senderElem.innerHTML = sender.title;
	
	        // set recipients text
	        const recipientsElem = cloneFragment.querySelector(`.${ CUSTOM_TAG_NAME }__to`);
	        recipientsElem.innerHTML = message.recipients.map(userId => state.users[userId].title).join(', ');
	
	        const dateElem = cloneFragment.querySelector(`.${ CUSTOM_TAG_NAME }__date`);
	        const dateObj = new Date(message.date);
	        dateElem.innerHTML = dateObj.toLocaleDateString();
	
	        const textElem = cloneFragment.querySelector(`.${ CUSTOM_TAG_NAME }__text`);
	        textElem.innerHTML = message.message;
	
	        this.appendChild(cloneFragment);
	        this.classList.toggle('open', this.open);
	
	        this.addEventListener('click', this._onClick, false);
	    }
	
	    detachedCallback() {
	        this._unStoreChange();
	        this.removeEventListener('click', this._onClick);
	    }
	
	    _onStoreChange() {
	        const state = _store2.default.getState();
	        const task = state.tasks.find(task => task.id === this.task);
	        const message = task.messages.find(message => message.id === this.message);
	
	        this.classList.toggle('open', message.expanded);
	        this.classList.toggle('active', message.active);
	    }
	
	    _onClick(evt) {
	        _store2.default.dispatch((0, _actions.toggleOpenMessage)(this.task, this.message));
	        evt.stopPropagation();
	    }
	
	}
	
	document.registerElement(CUSTOM_TAG_NAME, InboxSampleMessage);

/***/ },
/* 50 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 51 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map