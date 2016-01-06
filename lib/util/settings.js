var MobileDetect = require('mobile-detect');

var settings = {};
var ua = navigator.userAgent;
var md = new MobileDetect(ua);
var userAgentOS = [
  {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
  {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
  {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
  {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
  {s: 'Windows Vista', r: /Windows NT 6.0/},
  {s: 'Windows Server 2003', r: /Windows NT 5.2/},
  {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
  {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
  {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
  {s: 'Windows 98', r: /(Windows 98|Win98)/},
  {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
  {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
  {s: 'Windows CE', r: /Windows CE/},
  {s: 'Windows 3.11', r: /Win16/},
  {s: 'Android', r: /Android/},
  {s: 'Open BSD', r: /OpenBSD/},
  {s: 'Sun OS', r: /SunOS/},
  {s: 'Linux', r: /(Linux|X11)/},
  {s: 'iOS', r: /(iPhone|iPad|iPod)/},
  {s: 'Mac OS X', r: /Mac OS X/},
  {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
  {s: 'QNX', r: /QNX/},
  {s: 'UNIX', r: /UNIX/},
  {s: 'BeOS', r: /BeOS/},
  {s: 'OS/2', r: /OS\/2/},
  {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
];

var checkDevice = function () {
  var device = 'desktop';

  if (md.mobile() && md.phone()) {
    device = 'phone';
  } else if (md.mobile() && md.tablet()) {
    device = 'tablet';
  }
  return device;

};

var checkManufacturer = function () {
  var man = 'unknown';
  if (md.phone()) {
    man = md.phone();
  } else if (md.tablet()) {
    man = md.tablet();
  }
  return man;
};

var checkVendor = function () {
  return (navigator.vendor) ? navigator.vendor.toLowerCase() : "";
};

var checkOS = function () {
  var operatingSystem;
  for (var id in userAgentOS) {
    var cs = userAgentOS[id];
    if (cs.r.test(ua)) {
      operatingSystem = cs.s;
      break;
    }
  }
  return operatingSystem;
};

var checkOsVersion = function () {
  var version = 'Unknown';
  var os = checkOS();

  if (/Windows/.test(os)) {
    version = os.replace(/^Windows /, '');
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS X':
      version = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
      break;

    case 'Android':
      version = /Android ([\.\_\d]+)/.exec(ua)[1];
      break;

    case 'iOS':
      version = /OS (\d+)_(\d+)_?(\d+)?/.exec(ua);
      version = version[1] + '.' + version[2] + '.' + (version[3] | 0);
      break;
  }

  return version;
};

var checkApp = function () {
  var app = 'web';
  if (typeof window.cordova !== 'undefined') app = 'native';
  return app;
};

var checkBrowser = function () {
  var browser = 'unknown';
  var uaLower = ua.toLowerCase();
  var msie = uaLower.indexOf('msie') >= 0;
  var trident = uaLower.indexOf('trident/') >= 0;

  if (msie || trident) {
    browser = 'ie';
  } else if (uaLower.indexOf('firefox') >= 0) {
    browser = 'firefox';
  } else if (uaLower.indexOf("safari") >= 0 && checkVendor().indexOf("apple") >= 0) {
    browser = 'safari';
  } else if (uaLower.indexOf("chrome") >= 0 && checkVendor().indexOf("google") >= 0) {
    browser = 'chrome';
  }
  return browser;
};

var checkBrowserVersion = function () {
  // http://stackoverflow.com/questions/5916900/detect-version-of-browser
  var tem;
  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return tem[1];
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return M[1];
};

var checkFirefox = function () {
  return settings.browser.indexOf('firefox') >= 0;
};

var checkSafari = function () {
  return (settings.browser.indexOf("safari") >= 0 && settings.vendor.indexOf("apple") >= 0);
};

var checkChrome = function () {
  //console.log('ua: ',ua);
  //console.log('checkChrome: ',ua.indexOf("chrome") >= 0);
  return (settings.browser.indexOf("chrome") >= 0 && settings.vendor.indexOf("google") >= 0)
};

var checkIE = function () {
  var msie = ua.toLowerCase().indexOf('msie') >= 0;
  var trident = ua.toLowerCase().indexOf('trident/') >= 0;
  return !!(msie || trident);
};

var checkDevicePixelRatio = function () {
  var pxlRatio = window.devicePixelRatio;
  if (checkOS() === 'iOS' && window.innerWidth >= 375 && window.devicePixelRatio < 3) pxlRatio = 3;
  return pxlRatio;
};

var checkIsSupported = function () {
  var browserSupported = true;
  var osSupported = true;
  var revision;
  var major;
  var minor;

  // Check Browser
  if (settings.isChrome && settings.browserVersion < 44) browserSupported = false;
  if (settings.isFirefox && settings.browserVersion < 40) browserSupported = false;
  if (settings.isSafari && settings.browserVersion < 8) browserSupported = false;
  if (settings.isIE && settings.browserVersion < 11) browserSupported = false;


  // Check OS
  if (md.mobile() || md.tablet()) {
    if (settings.isAndroid) {
      revision = settings.osVersion.split('.');
      major = parseInt(revision[0]);
      minor = parseInt(revision[1]);

      if (major < 4 || (major === 4 && minor < 2)) {
        osSupported = false;
      }

    } else if (settings.isiOS) {
      revision = settings.osVersion;
      major = parseInt(revision);

      if (major < 7) {
        osSupported = false;
      }
    }
  } else {
    switch (settings.os) {
      case 'Windows':
        switch (settings.osVersion) {
          case 'XP':
            osSupported = false;
            break;
          case 'Vista':
            osSupported = false;
            break;
          case '7':
          case '8':
          case '8.1':
          case '10':
            break;
          default:
            osSupported = false;
            break;
        }
        break;
      case 'Mac OS X':
        revision = settings.osVersion.split('.');
        major = parseInt(revision[0]);
        minor = parseInt(revision[1]);
        if (major < 10 || (major === 10 && minor < 7)) {
          osSupported = false;
        }
        break;
      default:
        osSupported = false;
        break;
    }
  }

  /*console.log('Operating System:', settings.os + ' ' + settings.osVersion);
   console.log('Browser:', settings.browser);
   console.log('Browser Version:', settings.browserVersion);
   console.log('Browser Supported:', browserSupported);
   console.log('OS Supported:', osSupported);*/

  // !browserSupported && alert('Browser not supported');
  // !osSupported && alert('OS not supported');

  //return browserSupported && osSupported;
  return browserSupported;
};

var checkOrientation = function(){
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var aspectRatio = w/h;
  if(aspectRatio < 1){
    return 'portrait'
  }else{
    return 'landscape'
  }
};

settings.getClassName = function(){
  var className = (md.mobile()) ? (settings.manufacturer + ' ') : '';
  className += settings.device + ' @x' + settings.devicePixelRatio + ' ' + (settings.os).replace(/\s/g, '_').toLocaleLowerCase() + ' ' + settings.app + ' ' + settings.browser + ' v' + settings.browserVersion+' '+checkOrientation();
  return className;
};

settings.assetPath = process.env.ASSET_PATH + 'assets/';
settings.imagePath = settings.assetPath + 'images/';
settings.svgPath = settings.assetPath + 'svg/';

settings.orientation = checkOrientation();
settings.device = checkDevice();
settings.vendor = checkVendor();
settings.os = checkOS();
settings.osVersion = checkOsVersion();
settings.app = checkApp();
settings.browser = checkBrowser();
settings.browserVersion = checkBrowserVersion();
settings.devicePixelRatio = checkDevicePixelRatio();
settings.manufacturer = checkManufacturer();
settings.classes = (md.mobile()) ? (settings.manufacturer + ' ') : '';
settings.classes += settings.device + ' @x' + settings.devicePixelRatio + ' ' + (settings.os).replace(/\s/g, '_').toLocaleLowerCase() + ' ' + settings.app + ' ' + settings.browser + ' v' + settings.browserVersion+' '+checkOrientation();
settings.isMobile = (md.mobile()) ? true : false;
settings.isPhone = (md.phone()) ? true : false;
settings.isTablet = (md.tablet()) ? true : false;
settings.isDesktop = (md.phone() || md.tablet()) ? false : true;
settings.cmsData = location.search.indexOf('preview=true') >= 0 ? 'json/preview.json' : 'json/content.json';
settings.isChrome = checkChrome();
settings.isFirefox = checkFirefox();
settings.isSafari = checkSafari();
settings.isIE = checkIE();
settings.isSupported = checkIsSupported();

module.exports = settings;
