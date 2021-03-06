import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import BMEBuildingKImage from '../assets/bme-building-k.jpg';
import MVKLogoImage from '../assets/mvk-logo.svg';
import Container from '../components/container';
import { ASPECT_RATIO_4_3, IMAGE_OVERLAY_TINT } from '../utils/presets';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark;

  return (
    <div>
      <div
        {...css({
          alignItems: 'center',
          backgroundImage: `${IMAGE_OVERLAY_TINT}, url(${BMEBuildingKImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          height: '100vh',
        })}
      >
        <img
          src={MVKLogoImage}
          alt="MVK logó"
          {...css({
            background: 'white',
            height: '12.5vh',
            maxWidth: 'calc(100% - 4rem)',
            minHeight: '3.5rem',
            padding: '2rem',
          })}
        />
      </div>

      <Container {...css({ '& a': { textDecoration: 'none' } })}>
        <h1 {...css({ textAlign: 'center' })}>Hírek</h1>

        <Grid container>
          {posts.edges.map(({ node: post }) => (
            <Grid item xs={4} key={post.fields.slug}>
              <Link to={post.fields.slug}>
                <Card>
                  <CardMedia
                    image={
                      post.frontmatter.image
                        ? post.frontmatter.image.childImageSharp.responsiveSizes.src
                        : `), ${IMAGE_OVERLAY_TINT.slice(0, -1)}` // TODO: Substitute with a non-hacky solution as soon as possible
                    } // TODO: Add support for responsive images
                    {...css({
                      ...ASPECT_RATIO_4_3,
                    })}
                  />
                  <CardContent>
                    <Typography type="headline" component="h2">
                      {post.frontmatter.title}
                    </Typography>
                    <Typography type="body1" color="secondary">
                      {post.frontmatter.date}
                    </Typography>
                    <Typography
                      component="p"
                      {...css({
                        height: '40px', // TODO: Use lineHeight * 2
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                      })}
                    >
                      {post.excerpt}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/news/" }, frontmatter: { draft: { ne: true } } }
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            image {
              childImageSharp {
                responsiveSizes(maxWidth: 400) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
