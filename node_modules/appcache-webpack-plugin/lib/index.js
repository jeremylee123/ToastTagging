'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AppCache = (function () {
  function AppCache(cache, network, fallback, settings, hash, comment) {
    _classCallCheck(this, AppCache);

    this.cache = cache;
    this.network = network;
    this.fallback = fallback;
    this.settings = settings;
    this.hash = hash;
    this.comment = comment;
    this.assets = [];
  }

  _createClass(AppCache, [{
    key: 'addAsset',
    value: function addAsset(asset) {
      this.assets.push(encodeURI(asset));
    }
  }, {
    key: 'size',
    value: function size() {
      return Buffer.byteLength(this.source(), 'utf8');
    }
  }, {
    key: 'getManifestBody',
    value: function getManifestBody() {
      return [this.assets && this.assets.length ? this.assets.join('\n') + '\n' : null, this.cache && this.cache.length ? 'CACHE:\n' + this.cache.join('\n') + '\n' : null, this.network && this.network.length ? 'NETWORK:\n' + this.network.join('\n') + '\n' : null, this.fallback && this.fallback.length ? 'FALLBACK:\n' + this.fallback.join('\n') + '\n' : null, this.settings && this.settings.length ? 'SETTINGS:\n' + this.settings.join('\n') + '\n' : null].filter(function (v) {
        return v && v.length;
      }).join('\n');
    }
  }, {
    key: 'source',
    value: function source() {
      return ['CACHE MANIFEST', '# ' + this.hash, this.comment || '', this.getManifestBody()].join('\n');
    }
  }]);

  return AppCache;
})();

var AppCachePlugin = (function () {
  _createClass(AppCachePlugin, null, [{
    key: 'AppCache',
    value: AppCache,
    enumerable: true
  }]);

  function AppCachePlugin() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var cache = _ref.cache;
    var _ref$network = _ref.network;
    var network = _ref$network === undefined ? ['*'] : _ref$network;
    var fallback = _ref.fallback;
    var settings = _ref.settings;
    var _ref$exclude = _ref.exclude;
    var exclude = _ref$exclude === undefined ? [] : _ref$exclude;
    var _ref$output = _ref.output;
    var output = _ref$output === undefined ? 'manifest.appcache' : _ref$output;
    var comment = _ref.comment;

    _classCallCheck(this, AppCachePlugin);

    this.cache = cache;
    this.network = network;
    this.fallback = fallback;
    this.settings = settings;
    this.output = output;
    this.comment = comment ? '# ' + comment + '\n' : '';

    // Convert exclusion strings to RegExp.
    this.exclude = exclude.map(function (exclusion) {
      if (exclusion instanceof RegExp) return exclusion;
      return new RegExp('^' + exclusion + '$');
    });
  }

  _createClass(AppCachePlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      var _compiler$options = compiler.options;
      _compiler$options = _compiler$options === undefined ? {} : _compiler$options;
      var _compiler$options$output = _compiler$options.output;
      var outputOptions = _compiler$options$output === undefined ? {} : _compiler$options$output;
      var _outputOptions$publicPath = outputOptions.publicPath;
      var publicPath = _outputOptions$publicPath === undefined ? '' : _outputOptions$publicPath;

      compiler.plugin('emit', function (compilation, callback) {
        var appCache = new AppCache(_this.cache, _this.network, _this.fallback, _this.settings, compilation.hash, _this.comment);
        Object.keys(compilation.assets).filter(function (asset) {
          return !_this.exclude.some(function (pattern) {
            return pattern.test(asset);
          });
        }).forEach(function (asset) {
          return appCache.addAsset(publicPath + asset);
        });
        compilation.assets[_this.output] = appCache;
        callback();
      });
    }
  }]);

  return AppCachePlugin;
})();

exports['default'] = AppCachePlugin;
module.exports = exports['default'];