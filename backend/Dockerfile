# # Start from a base Python image
# FROM python:3.12-bullseye

# # Set working directory
# WORKDIR /

# # Copy requirements.txt
# COPY requirements.txt .

# # Upgrade pip and setuptools
# RUN pip install --upgrade pip setuptools

# # Install dependencies
# RUN pip install -r requirements.txt

# # Copy the rest of your application code
# COPY . .

# # Specify the command to run on container start
# CMD [ "python", "internbot.py" ]
# Use the official image as a parent image
FROM python:3.12-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# Make port 8001 available to the world outside this container
EXPOSE 8001

# Define environment variable
ENV NAME World

# Run internbot.py when the container launches
CMD ["python", "internBot.py"]
