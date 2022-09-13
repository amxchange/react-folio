export const isMobi = /Mobi/i.test(window.navigator.userAgent); // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent | https://stackoverflow.com/a/45666491

export const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf("CriOS") == -1 &&
    navigator.userAgent.indexOf("FxiOS") == -1;

export const dAppUrlPrefix = "/d-app";

export const mAppUrlPrefix = "/m-app";

export const isViewedOnGhPages = window.location.href.indexOf("github.io/react-folio") > -1;
