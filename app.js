const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const fs = require("fs");

fs.readFile("./test.js", "utf-8", (err, data) => {
  if (err) throw err;
  var ast = parser.parse(data);
  console.log(ast);
  traverse(ast, {
    enter(path) {
      if (path.isIdentifier({ name: "console" })) {
        path.node.name = "myconsole";
      }
    }
  });

  var src = generate(ast);
  fs.writeFile("./test.js", src.code, "utf8", err => {
    if (!err) {
      console.log("done");
    }
  });
});
