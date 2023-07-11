import PropTypes from 'prop-types';
import { getSiteSettings } from '@/helpers/sanity';
import Menu from '@/components/PageLayout/Menu';
import Footer from '@/components/PageLayout/Footer';
import styles from './pageLayout.module.scss';

const PageLayout = async ({ children, pageName }) => {
  const { menu, footer } = await getSiteSettings();

  return (
    <div className={styles.mainContainer}>
      <Menu menu={menu} pageName={pageName} />
      <div className={styles.mainContent}>{children}</div>
      <Footer footer={footer} />
    </div>
  );
};

PageLayout.defaultProps = {
  children: null,
  pageName: '',
};

PageLayout.prototype = {
  children: PropTypes.node,
  pageName: PropTypes.string,
};

export default PageLayout;
