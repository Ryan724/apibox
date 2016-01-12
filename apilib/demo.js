if (typeof exports === 'undefined') {
    exports = {};
}

exports.config = {
    "name": "这是接口名",
    "project":"4e333867b7612846e8b087296343e5fc",
    "desc": "这是接口的详细描述",
    "url": "http://example.com/demo",
    "method": ['GET'],
};

exports.request = {
    "id": "1000"   // 查询字段 
};

exports.response = {
    "success": true, // 标记成功
    "model": {
        // 规则：或者字段「title」不存在，若存在则「title」的值必须匹配正则表达式（不区分大小写，以 xyz 开头，数字结尾）
        // 详细规则请参考 http://work.tmall.net/projects/if/wiki/spec#响应
        "title": "string",
        "title": "xyz0",
        // 规则：字段「list」允许不存在
        "list__RULE__": "{{not-required}}",
        "list": [// 列表数据
            {// 单条记录
                "id": 1000,
                "name": "name-123"
            },
            {// 单条记录
             "id": 1000,
             "name": "name-123"
            }
        ]
    }
};

exports.responseError = {
    "success": false, // 标记失败
    "model": {
        // 常见错误信息请参考  http://work.tmall.net/projects/if/wiki/suggest
        "error": "Error message"
    }
};
