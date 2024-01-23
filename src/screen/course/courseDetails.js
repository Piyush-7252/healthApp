/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {ActivityIndicator, Surface} from 'react-native-paper';
import RenderHtml, {RenderHTML} from 'react-native-render-html';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import Accordion from '../../components/Accordion';
import FastImage from '../../components/Image';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import {Icon} from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import {verticalScale} from '../../lib/utils';
import {GET_COURSE_DETAIL, GET_COURSE_WISE_LESSONS} from '../../store/types';
import palette from '../../theme/palette';
import CourseDetailsSkeleton from './courseDetailSkeleton';
import * as Animatable from 'react-native-animatable';
import capitailize from 'lodash/capitalize';

const CourseDetails = props => {
  const {route: {params = {}} = {}} = props || {};
  const {id} = params || {};

  const [
    courseDetail,
    ,
    courseDetailLoading,
    getCourseDetail,
    clearCourseDetailData,
  ] = useCRUD({
    id: `${GET_COURSE_DETAIL}-${id}`,
    url: `${API_URL.coursesList}/${id}`,
    type: REQUEST_METHOD.get,
  });

  const [lessons, , lessonsLoading, getLessons, clearLessonsData] = useCRUD({
    id: `${GET_COURSE_WISE_LESSONS}-${id}`,
    url: `${API_URL.courseWiseLesson}`,
    type: REQUEST_METHOD.get,
  });

  useEffect(() => {
    getCourseDetail({_embed: true});
    getLessons({course: id});
  }, []);
  const {
    title: {rendered: title} = {},
    _embedded,
    content: {rendered: duration} = {},
  } = courseDetail || {};
  const accordionItems = [
    {title: 'Item 1', content: 'Content of Item 1'},
    {title: 'Item 2', content: 'Content of Item 2'},
  ];
  const imageUrl = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const accordionItemRenderer = ({item, index}) => {
    return (
      <Animatable.View
        key={index}
        style={{alignItems: 'center'}}
        duration={300}
        animation={'fadeIn'}
        easing="ease-out">
        <Animatable.View
          duration={300}
          animation={'fadeIn'}
          easing="ease-out"
          style={{flexDirection: 'row', gap: 8, marginTop: verticalScale(20)}}>
          <Icon name="clock-o" color={palette.background.main} />
          <Animatable.View
            duration={300}
            animation={'fadeIn'}
            easing="ease-out"
            style={{flexDirection: 'row', gap: 3}}>
            <RenderHTML
              source={{
                html: item?.content?.rendered || '<p>1:04</p>',
              }}
              contentWidth={30}
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
            <Typography variant="bodySmall">mins to complete</Typography>
          </Animatable.View>
        </Animatable.View>

        <Animatable.View
          duration={300}
          animation={'fadeIn'}
          easing="ease-out"
          style={{flexDirection: 'row', gap: 8, marginTop: verticalScale(20)}}>
          <Icon name="book" color={palette.background.appleGreen} />
          <Animatable.View
            duration={300}
            animation={'fadeIn'}
            easing="ease-out"
            style={{flexDirection: 'row', gap: 3}}>
            <Typography variant="bodySmall">10 videos,</Typography>
            <Typography variant="bodySmall">2 reading,</Typography>
            <Typography variant="bodySmall">4 quizzes</Typography>
          </Animatable.View>
        </Animatable.View>
      </Animatable.View>
    );
  };
  return (
    <Surface
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        position: 'relative',
      }}>
      <ScrollView>
        <Header
          containerStyle={{position: 'absolute', zIndex: 1, ...layoutPadding}}
        />
        {courseDetailLoading && !courseDetail ? (
          <CourseDetailsSkeleton />
        ) : (
          <View>
            <FastImage
              source={{uri: imageUrl}}
              style={{
                width: '100%',
                height: verticalScale(400),
              }}
              resizeMode={'cover'}
            />
            <View style={{...layoutPadding, paddingTop: verticalScale(15)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                <Typography variant="headlineMedium" style={{width: '80%'}}>
                  {courseDetail?.title?.rendered}
                </Typography>
                <Typography variant="headlineMedium">
                  <Icon name={'heart-o'} />
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: verticalScale(20),
                }}>
                <View style={{gap: verticalScale(5)}}>
                  <Typography variant="labelMedium">Duration</Typography>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <RenderHtml
                      source={{
                        html: duration || '<p>1:04</p>',
                      }}
                      contentWidth={30}
                      tagsStyles={{
                        p: {
                          color: palette.text.primary,
                          fontWeight: 600,
                          padding: 0,
                          margin: 0,
                        },
                      }}
                    />
                    <Typography variant="labelLarge">Min</Typography>
                  </View>
                </View>
                <View style={{gap: verticalScale(5)}}>
                  <Typography variant="labelMedium">Type</Typography>
                  <Typography variant="labelLarge">
                    {capitailize(courseDetail?.course_price_type)}
                  </Typography>
                </View>
                <View style={{gap: verticalScale(5)}}>
                  <Typography variant="labelMedium">Level</Typography>
                  <Typography variant="labelLarge">Entry</Typography>
                </View>
              </View>
              <View style={{paddingTop: verticalScale(30)}}>
                <Typography variant="bodyMedium">
                  This is a beginner level flowing Reformer workout is just what
                  you need to tone your core, hips, arms, and create length in
                  your entire body. hips, arms, and create length in your entire
                  body. hips, arms, and create length in your entire body.
                </Typography>
              </View>
              {/* <View
                style={{
                  alignItems: 'center',
                  paddingTop: verticalScale(30),
                  paddingBottom: verticalScale(24),
                }}>
                <CustomButton label={'Get Started'} />
              </View> */}
              <View
                style={{
                  marginTop: verticalScale(24),
                  marginBottom: verticalScale(20),
                }}>
                <View>
                  <View style={{marginBottom: verticalScale(8)}}>
                    <Typography variant="titleLarge">Lessons</Typography>
                  </View>
                  {lessonsLoading && !lessons && (
                    <View>
                      <ActivityIndicator size={'large'} />
                    </View>
                  )}
                  {lessons?.map(lesson => {
                    return (
                      <Accordion
                        title={lesson?.title?.rendered}
                        items={[lesson]}
                        itemRendere={accordionItemRenderer}
                        addOnIcon={<Icon name="lock" />}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Surface>
  );
};

export default CourseDetails;
