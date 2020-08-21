/**
 * Our content script can interact with the DOM, so we register a listener 
 * that hides the news feed and side news panel when the 'focus' message
 * is sent by the background script.
 */
const logoUrl = chrome.runtime.getURL("icon.png")
const gsLogoUrl = chrome.runtime.getURL("logo.png")
const tooninLogoUrl = chrome.runtime.getURL("toonin_logo.png")
const materialMathLogoUrl = chrome.runtime.getURL("material_math_logo.png")
const paypalLogoUrl = chrome.runtime.getURL("paypal.png")

const NEWS_FEED_CLASSNAME = "core-rail"
const SHARED_NEWS_CLASSNAME = "feed-shared-news-module"
const MAIN_CONTAINER_CLASSNAME = "ghost-animate-in"

const setMainContainerVisibility = (visible) => {
    const visibility = visible ? 'visible' : 'hidden'
    document.getElementsByClassName(MAIN_CONTAINER_CLASSNAME)[0].style.visibility = visibility
}

const setupMainContainer = () => {
    setMainContainerVisibility(false)
    const mainContainer = document.getElementsByClassName(MAIN_CONTAINER_CLASSNAME)[0]
    mainContainer.style.opacity = "0"
    mainContainer.style.transition = "opacity 0.4s ease-out"
}

setupMainContainer()
const port = chrome.runtime.connect({ name: "linkedin-focus" });

port.onMessage.addListener((msg) => {
    if (msg.type === "focus") {
        enterFocusMode()
    } else if (msg.type === "unfocus") {
        hideDistractions(false)
    }
});

var intervalTimerId;
var distractionsHidden = false;

const tryHidingDistractions = () => {
    if (distractionsHidden) {
        console.log("News is blocked")
        clearInterval(intervalTimerId)
    } else {
        hideDistractions(true)
    }
}

const enterFocusMode = () => {

    if (hasNewsLoaded()) {
        console.log("News has loaded")
        hideDistractions(true)
    } else {
        console.log("News hasn't loaded.")
        intervalTimerId = setInterval(tryHidingDistractions, 343)
    }
}

