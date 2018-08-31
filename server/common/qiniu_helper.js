/**
 * Created by zh on 2018/8/13.
 */
import qiniu from 'qiniu'
import qiniu_config from '../config/qiniu';

const accessKey = qiniu_config.accessKey;
const secretKey = qiniu_config.secretKey;
const bucket = qiniu_config.bucket;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


let options = {
  scope: bucket
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken = putPolicy.uploadToken(mac);

export { uploadToken }
