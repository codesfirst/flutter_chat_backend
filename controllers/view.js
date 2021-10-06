const { response } = require('express');
var https = require('https');

var sendViewApp = async function(path, userKey = false)  {
    const apiKey = (userKey) ? process.env.API_KEY :process.env.API_REST_KEY;
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic " + apiKey
    };
    
    var options = {
        host: "onesignal.com",
        port: 443,
        path: path,
        method: "GET",
        headers: headers
    };
    const resp = new Promise((resolve, reject) => {
        
        var req = https.request(options, function(res) {  
            let responseBody = '';
            res.on('data', function(data) {
                responseBody += data;
            });

            res.on('end', () => {
                resolve(JSON.parse(responseBody));
            });

        });
        
        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
            reject(e);
        });
        
        req.write("");
        req.end();
    });

    return await resp;
};

const viewapps = async (req, res = response) => {
    
    try {
        console.log("Entro en view");
        let result = await sendViewApp("/api/v1/apps", true);
        console.log("rest");
        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}

const viewAnApps = async (req, res = response) => {
    
    try {
        var id = req.params.id;
        let result = await sendViewApp("/api/v1/apps/"+id, true);
        console.log("rest");
        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}

const viewDevices = async (req, res = response) => {
    
    try {
        console.log("Entro en view");
        const {limit, offset} = req.body;
        let result = await sendViewApp("/api/v1/players?app_id="+process.env.API_ID+"&limit="+limit+"&offset="+offset+"");
        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}

const viewAnDevice = async (req, res = response) => {
    
    try {
        var id = req.params.id;
        let result = await sendViewApp("/api/v1/players/"+id);
        console.log("rest");
        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}


const viewNotification = async (req, res = response) => {
    
    try {
        const {limit, offset} = req.body;
        let result = await sendViewApp("/api/v1/notifications?app_id="+process.env.API_ID+"&limit="+limit+"&offset="+offset+"");
        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}

const viewAnNotification = async (req, res = response) => {
    
    try {
        var id = req.params.id;
        let result = await sendViewApp("/api/v1/notifications/"+id);
        console.log("rest");
        res.json({
            ok: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con un administrador"
        });
    }

}

module.exports = {
    viewapps,
    viewAnApps,
    viewDevices,
    viewAnDevice,
    viewNotification,
    viewAnNotification
}