const HOST = 'http://api.sh.jiaxiaolei.com:9999/'
// const HOST = 'http://172.168.10.17:9999/'
export default {
	/*index page*/
    FETCH_URL: HOST,
    USER:'renwenqing',

    // news
    API_NEWS_CATEGORYS: HOST + 'api/1/news/categories/',
    API_NEWS: HOST + 'api/1/news/',
    API_NEWS_DETAIL: HOST + 'api/1/news/',
    PAGE_SIZE: '10',

    // airport pickup
    API_AIRPORT_PICKUP: HOST + 'api/1/flight/',
    PICKUP_CARCAR: 'http://car.qunar.com/CharteredCar/index.jsp?serviceType=2&from=177',
    PICKUP_SH: 'http://www.26262662.cn/jcjs.html',
    SH_DEST: ['TPE'],

    // 目的地
    DISCOVERY_CITIES: HOST + 'api/1/discovery/cities/',
    DISCOVERY_HOME: HOST + 'api/1/discovery/home/',

    // PA
    PA_HOST: 'kiteapp.cicaero.com',
    PA_PORT: 10001,

    // game
    API_GAME: HOST + 'api/1/op/game/',

    // weibo
    WEIBO: 'https://passport.weibo.cn/signin/login?entry=mweibo',

    // yimi
    ECOMMERCE: 'http://hiyimi.kitefans.com/#/home?islogin=0'
}
