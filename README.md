# URL Web Starter

## Overview

The URL Web Starter module is designed to streamline the process of setting up a new web project. It provides a template-based approach to project initialization, allowing developers to quickly scaffold a new project with predefined configurations and structures. This module supports different project types, such as landing pages and applications, and includes options for additional features like tests, email templates, and schema integration.

## Features

- **Template-Based Initialization**: Choose between different project types and copy the necessary files and folders from the template directory.
  - **Landing**: Sets up a landing page project with basic configurations and optional Schema.org integration.
  - **Application**: Sets up an application project with options for additional features.
- **Figma Integration**: Automatically updates `figma-export.yaml` with the provided Figma file ID and runs the `figma-export` command.
- **Customizable Features for Application Projects**:
  - **Schema org**: Adds Schema.org integration to the project.
  - **Tests**: Includes test setup in the project.
  - **Email templates**: Adds email template functionality to the project.
- **Dependency Management**: Automatically installs required dependencies using Yarn.
- **Environment Configuration**: Sets up environment variables for Figma integration.
## Usage
```sh
npx url-web-starter
```

## License

URL Web Starter is distributed under the [MIT](https://opensource.org/licenses/MIT) license.
