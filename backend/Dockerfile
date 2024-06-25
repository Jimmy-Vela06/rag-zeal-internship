# Use the official Python image from the Docker Hub
FROM python:3.12-bullseye

# Set the working directory inside the container
WORKDIR /

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
# Copy all files from the current directory to the container working directory
COPY . .

# Expose the port where FastAPI will run (adjust as needed)
EXPOSE 8001

# Command to run the FastAPI application with Uvicorn server
# Run the backend application
CMD ["python", "/internBot.py"]