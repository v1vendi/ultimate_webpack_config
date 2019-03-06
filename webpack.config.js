const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const glob = require('glob')
const path = require('path')

class HtmlDependencyWebpackPlugin {
    apply(compiler) {
        compiler.plugin('compilation', AlterChunksPlugin)

        function AlterChunksPlugin(compilation) {
            compilation.plugin('html-webpack-plugin-alter-chunks', (chunks) => {
                console.log(111111)
                console.log(chunks)
                const stats = compilation.getStats().toJson()
                const allChunks = stats.chunks

                const entry = chunks.find(c => c.entry)
                const siblingsChunks = entry.siblings.map(id => allChunks[id])
                return [...siblingsChunks, entry]
            })
        }
    }
}

const entryFiles = glob.sync('./src/views/*/*.js')
const entry = {}
const htmlPlugins = []

entryFiles.forEach(filePath => {
    const fileName = path.parse(filePath).name
    const entryName = `${fileName}/${fileName}`
    entry[entryName] = filePath
    htmlPlugins.push(new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: `./${entryName}.html`,
        chunks: [entryName],
        minify: false,
    }))
})

module.exports = {
    entry,
    module: {
        rules: [
            { test: /.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /.js$/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-react'] }}},
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmlPlugins,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "common_styles_[id].css"
        }),
        new HtmlDependencyWebpackPlugin(),
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'initial',
            minChunks: 1,
            maxInitialRequests: 10,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                    priority: -2,
                    enforce: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: module => module.index,
                    chunks: 'all',
                    priority: -1,
                    enforce: true,
                },
            },
        },
    }
};