const displayQuote = () => {
    var quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementsByClassName(NEWS_FEED_CLASSNAME)[0].style.visibility = 'visible'

    const quoteStyle = "style=\"color:#293E4A;font-size:24px;\margin-bottom:4px;\""
    const lfTitleStyle = "style=\"color:#0477B5;font-size:32px;font-weight:700;margin-bottom:16px;\""
    const gsTitleStyle = "style=\"color:#434343;font-size:32px;font-weight:700;margin-right:auto;\""
    const gsGithubStyle = "style=\"height: 32px;width: 32px;font-size: 32px;margin: 0px 6px;\""
    const gsSocialLinkedInStyle = "style=\"background: #007bb5;color: white;height: 32px;width: 32px;font-size: 24px;margin: 0px 6px;padding: 6px;border-radius:4px;\""
    const quoteSourceStyle = "style=\"color:#293E4A;font-size:20px;font-style:italic;margin-bottom:16px;\""
    const instructionStyle = "style=\"color:#293E4A;font-size:16px;\margin-bottom:4px;\""
    const logoStyle = " style=\"height: 24px;margin: 0px 4px;\" "
    const gspanelTitleStyle = "style=\"color:#434343;font-size:24px;font-weight:700;text-align:center;margin-bottom:25px;\""
    const gsDesc = "This web extension was developed by Grey software, a not-for-profit open source software development academy where maintainers and students create free software."
    const hyperlinkStyle = "<style>a{text-decoration: none;color: black;} a:visited{text-decoration: none;color: black;} a:hover{text-decoration: none !important;opacity: 0.7;} </style>"
    const paypalButtonStyle = "<style>.paypal-icon{height:24px;margin-right:4px}.paypal-button{margin-top:20px;margin-right:250px;border-radius:24px;height:42px;border:1px solid #003084;outline:none;display:flex;align-items:center;padding:2px 16px;color:#003084;font-size:18px;background-color:white;transition:all 0.3s ease-out}.paypal-button:hover{cursor:pointer;border:1px solid #1ba0de}.paypal-button:active{cursor:pointer;border:1px solid #1ba0de;color:white;background-color:#003084}</style>"
    const gsCta = "To learn more, please visit the Grey Software website at "
    const gsDonate = "Support our mission by sponsoring us on GitHub and/or by making a donation via PayPal."
    const sponsorButtonStyle = "<style>.btn-github-sponsors {color: #24292e;background-color: #fafbfc;border-color: rgba(27, 31, 35, 0.15) !important;box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),inset 0 1px 0 hsla(0, 0%, 100%, 0.25);transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);position: relative;display: inline-block;padding: 5px 16px;font-size: 14px;font-weight: 500;line-height: 20px;white-space: nowrap;vertical-align: middle;cursor: pointer;user-select: none;border: 1px solid;border-radius: 6px;appearance: none;font-family: BlinkMacSystemFont, Segoe UI, Helvetica, Arial}.btn-github-sponsors {margin-top:25px;background-color: #f3f4f6;transition-duration: 0.1s;} .icon-github-sponsors {margin-right: 8px;vertical-align: text-bottom;}</style>"

    const instruction = "To exit focus mode, click on the LinkedInFocus extension:"

    var linkedInFocusHTML = "<h1 " + lfTitleStyle + ">LinkedInFocus</h1>"
    linkedInFocusHTML += "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"></link>"
    linkedInFocusHTML += "<p " + quoteStyle + ">" + quote.text + "</p>"
    linkedInFocusHTML += "<p " + quoteSourceStyle + ">- " + quote.source + "</p>"
    linkedInFocusHTML += "<p " + instructionStyle + ">" + instruction
    linkedInFocusHTML += "<img src=\"" + logoUrl + "\" " + logoStyle + ">" + " from the extensions panel on the top right corner of your screen.</p>"
    linkedInFocusHTML += "<br>"

    linkedInFocusHTML += "<div style=\"border: 2px;border-style:solid;border-color:#434343;padding: 1em;width: 552px;height: 370px;margin-top: 24px;padding-top:24px;border-radius:4px;\">"
    linkedInFocusHTML += "<div style=\"display: flex; align-items: center;margin-bottom:16px;\">"
    linkedInFocusHTML += "<img src=\"" + gsLogoUrl + "\" style=\"height: 50px;float:left;margin-right: 6px;\" />"
    linkedInFocusHTML += "<span " + gsTitleStyle + ">Grey Software</span>"
    linkedInFocusHTML += "<a " + gsSocialLinkedInStyle + " href=\"https://www.linkedin.com/company/grey-software/\" class=\"fa fa-linkedin\"></a>"
    linkedInFocusHTML += "<a " + gsGithubStyle + " href=\"https://github.com/grey-software\" class=\"fa fa-github\"></a>"
    // linkedInFocusHTML += "<a target=\"_blank\" href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VEAGAZP7DHJNE&source=url\"><button class=\"paypal-button\"><img class=\"paypal-icon\" src=\"https://assets.codepen.io/853141/paypal.png\"/>Donate</button></a></div>"
    linkedInFocusHTML += "</div>"
    linkedInFocusHTML += hyperlinkStyle
    // linkedInFocusHTML += paypalButtonStyle
    linkedInFocusHTML += "<div>" + gsDesc + "<p style=\"margin-top: 12px;\">" + gsCta + "</p><a href=\"https://org.grey.software/\">grey.software</a></div>"
    linkedInFocusHTML += "<div style=\"margin-top: 12px;\">" + gsDonate + "</div>"
    linkedInFocusHTML += "<div style=\"display:flex;\">"
    linkedInFocusHTML += "<div style=\"flex:-10%;\">"
    linkedInFocusHTML += "<center>"
    linkedInFocusHTML += "<a href=\"https://github.com/sponsors/grey-software\" class=\"btn-github-sponsors\"><svg class=\"icon-github-sponsors\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" fill=\"#ea4aaa\" d=\"M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z\"></path></svg><span>Sponsor</span></a>"
    linkedInFocusHTML += "</center>"
    linkedInFocusHTML += "</div>"
    linkedInFocusHTML += "<div style=\"flex:50%;\">"
    linkedInFocusHTML += "<center>"
    linkedInFocusHTML += "<a target=\"_blank\" href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VEAGAZP7DHJNE&source=url\"><button class=\"paypal-button\"><img class=\"paypal-icon\" src=\"https://assets.codepen.io/853141/paypal.png\"/>Donate</button></a>"
    linkedInFocusHTML += paypalButtonStyle
    linkedInFocusHTML += "</center>"
    linkedInFocusHTML += "</div>"
    linkedInFocusHTML += sponsorButtonStyle
    linkedInFocusHTML += "</div>"

    const quoteHtmlNode = document.createElement("div")
    quoteHtmlNode.innerHTML = linkedInFocusHTML

    // HTML for side panel
    var sidePanelHTML = "<div style=\"padding:15px;\">"
    sidePanelHTML += "<h2 " + gspanelTitleStyle + ">Grey Software Initiatives</h2>"
    sidePanelHTML += "<div style=\"display:flex;\">"
    sidePanelHTML += "<div style=\"flex:50%;\">"
    sidePanelHTML += "<center><img src=\"" + tooninLogoUrl + "\" style=\"width:40%;\"/></center>"
    sidePanelHTML += "<p style=\"text-align:center;width=40%;\"><a href=\"https://github.com/grey-software/toonin\">Toonin</a></p>"
    sidePanelHTML += "</div>"
    sidePanelHTML += "<div style=\"flex:50%;\">"
    sidePanelHTML += "<center><img src=\"" + materialMathLogoUrl + "\" style=\"width:40%;\"/></center>"
    sidePanelHTML += "<p style=\"text-align:center;width=40%;\"><a href=\"https://github.com/grey-software/Material-Math\">Material Math</a></p>"
    sidePanelHTML += "</div>"
    sidePanelHTML += hyperlinkStyle
    sidePanelHTML += "</div>"
    // Change the HTML of the side panel
    document.getElementsByClassName('artdeco-card ember-view')[4].innerHTML = sidePanelHTML

    document.getElementsByClassName(NEWS_FEED_CLASSNAME)[0].prepend(quoteHtmlNode)
    document.getElementsByClassName(NEWS_FEED_CLASSNAME)[0].style.fontFamily = "Arial, Helvetica";
}

