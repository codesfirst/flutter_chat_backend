const { response } = require('express');
var https = require('https');

var sendNotification = async function(data)  {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic " + process.env.API_REST_KEY
    };
    
    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
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
        
        req.write(JSON.stringify(data));
        req.end();
    });

    return await resp;
};

var cancelNotification = async function(app_id, id)  {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic " + process.env.API_REST_KEY
    };
    
    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications/"+id+"?app_id="+app_id,
        method: "DELETE",
        
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


const notificationSegment = async (req, res = response) => {
    const { included_segments, 
        excluded_segments, data, 
        contents, headings } = req.body;
    console.log("Entro");
    try {
        console.log(req.body);

        var message = { 
            app_id: process.env.API_ID,
            excluded_segments: excluded_segments,
            contents: contents,
            headings: headings,
            data: data,
            included_segments: included_segments
        };
        
        let result = await sendNotification(message);

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

const notificationSegmentTime = async (req, res = response) => {
    const { included_segments, delivery_time_of_day, delayed_option,
        excluded_segments, data, 
        contents, headings } = req.body;
    console.log("Entro");
    try {
        console.log(req.body);

        var message = { 
            app_id: process.env.API_ID,
            excluded_segments,
            contents,
            headings,
            data,
            included_segments,
            delayed_option,
            delivery_time_of_day
        };
        
        let result = await sendNotification(message);

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


const notificationSegmentTemplate = async (req, res = response) => {
    const { included_segments, template_id,
        excluded_segments, data, 
        contents, headings } = req.body;
    console.log("Entro");
    try {
        console.log(req.body);

        var message = { 
            app_id: process.env.API_ID,
            excluded_segments,
            contents,
            headings,
            data,
            included_segments,
            template_id
        };
        
        let result = await sendNotification(message);

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

const notificationSegmentButtons = async (req, res = response) => {
    const { included_segments, buttons,
        excluded_segments, data, 
        contents, headings } = req.body;
    console.log("Entro");
    try {
        console.log(req.body);

        var message = { 
            app_id: process.env.API_ID,
            excluded_segments,
            contents,
            headings,
            data,
            included_segments,
            buttons
        };
        
        let result = await sendNotification(message);

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

const notificationSegmentUserId = async (req, res = response) => {
    const { included_segments, channel_for_external_user_ids, include_external_user_ids,
        excluded_segments, data, 
        contents, headings } = req.body;
    console.log("Entro");
    try {
        console.log(req.body);

        var message = { 
            app_id: process.env.API_ID,
            excluded_segments,
            contents,
            headings,
            data,
            included_segments,
            channel_for_external_user_ids,
            include_external_user_ids
        };
        
        let result = await sendNotification(message);

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

const notificationSegmentDeviceId = async (req, res = response) => {
    const { included_segments, include_player_ids, include_external_user_ids,
        excluded_segments, data, 
        contents, headings } = req.body;
    console.log("Entro");
    try {
        console.log(req.body);

        var message = { 
            app_id: process.env.API_ID,
            excluded_segments,
            contents,
            headings,
            data,
            included_segments,
            include_player_ids,
            include_external_user_ids
        };
        
        let result = await sendNotification(message);

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

const notificationCancel = async (req, res = response) => {
    const { id} = req.body;
    console.log("Entro");
    try {
        console.log(req.body);
        let result = await cancelNotification(process.env.API_ID, id);

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
    notificationSegment,
    notificationSegmentTime,
    notificationSegmentTemplate,
    notificationSegmentButtons,
    notificationSegmentUserId,
    notificationSegmentDeviceId,
    notificationCancel
}