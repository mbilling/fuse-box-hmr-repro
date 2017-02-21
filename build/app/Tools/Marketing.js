"use strict";
var Parse = require("parse");
var Cookie = require('js-cookie');
var moment = require('moment');
var Scitylana = require('../../Scitylana.V1');
var Marketing = (function () {
    function Marketing() {
    }
    Marketing.RegisterLead = function (email) {
        ga(function (tracker) {
            var medium = tracker.get('campaignMedium'), leadSourceId = 65244;
            if (medium == 'organic')
                leadSourceId = 65245;
            else if (medium == 'cpc')
                leadSourceId = 65249;
            else if (medium == 'referral')
                leadSourceId = 65247;
            else if (medium == '(none)')
                leadSourceId = 65248;
            var data = {
                email: email,
                lead_source_id: leadSourceId,
                medium: tracker.get('campaignSource'),
                custom_field: {
                    cf_platform: navigator.platform.toLowerCase(),
                    cf_gaclientid: tracker.get('clientId'),
                    cf_language: tracker.get('language'),
                    cf_referrer: tracker.get('referrer'),
                    cf_gacampaignid: tracker.get('campaignId')
                }
            };
            Parse.Cloud.run('fs_createLead', data).then(function () {
                console.log('Marketing: Lead created in FS');
            });
        });
    };
    Marketing.Identify = function () {
        var user = Parse.User.current();
        if (user) {
            var userId = user.id;
            var email = user.getEmail();
            var createdAt = user.get('createdAt');
            var plan = 'beta';
            _cio.identify({
                id: userId,
                email: email,
                created_at: moment(createdAt).unix(),
                plan: plan
            });
            console.log('Marketing: Identify (' + userId + ', ' + email + ',' + createdAt + '' + plan + ')');
        }
        else {
            console.warn('User is not identified');
        }
    };
    Marketing.TrackAction = function (category, properties) {
        var user = Parse.User.current();
        if (user) {
            var userId = user.id;
            _cio.track(category, properties || {});
            console.log('Marketing: Event (' + category + ', ' + JSON.stringify(properties || {}) + ')');
        }
        Marketing.TrackPage(category, properties);
    };
    Marketing.TrackPage = function (category, properties) {
        var props = properties || {};
        var userId = props.userId ? props.userId : Marketing.getUserIdFromCookie();
        if (!userId) {
            userId = Scitylana.Tools.GUID.New();
            console.log('user is assigned ' + userId);
        }
        if (typeof ga !== 'undefined') {
            if (Parse.User.current()) {
                console.log('stored user id is ' + Parse.User.current().get('trackingUserId'));
                var trackingUserId = Parse.User.current().get('trackingUserId');
                if (!!trackingUserId) {
                    props['dimension2'] = trackingUserId;
                    ga('set', 'userId', trackingUserId);
                    ga('send', 'pageview', category, props);
                    Marketing.setUserIdInCookie(trackingUserId);
                }
                else {
                    console.log('fetching...');
                    Parse.User.current().fetch({
                        success: function (user) {
                            console.log('Fetched user ' + user.id);
                            var trackingUserId = user.get('trackingUserId');
                            console.log('trackingUserId ' + trackingUserId);
                            if (!trackingUserId) {
                                trackingUserId = userId;
                                Marketing.setUserIdInCookie(trackingUserId);
                                console.log('existing user assigned user id: ' + trackingUserId);
                                Parse.User.current().set('trackingUserId', trackingUserId);
                                Parse.User.current().save(null, {
                                    success: function (user) {
                                        props['dimension2'] = trackingUserId;
                                        ga('set', 'userId', trackingUserId);
                                        ga('send', 'pageview', category, props);
                                    }.bind(this), error: function (user, error) {
                                        console.log('Error saving user. ' + JSON.stringify(error));
                                    }.bind(this)
                                }, null);
                            }
                            else {
                                props['dimension2'] = trackingUserId;
                                ga('set', 'userId', trackingUserId);
                                ga('send', 'pageview', category, props);
                                Marketing.setUserIdInCookie(trackingUserId);
                            }
                        }.bind(this),
                        error: function (user, error) {
                            console.log('The user was not refreshed successfully. ' + JSON.stringify(error));
                        }.bind(this)
                    });
                }
            }
            else {
                console.log('user id is ' + userId);
                props['dimension2'] = userId;
                ga('set', 'userId', userId);
                ga('send', 'pageview', category, props);
                Marketing.setUserIdInCookie(userId);
            }
        }
        console.log('Marketing: Pageview (' + category + ', ' + JSON.stringify(props) + ')');
    };
    Marketing.TrackAnonymous = function (category) {
        this.TrackPage(category);
    };
    Marketing.TrackAdwordConversion = function (label, value) {
        if (value === void 0) { value = 0; }
        var google_conversion_url = encodeURI(location.href);
        var google_conversion_id = 874920112;
        var google_conversion_label = label;
        var google_conversion_value = value;
        var randomNum = new Date().getMilliseconds();
        var trackUrl = "//www.googleadservices.com/pagead/conversion/" + google_conversion_id + "/?random=" + randomNum + "&value=" + google_conversion_value + "&label=" + google_conversion_label + "&guid=ON&script=0&url=" + google_conversion_url;
        var img = document.createElement("img");
        img.src = trackUrl;
        document.body.appendChild(img);
    };
    Marketing.getUserIdFromCookie = function () {
        return Cookie.get('unique');
    };
    Marketing.setUserIdInCookie = function (userId) {
        Cookie.set('unique', userId, 3000);
    };
    Marketing.getAnonymousId = function () {
        var id = Cookie.get('ajs_anonymous_id');
        if (id) {
            id = id.substr(1, id.length - 2);
        }
        else {
            id = 'A' + (Math.random() * 100000000000000000);
        }
        return id;
    };
    Marketing.GetCampaignResources = function () {
        var headings = { h1: null, h2: null, h3: null, h4: null };
        if (location.href.indexOf('/gc/') > 0) {
            var parts = location.href.split('/').reverse();
            var qs = location.search.split('=').reverse();
            switch (qs[0]) {
                case 'pbi':
                    headings = {
                        h1: "Google Analytics meets Microsoft BI",
                        h2: "SCITYLANA ADDS WEB ANALYTICS TO YOUR BUSINESS INTELLIGENCE",
                        h3: "Sign up and use click-level and unsampled data from",
                        h4: "Google Analytics directly in Power BI and Excel Power Pivot."
                    };
                    break;
                case 'ppi':
                    headings = {
                        h1: "Google Analytics meets Microsoft Excel",
                        h2: "SCITYLANA ADDS WEB ANALYTICS TO YOUR BUSINESS INTELLIGENCE",
                        h3: "Sign up and use click-level and unsampled data from",
                        h4: "Google Analytics directly in Excel Power Pivot and Power BI"
                    };
                    break;
                case 'dwl':
                    headings = {
                        h1: "Download your raw Google Analytics data",
                        h2: "SCITYLANA ADDS WEB ANALYTICS TO YOUR BUSINESS INTELLIGENCE",
                        h3: "Sign up and use click-level and unsampled data from",
                        h4: "Google Analytics directly to your harddrive"
                    };
                    break;
                case 'gap':
                    headings = {
                        h1: "Download your raw Google Analytics Free data",
                        h2: "SCITYLANA ADDS WEB ANALYTICS TO YOUR BUSINESS INTELLIGENCE",
                        h3: "Sign up and use click-level and unsampled data from",
                        h4: "Google Analytics Free version directly to your harddrive"
                    };
                    break;
            }
            return { success: true, text: decodeURIComponent(parts[1]), headings: headings };
        }
        else
            return { success: false, text: '', headings: headings };
    };
    return Marketing;
}());
module.exports = Marketing;
//# sourceMappingURL=Marketing.js.map