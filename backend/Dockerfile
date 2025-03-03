FROM node:18

WORKDIR /app

# คัดลอกไฟล์ dependency แล้วติดตั้ง
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# ให้สิทธิ์รัน strapi ได้
RUN chmod +x node_modules/.bin/strapi

EXPOSE 1337

CMD ["npm", "run", "develop"]
