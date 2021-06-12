import React, { useState, useEffect } from "react";

import { Text, FlatList } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";

import { useComics } from "../providers/ComicListProvider";
import {ComicItem} from "../components/ComicItem"

export function ComicListView({navigation}) {


  const { comics } = useComics();

  return (
    <FlatList
                      data={comics}
                      renderItem={({item, index}) => {
                        return <ComicItem comic={item} navigation={navigation}/>
                      }}
                      keyExtractor={(item, index) => item._id.toString()}
                          />
  );
}