const hideDistractions = (shouldHide) => {
    const newsFeedContainer = document.getElementsByClassName(NEWS_FEED_CLASSNAME)[0]
    if (shouldHide) {
        document.getElementsByClassName(SHARED_NEWS_CLASSNAME)[0].style.visibility = 'hidden'
        for (let i = 0; i < newsFeedContainer.children.length; i++) {
            newsFeedContainer.children[i].style.visibility = 'hidden';
        }
        document.getElementsByClassName('ad-banner-container is-header-zone ember-view')[0].style.visibility = 'hidden'
        document.getElementsByClassName('ad-banner-container artdeco-card ember-view')[0].style.visibility = 'hidden'
        displayQuote()
        setTimeout(() => {
            document.getElementsByClassName(MAIN_CONTAINER_CLASSNAME)[0].style.opacity = "1"
        }, 148)
    } else {
        document.getElementsByClassName(SHARED_NEWS_CLASSNAME)[0].style.visibility = 'visible'
        document.getElementsByClassName(NEWS_FEED_CLASSNAME)[0].children[0].remove()
        for (let i = 0; i < newsFeedContainer.children.length; i++) {
            newsFeedContainer.children[i].style.visibility = 'visible';
        }
        document.getElementsByClassName('ad-banner-container is-header-zone ember-view')[0].style.visibility = 'visible'
        document.getElementsByClassName('ad-banner-container artdeco-card ember-view')[0].style.visibility = 'visible'
    } distractionsHidden = shouldHide
    setMainContainerVisibility(true)
}

const hasNewsLoaded = () => {
    return document.getElementsByClassName(SHARED_NEWS_CLASSNAME)[0] && document.getElementsByClassName(NEWS_FEED_CLASSNAME)[0]
}
