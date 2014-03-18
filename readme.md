
# localStorage cache

The client-side javascript library to act as a localstorage wrapper, adding json support and addressing browser compatibility!


## usage

Include the file:

    <script src="lscache.js"></script>

Once installed the storage tool is accessible from `window.storage`.  **If you do not like the name you can change it by modifying the value of the second argument, at the bottom of the file.**

You can set an expiration per call to `set`, and also via `setExpires`.  _The default is 5 minutes._


## use case scenario

Let's say you have an API where you request data from the server regularly, and as the user navigates the pages.  Perhaps some of that data is on every page, other parts of that data are simply on commonly accessed pages.

You may store that common data via:

    commonData = jsonObject;
    window.storage.set('commonData', commonData);

Let's say you want the user to keep it for an hour, simply supply an expires of 60 minutes:

    commonData = jsonObject;
    window.storage.set('commonData', commonData, 60);

If you want all of your cache'd data to last an hour you can tell the system so by running:

    window.storage.setExpires(60);

**Back to our example**, the user loads the next page and we stored the menu for that user.  Instead of hitting the API to get the menu items, we can instead do this:

    menuData = window.storage.get("menu");
    if (menuData) {
        render(menuData);
    }

It also has support for fallback values, so instead of returning undefined you can get a result you desire:

    menuData = window.storage.get("menu", false);
    if (menuData) {
        render(menuData);
    }

Let's say the user is logging out, we can wipe the menu out like so:

    window.storage.set("menu", null);

If our system is very big and we set a lot of things we may not have tracked the names of, we can clear the cache completely with:

    window.storage.clear();


## notes

**All returned data is run through `JSON.parse`, if your stored content is a valid JSON string it will be an object when you retreive it.**

This script will shim the following:

- `window.Date.now`
- `window.Object.keys`
- `window.localStorage`

_If any of the above does not exist in the browser, it will create a stand-in with acceptable behavior._


# references

> "Shimming is the gateway drug to Shivving." - James Forte

