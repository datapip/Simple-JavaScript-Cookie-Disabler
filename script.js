/**
 * Returns whether provided element is allowed or blocked.
 *
 * @param {string} name The name value of the input field.
 * @return {string} Either "allow" or "block".
 */

function getSetting(name) {
    var el = document.querySelector("input[name="+name+"]");
    return (el.checked) ? ("allow") : ("block");
}


/**
 * Checks or unchecks provided input element.
 *
 * @param {string} name The name value of the input field.
 * @param {string} value The value if input field should be checked ("allow" for check).
 */

function setChecked(name, value) {
    var element = document.querySelector("input[name='"+name+"']");
    (value == "allow") ? (element.checked = true) : (element.checked = false)
}


/**
 * Callback.
 *
 * @callback callbackFunction
 */

/**
 * Sets javascript and cookie settings for browser according to users choice.
 *
 * @param {callbackFunction} callback A custom callback function to run.
 */

function applyChoice(callback) {
    var jss = {
        primaryPattern: "<all_urls>",
        setting: getSetting("javascript")
    };

    chrome.contentSettings.javascript.set(jss, function() {
    
        var cks = {
            primaryPattern: "<all_urls>",
            setting: getSetting("cookies")
        };

        chrome.contentSettings.cookies.set(cks, function() {
            callback();
        });
    });
}


/**
 * Sets current settings for javascript and cookies and add event listeners when loaded.
 */

window.onload = function() {

    var url  = 'http://*';

    chrome.contentSettings.javascript.get( {primaryUrl: url}, function(details) {
        setChecked("javascript", details.setting);
    });

    chrome.contentSettings.cookies.get( {primaryUrl: url}, function(details) {
        setChecked("cookies", details.setting);
    });

    document.querySelector("#apply").addEventListener("click", function() {
        applyChoice(function() {
            chrome.tabs.reload();
        });
    });
}