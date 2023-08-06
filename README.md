# Fabric Modding tools
A collection of tools that are used for modding, created for Eclipse IDE.

## Getting started
These tools are created for Windows. I can't find a way to create launch configurations that doesn't depends on which OS you are using. If you can, please create a PR for this.

To use these tools, you need:
- Eclipse IDE
- NodeJS (a version that supports ESM)

Download this repository, import this repository into your workspace as regular Eclipse project (**not** Java project!!!) and you're ready to go!

Load these tools by opening "External Tools Configuration...". After that, you can click on the arrow next to "Run External Tool" icon to select which tool to use.

## "Getting started" for IntelliJ
You might have a bit of luck with [Eclipser](https://plugins.jetbrains.com/plugin/7153-eclipser) plugin. This plugin basically converts Eclipse launch configurations into IntelliJ launch configurations.

If this does generates separate file based on ``.launch`` files, please open a new PR to get them included in this repository.

## Tools overview
- "Generate Launch Configuration": This will create 2 ``.launch`` files in your selected project (one for client, another one for server). This also generates launch configurations inside subprojects, something Fabric Loom doesn't do.

## License
CC0-1.0
