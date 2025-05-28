/**
 * download.js v4.2, by dandavis; 2008-2016. [CCBY2]
 * https://github.com/rndme/download
 * 
 * Provides a cross-browser solution for downloading files from the browser.
 * Supports data URLs, Blobs, and URLs, with fallbacks for older browsers.
 * 
 * Best practices:
 * - Uses descriptive variable names
 * - Adds docstrings and inline comments
 * - Handles various browser compatibility scenarios
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS-like environments
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.download = factory();
    }
}(this, function () {

    /**
     * Initiates a file download in the browser.
     * @param {string|Blob} data - The file data or URL.
     * @param {string} [strFileName] - The name for the downloaded file.
     * @param {string} [strMimeType] - The MIME type of the file.
     * @returns {boolean|XMLHttpRequest}
     */
    return function download(data, strFileName, strMimeType) {
        var self = window, // this script is only for browsers anyway...
            defaultMime = "application/octet-stream", // triggers iframe downloads
            mimeType = strMimeType || defaultMime,
            payload = data,
            url = !strFileName && !strMimeType && payload,
            anchor = document.createElement("a"),
            toString = function(a){return String(a);},
            myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
            fileName = strFileName || "download",
            blob,
            reader;
        myBlob = myBlob.call ? myBlob.bind(self) : Blob ;

        // Allow download.bind(true, "text/xml", "export.xml") as a callback
        if(String(this)==="true"){
            payload=[payload, mimeType];
            mimeType=payload[0];
            payload=payload[1];
        }

        // If only a URL is passed, fetch and download it
        if(url && url.length < 2048){
            fileName = url.split("/").pop().split("?")[0];
            anchor.href = url;
            if(anchor.href.indexOf(url) !== -1){
                var ajax = new XMLHttpRequest();
                ajax.open("GET", url, true);
                ajax.responseType = 'blob';
                ajax.onload = function(e){
                    download(e.target.response, fileName, defaultMime);
                };
                setTimeout(function(){ ajax.send(); }, 0);
                return ajax;
            }
        }

        // Download dataURLs directly
        if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
            if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
                payload = dataUrlToBlob(payload);
                mimeType = payload.type || defaultMime;
            }else{
                return navigator.msSaveBlob ?
                    navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                    saver(payload);
            }
        }

        // Create a Blob if needed
        blob = payload instanceof myBlob ?
            payload :
            new myBlob([payload], {type: mimeType});

        /**
         * Converts a data URL to a Blob.
         * @param {string} strUrl
         * @returns {Blob}
         */
        function dataUrlToBlob(strUrl) {
            var parts = strUrl.split(/[:;,]/),
                type = parts[1],
                decoder = parts[2] == "base64" ? atob : decodeURIComponent,
                binData = decoder(parts.pop()),
                mx = binData.length,
                i = 0,
                uiArr = new Uint8Array(mx);

            for(i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

            return new myBlob([uiArr], {type: type});
        }

        /**
         * Triggers the download using various browser methods.
         * @param {string} url
         * @param {boolean} [winMode]
         * @returns {boolean}
         */
        function saver(url, winMode){
            if ('download' in anchor) { // HTML5 A[download]
                anchor.href = url;
                anchor.setAttribute("download", fileName);
                anchor.className = "download-js-link";
                anchor.innerHTML = "downloading...";
                anchor.style.display = "none";
                document.body.appendChild(anchor);
                setTimeout(function() {
                    anchor.click();
                    document.body.removeChild(anchor);
                    if(winMode === true){
                        setTimeout(function(){ self.URL.revokeObjectURL(anchor.href); }, 250 );
                    }
                }, 66);
                return true;
            }

            // Safari fallback
            if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
                url = url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
                if(!window.open(url)){
                    if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){
                        location.href = url;
                    }
                }
                return true;
            }

            // Iframe fallback for old Chrome/Firefox
            var f = document.createElement("iframe");
            document.body.appendChild(f);

            if(!winMode){
                url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            }
            f.src = url;
            setTimeout(function(){ document.body.removeChild(f); }, 333);
        }

        // IE10+ : (has Blob, but not a[download] or URL)
        if (navigator.msSaveBlob) {
            return navigator.msSaveBlob(blob, fileName);
        }

        // Modern browsers: Blob + URL
        if(self.URL){
            saver(self.URL.createObjectURL(blob), true);
        }else{
            // Fallback for non-Blob()+non-URL browsers
            if(typeof blob === "string" || blob.constructor === toString){
                try{
                    return saver("data:" + mimeType + ";base64," + self.btoa(blob));
                }catch(y){
                    return saver("data:" + mimeType + "," + encodeURIComponent(blob));
                }
            }

            // Blob but not URL support
            reader = new FileReader();
            reader.onload = function(e){
                saver(this.result);
            };
            reader.readAsDataURL(blob);
        }
        return true;
    }; // end download()
}));