import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import {faHashtag} from "@fortawesome/free-solid-svg-icons";

import styles from "./main.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.app}>
            <div className={styles.titleBox}>
                <div>
                    <img src={require("../../images/logo/logo192.png")} alt={"brawlies"}/>
                    <div>Brawl Tree</div>
                </div>
            </div>
            <form className={styles.inputBox}
                  onSubmit={e => {
                      console.log(e.type)
                      navigate(`./brawlian/${e.target[0].value.toUpperCase()}`);
                  }}>
                <FontAwesomeIcon icon={faHashtag}/>
                <input
                    type={"text"}
                    name={"id"}
                    required={true}
                    placeholder={"유저 태그"}
                    maxLength={12}
                    pattern="#?[O0289PYLQGRJCUVopylqgrjcuv]{3,12}"
                    style={{textTransform: "uppercase"}}
                />
                <button type={"submit"}>
                    TREE
                </button>
            </form>
        </div>
    );
};

export default Main;