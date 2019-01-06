window.polyfill = {
  isObject: function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  },
  isFunction: function (obj) {
    return typeof obj == 'function' || false;
  },
  Class: (function (prototype, ownProperty) {
    var milanoClass = function Klass(_superclass, definition) {
      function Class() {
        var self = this instanceof Class ? this : new Basic();
        self.init.apply(self, arguments);
        return self;
      }

      function Basic() {
      }

      Class.Basic = Basic;

      var _super = Basic[prototype] = _superclass[prototype];
      var proto = Basic[prototype] = Class[prototype] = new Basic();

      proto.constructor = Class;

      Class.extend = function (def) {
        return new Klass(Class, def);
      };

      var open = (Class.open = function (def) {
        if (window.polyfill.isFunction(def)) {
          def = def.call(Class, proto, _super, Class, _superclass);
        }

        if (window.polyfill.isObject(def)) {
          for (var key in def) {
            if (ownProperty.call(def, key)) {
              proto[key] = def[key];
            }
          }
        }

        if (!('init' in proto)) {
          proto.init = _superclass;
        }

        return Class;
      });

      return (open)(definition);
    };

    return milanoClass;

  })('prototype', ({}).hasOwnProperty)
};
