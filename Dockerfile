FROM debian

RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o chrome.deb && \
    dpkg -i chrome.deb || apt-get install -yf && \
    rm chrome.deb

RUN apt-get install -y nodejs && \
    npm install -g npm@latest

WORKDIR /home/api 

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install bcrypt

COPY . .

CMD npm run start:dev
