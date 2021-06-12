import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { comicSchema, comic_owned_comicsSchema, comic_owned_comics_priceSchema } from "../schemas";
import { useAuth } from "./AuthProvider";

const ComicsContext = React.createContext(null);

const ComicListProvider = ({ navigation, children}) => {
  const [comics, setComics] = useState([]);
  const { user } = useAuth();

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
    console.log(navigation);
      realmRef.current = projectRealm;

      const syncTasks = projectRealm.objects("comic");
      let sortedTasks = syncTasks.sorted(["title", "no"]);
      setComics([...sortedTasks]);
      sortedTasks.addListener(() => {
        setComics([...sortedTasks]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setComics([]);
      }
    };
  }, [user]);
  return (
    <ComicsContext.Provider
      value={{
        comics,
      }}
    >
    {children}
    </ComicsContext.Provider>
  );

};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useComics = () => {
  const task = useContext(ComicsContext);
  if (task == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return task;
};

export { ComicListProvider, useComics };
