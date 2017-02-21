var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
console.log('Build is ' + JSON.stringify(process.env.NODE_ENV));
console.log('Debug is ' + debug);

module.exports = {
   entry: {
      webpack: "./src/index.tsx"
   },

   output: {
      filename: "./build/[name].js",
   },

   watch: debug,

   // Enable sourcemaps for debugging webpack's output.
   // VSCODE needs inline?
   devtool: debug ? "#cheap-module-inline-source-map" : "",

   resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"]
   },

   module: {
      rules: [
         // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
         { test: /\.tsx?$/, use: ['ts-loader'] },

         /* Load less */
         { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

         {
            test: /\.css$/,
            include: /node_modules/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
         }
      ],

      noParse: [/node_modules\\json-schema\\lib\\validate\.js/]
   },

   // When importing a module whose path matches one of the following, just
   // assume a corresponding global variable exists and use that instead.
   // This is important because it allows us to avoid bundling all of our
   // dependencies, which allows browsers to cache those libraries between builds.
   externals: {
      "freshsales": "freshsales",
      "pubnub": "pubnub",
      "ga": "ga",
      "customer-io": "_cio",
      "jquery": "$",
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
   },

   plugins: debug ? [] : [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
   ],

   node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: "empty"
   }
};