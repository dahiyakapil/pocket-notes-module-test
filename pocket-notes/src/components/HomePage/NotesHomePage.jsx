import React from "react";
import stylesHome from "./NotesHome.module.css";
import HomePageImg from "../../assets/HomePageImg.svg";
import EncrypedLogo from "../../assets/EncrypedLogo.svg";

export const NotesHomePage = () => {
  return (
    <div className={stylesHome.homewrapper}>
      <div className={stylesHome.homecontainer}>
        <img src={HomePageImg} alt="Home image" />
        <h1>Pocket Notes</h1>
        <p className={stylesHome.homedescription}>
          Send and receive messages without keeping your phone online. <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        <p className={stylesHome.homeencryption}>
          <img src={EncrypedLogo} alt="EncrypedLogo" /> end-to-end encrypted
        </p>
      </div>
    </div>
  );
};
