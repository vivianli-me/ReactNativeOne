
# 请求电影详细信息

## URL
http://v3.wufazhuce.com:8000/api/movie/detail/${id}

## 参数
电影id

## 请求示范
+ http://v3.wufazhuce.com:8000/api/movie/detail/145

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
  "data": {
    "id": "145",
    "title": "侠探杰克：永不回头",
    "indexcover": "http://image.wufazhuce.com/FrN3ohkTuop315TPw8_3JR3-Sj4u",
    "detailcover": "http://image.wufazhuce.com/FhgeR8_8LowCbw4rC9USLReCsuKo",
    "video": "http://music.wufazhuce.com/luZ6mb1WYpzcAwHOPJk28WKs1C7K",
    "verse": "",
    "verse_en": "",
    "score": "73",
    "revisedscore": "0",
    "review": "当前用户评分：73,",
    "keywords": "中国人民的好朋友;阿汤哥;罗宾阿姨;系列小说;女跟班",
    "movie_id": "308231362",
    "info": "导演: 爱德华·兹威克\r\n编剧: 马歇尔·赫斯科维兹/理查德·温克/爱德华·兹威克/李查德\r\n主演: 汤姆·克鲁斯/寇碧·史莫德斯/罗伯特·克耐普/达妮卡·亚罗什\r\n类型: 剧情/动作/悬疑/惊悚/犯罪\r\n制片国家/地区: 美国",
    "officialstory": "杰克重回弗吉尼亚州的军事基地和苏珊·特纳少校会面，要解决一些个人问题。此时，特纳却意外被捕。杰克同时也陷入谜团，因为他被诬告犯有重罪，而且牵涉到一个自己完全不知道的小孩。这些，杰克都记不起来了。他要客服重重困难，去寻找特纳，最终解决问题。 ",
    "charge_edt": "（责任编辑：王素）",
    "web_url": "http://m.wufazhuce.com/movie/145",
    "praisenum": 0,
    "sort": "38",
    "releasetime": "2016-10-21 00:00:00",
    "scoretime": "2016-10-22 00:00:00",
    "maketime": "2016-10-20 17:21:00",
    "last_update_date": "2016-10-21 09:06:53",
    "read_num": "20801",
    "photo": [
      "http://image.wufazhuce.com/FsdptFjOzOLYuU96fzbh3NYeTNv3",
      "http://image.wufazhuce.com/Fgtqqgkq2rE_3zunvOCoP7ArEJXw",
      "http://image.wufazhuce.com/Fqt3KzoEzXg1QPCbPhbJgHD9b90p",
      "http://image.wufazhuce.com/FvqKsALVpmJJSKe3HcqFhIuVPA8-",
      "http://image.wufazhuce.com/FpuDQtHWmisn4DJrb4dvfEqfkKMz"
    ],
    "sharenum": 18,
    "commentnum": 26,
    "servertime": 1477451632
  }
}
```

# 列表项字段解析

|       字段        |       类型        |       含义        |
|-------------------|:-----------------:|:-----------------:|
|       id	        |       String  	|                   |
|       title       |	    String  	|   电影标题        |
|       indexcover  |	    String      |	                |
|       detailcover |   	String      |   顶部图片        |
|       video	    |       String      |   电影预告片地址  |
|       verse	    |       String      |                   |
|       verse_en    |   	String      |                   |
|       score	    |       String	    |                   |
|       revisedscore|	    String	    |                   |
|       review	    |       String	    |                   |
|       keywords	|       String	    |   底下的五个关键词|
|       movie_id	|       String	    |                   |
|       info	    |       String	    |   影片制作相关信息|
|   officialstory   |	    String	    |                   |
|       charge_edt  |	    String	    |   责任编辑        |
|       web_url	    |       String	    |                   |
|       praisenum	|       Integer	    |                   |
|       sort        |	    String      |	                |
|       releasetime	|       String	    |时间，格式(2016-10-21 00:00:00)|
|       scoretime   |	    String      |	格式同上        |
|       maketime    |	    String      |	格式同上        |
|   last_update_date|	    String      |	格式同上        |
|       read_num	|       String	    |                   |
|       photo	    |       Array	    |   剧照，图片数组  |
|       sharenum	|       Integer	    |                   |
|       commentnum	|       Integer     |                   |
|       servertime	|       Integer	    |   时间戳          |