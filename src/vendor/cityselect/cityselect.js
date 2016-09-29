/***
 * 插件名称: 中国省市信息联动插件
 */
$._cityInfo = [{"n":"北京市","c":["北京市"]},
    {"n":"上海市","c":["上海市"]},
    {"n":"天津市","c":["天津市"]},
    {"n":"重庆市","c":["重庆市"]},
    {"n":"浙江省","c":["温州市"]},
    {"n":"湖北省","c":["武汉市"]},
    {"n":"湖南省","c":["郴州市"]},
    {"n":"云南省","c":["昆明市"]},
    {"n":"广西省","c":["南宁市"]},
    {"n":"河北省","c":["邯郸市","廊坊市","沧州市","唐山市","霸州市"]},
    {"n":"辽宁省","c":["辽阳市","本溪市","丹东市","凤城市","瓦房店市","沈阳市"]},
    {"n":"吉林省","c":["吉林市","长春市","四平市"]},
    {"n":"黑龙江省","c":["哈尔滨市","双鸭山市","安达市","佳木斯市","绥化市","齐齐哈尔市","鹤岗市","绥芬河市","铁力市","五常市","伊春市","七台河市","黑河"]},
    {"n":"江苏省","c":["常州市","南京市","徐州市"]},
    {"n":"安徽省","c":["芜湖市","合肥市","淮南市","亳州市","阜阳市","滁州市","宿州市","蚌埠市","淮北市","六安市"]},
    {"n":"福建省","c":["厦门市","福州市"]},
    {"n":"山东省","c":["青岛市","济南市","青州市","潍坊市","即墨市"]},
    {"n":"河南省","c":["郑州市","洛阳市","信阳市","开封市","许昌市"]},
    {"n":"广东省","c":["汕头市","深圳市","佛山市","广州市","东莞市","梅州市"]},
    {"n":"海南省","c":["三亚市","海口市"]},
    {"n":"四川省","c":["成都市","德阳市","都江堰市","泸州市","绵竹市","绵阳市","广元市","巴中市","彭州市","达州市","资阳市","内江市","南充市","邛崃市","重庆市","简阳市"]},
    {"n":"陕西省","c":["西安市","安康市"]}];

$.initProv = function(prov, city, defaultProv, defaultCity) {
    var provEl = $(prov);
    var cityEl = $(city);
    var hasDefaultProv = (typeof(defaultCity) != 'undefined');

    var provHtml = '';

    provHtml += '<option value="-1">请选择</option>';
    for(var i = 0; i < $._cityInfo.length; i++) {
        provHtml += '<option value="' + i + '"' + ((hasDefaultProv && $._cityInfo[i].n == defaultProv) ? ' selected="selected"' : '') + '>' + $._cityInfo[i].n + '</option>';
    }
    provEl.html(provHtml);
    $.initCities(provEl, cityEl, defaultCity);
    provEl.change(function() {
        $.initCities(provEl, cityEl);
    });
};

$.initCities = function(provEl, cityEl, defaultCity) {
    var hasDefaultCity = (typeof(defaultCity) != 'undefined');
    if(provEl.val() != '' && parseInt(provEl.val()) >= 0) {
        var cities = $._cityInfo[parseInt(provEl.val())].c;
        var cityHtml = '';
        if(provEl.val()!="0"&&provEl.val()!="1"&&provEl.val()!="2"&&provEl.val()!="3"&&
            provEl.val()!="4"&&provEl.val()!="5"&&provEl.val()!="6"&&provEl.val()!="7"&&provEl.val()!="8"){
            cityHtml += '<option value="-1">请选择</option>';
        }
        for(var i = 0; i < cities.length; i++) {
            cityHtml += '<option value="' + i + '"' + ((hasDefaultCity && cities[i] == defaultCity) ? ' selected="selected"' : '') + '>' + cities[i] + '</option>';
        }
        cityEl.html(cityHtml);
    } else {
        cityEl.html('<option value="-1">请选择</option>');
    }
};