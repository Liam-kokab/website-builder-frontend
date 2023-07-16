import PropTypes from 'prop-types';
import styles from './pageLayout.module.scss';

const Footer = ({ footer }) => {
  const { companyName, companyAddress1, companyAddress2, companyPhone } = footer;

  return (
    <footer className={styles.mainFooter}>
      <div>
        { companyName ? <p>{companyName}</p> : <p> </p> }
        { companyPhone ? <p>{companyPhone}</p> : <p> </p> }
      </div>
      <div>
        { companyAddress1 ? <p>{companyAddress1}</p> : <p> </p> }
        { companyAddress2 ? <p>{companyAddress2}</p> : <p> </p> }
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  footer: {},
};

Footer.propTypes = {
  footer: PropTypes.shape({
    companyName: PropTypes.string,
    companyAddress1: PropTypes.string,
    companyAddress2: PropTypes.string,
    companyPhone: PropTypes.string,
  }),
};

export default Footer;
/*
 companyAddress1: 'company 55',
  companyPhone: '55555555',
  _createdAt: '2023-06-26T19:25:58Z',
  companyName: 'Company name',
  _type: 'footerSettings',
  _id: 'footerSettings',
  _updatedAt: '2023-06-26T19:27:00Z',
  companyAddress2: '5555 Bergen',
  _rev: '3zk32H2FEFo9WaQWg6Fo1d'
 */
