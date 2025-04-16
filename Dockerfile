FROM harbor.riin.com/library/node:22.12.0
WORKDIR /app
COPY . .
COPY start.sh /start.sh
# 使用 PM2 运行 Nuxt 服务
RUN npm install -g pm2
CMD ["pm2-runtime", "start", "npx", "nuxt", "start"]
