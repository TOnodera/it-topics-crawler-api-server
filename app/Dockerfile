FROM node:20-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  curl \
  wget \
  gnupg \
  ca-certificates \
  locales \
  gcc \
  build-essential \
  git \
  vim \
  openssh-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# ロケール設定
ENV LANG ja_JP.UTF-8 
RUN sed -i -e 's/# \(ja_JP.UTF-8\)/\1/' /etc/locale.gen \
    && locale-gen

# ユーザー設定 # dotenv-cliは開発時に利用する
RUN npm i -g typescript dotenv-cli 
ARG userid=1000
RUN usermod -s /bin/bash -u ${userid} node
WORKDIR /home/node/api
COPY . /home/node/api 
RUN chown -R ${userid}:${userid} /home/node/

# 起動
USER node
RUN npm ci
CMD ["npm", "start"]
