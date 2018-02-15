/**
 * AppsFlyer Banner Generator
 * Feb-2018, MIT License
 */

var CALL_TO_ACTION_TEXT = "Install";
var DEFAULT_SUB_DOMAIN = "go";

function AFBanner () {

    this.buildUrl = function(settings) {
        
        function getParam(label, value) {
            return value ? "&" + label + "=" + encodeURIComponent(value) : "";
        }

        // URL settings
        var subdomain = settings.subdomain || DEFAULT_SUB_DOMAIN;
        var onelinkid = settings.onelink_id;
        var bannerTag = "?is_banner=true";
        var baseUrl = "https://" + subdomain + ".onelink.me/" + onelinkid + bannerTag;
        
        // Attribution Settings
        var media_source = getParam("pid", settings.media_source);
        var campaign = getParam("c", settings.campaign);       
        var ad = getParam("af_ad", settings.ad);
        var ad_id = getParam("af_ad_id", settings.ad_id);
        var site_id = getParam("af_siteid", settings.site_id);
        var sub1 = getParam("af_sub1", settings.sub1);

        // Deep link Settings
        var af_dp = getParam("af_dp", settings.mobile_deeplink);       
    
        // Build URL
        var url = baseUrl + media_source + campaign + 
                  ad + ad_id + site_id + sub1 + af_dp;
        
        return url;
    };

    this.buildBanner = function(bannerContainerId, url, settings) {

        // CLOSE BUTTON
        var closeImg = document.createElement("IMG");
        closeImg.setAttribute('class', 'appsflyer-banner-close-img');
        closeImg.setAttribute('src', 'img/close.png');

        var closeFn = "var bannerWrapper = document.getElementById('" + bannerContainerId + "'); while (bannerWrapper.firstChild) {bannerWrapper.removeChild(div.firstChild);}";
        var closeImgContainer = document.createElement("DIV");
        closeImgContainer.setAttribute('class', 'appsflyer-banner-close-container');
        closeImgContainer.setAttribute('onclick', closeFn);
        closeImgContainer.appendChild(closeImg);
       
        // TEXT
        var title = document.createElement("DIV");
        title.setAttribute('class', 'appsflyer-banner-title');
        title.innerHTML = settings.title;

        var subtitle = document.createElement("DIV");
        subtitle.setAttribute('class', 'appsflyer-banner-subtitle');
        subtitle.innerHTML = settings.subtitle;

        var textContainer = document.createElement("DIV");
        textContainer.setAttribute('class', 'appsflyer-banner-text-container');
        textContainer.appendChild(title);
        textContainer.appendChild(subtitle);
        
        // ICON
        var iconImg = document.createElement("IMG");
        iconImg.setAttribute('class', 'appsflyer-banner-icon-img');
        iconImg.setAttribute('src', settings.app_icon);

        var iconContainer = document.createElement("DIV");
        iconContainer.setAttribute('class', 'appsflyer-banner-icon-container');
        iconContainer.appendChild(iconImg);

        // DOWNLOAD BUTTON
        var downloadUrl = "window.location.replace('" + url + "')";
        var downloadButton = document.createElement("BUTTON");
        downloadButton.setAttribute('class', 'appsflyer-banner-download-button');
        downloadButton.setAttribute('onclick', downloadUrl);
        downloadButton.innerHTML = settings.call_to_action || CALL_TO_ACTION_TEXT;
        
        // BANNER CONTAINER
        var bannerContainer = document.createElement("DIV");
        bannerContainer.setAttribute('class', 'appsflyer-banner-container');

        bannerContainer.appendChild(closeImgContainer);
        bannerContainer.appendChild(iconContainer);
        bannerContainer.appendChild(textContainer);
        bannerContainer.appendChild(downloadButton);
       
        return bannerContainer;
    };

    this.validateSettings = function(settings) {
        
        var missingSettings = []
        if (!settings.onelink_id) {
            missingSettings.push("OneLink ID");
        }
        if (!settings.media_source) {
            missingSettings.push("Media Source");
        }
        if (missingSettings.length > 0) {
            console.error("Error: Your AppsFlyer Banner settings object does not contain: " + missingSettings.join(", "));
            return false;
        }
        return true;
    };

    this.init = function(bannerContainerId, settings) {

        // validate required input
        if (this.validateSettings(settings)){

            // get data
            var url = this.buildUrl(settings);        
            var banner = this.buildBanner(bannerContainerId, url, settings);

            // inject to banner container element
            var div = document.getElementById(bannerContainerId);
            div.appendChild(banner);

            // required for handheld devices
            var metaTag = document.createElement('meta');
            metaTag.name = "viewport";
            metaTag.content = "width=device-width, initial-scale=1.0";
            document.getElementsByTagName('head')[0].appendChild(metaTag);
        }
    };
}
