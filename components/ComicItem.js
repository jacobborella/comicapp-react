import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";
import { ActionSheet } from "./ActionSheet";

export function ComicItem({ navigation, comic }) {
  return (
    <>
      <ListItem
        key={comic._id}
        title={comic.title + (comic.subtitle? ' ' + comic.subtitle: '')}
        onPress={() => {
                  navigation.navigate('Comic View', {
                    comicId: comic._id,
                  });
                }}
        bottomDivider
      />
    </>
  );
}
