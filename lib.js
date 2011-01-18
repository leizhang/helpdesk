/*
Script Name: Javascript Cookie Script
Author: Public Domain, with some modifications
Script Source URI: http://techpatterns.com/downloads/javascript_cookies.php
Version 1.1.2
Last Update: 5 November 2009

Changes:
1.1.2 explicitly declares i in Get_Cookie with var
1.1.1 fixes a problem with Get_Cookie that did not correctly handle case
where cookie is initialized but it has no "=" and thus no value, the 
Get_Cookie function generates a NULL exception. This was pointed out by olivier, thanks
1.1.0 fixes a problem with Get_Cookie that did not correctly handle
cases where multiple cookies might test as the same, like: site1, site
This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
*/

// this fixes an issue with the old method, ambiguous values 
// with this test document.cookie.indexOf( name + "=" );

// To use, simple do: Get_Cookie('cookie_name'); 
// replace cookie_name with the real cookie name, '' are required
function Get_Cookie( check_name ) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split( ';' );
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f
    var i = '';
	
    for ( i = 0; i < a_all_cookies.length; i++ )
    {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
        // if the extracted name matches passed check_name
        if ( cookie_name == check_name )
        {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if ( a_temp_cookie.length > 1 )
            {
                cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if ( !b_cookie_found )
    {
        return null;
    }
}

/*
only the first 2 parameters are required, the cookie name, the cookie
value. Cookie time is in milliseconds, so the below expires will make the 
number you pass in the Set_Cookie function call the number of days the cookie
lasts, if you want it to be hours or minutes, just get rid of 24 and 60.

Generally you don't need to worry about domain, path or secure for most applications
so unless you need that, leave those parameters blank in the function call.
*/
function Set_Cookie( name, value, expires, path, domain, secure ) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    // if the expires variable is set, make the correct expires time, the
    // current script below will set it for x number of days, to make it
    // for hours, delete * 24, for minutes, delete * 60 * 24
    if ( expires )
    {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    //alert( 'today ' + today.toGMTString() );// this is for testing purpose only
    var expires_date = new Date( today.getTime() + (expires) );
    //alert('expires ' + expires_date.toGMTString());// this is for testing purposes only

    document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString()
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

// this deletes the cookie when called
function Delete_Cookie( name, path, domain ) {
    if ( Get_Cookie( name ) ) document.cookie = name + "=" +
        ( ( path ) ? ";path=" + path : "") +
        ( ( domain ) ? ";domain=" + domain : "" ) +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


/*
	Script Name: Your Computer Information
	Author: Harald Hope, Website: http://TechPatterns.com/
	Script Source URI: http://TechPatterns.com/downloads/browser_detection.php
	Version: 1.2.4
	Copyright (C) 3 April 2010

	This program is free software; you can redistribute it and/or modify it under
	the terms of the GNU General Public License as published by the Free Software
	Foundation; either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful, but WITHOUT
	ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	Get the full text of the GPL here: http://www.gnu.org/licenses/gpl.txt

	This script requires the Full Featured Browser Detection and the Javascript Cookies scripts
	to function.
	You can download them here.
	http://TechPatterns.com/downloads/browser_detection_php_ar.txt
	http://TechPatterns.com/downloads/javascript_cookies.txt

	Please note: this version requires the php browser_detection script version 5.3.3 or
	newer, because of the new full return of arrays $moz_array and $webkit_array as keys
	10 and 11, and $webkit_array key 7, and use of the new array key 14, true_msie_version.
	*/

/*
	If your page is XHMTL 1 strict, you have to
	put this code into a js library file or your
	page will not validate
	*/
function client_data(info)
{
    if (info == 'width')
    {
        /* width_height_html = '<h4  class="right-bar">Current Screen Resolution</h4>';
        width = (screen.width) ? screen.width:'';
        height = (screen.height) ? screen.height:'';
        // check for windows off standard dpi screen res
        if (typeof(screen.deviceXDPI) == 'number') {
            width *= screen.deviceXDPI/screen.logicalXDPI;
            height *= screen.deviceYDPI/screen.logicalYDPI;
        }
        width_height_html += '<p class="right-bar">' + width + " x " +
        height + " pixels</p>";
        (width && height) ? document.write(width_height_html):'';*/

        var dispInfo=getDisplayInfo();
        document.write("Your display resolution  is: <strong>");
        document.write(dispInfo.screenResolution[0]+"x"+dispInfo.screenResolution[1]+"</strong>");
        document.write("<br><span class=\"small\"> ("+dispInfo.screenDPI+" dpi, "+dispInfo.screenColourDepth+" bpp, "+dispInfo.screenAvailable[0]+"x"+dispInfo.screenAvailable[1]+" avail., "+(dispInfo.scrollbarWidth?dispInfo.scrollbarWidth:"??")+"px scrollbars)</span>");
        document.write("<br>");

    }
    else if (info == 'js' )
    {
        document.write('<p class="right-bar">JavaScript is enabled.</p>');
    }
    else if ( info == 'cookies' )
    {
        expires ='';
        Set_Cookie( 'cookie_test', 'it_worked' , expires, '', '', '' );
        string = '<h4  class="right-bar">Cookies</h4><p class="right-bar">';
        if ( Get_Cookie( 'cookie_test' ) )
        {
            string += 'Cookies are enabled.</p>';
        }
        else {
            string += 'Cookies are disabled.</p>';
        }
        document.write( string );
    }
}

function get_flash_version()
{
    var playerVersion=swfobject.getFlashPlayerVersion();

    var output = playerVersion.major + "." + playerVersion.minor + "." + playerVersion.release;

    document.write(output);

}

function get_java_version()
{
    var detectedJREs=deployJava.getJREs();
    if (typeof detectedJREs != 'undefined' && detectedJREs.length == 0) {
        document.write('Not detected');
    } else {
        var javaVersionSorter = function(fullA, fullB){
            var revSplitA = fullA.split('_');
            var revSplitB = fullB.split('_');
            var a = revSplitA[0].split('.');
            var b = revSplitB[0].split('.');
            var revA = 0;
            var revB = 0;
            if(revSplitA.length > 1){
                revA=Number(revSplitA[revSplitA.length - 1]);
            }
            if(revSplitB.length > 1){
                revB=Number(revSplitB[revSplitB.length - 1]);
            }
            for (var i = 0; i < a.length; ++i) {
                a[i] = Number(a[i]);
            }
            for (var i = 0; i < b.length; ++i) {
                b[i] = Number(b[i]);
            }
            if (a.length == 2) {
                a[2] = 0;
            }
            if (a[0] > b[0]) return -1;
            if (a[0] < b[0]) return 1;
            if (a[1] > b[1]) return -1;
            if (a[1] < b[1]) return 1;
            if (a[2] > b[2]) return -1;
            if (a[2] < b[2]) return 1;
            if (revA > revB) return -1;
            if (revA < revB) return 1;
            return 0;
        }
        detectedJREs.sort(javaVersionSorter);
        document.write(detectedJREs[0]);
    }

}

function get_silverlight_version()
{
    var knownSlVersions=[
    {
        v:"1.0",
        d:"1.0 Prerelease"
    },

    {
        v:"1.0.20724",
        d:"1.0 RC1"
    },

    {
        v:"1.0.20730",
        d:"1.0 RC2"
    },

    {
        v:"1.0.20806",
        d:"1.0 RC3"
    },

    {
        v:"1.0.20816",
        d:"1.0 (RTW)"
    },

    {
        v:"1.0.20926",
        d:"1.0 (RTM)"
    },

    {
        v:"1.0.21115",
        d:"1.0 (GDR1)"
    },

    {
        v:"1.0.30109",
        d:"1.0 (GDR2)"
    },

    {
        v:"1.0.30401",
        d:"1.0 (GDR3)"
    },

    {
        v:"1.0.30715",
        d:"1.0 (GDR4)"
    },

    {
        v:"1.1",
        d:"1.1 Prerelease"
    },

    {
        v:"1.1.20724",
        d:"1.1 Alpha (20724)"
    },

    {
        v:"1.1.20730",
        d:"1.1 Alpha (20730)"
    },

    {
        v:"1.1.20816",
        d:"1.1 Alpha (20816)"
    },

    {
        v:"1.1.20926",
        d:"1.1 Alpha (September Refresh)"
    },

    {
        v:"2.0",
        d:"2.0 Prerelease"
    },

    {
        v:"2.0.30226",
        d:"2.0 Beta 1"
    },

    {
        v:"2.0.30523",
        d:"2.0 Beta 2"
    },

    {
        v:"2.0.30923",
        d:"2.0 RC0"
    },

    {
        v:"2.0.31005",
        d:"2.0 (RTW)"
    },

    {
        v:"2.0.40115",
        d:"2.0 (GDR1)"
    },

    {
        v:"3.0",
        d:"3.0 Prerelease"
    },

    {
        v:"3.0.40307",
        d:"3.0 Beta 1"
    },

    {
        v:"3.0.40624",
        d:"3.0 (RTW)"
    },

    {
        v:"3.0.40723",
        d:"3.0 (GDR1)"
    },

    {
        v:"3.0.40818",
        d:"3.0 (GDR2)"
    },

    {
        v:"3.0.50106",
        d:"3.0 (GDR3)"
    },

    {
        v:"4.0",
        d:"4.0 Prerelease"
    },

    {
        v:"4.0.41108",
        d:"4.0 Beta 1"
    },

    {
        v:"4.0.50303",
        d:"4.0 RC"
    },

    {
        v:"4.0.50401",
        d:"4.0 (RTW)"
    },

    {
        v:"4.0",
        d:"4.0"
    }
    ];
    var slVersion=null;
    var slV=null;
    if(/*@cc_on!@*/false){
        try{
            var agHost=new ActiveXObject('AgControl.AgControl');
            for(var i=0; i<knownSlVersions.length; i++){
                slV=knownSlVersions[i];
                if(agHost.IsVersionSupported(slV.v)){
                    slVersion=slV.d;
                }else{
                    break;
                }
            }
        }catch(ex){
        // no silbalight 4 u
        }
    }else if(navigator && navigator.plugins && navigator.plugins["Silverlight Plug-In"]){
        // sneaky way to (hopefully) get version without instantiating plugin
        slVersion=navigator.plugins["Silverlight Plug-In"][0].enabledPlugin.description;
        realVersion=slVersion;
        for(var i=0; i<knownSlVersions.length; i++){
            slV=knownSlVersions[i];
            if(realVersion.indexOf(slV.v) != -1){
                slVersion=slV.d;
            }
        }
    }
    if (slVersion == null) {
        document.write('Not installed</strong>');
    } else {
        var bigVersion=slVersion.split(" ");
        document.write(bigVersion[0]);
        if(bigVersion[0].length < slVersion.length){
            document.write("<span class=\"small\">");
            document.write(slVersion.slice(bigVersion[0].length+1));
            document.write("</span>");
        }
    }
}

function getDisplayInfo(){
    var result={
        screenDPI: null,
        screenResolution: null,
        screenAvailable: null,
        screenColourDepth: null,
        scrollbarWidth: null,
        viewport: null
    };
    var testediv;
    if(document.getElementById){
        testediv=document.getElementById("testediv");
    }else if(document.all){
        testediv=document.all["testediv"];
    }else if(document.layers){
        testediv=document.layers["testediv"];
        testediv.clip.width;
    }
    if(testediv){
        if(testediv.offsetWidth){
            result.screenDPI=testediv.offsetWidth;
        }else if(testediv.clip){
            result.screenDPI=testediv.clip.width;
        }
        if(testediv.offsetWidth && testediv.scrollWidth){
            result.scrollbarWidth=testediv.offsetWidth-testediv.scrollWidth;
        }
        testediv.style.display="none";
    }
    if(window.screen){
        result.screenResolution=[window.screen.width, window.screen.height];
        result.screenAvailable=[window.screen.availWidth, window.screen.availHeight];
        result.screenColourDepth=window.screen.colorDepth;
    }
    if(window.innerHeight){
        result.viewport=[self.innerWidth, self.innerHeight];
    }else if(document.documentElement && document.documentElement.clientHeight){
        result.viewport=[document.documentElement.clientWidth, document.documentElement.clientHeight];
    }else if(document.body){
        result.viewport=[document.body.clientWidth, document.body.clientHeight];
    }
    return result;
}