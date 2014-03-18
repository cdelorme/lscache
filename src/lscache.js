(function(w, s) {

    /**
     * shim Dave.now function
     */

    if (!w.Date.now) {
        w.Date.now = function() {
            return (new Date()).getTime();
        }
    }


    /**
     * window.Object shim
     * to support keys method
     */

    // create window.Object if it does not exist
    if (!w.Object) {
        w.Object = function() {};
    }

    // add a keys method if it does not exist
    if (!w.Object.keys) {
        w.Object.prototype.keys = function(object) {
            var keys = [];
            for (var x in object) {
                keys.push(x);
            }
            return keys;
        }
    }


    /**
     * LocalStorage Shim
     * adds support for localstorage functionality, but does not
     */

    var LocalStorage = function() {
        this.store = {};
    }

    LocalStorage.prototype.setItem = function(key, value) {
        this.store[key] = value;
    }

    LocalStorage.prototype.getItem = function(key) {
        return this.store[key];
    }

    LocalStorage.prototype.removeItem = function(key) {
        delete(this.store[key]);
    }

    LocalStorage.prototype.clear = function() {
        delete(this.store);
        this.store = {};
    }

    LocalStorage.prototype.key = function(index) {
        var keys = w.Object.keys(this.store);
        return this.store[keys[index]];
    }

    LocalStorage.prototype.length = function() {
        return w.Object.keys(this.store).length;
    }

    if (!w.localStorage) {
        w.localStorage = new LocalStorage();
    }


    /**
     * Storage cache wrapper
     */

    var Storage = function() {
        this.localStorage = w.localStorage;
    };

    Storage.prototype.expires = 300000; // 5 minutes * 60 seconds * 1000 milliseconds

    Storage.prototype.setExpires = function(expires_in_minutes) {
        this.expires = (expires_in_minutes * 60 * 1000);
    }

    Storage.prototype.get = function(key, fallback) {

        // retreive value
        var value = this.localStorage.getItem(key);

        // check for data
        if (value) {
            var json = w.JSON.parse(value);

            // Has it expired?
            if (json.expires < Date.now()) {
                delete(value);
                this.localStorage.removeItem(key);
            } else {
                value = json.data;
            }
        }

        // return value or fallback
        return value || fallback;
    };

    Storage.prototype.set = function(key, value, expires) {

        // fallback expires to this.expires
        expires = expires ? (expires * 60 * 1000) : this.expires;

        // prepare data to store
        var data = {
            "expires": Date.now() + expires,
            "data": value
        }

        // store data
        this.localStorage.setItem(key, w.JSON.stringify(data));
    };

    Storage.prototype.clear = function() {
        this.localStorage.clear();
    };


    // make storage service global
    w[s] = new Storage();

})(window, "storage");