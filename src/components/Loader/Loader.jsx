import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={css.spinner}>
      <RotatingLines
        strokeColor="#ffad4d"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;