import React, { useState, useEffect } from "react";

import { Text, FlatList } from "react-native";
import styles from "../stylesheet";

import { Overlay } from "react-native-elements";
import { ManageTeam } from "../components/ManageTeam";

import { useComics } from "../providers/ComicsProvider";
import {ComicItem} from "../components/ComicItem"

export function ComicListView() {


  const { comics } = useComics();

  return (
    <FlatList
                      data={comics}
                      renderItem={({item, index}) => {
                        return <ComicItem comic={item}/>
                      }}
                      keyExtractor={(item, index) => item._id}
                          />
  );
}
