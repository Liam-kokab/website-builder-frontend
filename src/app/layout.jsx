import PropTypes from 'prop-types';
import './globals.css';
import { getSiteSettings } from '@/helpers/sanity';

export const metadata = {
  title: 'Mazi',
  description: 'Some description',
};

const getColorObject = (colors) => {
  const colorObject = {};
  Object.keys(colors).filter((name) => !!colors[name].hsl).forEach((name) => {
    const { h, l, a, s } = colors[name].hsl || {};
    colorObject[`--${name}`] = `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
    colorObject[`--${name}-num`] = `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  });

  return colorObject;
};

const RootLayout = async ({ children }) => {
  const { general, color } = await getSiteSettings();

  const sanityStyles = {
    ...getColorObject(color),
  };

  return (
    <html lang="no" style={sanityStyles}>
      <body>
        {children}
      </body>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
