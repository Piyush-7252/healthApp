/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import {GET_CATEGORIES_LIST} from '../../store/types';
import Chip from '../../components/Chip';
import {FlatList, ScrollView, View} from 'react-native';
import CategorySkeleton from './categorySkeleton';
import Typography from '../../components/Typography';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import palette from '../../theme/palette';
import {useFocusEffect} from '@react-navigation/native';

const numberOfSkeleton = Array(10).fill({id: 1});
const skeletonRender = () => {
  return (
    <>
      <FlatList
        contentContainerStyle={{height: 50, alignItems: 'center', gap: 20}}
        horizontal
        data={numberOfSkeleton}
        renderItem={({item, index}) => {
          return <CategorySkeleton key={index} />;
        }}
      />
    </>
  );
};
const Categories = props => {
  const {
    onItemPress = () => {},
    route: {params = {}} = {},
    refreshing,
    showSelected = true,
  } = props || {};
  const {id} = params || {};
  const [selectedCategory, setSelectedCategory] = useState({id});

  const flatListRef = useRef(null);
  const [categories, categoriesError, categoriesLoading, getCategories] =
  useCRUD({
    id: GET_CATEGORIES_LIST,
    url: `${API_URL.categoiresList}`,
    type: REQUEST_METHOD.get,
  });
  
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (refreshing) {
      getCategories();
    }
  }, [refreshing]);

  // useFocusEffect(
  //   useCallback(() => {
  //     setSelectedCategory({id});
  //   }, [id]),
  // );

  const handleItemPress = ({item}) => {
    onItemPress({item});
    setSelectedCategory(item);
  };

  const scrollToIndex = () => {
    const selectedIndex =
      categories?.findIndex(category => category.id === selectedCategory.id) ||
      0;
    if (flatListRef.current && selectedIndex !== -1) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      setSelectedCategory({});
    };
  }, []);

  useEffect(() => {
    scrollToIndex();
  }, [categories]);

  return (
    <View
      style={{...layoutPadding, backgroundColor: palette.background.default}}>
      <View style={{marginBottom: 10, marginTop: 20}}>
        <Typography variant="titleMedium">Categories</Typography>
      </View>
      {!categoriesError && categoriesLoading && !categories && skeletonRender()}
      {categories && (
        <FlatList
          contentContainerStyle={{height: 50, alignItems: 'center', gap: 20}}
          horizontal
          ref={flatListRef}
          data={categories}
          renderItem={({item, index}) => {
            const isItemSelected = item.id === selectedCategory.id;
            return (
              <Chip
                key={index}
                label={item.name}
                onPress={() => handleItemPress({item})}
                selected={true}
                style={{
                  backgroundColor: isItemSelected && showSelected
                    ? palette.background.main
                    : palette.background.offWhite,
                }}
                selectedColor={palette.background.main}
                textStyle={{color: palette.text.primary}}
                showSelectedCheck={false}
              />
            );
          }}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
      )}
    </View>
  );
};

export default Categories;
