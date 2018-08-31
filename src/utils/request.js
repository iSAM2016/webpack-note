import $ from 'jquery'
function makeCallbackName(callback) {
    var callbackName = '_AFT_BRIDGE_CALLBACK_' + Date.now() + '_' + parseInt(Math.random() * 1000, 10);
    window[callbackName] = function (res) {
        if (typeof res === 'string') {
            try {
                res = JSON.parse(res);
            } catch (ex) {
                console.error(ex);
            }
        }
        callback && callback(res);
    };
    return callbackName;
}
function invokeIosNative(action, param, callback) {
    function openIframe(url) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', url);
        document.body.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }

    function makeSchemeUrl(action, param, callbackName) {
        return 'objc://?action=' + encodeURIComponent(action) + '&param=' + encodeURIComponent(JSON.stringify(param)) + '&callback=' + encodeURIComponent(callbackName);
    }

    var callbackName = makeCallbackName(callback);
    var url = makeSchemeUrl(action, param, callbackName);

    //  alert(url)

    openIframe(url);
}

const isAndroid = !!window.lejent
//alert(isAndroid)


const iosAction = `objc://?action=${encodeURIComponent('aft_pushToViewController')}&param=${encodeURIComponent(JSON.stringify({ target_activity_id: 1001 }))}&callback=`

export default ({ url, method = 'get', success, data, fn }) => {

    $.ajax({
        method,
        data,
        // headers: {
        //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNDI3MzI3NDIsInVzZXJfbmFtZSI6Ilx1OTY0OHl4IiwiZXhwIjoxNTMyNzQ1NzA3fQ.V4q775_-xYMMgpqy7FE1e0Pwd93KVOvH3DJtx2cMDfY`
        // },
        xhrFields: {
            withCredentials: true
        },
        // 允许跨域
        crossDomain: true,
        url: '//wb.lejent.cn' + url,
        success: (res) => {
            let resObj = JSON.parse(res)
            // console.log('res', resObj)
            if (resObj[0] && resObj[0].msg === '请先登录') {
                if (isAndroid) {
                    lejent.login()
                } else {
                    //          alert(iosAction)
                    var param = {
                        target_activity_id: 1001
                    };
                    var iosAction = 'aft_pushToViewController';
                    invokeIosNative(iosAction, param);
                    //          location.href = iosAction
                }
            } else {
                success(resObj)
            }
        }
    })

}

window.AftJsCallback = {
    onRestart: function () {
        window.location.reload(true);
    }
};
