import styles from "./type_menu.module.scss";

const UserTypeMenu = ({type, handleRadioButton}) => {

    return (
        <div className={styles.typeMenuWrapper}>
            <input className={styles.typeButton}
                   type={"radio"}
                   id={"all"}
                   name={"all"}
                   checked={type === "all"}
                   onChange={handleRadioButton}/>
            <label htmlFor={"all"}>
                <img src={`/images/modes/icon/all.webp`}
                     alt={"all"}
                     onClick={() => {
                     }}
                />
                <div>
                    ALL
                </div>
            </label>
            <input className={styles.typeButton}
                   type={"radio"}
                   id={"trophyTriple"}
                   name={"trophyTriple"}
                   checked={type === "trophyTriple"}
                   onChange={handleRadioButton}/>
            <label htmlFor={"trophyTriple"}>
                <img src={`/images/modes/icon/trophyLeague.webp`}
                     alt={"trophyTriple"}
                     onClick={() => {
                     }}
                />
                <div>
                    3VS3
                </div>
            </label>
            <input className={styles.typeButton}
                   type={"radio"}
                   id={"trophyShowdown"}
                   name={"trophyShowdown"}
                   checked={type === "trophyShowdown"}
                   onChange={handleRadioButton}/>
            <label htmlFor={"trophyShowdown"}>
                <img src={`/images/modes/icon/soloShowdown.webp`}
                     alt={"trophyShowdown"}
                     onClick={() => {
                     }}
                />
                <div>
                    Showdown
                </div>
            </label>
            <input className={styles.typeButton}
                   type={"radio"}
                   id={"powerSolo"}
                   name={"powerSolo"}
                   checked={type === "powerSolo"}
                   onChange={handleRadioButton}/>
            <label htmlFor={"powerSolo"}>
                <img src={`/images/modes/icon/powerLeagueSolo.webp`}
                     alt={"powerSolo"}
                     onClick={() => {
                     }}
                />
                <div>
                    Solo
                </div>
            </label>
            <input className={styles.typeButton}
                   type={"radio"}
                   id={"powerTeam"}
                   name={"powerTeam"}
                   checked={type === "powerTeam"}
                   onChange={handleRadioButton}/>
            <label htmlFor={"powerTeam"}>
                <img src={`/images/modes/icon/powerLeagueTeam.webp`}
                     alt={"powerTeam"}
                     onClick={() => {
                     }}
                />
                <div>
                    Team
                </div>
            </label>
        </div>
    );
};

export default UserTypeMenu;