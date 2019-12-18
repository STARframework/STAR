module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
        name: 'data',
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/data/_design-systems`,
    //     name: '_design-systems',
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/data/_articles`,
    //     name: '_articles',
    //   },
    // },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [], // just in case those previously mentioned remark plugins sound cool :)
      },
    },
  ],
}
