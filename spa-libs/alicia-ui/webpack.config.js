/**
 * Alberto ECM 
 * (c) 2017-08-17 20:29:53 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
    filename: "index.css",
    disable: false
    //disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/less/app.less',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{ 
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, { 
                        loader: 'less-loader', 
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                            sourceMap: true
                        }
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                { loader: 'file-loader' }
              ]
            }
        ]
    },
    plugins: [
        extractLess
    ]
}