import React from "react";
import { graphql, Link } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import "../components/style.css";

const Template = ({ data, pathContext }) => {
	const title = data.markdownRemark.frontmatter.title;
	const date = data.markdownRemark.frontmatter.date;
	const html = data.markdownRemark.html;
	const { next, prev } = pathContext;
	const siteTitle = data.site.siteMetadata.title;

	return (
		<>
		<Header siteTitle={siteTitle} />
		<div
			style={{
				margin: `0 auto`,
				maxWidth: 960,
				padding: `0 1.0875rem 1.45rem`,
			}}>
			<h1>{title}</h1>
			<div>
				<em>{date}</em>
			</div>
			<br />
			<div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
			<p>
				{prev && (
					<Link to={prev.frontmatter.path}>
						{prev.frontmatter.title}{' '}
						<span role="img" aria-label="point-left">
							👈{' '}
						</span>
						Previous
					</Link>
				)}
			</p>
			<p>
				{next && (
					<Link to={next.frontmatter.path}>
						Next{' '}
						<span role="img" aria-label="point-right">
							👉
						</span>
						{next.frontmatter.title}
					</Link>
				)}
			</p>
			<Footer />
		</div>
		</>
	);
};

export const postQuery = graphql`
	query($pathSlug: String!) {
		site(children: {}, siteMetadata: {title: {}, description: {}}) {
    siteMetadata {
      title
    }
  },
		markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
			html
			frontmatter {
				title
				date(formatString: "MMMM, DD, YYYY")
				path
				tags
				excerpt
			}
		}
	}
`;

export default Template;
