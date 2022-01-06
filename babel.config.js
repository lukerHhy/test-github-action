module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      "component",
      // {
        // libraryName: "element-ui",
        // styleLibraryName: "theme-chalk"
      // },
      // '@babel/plugin-proposal-optional-chaining',  //可选链 ?.
      // '@babel/plugin-proposal-nullish-coalescing-operator'  //空值合并 ??
    ]
  ],
  "env": {
    "development": {
      "plugins": [
        "dynamic-import-node"
      ]
    }
  }
}
