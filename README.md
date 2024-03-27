<p align="center">
  <img src="/public/logo3.svg" alt="Image Description" height="120px" width="320px" />
</p>



WhatTheDuck is an open-source web application built on DuckDB, designed to allow users to upload CSV files, store them
in tables, and perform SQL queries on the uploaded data. The application also provides the functionality to download
filtered results in CSV format, supports uploading multiple files, and enables users to perform join queries. It's
important to note that the application stores data temporarily in memory, and refreshing the page will clear all
uploaded data.

<a href="https://www.producthunt.com/posts/whattheduck?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-whattheduck" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=404278&theme=light" alt="WhatTheDuck - Your&#0032;browser&#0032;based&#0032;SQL&#0032;engine&#0032;for&#0032;CSV&#0032;files | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
<a href="https://incentius.com/" target="_blank"><img src="https://incentius.com/wp-content/uploads/2022/09/logo_93d9549053.png" alt="Incentius" style="width: 56px; height: 56px;" width="56" height="56" /></a>

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

# Created by Incentius

If you are seeking to leverage innovative technologies to create a custom application or transform your business
processes, we invite you to reach out to Incentius. Discover how we can help you enable digital transformation and
accelerate your business progress. For more information, visit us at [Incentius](https://incentius.com)

## License

WhatTheDuck is open-source software released under the [MIT License](./LICENSE.md). You are free to use, modify, and
distribute the
application in accordance with the terms of the license.


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=incentius-foss/WhatTheDuck&type=Date)](https://star-history.com/#incentius-foss/WhatTheDuck&Date)
