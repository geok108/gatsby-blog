import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
		<Layout>
			<div>
				{edges.map(edge => {
					const { frontmatter } = edge.node;
					return (
						<div key={frontmatter.path}>
							<Link className="blogPostLink"
              style={{
                textDecoration:`none`,
                fontSize:25,
                color:`darkolivegreen`
              }}
              to={frontmatter.path}>{frontmatter.title}</Link>
							&nbsp;
              <br/>
							<small>
								{' '}
								{frontmatter.date}
							</small>
							<br />
              <br />
						</div>
					);
				})}
			</div>
		</Layout>
	);
}

export const query = graphql`
	query HomePageQuery {
		allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMMM DD, YYYY")
						path
						tags
						excerpt
					}
				}
			}
		}
	}
`;

export default IndexPage
