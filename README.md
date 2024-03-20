<p align="center">
  <img src="/public/logo3.svg" alt="Image Description" height="120px" width="320px" />
</p>



WhatTheDuck is an open-source web application built on DuckDB, designed to allow users to upload CSV files, store them
in tables, and perform SQL queries on the uploaded data. The application also provides the functionality to download
filtered results in CSV format, supports uploading multiple files, and enables users to perform join queries. It's
important to note that the application stores data temporarily in memory, and refreshing the page will clear all
uploaded data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the necessary dependencies, please follow these steps:

1. Clone the WhatTheDuck repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the dependencies using Yarn:
   ```bash
   yarn
   ```
   or using npm:

   ```bash
   npm install
   ```

## Usage

To start the application in development mode, with hot-code reloading and error reporting, follow these steps:

1. Make sure you have completed the installation steps mentioned above.
2. Run the following command:
    ```bash
    quasar dev
    ```

This will start the application in development mode, and you can access it in your browser at http://localhost:9000 (or
a different port if specified).
To build the application for production, use the following command:

   ```bash
   quasar build
  ```

The production build of the application will be available in the **dist/** directory.

## Configuration

The application's configuration can be customized by modifying
the [quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js) file. Please refer to the Configuring
quasar.config.js documentation for detailed instructions on how to customize the configuration according to your needs.

## Contributing

Contributions to WhatTheDuck are welcome! If you would like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make the necessary changes and commit them.
5. Push the changes to your forked repository.
6. Submit a pull request to the main repository.

## License

WhatTheDuck is open-source software released under the MIT License. You are free to use, modify, and distribute the
application in accordance with the terms of the license.
