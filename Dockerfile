# Use official Nginx image as base
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy application files to Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY languages.js /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Copy PWA files
COPY manifest.json /usr/share/nginx/html/
COPY service-worker.js /usr/share/nginx/html/
COPY icon-*.png /usr/share/nginx/html/

# Copy SEO files
COPY sitemap.xml /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY browserconfig.xml /usr/share/nginx/html/

# Copy logo and favicon
COPY logo.svg /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

