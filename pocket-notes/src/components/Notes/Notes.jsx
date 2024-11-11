import { useEffect, useRef, useState } from "react";
import stylesNotes from "./Notes.module.css";
import { generateNameInitials } from "../../utils/constants";
import arrow1 from "../../assets/arrow1.svg";
import arrow2 from "../../assets/arrow2.svg";
import back from "../../assets/back.svg";


export const Notes = (props) => {
  const [displayingNotes, setDisplayingNotes] = useState(() => {
    const storedGroupData = JSON.parse(localStorage.getItem("createdGroups"));
    return Array.isArray(storedGroupData) ? storedGroupData : [];
  });
  const [currentNotee, setCurrentNotee] = useState(); // auxillary note for temp store
  const [note, setNote] = useState(
    displayingNotes[props.groupId] || { notes: [] }
  );
  const [enableNoteSubmitButton, setEnableNoteSubmitButton] = useState(false);
  const text = useRef(null);

  useEffect(() => {
    const storedGroupData = JSON.parse(localStorage.getItem("createdGroups"));
    const cleanData = Array.isArray(storedGroupData) ? storedGroupData : [];
    setDisplayingNotes(cleanData);
    setNote((prevNote) => cleanData[props.groupId] || { notes: [] });
  }, [props.groupId, setDisplayingNotes]);

  const handleNoteText = (e) => {
    if (e.target.value.trim().length > 0) {
      setCurrentNotee(e.target.value.trim());
      setEnableNoteSubmitButton(true);
    } else {
      setEnableNoteSubmitButton(false);
    }
  };

  const handleSavedNotes = (e) => {
    const newNote = {
      text: currentNotee,
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    if (currentNotee && currentNotee.length !== 0) {
      setDisplayingNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        updatedNotes[props.groupId].notes.push(newNote);
        localStorage.setItem("createdGroups", JSON.stringify(displayingNotes));
        text.current.value = "";
        setCurrentNotee("");
        return updatedNotes;
      });
    } else {
      return;
    }
  };
  return (
    <div className={stylesNotes.notes_wrapper}>
      <div className={stylesNotes.notes_header}>
      <img onClick={()=>props.goBack()} src={back} alt="back arrow button" />
        <p style={{ backgroundColor: `${note.color}` }}>
          {generateNameInitials(note.text)}
        </p>
        <h1>{note?.text} </h1>
      </div>
      <div className={stylesNotes.notess_section}>
        {note.notes.length > 0 &&
          note.notes.map((note, idx) => (
            <div key={idx} className={stylesNotes.notess}>
              <p>{note.text}</p>
              <h4>
                {note.date} &bull; {note.time}
              </h4>
            </div>
          ))}
      </div>
      <div className={stylesNotes.notes_text_area}>
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setEnableNoteSubmitButton(false);
              handleSavedNotes();
            }
          }}
          ref={text}
          onChange={(e) => handleNoteText(e)}
          name=""
          id=""
          cols="130"
          rows="10"
          placeholder="Enter your text here..........."
        ></textarea>
        <img
          onClick={handleSavedNotes}
          src={enableNoteSubmitButton ? arrow2 : arrow1}
          alt=""
        />
      </div>
    </div>
  );
};
