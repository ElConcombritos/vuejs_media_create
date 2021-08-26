const { JSDOM } = require( "jsdom" );
const { location } = require( "location" );
const { navigator } = require( "navigator" );
const { xmlhttprequest } = require( "xmlhttprequest" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

export default test

export class test {

    static init_plugin_accident(div, media, template, counter) {
        var name_tpl = media.name_media;
        var element_tpl = $('#' + name_tpl);
        var dom_public = media.dom_public;

        div.html('<div class="ui grid page stackable" style="padding: 0; margin-top: 0rem;">');
        if (media.media['format'] !== "landscape" && media['type_viewer'] === "viewer") {
            div.find('.stackable').html('<div class="nine wide column" style="padding: 0;">');
        } else {
            div.find('.stackable').html('<div class="sixteen wide column" style="padding: 0;">')
        }

        div.find('.stackable').find('.column').append('<div id="' + media.name_media + '" class="segment_player ui segment" style="padding: 0; overflow: hidden; border: 0;">');
        for (let e of template) {
            if (e.id == media.media.template) {
                element_tpl.append(e.code);
            }
        }

        var width_tpl = element_tpl.outerWidth();
        var height_tpl;

        if (media.type_viewer === 'viewer') {
            if (media.media.format === 'landscape') {
                height_tpl = width_tpl * 9 / 16;
                element_tpl.css("height", height_tpl);
            } else {
                width_tpl = width_tpl * 100 / 62.5;
                height_tpl = width_tpl * 9 / 16;
                element_tpl.css({"width": height_tpl, "height": width_tpl});
            }

        } else {
            if (media.media.format === 'landscape') {
                height_tpl = width_tpl * 9 / 16;
                element_tpl.css("height", height_tpl);
            } else {
                height_tpl = width_tpl * 16 / 9;
                element_tpl.css("height", height_tpl);
            }
        }

        element_tpl.find('.grib_player').css({
            'height': 'inherit',
            'background-color': '#1b1c1d',
            'margin': '0 !important',
            'padding': '0 !important'
        })
        element_tpl.find('.column_player').css({'height': '100%', 'padding': '0 !important'});
        element_tpl.find('.segment_player').not('.m1u').not('.m2u').not('.m3u').css({
            'height': 'inherit',
            'padding': '0 !important',
            'box-shadow': 'none',
            'margin': '0 !important',
            'border': '0 !important',
            'border-radius': '0 !important',
            'overflow': 'hidden',
            'position': 'relative',
            'background-color': 'transparent !important'
        });
        element_tpl.find('.m0u').css({
            'border': 'none',
            'border-radius': 0,
            'background': 'transparent',
            'box-shadow': 'none'
        });
        element_tpl.find('.m2u').css({
            'border': 'none',
            'border-radius': 0,
            'background': 'transparent',
            'box-shadow': 'none'
        });
        element_tpl.find('.m3u').css({
            'border': 'none',
            'border-radius': 0,
            'background': 'transparent',
            'box-shadow': 'none'
        });
        element_tpl.find('.m3u').css({
            'border': 'none',
            'border-radius': 0,
            'background': 'transparent',
            'box-shadow': 'none'
        });

        element_tpl.find('.utext').find('.ucontent').css({
            'width': '100%',
            'height': '100%',
            'background-color': 'rgba(255, 255, 255, 1)',
            'color': 'rgba(0, 0, 0, 0.99)',
            'text-align': 'center'
        });
        element_tpl.find('.m0u').css({'overflow': 'hidden'});
        element_tpl.find('.m1u').css({'overflow': 'hidden'});
        element_tpl.find('.m2u').css({'overflow': 'hidden'});
        element_tpl.find('.m3u').css({'overflow': 'hidden'});

        function add_zones(zone, file, styles) {
            var template = element_tpl;
            if (file.type == 'text') {
                var font_size = template.find('#' + zone).outerHeight();
                template.find('#' + zone).html('<div class="utext" style="width:' + styles.width + ';height:' + styles.height + ';top:' + styles.top + ';left:' + styles.left + ';position:' + styles.position + ';font-size:' + font_size + 'px;line-height:' + font_size + 'px;">' +
                    '<div class="ucontent" style="font-size:' + styles.size + ';background-color:' + styles.bgcolor + ';color:' + styles.color + ';">' + file.text + '</div></div>');
            }
            if (file.type == 'image') {
                template.find('#' + zone).html('<div style="width:' + styles.width + ';height:' + styles.height + ';top:' + styles.top + ';left:' + styles.left + ';position:' + styles.position + ';">' +
                    '<img src="' + file.name + '" style="width:100%;height:100%;" /></div>');
            }
            if (file.type == 'video') {
                if (file.mime == 'video/mp4') {
                    template.find('#' + zone).html('<div style="width:' + styles.width + ';height:' + styles.height + ';top:' + styles.top + ';left:' + styles.left + ';position:' + styles.position + ';">' +
                        '<video loop autoplay style="width:100%;height:100%;"><source src="' + file.name + '" type="video/mp4"></video></div>');
                }
                if (file.mime == 'video/x-flv') {
                    template.find('#' + zone).html('<div style="width:' + styles.width + ';height:' + styles.height + ';top:' + styles.top + ';left:' + styles.left + ';position:' + styles.position + ';">' +
                        '<object type="application/x-shockwave-flash" data="' + dom_public + 'media/videoo720p.swf" style="width:100%;height:100%;">' +
                        '<param name="quality" value="high"><param name="wmode" value="transparent"><param name="scale" value="showall">' +
                        '<param name="menu" value="false"><param name="swfversion" value="15.0.0.0"><param name="cursor" value="none">' +
                        '<param name="flashvars" value="lien=' + file.name + '"></object>/<div>');
                }
            }
            if (file.type == 'application') {
                template.find('#' + zone).html('<div style="width:' + styles.width + ';height:' + styles.height + ';top:' + styles.top + ';left:' + styles.left + ';position:' + styles.position + ';">' +
                    '<embed src="' + file.name + '" style="height:100%;width:100%;" scale="showall" wmode="transparent" /></div>');
            }
        }

        function diff_date(d1, d2) {
            var Date1 = new Date(d1);
            var Date2 = new Date(d2);
            var WNbJours = Date2.getTime() - Date1.getTime();
            return Math.ceil(WNbJours / (1000 * 60 * 60 * 24));
        }

        let zones = media.media.zone;
        for (var key in zones) {
            if (!zones.getOwnPropertyDescriptor("", key)) {
                continue;
            }
            var styles;
            if (zones[key].type == 'text') {
                styles = {
                    position: 'absolute',
                    width: zones[key].width + '%',
                    height: zones[key].height + '%',
                    top: zones[key].top + '%',
                    left: zones[key].left + '%',
                    size: zones[key].size + '%',
                    bgcolor: zones[key].bgcolor,
                    color: zones[key].color
                };
                add_zones(key, zones[key], styles);
            } else {
                styles = {
                    position: 'absolute',
                    width: zones[key].width + '%',
                    height: zones[key].height + '%',
                    top: zones[key].top + '%',
                    left: zones[key].left + '%'
                };
                add_zones(key, media.files[zones[key].id], styles);
            }
        }

        if (media.media.bg_file != '0') {
            element_tpl.find('.grib_player').css({
                'background-image': 'url("' + media.files[media.media.bg_file].name + '")',
                'background-size': 'cover',
                'background-color': media.media.bg_color,
                'color': media.media.color,
                'padding': '0'
            });
        } else {
            element_tpl.find('.grib_player').css({
                'background-color': media.media.bg_color,
                'color': media.media.color,
                'margin': '0 !important',
                'padding': '0'
            });
        }
        element_tpl.find('.grib_player').css('cssText', element_tpl.find('.grib_player').attr('style') + 'margin: 0 !IMPORTANT;');

        element_tpl.find('.column_player').css('cssText', element_tpl.find('.column_player').attr('style') + 'padding: 0 !IMPORTANT;');

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var date_now = year + '-' + month + '-' + day;

        var dateParts = counter.last_date.split("-");
        if (media.media.date_style == 'm/d/Y') {
            element_tpl.find('.last_date').empty().append(dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0]);
        } else if (media.date_style == 'Y/m/d') {
            element_tpl.find('.last_date').empty().append(dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2]);
        } else {
            element_tpl.find('.last_date').empty().append(dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]);
        }

        var day_diff = diff_date(counter.last_date, date_now);
        if (media.media.animation == '1') {
            $({someValue: 0}).animate({someValue: counter.record}, {
                duration: 5000,
                easing: 'swing',
                step: function () {
                    element_tpl.find('.record').text(Math.round(this.someValue));
                }
            });
            $({someValue: 0}).animate({someValue: day_diff}, {
                duration: 5000,
                easing: 'swing',
                step: function () {
                    element_tpl.find('.count_day').text(Math.round(this.someValue));
                }
            });
        } else {
            element_tpl.find('.record').empty().append(counter.record);
            element_tpl.find('.count_day').empty().append(day_diff);
        }

        function_parseStyle();

        function function_parseStyle() {
            element_tpl.find('.utext').each(function () {
                let font_size = $(this).parent('div').outerHeight();
                let line_height = $(this).outerHeight();
                $(this).css({'font-size': font_size + 'px', 'line-height': line_height + 'px'});
            });

            var size_record = element_tpl.find('.record').outerHeight();
            element_tpl.find('.record').css({
                'font-size': size_record * 0.7 + 'px',
                'line-height': size_record + 'px',
                'padding': '0',
                'margin': '0 !important'
            });
            var size_date = element_tpl.find('.last_date').outerHeight();
            element_tpl.find('.last_date').css({
                'font-size': size_date * 0.35 + 'px',
                'line-height': size_date + 'px',
                'padding': '0',
                'margin': '0 !important'
            });
            var size_count = element_tpl.find('.count_day').outerHeight();
            element_tpl.find('.count_day').css({
                'font-size': size_count * 0.7 + 'px',
                'line-height': size_count + 'px',
                'padding': '0',
                'margin': '0 !important'
            });
        }
    }
}
