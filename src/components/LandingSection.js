import styles from "../assets/css/landing-section.module.css";
import mobileAppViewImg from "../assets/images/stockman_app_view.png"

function LandingSection() {
    return (
        <>
            <section className={styles.landingSection}>
                <div className={styles.textContainer}>
                    <h1>
                        start to invest in stockman
                        <br/>
                        <span>everywhere</span>
                    </h1>
                    <div className={styles.textBottom}>
                        <span>
                            Get started to invest in stocks is really easy with Stockman.
                        </span>
                        <span>
                            Try it right now!
                        </span>
                    </div>
                    <div className={styles.btnContainer}>
                        <button type="button" className={styles.active}>get started</button>
                        <button type="button">get app now</button>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <img src={mobileAppViewImg} alt="stockman application" />
                </div>
            </section>
        </>
    );
}

export default LandingSection;