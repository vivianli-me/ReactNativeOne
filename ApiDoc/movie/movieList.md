
# 分页请求电影信息列表

## URL
http://v3.wufazhuce.com:8000/api/movie/list/${id}

## 参数
ONE APP中分页拉取规则都是一样的, 拉取第一页时id字段一定得传0, 会返回一个电影信息列表, 列表中每一项都会有一个id字段, 拉取第n页时id等于上一次所拉取到的列表最后一项的id,
比如, 第一次拉取到的列表最后一项电影信息id字段等于198, 则拉取第二页时令id == 198. 当返回列表为空时, 则代表没有下一页数据了

## 请求示范
+ http://v3.wufazhuce.com:8000/api/movie/list/0

## HTTP请求方式
GET

## 数据返回格式
JSON

##是否需要登录
否

## 返回结果示例
```
{
  "res": 0,
  "data": [
    {
      "id": "145",
      "title": "侠探杰克：永不回头",
      "verse": "",
      "verse_en": "",
      "score": "73",
      "revisedscore": "0",
      "releasetime": "2016-10-21 00:00:00",
      "scoretime": "2016-10-22 00:00:00",
      "cover": "http://image.wufazhuce.com/FrN3ohkTuop315TPw8_3JR3-Sj4u",
      "servertime": 1477451008
    },
    {
      "id": "144",
      "title": "惊天破",
      "verse": "",
      "verse_en": "",
      "score": "76",
      "revisedscore": "0",
      "releasetime": "2016-10-20 18:00:00",
      "scoretime": "2016-10-21 18:00:00",
      "cover": "http://image.wufazhuce.com/FlW32pyUx12pj8OlIbgyqAE6r1gg",
      "servertime": 1477451008
    },
    {
      "id": "146",
      "title": "机械师2：复活",
      "verse": "",
      "verse_en": "",
      "score": "83",
      "revisedscore": "0",
      "releasetime": "2016-10-21 00:00:00",
      "scoretime": "2016-10-22 00:00:00",
      "cover": "http://image.wufazhuce.com/FqK1M9DKNJj9QQSJpkfqBlszfnvL",
      "servertime": 1477451008
    },
    {
      "id": "147",
      "title": "龙珠Z：复活的弗利萨",
      "verse": "",
      "verse_en": "",
      "score": "78",
      "revisedscore": "0",
      "releasetime": "2016-10-21 00:00:00",
      "scoretime": "2016-10-22 00:00:00",
      "cover": "http://image.wufazhuce.com/FiEEN19MMrQHR5x6swuYNWBqJwQl",
      "servertime": 1477451008
    },
    {
      "id": "143",
      "title": "勇士",
      "verse": "",
      "verse_en": "",
      "score": "75",
      "revisedscore": "0",
      "releasetime": "2016-10-14 00:00:00",
      "scoretime": "2016-10-15 00:00:00",
      "cover": "http://image.wufazhuce.com/Fle9u8kbcvRDrqq1cUwABb1Bl93J",
      "servertime": 1477451008
    },
    {
      "id": "142",
      "title": "黑处有什么",
      "verse": "",
      "verse_en": "",
      "score": "74",
      "revisedscore": "0",
      "releasetime": "2016-10-14 00:00:00",
      "scoretime": "2016-10-15 00:00:00",
      "cover": "http://image.wufazhuce.com/FsT6SugEUj3ihVN4u7EtLYkIgakw",
      "servertime": 1477451008
    },
    {
      "id": "141",
      "title": "圆梦巨人",
      "verse": "",
      "verse_en": "",
      "score": "80",
      "revisedscore": "0",
      "releasetime": "2016-10-14 00:00:00",
      "scoretime": "2016-10-15 00:00:00",
      "cover": "http://image.wufazhuce.com/FmZv93O3P2b6z1hZPBaxI5U3E6Z0",
      "servertime": 1477451008
    },
    {
      "id": "140",
      "title": "宾虚",
      "verse": "",
      "verse_en": "",
      "score": "67",
      "revisedscore": "0",
      "releasetime": "2016-10-10 00:00:00",
      "scoretime": "2016-10-10 00:00:00",
      "cover": "http://image.wufazhuce.com/FoIJSEN93oc5j-25Ow9IRYFw5-JR",
      "servertime": 1477451008
    },
    {
      "id": "139",
      "title": "从你的全世界路过",
      "verse": "",
      "verse_en": "",
      "score": "79",
      "revisedscore": "0",
      "releasetime": "2016-09-29 00:00:00",
      "scoretime": "2016-09-30 00:00:00",
      "cover": "http://image.wufazhuce.com/FhZUf-qlYAKHf1FAioBwj8RIa962",
      "servertime": 1477451008
    },
    {
      "id": "137",
      "title": "王牌逗王牌",
      "verse": "",
      "verse_en": "",
      "score": "44",
      "revisedscore": "0",
      "releasetime": "2016-10-01 00:00:00",
      "scoretime": "2016-10-02 00:00:00",
      "cover": "http://image.wufazhuce.com/Fr4vg1_oL_jXKkum9vgRiu-Phcj-",
      "servertime": 1477451008
    },
    {
      "id": "138",
      "title": "湄公河行动",
      "verse": "",
      "verse_en": "",
      "score": "83",
      "revisedscore": "0",
      "releasetime": "2016-09-30 00:00:00",
      "scoretime": "2016-10-01 00:00:00",
      "cover": "http://image.wufazhuce.com/FhFB4MlEdZ3Bwt9ME4Q5XDqBMMPq",
      "servertime": 1477451008
    },
    {
      "id": "136",
      "title": "樱桃小丸子 来自意大利的少年",
      "verse": "",
      "verse_en": "",
      "score": "80",
      "revisedscore": "0",
      "releasetime": "2016-09-23 00:00:00",
      "scoretime": "2016-09-24 00:00:00",
      "cover": "http://image.wufazhuce.com/FpgvDfSfI2Lh8QvK1SNYCsNRThfn",
      "servertime": 1477451008
    },
    {
      "id": "135",
      "title": "巴黎危机 ",
      "verse": "",
      "verse_en": "",
      "score": "75",
      "revisedscore": "0",
      "releasetime": "2016-09-20 00:00:00",
      "scoretime": "2016-09-21 00:00:00",
      "cover": "http://image.wufazhuce.com/FjO9Z6XvykboWT44xQnxVDhfP7oO",
      "servertime": 1477451008
    },
    {
      "id": "134",
      "title": "我的战争",
      "verse": "",
      "verse_en": "",
      "score": "78",
      "revisedscore": "0",
      "releasetime": "2016-09-15 00:00:00",
      "scoretime": "2016-09-16 00:00:00",
      "cover": "http://image.wufazhuce.com/FreUaG9BijILBJ6xt5Lx8OIIiQxN",
      "servertime": 1477451008
    },
    {
      "id": "132",
      "title": "反贪风暴2",
      "verse": "",
      "verse_en": "",
      "score": "66",
      "revisedscore": "0",
      "releasetime": "2016-09-14 12:17:00",
      "scoretime": "2016-09-15 00:00:00",
      "cover": "http://image.wufazhuce.com/Fvi11GCA2fks1smieeX233CJEw5v",
      "servertime": 1477451008
    },
    {
      "id": "133",
      "title": "追凶者也",
      "verse": "",
      "verse_en": "",
      "score": "82",
      "revisedscore": "0",
      "releasetime": "2016-09-14 00:00:00",
      "scoretime": "2016-09-15 00:00:00",
      "cover": "http://image.wufazhuce.com/FsaaSi1v8bVBLDojC6iuOiIbyc5q",
      "servertime": 1477451008
    },
    {
      "id": "131",
      "title": "麦兜：饭宝奇兵",
      "verse": "",
      "verse_en": "",
      "score": "75",
      "revisedscore": "0",
      "releasetime": "2016-09-15 00:00:00",
      "scoretime": "2016-09-16 00:00:00",
      "cover": "http://image.wufazhuce.com/FjS85CAC4CMaxWLDXIxrb-oOPjoV",
      "servertime": 1477451008
    },
    {
      "id": "130",
      "title": "七月与安生",
      "verse": "",
      "verse_en": "",
      "score": "85",
      "revisedscore": "0",
      "releasetime": "2016-09-14 00:00:00",
      "scoretime": "2016-09-15 00:00:00",
      "cover": "http://image.wufazhuce.com/FkyEg3bYW4SunBArrK9UYJO1klAk",
      "servertime": 1477451008
    },
    {
      "id": "128",
      "title": "鲨滩",
      "verse": "",
      "verse_en": "",
      "score": "74",
      "revisedscore": "0",
      "releasetime": "2016-09-09 00:00:00",
      "scoretime": "2016-09-10 00:00:00",
      "cover": "http://image.wufazhuce.com/Fn4VyvpEhFVmJflW7D7nXwT1ccq2",
      "servertime": 1477451008
    },
    {
      "id": "129",
      "title": "魔法老师",
      "verse": "",
      "verse_en": "",
      "score": "79",
      "revisedscore": "0",
      "releasetime": "2016-09-09 00:00:00",
      "scoretime": "2016-09-10 00:00:00",
      "cover": "http://image.wufazhuce.com/Fndv0N2DgZhmBkSLWnvZPzkCWfSu",
      "servertime": 1477451008
    }
  ]
}
```

# 列表项字段解析
|       字段         |       类型        |       含义        |
|-------------------|:-----------------:|:-----------------:|
|       id	        |       String	    |                   |
|       title       |	    String      |	    标题        |
|       verse       |	    String      |                   |
|       verse_en    |	    String      |                   |
|       score       |	    String      |	                |
|       revisedscore|	    String      |	                |
|       releasetime |	    String      |	2016-10-21 00:00:00|
|       scoretime	|       String      |	2016-10-22 00:00:00|
|       cover       |	    String      |	封面图片        |
|       servertime  |	    Integer     |	                |