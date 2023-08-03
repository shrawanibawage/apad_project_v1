import styles from "./image.module.css";

import background from "./16052.jpg";

const Image = () => {
  return (
    <article className={styles.article}>
      <img className={styles.image} src={background} alt="background" />
      <h1 className={styles.header}>NMASS Hardware Logistics</h1>
    </article>
  );
};

export default Image;