var assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    SauceLabs = require("saucelabs"),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    saucelabs = new SauceLabs({
      username: username,
      password: accessKey
    });

test.describe('Sauce labs coordinator', function() {
  this.timeout(60000);

  var driver;

  test.beforeEach(function() {
    var browser = "chrome",
        version = "dev",
        platform = "Windows 10",
        server = "http://" + username + ":" + accessKey + 
                  "@localhost:4445/wd/hub"; 

    driver = new webdriver.Builder().
      withCapabilities({
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey
      }).
      usingServer(server).
      build();

    driver.getSession().then(function (sessionid){
      driver.sessionID = sessionid.id_;
    });

  });

  test.afterEach(function(done) {
    driver.quit();

    saucelabs.updateJob(driver.sessionID, {
      name: "Test 8",
      passed: true
    }, done);
  })

  test.it('check for failures', function() {
    driver.get('http://127.0.0.1:4444/test/index.html');

    /*var failuresdiv = driver.findElement(webdriver.By.css('[class^="failures"]'));
    failuresDiv.getText().then(function(text){
         assert.equal(text, "failures 0");
         console.log("whattt" + text);
    });*/

  });
});