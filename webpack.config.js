const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const envVars = dotenv.config().parsed;

const buildFolder = `dist`;
const PORT = 9009;
const devServer = {
    port: PORT,
    // historyApiFallback: true,
    // historyApiFallback: {
    //     rewrites: [
    //       { from: /./, to: '/dist/index.html' }
    //     ]
    // },
    historyApiFallback: {
        index: `/${buildFolder}/index.html`
    },
    hot: true,
    client: {
        webSocketURL: "auto://0.0.0.0:0/ws"
    },
    compress: true,
    https: false
};
const HOST = `http${devServer.https ? "s" : ""}://localhost:${PORT}`;
const PATH = `${HOST}/${buildFolder}`;

const timestamp = new Date().getTime();

module.exports = (env, options) => {
    const isDevelopment = options.mode !== "production";

    return {
        entry: {
            index: [
                ...(isDevelopment ? [`webpack-hot-middleware/client?path=${HOST}/__webpack_hmr`] : []),
                "@babel/polyfill",
                "./src/index.js"
            ]
        },
        output: {
            path: path.join(__dirname, `/${buildFolder}`),
            clean: true,
            // filename: "[name].bundle.js",
            filename: pathData => {
                if (pathData.chunk.name === "index") {
                    return "main.bundle.js";
                }
                return "[name].bundle.js";
            },
            chunkFilename: "[name].chunk.js",
            publicPath: isDevelopment ? PATH : "" // otherwise `/${buildFolder}`
        },
        devtool: "source-map",
        resolve: {
            extensions: [".js", ".jsx", "*"],
            alias: {
                "@src": path.resolve(__dirname, "src"),
                "@shared": path.resolve(__dirname, "src/shared"),
                "@m-app": path.resolve(__dirname, "src/m-app"),
                "@d-app": path.resolve(__dirname, "src/d-app"),

                "@argon-ui": path.resolve(__dirname, "src/shared/layouts/Argon-ui")
            },
            symlinks: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    type: "asset/resource"
                    // use: [
                    //     {
                    //         loader: "file-loader",
                    //         options: {
                    //             esModule: false, // https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module
                    //             filename: "[name].[fullhash].[ext]"
                    //         }
                    //     }
                    // ]
                },
                {
                    test: /\.(jpg|jpeg)$/,
                    type: "asset/resource"
                    // use: [
                    //     {
                    //         loader: "file-loader",
                    //         options: {
                    //             esModule: false,
                    //             filename: "[name].[ext]"
                    //         }
                    //     }
                    // ]
                },
                {
                    test: /\.(ico)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                esModule: false,
                                limit: 1000,
                                filename: "[name].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.(gif|png)$/,
                    type: "asset/resource"
                    // use: [
                    //     {
                    //         loader: "url-loader",
                    //         options: {
                    //             esModule: false,
                    //             limit: 8192,
                    //             filename: "[name].[ext]"
                    //         }
                    //     }
                    // ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
                favicon: "./src/shared/styles/favicon.ico"
            }),
            new MiniCssExtractPlugin({
                // filename: isDevelopment ? "[name].css" : "[name].[fullhash].css",
                filename: pathData => {
                    if (pathData.chunk.name === "index") {
                        return "main.css";
                    }
                    return isDevelopment ? "[name].css" : "[name].[fullhash].css";
                },
                chunkFilename: isDevelopment ? "[name].css" : "[name].[fullhash].css"
            }),
            new webpack.DefinePlugin({
                "_process.env": {
                    NODE_ENV: JSON.stringify(env.staging && env.staging === "true" ? "staging" : options.mode),
                    timestamp: JSON.stringify(timestamp),
                    ...envVars
                }
            }),
            new webpack.HotModuleReplacementPlugin(),
            () => {
                console.log("####################### Version: ", env.VERSION_NO || "-");
                console.log("####################### timestamp: ", timestamp);
                try {
                    require("fs").writeFileSync(
                        path.join(__dirname, "dist/build.json"),
                        JSON.stringify({
                            timestamp: timestamp,
                            version: timestamp,
                            version_no: env ? env.VERSION_NO : "-"
                        })
                    );
                } catch (e) {
                    console.log("####################### writing to build.json failed: ");
                }
            }
        ],
        devServer
    };
};
