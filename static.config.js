import axios from 'axios'
import path from 'path'

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js')

export default {
  plugins: ['react-static-plugin-typescript'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getSiteData: () => ({
    title: 'React Static',
  }),
  paths: {
    // src: 'src', // The source directory. Must include an index.js entry file.
    // temp: 'tmp', // Temp output directory for build files not to be published.
    dist: 'docs', // The production output directory.
    // devDist: 'tmp/dev-server', // The development scratch directory.
    // public: 'public', // The public directory (files copied to dist during build)
    // assets: 'docs', // The output directory for bundled JS and CSS
  },
  siteRoot: 'https://star.js.org',
  basePath: 'STAR',
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    )
    return [
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
    ]
  },
}
