# Contribution guidelines
This page give you all the informations you need for contributing to the project.

## Code contribution
For all code contributions, please **don't push to master** and create a new branch with the below
naming convention:
 * For a new feature: `feature/{issue-id}-{task-name}`
 * For a bugfix: `bugfix/{issue-id}-{task-name}`
 * For a enhancement: `enhancement/{issue-id}-{task-name}`
 * For a refactorisation: `refactor/{issue-id}-{task-name}`

Note: _the `issue-id` in the branch name is required if you are working on a issue._

## Code guidelines
To have the best uniformity in term of code style, this mono-repo use Prettier and Editorconfig.
Please install the module `editorconfig` in your IDE/Text Editor for starting using our rules
specified in the [.editorconfig](.editorconfig) file.

In case you don't want to install Editor Config, you can configure you IDE/Text Editor for using
theses following rules:
 * For all files:
   * Type of end of file: LF
   * Single empty line at final of the file
 * For `js`, `json` and `yaml` files:
   * Encoding: utf-8
   * Endentation type: spaces
   * Size of indentations: 2

For using prettier, you can also install a module in your IDE/Text Editor for checking and format
automatically your code. If you don't want, please run the command `npm run prettier:write`
(or `npm run prettier:check` for checking without writing) for running Prettier.

Obviously if any of theses rules are not taken in consideration, your Pull request will be rejected
by the CI.
