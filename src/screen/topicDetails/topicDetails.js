import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import { verticalScale } from '../../lib/utils';
import palette from '../../theme/palette';
import Header from '../../components/Layout/header';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const data = {
    "id": 43783,
    "date": "2022-05-06T09:32:41",
    "date_gmt": "2022-05-06T09:32:41",
    "guid": {
        "rendered": "https://wordpress-575854-4040987.cloudwaysapps.com/?post_type=sfwd-topic&#038;p=43783"
    },
    "modified": "2022-05-06T09:32:41",
    "modified_gmt": "2022-05-06T09:32:41",
    "slug": "6-soothing-teas-for-upset-tummy",
    "status": "publish",
    "type": "sfwd-topic",
    "link": "https://wordpress-575854-4040987.cloudwaysapps.com/courses/5-easy-tips-for-stiff-neck/lessons/5-easy-tips-for-stiff-neck/topic/6-soothing-teas-for-upset-tummy/",
    "title": {
        "rendered": "6 Soothing Teas For Upset Tummy"
    },
    "content": {
        "rendered": "\n<figure class=\"wp-block-image size-full\"><img loading=\"lazy\" decoding=\"async\" width=\"1000\" height=\"1001\" src=\"https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy.png\" alt=\"\" class=\"wp-image-43790\" srcset=\"https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy.png 1000w, https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy-300x300.png 300w, https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy-150x150.png 150w, https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy-768x769.png 768w, https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy-624x625.png 624w, https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy-600x601.png 600w, https://wordpress-575854-4040987.cloudwaysapps.com/wp-content/uploads/2022/05/Upset-Tummy-100x100.png 100w\" sizes=\"(max-width: 1000px) 100vw, 1000px\" /><figcaption>These herbal brews will soothe your tummy to a T 🍵☕</figcaption></figure>\n",
        "protected": false
    },
    "author": 2837,
    "featured_media": 0,
    "menu_order": 0,
    "template": "",
    "ld_topic_category": [],
    "ld_topic_tag": [],
    "acf": [],
    "topic_materials": "",
    "forced_lesson_time": "",
    "lesson_assignment_upload": "",
    "auto_approve_assignment": "",
    "assignment_upload_limit_count": "",
    "lesson_assignment_points_enabled": "",
    "lesson_assignment_points_amount": "",
    "assignment_upload_limit_extensions": "",
    "assignment_upload_limit_size": "",
    "_links": {
        "self": [
            {
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/sfwd-topic/43783"
            }
        ],
        "collection": [
            {
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/sfwd-topic"
            }
        ],
        "about": [
            {
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/types/sfwd-topic"
            }
        ],
        "author": [
            {
                "embeddable": true,
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/users/2837"
            }
        ],
        "version-history": [
            {
                "count": 1,
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/sfwd-topic/43783/revisions"
            }
        ],
        "predecessor-version": [
            {
                "id": 43796,
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/sfwd-topic/43783/revisions/43796"
            }
        ],
        "wp:attachment": [
            {
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/media?parent=43783"
            }
        ],
        "wp:term": [
            {
                "taxonomy": "ld_topic_category",
                "embeddable": true,
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/ld_topic_category?post=43783"
            },
            {
                "taxonomy": "ld_topic_tag",
                "embeddable": true,
                "href": "https://wordpress-575854-4040987.cloudwaysapps.com/wp-json/wp/v2/ld_topic_tag?post=43783"
            }
        ],
        "curies": [
            {
                "name": "wp",
                "href": "https://api.w.org/{rel}",
                "templated": true
            }
        ]
    }
};

function TopicDetails() {

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: palette.background.default,
            ...layoutPadding,
        }}>
            <Header title={data.title.rendered}/>
            <View style={{
                backgroundColor: palette.background.default,
                marginTop: verticalScale(30),
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <View>
                    <RenderHTML
                        source={{
                            html: data.content.rendered || '<p>1:04</p>',
                        }}
                        contentWidth={300}
                        tagsStyles={{
                            p: {
                                color: palette.text.primary,
                                fontWeight: 400,
                                padding: 0,
                                margin: 0,
                                fontSize: 12,
                            },
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default TopicDetails
