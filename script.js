/**
 * Returns status of input with provided 'name'.
 *
 * @param {string} name The name value of the input field.
 * @return {string} Either "allow" or "block".
 */

function getInputField(name) {
    var el = document.querySelector("input[name="+name+"]");
    return (el.checked) ? ("allow") : ("block");
}


/**
 * Sets input with provided 'name' to 'value'.
 *
 * @param {string} name The name value of the input field.
 * @param {string} value The value if input field should be checked ("allow" for check).
 */
function adaptInputField(name, value) {
    var element = document.querySelector("input[name='"+name+"']");
    (value == "allow") ? (element.checked = true) : (element.checked = false)
}


/**
 * Gets current content setting of 'name' and adapt input field accordingly.
 *
 * @param {string} name The name value of the input field.
 */
function getAndDisplay(name) {
    chrome.contentSettings[name].get( {primaryUrl: "http://*"}, function(details) {
        adaptInputField(name, details.setting);
    });
}


/**
 * Sets content setting of 'name' to 'value'.
 *
 * @param {string} name The name value of the input field.
 * @param {string} value The value if input field should be checked ("allow" for check).
 */
function getAndSet() {
    var name = this.name;
    var value = getInputField(name);
    var details = {
        primaryPattern: "<all_urls>",
        setting: value
    };
    chrome.contentSettings[name].set(details);
}


/**
 * Sets current settings for javascript and cookies and add event listeners when loaded.
 */
window.onload = function() {

    document.querySelectorAll("input[name]")
    .forEach( function(item) { 
        var currentName = item.name;
        getAndDisplay(currentName);
        document.querySelector("input[name="+currentName+"]").addEventListener("change", getAndSet);
    } );

    document.querySelector("#reload").addEventListener("click", function() {
        chrome.tabs.reload();
    });
}