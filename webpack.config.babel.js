import path from 'path'

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.join(__dirname , 'public') ,
    filename: './all.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  },
  // plugins: [new HtmlWebpackPlugin]
}