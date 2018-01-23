
/*----------------------------------------后台Api地址----------------------------------------*/
export const APP_SERVE_URL = 'http://192.168.0.20:8007/api/';

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://192.168.0.20:8007/file/';//文件服务:测试环境

/*----------------------------------------web服务器地址----------------------------------------*/
export const WEB_SERVE_URL = 'http://192.168.0.20:8007/';//web服务器地址:web环境

/*----------------------------------------app版本升级服务地址----------------------------------------*/
//app版本升级服务;测试环境,查询app最新版本号,更新日志等信息.
export const APP_VERSION_SERVE_URL = 'http://192.168.0.20:8007/api/version';


export const IS_DEBUG = false;//是否开发(调试)模式

export const DEFAULT_AVATAR = './assets/img/avatar.png';//用户默认头像
export const PAGE_SIZE = 5;//默认分页大小
export const IMAGE_SIZE = 1024;//拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 94;//图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000;//请求超时时间,单位为毫秒

export const APK_DOWNLOAD = 'http://192.168.0.20:8007/zhiqingchun.apk';//android apk下载完整地址,用于android本地升级
export const APP_DOWNLOAD = 'http://192.168.0.20:8007/api/version/download';//app网页下载地址,用于ios升级或android本地升级失败
