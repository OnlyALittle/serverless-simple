const config = require('./util/index');
var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');
const Mysql = require('serverless-mysql');
const Redis = require("ioredis");
let mysqlConn;
let redisConn;

// exports.initializer: initializer function
module.exports.initializer = async function (context, callback) {
    const { mysqlConfig, redisConfig } = config;
    mysqlConn = Mysql({
        config: mysqlConfig
    });
    redisConn = await new Redis(redisConfig);
    await mysqlConn.connect().catch((err) => {
        console.log('连接数据库存在问题', err)
    });
    callback(null, '');
}
   

module.exports.handler = async function(request, response, context) {
    console.log('redis、mysql test');
    let sqlResults = [];
    let redisResults = {};
    await getDataFromMysql().then((res) => {
        console.log(res);
        sqlResults = res;
    });
    await getDataFromRedis().then(res => {
        redisResults = res;
    })
    console.log(sqlResults, redisResults);
    response.setStatusCode(200);
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify({
        sqlResults,
        redisResults
    }));
}

const getDataFromMysql = async ()=> {
    return mysqlConn.query('select * from test').catch((err) => {
        console.log('sql存在问题', err)
    });
}

const getDataFromRedis = async ()=> {
    await redisConn.set("foo", "barvpc");
    return redisConn.get("foo").finally(() => {
        redisConn.del("foo");
    });
}
