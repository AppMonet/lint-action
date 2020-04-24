const Black = require("./black");
const ESLint = require("./eslint");
const Flake8 = require("./flake8");
const Gofmt = require("./gofmt");
const Golint = require("./golint");
const Mypy = require("./mypy");
const Prettier = require("./prettier");
const RuboCop = require("./rubocop");
const Stylelint = require("./stylelint");
const SwiftFormat = require("./swiftformat");
const SwiftLint = require("./swiftlint");
const XO = require("./xo");
const Infer = require("./infer");

const linters = {
	// Linters
	eslint: ESLint,
	infter: Infer,
	flake8: Flake8,
	golint: Golint,
	mypy: Mypy,
	rubocop: RuboCop,
	stylelint: Stylelint,
	swiftlint: SwiftLint,
	xo: XO,

	// Formatters (should be run after linters)
	black: Black,
	gofmt: Gofmt,
	prettier: Prettier,
	swiftformat: SwiftFormat,
};

module.exports = linters;
