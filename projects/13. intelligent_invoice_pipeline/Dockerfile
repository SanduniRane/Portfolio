FROM python:3.12-slim

# System packages: Tesseract OCR + Poppler (for pdf2image)
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project source
COPY . .

# Default command (overridden per-service in docker-compose.yml)
CMD ["python", "run_pipeline.py"]
