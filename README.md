# Ember Data Twitch

This addon provides Ember-Data abstractions for the [Twitch API v3](https://github.com/justintv/Twitch-API).

## Installation

* `ember install ember-data-twitch`

## Usage

TBA

### Configuration

All requests to the Twitch API require a `CLIENT_ID` unique to your application.
This should be set on an `ember-data-twitch` hash in the object exported by your app's `config/environment.js`:

```js
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    'ember-data-twitch': {
      CLIENT_ID: <YOUR_CLIENT_ID>
    }
  };

  return ENV;
};
```

How this value is retrieved and stored within your application is up to you, but
for good security practice, we recommend making use of [`ember-cli-dotenv`](https://github.com/fivetanley/ember-cli-dotenv).


## Contributing

This section outlines the details of collaborating on this Ember addon.

### Installation

* `git clone git@github.com:elwayman02/ember-data-twitch.git`
* `cd ember-data-twitch/`
* `npm install`
* `bower install`

### Twitch API Key

Register your Twitch application [here](https://www.twitch.tv/settings/connections).
Once you have a client key, create a `.env` file at the root of your project and add the following:

`TWITCH_CLIENT_ID=yourtwitchclientid`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
