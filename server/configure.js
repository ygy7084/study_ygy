const fs = require('fs');
const path = require('path');

const file_location = path.join('./','config.json');
const config = JSON.parse(fs.readFileSync(file_location, 'utf8'));
const config_key = [
    'GCLOUD_PROJECT',
    'DATA_BACKEND',
    'MONGO_URL',
    'MONGO_COLLECTION',
    'CLOUD_BUCKET',
    'OAUTH2_CLIENT_ID',
    'OAUTH2_CLIENT_SECRET',
    'OAUTH2_CALLBACK',
    'MEMCACHE_URL',
    'PORT',
    'NODE_ENV',
    'SECRET'
];

let this_module = {
    'GCLOUD_PROJECT':'',
    'DATA_BACKEND':'',
    'MONGO_URL':'',
    'MONGO_COLLECTION':'',
    'CLOUD_BUCKET':'',
    'OAUTH2_CLIENT_ID':'',
    'OAUTH2_CLIENT_SECRET':'',
    'OAUTH2_CALLBACK':'',
    'MEMCACHE_URL':'',
    'PORT':'',
    'NODE_ENV':'',
    'SECRET':''
};
(function() {
    for(let i=0;i<config_key.length;i++) {
        if(config[config_key[i]])
            this_module[config_key[i]] = config[config_key[i]];
    }

    this_module.PORT = process.env.PORT || 3000;
    this_module.NODE_ENV = (process.env.NODE_ENV||'development');
    if(this_module.NODE_ENV ==='development') {
        this_module.OAUTH2_CALLBACK = "http://localhost:"+this_module.PORT+"/auth/google/callback";
    }
    this_module.SECRET = 'keyboardcat';
}());

module.exports = this_module;