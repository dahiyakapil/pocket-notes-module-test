import { useState, useEffect, useRef } from "react";
import stylesHome from "./Home.module.css";
import { NotesGroups } from "../../components/NotesGroup/NotesGroups";
import { NotesHomePage } from "../../components/HomePage/NotesHomePage";
import { Notes } from "../../components/Notes/Notes";
import { Modal } from "../../components/Modal/Modal";
import { useModal } from "../../components/Modal/ModalContextApi";

export const Home = () => {
  const [groups, setGroups] = useState(() =>
    JSON.parse(localStorage.getItem("createdGroups"))
  );
  const [groupId, setGroupId] = useState();
  const [home, setHome] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [displayNotes, setDisplayNotes] = useState(false);
  const [back, setBack] = useState(false);
  const { showModal, setShowModal } = useModal();

  const updateGroups = (newGroup) => {
    setGroups(newGroup);
  };
  const getNotes = (id) => {
    setGroupId(id);
    setHome(false);
    setDisplayNotes(true);
    setBack(false);
  };
  const checkIsMobileView = () => {
    if (window.innerWidth <= 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };
  const goBack = () => {
    setBack(true);
    setDisplayNotes(false);
  };
  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    checkIsMobileView();
    window.addEventListener("resize", checkIsMobileView);
    return () => {
      window.removeEventListener("resize", checkIsMobileView);
    };
  }, []);

  return (
    <div className={stylesHome.home_wrapper}>
      <div className={stylesHome.home_left_side}>
        {!isMobileView && (
          <NotesGroups
            setShowModal={setShowModal}
            groups={groups}
            getNotes={getNotes}
          />
        )}
        {!displayNotes && isMobileView && (
          <NotesGroups
            setShowModal={setShowModal}
            groups={groups}
            getNotes={getNotes}
          />
        )}
        {showModal && isMobileView && <Modal updateGroups={updateGroups} />}
        {displayNotes && isMobileView && (
          <Notes groupId={groupId} goBack={goBack} />
        )}
      </div>
      <div className={stylesHome.home_right_side}>
        {!isMobileView &&
          (home ? <NotesHomePage /> : <Notes groupId={groupId} />)}
        {showModal && !isMobileView && <Modal updateGroups={updateGroups} />}
      </div>
    </div>
  );
};
