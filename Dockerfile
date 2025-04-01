FROM node:22

WORKDIR /app

COPY . .
RUN npm install -g bun

RUN bun install
RUN npm run build

# 使用 PM2 运行 Nuxt 服务
RUN npm install -g pm2
CMD ["pm2-runtime", "start", "npx", "nuxt", "start"]
