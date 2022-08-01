const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
        }
    },
    module: {
        rules: [
            {
                // test nos permite saber que tipo de extensiones vamos a usar
                // Se utiliza expresiones regulares en este caso (utilizar todos los archivos que empiecen por "m" o "js")
                test: /\.m?.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|\.styl$/i,
                use:[MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource' 
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                        // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'aplication/font-woff',
                        // Especifica el tipo MIME con el que se alineará el archivo. 
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[ext]",
                        // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                        // ubuntu-regularhola.woff
                        outputPath: './assets/fonts/', 
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: './assets/fonts/',
                        // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        esModule: false 
                        // AVISAR EXPLICITAMENTE SI ES UN MODULO
                    }
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Inserción de los elementos
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    // que recurso (archivo o directorio) deseamos copiar al directorio final
                    from: path.resolve(__dirname, "src", "assets/images"),
                    // en que ruta dentro de la carpeta final terminara los recursos
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
    ],
}