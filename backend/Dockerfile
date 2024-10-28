# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG PYTHON_VERSION=3.10.12
FROM python:${PYTHON_VERSION}-slim

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

# Change the working directory
WORKDIR /app

# Utilize docker caching to not reinstall requirments everytime a change is made to source code
COPY pyproject.toml /app/

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
# Leverage a bind mount to requirements.txt to avoid having to copy them into
# into this layer.
RUN pip install poetry \
    && poetry config virtualenvs.create false \
    && poetry cache clear pypi --all \
    && poetry install --no-interaction --no-ansi 

# Copy the project into the docker container
COPY . .

# Expose the port
EXPOSE 5000

CMD ["flask run"]

