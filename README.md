# Installation Guide

This guide will help you set up the application using Docker. Follow the steps below to get started.

## Prerequisites

- Ensure you have **Docker** installed on your system. You can download it from the [Docker website](https://www.docker.com/get-started).

## Installation Steps

1. **Clone the Repository**  
   Open your terminal and run the following command to clone the repository:

   ```
   bash git clone <repository-url>
   ```

2. **Navigate to the Project Directory**
   Change into the project directory:

   ```
   cd <repository-name>
   ```

   Replace `<repository-name>` with the name of your cloned repository.

3. **Start the Application**
   Use the following command to start the application:

   ```
   make start
   ```

4. **Access the GUI**
   Once the application is running, open your web browser and go to:

   ```
   http://localhost:80
   ```

5. **Stop the Application**
   When you want to stop the application, run:
   ```
   make stop
   ```

## Important Notes

- Just a heads up: pushing environment variables to Git isn't the best practice because of security issues. I did it this way for your convenience during installation. For production, or a real application, this would have been added to the .gitignore file.

## Additional Information

- For any issues, please reach out to me at michael.abrams.dev@gmail.com
