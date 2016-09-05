FROM outeredge/edge-docker-php:7.0.8

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && rm -rf /tmp/* /var/lib/apt/lists/*

COPY composer.* /var/www/

RUN composer install --no-interaction --optimize-autoloader --prefer-dist --no-dev && \
    composer clear-cache

COPY package.json /var/www/
RUN npm install && npm cache clean

COPY style/icomoon.zip /var/www/style/
RUN unzip style/icomoon.zip -d style/icomoon && \
    mkdir style/css && \
    cp -R style/icomoon/fonts style/css

COPY . /var/www/

RUN node_modules/gulp/bin/gulp.js && \
    rm -Rf .sass-cache
