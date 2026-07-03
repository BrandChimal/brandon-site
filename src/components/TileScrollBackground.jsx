import { motion, useScroll, useTransform } from 'framer-motion';

// --- COMPONENTE TILE SCROLL BACKGROUND ---
const TileScrollBackground = () => {
  const { scrollYProgress } = useScroll();
  const xRight1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const xLeft1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const xRight2 = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const xLeft2 = useTransform(scrollYProgress, [0, 1], [200, -100]);

  const imgs = [
    "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/01.jpg", "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/02.jpg", "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/03.jpg",
    "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/04.jpg", "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/05.jpg", "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/06.jpg",
    "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/07.jpg", "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/08.jpg", "https://www.elementpack.pro/demo/wp-content/uploads/2021/11/09.jpg"
  ];

  return (
    <div className="tile-grid-container">
      <motion.div style={{ x: xRight1 }} className="tile-row">
        {imgs.map((src, i) => <img key={`r1-${i}`} src={src} className="tile-img" alt="" />)}
      </motion.div>
      <motion.div style={{ x: xLeft1 }} className="tile-row">
        {[...imgs].reverse().map((src, i) => <img key={`r2-${i}`} src={src} className="tile-img" alt="" />)}
      </motion.div>
      <motion.div style={{ x: xRight2 }} className="tile-row">
        {imgs.map((src, i) => <img key={`r3-${i}`} src={src} className="tile-img" alt="" />)}
      </motion.div>
      <motion.div style={{ x: xLeft2 }} className="tile-row">
        {[...imgs].reverse().map((src, i) => <img key={`r4-${i}`} src={src} className="tile-img" alt="" />)}
      </motion.div>
    </div>
  );
};

export default TileScrollBackground;
