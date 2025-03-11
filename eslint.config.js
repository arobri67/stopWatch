import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  formatters: true,
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },

});
