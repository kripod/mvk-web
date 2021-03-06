import PropTypes from 'prop-types';
import React from 'react';
import Link from 'gatsby-link';
import { css } from 'glamor';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { amber, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import 'normalize.css';
import Headroom from 'react-headroom';
import Helmet from 'react-helmet';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import FacebookIcon from 'react-icons/lib/fa/facebook-official';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import MVKLogoImage from '../assets/mvk-logo.svg';
import Container from '../components/container';
import {
  footerBackgroundDark,
  footerBackgroundLight,
  footerTextColor,
  mainBackground,
  mainLinkColor,
} from '../utils/presets';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
  },
});

const NavLink = ({ ...props }) => <Link activeClassName="active" {...props} />;

const MVKLogoWhite = ({ ...props }) => (
  <img
    alt="MVK logó"
    src={MVKLogoImage}
    {...css({
      filter: 'brightness(0) invert(1)',
    })}
    {...props}
  />
);

const IndexLayout = ({ children, data, location }) => {
  const isHomepage = location.pathname === '/';

  return (
    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
      <Typography type="body2">
        <div
          {...css({
            '& a': {
              ':not(:hover)': {
                textDecoration: 'none',
              },
              color: mainLinkColor,
            },
            background: mainBackground,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          })}
        >
          <Helmet
            defaultTitle={data.site.siteMetadata.title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          >
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />

            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Helmet>

          <Headroom
            disableInlineStyles
            {...css({
              '& #header-logo, header': {
                transition: 'all 0.4s 0.15s',
              },
              '.headroom--pinned.headroom--scrolled': {
                '& #header-logo': {
                  opacity: 1,
                },
              },
              '.headroom--unfixed, &.headroom--unpinned': {
                '& header': {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
              },
              '.headroom--unpinned': {
                '& header': {
                  transform: 'translateY(-100%)',
                },
              },
            })}
          >
            <AppBar {...css({ '& a': { textDecoration: 'none' } })}>
              <Toolbar>
                <Typography
                  id="header-logo"
                  type="title"
                  {...css({
                    flex: 1,
                    opacity: isHomepage && 0,
                  })}
                >
                  <Link to="/" exact>
                    <MVKLogoWhite {...css({ height: '2rem' })} />
                  </Link>
                </Typography>

                <NavLink to="/about">
                  <Button color="contrast">Bemutatkozás</Button>
                </NavLink>
                <NavLink to="/teams">
                  <Button color="contrast">Csapatok</Button>
                </NavLink>
                <NavLink to="/race-calendar">
                  <Button color="contrast">Versenynaptár</Button>
                </NavLink>
                <NavLink to="/workshop">
                  <Button color="contrast">Műhely</Button>
                </NavLink>
                <NavLink to="/contact">
                  <Button color="contrast">Kapcsolat</Button>
                </NavLink>
              </Toolbar>
            </AppBar>
          </Headroom>

          <main {...css({ flex: 1 })}>{children()}</main>

          <footer
            {...css({
              '& a': {
                color: 'inherit',
              },
              background: footerBackgroundLight,
              color: footerTextColor,
            })}
          >
            <Container>
              <Grid container align="center" justify="space-between">
                <Grid item>
                  <MVKLogoWhite
                    {...css({
                      height: '3rem',
                      maxWidth: '80vw',
                    })}
                  />
                </Grid>

                <Grid item>
                  <small>
                    <address>
                      1111 Budapest, Műegyetem rakpart 3. (TODO)<br />
                      Telefon: <a href="tel:+36XXXXXXXXX">+36 XX XXX XXXX</a> (TODO)<br />
                      E-mail: <a href="mailto:info@mvk.bme.hu">info@mvk.bme.hu</a> (TODO)
                    </address>
                  </small>
                </Grid>
              </Grid>
            </Container>

            <div {...css({ background: footerBackgroundDark })}>
              <Container
                {...css({
                  '& *': {
                    margin: '0 1.5rem',
                  },
                  fontSize: '2rem',
                  textAlign: 'center',
                })}
              >
                <FacebookIcon />
                <TwitterIcon />
                <InstagramIcon />
              </Container>
            </div>
          </footer>
        </div>
      </Typography>
    </MuiThemeProvider>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default IndexLayout;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
