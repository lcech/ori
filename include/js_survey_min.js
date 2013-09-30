function openSecondQuestion(url) {
	var myWin = window.open(url, "survey", "width=550, height=420, top=300, left=400, location=no, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=yes");
	// Chrome 18 is problematic, but it's not really needed here (#8855).
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('chrome/18' ) == -1) {
	//if (ua.indexOf('chrome' ) == -1) {
		myWin.resizeTo(550, 420);
	}
	parent.jQuery.hideModal();
	return false;
}
var UserInfo = {
    init: function () {
        this.getBrowser();
        this.getOsVersion(this.isIE);
        this.getResolution();
    },
   
    getBrowser: function () {
        var b = this.searchString(this.dataBrowser) || "An unknown browser" ;
        var v = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";

        this.browser = b + " " + v;
        this.isIE = (b == 'Explorer');
    },
   
    getOsVersion: function (isIE) {
        var OSName="Unknown OS";

        var OS = navigator.appVersion;

        if (!isIE) {
            OS = navigator.userAgent;
        }

        if (OS.indexOf("Win")!=-1) {
            if ((OS.indexOf("Windows NT 5.1")!=-1) || (OS.indexOf("Windows XP")!=-1)) {
                OSName="Windows XP";
            } else if ((OS.indexOf("Windows NT 7.0")!=-1) || (OS.indexOf("Windows NT 6.1")!=-1)) {
                OSName="Windows 7";
            } else if ((OS.indexOf("Windows NT 6.0")!=-1)) {
                OSName="Windows Vista/Server 08";
            } else if (OS.indexOf("Windows ME")!=-1) {
                OSName="Windows ME";
            } else if ((OS.indexOf("Windows NT 4.0")!=-1) || (OS.indexOf("WinNT4.0")!=-1) || (OS.indexOf("WinNT")!=-1)) {
                OSName="Windows NT";
            } else if ((OS.indexOf("Windows NT 5.2")!=-1)) {
                OSName="Windows Server 03";
            } else if ((OS.indexOf("Windows NT 5.0")!=-1) || (OS.indexOf("Windows 2000")!=-1)) {
                OSName="Windows 2000";
            } else if ((OS.indexOf("Windows 98")!=-1) || (OS.indexOf("Win98")!=-1)) {
                OSName="Windows 98";
            } else if ((OS.indexOf("Windows 95")!=-1) || (OS.indexOf("Win95")!=-1) || (OS.indexOf("Windows_95")!=-1)) {
                OSName="Windows 95";
            } else if ((OS.indexOf("Win16")!=-1)) {
                OSName="Windows 3.1";
            } else {
                OSName="Windows unknown version";
            }

            if ((OS.indexOf("WOW64")!=-1) || (OS.indexOf("x64")!=-1) || (OS.indexOf("Win64")!=-1) || (OS.indexOf("IA64")!=-1)) {
                OSName=OSName+" (x64)";
            } else {
                OSName=OSName+" (x32)"
            }
        } else if (OS.indexOf("Mac")!=-1) {
            OSName="MacOS";
        } else if (OS.indexOf("X11")!=-1) {
            OSName="UNIX";
        } else if (OS.indexOf("Linux")!=-1) {
            OSName="Linux";
        } else if (OS.iPhone) {
            OSName="iPhone/iPod";
        }
        this.OS = OSName;
    },
   
    getResolution: function () {
        this.resolution = screen.width+'x'+screen.height;
    },

    searchString: function (data) {
        for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) {
                    return data[i].identity;
                }
            } else if (dataProp) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {       string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
        },
        {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
        },
        {
                prop: window.opera,
                identity: "Opera"
        },
        {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
        },
        {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
        },
        {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
        },
        {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
        },
        {               // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
        },
        {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
        },
        {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
        },
        {               // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
        }
    ]
};

UserInfo.init();
