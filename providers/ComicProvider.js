import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { comicSchema } from "../schemas";
import { useAuth } from "./AuthProvider";

const ComicContext = React.createContext(null);

const ComicProvider = ({ children, route }) => {
  const [comic, setComic] = useState([]);
  const { user } = useAuth();
  const { comicId } = route.params;

  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);

  useEffect(() => {
    const config = {
      sync: {
        user: user,
        partitionValue: user.id,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const comicFound = projectRealm.objectForPrimaryKey("comic", comicId);
      setComic(comicFound);
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setComic({});
      }
    };
  }, [user]);

/* TODO: denne metode må kunne gøres pænere*/
  const saveComic = (title, subtitle) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
        if(title.length>0) {
          comic.title=title;
        }
        if(subtitle.length>0) {
          comic.subtitle=subtitle;
        }
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <ComicContext.Provider
      value={{
        saveComic,
        comic,
      }}
    >
      {children}
    </ComicContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useComic = () => {
  const comic = useContext(ComicContext);
  if (comic == null) {
    throw new Error("useComic() called outside of a ComicProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return comic;
};

export { ComicProvider, useComic };
