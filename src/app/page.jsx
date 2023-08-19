import PropTypes from 'prop-types';
import Page from '@/app/s/[page]/page';

const Index = ({ lang = undefined }) => <Page params={{ page: 'index', lang }} />;

Index.propTypes = {
  lang: PropTypes.string,
};

export default Index;
