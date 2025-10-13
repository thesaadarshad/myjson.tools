# Use official Nginx image as base
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/

# Copy application files
COPY src/index.html /usr/share/nginx/html/
COPY src/css/styles.css /usr/share/nginx/html/css/
COPY src/js/*.js /usr/share/nginx/html/js/

# Copy Prism.js library
COPY public/libs/prism/ /usr/share/nginx/html/libs/prism/

# Copy other libraries
COPY public/libs/jsonrepair.min.js /usr/share/nginx/html/libs/
COPY public/libs/tabular-json.min.js /usr/share/nginx/html/libs/

# Copy PWA and public files
COPY public/manifest.json /usr/share/nginx/html/
COPY public/service-worker.js /usr/share/nginx/html/
COPY public/sitemap.xml /usr/share/nginx/html/
COPY public/robots.txt /usr/share/nginx/html/
COPY public/browserconfig.xml /usr/share/nginx/html/

# Copy assets
COPY public/assets/ /usr/share/nginx/html/assets/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
