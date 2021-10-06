const { response } = require('express');
var https = require('https');

var sendApp = async function(path, data, isPost = true)  {
    const apiKey = process.env.API_KEY;
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic " + apiKey
    };
    
    var options = {
        host: "onesignal.com",
        port: 443,
        path: path,
        method: isPost ? "POST": "PUT",
        headers: headers
    };
    console.log(options);
    console.log(data);
    const resp = new Promise((resolve, reject) => {
        
        var req = https.request(options, function(res) {  
            let responseBody = '';
            res.on('data', function(data) {
                responseBody += data;
            });

            res.on('end', () => {
                console.log(responseBody);
                try{
                    resolve(JSON.parse(responseBody));
                }catch{
                    reject()
                }
            });

        });
        
        req.on('error', function(e) {
            console.log("ERROR:");
            console.log(e);
            reject(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
    });

    return await resp;
};

const createApp = async (req, res = response) => {
    
    try {
        const {name, gcm_key, android_gcm_sender_id, site_name, organization_id} = req.body;

        var message = { 
            name,
            gcm_key,
            android_gcm_sender_id,
            site_name,
            organization_id,
        };

        console.log(message);

        let result = await sendApp("/api/v1/apps", message);
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

const updateApp = async (req, res = response) => {
    
    try {
        const {name, gcm_key, android_gcm_sender_id, site_name, organization_id} = req.body;
        var id = req.params.id;
        var message = { 
            name,
            gcm_key,
            android_gcm_sender_id,
            site_name,
            organization_id,
        };

        console.log(message, id);

        let result = await sendApp("/api/v1/apps/"+id, message, false);
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


const createDevice = async (req, res = response) => {
    
    try {
        const {app_id, device_type, identifier, language, device_model, device_os, country, external_user_id, notification_types} = req.body;

        var message = {app_id, device_type, identifier, language, device_model, device_os, country, external_user_id, notification_types} ;

        console.log(message);

        let result = await sendApp("/api/v1/players", message);
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

const updateDevice = async (req, res = response) => {
    
    try {
        const {app_id, device_type, identifier, language, device_model, device_os, country, external_user_id, notification_types} = req.body;

        var message = {app_id, device_type, identifier, language, device_model, device_os, country, external_user_id, notification_types} ;
        var id = req.params.id;
        

        console.log(message, id);

        let result = await sendApp("/api/v1/players"+id, message, false);
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
    createApp,
    updateApp,
    createDevice,
    updateDevice
}